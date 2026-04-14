"use client";

import {motion} from "framer-motion";
import {useEffect, useState} from "react";

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[80vh] w-full pointer-events-none flex justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-subtle opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "linear-gradient(to bottom, black 20%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 20%, transparent 100%)",
          }}
        />
        {/* Soft edge fading for hero grid */}
        <div
          className="absolute inset-0 bg-background/20"
          style={{
            maskImage:
              "radial-gradient(circle at center, transparent 30%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 30%, black 100%)",
          }}
        />
      </div>

      {/* Primary Glow in Center */}
      <motion.div
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 0.6, scale: 1}}
        transition={{duration: 3, ease: "easeOut"}}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"
      />

      {/* Animated Floating Particles/Nodes for AI theme */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-50">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary/30 rounded-full blur-[2px]"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
