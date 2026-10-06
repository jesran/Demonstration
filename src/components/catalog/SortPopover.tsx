"use client";

import { useEffect, useRef } from "react";
import { SortKey } from "@/types/product";

interface SortPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortKey;
  onSelectSort: (sort: SortKey) => void;
}

export const sortOptions: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Alphabetical: A–Z" },
  { id: "name-desc", label: "Alphabetical: Z–A" },
];

export function SortPopover({
  isOpen,
  onClose,
  currentSort = "featured",
  onSelectSort,
}: SortPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      role="menu"
      aria-label="Sort options"
      className="absolute right-0 top-full mt-2 w-56 bg-[#F9F9F8] border border-[#E5E5E3] z-30 py-1"
    >
      <div className="flex flex-col divide-y divide-[#E5E5E3]/50">
        {sortOptions.map((opt) => {
          const isSelected = (currentSort || "featured") === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="menuitem"
              onClick={() => {
                onSelectSort(opt.id);
                onClose();
              }}
              className={`w-full text-left px-5 py-3 text-[10px] uppercase tracking-[0.14em] font-mono transition-colors flex items-center justify-between ${
                isSelected
                  ? "text-[#0D0D0D] font-medium bg-[#F3F4F3]"
                  : "text-[#767674] hover:text-[#0D0D0D] hover:bg-[#F3F4F3]/50"
              }`}
            >
              <span>{opt.label}</span>
              {isSelected && <span className="text-[9px]">●</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
