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
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Multi-phase scroll progression for the Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. Hero image scales from 1.0 to 1.08 subtly
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.08]
  );

  // 2. Parallax translateY for hero background & text
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-18%"]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, prefersReducedMotion ? 1 : 0]
  );

  // 3. Container transforms smoothly from full bleed to contained inset
  const insetPadding = useTransform(
    scrollYProgress,
    [0, 0.8],
    prefersReducedMotion ? ["0px", "0px"] : ["0px", "32px"]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.8],
    prefersReducedMotion ? ["0px", "0px"] : ["0px", "12px"]
  );

  return (
    <div ref={containerRef} className="relative w-full h-[110vh] bg-[#0D0D0D]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Animated Inset Container */}
        <motion.div
          style={{
            padding: insetPadding,
          }}
          className="w-full h-full relative"
        >
          <motion.div
            style={{ borderRadius }}
            className="w-full h-full relative overflow-hidden bg-[#0D0D0D]"
          >
            {/* Background Campaign Visual */}
            <motion.div
              style={{ scale: imageScale }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src="/images/hero/hero-campaign.jpg"
                alt="DEMONSTATION Autumn/Winter Campaign"
                className="w-full h-full object-cover object-[50%_40%] filter brightness-[0.78] contrast-[1.05]"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/45 pointer-events-none" />
            </motion.div>

            {/* Foreground Content */}
            <Container className="relative h-full flex flex-col justify-between pt-28 pb-16 md:pb-20 text-white z-10">
              {/* Top Index Header */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between border-b border-white/20 pb-4"
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/80 font-mono">
                  AUTUMN / WINTER 2026
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/80 font-mono">
                  EDITION 01 — FORM
                </span>
              </motion.div>

              {/* Center / Bottom Cinematic Typography & Direct Action */}
              <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="max-w-3xl space-y-8"
              >
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-white font-light leading-[0.92] tracking-[-0.03em] uppercase"
                    style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.8rem)" }}
                  >
                    FORM FOLLOWS
                    <br />
                    PRESENCE.
                  </motion.h1>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2"
                >
                  <MagneticButton strength={0.2}>
                    <Link
                      href="/shop"
                      data-cursor="cta"
                      className="inline-flex items-center justify-center h-13 px-8 bg-white text-[#0D0D0D] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#EDEDEC] transition-colors shadow-2xl"
                    >
                      EXPLORE THE COLLECTION →
                    </Link>
                  </MagneticButton>

                  <MagneticButton strength={0.2}>
                    <Link
                      href="/lookbook"
                      data-cursor="cta"
                      className="inline-flex items-center justify-center h-13 px-8 border border-white/40 text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:border-white transition-colors"
                    >
                      VIEW LOOKBOOK
                    </Link>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </Container>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
