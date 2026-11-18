"use client";

import React, { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black px-6 py-28 md:py-36 text-white"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#af52de]/10 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#29d8ff]/10 blur-[160px]"
      />

      <div className="mx-auto max-w-4xl">
        <SectionHeading
          tag="Frequently Asked Questions"
          title="Got Questions? We've Got Answers."
          subtitle="Everything you need to know about working with DevSyntix."
        />

        {/* Interactive Accordion Stack */}
        <div className="mt-16 sm:mt-20 space-y-4">
          {siteConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={faq.question}
                className={`ios-glass-card relative overflow-hidden rounded-[24px] border transition-all duration-300 ${
                  isOpen
                    ? "border-[#29d8ff]/35 bg-white/[0.06] shadow-[0_15px_40px_rgba(41,216,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                }`}
              >
                {/* Top specular reflection */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#29d8ff]/50 rounded-[24px]"
                >
                  <div className="flex items-center gap-4 sm:gap-5 pr-2">
                    <span className="text-xs font-mono font-semibold text-[#86868b] bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/10 flex-shrink-0 group-hover:text-white transition-colors">
                      {itemNumber}
                    </span>
                    <h3
                      className={`text-base sm:text-lg font-semibold tracking-tight transition-colors duration-200 ${
                        isOpen
                          ? "text-[#29d8ff]"
                          : "text-white group-hover:text-white/90"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Gradient Plus/Minus Icon */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-[#29d8ff] via-[#0071e3] to-[#af52de] text-white shadow-[0_0_25px_rgba(41,216,255,0.4)] rotate-45"
                        : "bg-white/[0.05] border border-white/12 text-white/80 group-hover:border-white/25 group-hover:bg-white/[0.1] rotate-0"
                    }`}
                  >
                    <Plus className="w-4 h-4 transition-transform duration-300" strokeWidth={2.5} />
                  </div>
                </button>

                {/* Animated Answer Drawer via CSS Grid */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-all duration-300 ease-out px-6 sm:px-7 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6 sm:pb-7 pt-1 border-t border-white/[0.06]"
                      : "grid-rows-[0fr] opacity-0 pb-0 pt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-[#86868b] leading-relaxed tracking-tight whitespace-pre-line pt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below the FAQs */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="ios-glass relative overflow-hidden rounded-[32px] border border-white/15 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-gradient-to-b from-[#29d8ff]/15 to-[#af52de]/15 blur-[90px]"
            />

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Still have questions? Let&apos;s talk about your project.
            </h3>
            <p className="text-sm text-[#86868b] max-w-md mx-auto mb-6">
              Our principal engineering team is ready to discuss your architecture, timeline, and deliverables.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="apple-intelligence-glow ios-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-tight text-white bg-gradient-to-r from-[#0071e3] via-[#5856d6] to-[#af52de] shadow-[0_10px_35px_rgba(41,216,255,0.3)] hover:opacity-95 transition-all"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
