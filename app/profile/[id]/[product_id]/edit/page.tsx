import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SimpleFooter } from '@/app/components/footer';
import { Suspense } from 'react';
import { EditProductForm } from '@/app/ui/products/product-forms';
import { CardSkeleton } from '@/app/ui/skeletons';
import Header from '@/app/components/header';
import { fetchProductDetailById, fetchCollectionTitles } from '@/app/lib/data';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Update Product',
};

export default async function Page(props: { params: Promise<{ id: string, product_id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const product_id = params.product_id;
    // get collections data
    const product_data = await fetchProductDetailById(product_id);
    const collectionTitles = await fetchCollectionTitles();

    console.log("Product ID: ", id);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <Suspense fallback={<CardSkeleton />}>
                    <EditProductForm artisan_id={id} product_data={product_data} collectionTitles={collectionTitles} />
                </Suspense>
            </main>
            <SimpleFooter />
        </div>
    );
}