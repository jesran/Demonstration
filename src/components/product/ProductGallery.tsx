"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: {
    primary: string;
    secondary: string;
    gallery?: string[];
  };
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const allImages = images.gallery && images.gallery.length > 0
    ? images.gallery
    : [images.primary, images.secondary].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-5 lg:gap-7 w-full">
      {/* Thumbnail column */}
      {allImages.length > 1 && (
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 lg:w-20">
          {allImages.map((img, idx) => (
            <button
              key={img + idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              aria-label={`View image ${idx + 1} of ${productName}`}
              className={`relative w-16 h-20 md:w-20 md:h-24 shrink-0 bg-[#F3F4F3] border transition-all ${
                activeImageIndex === idx
                  ? "border-[#0D0D0D]"
                  : "border-[#E5E5E3] opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}

      {/* Large Primary Display */}
      <div
        className="relative flex-1 min-h-[520px] lg:min-h-[760px] bg-[#F3F4F3] border border-[#E5E5E3] overflow-hidden group cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={allImages[activeImageIndex] || images.primary}
          alt={`${productName} elevation view`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={`object-contain p-10 md:p-16 lg:p-20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isZoomed ? "scale-103" : "scale-100"
          }`}
        />

        {/* Index indicator */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#767674] bg-[#F9F9F8]/80 px-2.5 py-1 border border-[#E5E5E3]">
            [0{activeImageIndex + 1} / 0{allImages.length}]
          </span>
        </div>

        <div className="absolute bottom-4 right-4 pointer-events-none hidden md:block">
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#767674]">
            HOVER TO INSPECT WEAVE
          </span>
        </div>
      </div>
    </div>
  );
}
