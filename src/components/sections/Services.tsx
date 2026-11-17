"use client";

import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Background gradient orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-violet-500/8 to-purple-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive technology solutions tailored to your business needs"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]"
              >
                {/* Glowing dot accent */}
                <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon container */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>

                {/* Bottom glow on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
