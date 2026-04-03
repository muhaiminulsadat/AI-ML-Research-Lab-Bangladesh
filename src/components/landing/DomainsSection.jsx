import {
  BrainCircuit,
  Cpu,
  Network,
  Code2,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";

const domains = [
  {
    icon: BrainCircuit,
    title: "Generative Models",
    tag: "NeurIPS '24",
    desc: "Developing state-of-the-art transformers and diffusion architectures with robust structural coherence.",
    color: "text-[#E68A00]",
    bg: "bg-[#E68A00]/10",
  },
  {
    icon: Network,
    title: "Graph Neural Networks",
    tag: "ICML '24",
    desc: "Analyzing relational datasets for applications in molecular chemistry and predictive social dynamics.",
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
  },
  {
    icon: Zap,
    title: "Scalable Inference",
    tag: "MLSys '24",
    desc: "Optimizing model quantization, intelligent pruning, and low-latency serving infrastructure for edge constraints.",
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
  },
  {
    icon: Cpu,
    title: "Reinforcement Learning",
    tag: "ICLR '24",
    desc: "Training autonomous agents in simulated environments with complex multi-objective sparse reward parameters.",
    color: "text-[#EF4444]",
    bg: "bg-[#EF4444]/10",
  },
  {
    icon: Code2,
    title: "Algorithmic Alignment",
    tag: "ACL '24",
    desc: "Ensuring models behave identically to human constraints and absolute, verifiable mathematical safety bounds.",
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
  },
  {
    icon: Network,
    title: "Multimodal Processing",
    tag: "CVPR '24",
    desc: "Fusing text, spatio-visual, and auditory signals into cohesive massive embeddings for unified intelligence paradigms.",
    color: "text-[#06B6D4]",
    bg: "bg-[#06B6D4]/10",
  },
];

export default function DomainsSection() {
  return (
    <section className="border-t border-border/30 space-y-6">
      {/* ── Section header ───────────────────────────────────── */}
      <div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4 flex flex-col items-center sm:items-start">
          {/* eyebrow */}
          <p className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
            // Focus Domains
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
            Where we push
            <br className="hidden sm:block" /> the boundaries
          </h2>
        </div>

        <p className="text-muted-foreground max-w-xs text-sm leading-relaxed text-center sm:text-right">
          Investigating high-impact disciplines across the spectrum of
          theoretical and applied machine learning.
        </p>
      </div>

      {/* ── Cards grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain, i) => (
          <div
            key={i}
            className={`group relative flex flex-col p-7 rounded-2xl bg-[#090A0F] border border-white/5 hover:bg-[#0D0F14] hover:-translate-y-1 shadow-lg transition-all duration-300 cursor-default overflow-hidden`}
          >
            {/* ── card top row: icon + index ── */}
            <div className="flex items-start justify-between mb-8">
              {/* icon box */}
              <div
                className={`size-12 rounded-[14px] flex items-center justify-center shrink-0 ${domain.bg} group-hover:scale-105 transition-all duration-300`}
              >
                <domain.icon
                  className={`size-[22px] ${domain.color} transition-colors duration-300`}
                  strokeWidth={2}
                />
              </div>

              {/* index number — fades out on hover, replaced by arrow */}
              <div className="relative size-6 flex items-center justify-center">
                <span
                  className="absolute font-mono text-[11px] text-muted-foreground/30
                             group-hover:opacity-0 transition-opacity duration-200"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  className="absolute size-4 text-white/30 opacity-0
                             group-hover:opacity-100 group-hover:text-white/70 transition-all duration-200"
                />
              </div>
            </div>

            {/* ── title + desc ── */}
            <div className="flex-1 space-y-2 mb-7 relative z-10">
              <h3 className="text-[17px] font-bold tracking-tight text-white/90 leading-snug group-hover:text-white transition-colors duration-300">
                {domain.title}
              </h3>
              <p className="text-[14px] text-white/50 leading-relaxed font-normal">
                {domain.desc}
              </p>
            </div>

            {/* ── conference tag ── */}
            <div className="flex items-center gap-2.5 relative z-10">
              <Separator className="flex-1 bg-white/5" />
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 rounded-full font-mono text-[10px]
                           tracking-widest text-white/40 border-white/5
                           bg-white/[0.02] uppercase shrink-0"
              >
                {domain.tag}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
