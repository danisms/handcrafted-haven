'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { createArtisan, createUser } from '@/app/lib/db';
import { ArtisanFormState, User } from './definitions';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { DELETEFILE } from './utils';

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

export async function deleteArtisan(id: string) {
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
        return { sucess: false, message: "Error Deleteing Artisan", error: `Fail to delete some files. Total Files: ${totalFiles}; Total Deleted: ${totalDeleted}` };
    }
}