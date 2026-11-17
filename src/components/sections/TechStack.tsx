"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

interface TechItem {
  name: string;
  color: string;
}

interface TechCategory {
  label: string;
  items: TechItem[];
}

const techStack: TechCategory[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#FFFFFF" },
      { name: "Angular", color: "#DD0031" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "TypeScript", color: "#3178C6" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: ".NET", color: "#512BD4" },
      { name: "Node.js", color: "#339933" },
      { name: "Python", color: "#3776AB" },
      { name: "Java", color: "#ED8B00" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "SQL Server", color: "#CC2927" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "MongoDB", color: "#47A248" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Azure", color: "#0078D4" },
      { name: "AWS", color: "#FF9900" },
      { name: "Docker", color: "#2496ED" },
      { name: "GitHub", color: "#FFFFFF" },
      { name: "CI/CD", color: "#00C7B7" },
    ],
  },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="technologies" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Floating background orbs */}
      <div className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Technology Stack"
          subtitle="Modern tools and frameworks we use to build exceptional products"
        />

        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {techStack.map((category, index) => (
            <button
              key={category.label}
              onClick={() => setActiveTab(index)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTab === index
                  ? "border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]"
                  : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Active category tech items */}
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {techStack[activeTab].items.map((tech) => (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.15)]"
              >
                {/* Colored dot indicator */}
                <div
                  className="h-3 w-3 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: tech.color,
                    boxShadow: `0 0 12px ${tech.color}40`,
                  }}
                />

                <span className="text-center text-sm font-semibold text-white">
                  {tech.name}
                </span>

                {/* Subtle bottom glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${tech.color}80, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* All categories overview below tabs */}
        <div className="mt-16 space-y-10">
          {techStack.map((category) => (
            <div key={category.label}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">
                  {category.label}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {category.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    <span className="text-xs font-medium text-gray-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
