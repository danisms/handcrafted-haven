'use client'

import { Product, ProductFormState } from "@/app/lib/definitions";
import { ArrowRightIcon, CardSim, User } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { SpinnerIcon } from "../component/icons";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { purchaseProduct } from "@/app/lib/action";


export function PurchaseProductForm({ productDetail }: { productDetail: Product }) {
    const [state, formAction, isPending] = useActionState<ProductFormState, FormData>(
        purchaseProduct,
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
        setTimeout(() => { redirect(`/purchase/${productDetail.id}/success`) }, 1000)
    } if (state.error) {
        toast.error(state.error);
    } else {
        // do nothing.
    }

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>
                {`Purchase ${productDetail.name}`}
            </h2>
            <form action={formAction}>
                <div>
                    <div>
                        {/* Title Field */}
                        <section>
                            <label htmlFor="card-name">
                                Card Name
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.card_name ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="card_name"
                                    name="card_name"
                                    type="text"
                                    placeholder="Enter your card name"
                                    required
                                />
                                <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.card_name && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.card_name}</p>
                            )}
                        </section>

                        {/* Bank Name Field */}
                        <section>
                            <label htmlFor="bank">
                                Bank
                            </label>
                            <div className="relative">
                                <select
                                    className={`peer block w-full rounded-md border ${allFieldErrors.bank ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id='bank'
                                    name='bank'
                                    required
                                >
                                    <option value="access-bank">Access Bank</option>
                                    <option value="first-bank">First Bank</option>
                                    <option value="zenith-bank">Zenith Bank</option>
                                    <option value="gtbank">GTBank</option>
                                    <option value="uba">UBA</option>
                                    <option value="fidelity-bank">Fidelity Bank</option>
                                    <option value="stanbic-ibtc">Stanbic IBTC</option>
                                    <option value="ecobank">Ecobank</option>
                                    <option value="union-bank">Union Bank</option>
                                    <option value="sterling-bank">Sterling Bank</option>
                                    <option value="keystone-bank">Keystone Bank</option>
                                    <option value="wema-bank">Wema Bank</option>
                                    <option value="polaris-bank">Polaris Bank</option>
                                    <option value="heritage-bank">Heritage Bank</option>
                                    <option value="jaiz-bank">Jaiz Bank</option>
                                    <option value="suntrust-bank">SunTrust Bank</option>
                                    <option value="taj-bank">TAJ Bank</option>
                                    <option value="unity-bank">Unity Bank</option>
                                    <option value="globus-bank">Globus Bank</option>
                                    <option value="premium-trust-bank">Premium Trust Bank</option>
                                </select>
                                {allFieldErrors.bank && (
                                    <p className="text-sm text-red-500 mt-1">{allFieldErrors.bank}</p>
                                )}
                            </div>
                        </section>

                        {/* Primary account number */}
                        <section>
                            <label htmlFor="pan">
                                {`P.A.N`};
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.pan ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="pan"
                                    name="pan"
                                    type="number"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                    required
                                />
                                <CardSim className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.pan && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.title}</p>
                            )}
                        </section>

                        {/* Card Verification Value */}
                        <section>
                            <label htmlFor="cvv">
                                {`CVV`};
                            </label>
                            <div className="relative">
                                <input
                                    className={`peer block w-full rounded-md border ${allFieldErrors.cvv ? 'border-red-500' : 'border-gray-200'} py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
                                    id="cvv"
                                    name="cvv"
                                    type="number"
                                    placeholder="xxx"
                                    required
                                />
                                <CardSim className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                            {allFieldErrors.cvv && (
                                <p className="text-sm text-red-500 mt-1">{allFieldErrors.cvv}</p>
                            )}
                        </section>

                    </div>

                    <input type="hidden" name="product_id" value={productDetail.id} />

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`submit-btn ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center">
                                <SpinnerIcon className="animate-spin h-5 w-5 mr-2" />
                                Processing...
                            </span>
                        ) : (
                            <span className="submit-btn sub-submit-btn">
                                Purchase <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
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