'use client';

import { ArrowRightIcon, CameraIcon, CubeIcon, CurrencyDollarIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { addProduct, editArtisanProduct, addProductComment } from '@/app/lib/action';
import { Product, ProductFormState, UserComment } from '@/app/lib/definitions';
import { toast } from "sonner";
import { SpinnerIcon } from "../component/icons";

export function AddProductForm({ artisan_id, collectionTitles }: { artisan_id: string, collectionTitles: [{ id: string, title: string }] }) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [state, formAction, isPending] = useActionState<ProductFormState, FormData>(
        addProduct,
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

    // redirect with state
    if (state.success) {
        toast.success(state.message);
        setTimeout(() => { redirect(`/profile/${artisan_id}`) }, 1000)
    } else if (state.warning) {
        toast.warning(state.warning);
    } else if (state.error) {
        toast.error(state.error);
    } else {
        // do nothing.
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>
                Add Product
            </h1>
            <form action={formAction}>
                <div>
                    <div>
                        {/* Title Field */}
                        <section>
                            <label htmlFor="title">
                                Product Title
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.title ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter product name/title"
                                    required
                                />
                                <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.title && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.title}</p>
                            )}
                        </section>

                        {/* Description Field */}
                        <section>
                            <label htmlFor="description">
                                Description
                            </label>
                            <div className="relative">
                                <textarea
                                    className={`w-full rounded-md border ${allFieldErrors.description ? 'border-red-500' : 'border-gray-200'} p-2`}
                                    id='description'
                                    name='description'
                                    placeholder='Provide a detailed description of the product'
                                    required
                                ></textarea>
                                {allFieldErrors.description && (
                                    <p className="text-sm text-red-500 mt-1">{allFieldErrors.description}</p>
                                )}
                            </div>
                        </section>

                        <section>
                            <label htmlFor="collection">
                                Collection
                            </label>
                            <div className="relative">
                                <select
                                    className={`peer block w-full rounded-md border ${allFieldErrors.collection ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id='collection'
                                    name='collection'
                                    required
                                >
                                    {collectionTitles.map((collection) => (<option key={collection.id} value={collection.id}>{collection.title}</option>))}
                                </select>
                                {allFieldErrors.collection && (
                                    <p className="text-sm text-red-500 mt-1">{allFieldErrors.collection}</p>
                                )}
                            </div>
                        </section>

                        {/* Price Field */}
                        <section>
                            <label htmlFor="Price">
                                {`Price ($)`};
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.title ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Enter product price in USSD"
                                    required
                                />
                                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.price && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.title}</p>
                            )}
                        </section>

                        {/* Product Image 1 */}
                        <section>
                            <label
                                className={`upload-btn ${allFileErrors.product_image ? 'border-red-500' : ''}`}
                                htmlFor="product_image">
                                <CameraIcon className="mr-5 h-5 w-5 text-white" />
                                Product Image
                            </label>
                            <div>
                                <input
                                    id="product_image"
                                    name="product_image"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {allFileErrors.product_image && (
                                <p className="text-sm text-red-500 mt-1">{allFileErrors.product_image}</p>
                            )}
                        </section>

                        {/* Product Image 2 (optional) */}
                        <section>
                            <label
                                className={`upload-btn ${allFileErrors.product_image_2 ? 'border-red-500' : ''}`}
                                htmlFor="product_image_2">
                                <CameraIcon className="mr-5 h-5 w-5 text-white" />
                                {"Product Image 2 (optional)"}
                            </label>
                            <div>
                                <input
                                    id="product_image_2"
                                    name="product_image_2"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {allFileErrors.product_image_2 && (
                                <p className="text-sm text-red-500 mt-1">{allFileErrors.product_image_2}</p>
                            )}
                        </section>
                    </div>

                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                    <input type="hidden" name="artisan_id" value={artisan_id} />

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`submit-btn ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center">
                                <SpinnerIcon className="animate-spin h-5 w-5 mr-2" />
                                Add...
                            </span>
                        ) : (
                            <span className="submit-btn sub-submit-btn">
                                Add <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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

export function EditProductForm({ artisan_id, product_data, collectionTitles }: { artisan_id: string, product_data: Product, collectionTitles: [{ id: string, title: string }] }) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const product_id = product_data.id;

    const [state, formAction, isPending] = useActionState<ProductFormState, FormData>(
        editArtisanProduct,
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

    // redirect with state
    if (state.success) {
        toast.success(state.message);
        setTimeout(() => { redirect(`/profile/${artisan_id}`) }, 1000)
    } else if (state.warning) {
        toast.warning(state.warning);
    } else if (state.error) {
        toast.error(state.error);
    } else {
        // do nothing.
    }

    // Rest of your JSX remains the same...
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>
                Edit Product
            </h1>
            <form action={formAction}>
                <div>
                    <div>
                        {/* Title Field */}
                        <section>
                            <label htmlFor="title">
                                Product Title
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.title ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter product name/title"
                                    required
                                    defaultValue={product_data.name}
                                />
                                <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.title && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.title}</p>
                            )}
                        </section>

                        {/* Description Field */}
                        <section>
                            <label htmlFor="description">
                                Description
                            </label>
                            <div className="relative">
                                <textarea
                                    className={`w-full rounded-md border ${allFieldErrors.description ? 'border-red-500' : 'border-gray-200'} p-2`}
                                    id='description'
                                    name='description'
                                    placeholder='Provide a detailed description of the product'
                                    required
                                    defaultValue={product_data.description}
                                ></textarea>
                                {allFieldErrors.description && (
                                    <p className="text-sm text-red-500 mt-1">{allFieldErrors.description}</p>
                                )}
                            </div>
                        </section>

                        <section>
                            <label htmlFor="collection">
                                Collection
                            </label>
                            <div className="relative">
                                <select
                                    className={`peer block w-full rounded-md border ${allFieldErrors.collection ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id='collection'
                                    name='collection'
                                    required
                                    defaultValue={product_data.collection_id}
                                >
                                    {collectionTitles.map((collection) => (<option key={collection.id} value={collection.id}>{collection.title}</option>))}
                                </select>
                                {allFieldErrors.collection && (
                                    <p className="text-sm text-red-500 mt-1">{allFieldErrors.collection}</p>
                                )}
                            </div>
                        </section>

                        {/* Price Field */}
                        <section>
                            <label htmlFor="Price">
                                {`Price ($)`};
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.title ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Enter product price in USSD"
                                    required
                                    defaultValue={product_data.price}
                                />
                                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.price && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.title}</p>
                            )}
                        </section>
                    </div>

                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                    <input type="hidden" name="artisan_id" value={artisan_id} />
                    <input type="hidden" name="product_id" value={product_id} />
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`submit-btn ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center">
                                <SpinnerIcon className="animate-spin h-5 w-5 mr-2" />
                                Updating...
                            </span>
                        ) : (
                            <span className="submit-btn sub-submit-btn">
                                Update <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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

export function AddProductComment({ product_id }: { product_id: string }) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentUrl = `/${pathName}/${searchParams}`;

    type ProductCommentFormState = {
        success: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
        message?: string;
        warning?: string;
        comment?: UserComment;
    }

    const [state, formAction, isPending] = useActionState<ProductCommentFormState, FormData>(
        addProductComment,
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

    // redirect with state
    if (state.success) {
        toast.success(state.message);
    } else if (state.warning) {
        toast.warning(state.warning);
    } else if (state.error) {
        toast.error(state.error);
    } else {
        // do nothing.
    }

    // Rest of your JSX remains the same...
    return (
        <>
            <div className="add-comment-holder">
                <form action={formAction}>

                    {/* Comment Filed */}
                    <div className="relative">
                        <textarea
                            className={`peer block w-full rounded-md border ${allFieldErrors.comment ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                            id="comment"
                            name="comment"
                            placeholder="Leave a comment"
                            required
                        />
                    </div>
                    {allFieldErrors.title && (
                        <p className="text-sm text-red-500 mt-1">{allFieldErrors.comment}</p>
                    )}

                    <input type="hidden" name="current_url" value={currentUrl} />
                    <input type="hidden" name="product_id" value={product_id} />

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center">
                                <SpinnerIcon className="animate-spin h-5 w-5 mr-2" />
                                Comment...
                            </span>
                        ) : (
                            <span className="submit-btn sub-submit-btn">
                                Comment <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                            </span>
                        )}
                    </button>
                    {/* Success/Warning/Error Messages */}
                    <span>
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
                    </span>
                </form >
            </div>
        </>
    );
}