"use client";

import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";
import Image from "next/image";

const sponsors = [
  {
    name: "Jamuna TV",
    isBrand: true,
    renderLogo: () => (
      <div className="relative flex items-center justify-center h-7 md:h-10 px-2 w-[100px] md:w-[160px]">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Jamuna_TV_logo.svg/1280px-Jamuna_TV_logo.svg.png"
          alt="Jamuna TV Logo"
          fill
          sizes="(max-width: 768px) 100px, 160px"
          className="object-contain drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        />
      </div>
    ),
  },
];

export default function SponsorMarquee() {
  const items = [
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
  ];

  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-16 overflow-hidden flex flex-col items-center">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-8 text-center relative z-10 w-full">
        <div className="inline-flex flex-col items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset]">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.25em]">
              Our Media Partners
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full py-5 sm:py-10 bg-[#090A0F] border-y border-white/[0.03]">
        {/* Cyanish vignette effect: gentle cyan tint in the center fading to solid dark edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,#090A0F_80%)] pointer-events-none" />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwaDR2MUgweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPgo8L3N2Zz4=')] opacity-30 mix-blend-overlay pointer-events-none" />

        {/* Deep dark vignette edges masking over the marquee */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#090A0F_100%)]" />

        <div className="relative flex w-full flex-col justify-center overflow-hidden z-10">
          <motion.div
            className="flex w-max items-center gap-10 md:gap-24 pr-10 md:pr-24"
            animate={{x: [0, "-50%"]}}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {items.map((Sponsor, idx) => (
              <motion.div
                key={idx}
                whileHover={{scale: 1.05}}
                className="group flex flex-col items-center justify-center cursor-pointer shrink-0 transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {Sponsor.isBrand && (
                  <div className="relative px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-500 shadow-inner backdrop-blur-md">
                    {Sponsor.renderLogo()}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
