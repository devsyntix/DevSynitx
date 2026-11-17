import React from "react";
import Image from "next/image";

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
    sm: { width: 32, height: 32, textSize: "text-lg" },
    md: { width: 40, height: 40, textSize: "text-xl" },
    lg: { width: 52, height: 52, textSize: "text-2xl" },
    xl: { width: 68, height: 68, textSize: "text-3xl" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* 3D Geometric Ribbon Logo Mark */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-900/30 via-slate-900/50 to-cyan-950/30 p-1.5 border border-cyan-500/20 shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)] transition-transform duration-300 hover:scale-105"
        style={{ width: iconDimensions.width, height: iconDimensions.height }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,180,255,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="blueRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0047FF" />
              <stop offset="50%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#002999" />
            </linearGradient>
            <linearGradient id="cyanRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>
            <linearGradient id="darkFold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00359E" />
              <stop offset="100%" stopColor="#001859" />
            </linearGradient>
          </defs>

          {/* Top back fold */}
          <path
            d="M20 34 L72 14 L80 32 L28 52 Z"
            fill="url(#blueRibbon)"
          />
          {/* Top front upright panel */}
          <path
            d="M48 24 L78 35 L78 62 L48 51 Z"
            fill="url(#cyanRibbon)"
            opacity="0.95"
          />
          {/* Left upright front panel */}
          <path
            d="M18 35 L48 46 L48 73 L18 62 Z"
            fill="url(#cyanRibbon)"
          />
          {/* Bottom back fold */}
          <path
            d="M24 64 L76 44 L84 62 L32 82 Z"
            fill="url(#darkFold)"
          />
          {/* Bottom horizontal fold bar */}
          <path
            d="M24 64 L78 64 L78 80 L24 80 Z"
            fill="url(#blueRibbon)"
          />
        </svg>
      </div>

      {/* DevSyntix Wordmark */}
      {showWordmark && (
        <div className="flex items-center tracking-tight font-heading">
          <span className={`font-black text-white ${iconDimensions.textSize}`}>
            Dev
          </span>
          <span
            className={`font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent ${iconDimensions.textSize}`}
          >
            Syntix
          </span>
          {/* Stylized code brackets accent like brand banner */}
          <span className="ml-1 text-cyan-400 text-sm font-mono font-bold tracking-tighter opacity-80">
            &lt;/&gt;
          </span>
        </div>
      )}
    </div>
  );
}
