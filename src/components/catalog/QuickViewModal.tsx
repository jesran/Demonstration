"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductSize } from "@/types/product";
import { useBag } from "@/context/BagContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return <QuickViewModalPanel key={product.id} product={product} onClose={onClose} />;
}

interface QuickViewModalPanelProps {
  product: Product;
  onClose: () => void;
}

function QuickViewModalPanel({ product, onClose }: QuickViewModalPanelProps) {
  const { addItem } = useBag();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const firstAvailable = product.sizes.find((s) => s.inStock)?.size || null;
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(firstAvailable);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Black",
  );
  const [addedMessage, setAddedMessage] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D0D0D]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container — Stitch architectural flat box */}
      <div className="relative w-full max-w-2xl bg-[#F9F9F8] border border-[#E5E5E3] z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 text-[10px] uppercase tracking-[0.16em] text-[#767674] hover:text-[#0D0D0D] transition-colors p-2 font-mono"
        >
          [CLOSE]
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-[4/5] bg-[#F3F4F3] border-b md:border-b-0 md:border-r border-[#E5E5E3]">
            <Image
              src={product.images.primary}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#767674] font-mono block mb-2">
                ARCHIVE // {product.category}
              </span>
              <h2
                id="quickview-title"
                className="text-sm uppercase tracking-[0.12em] font-medium text-[#0D0D0D]"
              >
                {product.name}
              </h2>
              <p className="text-sm text-[#0D0D0D] font-mono mt-2 tracking-tight">
                {product.currency}
                {product.price.toLocaleString("en-IN")}
              </p>

              {/* Color Selection */}
              <div className="mt-8">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] font-mono block mb-3">
                  COLOR: <span className="text-[#0D0D0D]">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={`Select color ${c.name}`}
                      className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] font-mono border transition-all ${
                        selectedColor === c.name
                          ? "border-[#0D0D0D] bg-[#0D0D0D] text-white"
                          : "border-[#E5E5E3] text-[#0D0D0D] hover:border-[#0D0D0D] bg-[#F3F4F3]/50"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-7">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] font-mono block mb-3">
                  SIZE:{" "}
                  <span className="text-[#0D0D0D]">
                    {selectedSize || "SELECT"}
                  </span>
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {product.sizes.map(({ size, inStock }) => (
                    <button
                      key={size}
                      type="button"
                      disabled={!inStock}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 text-[10px] font-mono uppercase tracking-[0.1em] border transition-all ${
                        !inStock
                          ? "opacity-25 cursor-not-allowed border-[#E5E5E3] line-through text-[#767674]"
                          : selectedSize === size
                          ? "border-[#0D0D0D] bg-[#0D0D0D] text-white"
                          : "border-[#E5E5E3] text-[#0D0D0D] hover:border-[#0D0D0D] bg-[#F3F4F3]/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-2.5 pt-6 border-t border-[#E5E5E3]">
              <button
                type="button"
                disabled={!selectedSize}
                onClick={handleAddToBag}
                className={`w-full h-12 flex items-center justify-center text-[10px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  !selectedSize
                    ? "bg-[#E5E5E3] text-[#767674] cursor-not-allowed"
                    : addedMessage
                    ? "bg-[#0D0D0D] text-white"
                    : "bg-[#0D0D0D] text-white hover:bg-[#1C1C1C]"
                }`}
              >
                {addedMessage
                  ? `ADDED TO BAG (${selectedSize})`
                  : selectedSize
                  ? "ADD TO BAG"
                  : "SELECT SIZE"}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className="w-full h-11 border border-[#E5E5E3] text-[#0D0D0D] text-[10px] uppercase tracking-[0.16em] hover:border-[#0D0D0D] font-mono transition-colors"
              >
                {isWishlisted ? "SAVED IN WISHLIST ✓" : "+ ADD TO WISHLIST"}
              </button>

              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="w-full text-center text-[10px] uppercase tracking-[0.16em] text-[#767674] hover:text-[#0D0D0D] transition-colors pt-2 font-mono"
              >
                VIEW FULL SPECIFICATION →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
