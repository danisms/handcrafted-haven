'use client';
import {
    ExclamationCircleIcon,
    UserIcon,
    CameraIcon,
} from '@heroicons/react/24/outline';
import { SpinnerIcon } from '../component/icons';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState, useState } from 'react';
import { registerArtisan } from '@/app/lib/action';
import { useSearchParams } from 'next/navigation';
import { Artisan, ArtisanFormState } from '@/app/lib/definitions';


export function CreateArtisanForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';


    const [state, formAction, isPending] = useActionState<ArtisanFormState, FormData>(
        registerArtisan,
        { success: false, error: '' }
    );

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

    // Combine server and client side errors
 
    const allFieldErrors = {
        ...formErrors,
        ...(state.fieldErrors || {})
    };

    const allFileErrors = {
        ...fileErrors,
        ...(state.fieldErrors || {})
    };

    // Rest of your JSX remains the same...
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>
                Create Your Artisan Profile
            </h1>
            <form action={formAction}>
                <div>
                    <div>
                        {/* Title Field */}
                        <section>
                            <label htmlFor="title">
                                Artisan Title
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.title ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter your artisan name/title"
                                    required
                                />
                                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.title && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.title}</p>
                            )}
                        </section>

                        {/* About Field */}
                        <section>
                            <label htmlFor="about">
                                About
                            </label>
                            <div className="relative">
                                <textarea
                                    className={`w-full rounded-md border ${allFieldErrors.about ? 'border-red-500' : 'border-gray-200'} p-2`}
                                    id='about'
                                    name='about'
                                    placeholder='Provide a detailed description of what you do'
                                    required
                                ></textarea>
                                {allFieldErrors.about && (
                                    <p className="text-sm text-red-500 mt-1">{allFieldErrors.about}</p>
                                )}
                            </div>
                        </section>

                        {/* Gender Field */}
                        <section>
                            <label htmlFor="gender">
                                Gender
                            </label>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="male-gender"
                                        name="gender"
                                        type="radio"
                                        value="m"
                                        required
                                    />
                                    <label htmlFor="male-gender">Male</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="female-gender"
                                        name="gender"
                                        type="radio"
                                        value="f"
                                        required
                                    />
                                    <label htmlFor="female-gender">Female</label>
                                </div>
                            </div>
                            {allFieldErrors.gender && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.gender}</p>
                            )}
                        </section>

                        {/* Profile Photo */}
                        <section>
                            <label
                                className={`upload-btn ${allFileErrors.profile_photo ? 'border-red-500' : ''}`}
                                htmlFor="profile_photo">
                                <CameraIcon className="mr-5 h-5 w-5 text-white" />
                                Profile Photo
                            </label>
                            <div>
                                <input
                                    id="profile_photo"
                                    name="profile_photo"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {allFileErrors.profile_photo && (
                                <p className="text-sm text-red-500 mt-1">{allFileErrors.profile_photo}</p>
                            )}
                        </section>

                        {/* Profile Banner */}
                        <section>
                            <label
                                className={`upload-btn ${allFileErrors.profile_banner ? 'border-red-500' : ''}`}
                                htmlFor="profile_banner">
                                <CameraIcon className="mr-5 h-5 w-5 text-white" />
                                Profile Banner
                            </label>
                            <div>
                                <input
                                    id="profile_banner"
                                    name="profile_banner"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {allFileErrors.profile_banner && (
                                <p className="text-sm text-red-500 mt-1">{allFileErrors.profile_banner}</p>
                            )}
                        </section>
                    </div>

                    <input type="hidden" name="redirectTo" value={callbackUrl} />

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`submit-btn ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center">
                                <SpinnerIcon className="animate-spin h-5 w-5 mr-2" />
                                Creating...
                            </span>
                        ) : (
                            <span className="submit-btn sub-submit-btn">
                                Create <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                            </span>
                        )}
                    </button>

                    {/* Success/Warning/Error Messages */}
                    <div className="flex flex-col gap-2 mt-4">
                        {state.success && state.message && (
                            <div className="p-3 bg-green-100 text-green-700 rounded-md">
                                {state.message}
                            </div>
                        )}

                        {state.warning && (
                            <div className="p-3 bg-yellow-100 text-yellow-700 rounded-md">
                                {state.warning}
                            </div>
                        )}

                        {state.error && (
                            <div className="flex items-center gap-1 p-3 bg-red-100 text-red-700 rounded-md">
                                <ExclamationCircleIcon className="h-5 w-5" />
                                <p>{state.error}</p>
                            </div>
                        )}
                    </div>
                </div>


            </form>
        </>
    );
}

