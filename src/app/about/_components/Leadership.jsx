"use client";

import {useInView} from "./useInView";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

export default function Leadership() {
  const [leadershipRef, leadershipInView] = useInView();

  return (
    <section
      ref={leadershipRef}
      className="space-y-16 border-t border-border/30 pt-24"
    >
      <div
        className="flex flex-col items-center text-center sm:text-left sm:flex-row justify-between sm:items-end gap-6"
        style={{
          opacity: leadershipInView ? 1 : 0,
          transform: leadershipInView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="space-y-4 flex flex-col items-center sm:items-start">
          <div className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
            // Leadership (ESTD 2026)
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
            The Executive Board
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {name: "Nirob Devnath", role: "Director", initials: "ND", delay: 0},
          {
            name: "Apurbo Kumar",
            role: "Co-Director",
            initials: "AK",
            delay: 100,
          },
          {
            name: "Nafi Naib Mon",
            role: "Co-Director",
            initials: "NM",
            delay: 200,
          },
        ].map((leader, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-center text-center p-10 rounded-[2rem] bg-[#090A0F] border border-white/5 hover:border-primary/20 hover:bg-[#0D0F14] shadow-lg hover:-translate-y-1 transition-all duration-300"
            style={{
              opacity: leadershipInView ? 1 : 0,
              transform: leadershipInView
                ? "translateY(0)"
                : "translateY(24px)",
              transition: `opacity 0.6s ease ${leader.delay}ms, transform 0.6s ease ${leader.delay}ms`,
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-primary/5 to-transparent rounded-[2rem]" />

            <div className="relative mb-6">
              <div className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 border border-primary/30" />
              <Avatar className="w-24 h-24 border-2 border-border/60 relative z-10">
                <AvatarFallback className="bg-secondary text-lg font-mono font-bold text-foreground tracking-wider group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {leader.initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <h4 className="text-xl font-bold tracking-tight text-white/90 mb-2 group-hover:text-white transition-colors">
              {leader.name}
            </h4>
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-[12px] font-mono tracking-[0.15em] text-primary uppercase font-semibold">
                {leader.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
