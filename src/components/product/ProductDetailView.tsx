"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, ProductSize } from "@/types/product";
import { useBag } from "@/context/BagContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductGallery } from "./ProductGallery";
import { ProductAccordion } from "./ProductAccordion";
import { ProductCard } from "@/components/catalog/ProductCard";
import { QuickViewModal } from "@/components/catalog/QuickViewModal";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addItem } = useBag();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Black"
  );
  const [isBagAdded, setIsBagAdded] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor);
    setIsBagAdded(true);
    setTimeout(() => setIsBagAdded(false), 2400);
  };

  const accordionItems = [
    {
      id: "description",
      title: "Description",
      content: product.description,
    },
    {
      id: "material",
      title: "Material & Craft",
      content: product.material,
    },
    {
      id: "fit",
      title: "Fit & Sizing",
      content: product.fit,
    },
    {
      id: "shipping",
      title: "Shipping",
      content:
        product.shippingInfo ||
        "Dispatched within 24 hours. Complimentary express carbon-neutral delivery across India.",
    },
    {
      id: "returns",
      title: "Returns & Exchanges",
      content:
        product.returnsInfo ||
        "Complimentary 14-day home pick-up returns and size exchanges. Items must be in original condition.",
    },
  ];

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="pt-[calc(var(--header-height)+clamp(24px,4vw,40px))] pb-5 border-b border-[#E5E5E3]"
      >
        <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#767674] font-mono">
          <li>
            <Link href="/" className="hover:text-[#0D0D0D] transition-colors">
              INDEX
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/shop" className="hover:text-[#0D0D0D] transition-colors">
              COLLECTION
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#0D0D0D] font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Main PDP Grid: Gallery Left, Monolithic Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-12 md:py-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 xl:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Sticky Product Purchase Details */}
        <div className="lg:col-span-5 xl:col-span-4 xl:col-start-9 flex flex-col justify-start lg:sticky lg:top-32 lg:self-start">
          {/* Metadata & Title */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#767674] font-mono block">
              {product.collection} // {product.category}
            </span>
            <h1
              className="text-[#0D0D0D] font-light leading-[0.95] tracking-[-0.03em] uppercase max-w-xl"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {product.name}
            </h1>
            <p className="text-2xl text-[#0D0D0D] font-light font-mono tracking-tight">
              {product.currency}
              {product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-[#767674] font-mono">
              INCLUSIVE OF ALL TAXES · CARBON NEUTRAL SHIPPING
            </p>
          </div>

          {/* Color Selector */}
          <div className="mt-10 border-t border-[#E5E5E3] pt-7">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#0D0D0D] font-mono font-medium">
                COLOR
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] font-mono">
                {selectedColor}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={`Select color ${color.name}`}
                  className={`flex h-11 items-center justify-center gap-2 border text-[10px] uppercase tracking-[0.12em] font-mono transition-colors ${
                    selectedColor === color.name
                      ? "border-[#0D0D0D] bg-[#0D0D0D] text-white"
                      : "border-[#E5E5E3] text-[#0D0D0D] hover:border-[#0D0D0D] bg-[#F3F4F3]/50"
                  }`}
                >
                  <span
                    className="w-2 h-2 border border-black/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-10 border-t border-[#E5E5E3] pt-7">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#0D0D0D] font-mono font-medium">
                SELECT SIZE
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] font-mono underline cursor-pointer hover:text-[#0D0D0D]">
                MEASUREMENTS GUIDE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.sizes.map(({ size, inStock }) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!inStock}
                    onClick={() => setSelectedSize(size)}
                    className={`h-14 text-xs uppercase tracking-[0.14em] font-mono border transition-all ${
                      !inStock
                        ? "opacity-35 cursor-not-allowed border-[#E5E5E3] line-through text-[#767674] bg-[#F3F4F3]/30"
                        : isSelected
                        ? "border-[#0D0D0D] bg-[#0D0D0D] text-white font-medium"
                        : "border-[#E5E5E3] text-[#0D0D0D] hover:border-[#0D0D0D] bg-[#F3F4F3]/50"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Bag CTA & Wishlist Button */}
          <div className="mt-10 flex flex-col gap-3">
            <button
              type="button"
              disabled={!selectedSize}
              onClick={handleAddToBag}
              className={`w-full h-14 flex items-center justify-center text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                !selectedSize
                  ? "bg-[#E5E5E3] text-[#767674] cursor-not-allowed"
                  : isBagAdded
                  ? "bg-[#0D0D0D] text-white"
                  : "bg-[#0D0D0D] text-white hover:bg-[#1C1C1C]"
              }`}
            >
              {isBagAdded
                ? `ADDED TO BAG — SIZE ${selectedSize}`
                : selectedSize
                ? "ADD TO BAG"
                : "SELECT SIZE"}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="w-full h-12 border border-[#E5E5E3] text-[#0D0D0D] text-[10px] uppercase tracking-[0.18em] hover:border-[#0D0D0D] font-mono transition-colors"
            >
              {isWishlisted ? "SAVED IN WISHLIST ✓" : "+ SAVE TO WISHLIST"}
            </button>

            <span className="text-[10px] uppercase tracking-[0.14em] text-[#767674] text-center font-mono mt-2">
              COMPLIMENTARY DELIVERY & RETURNS INCLUDED
            </span>
          </div>

          {/* Accordion Specification Details */}
          <div className="mt-8">
            <ProductAccordion items={accordionItems} />
          </div>
        </div>
      </div>

      {/* ── Related Products Grid ── */}
      {relatedProducts.length > 0 && (
        <section className="py-20 border-t border-[#E5E5E3] my-12">
          <div className="flex items-end justify-between mb-10 border-b border-[#E5E5E3] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#767674] font-mono block mb-2">
                INDEX // CURATED COMPLEMENTS
              </span>
              <h2 className="text-xl md:text-2xl uppercase tracking-[-0.02em] text-[#0D0D0D] font-light">
                RELATED PIECES
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-[10px] uppercase tracking-[0.16em] text-[#767674] hover:text-[#0D0D0D] transition-colors font-mono"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relProduct, idx) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                index={idx}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
