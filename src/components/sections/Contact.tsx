"use client";

import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Mail, Phone, Send, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import {
  InstagramIcon,
  FacebookIcon,
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
  const [deliveredTo, setDeliveredTo] = useState<string>("Devsyntix@gmail.com");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        // Not JSON
      }

      if (!res.ok || (data && !data.success)) {
        throw new Error(
          data?.error || "Unable to send your message via Resend. Please try again."
        );
      }

      if (data?.deliveredTo) {
        setDeliveredTo(data.deliveredTo);
      }
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
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(
        err?.message || "There was an issue sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialList = [
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: siteConfig.social.instagram,
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: siteConfig.social.facebook,
    },
    {
      name: "X (Twitter)",
      icon: XTwitterIcon,
      href: siteConfig.social.twitter,
    },
    {
      name: "Threads",
      icon: ThreadsIcon,
      href: siteConfig.social.threads,
    },
    ...(siteConfig.social.linkedin
      ? [
          {
            name: "LinkedIn",
            icon: LinkedInIcon,
            href: siteConfig.social.linkedin,
          },
        ]
      : []),
  ];

  const inputClasses =
    "w-full px-4 py-3.5 bg-white/[0.04] border border-white/12 rounded-2xl text-white placeholder:text-[#86868b] text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#29d8ff]/40 focus:border-[#29d8ff]/50 focus:bg-white/[0.07] tracking-tight";

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 px-6 overflow-hidden bg-black"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-10 w-[600px] h-[600px] bg-[#0071e3]/10 rounded-full blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 w-[550px] h-[550px] bg-[#af52de]/10 rounded-full blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          tag="Initiate Contact"
          title="Have an Idea? Let's Build Something Amazing."
          subtitle="Let's turn your vision into a powerful digital solution. Connect with our principal engineering team."
        />

        {/* Two-Column iOS 27 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-16 sm:mt-20">
          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="ios-glass p-8 sm:p-10 rounded-[32px] relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.25)] border border-white/15">
              {/* Specular highlight */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {isSubmitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-3xl bg-[#29d8ff]/15 border border-[#29d8ff]/30 flex items-center justify-center mx-auto text-[#29d8ff] shadow-[0_0_35px_rgba(41,216,255,0.35)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      Inquiry Sent Successfully!
                    </h3>
                    <p className="text-[#86868b] text-sm max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{formData.fullName}</strong>.
                      Your project inquiry has been transmitted to{" "}
                      <span className="text-[#29d8ff] font-medium">{deliveredTo}</span>.
                      Our engineering team will review your specifications and contact you shortly at{" "}
                      <span className="text-white font-medium">{formData.email}</span>.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmitError(null);
                        setFormData({
                          fullName: "",
                          email: "",
                          company: "",
                          projectType: "",
                          message: "",
                        });
                      }}
                      className="ios-btn px-6 py-2.5 rounded-full text-xs font-semibold tracking-tight text-white/90 bg-white/[0.08] border border-white/15 hover:bg-white/[0.14] transition-all"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs leading-relaxed space-y-2">
                      <p>{submitError}</p>
                      <p className="text-[11px] text-white/70">
                        Need immediate assistance? You can also email us directly at{" "}
                        <a
                          href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                            `Project Inquiry - ${formData.fullName || "DevSyntix"}`
                          )}&body=${encodeURIComponent(formData.message || "")}`}
                          className="text-[#29d8ff] underline underline-offset-2"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold tracking-tight text-[#86868b] mb-2"
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
                        className="block text-xs font-semibold tracking-tight text-[#86868b] mb-2"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold tracking-tight text-[#86868b] mb-2"
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
                        className="block text-xs font-semibold tracking-tight text-[#86868b] mb-2"
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
                      className="block text-xs font-semibold tracking-tight text-[#86868b] mb-2"
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
                      rows={4}
                      required
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="apple-intelligence-glow ios-btn w-full py-4 px-6 rounded-full font-semibold text-sm tracking-tight text-white bg-gradient-to-r from-[#0071e3] via-[#5856d6] to-[#af52de] shadow-[0_10px_35px_rgba(41,216,255,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Specification...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#29d8ff]" />
                        <span>Send Message</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Direct Details & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ios-glass-card group flex items-start gap-4 p-6 rounded-[28px]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#29d8ff] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#86868b] block">
                    Direct Email
                  </span>
                  <p className="text-base font-semibold tracking-tight text-white group-hover:text-[#29d8ff] transition-colors mt-0.5">
                    {siteConfig.contact.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="ios-glass-card group flex items-start gap-4 p-6 rounded-[28px]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#0071e3] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#86868b] block">
                    Phone Consultation
                  </span>
                  <p className="text-base font-semibold tracking-tight text-white group-hover:text-[#29d8ff] transition-colors mt-0.5">
                    {siteConfig.contact.phone}
                  </p>
                  <p className="text-xs text-[#86868b] mt-0.5">
                    Mon - Sat &bull; Available on Call & WhatsApp
                  </p>
                </div>
              </a>
            </div>

            {/* Social Channels Widget */}
            <div className="ios-glass p-6 rounded-[28px] border border-white/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b] block mb-4">
                Official Channels
              </span>
              <div className={`grid gap-3 ${socialList.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
                {socialList.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ios-btn flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 text-[#86868b] hover:text-[#29d8ff] transition-all group"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span className="text-[11px] font-medium tracking-tight text-white/80">
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
