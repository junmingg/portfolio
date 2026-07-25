import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduce = useReducedMotion();
  // Strong (desktop-class) devices get the soft blur; touch devices skip it —
  // animating filter over the glass surfaces this wraps is expensive there.
  const rich = useRichMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : rich
            ? { opacity: 0, y, filter: "blur(8px)" }
            : { opacity: 0, y }
      }
      whileInView={rich ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
