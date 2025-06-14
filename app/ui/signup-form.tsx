'use client';

import { lato } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    UserIcon,
    CameraIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { register } from '@/app/lib/action'; // <- nova função de cadastro
import { useSearchParams } from 'next/navigation';

export default function SignUpForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(register, undefined);

    return (
        <form action={formAction} className="flex w-full flex-col space-y-4" style={{ minWidth: '300px', padding: '20px' }}>
            <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
                <h1 className={`${lato.className} mb-3 text-2xl`}>
                    Create your account
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}
                            htmlFor="firstname"
                        >
                            Firstname
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                style={{ marginBottom: '1rem', paddingLeft: '2.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                                id="firstname"
                                name="firstname"
                                type="text"
                                placeholder="Your first name"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="block text-xs font-medium text-gray-900"
                            style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}
                            htmlFor="lastname">
                            Lastname
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                style={{ marginBottom: '1rem', paddingLeft: '2.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                                id="lastname"
                                name="lastname"
                                type="text"
                                placeholder="Your last name"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="cursor-pointer w-50 flex items-center gap-2 px-4 py-2 text-white rounded-md"
                            style={{
                                marginTop: '0.5rem', marginBottom: '0.25rem',
                                paddingLeft: '0.75rem',
                                paddingRight: '1rem',
                                paddingTop: '0.25rem',
                                paddingBottom: '0.25rem',
                                backgroundColor: '#B3511D'
                            }}
                            htmlFor="user_photo">
                            <CameraIcon className="mr-5 h-5 w-5 text-white" />
                            Upload Profile Photo
                        </label>
                        <div className="relative">
                            <input
                                id="user_photo"
                                name="user_photo"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="block text-xs font-medium text-gray-900"
                            style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}
                            htmlFor="username">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                style={{ marginBottom: '1rem', paddingLeft: '2.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="block text-xs font-medium text-gray-900"
                            style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}
                            htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                style={{ marginBottom: '1rem', paddingLeft: '2.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="block text-xs font-medium text-gray-900"
                            style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}
                            htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                style={{ marginBottom: '1rem', paddingLeft: '2.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={5}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>

                <input type="hidden" name="redirectTo" value={callbackUrl} />

                <Button className="mt-4 w-full" aria-disabled={isPending}>
                    Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>

                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
