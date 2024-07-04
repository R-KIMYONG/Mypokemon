import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider";
import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Project",
  description:
    "Explore the details of different Pokémon species! Discover more about their information, types, traits, and skills with the Pokémon Project",
  icons: {
    icon: "/pokemon.ico",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-amber-300 shadow-md">
          <div className="flex items-center justify-between w-[60%] mx-auto py-2">
            <Link href="/" className="block min-w-20">
              <div className="min-w-25">
                <Image
                  src="/images/pokemonvisual.png"
                  width={80}
                  height={40}
                  quality={100}
                  alt="pokemon logo"
                  className="block"
                />
              </div>
            </Link>
            <h2 className="font-bold text-base font-gugi text-white">
              포켓몬 도감
            </h2>
          </div>
        </header>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
