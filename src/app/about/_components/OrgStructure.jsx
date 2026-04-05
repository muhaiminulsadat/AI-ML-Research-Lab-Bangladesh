"use client";

import {useInView} from "./useInView";
import {Building2, BookOpen, MonitorPlay, Scale} from "lucide-react";

export default function OrgStructure() {
  const [structRef, structInView] = useInView();

  return (
    <section
      ref={structRef}
      className="space-y-16 border-t border-border/30 pt-24"
    >
      <div
        className="max-w-2xl mx-auto text-center space-y-4"
        style={{
          opacity: structInView ? 1 : 0,
          transform: structInView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
          // Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
          Organizational Structure
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mt-4">
          Our institutional architecture guarantees independent operation while
          maintaining a unified system.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto">
        {[
          {
            icon: Building2,
            title: "Administration Division",
            desc: "Responsible for overall governance, strategy, policy formulation, and nationwide coordination.",
            delay: 0,
          },
          {
            icon: BookOpen,
            title: "Research (Core) Division",
            desc: "Dedicated to conducting ML & AI research, project execution, and driving global academic publications.",
            delay: 100,
          },
          {
            icon: MonitorPlay,
            title: "ICT Division",
            desc: "Manages technical support, software and web development, and digital infrastructure.",
            delay: 200,
          },
          {
            icon: Scale,
            title: "Law Division",
            desc: "Handles legal advisory, compliance, policy documentation, and partnership agreements.",
            delay: 300,
          },
        ].map((div, i) => (
          <div
            key={i}
            className="relative pl-8 sm:pl-10 before:absolute before:left-0 before:top-2 before:bottom-[-2rem] last:before:bottom-0 before:w-px before:bg-border/40"
            style={{
              opacity: structInView ? 1 : 0,
              transform: structInView ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.6s ease ${div.delay}ms, transform 0.6s ease ${div.delay}ms`,
            }}
          >
            <div className="absolute left-[-11px] top-1 size-[23px] rounded-full bg-background border-2 border-primary/40 flex items-center justify-center">
              <div className="size-2 rounded-full bg-primary" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <div.icon className="size-4" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-foreground">{div.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed pl-[3.25rem] sm:pl-12">
              {div.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
