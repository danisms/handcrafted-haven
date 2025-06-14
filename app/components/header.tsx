'use client';
import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { signOut, useSession } from 'next-auth/react';
import { placeholders } from "../lib/placeholder-data";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log("SESSION: ", session, "\nSTATUS: ", status);  // for debugging purpose

  return (
    <header className="bg-[#f7f1e3] border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
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

        {/* Navigation Links */}
        <nav className="space-x-6 text-[#4b3c2b] font-medium">
          <Link href="/"><FaHome className="nav-icon" /></Link>
          <Link href="/artisans">Artisans</Link>
          <Link href="/collections">Collections</Link>

          {/* Conditional Links When not signed in */}
          {!loading && !session && (
            <>
              <Link href="/contact">Contact</Link>
              <Link href="/about">About</Link>
            </>
          )}

          {/* Conditional Links When signed in */}
          {!loading && session && (
            <>
              <Link href="/profile">Profile</Link>
            </>
          )}
        </nav>

        {/* Icons (Placeholder links) */}

        {/* Display based on session */}
        {!loading && !session && (
          <div className="space-x-4 text-[#4b3c2b]">
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </div>
        )}

        {!loading && session && (
          <div className="log-header-holder space-x-4 text-[#4b3c2b]">
            <div className="user-header-photo-holder">
              <Image src={session.user?.image ? session.user?.image : placeholders.unisex_profile_picture} alt={`photo of ${session.user?.name}`} width={100} height={100} />
            </div>
            <button onClick={() => signOut()}>Logout</button>
          </div>
        )}

      </div>
    </header >
  );
}
