"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { placeholders } from "../lib/placeholder-data";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="bg-[#f7f1e3] border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-icon-original.png"
            alt="Handcrafted Haven Logo"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Menu Toggle (Hamburguer) */}
        <input type="checkbox" id="menu-toggle" className="hidden peer" />

        <label
          htmlFor="menu-toggle"
          className="flex flex-col justify-center w-8 h-6 cursor-pointer z-50 md:hidden"
        >
          <span className="block w-full h-0.5 bg-[#4b3c2b] mb-1 transition-all duration-300 peer-checked:rotate-45 peer-checked:translate-y-1.5"></span>
          <span className="block w-full h-0.5 bg-[#4b3c2b] mb-1 transition-all duration-300 peer-checked:opacity-0"></span>
          <span className="block w-full h-0.5 bg-[#4b3c2b] transition-all duration-300 peer-checked:-rotate-45 peer-checked:-translate-y-1.5"></span>
        </label>

        {/* Navigation */}
        <nav className="hidden peer-checked:flex flex-col gap-6 absolute top-full left-0 w-full bg-[#f7f1e3] p-6 shadow-md transition-all duration-500 md:flex md:static md:flex-row md:items-center md:gap-6 md:w-auto">
          <Link href="/" className="text-[#4b3c2b]">
            <FaHome />
          </Link>
          <Link href="/artisans" className="text-[#4b3c2b]">
            Artisans
          </Link>
          <Link href="/collections" className="text-[#4b3c2b]">
            Collections
          </Link>

          {!loading && !session && (
            <>
              <Link href="/contact" className="text-[#4b3c2b]">
                Contact
              </Link>
              <Link href="/about" className="text-[#4b3c2b]">
                About
              </Link>
            </>
          )}

          {!loading && session && (
            <>
              <Link href="/profile" className="text-[#4b3c2b]">
                Profile
              </Link>
            </>
          )}

          {/* Auth Buttons - Mobile */}
          <div className="md:hidden flex flex-col gap-4">
            {!loading && !session && (
              <>
                <Link href="/login" className="text-[#4b3c2b]">
                  Log in
                </Link>
                <Link href="/signup" className="text-[#4b3c2b]">
                  Sign up
                </Link>
              </>
            )}
            {!loading && session && (
              <button onClick={() => signOut()} className="text-[#4b3c2b]">
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4 text-[#4b3c2b]">
          {!loading && !session && (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/signup">Sign up</Link>
            </>
          )}

          {!loading && session && (
            <div className="flex items-center space-x-2">
              <Image
                src={session.user?.image || placeholders.unisex_profile_picture}
                alt={`photo of ${session.user?.name}`}
                width={36}
                height={36}
                className="rounded-full"
              />
              <button onClick={() => signOut()}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
