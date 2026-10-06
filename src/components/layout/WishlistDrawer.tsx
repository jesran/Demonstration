"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useBag } from "@/context/BagContext";
import Link from "next/link";
import Image from "next/image";

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useBag();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-xs transition-opacity"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F9F8] border-l border-[#E5E5E3] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-[#E5E5E3] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] block font-mono">
                DEMONSTATION ARCHIVE
              </span>
              <h2 className="text-sm uppercase tracking-[0.12em] font-medium text-[#0D0D0D] mt-1">
                WISHLIST ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={closeWishlist}
              className="text-xs uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] transition-colors p-2"
              aria-label="Close Wishlist"
            >
              [CLOSE]
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 divide-y divide-[#E5E5E3]">
            {wishlist.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-xs uppercase tracking-[0.14em] text-[#767674]">
                  Your wishlist is empty.
                </p>
                <Link
                  href="/shop"
                  onClick={closeWishlist}
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.16em] font-medium text-[#0D0D0D] border-b border-[#0D0D0D] pb-0.5"
                >
                  Explore The Collection →
                </Link>
              </div>
            ) : (
              wishlist.map((product) => (
                <div key={product.id} className="py-6 flex gap-4 first:pt-0 last:pb-0">
                  <div className="relative w-20 h-24 bg-[#F3F4F3] shrink-0 border border-[#E5E5E3]">
                    <Image
                      src={product.images.primary}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeWishlist}
                          className="text-xs uppercase tracking-[0.06em] font-medium text-[#0D0D0D] hover:opacity-60 transition-opacity"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-[10px] text-[#767674] hover:text-[#0D0D0D] transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-[11px] text-[#767674] font-mono mt-0.5">
                        {product.currency}{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeWishlist}
                        className="text-[10px] uppercase tracking-[0.14em] font-medium text-[#0D0D0D] border border-[#0D0D0D] px-3 py-1.5 hover:bg-[#0D0D0D] hover:text-white transition-colors"
                      >
                        Select Size & Buy
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 md:p-8 border-t border-[#E5E5E3] bg-[#F3F4F3]/50">
              <Link
                href="/shop"
                onClick={closeWishlist}
                className="w-full block py-3.5 text-center bg-[#0D0D0D] text-white text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-[#1C1C1C] transition-colors"
              >
                Continue Browsing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
