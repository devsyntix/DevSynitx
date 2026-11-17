"use client";

import { type ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <div className="smooth-scroll-wrapper" style={{ scrollBehavior: "smooth" }}>
      {children}
    </div>
  );
}
