export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import Header from "@/app/components/header";
import { SimpleFooter } from "@/app/components/footer";
import Link from "next/link";
import { Suspense } from "react";
import { CardSkeleton } from "@/app/ui/skeletons";
import { MyArtisanProfiles } from "@/app/ui/artisans/artisan-cards";


// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'My Profile',
};

export default async function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <div className="buttons-holder">
                    <Link href="/profile/create"><button>Create Artisan Profile</button></Link>
                </div>

                <hr />

                {/* Display All Artisan Profile Created */}
                <Suspense fallback={<CardSkeleton />}>
                    <MyArtisanProfiles />
                </Suspense>
            </main>
            <SimpleFooter />
        </div>
    );
}