import { SimpleFooter } from "@/app/components/footer";
import Header from "@/app/components/header";
import { Metadata } from "next";

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'About',
};

export default async function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main>
                <h1 style={{ textAlign: 'center' }}>
                    Comming Soon!
                </h1>
            </main>
            <SimpleFooter />
        </div>
    );
}