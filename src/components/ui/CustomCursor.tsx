"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for magnetic & fluid trail
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers & no prefers-reduced-motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestView = target.closest("[data-cursor='view']");
      const closestCta = target.closest("button, a, [data-cursor='cta'], input, select");
      const closestDrag = target.closest("[data-cursor='drag']");

      if (closestView) {
        setCursorType("view");
      } else if (closestDrag) {
        setCursorType("drag");
      } else if (closestCta) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {cursorType === "view" ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-16 h-16 rounded-full bg-[#0D0D0D] text-[#F9F9F8] text-[9px] font-mono tracking-[0.2em] uppercase flex items-center justify-center shadow-xl border border-white/20"
        >
          VIEW
        </motion.div>
      ) : cursorType === "drag" ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 rounded-full bg-[#0D0D0D] text-[#F9F9F8] text-[9px] font-mono tracking-[0.2em] uppercase flex items-center justify-center shadow-xl border border-white/20"
        >
          DRAG
        </motion.div>
      ) : cursorType === "hover" ? (
        <motion.div
          animate={{ scale: 1.8, opacity: 0.4 }}
          transition={{ duration: 0.2 }}
          className="w-6 h-6 rounded-full border border-[#0D0D0D] bg-[#0D0D0D]/10"
        />
      ) : (
        <div className="w-2 h-2 rounded-full bg-[#0D0D0D]/80 transition-transform duration-150" />
      )}
    </motion.div>
  );
}
