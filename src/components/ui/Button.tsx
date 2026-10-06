import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-wide uppercase text-xs disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-demon-white text-demon-black hover:bg-demon-accent active:scale-[0.98]",
    secondary:
      "bg-demon-charcoal text-demon-white hover:bg-demon-subtle active:scale-[0.98]",
    ghost:
      "bg-transparent text-demon-white hover:text-demon-accent",
    outline:
      "bg-transparent text-demon-white border border-demon-subtle hover:border-demon-stone active:scale-[0.98]",
  };

  const sizes = {
    sm: "h-9 px-4 text-[10px]",
    md: "h-11 px-6 text-xs",
    lg: "h-13 px-8 text-xs",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
