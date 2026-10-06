import type React from "react";

// Navigation
export interface NavLink {
  label: string;
  href: string;
}

// Section props
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

// Button variants
export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";
