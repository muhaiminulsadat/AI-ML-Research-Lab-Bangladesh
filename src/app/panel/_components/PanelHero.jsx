"use client";

import {motion} from "framer-motion";
import {Badge} from "@/components/ui/badge";
import {Users, CalendarCheck, Layers} from "lucide-react";

const container = {
  hidden: {},
  show: {transition: {staggerChildren: 0.1}},
};

const item = {
  hidden: {opacity: 0, y: 22},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]},
  },
};

export default function PanelHero({totalMembers}) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center overflow-hidden border-b border-border/30 min-h-[70vh] py-24 px-4 sm:px-6 lg:px-8 w-full">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-background/10"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, transparent 40%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 40%, black 100%)",
        }}
      />
      {/* Primary center glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none bg-primary/10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-7 w-full max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full bg-secondary/50 border-border/60 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase gap-2 whitespace-nowrap"
          >
            <Users className="w-3 h-3 shrink-0" />
            <span>Executive Panel 2026</span>
          </Badge>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="font-mono text-[11px] tracking-[0.3em] text-primary/50 uppercase -mb-4"
        >
          // The People Behind the Mission
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.1] sm:leading-[1.03] text-balance px-2"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/60">
            Steering the Future of
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-br from-primary via-primary/80 to-primary/40">
            Machine Intelligence
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-sm sm:text-lg text-muted-foreground max-w-[90%] sm:max-w-xl leading-relaxed font-medium mx-auto"
        >
          Meet the dedicated executive panel overseeing the strategic
          initiatives of the ML &amp; AI Research Lab, Bangladesh — appointed
          April 07, 2026.
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="flex items-stretch justify-center divide-x divide-border/50 rounded-2xl border border-border/40 bg-secondary/20 backdrop-blur-sm overflow-hidden mt-4 w-full max-w-2xl"
        >
          {[
            {icon: Users, value: totalMembers, label: "Members"},
            {icon: Layers, value: 6, label: "Divisions"},
            {icon: CalendarCheck, value: "Oct '26", label: "Valid Until"},
          ].map(({icon: Icon, value, label}) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center justify-center gap-1.5 px-2 py-4 sm:px-8 sm:py-5"
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/50 mb-0.5" />
              <span className="text-lg sm:text-2xl font-black tracking-tight text-foreground">
                {value}
              </span>
              <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 text-center">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
