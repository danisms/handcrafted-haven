'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Artisan, fileMimeTypes, fileSizes, User } from '@/app/lib/definitions';
import { z } from 'zod';
import { getSession } from './auth';
import { DELETEFILE, UPLOADFILE } from './handleFile';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**************
* CREATE USER *
**************/
const FormSchema = z.object({
    id: z.string(),
    firstname: z.string().min(1, 'Name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    user_photo: z.string().url('Invalid URL for user photo'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(5, 'Password must be at least 5 characters'),
    access: z.enum(['read-only', 'admin', 'full-control'], {
        errorMap: () => ({ message: 'Invalid access level' }),
    }),
});

const CreateUser = FormSchema.omit({ id: true })

export async function createUser(_prevState: User, formData: FormData) {

    const validatedData = CreateUser.safeParse({
        firstname: formData.get('firstname')?.toString(),
        lastname: formData.get('lastname')?.toString(),
        user_photo: formData.get('user_photo')?.toString(),
        username: formData.get('username')?.toString(),
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
        access: formData.get('access')?.toString(),
    });

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        }
    }

    const { firstname, lastname, user_photo, username, email, password, access } = validatedData.data;
    try {
        const result = await sql`
            INSERT INTO users (firstname, lastname, user_photo, username, email, password, access)
            VALUES (${firstname}, ${lastname}, ${user_photo}, ${username}, ${email}, ${password}, ${access})
            RETURNING id, firstname, lastname, user_photo, username, email, access;
        `;

        return {
            user: result[0],
            message: 'User created successfully.',
        };
    } catch (error) {
        console.error('Error creating user:', error);
    }

    revalidatePath('/profile');
    redirect('/profile');
}


/****************
* CREATE ARTISAN 
****************/
const ArtisanFormSchema = z.object({
    id: z.string(),
    display_name: z.string().min(1, 'Name is required'),
    about: z.string().min(20, "About must be a minimum of 20 characters"),
    gender: z.string().min(1, 'Gender is required')
});

const CreateArtisan = ArtisanFormSchema.omit({ id: true });

export async function createArtisan(_prevState: any, formData: FormData) {
    try {
        // Validate input data
        const validatedData = CreateArtisan.safeParse({
            display_name: formData.get('title')?.toString().toLowerCase(),
            about: formData.get('about')?.toString(),
            gender: formData.get('gender')?.toString().toLowerCase(),
        });

        if (!validatedData.success) {
            const errorMessages = Object.entries(validatedData.error.flatten().fieldErrors)
                .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
                .join('\n');
            throw new Error(errorMessages);
        }

        const { display_name, about, gender } = validatedData.data;

        // Get user session
        const session = await getSession();
        if (!session) {
            throw new Error("Unauthorized: Please log in to create an artisan profile");
        }

        const user_id = session.user.id;

        // Check if display_name already exists
        const display_name_exist = await sql`
            SELECT display_name FROM artisan WHERE display_name = ${display_name}
        `;

        if (display_name_exist.length > 0) {
            throw new Error("This title is already taken. Please choose a different one.");
        }

        // Create artisan record
        const result = await sql`
            INSERT INTO artisan (display_name, about, gender, user_id)
            VALUES (${display_name}, ${about}, ${gender}, ${user_id})
            RETURNING id, display_name, about, gender;
        `;

        if (result.length === 0) {
            throw new Error("Failed to create artisan profile");
        }

        const artisan_id = result[0].id;
        const successMessages: string[] = ["Artisan profile created successfully"];
        let hasFileUploadError = false;
        let fileUploadError = "";

        // Handle profile photo upload
        const profilePhoto = formData.get('profile_photo') as File;
        if (profilePhoto && profilePhoto.size > 0) {
            try {
                const artisan_profile_photo_path = `artisans/${artisan_id}/profile-photo`;
                const uploadResult = await UPLOADFILE(
                    formData,
                    'profile_photo',
                    artisan_profile_photo_path,
                    fileMimeTypes.imageTypes,
                    fileSizes.image.medium_image_max_size
                );

                if (uploadResult.success) {
                    await sql`
                        UPDATE artisan 
                        SET profile_photo = ${uploadResult.url} 
                        WHERE id = ${artisan_id} AND user_id = ${user_id}
                    `;
                    successMessages.push("Profile photo uploaded successfully");
                } else {
                    hasFileUploadError = true;
                    fileUploadError += `Profile photo: ${uploadResult.error}\n`;
                }
            } catch (error) {
                hasFileUploadError = true;
                fileUploadError += `Profile photo: ${error instanceof Error ? error.message : 'Upload failed'}\n`;
            }
        }

        // Handle banner upload
        const banner = formData.get('profile_banner') as File;
        if (banner && banner.size > 0) {
            try {
                const artisan_profile_banner_path = `artisans/${artisan_id}/banner`;
                const uploadResult = await UPLOADFILE(
                    formData,
                    'profile_banner',
                    artisan_profile_banner_path,
                    fileMimeTypes.imageTypes,
                    fileSizes.image.medium_image_max_size
                );

                if (uploadResult.success) {
                    await sql`
                        UPDATE artisan 
                        SET banner = ${uploadResult.url} 
                        WHERE id = ${artisan_id} AND user_id = ${user_id}
                    `;
                    successMessages.push("Profile banner uploaded successfully");
                } else {
                    hasFileUploadError = true;
                    fileUploadError += `Profile banner: ${uploadResult.error}\n`;
                }
            } catch (error) {
                hasFileUploadError = true;
                fileUploadError += `Profile banner: ${error instanceof Error ? error.message : 'Upload failed'}\n`;
            }
        }

        // Revalidate path and return result
        revalidatePath('/profile');

        return {
            artisan: result[0],
            message: successMessages.join('\n'),
            ...(hasFileUploadError && {
                warning: "Profile created but some files failed to upload:\n" + fileUploadError
            }),
            success: true
        };

    } catch (error) {
        console.error('Error creating artisan:', error);

        // Return error in a format that useActionState can handle
        return {
            error: error instanceof Error ? error.message : 'Failed to create artisan profile',
            success: false,
            warning: null,
            message: null,
            artisan: null
        };
    }
}

export async function updateArtisanData(_prevState: any, formData: FormData) {
    try {
        // Validate input data
        const validatedData = ArtisanFormSchema.safeParse({
            id: formData.get('id')?.toString(),
            display_name: formData.get('title')?.toString().toLowerCase(),
            about: formData.get('about')?.toString(),
            gender: formData.get('gender')?.toString().toLowerCase(),
        });

        if (!validatedData.success) {
            const errorMessages = Object.entries(validatedData.error.flatten().fieldErrors)
                .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
                .join('\n');
            throw new Error(errorMessages);
        }

        const { id, display_name, about, gender } = validatedData.data;

        // Get user session
        const session = await getSession();
        if (!session) {
            throw new Error("Unauthorized: Please log in to update artisan profile");
        }

        const user_id = session.user.id;

        // Check if display_name already exists
        const display_name_exist = await sql`
            SELECT display_name FROM artisan WHERE display_name = ${display_name} AND id != ${id} AND user_id != ${user_id};
        `;

        if (display_name_exist.length > 0) {
            throw new Error("This title is already taken. Please choose a different one.");
        }

        // Update artisan record
        const result = await sql`
            UPDATE artisan SET display_name = ${display_name}, about = ${about}, gender = ${gender}
            wHERE id = ${id} AND user_id = ${user_id}
            RETURNING id, display_name, about, gender;
        `;

        if (result.length === 0) {
            throw new Error("Failed to update artisan profile");
        }

        const artisan_id = result[0].id || id;
        const successMessages: string[] = ["Artisan profile updated successfully"];
        let hasFileUploadError = false;
        let fileUploadError = "";

        // get current profile photo and banner
        const artisanPhotoAndBannerResult = await sql`SELECT profile_photo, banner FROM artisan WHERE id=${artisan_id} AND user_id=${user_id};`;
        const artisanPhotoAndBanner: Artisan = artisanPhotoAndBannerResult[0];
        const currentPhoto = artisanPhotoAndBanner.profile_photo;
        const currentBanner = artisanPhotoAndBanner.banner;

        // Handle profile photo upload
        const profilePhoto = formData.get('profile_photo') as File;
        if (profilePhoto && profilePhoto.size > 0) {
            try {
                const artisan_profile_photo_path = `artisans/${artisan_id}/profile-photo`;
                // check and delete previous file before uploading
                let procceedToUpdate = false;
                if (currentPhoto) {
                    const deleteResult = await DELETEFILE(currentPhoto);
                    if (deleteResult.success) {
                        procceedToUpdate = true;
                    } else {
                        hasFileUploadError = true;
                        fileUploadError += `Profile photo: ${deleteResult.error}\n`;
                    }
                } else {
                    procceedToUpdate = true;
                }
                // check and update photo
                if (procceedToUpdate) {
                    const uploadResult = await UPLOADFILE(
                        formData,
                        'profile_photo',
                        artisan_profile_photo_path,
                        fileMimeTypes.imageTypes,
                        fileSizes.image.medium_image_max_size
                    );

                    if (uploadResult.success) {
                        await sql`
                        UPDATE artisan 
                        SET profile_photo = ${uploadResult.url} 
                        WHERE id = ${artisan_id} AND user_id = ${user_id}
                    `;
                        successMessages.push("Profile photo updated successfully");
                    } else {
                        hasFileUploadError = true;
                        fileUploadError += `Profile photo: ${uploadResult.error}\n`;
                    }
                }
            } catch (error) {
                hasFileUploadError = true;
                fileUploadError += `Profile photo: ${error instanceof Error ? error.message : 'Upload failed'}\n`;
            }
        }

        // Handle banner upload
        const banner = formData.get('profile_banner') as File;
        if (banner && banner.size > 0) {
            try {
                const artisan_profile_banner_path = `artisans/${artisan_id}/banner`;
                // check and delete previous file before uploading
                let proceedToUpdate = false;
                if (currentBanner) {
                    const deleteResult = await DELETEFILE(currentBanner);
                    if (deleteResult.success) {
                        proceedToUpdate = true;
                    } else {
                        hasFileUploadError = true;
                        fileUploadError += `Profile banner: ${deleteResult.error}\n`;
                    }
                } else {
                    proceedToUpdate = true;
                }

                // check and update file
                if (proceedToUpdate) {
                    const uploadResult = await UPLOADFILE(
                        formData,
                        'profile_banner',
                        artisan_profile_banner_path,
                        fileMimeTypes.imageTypes,
                        fileSizes.image.medium_image_max_size
                    );

                    if (uploadResult.success) {
                        await sql`
                        UPDATE artisan 
                        SET banner = ${uploadResult.url} 
                        WHERE id = ${artisan_id} AND user_id = ${user_id}
                    `;
                        successMessages.push("Profile banner updated successfully");
                    } else {
                        hasFileUploadError = true;
                        fileUploadError += `Profile banner: ${uploadResult.error}\n`;
                    }
                }
            } catch (error) {
                hasFileUploadError = true;
                fileUploadError += `Profile banner: ${error instanceof Error ? error.message : 'Upload failed'}\n`;
            }
        }

        // Revalidate path and return result
        revalidatePath('/profile');

        return {
            artisan: result[0],
            message: successMessages.join('\n'),
            ...(hasFileUploadError && {
                warning: "Profile updated but some files failed to upload:\n" + fileUploadError
            }),
            success: true
        };

    } catch (error) {
        console.error('Error updating artisan:', error);

        // Return error in a format that useActionState can handle
        return {
            error: error instanceof Error ? error.message : 'Failed to update artisan profile',
            success: false,
            warning: null,
            message: null,
            artisan: null
        };
    }
}



