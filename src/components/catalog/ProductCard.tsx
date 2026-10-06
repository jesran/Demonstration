"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({
  product,
  index = 0,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Black"
  );
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image Container (Surface Container Low #F3F4F3, 4:5 Aspect Ratio, 0px border radius, 1px border) ── */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#F3F4F3] border border-[#E5E5E3] shadow-xs group-hover:shadow-md transition-shadow duration-500"
        data-cursor="view"
      >
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary View */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered && product.images.secondary ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={product.images.primary}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              priority={index < 4}
            />
          </div>

          {/* Secondary View (Subtle crossfade on desktop hover) */}
          {product.images.secondary && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={product.images.secondary}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
          )}
        </Link>

        {/* Wishlist Toggle Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          data-cursor="cta"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#F9F9F8]/90 text-[#0D0D0D] border border-[#E5E5E3] hover:bg-[#0D0D0D] hover:text-white transition-colors z-20 shadow-xs"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Sharp Monolithic "QUICK VIEW" ribbon on hover */}
        {onQuickView && (
          <div className="absolute bottom-0 left-0 right-0 hidden md:flex opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              data-cursor="cta"
              className="w-full py-2.5 bg-[#0D0D0D]/95 text-white text-[10px] uppercase tracking-[0.18em] font-medium hover:bg-[#1C1C1C] transition-colors shadow-lg"
            >
              QUICK VIEW +
            </button>
          </div>
        )}
      </div>

      {/* ── Product Information: Clean Inter uppercase typography ── */}
      <div className="mt-4 flex flex-col gap-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="flex items-baseline justify-between gap-4">
          <Link
            href={`/product/${product.slug}`}
            data-cursor="cta"
            className="text-[11px] md:text-xs uppercase tracking-[0.06em] font-medium text-[#0D0D0D] hover:opacity-60 transition-opacity line-clamp-1"
          >
            {product.name}
          </Link>
          <span className="text-[11px] md:text-xs text-[#0D0D0D] font-mono whitespace-nowrap">
            {product.currency}
            {product.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Minimal Category & Color Swatches */}
        <div className="flex items-center justify-between gap-4 font-mono">
          <span className="text-[10px] text-[#767674] uppercase tracking-[0.1em]">
            {product.category}
          </span>

          {/* Color Dots */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5" aria-label="Color options">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                  title={color.name}
                  data-cursor="cta"
                  className={`w-2.5 h-2.5 border border-[#E5E5E3] transition-all ${
                    selectedColor === color.name
                      ? "ring-1 ring-[#0D0D0D] scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
