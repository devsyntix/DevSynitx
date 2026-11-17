"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

interface Stat {
  value: string;
  numericEnd: number;
  suffix: string;
  label: string;
  glowColor: string;
}

const stats: Stat[] = [
  {
    value: "50+",
    numericEnd: 50,
    suffix: "+",
    label: "Projects Delivered",
    glowColor: "rgba(59,130,246,0.5)",
  },
  {
    value: "25+",
    numericEnd: 25,
    suffix: "+",
    label: "Happy Clients",
    glowColor: "rgba(139,92,246,0.5)",
  },
  {
    value: "5+",
    numericEnd: 5,
    suffix: "+",
    label: "Years Experience",
    glowColor: "rgba(6,182,212,0.5)",
  },
  {
    value: "99%",
    numericEnd: 99,
    suffix: "%",
    label: "Client Satisfaction",
    glowColor: "rgba(99,102,241,0.5)",
  },
];

function useCountUp(end: number, duration = 2000, trigger = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, trigger]);

  return count;
}

function StatCounter({
  stat,
  inView,
}: {
  stat: Stat;
  inView: boolean;
}) {
  const count = useCountUp(stat.numericEnd, 2000, inView);

  return (
    <GlassCard glowColor={stat.glowColor} hoverEffect>
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text font-heading text-4xl font-extrabold text-transparent sm:text-5xl">
          {inView ? count : 0}
          {stat.suffix}
        </span>
        <span className="text-sm font-medium tracking-wide text-white/50">
          {stat.label}
        </span>
      </div>
    </GlassCard>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050510] py-24 md:py-32"
    >
      {/* Decorative gradient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Heading */}
        <SectionHeading
          title="Technology Meets Creativity."
          subtitle="DevSyntix is a technology-driven company focused on building innovative software solutions, scalable applications, and intelligent digital experiences that help businesses grow."
        />

        {/* Divider */}
        <div className="mx-auto my-14 flex items-center justify-center gap-3 md:my-16">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/50" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
