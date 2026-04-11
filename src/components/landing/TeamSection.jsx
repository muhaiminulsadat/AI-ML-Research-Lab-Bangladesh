"use client";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useEffect, useRef, useState} from "react";
import {Building2, BookOpen, Mail} from "lucide-react";

const teamMembers = [
  {
    name: "Nirob Devnath",
    role: "Director",
    institution: "Chittagong University (CU)",
    department: "Electrical & Electronic Engineering",
    email: "nirobdevnatheee@gmail.com",
    initials: "ND",
    index: "01",
    color: "from-blue-500/10 to-transparent",
    ring: "border-blue-500/30",
    avatarBg: "bg-blue-500/10 text-blue-400",
  },
  {
    name: "Apurbo Kumar",
    role: "Co-Director",
    institution: "BUET & IIT",
    department: "CE / DS&AI",
    email: "apurbokumar1355@gmail.com",
    initials: "AK",
    index: "02",
    color: "from-emerald-500/10 to-transparent",
    ring: "border-emerald-500/30",
    avatarBg: "bg-emerald-500/10 text-emerald-400",
  },
  {
    name: "Nafi Naib Mon",
    role: "Co-Director",
    institution: "Islamic University Of Technology (IUT)",
    department: "Civil Engineering",
    email: "nafinaib668@gmail.com",
    initials: "NM",
    index: "03",
    color: "from-purple-500/10 to-transparent",
    ring: "border-purple-500/30",
    avatarBg: "bg-purple-500/10 text-purple-400",
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
            // Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
            Directors & Co-Directors
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
          Guiding our vision, strategy, and research initiatives towards the
          future.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="relative z-10 flex flex-col items-center text-center p-7 pt-8 gap-5 h-full">
              {/* Avatar */}
              <div className="relative group/avatar">
                {/* Ring */}
                <div
                  className={`absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 border ${member.ring}`}
                />
                <Avatar className="w-20 h-20 border border-border/40 relative z-10 shadow-lg">
                  <AvatarFallback
                    className={`text-lg font-mono font-bold tracking-wider transition-colors ${member.avatarBg}`}
                  >
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Text */}
              <div className="space-y-4 z-10 flex flex-col h-full items-center">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-xl font-bold tracking-tight text-white/90 leading-tight group-hover:text-white transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[13px] font-mono uppercase tracking-[0.10em] text-primary/80 font-semibold mt-1">
                    {member.role}
                  </p>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="w-full flex flex-col gap-2.5 text-sm text-left text-white/60">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 shrink-0 mt-0.5 opacity-60 text-primary" />
                    <span className="leading-snug text-white/80">
                      {member.institution}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 shrink-0 mt-0.5 opacity-60 text-primary" />
                    <span className="leading-snug">{member.department}</span>
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 mt-1 text-white/60 hover:text-primary transition-colors duration-200 group/m group-hover:text-primary/90"
                  >
                    <Mail className="w-4 h-4 shrink-0 opacity-60 text-primary" />
                    <span className="truncate leading-snug group-hover/m:underline underline-offset-2">
                      {member.email}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
