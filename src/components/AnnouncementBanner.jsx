"use client";

import {useState, useEffect} from "react";
import {X, Sparkles} from "lucide-react";
import Link from "next/link";
import {motion, AnimatePresence} from "framer-motion";

export default function AnnouncementBanner({workshopSlug}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("workshopBannerDismissed-v1");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("workshopBannerDismissed-v1", "true");
  };

  if (!workshopSlug) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: -50, opacity: 0}}
          transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
          className="relative w-full bg-gradient-to-r from-[oklch(0.5_0.12_210)] via-[oklch(0.6_0.12_210)] to-[oklch(0.7_0.12_210)] text-white py-1.5 md:py-2 px-2 z-[100] shadow-[0_2px_15px_oklch(0.7_0.12_210_/_0.3)]"
        >
          <div className="container flex sm:flex-row items-between justify-between sm:justify-between gap-1.5 sm:gap-4 mx-auto px-2 md:px-6">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-sm font-medium text-center flex-1 justify-between sm:justify-start leading-snug">
              <span>
                <span className="inline-block animate-bounce mr-1 text-sm sm:text-base">
                  🚀
                </span>{" "}
                <span className="font-extrabold tracking-wide text-white">
                  NATIONAL WORKSHOP:{" "}
                  <span className="hidden sm:inline">
                    Machine Learning & Artificial Intelligence 2026.
                  </span>
                </span>{" "}
                Secure your spot!
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/workshops/${workshopSlug}`}
                className="group flex items-center gap-1.5 text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full bg-white text-black hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 whitespace-nowrap"
              >
                <span>Register Now</span>
                <span className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform leading-none">
                  ✨
                </span>
              </Link>

              <div className="h-3 sm:h-4 w-px bg-white/40" />

              <button
                onClick={handleDismiss}
                className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/20 flex items-center justify-center"
                aria-label="Dismiss banner"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
