import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        fullHeight ? "min-h-screen" : "py-24 md:py-32 lg:py-40",
        className
      )}
    >
      {children}
    </section>
  );
}
