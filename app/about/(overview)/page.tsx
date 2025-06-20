import { SimpleFooter } from "@/app/components/footer";
import Header from "@/app/components/header";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e6]">
      <Header />
      <main className="flex-grow flex justify-center items-start px-4 pt-12 pb-12 sm:pt-4 sm:pb-20">
        <section className="bg-white rounded-2xl shadow-lg max-w-5xl w-full px-6 py-10 sm:px-14 sm:py-16 mx-4 sm:mx-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
            About Us
          </h1>

          <div className="flex flex-col lg:flex-row  items-center">
            {/* Image */}
            <div className="w-full lg:w-1/2 p-6">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Team collaboration"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 p-6 text-gray-700 text-lg leading-relaxed">
              <p className="mb-6">
                {`Welcome to our platform! We're a team of passionate creators
                committed to building high-quality handcrafted digital
                experiences.`}
              </p>
              <p className="mb-6">
                {`Our mission is to connect makers and buyers in a vibrant,
                inspiring community. Whether you're here to discover unique
                products or to share your own creations, we're glad you're part
                of our journey.`}
              </p>
              <p>
                {`This project is built with Next.js, Tailwind CSS, and a deep
                appreciation for design that is both functional and beautiful.
                Thank you for visiting!`}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SimpleFooter />
    </div>
  );
}
