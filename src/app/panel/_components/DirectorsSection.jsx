"use client";

import DirectorCard from "./DirectorCard";
import {motion} from "framer-motion";

export default function DirectorsSection({directors}) {
  if (!directors?.length) return null;

  return (
    <section className="py-10 border-b border-border/30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
          className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left gap-4 mb-12"
        >
          <div className="space-y-2.5">
            <p className="font-mono text-[10px] tracking-[0.28em] text-primary/50 uppercase">
              // Leadership
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-foreground leading-none">
              Directors
            </h2>
            <div className="h-px w-28 mx-auto sm:mx-0 bg-primary/30 rounded-full" />
          </div>
          <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
            Visionary leaders guiding the lab's strategic direction and
            overarching mission.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          {directors.map((member, i) => (
            <DirectorCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
