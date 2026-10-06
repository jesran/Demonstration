"use client";

import { useMemo, useState } from "react";
import { Product, CatalogFilterState, SortKey } from "@/types/product";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "./ProductCard";
import { FilterDrawer } from "./FilterDrawer";
import { SortPopover, sortOptions } from "./SortPopover";
import { QuickViewModal } from "./QuickViewModal";

interface CatalogViewProps {
  initialProducts: Product[];
  initialFilters?: CatalogFilterState;
}

export function CatalogView({
  initialProducts,
  initialFilters = {},
}: CatalogViewProps) {
  const [filters, setFilters] = useState<CatalogFilterState>({
    sort: "featured",
    ...initialFilters,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Multi-attribute filter & sort logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // 1. Category
        if (filters.category && p.category !== filters.category) return false;

        // 2. Size
        if (filters.size && !p.sizes.some((s) => s.size === filters.size && s.inStock)) {
          return false;
        }

        // 3. Color
        if (filters.color && !p.colors.some((c) => c.name === filters.color)) {
          return false;
        }

        // 4. Price
        if (filters.priceRange) {
          if (filters.priceRange === "under-1500" && p.price >= 1500) return false;
          if (filters.priceRange === "1500-2500" && (p.price < 1500 || p.price > 2500)) return false;
          if (filters.priceRange === "2500-4000" && (p.price < 2500 || p.price > 4000)) return false;
          if (filters.priceRange === "4000-plus" && p.price < 4000) return false;
        }

        // 5. Fit
        if (filters.fit && p.fitType !== filters.fit) return false;

        // 6. Collection
        if (filters.collection && p.collection !== filters.collection) return false;

        // 7. Search Query
        if (filters.query) {
          const q = filters.query.toLowerCase();
          if (
            !p.name.toLowerCase().includes(q) &&
            !p.category.toLowerCase().includes(q) &&
            !p.description.toLowerCase().includes(q)
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const sort = filters.sort || "featured";
        if (sort === "newest") {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        }
        if (sort === "price-asc") {
          return a.price - b.price;
        }
        if (sort === "price-desc") {
          return b.price - a.price;
        }
        if (sort === "name-asc") {
          return a.name.localeCompare(b.name);
        }
        if (sort === "name-desc") {
          return b.name.localeCompare(a.name);
        }
        // Default "featured"
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProducts, filters]);

  // Active filters list for chips
  const activeChips = useMemo(() => {
    const list: { key: keyof CatalogFilterState; label: string }[] = [];
    if (filters.category) list.push({ key: "category", label: filters.category });
    if (filters.size) list.push({ key: "size", label: `Size: ${filters.size}` });
    if (filters.color) list.push({ key: "color", label: `Color: ${filters.color}` });
    if (filters.priceRange) {
      const labels: Record<string, string> = {
        "under-1500": "Under ₹1,500",
        "1500-2500": "₹1,500–₹2,500",
        "2500-4000": "₹2,500–₹4,000",
        "4000-plus": "₹4,000+",
      };
      list.push({ key: "priceRange", label: labels[filters.priceRange] || filters.priceRange });
    }
    if (filters.fit) list.push({ key: "fit", label: `Fit: ${filters.fit}` });
    if (filters.collection) list.push({ key: "collection", label: `Collection: ${filters.collection}` });
    return list;
  }, [filters]);

  const removeChip = (key: keyof CatalogFilterState) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleClearAll = () => {
    setFilters({ sort: filters.sort });
  };

  const currentSortLabel = useMemo(() => {
    const found = sortOptions.find((s) => s.id === (filters.sort || "featured"));
    return found ? found.label.toUpperCase() : "FEATURED";
  }, [filters.sort]);

  return (
    <Container className="w-full">
      {/* ── 1. Monolithic Collection Header ── */}
      <header className="pt-[calc(var(--header-height)+clamp(40px,6vw,80px))] pb-12 md:pb-16 text-center">
        <span className="text-[10px] uppercase tracking-[0.24em] text-[#767674] font-mono block mb-4">
          [ARCHIVE INDEX // 2026]
        </span>
        <h1
          className="text-[#0D0D0D] font-light leading-none tracking-[-0.03em] uppercase"
          style={{ fontSize: "clamp(3rem, 6.5vw, 5.25rem)" }}
        >
          THE COLLECTION
        </h1>
        <p className="mt-5 text-xs md:text-sm text-[#767674] font-light max-w-lg mx-auto leading-relaxed tracking-wide">
          Monolithic silhouettes tailored from heavyweight textiles. A seasonal study in form and quiet presence.
        </p>
      </header>

      {/* ── 2. Dedicated Control Bar: FILTERS · [COUNT] · SORT BY ── */}
      <div className="w-full border-y border-[#E5E5E3] py-4 mb-8">
        <div className="flex items-center justify-between">
          {/* Left: FILTERS Button */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            data-cursor="cta"
            aria-label="Open Filter Drawer"
            className="group inline-flex items-center gap-2 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em] text-[#0D0D0D] hover:text-[#767674] transition-colors"
          >
            <span>FILTERS</span>
            {activeChips.length > 0 ? (
              <span className="px-1.5 py-0.5 bg-[#0D0D0D] text-white text-[9px] font-mono">
                {activeChips.length}
              </span>
            ) : (
              <span className="text-xs text-[#767674] font-mono">
                [+]
              </span>
            )}
          </button>

          {/* Center: Dynamic Item Count */}
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-[#767674] font-mono">
            {filteredProducts.length} {filteredProducts.length === 1 ? "PIECE" : "PIECES"}
          </span>

          {/* Right: SORT BY Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              aria-label="Toggle Sort Options"
              aria-expanded={isSortOpen}
              className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em] text-[#0D0D0D] hover:text-[#767674] transition-colors"
            >
              <span className="hidden sm:inline text-[#767674] font-normal">SORT BY:</span>
              <span>{currentSortLabel}</span>
              <span className="text-[9px] text-[#767674] font-mono">↓</span>
            </button>

            {/* Sort Popover Dropdown */}
            <SortPopover
              isOpen={isSortOpen}
              onClose={() => setIsSortOpen(false)}
              currentSort={filters.sort || "featured"}
              onSelectSort={(newSort: SortKey) =>
                setFilters((prev) => ({ ...prev, sort: newSort }))
              }
            />
          </div>
        </div>
      </div>

      {/* ── 3. Active Filter Chips Row ── */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-6 mb-6 border-b border-[#E5E5E3]">
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#767674] font-mono mr-1">
            ACTIVE FILTERS:
          </span>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => removeChip(chip.key)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3F4F3] border border-[#E5E5E3] text-[10px] uppercase tracking-[0.1em] text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors"
            >
              <span>{chip.label}</span>
              <span className="text-[#767674] text-xs">×</span>
            </button>
          ))}

          <button
            type="button"
            onClick={handleClearAll}
            className="text-[10px] uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] font-mono underline ml-3 transition-colors"
          >
            CLEAR ALL
          </button>
        </div>
      )}

      {/* ── 4. Balanced 4-Column Product Grid ── */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-20 pb-28 md:pb-36">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border border-dashed border-[#E5E5E3] my-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[#767674] font-mono">
            NO PIECES MATCH CRITERIA
          </p>
          <button
            type="button"
            onClick={handleClearAll}
            className="mt-6 text-[10px] uppercase tracking-[0.18em] font-medium text-[#0D0D0D] border-b border-[#0D0D0D] pb-0.5"
          >
            RESET ALL FILTERS →
          </button>
        </div>
      )}

      {/* ── 5. Slide-Out Filter Drawer ── */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={(newFilters) => setFilters(newFilters)}
        onReset={handleClearAll}
        totalResults={filteredProducts.length}
      />

      {/* ── 6. Quick View Modal ── */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Container>
  );
}
