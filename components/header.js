import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
          <Link href="/artisans">Artisans</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Icons (Placeholder links) */}
        <div className="space-x-4 text-[#4b3c2b]">
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </header>
  );
}
