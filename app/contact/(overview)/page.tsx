import { SimpleFooter } from "@/app/components/footer";
import Header from "@/app/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e6]">
      <Header />
      <main className="flex justify-center items-center min-h-screen px-4 pb-20 bg-[#f5f0e6]">
        <section className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 sm:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Contact Us
          </h1>
          <form
            action="mailto:your-email@example.com"
            method="post"
            encType="text/plain"
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-2">Name</span>
              <input
                type="text"
                name="Name"
                required
                placeholder="Your full name"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-2">Email</span>
              <input
                type="email"
                name="Email"
                required
                placeholder="you@example.com"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-2">Message</span>
              <textarea
                name="Message"
                rows={5}
                required
                placeholder="Write your message here..."
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm resize-none
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              ></textarea>
            </label>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg py-3
                         shadow-md transition focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
      <SimpleFooter />
    </div>
  );
}
