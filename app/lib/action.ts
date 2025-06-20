'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { createUser, createArtisan, updateArtisanData, addArtisanProduct, updateArtisanProduct, addArtisanProductComment } from '@/app/lib/db';
import { ArtisanFormState, ProductFormState } from './definitions';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { DELETEFILE } from './handleFile';
import { getSession } from './auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(
    _prevState: undefined,
    formData: FormData
) {

    const firstname = formData.get('firstname')?.toString();
    const lastname = formData.get('lastname')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const redirectTo = formData.get('redirectTo')?.toString() || '/';

    if (!firstname || !lastname || !email || !password) {
        return 'All fields are required.';
    }

    try {
        await createUser(undefined, formData);

        redirect(redirectTo);
    } catch (err: any) {
        if (err.code === 'P2002') {
            return 'Email already registered.';
        }

        return 'Something went wrong. Please try again.';
    }
}

export async function registerArtisan(
    _prevState: ArtisanFormState,
    formData: FormData
) {
    try {
        // Extract and validate required fields
        const display_name = formData.get('title')?.toString()?.trim();
        const about = formData.get('about')?.toString()?.trim();
        const gender = formData.get('gender')?.toString();

        // Validate required fields with specific error messages
        const fieldErrors: Record<string, string> = {};
        if (!display_name) fieldErrors.title = 'Artisan title is required';
        if (!about) fieldErrors.about = 'About section is required';
        if (!gender) fieldErrors.gender = 'Gender selection is required';

        if (Object.keys(fieldErrors).length > 0) {
            return {
                error: 'Please fix the following errors',
                fieldErrors,
                success: false
            };
        }

        // Validate files (make them optional if needed)
        // const profilePhoto = formData.get('profile_photo') as File | null;
        // const banner = formData.get('profile_banner') as File | null;

        // FOR FILES
        const fileErrors: Record<string, string> = {};
        // // If files are required:
        // if (!profilePhoto || profilePhoto.size === 0) {
        //     fileErrors.profile_photo = 'Profile photo is required';
        // }
        // if (!banner || banner.size === 0) {
        //     fileErrors.profile_banner = 'Banner image is required';
        // }

        if (Object.keys(fileErrors).length > 0) {
            return {
                error: 'Please fix the following file errors',
                fieldErrors: fileErrors,
                success: false
            };
        }

        // Process the form
        const result = await createArtisan(_prevState, formData);

        // Handle different response cases
        if (!result.success) {
            // If createArtisan returned an error
            return {
                error: result.error || 'Failed to create artisan profile',
                success: false
            };
        }

        // Handle partial success (profile created but file upload issues)
        if (result.warning) {
            return {
                success: true,
                artisan: result.artisan,
                message: result.message,
                warning: result.warning
            };
        }

        // Full success case
        return {
            success: true,
            artisan: result.artisan,
            message: result.message || 'Artisan profile created successfully'
        };

    } catch (err) {
        console.error("CREATE ARTISAN ERROR:", err);

        // Handle different error types
        if (err instanceof Error) {
            // Check if it's a database or validation error
            if (err.message.includes('unique constraint')) {
                return {
                    error: 'This artisan name is already taken',
                    fieldErrors: { title: 'Please choose a different name' },
                    success: false
                };
            }
            return { error: err.message, success: false };
        }

        return { error: 'An unexpected error occurred', success: false };
    }
}

export async function updateArtisan(
    _prevState: ArtisanFormState,
    formData: FormData
) {
    try {
        // Extract and validate required fields
        const display_name = formData.get('title')?.toString()?.trim();
        const about = formData.get('about')?.toString()?.trim();
        const gender = formData.get('gender')?.toString();

        // Validate required fields with specific error messages
        const fieldErrors: Record<string, string> = {};
        if (!display_name) fieldErrors.title = 'Artisan title is required';
        if (!about) fieldErrors.about = 'About section is required';
        if (!gender) fieldErrors.gender = 'Gender selection is required';

        if (Object.keys(fieldErrors).length > 0) {
            return {
                error: 'Please fix the following errors',
                fieldErrors,
                success: false
            };
        }

        // Validate files (make them optional if needed)
        const profilePhoto = formData.get('profile_photo') as File | null;
        const banner = formData.get('profile_banner') as File | null;

        // FOR FILES
        const fileErrors: Record<string, string> = {};
        // // If files are required:
        // if (!profilePhoto || profilePhoto.size === 0) {
        //     fileErrors.profile_photo = 'Profile photo is required';
        // }
        // if (!banner || banner.size === 0) {
        //     fileErrors.profile_banner = 'Banner image is required';
        // }

        if (Object.keys(fileErrors).length > 0) {
            return {
                error: 'Please fix the following file errors',
                fieldErrors: fileErrors,
                success: false
            };
        }

        // Process the form
        const result = await updateArtisanData(_prevState, formData);

        // Handle different response cases
        if (!result.success) {
            // If createArtisan returned an error
            return {
                error: result.error || 'Failed to create artisan profile',
                success: false
            };
        }

        // Handle partial success (profile created but file upload issues)
        if (result.warning) {
            return {
                success: true,
                artisan: result.artisan,
                message: result.message,
                warning: result.warning
            };
        }

        // Full success case
        return {
            success: true,
            artisan: result.artisan,
            message: result.message || 'Artisan profile created successfully'
        };

    } catch (err) {
        console.error("CREATE ARTISAN ERROR:", err);

        // Handle different error types
        if (err instanceof Error) {
            // Check if it's a database or validation error
            if (err.message.includes('unique constraint')) {
                return {
                    error: 'This artisan name is already taken',
                    fieldErrors: { title: 'Please choose a different name' },
                    success: false
                };
            }
            return { error: err.message, success: false };
        }

        return { error: 'An unexpected error occurred', success: false };
    }
}

export async function deleteArtisanPhoto(id: string, photo_url: string) {
    // Check Authorization
    const get_user_id = await sql`SELECT user_id FROM artisan WHERE id = ${id}`;
    const user_id = get_user_id[0]?.user_id;

    const session = await getSession();
    const current_user_id = session.user.id;

    if (user_id != current_user_id) {
        return { sucess: false, message: "Unauthorized user attempt!", error: `You tried to delete an artisan profile photo that is not yours. Please refrain from such activities.` };
    }

    // Delete files from storage
    const deleteReport = await DELETEFILE(photo_url);
    if (deleteReport.success) {
        await sql`UPDATE artisan SET profile_photo = NULL WHERE id = ${id} AND profile_photo = ${photo_url};`;
        return { sucess: true, message: "Profile Photo Deleted Successfully", error: null };
    } else {
        return { sucess: false, message: "Error Deleting File", error: `Fail to delete file.` };
    }
}

export async function deleteArtisanBanner(id: string, photo_url: string) {
    // Check Authorization
    const get_user_id = await sql`SELECT user_id FROM artisan WHERE id = ${id}`;
    const user_id = get_user_id[0]?.user_id;

    const session = await getSession();
    const current_user_id = session.user.id;

    if (user_id != current_user_id) {
        return { sucess: false, message: "Unauthorized user attempt!", error: `You tried to delete an artisan banner that is not yours. Please refrain from such activities.` };
    }

    // Delete files from storage
    const deleteReport = await DELETEFILE(photo_url);
    if (deleteReport.success) {
        await sql`UPDATE artisan SET banner = NULL WHERE id = ${id} AND banner = ${photo_url};`;
        return { sucess: true, message: "Profile Banner Deleted Successfully", error: null };
    } else {
        return { sucess: false, message: "Error Deleting File", error: `Fail to delete file.` };
    }
}

export async function deleteArtisan(id: string) {
    // Check Authorization
    const get_user_id = await sql`SELECT user_id FROM artisan WHERE id = ${id}`;
    const user_id = get_user_id[0]?.user_id;

    const session = await getSession();
    const current_user_id = session.user.id;

    if (user_id != current_user_id) {
        return { sucess: false, message: "Unauthorized user attempt!", error: `You tried to delete an artisan profile that is not yours. Please refrain from such activities.` };
    }

    // 1. Fetch all file paths before deletion
    const files = await sql`
        -- Artisan's files
        SELECT profile_photo AS path FROM artisan WHERE id = ${id} AND profile_photo IS NOT NULL
        UNION ALL
        SELECT banner AS path FROM artisan WHERE id = ${id} AND banner IS NOT NULL
        
        -- Product images
        UNION ALL
        SELECT pi.source AS path
        FROM product_image pi
        JOIN product p ON pi.product_id = p.id
        WHERE p.owner_id = ${id} AND pi.source IS NOT NULL
    `;

    // Delete files from storage
    let allFilesDeleted = true;
    const totalFiles = files.length;
    let totalDeleted = 0;

    console.log("FILES: ", files, "\nTotal Files: ", totalFiles);  // for debugging purpose

    for (const file of files) {
        const deleteReport = await DELETEFILE(file.path);
        if (!deleteReport.success) {
            allFilesDeleted = false;
        } else {
            totalDeleted++;
        }
    }

    console.log("Total Files: ", totalFiles, "; Total Deleted: ", totalDeleted, "; All Files Deleted: ", allFilesDeleted);  // for debugging purpose

    if (allFilesDeleted) {
        // Delete database records (cascading will handle linked tables)
        await sql`DELETE FROM artisan WHERE artisan.id = ${id}`;

        // Revalidate path (i.e reload data in path)
        revalidatePath("/profile/");
        return { sucess: true, message: "Artisan Deleted Successfully", error: null };
    } else {
        return { sucess: false, message: "Error Deleting Artisan", error: `Fail to delete some files. Total Files: ${totalFiles}; Total Deleted: ${totalDeleted}` };
    }
}


// PRODUCTS
export async function addProduct(
    _prevState: ProductFormState,
    formData: FormData
) {
    try {
        // Extract and validate required fields
        const product_name = formData.get('title')?.toString()?.trim();
        const description = formData.get('description')?.toString()?.trim();
        const price = formData.get('price')?.toString();

        // Validate required fields with specific error messages
        const fieldErrors: Record<string, string> = {};
        if (!product_name) fieldErrors.title = 'Artisan title is required';
        if (!description) fieldErrors.about = 'About section is required';
        if (!price) fieldErrors.gender = 'Gender selection is required';

        if (Object.keys(fieldErrors).length > 0) {
            return {
                error: 'Please fix the following errors',
                fieldErrors,
                success: false
            };
        }

        // Validate files (make them optional if needed)
        const product_image_1 = formData.get('product_image') as File | null;
        // const product_image_2 = formData.get('product_image_2') as File | null;

        // FOR FILES
        const fileErrors: Record<string, string> = {};
        // // If files are required:
        if (!product_image_1 || product_image_1.size === 0) {
            fileErrors.product_image = 'Product Image is required';
        }

        // if (!product_image_2 || product_image_2.size === 0) {
        //     fileErrors.product_image_2 = 'Product image 2 is required';
        // }

        if (Object.keys(fileErrors).length > 0) {
            return {
                error: 'Please fix the following file errors',
                fieldErrors: fileErrors,
                success: false
            };
        }

        // Process the form
        const result = await addArtisanProduct(_prevState, formData);

        // Handle different response cases
        if (!result.success) {
            // If createArtisan returned an error
            return {
                error: result.error || 'Failed to add product',
                success: false
            };
        }

        // Handle partial success (product added but file upload issues)
        if (result.warning) {
            return {
                success: true,
                product: result.product,
                message: result.message,
                warning: result.warning
            };
        }

        // Full success case
        return {
            success: true,
            product: result.product,
            message: result.message || 'Product added successfully'
        };

    } catch (err) {
        console.error("ADD PRODUCT ERROR:", err);

        // Handle different error types
        if (err instanceof Error) {
            // Check if it's a database or validation error
            if (err.message.includes('unique constraint')) {
                return {
                    error: 'This product name is already taken',
                    fieldErrors: { title: 'Please choose a different name' },
                    success: false
                };
            }
            return { error: err.message, success: false };
        }

        return { error: 'An unexpected error occurred', success: false };
    }
}

export async function editArtisanProduct(
    _prevState: ProductFormState,
    formData: FormData
) {
    try {
        // Extract and validate required fields
        const product_name = formData.get('title')?.toString()?.trim();
        const description = formData.get('description')?.toString()?.trim();
        const price = formData.get('price')?.toString();

        // Validate required fields with specific error messages
        const fieldErrors: Record<string, string> = {};
        if (!product_name) fieldErrors.title = 'Artisan title is required';
        if (!description) fieldErrors.about = 'About section is required';
        if (!price) fieldErrors.gender = 'Gender selection is required';

        if (Object.keys(fieldErrors).length > 0) {
            return {
                error: 'Please fix the following errors',
                fieldErrors,
                success: false
            };
        }

        // // VALIDATE FILE IF IN USE
        // Validate files (make them optional if needed)
        // const product_image_1 = formData.get('product_image') as File | null;
        // const product_image_2 = formData.get('product_image_2') as File | null;

        // FOR FILES
        // const fileErrors: Record<string, string> = {};
        // // If files are required:
        // if (!product_image_1 || product_image_1.size === 0) {
        //     fileErrors.product_image = 'Product Image is required';
        // }

        // if (!product_image_2 || product_image_2.size === 0) {
        //     fileErrors.product_image_2 = 'Product image 2 is required';
        // }

        // if (Object.keys(fileErrors).length > 0) {
        //     return {
        //         error: 'Please fix the following file errors',
        //         fieldErrors: fileErrors,
        //         success: false
        //     };
        // }

        // Process the form
        const result = await updateArtisanProduct(_prevState, formData);

        // Handle different response cases
        if (!result.success) {
            // If createArtisan returned an error
            return {
                error: result.error || 'Failed to update product',
                success: false
            };
        }

        // Handle partial success (product added but file upload issues)
        if (result.warning) {
            return {
                success: true,
                product: result.product,
                message: result.message,
                warning: result.warning
            };
        }

        // Full success case
        return {
            success: true,
            product: result.product,
            message: result.message || 'Product updated successfully'
        };

    } catch (err) {
        console.error("ADD PRODUCT ERROR:", err);

        // Handle different error types
        if (err instanceof Error) {
            // Check if it's a database or validation error
            if (err.message.includes('unique constraint')) {
                return {
                    error: 'This product name is already taken',
                    fieldErrors: { title: 'Please choose a different name' },
                    success: false
                };
            }
            return { error: err.message, success: false };
        }

        return { error: 'An unexpected error occurred', success: false };
    }
}

export async function deleteArtisanProduct(artisan_id: string, product_id: string) {
    // Check Authorization
    const get_user_id = await sql`SELECT user_id FROM artisan WHERE id = ${artisan_id}`;
    const user_id = get_user_id[0]?.user_id;

    const session = await getSession();
    const current_user_id = session.user.id;

    if (user_id != current_user_id) {
        return { sucess: false, message: "Unauthorized user attempt!", error: `You tried to delete a product that is not for you. Please refrain from such activities.` };
    }

    // 1. Fetch all file paths before deletion
    const files = await sql`
        -- Product images
        SELECT pi.source AS path
        FROM product_image pi
        JOIN product p ON pi.product_id = p.id
        WHERE p.owner_id = ${artisan_id} AND pi.id = ${product_id} AND pi.source IS NOT NULL
    `;

    // Delete files from storage
    let allFilesDeleted = true;
    const totalFiles = files.length;
    let totalDeleted = 0;

    console.log("FILES: ", files, "\nTotal Files: ", totalFiles);  // for debugging purpose

    for (const file of files) {
        const deleteReport = await DELETEFILE(file.path);
        if (!deleteReport.success) {
            allFilesDeleted = false;
        } else {
            totalDeleted++;
        }
    }

    console.log("Total Files: ", totalFiles, "; Total Deleted: ", totalDeleted, "; All Files Deleted: ", allFilesDeleted);  // for debugging purpose

    if (allFilesDeleted) {
        // Delete database records (cascading will handle linked tables)
        await sql`DELETE FROM product WHERE product.id = ${product_id} AND product.owner_id = ${artisan_id}`;

        // Revalidate path (i.e reload data in path)
        revalidatePath(`/profile/${artisan_id}`);
        console.log("CURRENT ARTISAN ID: ", artisan_id);
        return { sucess: true, message: "Product Deleted Successfully", error: null };
    } else {
        return { sucess: false, message: "Error Deleting Product", error: `Fail to delete some files. Total Files: ${totalFiles}; Total Deleted: ${totalDeleted}` };
    }
}

export async function addProductComment(
    _prevState: ProductFormState,
    formData: FormData
) {
    try {
        // Extract and validate required fields
        const product_id = formData.get('product_id')?.toString()?.trim();
        const comment = formData.get('comment')?.toString()?.trim();
        const currentURL = formData.get('current_url')?.toString();

        // Validate required fields with specific error messages
        const fieldErrors: Record<string, string> = {};
        if (!product_id) fieldErrors.product_id = 'Product id is required';
        if (!comment) fieldErrors.comment = 'Comment should not be empty';
        if (!currentURL) fieldErrors.url = 'This current url should not be empty';

        if (Object.keys(fieldErrors).length > 0) {
            return {
                error: 'Please fix the following errors',
                fieldErrors,
                success: false
            };
        }

        // Process the form
        const result = await addArtisanProductComment(_prevState, formData);

        // Handle different response cases
        if (!result.success) {
            // If add Artisan product comment returned an error
            return {
                error: result.error || 'Failed to add comment',
                success: false
            };
        }

        // Full success case
        return {
            success: true,
            message: result.message || 'Comment added successfully'
        };

    } catch (err) {
        console.error("ADD PRODUCT COMMENT ERROR:", err);

        // Handle different error types
        if (err instanceof Error) {
            return { error: err.message, success: false };
        }

        return { error: 'An unexpected error occurred', success: false };
    }
}