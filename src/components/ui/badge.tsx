import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-foreground/[0.03] px-2.5 py-0.5 font-mono text-[0.68rem] tracking-wide text-muted-foreground transition-colors",
        className
      )}
      {...props}
    />
  );
}
