import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  showWordmark = true,
}: BrandLogoProps) {
  const iconDimensions = {
    sm: { width: 34, height: 34, textSize: "text-[16px]" },
    md: { width: 42, height: 42, textSize: "text-[19px]" },
    lg: { width: 50, height: 50, textSize: "text-[23px]" },
    xl: { width: 64, height: 64, textSize: "text-[28px]" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* iOS 27 Squircle 3D Emblem Container */}
      <div
        className="relative flex items-center justify-center rounded-[14px] bg-white/[0.06] backdrop-blur-2xl p-1.5 border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:scale-105"
        style={{ width: iconDimensions.width, height: iconDimensions.height }}
      >
        {/* Specular corner glint */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(41,216,255,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="appleBlueRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0071E3" />
              <stop offset="60%" stopColor="#29D8FF" />
              <stop offset="100%" stopColor="#5856D6" />
            </linearGradient>
            <linearGradient id="appleCyanRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#29D8FF" />
              <stop offset="100%" stopColor="#0071E3" />
            </linearGradient>
            <linearGradient id="appleDarkFold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A2540" />
              <stop offset="100%" stopColor="#00122A" />
            </linearGradient>
          </defs>

          {/* Top back fold */}
          <path
            d="M20 34 L72 14 L80 32 L28 52 Z"
            fill="url(#appleBlueRibbon)"
          />
          {/* Top front upright panel */}
          <path
            d="M48 24 L78 35 L78 62 L48 51 Z"
            fill="url(#appleCyanRibbon)"
            opacity="0.95"
          />
          {/* Left upright front panel */}
          <path
            d="M18 35 L48 46 L48 73 L18 62 Z"
            fill="url(#appleCyanRibbon)"
          />
          {/* Bottom back fold */}
          <path
            d="M24 64 L76 44 L84 62 L32 82 Z"
            fill="url(#appleDarkFold)"
          />
          {/* Bottom horizontal fold bar */}
          <path
            d="M24 64 L78 64 L78 80 L24 80 Z"
            fill="url(#appleBlueRibbon)"
          />
        </svg>
      </div>

      {/* Apple SF Pro Wordmark */}
      {showWordmark && (
        <div className="flex items-center tracking-[-0.035em] font-bold">
          <span className={`text-white ${iconDimensions.textSize}`}>
            Dev
          </span>
          <span
            className={`bg-gradient-to-r from-[#29d8ff] via-[#af52de] to-[#0071e3] bg-clip-text text-transparent ${iconDimensions.textSize}`}
          >
            Syntix
          </span>
          {/* Apple spatial terminal accent */}
          <span className="ml-1 text-[11px] font-mono font-medium text-[#29d8ff]/80">
            &lt;/&gt;
          </span>
        </div>
      )}
    </div>
  );
}
