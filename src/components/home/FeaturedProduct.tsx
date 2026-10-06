"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { featuredProduct } from "@/lib/data";
import { useBag } from "@/context/BagContext";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function FeaturedProduct() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { addItem, openBag } = useBag();

  // Sticky 200vh Apple-style multi-step keynote sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Step 1: Scale from 0.88 -> 1.04
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    prefersReducedMotion ? [1, 1, 1, 1, 1] : [0.88, 1.04, 1.04, 0.96, 0.92]
  );

  // Step 2 & 3: Product shifts position laterally
  const imageX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion
      ? ["0%", "0%", "0%", "0%", "0%"]
      : ["0%", "-12%", "12%", "-16%", "-22%"]
  );

  // Step Callouts Opacities & Y positions
  // Callout 1: 450 GSM
  const step1Opacity = useTransform(scrollYProgress, [0.06, 0.18, 0.3], [0, 1, 0]);
  const step1Y = useTransform(scrollYProgress, [0.06, 0.18, 0.3], ["24px", "0px", "-16px"]);

  // Callout 2: OVERSIZED SILHOUETTE
  const step2Opacity = useTransform(scrollYProgress, [0.32, 0.44, 0.56], [0, 1, 0]);
  const step2Y = useTransform(scrollYProgress, [0.32, 0.44, 0.56], ["24px", "0px", "-16px"]);

  // Callout 3: 100% COMBED COTTON
  const step3Opacity = useTransform(scrollYProgress, [0.58, 0.7, 0.8], [0, 1, 0]);
  const step3Y = useTransform(scrollYProgress, [0.58, 0.7, 0.8], ["24px", "0px", "-16px"]);

  // Final Step 4: Settle into position with specs & Add to Bag
  const step4Opacity = useTransform(scrollYProgress, [0.8, 0.92, 1], [0, 1, 1]);
  const step4Y = useTransform(scrollYProgress, [0.8, 0.92, 1], ["30px", "0px", "0px"]);

  const handleQuickAdd = () => {
    addItem(featuredProduct, "M", "Black", 1);
    openBag();
  };

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-[#F9F9F8] border-t border-[#E5E5E3]">
      {/* Sticky Physical Keynote Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16">
        {/* Top Progress Step Indicator */}
        <Container className="w-full">
          <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#767674]">
            <span>SPECIMEN KEYNOTE // HEAVYWEIGHT TEE</span>
            <span>4-STAGE PHYSICAL STUDY</span>
          </div>
        </Container>

        {/* Center Stage: Physical Product Traveling */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
          {/* Traveling Ghost Mannequin Product Frame */}
          <motion.div
            style={{
              scale: imageScale,
              x: imageX,
            }}
            className="relative z-10 w-[280px] sm:w-[380px] md:w-[480px] lg:w-[540px] aspect-[4/5] bg-[#F3F4F3] border border-[#E5E5E3] shadow-2xl p-8 md:p-14"
            data-cursor="view"
          >
            <Link href={`/product/${featuredProduct.slug}`} className="block w-full h-full">
              <img
                src={featuredProduct.images.primary}
                alt={featuredProduct.name}
                className="w-full h-full object-contain filter contrast-[1.02]"
              />
            </Link>
          </motion.div>

          {/* STEP 1 CALLOUT (Right side) */}
          <motion.div
            style={{ opacity: step1Opacity, y: step1Y }}
            className="absolute right-[8%] md:right-[15%] max-w-xs space-y-2 pointer-events-none"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#767674] block">
              STEP 01 // TEXTILE DENSITY
            </span>
            <h4 className="text-3xl md:text-5xl font-light uppercase text-[#0D0D0D] tracking-tight">
              450 GSM
            </h4>
            <p className="text-xs text-[#767674] font-light leading-relaxed">
              Substantial single-jersey weight crafted to hold architectural structure without collapsing.
            </p>
          </motion.div>

          {/* STEP 2 CALLOUT (Left side) */}
          <motion.div
            style={{ opacity: step2Opacity, y: step2Y }}
            className="absolute left-[8%] md:left-[15%] max-w-xs space-y-2 pointer-events-none"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#767674] block">
              STEP 02 // PROPORTION STUDY
            </span>
            <h4 className="text-3xl md:text-5xl font-light uppercase text-[#0D0D0D] tracking-tight">
              OVERSIZED FIT
            </h4>
            <p className="text-xs text-[#767674] font-light leading-relaxed">
              Engineered drop shoulders with calculated chest volume and a clean cropped vertical hem.
            </p>
          </motion.div>

          {/* STEP 3 CALLOUT (Right side) */}
          <motion.div
            style={{ opacity: step3Opacity, y: step3Y }}
            className="absolute right-[8%] md:right-[15%] max-w-xs space-y-2 pointer-events-none"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#767674] block">
              STEP 03 // NATURAL FIBER
            </span>
            <h4 className="text-3xl md:text-5xl font-light uppercase text-[#0D0D0D] tracking-tight">
              100% COTTON
            </h4>
            <p className="text-xs text-[#767674] font-light leading-relaxed">
              Combed long-staple yarn pre-shrunk for permanent form retention through weekly rotation.
            </p>
          </motion.div>

          {/* STEP 4 CALLOUT (Settled Right Deck) */}
          <motion.div
            style={{ opacity: step4Opacity, y: step4Y }}
            className="absolute right-[5%] sm:right-[10%] lg:right-[15%] max-w-sm space-y-5 bg-[#F9F9F8]/95 p-6 md:p-8 border border-[#E5E5E3] backdrop-blur-md shadow-xl"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#767674] block">
              STEP 04 // FINAL ARRIVAL
            </span>
            <h3 className="text-2xl md:text-3xl font-light uppercase text-[#0D0D0D]">
              {featuredProduct.name}
            </h3>

            <div className="flex items-baseline gap-4 font-mono">
              <span className="text-xl md:text-2xl text-[#0D0D0D]">
                {featuredProduct.currency}
                {featuredProduct.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#767674]">
                IN STOCK // DISPATCH 24H
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <MagneticButton strength={0.25} className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  data-cursor="cta"
                  className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 bg-[#0D0D0D] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#1C1C1C] transition-colors"
                >
                  ADD TO BAG →
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25} className="w-full sm:w-auto">
                <Link
                  href={`/product/${featuredProduct.slug}`}
                  data-cursor="cta"
                  className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 border border-[#E5E5E3] text-[#0D0D0D] text-[10px] uppercase tracking-[0.2em] font-medium hover:border-[#0D0D0D] transition-colors"
                >
                  VIEW PIECE
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer Ribbon */}
        <Container className="w-full">
          <div className="flex items-center justify-between border-t border-[#E5E5E3] pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#767674]">
            <span>FORM STUDY // SCROLL FOR CONTINUATION</span>
            <span>04 / 04</span>
          </div>
        </Container>
      </div>
    </div>
  );
}
