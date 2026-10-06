import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

/**
 * Global DEMONSTATION Content Container
 * Enforces unified horizontal alignment across all breakpoints:
 * - max-width: 1440px centered
 * - padding-inline: clamp(20px, 4.5vw, 64px)
 * - Zero content touches browser edges
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("content-container", className)}>
      {children}
    </Tag>
  );
}
