import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import ReactQueryProvider from "./ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased flex flex-col min-h-screen gap-12`}
      >
        <ReactQueryProvider>
          <Header></Header>
          <main className="flex-1 w-full">{children}</main>
          <Footer></Footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
