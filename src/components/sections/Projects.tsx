"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
}

const projects: Project[] = [
  {
    title: "CloudFlow SaaS Platform",
    description:
      "Enterprise cloud management solution with real-time monitoring, automated scaling, and comprehensive analytics dashboard.",
    technologies: ["React", "Node.js", "AWS"],
    gradientFrom: "from-blue-600",
    gradientVia: "via-violet-600",
    gradientTo: "to-cyan-500",
  },
  {
    title: "FinTrack Analytics",
    description:
      "Real-time financial analytics dashboard delivering actionable insights with interactive charts and predictive modeling.",
    technologies: ["Next.js", "Python", "PostgreSQL"],
    gradientFrom: "from-violet-600",
    gradientVia: "via-purple-600",
    gradientTo: "to-blue-500",
  },
  {
    title: "MediConnect",
    description:
      "Healthcare appointment & records platform enabling seamless patient-doctor communication and secure data management.",
    technologies: ["React Native", ".NET", "Azure"],
    gradientFrom: "from-cyan-500",
    gradientVia: "via-blue-600",
    gradientTo: "to-violet-600",
  },
  {
    title: "ShopSphere",
    description:
      "Modern e-commerce marketplace with personalized recommendations, real-time inventory, and frictionless checkout experience.",
    technologies: ["Next.js", "TypeScript", "MongoDB"],
    gradientFrom: "from-blue-500",
    gradientVia: "via-cyan-500",
    gradientTo: "to-emerald-500",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          title="Our Work"
          subtitle="Showcasing our best projects and digital solutions"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.3)]"
            >
              {/* Gradient image placeholder */}
              <div
                className={`relative h-52 bg-gradient-to-br ${project.gradientFrom} ${project.gradientVia} ${project.gradientTo} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Floating decorative elements */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-12" />
                <div className="absolute bottom-10 left-8 w-24 h-3 rounded-full bg-white/20" />
                <div className="absolute bottom-6 left-8 w-16 h-3 rounded-full bg-white/15" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project button */}
                <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-400 border border-blue-500/30 rounded-xl transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.4)] group/btn">
                  View Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="mt-14 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-blue-400 group/link"
          >
            View All Projects
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
