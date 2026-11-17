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

    // Simulate reliable API submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Trigger celebratory particle confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00F0FF", "#3B82F6", "#8B5CF6", "#FFFFFF"],
      });
    } catch {
      // Ignore if canvas confetti is blocked
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
    "w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/[0.07]";

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 px-6 overflow-hidden bg-[#030308]"
    >
      {/* Background Glows */}
      <div
        className="pointer-events-none absolute -top-40 right-10 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-md mb-4 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Start A Conversation
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-heading">
            Have an Idea?{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Let&apos;s Build
            </span>
            <br />
            Something Amazing.
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Let&apos;s turn your vision into a powerful digital solution. Fill out
            the form below, and our engineering team will get back to you within
            24 hours.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Message Received!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <strong className="text-white">{formData.fullName}</strong>.
                    Our technical leads are reviewing your project requirements
                    and will reach out at{" "}
                    <span className="text-cyan-400">{formData.email}</span>.
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
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/10 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                      >
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        required
                        className={inputClasses}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                      >
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Technologies"
                        className={inputClasses}
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                      >
                        Project Type <span className="text-cyan-400">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="bg-[#0b0b14] text-gray-400">
                          Select Project Category
                        </option>
                        {projectTypes.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-[#0b0b14] text-white"
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
                      className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                    >
                      Project Details & Goals{" "}
                      <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your product, timeline, tech requirements, and target goals..."
                      rows={4}
                      required
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Direct Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:-translate-y-0.5 shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 block">
                    Business Inquiries
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                    {siteConfig.contact.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Avg response time: Under 4 hours
                  </p>
                </div>
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/5 hover:-translate-y-0.5 shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 block">
                    Direct Phone Line
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors mt-0.5">
                    {siteConfig.contact.phone}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Mon - Fri, 9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </a>

              <div className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/5 hover:-translate-y-0.5 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 block">
                    Global Office Headquarters
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors mt-0.5">
                    {siteConfig.contact.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Available for in-person &amp; virtual strategy sessions
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels Box */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-4">
                Official Social Media Channels
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {socialList.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-cyan-400/40 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-300 transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span className="text-[11px] font-medium text-gray-300">
                        {social.name}
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
