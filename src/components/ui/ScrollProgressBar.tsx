"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed right-2 top-0 bottom-0 w-[2px] z-50 pointer-events-none hidden md:block opacity-35"
    >
      <div className="absolute inset-0 bg-[#E5E5E3]/40" />
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-[#0D0D0D]"
      />
    </div>
  );
}
