"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technologies", href: "#technologies" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll offset
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      let current = "home";
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050508]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with 3D Mark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.1] shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)] border border-cyan-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action: Let's Talk CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_20px_-3px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_-3px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white rounded-xl bg-white/[0.04] border border-white/10 transition-colors duration-200 hover:bg-white/[0.08]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-cyan-400" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-xs h-full bg-[#08080f] border-l border-white/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <BrandLogo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-500/20"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-center text-xs text-gray-500">
              hello@devsyntix.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
