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

        <Image
          src="/brand/logo.png"
          alt="DevSyntix Logo"
          width={iconDimensions.width * 2}
          height={iconDimensions.height * 2}
          className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(41,216,255,0.5)]"
          priority
        />
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
