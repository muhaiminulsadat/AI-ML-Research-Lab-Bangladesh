"use client";

import {Separator} from "@/components/ui/separator";
import {useInView} from "./useInView";

export default function HeroMission() {
  const [heroRef, heroInView] = useInView();

  return (
    <section
      ref={heroRef}
      className="max-w-4xl mx-auto text-center space-y-12"
      style={{
        opacity: heroInView ? 1 : 0,
        transform: heroInView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div className="space-y-6">
        <div className="font-mono text-[12px] tracking-[0.25em] text-primary/80 uppercase flex items-center justify-center gap-3">
          <Separator className="w-8 bg-primary/30" />
          About Us
          <Separator className="w-8 bg-primary/30" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
          Machine Learning & <br className="hidden sm:block" /> AI Research Lab,{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
            Bangladesh
          </span>
        </h1>
      </div>

      <div className="relative pt-12 pb-8">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 text-[12rem] font-bold leading-none text-primary/5 font-mono"
        >
          "
        </span>
        <blockquote className="relative z-10 text-center space-y-0 italic text-foreground/90 max-w-3xl mx-auto">
          <p className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground/90 text-balance leading-[1.5]">
            We aim to build a unified AI research ecosystem for Bangladesh. By
            connecting students, researchers, and institutions, our objective is
            to shift the paradigm from isolated efforts to a{" "}
            <span className="text-foreground font-semibold">
              centralized collaborative ecosystem
            </span>
            . ultimately positioning Bangladesh on the global AI map through
            systematic, scaled innovation.
          </p>
        </blockquote>
      </div>
    </section>
  );
}
