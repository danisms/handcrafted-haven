import styles from "@/app/ui/css/home.module.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Metadata } from 'next';
import { Suspense } from "react";
import { CardSkeleton } from "./ui/skeletons";

// Add meta data to overide the parent layout metadata
export const metadata: Metadata = {
  title: 'Welcome to the Home of Handcrafts'
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main>
          <h1>Home Content Here!</h1>
      </main>

      <Footer />
    </div>
  );
}
