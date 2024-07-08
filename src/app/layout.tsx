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
import { auth, currentUser } from "@clerk/nextjs/server";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLjs",
  description: "Run LLM's in the browser",
};

async function Navbar() {
  const { userId } = auth()

  const user = await currentUser()


  return (
    <nav className="flex items-center justify-between w-full p-4 mb-4 text-xl font-semibold border-b-4">
      <Link href={'/'}><div>MLjs</div></Link>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <Link href='/models'>Models</Link>
        <Link href='/profile'>{user?.username || user?.firstName}</Link>
        <Link href='/prompts'>Instances</Link>
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
