import styles from "@/app/ui/css/home.module.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Metadata } from 'next';
import { Suspense } from "react";
import { CardSkeleton } from "./ui/skeletons";
import HeroSection from "./ui/hero";
import { CollectionCards } from "./ui/collections/collection-cards";
import { ArtisanCards } from "./ui/artisans/artisan-cards";
import { MostRatedProductCards } from "./ui/products/product-cards";
import { DevelopersCard } from "./ui/developers/developer-cards";

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
        <div className="hero-section">
          <Suspense fallback={<CardSkeleton />}>
            <HeroSection />
          </Suspense>
        </div>

        <section>
          <h2>Top Collections</h2>
          <div className='collections-section slide-cards-container'>
            <Suspense fallback={<CardSkeleton />}>
              <CollectionCards />
            </Suspense>
          </div>
        </section>

        <section>
          <h2>Top Artisans</h2>
          <div className='artisans-section slide-cards-container'>
            <Suspense fallback={<CardSkeleton />}>
              <ArtisanCards />
            </Suspense>
          </div>
        </section>

        <section>
          <h2>Most Rated</h2>
          <div className='most-rated-section slide-cards-container'>
            <Suspense fallback={<CardSkeleton />}>
              <MostRatedProductCards />
            </Suspense>
          </div>
        </section>

        <section>
          <h2>Developers</h2>
          <div className='developers-section slide-cards-container'>
            <Suspense fallback={<CardSkeleton />}>
              <DevelopersCard />
            </Suspense>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
