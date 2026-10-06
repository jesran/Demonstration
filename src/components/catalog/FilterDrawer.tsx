"use client";

import { useEffect, useState } from "react";
import {
  CatalogFilterState,
  ProductCategory,
  ProductColorName,
  ProductFit,
  ProductCollection,
  ProductSize,
  PriceRangeKey,
} from "@/types/product";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: CatalogFilterState;
  onFilterChange: (newFilters: CatalogFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const categories: ProductCategory[] = [
  "T-Shirts",
  "Hoodies",
  "Trousers",
  "Jackets",
  "Shirts",
];

const sizes: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

const colors: { name: ProductColorName; hex: string }[] = [
  { name: "Black", hex: "#0D0D0D" },
  { name: "White", hex: "#F9F9F8" },
  { name: "Grey", hex: "#4A4744" },
  { name: "Brown", hex: "#3B2F2F" },
  { name: "Navy", hex: "#1E2A38" },
];

const priceRanges: { id: PriceRangeKey; label: string }[] = [
  { id: "under-1500", label: "Under ₹1,500" },
  { id: "1500-2500", label: "₹1,500 – ₹2,500" },
  { id: "2500-4000", label: "₹2,500 – ₹4,000" },
  { id: "4000-plus", label: "₹4,000+" },
];

const fits: ProductFit[] = ["Oversized", "Relaxed", "Regular", "Slim"];

const collections: ProductCollection[] = ["New Arrivals", "Core", "Editorial"];

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: FilterDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <FilterDrawerPanel
      filters={filters}
      onClose={onClose}
      onFilterChange={onFilterChange}
      onReset={onReset}
      totalResults={totalResults}
    />
  );
}

function FilterDrawerPanel({
  filters,
  onClose,
  onFilterChange,
  onReset,
  totalResults,
}: Omit<FilterDrawerProps, "isOpen">) {
  const [draft, setDraft] = useState<CatalogFilterState>(filters);

  const [accordions, setAccordions] = useState<{ [key: string]: boolean }>({
    category: true,
    size: true,
    color: true,
    price: false,
    fit: false,
    collection: false,
  });

  const toggleAccordion = (key: string) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategoryToggle = (cat: ProductCategory) => {
    setDraft((prev) => ({
      ...prev,
      category: prev.category === cat ? undefined : cat,
    }));
  };

  const handleSizeToggle = (s: ProductSize) => {
    setDraft((prev) => ({
      ...prev,
      size: prev.size === s ? undefined : s,
    }));
  };

  const handleColorToggle = (col: ProductColorName) => {
    setDraft((prev) => ({
      ...prev,
      color: prev.color === col ? undefined : col,
    }));
  };

  const handlePriceToggle = (p: PriceRangeKey) => {
    setDraft((prev) => ({
      ...prev,
      priceRange: prev.priceRange === p ? undefined : p,
    }));
  };

  const handleFitToggle = (f: ProductFit) => {
    setDraft((prev) => ({
      ...prev,
      fit: prev.fit === f ? undefined : f,
    }));
  };

  const handleCollectionToggle = (col: ProductCollection) => {
    setDraft((prev) => ({
      ...prev,
      collection: prev.collection === col ? undefined : col,
    }));
  };

  const handleApply = () => {
    onFilterChange(draft);
    onClose();
  };

  const handleClear = () => {
    setDraft({ sort: draft.sort });
    onReset();
  };

  const activeCount = [
    draft.category,
    draft.size,
    draft.color,
    draft.priceRange,
    draft.fit,
    draft.collection,
  ].filter(Boolean).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filters-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D0D0D]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[380px] md:max-w-[420px] h-full bg-[#F9F9F8] border-l border-[#E5E5E3] z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-7 py-6 border-b border-[#E5E5E3] flex items-center justify-between sticky top-0 bg-[#F9F9F8] z-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] font-mono block">
              CATALOG SPEC
            </span>
            <h2
              id="filters-drawer-title"
              className="text-xs uppercase tracking-[0.14em] font-medium text-[#0D0D0D] mt-0.5"
            >
              FILTERS {activeCount > 0 && `(${activeCount})`}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="text-xs uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] transition-colors p-2"
          >
            [CLOSE]
          </button>
        </div>

        {/* Filter Accordion Body */}
        <div className="px-7 py-6 space-y-6 flex-1 overflow-y-auto divide-y divide-[#E5E5E3]">
          {/* 1. CATEGORY */}
          <div className="pt-4 first:pt-0 pb-4">
            <button
              type="button"
              onClick={() => toggleAccordion("category")}
              className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.14em] font-medium text-[#0D0D0D] py-1"
            >
              <span>Category {draft.category && `[${draft.category}]`}</span>
              <span className="text-xs font-mono text-[#767674]">
                {accordions.category ? "−" : "+"}
              </span>
            </button>
            {accordions.category && (
              <div className="pt-3 space-y-2">
                {categories.map((cat) => {
                  const isSelected = draft.category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryToggle(cat)}
                      className={`w-full text-left flex items-center justify-between py-1 text-xs transition-colors ${
                        isSelected
                          ? "text-[#0D0D0D] font-medium"
                          : "text-[#767674] hover:text-[#0D0D0D]"
                      }`}
                    >
                      <span className="uppercase tracking-[0.04em]">{cat}</span>
                      {isSelected && <span className="text-[10px] font-mono">●</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. SIZE */}
          <div className="pt-4 pb-4">
            <button
              type="button"
              onClick={() => toggleAccordion("size")}
              className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.14em] font-medium text-[#0D0D0D] py-1"
            >
              <span>Size {draft.size && `[${draft.size}]`}</span>
              <span className="text-xs font-mono text-[#767674]">
                {accordions.size ? "−" : "+"}
              </span>
            </button>
            {accordions.size && (
              <div className="pt-3 grid grid-cols-3 gap-2">
                {sizes.map((s) => {
                  const isSelected = draft.size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSizeToggle(s)}
                      className={`h-10 text-[11px] uppercase tracking-[0.1em] font-mono border transition-all ${
                        isSelected
                          ? "border-[#0D0D0D] bg-[#0D0D0D] text-white"
                          : "border-[#E5E5E3] text-[#0D0D0D] hover:border-[#0D0D0D] bg-[#F3F4F3]/50"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. COLOR */}
          <div className="pt-4 pb-4">
            <button
              type="button"
              onClick={() => toggleAccordion("color")}
              className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.14em] font-medium text-[#0D0D0D] py-1"
            >
              <span>Color {draft.color && `[${draft.color}]`}</span>
              <span className="text-xs font-mono text-[#767674]">
                {accordions.color ? "−" : "+"}
              </span>
            </button>
            {accordions.color && (
              <div className="pt-3 space-y-2">
                {colors.map((c) => {
                  const isSelected = draft.color === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleColorToggle(c.name)}
                      className={`w-full text-left flex items-center justify-between py-1 text-xs transition-colors ${
                        isSelected
                          ? "text-[#0D0D0D] font-medium"
                          : "text-[#767674] hover:text-[#0D0D0D]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 border border-[#E5E5E3]"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="uppercase tracking-[0.04em]">{c.name}</span>
                      </div>
                      {isSelected && <span className="text-[10px] font-mono">●</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. PRICE RANGE */}
          <div className="pt-4 pb-4">
            <button
              type="button"
              onClick={() => toggleAccordion("price")}
              className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.14em] font-medium text-[#0D0D0D] py-1"
            >
              <span>Price Range</span>
              <span className="text-xs font-mono text-[#767674]">
                {accordions.price ? "−" : "+"}
              </span>
            </button>
            {accordions.price && (
              <div className="pt-3 space-y-2">
                {priceRanges.map((pr) => {
                  const isSelected = draft.priceRange === pr.id;
                  return (
                    <button
                      key={pr.id}
                      type="button"
                      onClick={() => handlePriceToggle(pr.id)}
                      className={`w-full text-left flex items-center justify-between py-1 text-xs transition-colors ${
                        isSelected
                          ? "text-[#0D0D0D] font-medium"
                          : "text-[#767674] hover:text-[#0D0D0D]"
                      }`}
                    >
                      <span className="font-mono">{pr.label}</span>
                      {isSelected && <span className="text-[10px] font-mono">●</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. FIT */}
          <div className="pt-4 pb-4">
            <button
              type="button"
              onClick={() => toggleAccordion("fit")}
              className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.14em] font-medium text-[#0D0D0D] py-1"
            >
              <span>Fit {draft.fit && `[${draft.fit}]`}</span>
              <span className="text-xs font-mono text-[#767674]">
                {accordions.fit ? "−" : "+"}
              </span>
            </button>
            {accordions.fit && (
              <div className="pt-3 space-y-2">
                {fits.map((f) => {
                  const isSelected = draft.fit === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => handleFitToggle(f)}
                      className={`w-full text-left flex items-center justify-between py-1 text-xs transition-colors ${
                        isSelected
                          ? "text-[#0D0D0D] font-medium"
                          : "text-[#767674] hover:text-[#0D0D0D]"
                      }`}
                    >
                      <span className="uppercase tracking-[0.04em]">{f}</span>
                      {isSelected && <span className="text-[10px] font-mono">●</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Bar Bottom */}
        <div className="p-6 md:p-7 border-t border-[#E5E5E3] bg-[#F3F4F3]/50 sticky bottom-0 z-10 space-y-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 h-12 bg-[#0D0D0D] text-white text-[10px] uppercase tracking-[0.18em] font-medium hover:bg-[#1C1C1C] transition-colors flex items-center justify-center"
            >
              APPLY FILTERS
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-5 h-12 border border-[#E5E5E3] text-[#767674] text-[10px] uppercase tracking-[0.14em] hover:text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors flex items-center justify-center font-mono"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
