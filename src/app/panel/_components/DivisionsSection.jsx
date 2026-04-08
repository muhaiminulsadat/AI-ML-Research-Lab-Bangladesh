"use client";

import {motion} from "framer-motion";
import MemberCard from "./MemberCard";

const DIVISION_CONFIG = [
  {
    key: "administration",
    label: "Administration",
    icon: "⚙️",
    description: "Governance, strategy & nationwide coordination",
  },
  {
    key: "research",
    label: "Research",
    icon: "🔬",
    description: "ML/AI research, publications & project execution",
  },
  {
    key: "ict",
    label: "ICT",
    icon: "💻",
    description: "Digital infra, web development & technical systems",
  },
  {
    key: "law",
    label: "Law",
    icon: "⚖️",
    description: "Legal advisory, compliance & partnerships",
  },
  {
    key: "executives",
    label: "Executives",
    icon: "🏛️",
    description: "Cross-functional leaders supporting lab operations",
  },
];

function DivisionSection({config, members}) {
  if (!members?.length) return null;

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: "-40px"}}
      transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
      className="space-y-6"
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-4 sm:gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/40 border border-border/50 text-2xl shrink-0">
            {config.icon}
          </div>
          <div>
            <h3 className="text-xl sm:text-xl font-bold tracking-tight text-foreground">
              {config.label} Division
            </h3>
            <p className="text-sm text-muted-foreground mt-1 sm:mt-0.5">
              {config.description}
            </p>
          </div>
        </div>
        <span className="mt-2 sm:mt-0 text-[11px] sm:text-xs font-mono text-primary/60 bg-primary/10 border border-primary/15 rounded-full px-3 py-1 flex-shrink-0">
          {members.length} members
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, i) => (
          <MemberCard key={`${member.name}-${i}`} member={member} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function DivisionsSection({dataMap}) {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section header */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
          className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left gap-4"
        >
          <div className="space-y-2.5">
            <p className="font-mono text-[10px] tracking-[0.28em] text-primary/50 uppercase">
              // Divisions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-foreground leading-none">
              Our Divisions
            </h2>
            <div className="h-px w-28 mx-auto sm:mx-0 bg-border/60 rounded-full" />
          </div>
          <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
            All divisions and their members listed below.
          </p>
        </motion.div>

        {/* All divisions listed sequentially */}
        {DIVISION_CONFIG.map((config) => (
          <div key={config.key} className="space-y-6 pt-2">
            <div className="h-px bg-border/30" />
            <DivisionSection config={config} members={dataMap[config.key]} />
          </div>
        ))}
      </div>
    </section>
  );
}
