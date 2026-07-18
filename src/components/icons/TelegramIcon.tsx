import type { SVGProps } from "react";

/**
 * Telegram brand mark (solid paper-plane glyph). Mirrors the lucide signature
 * (accepts `className`, sizes via `size-*` utilities) and fills with
 * `currentColor` so it inherits text color like the other icons.
 */
export function TelegramIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-1.97.93l-5.46-4.02-2.63 2.53c-.29.29-.53.53-1.09.53l.39-5.56 10.11-9.14c.44-.39-.1-.61-.68-.22L6.44 13.06.9 11.33c-1.2-.38-1.23-1.2.25-1.78L22.4 1.53c1-.37 1.88.24 1.51 2.26z" />
    </svg>
  );
}
