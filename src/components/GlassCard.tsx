import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("glass rounded-[var(--radius-card)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}
