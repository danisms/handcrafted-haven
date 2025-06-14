'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { createUser } from '@/app/lib/db';

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
    _prevState: string | undefined,
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

