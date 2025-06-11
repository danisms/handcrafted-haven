'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { createUser } from '@/app/lib/db';

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData,
) {
    const email = formData.get('email');
    const password = formData.get('password');
    const callbackUrl = formData.get('redirectTo')?.toString() || '/';

    try {
        await signIn('credentials', {
            redirectTo: callbackUrl,
            redirect: true,
        });
    } catch (error) {
        return 'Invalid email or password.';
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

