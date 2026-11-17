"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

interface TechItem {
  name: string;
  color: string;
  tag: string;
}

interface TechCategory {
  label: string;
  items: TechItem[];
}

const techStack: TechCategory[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", color: "#61DAFB", tag: "UI Framework" },
      { name: "Next.js", color: "#FFFFFF", tag: "Full-Stack React" },
      { name: "TypeScript", color: "#3178C6", tag: "Typed Architecture" },
      { name: "Angular", color: "#DD0031", tag: "Enterprise Client" },
      { name: "JavaScript", color: "#F7DF1E", tag: "Modern ESNext" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: ".NET Core", color: "#512BD4", tag: "Enterprise API" },
      { name: "Node.js", color: "#339933", tag: "Event Runtime" },
      { name: "Python", color: "#3776AB", tag: "AI & Microservices" },
      { name: "Java", color: "#ED8B00", tag: "Robust Distributed" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "PostgreSQL", color: "#4169E1", tag: "Relational ACID" },
      { name: "SQL Server", color: "#CC2927", tag: "Enterprise Relational" },
      { name: "MongoDB", color: "#47A248", tag: "Document Store" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Azure", color: "#0078D4", tag: "Enterprise Cloud" },
      { name: "AWS", color: "#FF9900", tag: "Scalable Infra" },
      { name: "Docker", color: "#2496ED", tag: "Containers" },
      { name: "GitHub Actions", color: "#FFFFFF", tag: "CI/CD Automation" },
      { name: "CI/CD Pipelines", color: "#29D8FF", tag: "Zero-Downtime Deploy" },
    ],
  },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="technologies" className="relative overflow-hidden bg-black px-6 py-28 md:py-36">
      {/* Ambient background blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#0071e3]/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#af52de]/10 blur-[150px]"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Technology Matrix"
          title="Modern Stack. Infinite Scale."
          subtitle="Battle-tested frameworks, cloud infrastructure, and modern toolchains powering our software solutions."
        />

        {/* iOS 27 Segmented Control Tab Switcher */}
        <div className="mt-14 sm:mt-16 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] max-w-full overflow-x-auto">
            {techStack.map((category, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={category.label}
                  onClick={() => setActiveTab(index)}
                  className={`ios-btn px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/[0.14] shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Squircles */}
        <div className="mx-auto max-w-4xl mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {techStack[activeTab].items.map((tech) => (
              <div
                key={tech.name}
                className="ios-glass-card p-6 rounded-[24px] relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Top specular highlight */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full shadow-lg"
                      style={{
                        backgroundColor: tech.color,
                        boxShadow: `0 0 12px ${tech.color}60`,
                      }}
                    />
                    <span className="text-base font-semibold tracking-tight text-white">
                      {tech.name}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#86868b]">
                  <span>{tech.tag}</span>
                  <span className="font-mono text-[10px] text-white/40">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Stack Ecosystem Pills */}
        <div className="mt-18 pt-12 border-t border-white/[0.08] text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#86868b] block mb-6">
            Supported Enterprise Ecosystem
          </span>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {[
              "React", "Next.js", "TypeScript", ".NET", "Python", "Node.js", 
              "PostgreSQL", "SQL Server", "MongoDB", "AWS", "Azure", "Docker", "CI/CD"
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-white/25 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
