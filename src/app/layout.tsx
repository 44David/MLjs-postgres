import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLjs",
  description: "Run LLM's in the browser",
};

function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full p-4 mb-4 text-xl font-semibold border-b-4">
      <Link href={'/'}><div>MLjs</div></Link>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <Link href='/models'>Your models</Link>
        <UserButton />
      </SignedIn>

    </nav>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>

          <Navbar />
          {children}
        
        </body>
      </html>
    </ClerkProvider>
  );    

}
