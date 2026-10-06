"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useInView,
} from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Shoe3D } from "@/components/3d/Shoe3D";

export function ShoeExperience() {
  const containerRef = useRef<HTMLElement>(null);
  const visualFrameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track if 3D model is active or falling back to 2.5D product image
  const [hasGlbModel, setHasGlbModel] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  // In-view observer for kinetic typography reveals
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  // Scroll tracking across section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Track numerical progress for R3F Canvas
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setCurrentProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Visual transformations:
  // 1. Scale from 0.92 entering -> 1.0 -> 1.08 continuing
  const visualScale = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.85],
    prefersReducedMotion ? [1, 1, 1] : [0.92, 1.0, 1.08]
  );

  // 2. 2.5D Image Fallback Rotation (when GLB is not loaded)
  const fallbackRotate = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    prefersReducedMotion ? [0, 0, 0] : [-8, 0, 14]
  );

  // 3. Typography vertical translation: translateY -30px opposite to scroll
  const textTranslateY = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    prefersReducedMotion ? ["0px", "0px"] : ["20px", "-30px"]
  );

  // 4. Subtle mouse movement on desktop: 5–10px equivalent
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { damping: 25, stiffness: 180 });
  const springY = useSpring(0, { damping: 25, stiffness: 180 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!visualFrameRef.current) return;
      const rect = visualFrameRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      setMouseOffset({ x: normX, y: normY });
      springX.set(normX * 8);
      springY.set(normY * 8);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, springX, springY]);

  // Sequential technical labels:
  // 01 / 450 GSM
  const label1Opacity = useTransform(scrollYProgress, [0.25, 0.38], [0, 1]);
  const label1Y = useTransform(scrollYProgress, [0.25, 0.38], ["14px", "0px"]);

  // 02 / STRUCTURED FORM
  const label2Opacity = useTransform(scrollYProgress, [0.4, 0.52], [0, 1]);
  const label2Y = useTransform(scrollYProgress, [0.4, 0.52], ["14px", "0px"]);

  // 03 / ENGINEERED SILHOUETTE
  const label3Opacity = useTransform(scrollYProgress, [0.54, 0.66], [0, 1]);
  const label3Y = useTransform(scrollYProgress, [0.54, 0.66], ["14px", "0px"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[75vh] lg:min-h-[85vh] bg-[#F9F9F8] border-t border-[#E5E5E3] overflow-hidden flex flex-col justify-between py-12 md:py-16"
    >
      {/* ── Top Header Strip ── */}
      <Container className="w-full">
        <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[#767674]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D] inline-block animate-pulse" />
            [PHASE 4.1 // FORM IN MOTION 3D STUDIO]
          </span>
          <span>STUDIO RECORD // 2026</span>
        </div>
      </Container>

      {/* ── Main Composition: Center 3D/2.5D Canvas & Staggered Kinetic Typography ── */}
      <div className="relative flex-1 w-full flex items-center justify-center my-8 md:my-12">
        <Container className="relative w-full h-full flex items-center justify-center">
          {/* Background Monolithic Kinetic Typography */}
          <motion.div
            style={{ y: textTranslateY }}
            className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0"
          >
            <div className="w-full flex flex-col items-center justify-center text-center leading-[0.88] uppercase font-light tracking-[-0.035em] text-[#0D0D0D]">
              {/* Word 1: FORM */}
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={isInView ? { y: "0%", opacity: 0.88 } : { y: "110%", opacity: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                  style={{ fontSize: "clamp(3.5rem, 12vw, 10.5rem)" }}
                >
                  FORM
                </motion.span>
              </div>

              {/* Word 2: IN */}
              <div className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={isInView ? { y: "0%", opacity: 0.4 } : { y: "110%", opacity: 0 }}
                  transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-mono tracking-widest text-xs md:text-lg text-[#767674]"
                >
                  — IN —
                </motion.span>
              </div>

              {/* Word 3: MOTION */}
              <div className="overflow-hidden pt-1">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={isInView ? { y: "0%", opacity: 0.88 } : { y: "110%", opacity: 0 }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                  style={{ fontSize: "clamp(3.5rem, 12vw, 10.5rem)" }}
                >
                  MOTION.
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Central Showcase Viewport: 3D Canvas with 2.5D Fallback */}
          <div
            ref={visualFrameRef}
            className="relative z-10 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] aspect-[4/5] mx-auto"
          >
            {/* R3F Real-Time 3D Component */}
            <div className="absolute inset-0 z-20">
              <Shoe3D
                modelPath="/models/demonstation-shoe.glb"
                scrollProgress={currentProgress}
                mouseOffset={mouseOffset}
                onError={() => setHasGlbModel(false)}
              />
            </div>

            {/* 2.5D Fallback Frame (Active until real GLB is dropped into public/models/) */}
            {!hasGlbModel && (
              <motion.div
                style={{
                  scale: visualScale,
                  rotateZ: fallbackRotate,
                  x: springX,
                  y: springY,
                }}
                className="relative w-full h-full bg-[#F3F4F3] border border-[#E5E5E3] shadow-2xl p-6 sm:p-10 md:p-14 overflow-hidden group cursor-crosshair"
                data-cursor="view"
              >
                {/* Corner Architectural Markers */}
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#767674]">
                  STUDIO ARCHIVE
                </div>
                <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#767674]">
                  450 GSM
                </div>

                {/* Vertical Mask Reveal */}
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <motion.div
                    initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={
                      isInView
                        ? { clipPath: "inset(0% 0% 0% 0%)" }
                        : { clipPath: "inset(100% 0% 0% 0%)" }
                    }
                    transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/products/heavyweight-tee-black.jpg"
                      alt="DEMONSTATION Form in Motion Studio Specimen"
                      className="w-full h-full object-contain filter contrast-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
                      loading="lazy"
                    />
                  </motion.div>
                </div>

                {/* Bottom Frame Hairline */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-[#E5E5E3] pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#767674]">
                  <span>ARCHITECTURAL DRAPE</span>
                  <span>HEAVY JERSEY</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Sequential Technical Labels ── */}
          {/* Label 01: Top Left */}
          <motion.div
            style={{ opacity: label1Opacity, y: label1Y }}
            className="absolute top-[12%] left-[4%] lg:left-[10%] hidden md:block max-w-[150px] space-y-1 bg-[#F9F9F8]/90 p-3 border border-[#E5E5E3] backdrop-blur-xs font-mono"
          >
            <span className="text-[10px] text-[#0D0D0D] font-medium tracking-[0.16em] block">
              01 / 450 GSM
            </span>
            <p className="text-[9px] text-[#767674] tracking-wider leading-relaxed">
              Substantial textile body crafted for permanent structure.
            </p>
          </motion.div>

          {/* Label 02: Middle Right */}
          <motion.div
            style={{ opacity: label2Opacity, y: label2Y }}
            className="absolute top-[48%] right-[4%] lg:right-[10%] hidden md:block max-w-[150px] space-y-1 bg-[#F9F9F8]/90 p-3 border border-[#E5E5E3] backdrop-blur-xs font-mono"
          >
            <span className="text-[10px] text-[#0D0D0D] font-medium tracking-[0.16em] block">
              02 / STRUCTURED FORM
            </span>
            <p className="text-[9px] text-[#767674] tracking-wider leading-relaxed">
              Maintains intentional line across movement and repose.
            </p>
          </motion.div>

          {/* Label 03: Bottom Left */}
          <motion.div
            style={{ opacity: label3Opacity, y: label3Y }}
            className="absolute bottom-[14%] left-[6%] lg:left-[12%] hidden md:block max-w-[150px] space-y-1 bg-[#F9F9F8]/90 p-3 border border-[#E5E5E3] backdrop-blur-xs font-mono"
          >
            <span className="text-[10px] text-[#0D0D0D] font-medium tracking-[0.16em] block">
              03 / ENGINEERED SILHOUETTE
            </span>
            <p className="text-[9px] text-[#767674] tracking-wider leading-relaxed">
              Calibrated proportions built for weekly rotation.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* ── Bottom Section CTA ── */}
      <Container className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#E5E5E3] pt-6 gap-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#767674]">
            [MOMENT 02 OF 07] // INTERACTIVE 3D & EDITORIAL STUDIO
          </div>

          <Link
            href="/shop"
            data-cursor="cta"
            className="group inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#0D0D0D] hover:text-[#767674] transition-colors border-b border-[#0D0D0D] pb-1"
          >
            <span>VIEW COLLECTION</span>
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 font-mono">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
