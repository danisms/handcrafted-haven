import { Metadata } from "next";

// Adding meta data to overide the parent layout metadata
export const metadata: Metadata = {
    title: 'My Profile',
};

export default async function Page() {
    return (
        <main>
            <h1>

            </h1>
        </main>
    );
}