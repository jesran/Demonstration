"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.12, // Progressive stagger: 1 -> 2 -> 3 -> 4
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Product Visual Container with Marble/Dark Contrast */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1918] mb-4 border border-[#E5E0D5]/70 shadow-[0_10px_35px_-15px_rgba(42,40,38,0.12)]">
          {/* Dark luxury textile representation */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#252422] to-[#121110] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" />

          {/* Architectural minimal framing & mark */}
          <div className="absolute inset-3 border border-white/[0.04] transition-colors duration-500 group-hover:border-white/[0.09]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-8 h-8 opacity-20 transition-opacity duration-300 group-hover:opacity-40">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white" />
              <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white" />
            </div>
          </div>

          {/* Subtle category badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-mono">
              0{index + 1} / {product.category}
            </span>
          </div>

          {/* Slide-in Quick View trigger */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
            <div className="w-full h-10 flex items-center justify-center bg-[#F8F6F0] text-demon-black text-[10px] font-medium uppercase tracking-[0.22em] shadow-lg">
              Quick View +
            </div>
          </div>
        </div>

        {/* Product Details - Clean architectural typography */}
        <div className="flex flex-col gap-1 px-1">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xs md:text-sm font-medium uppercase tracking-[0.14em] text-demon-black transition-colors duration-300 group-hover:text-demon-muted">
              {product.name}
            </h3>
            <span className="text-xs md:text-sm text-demon-muted font-light">
              {product.currency}
              {product.price.toLocaleString("en-IN")}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-demon-muted">
            {product.category}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
