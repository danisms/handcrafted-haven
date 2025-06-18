import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchArtisanById } from '@/app/lib/data';
import { SimpleFooter } from '@/app/components/footer';
import Header from '@/app/components/header';
import { CardSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'My Artisan Profile',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {

    return (
        <main>

        </main>
    );
}
