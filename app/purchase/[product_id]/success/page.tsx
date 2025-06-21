import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SimpleFooter } from '@/app/components/footer';
import { Suspense } from 'react';
import { UpdateArtisanForm } from '@/app/ui/artisans/artisan-form';
import { fetchArtisanById, fetchProductDetailById } from '@/app/lib/data';
import { CardSkeleton } from '@/app/ui/skeletons';
import Header from '@/app/components/header';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Purchased Success',
};

export default async function Page(props: { params: Promise<{ product_id: string }> }) {
    const params = await props.params;
    const id = params.product_id;
    const ProductDetail = await fetchProductDetailById(id);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <Suspense fallback={<CardSkeleton />}>
                    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-800">
                        <h1 className="text-3xl font-bold mb-4 text-center">🎉 Purchase Successful!</h1>
                        <p className="text-xl text-center">
                            Thank you for purchasing <strong>{ProductDetail.name}</strong>.
                        </p>
                    </div>
                </Suspense>
            </main>
            <SimpleFooter />
        </div>
    );
}