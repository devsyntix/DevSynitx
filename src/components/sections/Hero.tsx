"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowRight, MessageSquare, Sparkles, Terminal, Code2, Cpu } from "lucide-react";

// Dynamically load the 3D canvas so it initializes only on the client with WebGL
const HeroCanvas3D = dynamic(() => import("@/components/ui/HeroCanvas3D"), {
  ssr: false,
});

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030308] pt-28 pb-20 md:pt-36 md:pb-32"
    >
      {/* ── 3D Interactive WebGL Tech Model Canvas ── */}
      <HeroCanvas3D />

      {/* ── Animated Background Lighting / Gradient Orbs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-orb hero-orb-1 absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="hero-orb hero-orb-2 absolute top-1/4 right-[-10%] h-[480px] w-[480px] rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="hero-orb hero-orb-3 absolute -bottom-10 left-1/3 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[130px]" />
      </div>

      {/* ── Cyber Tech Grid Overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Floating Futuristic Glass Cards (Hidden on small screens) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 max-w-7xl mx-auto"
      >
        {/* Top-Left: Code & Architecture Card */}
        <div className="hero-float-card hero-float-card-1 absolute left-6 top-[22%] hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl shadow-2xl">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-cyan-300 font-semibold">
              DevSyntix.Architect()
            </div>
            <div className="text-[10px] text-gray-400 font-mono">
              &gt; High-Throughput Cloud SaaS
            </div>
          </div>
        </div>

        {/* Top-Right: AI & Automation Status Card */}
        <div className="hero-float-card hero-float-card-2 absolute right-8 top-[28%] hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl shadow-2xl">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Intelligent Systems</span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono">
              99.99% Architecture SLA
            </div>
          </div>
        </div>

        {/* Bottom-Right: Deployed Solutions */}
        <div className="hero-float-card hero-float-card-3 absolute right-16 bottom-[18%] hidden xl:flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl shadow-2xl">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">
              Full-Stack Solutions
            </div>
            <div className="text-[10px] text-cyan-300/80 font-mono">
              Next.js • .NET • Cloud • AI
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-4 py-1.5 backdrop-blur-md mb-8 shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-transparent">
            Next-Gen Software Development &bull; SaaS &bull; AI
          </span>
        </div>

        {/* Primary Heading */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          Building{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
            Digital
          </span>{" "}
          Experiences.
          <br />
          Engineering{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Tomorrow.
          </span>
        </h1>

        {/* Supporting Paragraph */}
        <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300/80 leading-relaxed font-normal">
          We transform ideas into powerful digital products through innovative
          software engineering, intelligent automation, and scalable SaaS
          solutions.
        </p>

        {/* CTAs */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleScrollTo("services")}
            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-white rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_35px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_0_45px_-5px_rgba(6,182,212,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => handleScrollTo("contact")}
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-white rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400 transition-transform group-hover:scale-110" />
            <span>Let&apos;s Talk</span>
          </button>
        </div>

        {/* Brand Proof / Micro-Stats */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] max-w-2xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white font-heading">
              100%
            </div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">
              Code Precision
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-heading">
              Enterprise
            </div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">
              Ready Architecture
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-violet-400 font-heading">
              Global
            </div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">
              Scalability
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase">
          Scroll
        </span>
        <button
          onClick={() => handleScrollTo("about")}
          aria-label="Scroll down to About section"
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 hover:border-cyan-400 transition-colors"
        >
          <span className="w-1.5 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </button>
      </div>

      {/* Scoped CSS animations */}
      <style jsx>{`
        .hero-orb-1 {
          animation: floatOrb1 16s ease-in-out infinite;
        }
        .hero-orb-2 {
          animation: floatOrb2 18s ease-in-out infinite;
        }
        .hero-orb-3 {
          animation: floatOrb3 20s ease-in-out infinite;
        }
        @keyframes floatOrb1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 40px) scale(1.1);
          }
        }
        @keyframes floatOrb2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.08);
          }
        }
        @keyframes floatOrb3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(25px, -30px) scale(0.95);
          }
        }
        .hero-float-card-1 {
          animation: driftCard 10s ease-in-out infinite;
        }
        .hero-float-card-2 {
          animation: driftCard 12s ease-in-out infinite reverse;
        }
        .hero-float-card-3 {
          animation: driftCard 14s ease-in-out infinite 2s;
        }
        @keyframes driftCard {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
