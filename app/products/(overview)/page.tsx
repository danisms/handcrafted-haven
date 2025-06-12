import { Metadata } from "next";

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'Browers All Products',
};

export default async function Page() {
    return (
        <main>
            <h1 style={{ textAlign: 'center' }}>
                Comming Soon!
            </h1>
        </main>
    );
}