// app/collections/page.tsx

import { SimpleFooter } from "@/app/components/footer";
import Header from "@/app/components/header";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Browse Collections",
};

const collections = [
  {
    title: "Drawing & Sketch",
    image: "/placeholders/collection_images/drawing.jpg",
  },
  {
    title: "Painting",
    image: "/placeholders/collection_images/painting.jpg",
  },
  {
    title: "Sculpture & Carving",
    image: "/placeholders/collection_images/molding-2.jpg",
  },
  {
    title: "Textile & Fiber Art",
    image: "/placeholders/collection_images/textile-2.jpg",
  },
  {
    title: "Jewelry & Accessories",
    image: "/placeholders/collection_images/jewelry.jpg",
  },
  {
    title: "Home & Decor",
    image: "/placeholders/collection_images/home-decor-2.jpg",
  },
  {
    title: "Paper Craft",
    image: "/placeholders/collection_images/paper-2.jpg",
  },
  {
    title: "Others",
    image: "/placeholders/collection_images/others-2.jpg",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e6]">
      <Header />
      <main className="flex-1 px-4 md:px-12 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          BROWSE COLLECTIONS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f9f5ec] border border-[#d8cfc3] rounded-md shadow hover:shadow-md transition"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={250}
                className="w-full h-52 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium mb-2">{item.title}</h2>
                <button className="bg-green-200 text-black font-semibold py-1 px-4 rounded hover:bg-green-300">
                  BROWSE
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}
