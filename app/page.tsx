import styles from "@/app/ui/css/home.module.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Metadata } from 'next';
import HeroSection from "./ui/hero";
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
        <div className="home-header">
            <Suspense fallback={<CardSkeleton />}>
                <HeroSection />
            </Suspense>
        </div>
        <div className="collections-section home-section">

        </div>
        <div className="top-artisans-section home-section">

        </div>
        <div className="most-rated-section home-section">

        </div>
        <div className="developers-section home-section">

        </div>
      </main>

      <Footer />
    </div>
  );
}
