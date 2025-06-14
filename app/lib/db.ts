'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { User } from '@/app/lib/definitions';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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

    revalidatePath('/collections');
    redirect('/collections');
}
