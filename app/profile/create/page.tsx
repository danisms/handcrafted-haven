import { Metadata } from "next";
import Header from "@/app/components/header";
import { SimpleFooter } from "@/app/components/footer";
import { CreateArtisanForm } from "@/app/ui/artisans/artisan-form";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'; // Forces SSR

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Create New Artisan Profile',
};

export default async function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <Suspense fallback={<CardSkeleton />}>
                    <CreateArtisanForm />
                </Suspense>
            </main>
            <SimpleFooter />
        </div>
    );
}