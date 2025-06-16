import { Metadata } from "next";
import Header from "@/app/components/header";
import { SimpleFooter } from "@/app/components/footer";
import { CreateArtisanForm } from "@/app/ui/artisans/artisan-form";

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Create New Artisan Profile',
};

export default async function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="childMain">
                <CreateArtisanForm />
            </main>
            <SimpleFooter />
        </div>
    );
}