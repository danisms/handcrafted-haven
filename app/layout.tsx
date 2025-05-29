import { playfair, cormorant, lato } from "./ui/fonts";
import "@/app/ui/css/globals.css";
import { Metadata } from "next";

// adding metadata
export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: 'Handcrafted Haven is a place where handcrafted work is shocased by artisans for art lovers to cherish. At Handcrafted Haven, every creation is born from skilled hands and a passion for artistry — crafted with love, and cherished by hearts around the world.',
  metadataBase: new URL('http://localhost:3000'),
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${lato.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
