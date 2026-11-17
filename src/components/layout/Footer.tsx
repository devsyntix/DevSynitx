import React from "react";
import BrandLogo from "@/components/ui/BrandLogo";
import {
  InstagramIcon,
  XTwitterIcon,
  ThreadsIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technologies", href: "#technologies" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { label: "Custom Software Development", href: "#services" },
  { label: "Web Application Development", href: "#services" },
  { label: "SaaS Product Development", href: "#services" },
  { label: "Mobile Application Development", href: "#services" },
  { label: "Cloud Solutions & Integration", href: "#services" },
  { label: "AI & Automation", href: "#services" },
];

export default function Footer() {
  const currentYear = 2026;

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

  return (
    <footer className="relative bg-[#050508] border-t border-white/[0.08] overflow-hidden text-gray-300">
      {/* Background glow orbs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#home" className="inline-block">
              <BrandLogo size="lg" />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              DevSyntix is a premier technology-driven software development and
              SaaS solutions company. We engineer scalable systems, intelligent
              automation, and high-impact digital experiences for forward-thinking
              enterprises.
            </p>

            {/* Social Icons with Official SVGs */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {socialList.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`DevSyntix on ${social.name}`}
                      className="group relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300 shadow-sm"
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="sr-only">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="text-xs text-cyan-400/0 group-hover:text-cyan-400 transition-all duration-200">
                      &rarr;
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Core Capabilities
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-violet-300 transition-colors duration-200 block truncate"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Get In Touch
            </h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div>
                <span className="text-xs text-gray-500 block">General Inquiries</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white hover:text-cyan-300 font-medium transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Direct Line</span>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-white hover:text-cyan-300 font-medium transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Global HQ</span>
                <span className="text-gray-300">{siteConfig.contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} DevSyntix. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/10">&bull;</span>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <span className="text-white/10">&bull;</span>
            <span className="text-cyan-400/80 font-mono">v2.0 • Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
