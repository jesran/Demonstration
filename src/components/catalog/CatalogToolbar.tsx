"use client";

import { CatalogFilterState } from "@/types/product";

interface CatalogToolbarProps {
  totalCount: number;
  filters: CatalogFilterState;
  onOpenFilters: () => void;
  onSortChange: (sort: CatalogFilterState["sort"]) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price — Low to High" },
  { id: "price-desc", label: "Price — High to Low" },
] as const;

export function CatalogToolbar({
  totalCount,
  filters,
  onOpenFilters,
  onSortChange,
  onClearFilters,
  activeFilterCount,
}: CatalogToolbarProps) {
  return (
    <div className="w-full border-y border-[#E5E0D5] py-4 my-8 md:my-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Filter Toggle & Active Count */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenFilters}
            className="group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] font-medium text-demon-black hover:opacity-70 transition-opacity"
          >
            <span className="w-3.5 h-3.5 flex flex-col justify-between py-0.5">
              <span className="h-px w-full bg-demon-black" />
              <span className="h-px w-3/4 bg-demon-black" />
              <span className="h-px w-full bg-demon-black" />
            </span>
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-demon-black text-white text-[9px] flex items-center justify-center font-mono">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-[10px] uppercase tracking-[0.18em] text-demon-muted hover:text-demon-black underline transition-colors"
            >
              Reset
            </button>
          )}

          <span className="text-demon-stone">|</span>

          {/* Product Count */}
          <span className="text-[10px] uppercase tracking-[0.24em] text-demon-muted font-mono">
            {totalCount} {totalCount === 1 ? "Item" : "Items"}
          </span>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label
            htmlFor="sort-select"
            className="text-[10px] uppercase tracking-[0.2em] text-demon-muted hidden sm:inline"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={filters.sort || "featured"}
            onChange={(e) =>
              onSortChange(e.target.value as CatalogFilterState["sort"])
            }
            className="bg-transparent text-[11px] uppercase tracking-[0.18em] font-medium text-demon-black border-none focus:outline-none cursor-pointer py-1 pr-2"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-[#F8F6F0] text-demon-black">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
