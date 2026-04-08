"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

export default function DirectorCard({ member, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div className="group relative flex flex-col items-center text-center rounded-2xl border border-border/50 bg-card p-8 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-primary/[0.03]" />

        <span
          className="absolute top-4 right-5 font-black select-none leading-none text-foreground/[0.045]"
          style={{ fontSize: "60px" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Avatar */}
        <div className="relative mb-5 z-10">
          <div className="absolute inset-[-5px] rounded-full border border-primary/0 group-hover:border-primary/25 transition-all duration-400" />
          <Avatar className="w-24 h-24 border-2 border-border/60 group-hover:border-primary/25 transition-colors duration-300">
            {member.url ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image src={member.url} alt={member.name} fill sizes="256px" quality={100} className="object-cover" />
              </div>
            ) : (
              <AvatarFallback className="text-xl font-bold tracking-wider bg-secondary text-muted-foreground group-hover:text-foreground transition-colors">
                {getInitials(member.name)}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <div className="relative z-10 space-y-2">
          <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-foreground transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary/70">
            {member.designation}
          </p>
        </div>

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="relative z-10 mt-4 flex items-center gap-1.5 text-sm text-muted-foreground/50 hover:text-primary transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            {member.email}
          </a>
        )}
      </div>
    </motion.div>
  );
}
