"use client";

import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import {
  InstagramIcon,
  XTwitterIcon,
  ThreadsIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";

interface FormData {
  fullName: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

const projectTypes = [
  "Custom Software Development",
  "Web Application Development",
  "SaaS Product Development",
  "Mobile Application Development",
  "UI/UX Design & Architecture",
  "Cloud Solutions & DevOps",
  "AI & Intelligent Automation",
  "API Development & Integration",
  "Other Technology Inquiry",
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#29D8FF", "#AF52DE", "#0071E3", "#FFFFFF"],
      });
    } catch {
      // Ignore if confetti blocked
    }
  };

  const socialList = [
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: siteConfig.social.instagram || "#",
    },
    {
      name: "X (Twitter)",
      icon: XTwitterIcon,
      href: siteConfig.social.twitter || "#",
    },
    {
      name: "Threads",
      icon: ThreadsIcon,
      href: siteConfig.social.threads || "#",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      href: siteConfig.social.linkedin || "#",
    },
  ];

  const inputClasses =
    "w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white/[0.04] border border-white/12 rounded-xl sm:rounded-2xl text-white placeholder:text-[#86868b] text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#29d8ff]/40 focus:border-[#29d8ff]/50 focus:bg-white/[0.07] tracking-tight";

  return (
    <section
      id="contact"
      className="relative py-10 sm:py-20 md:py-32 px-3.5 sm:px-6 overflow-hidden bg-black"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-10 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#0071e3]/10 rounded-full blur-[120px] sm:blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#af52de]/10 rounded-full blur-[120px] sm:blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          tag="Initiate Contact"
          title="Have an Idea? Let's Build Something Amazing."
          subtitle="Let's turn your vision into a powerful digital solution. Connect with our principal engineering team."
        />

        {/* Two-Column iOS 27 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-start mt-6 sm:mt-12 lg:mt-16">
          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="ios-glass p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[32px] relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.25)] border border-white/15">
              {/* Specular highlight */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {isSubmitted ? (
                <div className="py-8 sm:py-12 text-center space-y-4 sm:space-y-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#29d8ff]/15 border border-[#29d8ff]/30 flex items-center justify-center mx-auto text-[#29d8ff] shadow-[0_0_35px_rgba(41,216,255,0.35)]">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-[#86868b] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <strong className="text-white">{formData.fullName}</strong>.
                    Our technical architecture team will review your project
                    scope and connect at{" "}
                    <span className="text-[#29d8ff]">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        company: "",
                        projectType: "",
                        message: "",
                      });
                    }}
                    className="ios-btn px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-tight text-white/80 bg-white/[0.08] border border-white/15 hover:bg-white/[0.14] transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-[11px] sm:text-xs font-semibold tracking-tight text-[#86868b] mb-1 sm:mb-2"
                      >
                        Full Name <span className="text-[#29d8ff]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Appleseed"
                        required
                        className={inputClasses}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] sm:text-xs font-semibold tracking-tight text-[#86868b] mb-1 sm:mb-2"
                      >
                        Email Address <span className="text-[#29d8ff]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-[11px] sm:text-xs font-semibold tracking-tight text-[#86868b] mb-1 sm:mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enterprise Inc."
                        className={inputClasses}
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-[11px] sm:text-xs font-semibold tracking-tight text-[#86868b] mb-1 sm:mb-2"
                      >
                        Project Type <span className="text-[#29d8ff]">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="bg-[#121218] text-[#86868b]">
                          Select Focus Area
                        </option>
                        {projectTypes.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-[#121218] text-white"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] sm:text-xs font-semibold tracking-tight text-[#86868b] mb-1 sm:mb-2"
                    >
                      Project Specifications & Goals{" "}
                      <span className="text-[#29d8ff]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your timeline, target architecture, user scale, and requirements..."
                      rows={3}
                      required
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="apple-intelligence-glow ios-btn w-full py-3 sm:py-4 px-5 sm:px-6 rounded-full font-semibold text-xs sm:text-sm tracking-tight text-white bg-gradient-to-r from-[#0071e3] via-[#5856d6] to-[#af52de] shadow-[0_10px_35px_rgba(41,216,255,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Specification...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#29d8ff]" />
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Direct Details & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-5">
            <div className="space-y-2.5 sm:space-y-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ios-glass-card group flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-[28px]"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#29d8ff] group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#86868b] block">
                    Direct Email
                  </span>
                  <p className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-[#29d8ff] transition-colors mt-0.5">
                    {siteConfig.contact.email}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#86868b] mt-0.5">
                    Guaranteed response under 4 hours
                  </p>
                </div>
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="ios-glass-card group flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-[28px]"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#0071e3] group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#86868b] block">
                    Phone Consultation
                  </span>
                  <p className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-[#29d8ff] transition-colors mt-0.5">
                    {siteConfig.contact.phone}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#86868b] mt-0.5">
                    Mon - Fri &bull; 9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </a>

              <div className="ios-glass-card group flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-[28px]">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#af52de] group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#86868b] block">
                    Headquarters
                  </span>
                  <p className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-[#af52de] transition-colors mt-0.5">
                    {siteConfig.contact.location}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#86868b] mt-0.5">
                    Global digital engineering network
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels Widget */}
            <div className="ios-glass p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border border-white/15">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#86868b] block mb-2.5 sm:mb-4">
                Official Channels
              </span>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {socialList.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ios-btn flex flex-col items-center justify-center gap-1.5 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 text-[#86868b] hover:text-[#29d8ff] transition-all group"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
                      <span className="text-[10px] sm:text-[11px] font-medium tracking-tight text-white/80 truncate max-w-full">
                        {social.name.split(" ")[0]}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
