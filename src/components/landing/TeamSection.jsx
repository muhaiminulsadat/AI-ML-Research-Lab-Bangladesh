"use client";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useEffect, useRef, useState} from "react";

const teamMembers = [
  {
    name: "Dr. M. Sohel Rahman",
    role: "Professor, CSE BUET",
    initials: "SR",
    index: "01",
    color: "from-blue-400/20 to-transparent",
    ring: "border-blue-400/30",
  },
  {
    name: "Dr. Mahmuda Naznin",
    role: "Professor & Head, CSE BUET",
    initials: "MN",
    index: "02",
    color: "from-emerald-400/20 to-transparent",
    ring: "border-emerald-400/30",
  },
  {
    name: "Dr. A.B.M. Alim Al Islam",
    role: "Professor, CSE BUET",
    initials: "AA",
    index: "03",
    color: "from-amber-400/20 to-transparent",
    ring: "border-amber-400/30",
  },
  {
    name: "Dr. Mohammed Eunus Ali",
    role: "Professor, CSE BUET",
    initials: "EA",
    index: "04",
    color: "from-purple-400/20 to-transparent",
    ring: "border-purple-400/30",
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
        className="flex flex-col items-center text-center sm:text-left sm:flex-row justify-between sm:items-end gap-4"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="space-y-3 flex flex-col items-center sm:items-start">
          <p className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
            // The People
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
            Principal Investigators
          </h2>
          <div className="h-px w-48 bg-border/30 relative overflow-hidden hidden sm:block">
            <div
              className="absolute inset-0 bg-primary origin-left"
              style={{
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />
          </div>
        </div>
        <p className="text-muted-foreground/60 text-sm max-w-xs text-center sm:text-right leading-relaxed">
          Distinguished scientists driving theoretical advancements at the
          frontier.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/5 hover:border-white/10 bg-[#090A0F] hover:bg-[#0D0F14] shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${150 + i * 80}ms, transform 0.6s ease ${150 + i * 80}ms, border-color 0.4s ease`,
            }}
          >
            {/* Hover glow */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${member.color}`}
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
              <div className="relative group/avatar">
                {/* Ring */}
                <div
                  className={`absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 border ${member.ring}`}
                />
                <Avatar className="w-16 h-16 border border-border/40 relative z-10">
                  <AvatarFallback className="bg-secondary/50 text-sm font-mono font-semibold text-foreground tracking-wider group-hover:bg-background transition-colors">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Text */}
              <div className="space-y-1.5 z-10">
                <h4 className="text-[17px] font-bold tracking-tight text-white/90 leading-tight group-hover:text-white transition-colors">
                  {member.name}
                </h4>
                <p className="text-[12px] font-mono uppercase tracking-[0.10em] text-white/50 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
