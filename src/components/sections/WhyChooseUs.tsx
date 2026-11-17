"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";

const counterStats = [
  { label: "Uptime SLA", value: "99.99%" },
  { label: "Delivery Velocity", value: "3x" },
  { label: "Dedicated Support", value: "24/7" },
  { label: "Modern Toolsets", value: "50+" },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-black px-6 py-28 md:py-36">
      {/* Background radial aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-[#af52de]/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 -z-10 h-[500px] w-[500px] rounded-full bg-[#0071e3]/10 blur-[150px]"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Why DevSyntix"
          title="Engineered for Excellence."
          subtitle="We deliver uncompromising quality, modern architecture, and strategic digital advantages for global teams."
        />

        {/* Features 3-Column Squircle Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16 sm:mt-20">
          {siteConfig.whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                className="ios-glass-card relative flex flex-col justify-between p-8 rounded-[28px] overflow-hidden group"
              >
                {/* Top specular highlight */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div>
                  {/* Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#86868b] bg-white/[0.05] px-3 py-1 rounded-full border border-white/10">
                      {number}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] border border-white/15 text-[#af52de] shadow-inner group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold tracking-tight text-white mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#86868b]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29d8ff]" />
                  <span className="text-[11px] font-semibold tracking-tight text-white/50">
                    Production Proven
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Apple iOS 27 Control Center Widget Metrics Bar */}
        <div className="mt-16 sm:mt-20 p-2 rounded-[32px] ios-glass border border-white/15">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {counterStats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-[24px] bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold tracking-tight text-[#86868b] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
