"use client";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useEffect, useRef, useState} from "react";

const teamMembers = [
  {name: "Dr. Arisa K.", role: "Director of Lab", initials: "AK", index: "01"},
  {name: "James Lin", role: "Senior ML Engineer", initials: "JL", index: "02"},
  {
    name: "Sarah Vance",
    role: "Research Scientist",
    initials: "SV",
    index: "03",
  },
  {
    name: "Dr. Chen W.",
    role: "Computational Theorist",
    initials: "CW",
    index: "04",
  },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      {threshold: 0.1},
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function TeamSection() {
  const [sectionRef, inView] = useInView();

  return (
    <section
      ref={sectionRef}
      className="border-t border-border/30 pt-24 space-y-14"
    >
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/60">
            // 002 — The People
          </p>
          <h2
            className="text-4xl font-black tracking-tight text-foreground leading-none"
            style={{fontFamily: "'Bebas Neue', 'Outfit', sans-serif"}}
          >
            Principal Investigators
          </h2>
          <div className="h-px w-48 bg-border/30 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-primary origin-left"
              style={{
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />
          </div>
        </div>
        <p className="text-muted-foreground/60 text-sm max-w-xs text-left sm:text-right leading-relaxed">
          Distinguished scientists driving theoretical advancements at the
          frontier.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-border/30 bg-card hover:border-primary/30 transition-all duration-500 cursor-default"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${150 + i * 80}ms, transform 0.6s ease ${150 + i * 80}ms, border-color 0.4s ease`,
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, hsl(var(--primary)/0.08), transparent 65%)",
              }}
            />

            {/* Ghost index */}
            <span
              className="absolute top-3 right-4 font-mono font-black text-foreground/[0.04] select-none leading-none"
              style={{fontSize: "52px", lineHeight: 1}}
            >
              {member.index}
            </span>

            <div className="relative z-10 flex flex-col items-center text-center p-7 pt-8 gap-5">
              {/* Avatar */}
              <div className="relative">
                {/* Ring */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-110"
                  style={{
                    boxShadow:
                      "0 0 0 1.5px hsl(var(--primary)/0.4), 0 0 20px hsl(var(--primary)/0.15)",
                    borderRadius: "9999px",
                  }}
                />
                <Avatar className="w-16 h-16 border border-border/40">
                  <AvatarFallback className="bg-secondary/50 text-sm font-mono font-semibold text-foreground tracking-wider">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Text */}
              <div className="space-y-1.5">
                <h4 className="text-base font-bold tracking-tight text-foreground leading-tight">
                  {member.name}
                </h4>
                <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground/60">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Bottom primary line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{
                background:
                  "linear-gradient(to right, hsl(var(--primary)/0.6), transparent)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
