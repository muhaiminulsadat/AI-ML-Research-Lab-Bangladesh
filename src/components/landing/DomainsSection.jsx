import {BrainCircuit, Cpu, Network, Code2, Zap} from "lucide-react";

const domains = [
  {
    icon: BrainCircuit,
    title: "Generative Models",
    desc: "Developing state-of-the-art transformers and diffusion architectures with robust structural coherence.",
  },
  {
    icon: Network,
    title: "Graph Neural Networks",
    desc: "Analyzing relational datasets for applications in molecular chemistry and predictive social dynamics.",
  },
  {
    icon: Zap,
    title: "Scalable Inference",
    desc: "Optimizing model quantization, intelligent pruning, and low-latency serving infrastructure for edge constraints.",
  },
  {
    icon: Cpu,
    title: "Reinforcement Learning",
    desc: "Training autonomous agents in simulated environments with complex multi-objective sparse reward parameters.",
  },
  {
    icon: Code2,
    title: "Algorithmic Alignment",
    desc: "Ensuring models behave identically to human constraints and absolute, verifiable mathematical safety bounds.",
  },
  {
    icon: Network,
    title: "Multimodal Processing",
    desc: "Fusing text, spatio-visual, and auditory signals into cohesive massive embeddings for unified intelligence paradigms.",
  },
];

export default function DomainsSection() {
  return (
    <section className="space-y-12 border-t border-border/30 pt-24">
      <div className="flex flex-col text-center sm:text-left space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Focus Domains
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Investigating high-impact disciplines across the spectrum of
          theoretical and applied machine learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((area, i) => (
          <div
            key={i}
            className="group p-8 rounded-[2rem] bg-secondary/10 border border-border/30 hover:border-primary/20 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-2xl bg-secondary/30 border border-border/20 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-primary/10 transition-all duration-300">
              <area.icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-medium tracking-tight text-foreground mb-3">
              {area.title}
            </h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {area.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
