"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-black px-3.5 sm:px-6 py-12 sm:py-24 md:py-36">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[450px] sm:h-[650px] w-[450px] sm:w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#0071e3]/10 via-[#af52de]/10 to-transparent blur-[120px] sm:blur-[160px]"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Engineering Capabilities"
          title="Custom Software &amp; SaaS Solutions."
          subtitle="Comprehensive software development, web application engineering, SaaS platform architecture, and AI automation tailored to your business needs."
        />

        {/* iOS 27 Squircle Service Grid - 2 Columns on Mobile for Compact View */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mt-6 sm:mt-12 lg:mt-20">
          {siteConfig.services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="ios-glass-card relative flex flex-col justify-between p-3 sm:p-6 lg:p-7 rounded-xl sm:rounded-[28px] overflow-hidden group cursor-pointer"
              >
                {/* Specular top corner highlight */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div>
                  {/* Top row: Icon capsule + Apple arrow */}
                  <div className="flex items-center justify-between mb-2 sm:mb-5">
                    <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-2xl bg-white/[0.08] border border-white/15 text-[#29d8ff] shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.75} />
                    </div>

                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xs sm:text-base lg:text-lg font-semibold tracking-tight text-white mb-1 sm:mb-2.5 group-hover:text-[#29d8ff] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-[10px] sm:text-sm leading-tight sm:leading-relaxed text-[#86868b] line-clamp-2 sm:line-clamp-none">
                    {service.description}
                  </p>
                </div>

                {/* Bottom status badge */}
                <div className="mt-2 sm:mt-6 pt-1.5 sm:pt-4 border-t border-white/[0.06] flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-[#86868b]">
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
