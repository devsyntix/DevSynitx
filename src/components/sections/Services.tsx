"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-black px-3.5 sm:px-6 py-10 sm:py-20 md:py-32">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[450px] sm:h-[650px] w-[450px] sm:w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#0071e3]/10 via-[#af52de]/10 to-transparent blur-[120px] sm:blur-[160px]"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Engineering Capabilities"
          title="Custom Software &amp; SaaS Solutions."
          subtitle="Enterprise-grade software engineering, web applications, SaaS platform architecture, and AI automation tailored to your business."
        />

        {/* Compact iOS 27 Squircle Service Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6 mt-6 sm:mt-12 lg:mt-16">
          {siteConfig.services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="ios-glass-card relative flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-[28px] overflow-hidden group cursor-pointer"
              >
                {/* Specular top highlight */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div>
                  {/* Top row: Icon capsule + Apple arrow */}
                  <div className="flex items-center justify-between mb-2.5 sm:mb-5">
                    <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.08] border border-white/15 text-[#29d8ff] shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-4.5 w-4.5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                    </div>

                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-[15px] sm:text-lg font-semibold tracking-tight text-white mb-1 sm:mb-2 group-hover:text-[#29d8ff] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-xs sm:text-sm leading-snug sm:leading-relaxed text-[#86868b] line-clamp-2 sm:line-clamp-none">
                    {service.description}
                  </p>
                </div>

                {/* Bottom status badge */}
                <div className="mt-2.5 sm:mt-5 pt-2 sm:pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#86868b]">
                  <span>0{index + 1} &bull; Enterprise</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]/80" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
