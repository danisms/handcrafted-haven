import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f7f1e3] border-gray-300 text-[#4b3c2b]">
      <div className="max-w-7xl mx-auto px-15 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-2 rounded-t-md shadow-sm bg-[#f7f1e3]">
        {/* Logo & Motto */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logo-icon-original.png"
            alt="Handcrafted Haven Logo"
            width={180}
            height={180}
            className="mb-4"
          />
        </div>

        {/* Description */}
        <p className="text-center md:text-left">
          At Handcrafted Haven, every creation is born from skilled hands and a
          passion for artistry — crafted with love, and cherished by hearts
          around the world.
        </p>

        {/* Links */}
        <div className="flex justify-center md:justify-end space-x-12 text-sm">
          <div>
            <h3 className="font-semibold text-[#9c4d10]">Organization</h3>
            <ul className="list-disc list-inside">
              <li>
                <Link href="/collections">Collections</Link>
              </li>
              <li>
                <Link href="/artisans">Artisans</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#9c4d10]">Contacts</h3>
            <ul className="list-disc list-inside">
              <li>
                <Link href="#">Facebook</Link>
              </li>
              <li>
                <Link href="#">Instagram</Link>
              </li>
              <li>
                <Link href="#">WhatsApp</Link>
              </li>
              <li>
                <Link href="#">Twitter</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#512e44] text-white text-sm py-4 px-15 flex flex-col md:flex-row justify-between items-center rounded-b-md max-w-7xl mx-auto">
        <p className="text-center md:text-left">
          Crafted by Hands, Cherished by Hearts.
        </p>
        <p className="text-center md:text-left">All Rights Reserved ©2025</p>

        <div className="flex space-x-6 mt-2 md:mt-0">
          <Link href="#" className="hover:underline">
            Site Plan
          </Link>
          <Link href="#" className="hover:underline">
            Site Map
          </Link>
        </div>
      </div>
    </footer>
  );
}
