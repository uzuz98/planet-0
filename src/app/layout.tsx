import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.scss";
import Coin98AdapterProvider from "@/context/adapter";
import Coin98AdapterModal from "@/components/adapterModal";
import "@/config/firebase";
import Header from "@/components/Header";
import Footer from "@/sections/Footer";
import GlobalStateProvider from "@/providers/GlobalState";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Coin98AdapterProvider>
          <GlobalStateProvider>
            <main className="flex min-h-screen flex-col items-center justify-between">
              <Header />
              {children}
              <Footer />
              <Toaster />
            </main>
            <Coin98AdapterModal />
          </GlobalStateProvider>
        </Coin98AdapterProvider>
      </body>
    </html>
  );
}
