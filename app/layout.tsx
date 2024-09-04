import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/components/Provider";
import { GoogleAnalytics } from "@/components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Let's Code",
  description:
    "An Educational platform for users to learn, code and grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={inter.className}>
        <Provider>
          <NextTopLoader showSpinner={false} color="gray" />
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
