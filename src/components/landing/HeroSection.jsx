import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowRight, Microscope} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center  pt-4 space-y-10">
      <Badge
        variant="outline"
        className="px-4 py-1.5 rounded-full bg-secondary/30 backdrop-blur-sm border-border/40 text-xs font-mono tracking-widest text-muted-foreground uppercase"
      >
        <Microscope className="w-3.5 h-3.5 text-primary mr-2 inline" />
        AI &amp; ML Research Lab
      </Badge>

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter max-w-5xl text-balance leading-[1.05] text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/80">
        Pioneering the Next Generation of{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-br from-primary via-primary/80 to-primary/40 drop-shadow-sm">
          Machine Intelligence
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance font-medium leading-relaxed">
        Advancing state-of-the-art machine learning, generative models, and
        scalable inference systems for a more intelligent future.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Link href="/research">
          <Button
            size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base group"
          >
            Explore Research
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href="/courses">
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 rounded-full border-border/40 hover:bg-secondary/40 font-medium text-base"
          >
            View Curriculums
          </Button>
        </Link>
      </div>
    </section>
  );
}
