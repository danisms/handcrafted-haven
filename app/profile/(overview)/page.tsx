import { Metadata } from "next";
import Header from "@/app/components/header";
import { SimpleFooter } from "@/app/components/footer";

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'My Profile',
};

export default async function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main>
                <h1>

                </h1>
            </main>
            <SimpleFooter />
        </div>
    );
}