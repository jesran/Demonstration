"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { products } from "@/lib/data";

// Select 5 key garments for the horizontal study
const horizontalItems = [
  {
    title: "HEAVYWEIGHT TEE",
    code: "01 // TEE",
    gsm: "450 GSM",
    slug: "heavyweight-tee",
    image: "/images/products/heavyweight-tee-black.jpg",
  },
  {
    title: "CORE ZIP HOODIE",
    code: "02 // HOODIE",
    gsm: "520 GSM",
    slug: "core-zip-hoodie",
    image: "/images/products/core-zip-hoodie-charcoal.jpg",
  },
  {
    title: "RELAXED TROUSER",
    code: "03 // TROUSER",
    gsm: "TWILL STRETCH",
    slug: "relaxed-trouser",
    image: "/images/products/relaxed-trouser-charcoal.jpg",
  },
  {
    title: "STRUCTURED JACKET",
    code: "04 // JACKET",
    gsm: "COTTON-NYLON",
    slug: "structured-zip-jacket",
    image: "/images/products/structured-jacket-grey.jpg",
  },
  {
    title: "CHECK OVERSHIRT",
    code: "05 // OVERSHIRT",
    gsm: "380 GSM WOOL",
    slug: "check-overshirt",
    image: "/images/products/check-overshirt-plaid.jpg",
  },
];

export function HorizontalCollectionScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Sticky horizontal progress mapped from vertical scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate percentage translation across the cards
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["2%", "-65%"]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[180vh] bg-[#F3F4F3]/30 border-t border-[#E5E5E3]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16">
        {/* Header */}
        <Container className="w-full">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#E5E5E3] pb-5 gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#767674] block mb-1">
                [HORIZONTAL STUDY // 5 FORM FACTOR RUNWAY]
              </span>
              <h2
                className="text-[#0D0D0D] font-light leading-none tracking-[-0.03em] uppercase"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              >
                THE UNIFORM MATRIX
              </h2>
            </div>

            <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[#767674]">
              <span>SCROLL VERTICALLY TO TRAVERSE HORIZONTALLY</span>
              <span className="hidden sm:inline">→</span>
            </div>
          </div>
        </Container>

        {/* Horizontal Sliding Track */}
        <div className="relative w-full overflow-hidden flex-1 flex items-center py-6">
          <motion.div
            style={{ x: xTranslate }}
            className="flex items-center gap-8 md:gap-12 pl-6 sm:pl-12 lg:pl-20 shrink-0"
          >
            {horizontalItems.map((item, index) => (
              <div
                key={item.code}
                className="w-[280px] sm:w-[360px] md:w-[420px] aspect-[4/5] shrink-0 bg-[#F3F4F3] border border-[#E5E5E3] p-6 md:p-10 flex flex-col justify-between group shadow-lg"
                data-cursor="view"
              >
                <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-[#767674]">
                  <span>{item.code}</span>
                  <span>{item.gsm}</span>
                </div>

                <Link
                  href={`/product/${item.slug}`}
                  className="relative aspect-[3/4] w-full my-auto overflow-hidden block"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain filter contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
                    loading="lazy"
                  />
                </Link>

                <div className="pt-4 border-t border-[#E5E5E3] flex items-baseline justify-between">
                  <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-[#0D0D0D]">
                    {item.title}
                  </h3>
                  <Link
                    href={`/product/${item.slug}`}
                    data-cursor="cta"
                    className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#767674] group-hover:text-[#0D0D0D] transition-colors"
                  >
                    INSPECT →
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer Progress Strip */}
        <Container className="w-full">
          <div className="flex items-center justify-between border-t border-[#E5E5E3] pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#767674]">
            <span>SYSTEM 01–05 COMPLETE</span>
            <Link
              href="/shop"
              data-cursor="cta"
              className="text-[#0D0D0D] hover:underline"
            >
              EXPLORE FULL 8 PIECES CATALOG →
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
