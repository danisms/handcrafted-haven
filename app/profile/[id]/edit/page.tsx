import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SimpleFooter } from '@/app/components/footer';
import { Suspense } from 'react';
import { UpdateArtisanForm } from '@/app/ui/artisans/artisan-form';
import { fetchArtisanById } from '@/app/lib/data';
import { CardSkeleton } from '@/app/ui/skeletons';
import Header from '@/app/components/header';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Edit Artisan',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const artisanData = await fetchArtisanById(id);

    console.log("ARTISAN: ", artisanData);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <Suspense fallback={<CardSkeleton />}>
                    <UpdateArtisanForm data={artisanData} />
                </Suspense>
            </main>
            <SimpleFooter />
        </div>
    );
}