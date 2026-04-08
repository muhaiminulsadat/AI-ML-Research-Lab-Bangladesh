"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Building2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

export default function MemberCard({ member, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card p-5 h-full transition-all duration-300 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5">
        <div className="absolute inset-x-0 top-0 h-px bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 rounded-t-xl" />

        {/* Ghost index */}
        <span
          className="absolute top-3 right-3 font-black select-none leading-none text-foreground/[0.04]"
          style={{ fontSize: "40px" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Avatar + name row */}
        <div className="relative z-10 flex items-center gap-3.5 mb-4">
          <Avatar className="w-16 h-16 border border-border/60 shrink-0 group-hover:border-primary/25 transition-colors duration-300">
            {member.url ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image src={member.url} alt={member.name} fill sizes="256px" quality={100} className="object-cover" />
              </div>
            ) : (
              <AvatarFallback className="text-base font-bold tracking-wide bg-secondary text-muted-foreground group-hover:text-foreground transition-colors">
                {getInitials(member.name)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base leading-snug text-foreground/90 group-hover:text-foreground transition-colors">
              {member.name}
            </h3>
            <p className="text-xs font-mono uppercase tracking-[0.1em] text-primary/60 mt-0.5 leading-snug">
              {member.designation}
            </p>
          </div>
        </div>

        {/* Details */}
        {(member.institution || member.department || member.email) && (
          <div className="relative z-10 flex flex-col gap-2 pt-4 mt-auto border-t border-border/40 text-sm text-muted-foreground">
            {member.institution && (
              <div className="flex items-start gap-2">
                <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-50" />
                <span className="leading-snug">{member.institution}</span>
              </div>
            )}
            {member.department && (
              <div className="flex items-start gap-2">
                <BookOpen className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-50" />
                <span className="leading-snug">{member.department}</span>
              </div>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 mt-1 text-primary/60 hover:text-primary transition-colors duration-200 group/m"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate text-sm group-hover/m:underline underline-offset-2">{member.email}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
