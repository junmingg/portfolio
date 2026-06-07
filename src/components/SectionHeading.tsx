import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  index,
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12 max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-sm text-accent">{index}</span>
          <span className="h-px w-8 bg-accent/40" />
          <span className="text-mono-label">{kicker}</span>
        </div>
        <h2 className="text-balance text-4xl leading-[1.05] sm:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
