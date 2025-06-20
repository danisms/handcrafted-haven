import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchArtisanProductById } from '@/app/lib/data';
import { SimpleFooter } from '@/app/components/footer';
import Header from '@/app/components/header';
import { CardSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { ProductDetail } from '@/app/ui/products/product-detail';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Artisan Product Detail',
};

export default async function Page(props: { params: Promise<{ id: string, product_id: string }> }) {
    const params = await props.params;
    const artisan_id = params.id;
    const product_id = params.product_id;
    const productData = await fetchArtisanProductById(artisan_id, product_id);

    console.log("PRODUCT DATA: ", productData);  // for debugging purpose

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <Suspense fallback={<CardSkeleton />}>
                    <ProductDetail product_data={productData}/>
                </Suspense>
            </main>
            <SimpleFooter />
        </div>
    );
}
