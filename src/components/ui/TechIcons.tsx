import React from "react";
import techData from "./techIconData.json";

export interface TechIconMeta {
  path: string;
  color: string;
}

export const techIcons: Record<string, TechIconMeta> = techData;

export function TechIcon({
  name,
  className = "w-5 h-5",
}: {
  name: string;
  className?: string;
}) {
  const icon = techIcons[name];

  if (!icon) {
    return (
      <span className="w-2.5 h-2.5 rounded-full bg-[#29d8ff] shadow-[0_0_8px_#29d8ff]" />
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label={`${name} brand logo`}
      className={className}
      style={{ color: icon.color }}
    >
      <path d={icon.path} />
    </svg>
  );
}
