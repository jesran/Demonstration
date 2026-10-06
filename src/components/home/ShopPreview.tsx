"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { newArrivals } from "@/lib/data";
import { ProductCard } from "@/components/catalog/ProductCard";

export function ShopPreview() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 border-t border-[#E5E5E3] bg-[#F9F9F8]">
      <Container>
        {/* Section Header: Pure architectural restraint */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 md:mb-20 gap-6 border-b border-[#E5E5E3] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#767674] font-mono block mb-2">
              [INDEX // NEW ARRIVALS]
            </span>
            <h2
              className="text-[#0D0D0D] font-light leading-none tracking-[-0.03em] uppercase"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
            >
              COLLECTION PREVIEW
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#0D0D0D] hover:text-[#767674] transition-colors border-b border-[#0D0D0D] pb-1 self-start md:self-auto"
          >
            <span>VIEW ALL 8 PIECES</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* 4-column product grid with 80px outer breathing room */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-20">
          {newArrivals.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
