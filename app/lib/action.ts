'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { createArtisan, createUser } from '@/app/lib/db';
import { Artisan, ArtisanFormState, User } from './definitions';

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
    _prevState: User | undefined,
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