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
import { CinematicTextReveal } from "@/components/ui/CinematicTextReveal";

export function EditorialCampaign() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax multi-layer movement: Main large visual moves at 0.85x speed, detail visual at 1.15x
  const mainVisualY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["30px", "-30px"]
  );

  const detailVisualY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["-40px", "40px"]
  );

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden bg-[#F9F9F8] border-t border-[#E5E5E3]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Main Large Visual with Clip Mask Reveal */}
          <div className="lg:col-span-7">
            <motion.div
              style={{ y: mainVisualY }}
              className="relative aspect-[4/5] bg-[#ECECE9] overflow-hidden border border-[#E5E5E3] shadow-lg group"
              data-cursor="view"
            >
              <motion.img
                src="/images/editorial/editorial-walking.jpg"
                alt="DEMONSTATION Campaign Series - Walking Study"
                className="w-full h-full object-cover object-[52%_center] filter contrast-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                loading="lazy"
              />
              <span className="absolute bottom-6 left-6 text-[9px] uppercase tracking-[0.2em] text-[#F9F9F8] font-mono bg-black/40 px-3 py-1.5 backdrop-blur-sm border border-white/20">
                SERIES 01 // TEXTILE STUDY
              </span>
            </motion.div>
          </div>

          {/* Secondary Asymmetrical Text & Secondary Silhouette */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#767674] font-mono block mb-4">
                [CAMPAIGN DOSSIER]
              </span>

              <CinematicTextReveal
                lines={["BUILT FOR", "REPETITION."]}
                as="h2"
                className="text-[#0D0D0D] font-light leading-[0.94] tracking-[-0.03em] uppercase"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              />

              <p className="mt-6 text-sm text-[#767674] leading-relaxed font-light">
                Each silhouette is calibrated for longevity. Pure proportions, reinforced seams, and heavyweight textures created to wear every day without diminishing in structure.
              </p>
            </div>

            {/* Inset Secondary Visual with Counter-Parallax */}
            <motion.div
              style={{ y: detailVisualY }}
              className="relative aspect-[3/2] bg-[#ECECE9] overflow-hidden border border-[#E5E5E3] shadow-md group"
              data-cursor="view"
            >
              <img
                src="/images/editorial/detail-stitching.jpg"
                alt="DEMONSTATION Ribbed Crewneck Construction Detail"
                className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 group-hover:scale-104"
                loading="lazy"
              />
              <span className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.18em] text-[#F9F9F8] font-mono bg-black/40 px-2.5 py-1 backdrop-blur-sm border border-white/20">
                WEAVE & STITCH STUDY
              </span>
            </motion.div>

            <div>
              <Link
                href="/lookbook"
                data-cursor="cta"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#767674] transition-colors font-medium border-b border-[#0D0D0D] pb-1"
              >
                <span>EXPLORE FULL EDITORIAL</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
