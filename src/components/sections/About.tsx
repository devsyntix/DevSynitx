"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

interface Stat {
  value: string;
  numericEnd: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  {
    value: "50+",
    numericEnd: 50,
    suffix: "+",
    label: "Enterprise Solutions",
    sublabel: "Shipped globally with 100% SLA",
  },
  {
    value: "25+",
    numericEnd: 25,
    suffix: "+",
    label: "Partner Clients",
    sublabel: "From seed-stage to Fortune 500",
  },
  {
    value: "5+",
    numericEnd: 5,
    suffix: "+",
    label: "Years of Engineering",
    sublabel: "Deep cloud & AI mastery",
  },
  {
    value: "99%",
    numericEnd: 99,
    suffix: "%",
    label: "Client Retention",
    sublabel: "Long-term engineering partnerships",
  },
];

function useCountUp(end: number, duration = 1800, trigger = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Apple ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
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

function AppleStatCard({ stat, inView }: { stat: Stat; inView: boolean }) {
  const count = useCountUp(stat.numericEnd, 1800, inView);

  return (
    <div className="ios-glass-card p-8 rounded-[28px] relative overflow-hidden group">
      {/* Specular top corner highlight */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <div className="flex flex-col gap-2">
        <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white flex items-baseline">
          <span>{inView ? count : 0}</span>
          <span className="text-[#29d8ff] text-4xl ml-0.5">{stat.suffix}</span>
        </div>
        <h4 className="text-base font-semibold tracking-tight text-white/90 mt-2">
          {stat.label}
        </h4>
        <p className="text-xs text-[#86868b] leading-relaxed">
          {stat.sublabel}
        </p>
      </div>
    </div>
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 md:py-36 px-6"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#af52de]/10 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Apple Style Section Header */}
        <SectionHeading
          title="Technology Meets Creativity."
          subtitle="DevSyntix is a technology-driven company focused on building innovative software solutions, scalable applications, and intelligent digital experiences that help businesses grow."
        />

        {/* Apple Squircles Metric Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-16 sm:mt-20">
          {stats.map((stat) => (
            <AppleStatCard key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
