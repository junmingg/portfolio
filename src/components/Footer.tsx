import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <span className="font-mono">{site.brand}</span>
        <span>
          © {year} {site.name}. Built with React &amp; Tailwind.
        </span>
        <a
          href="#home"
          className="transition-colors hover:text-foreground"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
