import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProductDetailById } from '@/app/lib/data';
import { PurchaseProductForm } from '@/app/ui/purchase/purchase-form';
import { CardSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Product',
};

export default async function Page(props: { params: Promise<{ product_id: string }> }) {
    const product_id = (await props.params).product_id;

    const productDetail = await fetchProductDetailById(product_id);
    return (
        <main>
            <Suspense fallback={<CardSkeleton />}>
                <PurchaseProductForm productDetail={productDetail} />
            </Suspense>
        </main>
    );
}