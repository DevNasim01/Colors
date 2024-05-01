import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Loading from "@/components/loading";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Colors",
  description: "A color palettes Generater application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="h-dvh w-full flex flex-col">
            <Header />
            <ClerkLoading>
              <Loading />
            </ClerkLoading>
            <ClerkLoaded>{children}</ClerkLoaded>
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
