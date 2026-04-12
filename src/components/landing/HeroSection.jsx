"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowRight, Microscope, Sparkles} from "lucide-react";
import Link from "next/link";
import {motion} from "framer-motion";

const containerVariants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 30},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.8, ease: [0.16, 1, 0.3, 1]},
  },
};

export default function HeroSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center text-center pt-8 space-y-8 relative z-10"
    >
      <motion.div variants={itemVariants}>
        <Badge
          variant="outline"
          className="px-4 py-1.5 rounded-full bg-secondary/30 backdrop-blur-md border-border/50 text-xs font-mono tracking-widest text-muted-foreground uppercase shadow-sm"
        >
          <Microscope className="w-3.5 h-3.5 text-primary mr-2 inline animate-pulse" />
          ML &amp; AI Research Lab, Bangladesh
          <Sparkles className="w-3.5 h-3.5 text-primary ml-2 inline opacity-70" />
        </Badge>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter max-w-5xl text-balance leading-[1.05] text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground/90 to-foreground/60"
      >
        Pioneering the Next Generation of{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-br from-primary via-primary/80 to-primary/40 drop-shadow-sm relative inline-block">
          Machine Intelligence
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance font-medium leading-relaxed"
      >
        Advancing state-of-the-art machine learning, generative models, and
        scalable inference systems for a more intelligent future.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 pt-6"
      >
        <Link href="/research">
          <Button
            size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base group relative overflow-hidden transition-all shadow-[0_0_40px_-10px_rgba(var(--primary),0.8)]"
          >
            <span className="relative z-10 flex items-center">
              Explore Research
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20 z-0"
              initial={{x: "-100%"}}
              whileHover={{x: "100%"}}
              transition={{duration: 0.6, ease: "easeInOut"}}
            />
          </Button>
        </Link>
        <Link href="/courses">
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 rounded-full border-border/40 hover:bg-secondary/40 font-medium text-base backdrop-blur-sm"
          >
            View Curriculums
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
