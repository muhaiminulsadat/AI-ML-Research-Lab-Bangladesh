"use client";

import {useInView} from "./useInView";
import {Lightbulb, Target, GraduationCap, Newspaper} from "lucide-react";

export default function NationalPipeline() {
  const [pipelineRef, pipelineInView] = useInView();

  return (
    <section ref={pipelineRef} className="space-y-16">
      <div
        className="max-w-2xl mx-auto text-center space-y-4"
        style={{
          opacity: pipelineInView ? 1 : 0,
          transform: pipelineInView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
          // The National Pipeline
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
          Bridging the gap between untapped talent and global AI contribution
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto mt-4">
          We follow a structured, globally accepted research process built on
          four pillars designed to elevate the status of Artificial Intelligence
          research nationwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Lightbulb,
            title: "Awareness",
            desc: "Spreading ML & AI knowledge across Bangladesh.",
            delay: 0,
          },
          {
            icon: Target,
            title: "Engagement",
            desc: "Building a research culture from the student level up.",
            delay: 100,
          },
          {
            icon: GraduationCap,
            title: "Research",
            desc: "Enabling national and international collaboration.",
            delay: 200,
          },
          {
            icon: Newspaper,
            title: "Publication",
            desc: "Supporting high-quality research output.",
            delay: 300,
          },
        ].map((step, i) => (
          <div
            key={i}
            className="group relative flex flex-col p-8 rounded-[2rem] bg-[#090A0F] border border-white/5 hover:bg-[#0D0F14] shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{
              opacity: pipelineInView ? 1 : 0,
              transform: pipelineInView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${step.delay}ms, transform 0.6s ease ${step.delay}ms`,
            }}
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
              <step.icon className="w-24 h-24 text-primary" strokeWidth={1} />
            </div>
            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <step.icon className="size-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white/90 mb-3 relative z-10">
              {step.title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed relative z-10">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
