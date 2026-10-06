import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClientWrapper } from "./ShopClientWrapper";

export const metadata: Metadata = {
  title: "Shop All Collections — DEMONSTATION",
  description:
    "Explore the architectural luxury collection of DEMONSTATION. Heavyweight tees, sculpted hoodies, structured overshirts and tailored trousers.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-[1400px] mx-auto px-6 py-36 text-center text-xs uppercase tracking-[0.2em] text-demon-muted">
            Loading Catalog...
          </div>
        }
      >
        <ShopClientWrapper />
      </Suspense>
    </main>
  );
}
