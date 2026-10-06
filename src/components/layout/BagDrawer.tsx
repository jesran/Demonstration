"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBag } from "@/context/BagContext";

export function BagDrawer() {
  const { items, itemCount, subtotal, isBagOpen, closeBag, removeItem, updateQuantity } = useBag();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBag();
    };

    if (isBagOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBagOpen, closeBag]);

  if (!isBagOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={closeBag}
        className="fixed inset-0 bg-[#0D0D0D]/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md bg-[#F9F9F8] h-full flex flex-col justify-between border-l border-[#E5E5E3] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-[#E5E5E3] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] block font-mono">
              DEMONSTATION BAG
            </span>
            <h2 id="bag-drawer-title" className="text-xs uppercase tracking-[0.14em] font-medium text-[#0D0D0D] mt-0.5">
              BAG ({itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeBag}
            aria-label="Close Shopping Bag"
            className="text-xs uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] transition-colors p-2"
          >
            [CLOSE]
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 divide-y divide-[#E5E5E3]">
          {items.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#767674] font-light">
                Your bag is currently empty.
              </p>
              <button
                type="button"
                onClick={closeBag}
                className="inline-block text-[11px] uppercase tracking-[0.16em] text-[#0D0D0D] border-b border-[#0D0D0D] pb-0.5 font-medium"
              >
                Explore The Collection →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex gap-4 first:pt-0 last:pb-0"
              >
                {/* Product Thumbnail */}
                <div className="relative w-20 aspect-[4/5] bg-[#F3F4F3] border border-[#E5E5E3] shrink-0">
                  <Image
                    src={item.product.images.primary}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeBag}
                        className="text-xs uppercase tracking-[0.06em] font-medium text-[#0D0D0D] hover:opacity-60 transition-opacity line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-xs text-[#0D0D0D] font-mono whitespace-nowrap">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-3 text-[10px] text-[#767674] tracking-wide font-light">
                      <span>Size: {item.size}</span>
                      <span>·</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#E5E5E3] text-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#767674] hover:text-[#0D0D0D]"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-mono text-[11px]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#767674] hover:text-[#0D0D0D]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] uppercase tracking-[0.12em] text-[#767674] hover:text-[#0D0D0D] font-light"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-6 md:p-8 bg-[#F3F4F3]/60 border-t border-[#E5E5E3] space-y-4">
            <div className="flex justify-between items-center text-xs uppercase tracking-[0.14em]">
              <span className="text-[#767674]">Subtotal</span>
              <span className="text-[#0D0D0D] font-medium font-mono text-sm">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[10px] text-[#767674] font-light">
              Taxes & carbon-neutral delivery calculated at checkout.
            </p>
            <button
              type="button"
              onClick={() => alert("Checkout initiated — Phase 4 Stripe integration will process this payment.")}
              className="w-full h-12 bg-[#0D0D0D] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#1C1C1C] transition-colors flex items-center justify-center"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
