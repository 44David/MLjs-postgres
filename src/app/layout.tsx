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
import { Toaster } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLjs",
  description: "Run LLM's in the browser",
};

async function Navbar() {

  const user = await currentUser()

  return (
    <nav className="flex justify-between w-full p-4 mb-4 text-xl font-semibold border-b-4">
      <Link href={'/'}><div>MLjs</div></Link>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <Link href={'/models'}>
          <div>Models</div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>Models</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={"models"}>Locally Installed Models</Link></DropdownMenuItem>
            <DropdownMenuItem>Search for Models</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href={'/prompts'}> 
          Instances
        </Link>

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
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );    

}
