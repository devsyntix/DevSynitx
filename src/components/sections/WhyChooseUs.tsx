"use client";

import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";

const counterStats = [
  { label: "Uptime", value: "100%" },
  { label: "Faster Delivery", value: "3x" },
  { label: "Support", value: "24/7" },
  { label: "Technologies", value: "50+" },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Background subtle orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Why Choose DevSyntix?"
          subtitle="We deliver excellence through innovation and commitment"
        />

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                className="group relative flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)]"
              >
                {/* Decorative gradient line on left */}
                <div className="absolute bottom-6 left-0 top-6 w-[2px] rounded-full bg-gradient-to-b from-blue-500 via-violet-500 to-purple-500 opacity-30 transition-opacity duration-300 group-hover:opacity-80" />

                <div className="flex flex-col pl-2">
                  {/* Number + Icon row */}
                  <div className="mb-3 flex items-center gap-3">
                    <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-2xl font-black text-transparent">
                      {number}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 ring-1 ring-white/10">
                      <Icon className="h-4.5 w-4.5 text-violet-400" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter stats row */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {counterStats.map((stat, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06]"
            >
              <div className="mb-1 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
