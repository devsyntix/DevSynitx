"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  gradientStyle: string;
}

const projects: Project[] = [
  {
    title: "CloudFlow SaaS Platform",
    category: "Cloud Infrastructure",
    description:
      "Enterprise cloud orchestration solution with real-time telemetry, auto-scaling microservices, and unified dashboard analytics.",
    technologies: ["React", "Node.js", "AWS", "Docker"],
    gradientStyle: "from-[#0071e3] via-[#29d8ff] to-[#af52de]",
  },
  {
    title: "FinTrack Analytics",
    category: "Financial Intelligence",
    description:
      "Sub-millisecond financial analytics engine delivering predictive modeling, automated reconciliation, and executive metrics.",
    technologies: ["Next.js", "Python", "PostgreSQL", "Tailwind"],
    gradientStyle: "from-[#af52de] via-[#5856d6] to-[#0071e3]",
  },
  {
    title: "MediConnect Health",
    category: "Telehealth & EHR",
    description:
      "HIPAA-compliant healthcare platform facilitating encrypted consultations, doctor-patient workflows, and unified records.",
    technologies: ["React Native", ".NET", "Azure", "WebRTC"],
    gradientStyle: "from-[#29d8ff] via-[#0071e3] to-[#5856d6]",
  },
  {
    title: "ShopSphere Global",
    category: "Modern E-Commerce",
    description:
      "High-throughput headless commerce marketplace featuring dynamic inventory streaming, AI recommendations, and global checkout.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    gradientStyle: "from-[#0071e3] via-[#30d158] to-[#29d8ff]",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-black px-6 py-28 md:py-36">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[#af52de]/10 blur-[180px]"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Selected Work"
          title="Engineered to Inspire."
          subtitle="A showcase of mission-critical custom software development, enterprise web applications, and scalable SaaS platforms delivered by DevSyntix."
        />

        {/* 2-Column iOS 27 Spatial Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 sm:mt-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="ios-glass-card rounded-[32px] overflow-hidden group flex flex-col justify-between"
            >
              {/* Spatial UI Mockup Preview with Specular Lighting */}
              <div
                className={`relative h-64 sm:h-72 bg-gradient-to-br ${project.gradientStyle} p-8 flex flex-col justify-between overflow-hidden`}
              >
                {/* Frosted grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Spatial glass pill on top */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-tight text-white bg-black/40 backdrop-blur-xl border border-white/20">
                    {project.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Simulated Spatial App Glass Frame */}
                <div className="relative z-10 p-4 rounded-2xl bg-white/[0.12] backdrop-blur-2xl border border-white/25 shadow-2xl max-w-xs group-hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff453a]" />
                    <span className="w-2 h-2 rounded-full bg-[#ffd60a]" />
                    <span className="w-2 h-2 rounded-full bg-[#30d158]" />
                    <span className="text-[10px] font-mono text-white/70 ml-1">
                      {project.title} &bull; v2.0
                    </span>
                  </div>
                  <div className="h-2 w-3/4 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-[#29d8ff] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#86868b] mb-6">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/[0.05] border border-white/10 backdrop-blur-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#29d8ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>Explore Architecture Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-mono text-[#86868b]">0{index + 1} / 04</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="ios-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-tight text-white/80 bg-white/[0.04] border border-white/10 hover:border-white/25 hover:text-white transition-all shadow-sm"
          >
            <span>Have a project in mind? Let&apos;s build together</span>
            <ExternalLink className="w-4 h-4 text-[#29d8ff]" />
          </a>
        </div>
      </div>
    </section>
  );
}
