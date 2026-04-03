import {Separator} from "@/components/ui/separator";
import {Microscope} from "lucide-react";

export default function MissionSection() {
  return (
    <section className="relative max-w-4xl mx-auto px-4 py-4">
      {/* ── top rule ─────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-5">
        <Separator className="flex-1 bg-border/30" />
        <Microscope className="size-3.5 text-muted-foreground/30 shrink-0" />
        <Separator className="flex-1 bg-border/30" />
      </div>

      {/* ── quote block ──────────────────────────────────────── */}
      <div className="relative">
        {/* decorative opening mark — large, faded, behind text */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-6 -left-2 sm:-left-6
                     text-[8rem] sm:text-[10rem] font-bold leading-none
                     text-primary/10 font-mono"
        >
          "
        </span>

        {/* quote body */}
        <blockquote className="relative z-10 text-center space-y-0 italic text-foreground/90">
          <p
            className="text-2xl sm:text-3xl lg:text-[2.1rem] font-medium tracking-tight
                        text-foreground/90 text-balance leading-[1.45]"
          >
            Our mission is to architect intelligent systems that are{" "}
            <span className="text-foreground font-semibold">robust</span>,{" "}
            <span className="text-foreground font-semibold">transparent</span>,
            and capable of solving complex global challenges through{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60 font-semibold">
              foundational research.
            </span>
          </p>
        </blockquote>
      </div>

      {/* ── attribution ──────────────────────────────────────── */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-px w-10 bg-border/50" />
        <div className="flex items-center gap-2.5">
          {/* avatar circle */}
          <div
            className="size-7 rounded-full bg-primary/10 border border-primary/20
                          flex items-center justify-center shrink-0"
          >
            <span className="font-mono text-[9px] font-bold text-primary leading-none">
              MS
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground/70 uppercase">
            Muhaiminul Sadat
          </span>
          <span className="text-border/60 text-xs">·</span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground/40 uppercase">
            Lab Director
          </span>
        </div>
        <div className="h-px w-10 bg-border/50" />
      </div>

      {/* ── bottom rule ──────────────────────────────────────── */}
      <div className="flex items-center gap-4 mt-16">
        <Separator className="flex-1 bg-border/30" />
        <Microscope className="size-3.5 text-muted-foreground/30 shrink-0" />
        <Separator className="flex-1 bg-border/30" />
      </div>
    </section>
  );
}
