import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BagProvider } from "@/context/BagContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "DEMONSTATION — Editorial Fashion Flagship",
  description:
    "Monolithic silhouettes tailored from heavyweight textiles. A seasonal study in form and quiet presence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-demon-marble text-demon-black relative">
        <BagProvider>
          <WishlistProvider>
            {/* Minimal Desktop Custom Cursor & Subtle Scroll Indicator */}
            <CustomCursor />
            <ScrollProgressBar />

            {/* Global Architectural Frame */}
            <Navbar />
            <div className="flex-1 relative z-10">{children}</div>
            <Footer />
            <WishlistDrawer />
          </WishlistProvider>
        </BagProvider>
      </body>
    </html>
  );
}
