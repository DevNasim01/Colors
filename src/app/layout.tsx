import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Loading from "@/components/loading";

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
          <div className="h-dvh flex flex-col">
            <Header />
            <ClerkLoading>
              <Loading />
            </ClerkLoading>
            <ClerkLoaded>{children}</ClerkLoaded>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
