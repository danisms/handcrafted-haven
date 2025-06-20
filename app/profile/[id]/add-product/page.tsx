import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SimpleFooter } from '@/app/components/footer';
import { Suspense } from 'react';
import { AddProductForm } from '@/app/ui/products/product-forms';
import { CardSkeleton } from '@/app/ui/skeletons';
import Header from '@/app/components/header';
import { fetchCollectionTitles } from '@/app/lib/data';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Add Product',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    // get collections data
    const collectionTitles = await fetchCollectionTitles();

    console.log("Product ID: ", id);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <Suspense fallback={<CardSkeleton />}>
                    <AddProductForm artisan_id={id} collectionTitles={collectionTitles} />
                </Suspense>
            </main>
            <SimpleFooter />
        </div>
    );
}