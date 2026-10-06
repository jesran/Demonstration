"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CinematicTextRevealProps {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  style?: React.CSSProperties;
}

export function CinematicTextReveal({
  lines,
  className = "",
  delay = 0,
  as: Component = "h2",
  style,
}: CinematicTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <Component className={className} style={style}>
      <span ref={containerRef} className="block overflow-hidden">
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden pb-1">
            <motion.span
              initial={{ y: "115%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{
                duration: 0.95,
                delay: delay + index * 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  );
}
