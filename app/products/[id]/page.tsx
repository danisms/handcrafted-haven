import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Product',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {

    return (
        <main>
            
        </main>
    );
}