"use client";

import {useInView} from "./useInView";
import {CloudRainWind, Sprout, HeartPulse, BrainCircuit} from "lucide-react";

export default function ResearchFocus() {
  const [focusRef, focusInView] = useInView();

  return (
    <section
      ref={focusRef}
      className="space-y-16 border-t border-border/30 pt-24"
    >
      <div
        className="flex flex-col items-center text-center sm:text-left sm:flex-row justify-between sm:items-end gap-6"
        style={{
          opacity: focusInView ? 1 : 0,
          transform: focusInView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="space-y-4 flex flex-col items-center sm:items-start">
          <div className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
            // Our Research Focus
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
            Solving real-world <br className="hidden sm:block" /> challenges
            using AI
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-xs text-center sm:text-right leading-relaxed">
          We concentrate on highly localized problem spaces requiring tailored
          machine learning paradigms specific to Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            icon: CloudRainWind,
            title: "Disaster Prediction",
            desc: "Leveraging AI for early warnings on floods and cyclones.",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            delay: 0,
          },
          {
            icon: Sprout,
            title: "Agriculture AI",
            desc: "Data-driven decision systems for crop management and food security.",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            delay: 100,
          },
          {
            icon: HeartPulse,
            title: "Healthcare AI",
            desc: "Advanced diagnostics and health data modeling.",
            color: "text-rose-400",
            bg: "bg-rose-400/10",
            delay: 200,
          },
          {
            icon: BrainCircuit,
            title: "Computer Vision & NLP",
            desc: "Localized language models and visual processing tailored for Bangladesh.",
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            delay: 300,
          },
        ].map((domain, i) => (
          <div
            key={i}
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-[#090A0F] border border-white/5 hover:border-white/10 hover:bg-[#0D0F14] transition-all duration-300"
            style={{
              opacity: focusInView ? 1 : 0,
              transform: focusInView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${domain.delay}ms, transform 0.6s ease ${domain.delay}ms`,
            }}
          >
            <div
              className={`size-14 rounded-[14px] flex items-center justify-center shrink-0 ${domain.bg} group-hover:scale-105 transition-transform duration-300`}
            >
              <domain.icon
                className={`size-[26px] ${domain.color}`}
                strokeWidth={2}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                {domain.title}
              </h3>
              <p className="text-[14px] text-white/50 leading-relaxed">
                {domain.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
