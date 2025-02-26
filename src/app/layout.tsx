import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { NewsletterProvider } from "@/contexts/newsletterContext";
import { UserProvider } from "@/contexts/userContext";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "The News",
  description: "The news - managements",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen mx-auto antialiased">
        <UserProvider>
          <NewsletterProvider>
            <main className={`flex-grow ${inter.className}`}>
              <NavBar />
              {children}
            </main>
          </NewsletterProvider>
        </UserProvider>
      </body>
    </html>
  );
}
