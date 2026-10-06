"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllProducts, searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/catalog/ProductCard";
import { QuickViewModal } from "@/components/catalog/QuickViewModal";
import { Product } from "@/types/product";

const popularQueries = [
  "Heavyweight",
  "Hoodie",
  "Tee",
  "Trouser",
  "Jacket",
  "Oversized",
];

import { Container } from "@/components/ui/Container";

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const allProducts = useMemo(() => getAllProducts(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);

  // Suggestions while typing
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 4);
  }, [query, allProducts]);

  return (
    <Container className="pt-36 md:pt-44 pb-28">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.3em] text-demon-muted font-mono block mb-4">
          CATALOG ARCHIVE // SEARCH
        </span>
        <h1
          className="text-heading text-demon-black mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Search Collection
        </h1>

        {/* Input Bar */}
        <div className="relative border-b-2 border-demon-black pb-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="TYPE TO SEARCH (E.G. HEAVYWEIGHT, HOODIE, TROUSER)"
            className="w-full bg-transparent text-sm md:text-base uppercase tracking-[0.16em] text-demon-black placeholder:text-demon-muted focus:outline-none text-center font-light"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] text-demon-muted hover:text-demon-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-demon-muted mr-1">
            Suggested:
          </span>
          {popularQueries.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="px-3 py-1 text-[10px] uppercase tracking-[0.16em] border border-demon-stone hover:border-demon-black transition-colors text-demon-black"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Instant Suggestions Bar */}
      {query.trim().length > 0 && suggestions.length > 0 && results.length > 0 && (
        <div className="max-w-2xl mx-auto mb-12 p-4 bg-[#F3EFE6]/70 border border-[#E5E0D5]">
          <span className="text-[9px] uppercase tracking-[0.25em] text-demon-muted font-mono block mb-2">
            DIRECT MATCHES
          </span>
          <div className="flex flex-wrap gap-4">
            {suggestions.map((s) => (
              <Link
                key={s.id}
                href={`/product/${s.slug}`}
                className="text-xs uppercase tracking-[0.14em] text-demon-black hover:text-demon-muted underline"
              >
                {s.name} ({s.currency}{s.price})
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Results Header */}
      {query.trim() && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0D5]">
          <span className="text-[11px] uppercase tracking-[0.22em] text-demon-muted font-mono">
            {results.length} {results.length === 1 ? "Result" : "Results"} for &quot;{query}&quot;
          </span>
          <Link
            href="/shop"
            className="text-[10px] uppercase tracking-[0.2em] text-demon-muted hover:text-demon-black"
          >
            View All Catalog →
          </Link>
        </div>
      )}

      {/* Results Grid */}
      {query.trim() ? (
        results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {results.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-demon-stone">
            <span className="text-[10px] uppercase tracking-[0.28em] text-demon-muted font-mono block mb-3">
              NO PRODUCTS FOUND
            </span>
            <h3 className="text-xl font-light text-demon-black mb-3">
              No garments matching &quot;{query}&quot;
            </h3>
            <p className="text-xs text-demon-muted uppercase tracking-[0.16em] mb-6">
              Check spelling or explore our complete seasonal collections.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-6 py-2.5 border border-demon-stone text-[10px] uppercase tracking-[0.2em] text-demon-black hover:border-demon-black transition-colors"
              >
                Clear Search
              </button>
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-demon-black text-white text-[10px] uppercase tracking-[0.2em] hover:bg-demon-charcoal transition-colors"
              >
                Explore Shop
              </Link>
            </div>
          </div>
        )
      ) : (
        /* Empty Query State — Showcase Featured Items */
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0D5]">
            <span className="text-[11px] uppercase tracking-[0.22em] text-demon-muted font-mono">
              CURATED ESSENTIALS
            </span>
            <Link
              href="/shop"
              className="text-[10px] uppercase tracking-[0.2em] text-demon-muted hover:text-demon-black"
            >
              Browse Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {allProducts.slice(0, 4).map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Container>
  );
}
