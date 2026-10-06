"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAllProducts } from "@/lib/data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allProducts = useMemo(() => getAllProducts(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, allProducts]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-start"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0D0D0D]/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Search Header Panel */}
      <div
        ref={containerRef}
        className="relative z-10 w-full bg-[#F9F9F8] border-b border-[#E5E5E3] animate-in slide-in-from-top duration-300 pt-6 pb-8"
      >
        <div className="content-container">
          {/* Top Row: Search Input + Close */}
          <div className="flex items-center justify-between gap-6 pb-4 border-b border-[#0D0D0D]">
            <div className="flex-1 flex items-center gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-[#767674]"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH DEMONSTATION ARCHIVE..."
                className="w-full bg-transparent text-sm md:text-base tracking-[0.06em] text-[#0D0D0D] placeholder:text-[#767674]/60 focus:outline-none uppercase font-mono"
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-[11px] uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] transition-colors p-2"
            >
              [ESC]
            </button>
          </div>

          {/* Quick Categories when no query */}
          {!query.trim() && (
            <div className="pt-6">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#767674] font-mono block mb-3">
                INDEX SUGGESTIONS
              </span>
              <div className="flex flex-wrap gap-2">
                {["Heavyweight Tee", "Core Zip Hoodie", "Trousers", "Jackets", "Autumn / Winter"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 bg-[#F3F4F3] border border-[#E5E5E3] text-[10px] uppercase tracking-[0.12em] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-white transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Results Grid */}
          {query.trim() && (
            <div className="pt-8 max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="py-12 text-center text-xs uppercase tracking-[0.14em] text-[#767674] font-mono">
                  NO GARMENTS FOUND FOR &quot;{query}&quot;
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {results.slice(0, 4).map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex flex-col"
                      >
                        <div className="relative aspect-[4/5] bg-[#F3F4F3] overflow-hidden border border-[#E5E5E3] mb-3">
                          <Image
                            src={product.images.primary}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="uppercase tracking-[0.06em] font-medium text-[#0D0D0D]">
                            {product.name}
                          </span>
                          <span className="font-mono text-[#767674]">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#767674] tracking-wide mt-0.5">
                          {product.category}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
