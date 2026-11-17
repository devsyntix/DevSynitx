interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Apply gradient text to the title (default: true) */
  gradient?: boolean;
  /** Center the heading (default: true) */
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  gradient = true,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {/* Decorative label */}
      <div
        className={`mb-4 flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-blue-500 to-violet-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/80">
          Who We Are
        </span>
        <span className="h-px w-8 bg-gradient-to-r from-violet-500 to-blue-500" />
      </div>

      {/* Title */}
      <h2
        className={`font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl ${
          gradient
            ? "bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed text-white/50 sm:text-lg md:mt-6 md:text-xl ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
