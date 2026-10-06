"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CinematicTextReveal } from "@/components/ui/CinematicTextReveal";

export function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax layer: foreground image moves slightly faster than background
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["40px", "-40px"]
  );

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["-20px", "20px"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    prefersReducedMotion ? [1, 1, 1] : [0.97, 1.02, 0.98]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden bg-[#F9F9F8] border-t border-[#E5E5E3]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* ── Editorial Statement: Line-by-line masked typography ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#767674] font-mono block mb-6">
                [01 / PHILOSOPHY]
              </span>

              <CinematicTextReveal
                lines={["NOT MADE", "TO BLEND IN."]}
                as="h2"
                className="text-[#0D0D0D] font-light leading-[0.92] tracking-[-0.03em] uppercase"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}
              />

              <p className="mt-8 md:mt-10 text-sm md:text-base text-[#767674] leading-relaxed max-w-md font-light">
                A rigorous study in form, movement and everyday uniform. Constructed with
                heavyweight textiles sculpted for permanent intentional presence.
              </p>
            </div>
          </div>

          {/* ── Studio Frame with Multi-layer Parallax ── */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={{ y: backgroundY }}
              className="absolute -inset-4 bg-[#EFEFED]/60 -z-10 border border-[#E5E5E3]/50 pointer-events-none"
            />

            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative overflow-hidden aspect-[4/5] max-w-[500px] mx-auto lg:ml-auto bg-[#F3F4F3] border border-[#E5E5E3] shadow-lg"
              data-cursor="view"
            >
              <div className="relative w-full h-full p-8 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start font-mono text-[9px] uppercase tracking-[0.18em] text-[#767674]">
                  <span>STUDIO STUDY 01</span>
                  <span>MUMBAI / ARCHIVE</span>
                </div>

                <div className="relative aspect-[3/4] w-full my-auto overflow-hidden bg-[#ECECE9] border border-[#E5E5E3]">
                  <motion.img
                    src="/images/editorial/editorial-standing.jpg"
                    alt="DEMONSTATION Architectural Editorial Silhouette"
                    className="w-full h-full object-cover object-[55%_center] filter contrast-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-103"
                    loading="lazy"
                  />
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-[#E5E5E3] font-mono">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#0D0D0D]">
                    STRUCTURED FORM
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-[#767674]">
                    450 GSM
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
