import Link from "next/link";
import {
  FlaskConical,
  // GitBranch,
  // Twitter,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-[#040405]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand - Takes full width on mobile, 4 cols on desktop */}
          <div className="col-span-2 md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shrink-0">
                <FlaskConical className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-white/90">
                  ML & AI Research
                </span>
                <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase mt-1">
                  Lab · Bangladesh
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Uniting researchers and students across Bangladesh to advance AI &
              ML research and build a stronger, collaborative research culture.
            </p>
          </div>

          {/* Platform */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              Platform
            </p>
            <ul className="space-y-3">
              {[
                {href: "/members", label: "Members"},
                {href: "/dashboard", label: "Dashboard"},
                {href: "/research", label: "Research"},
                {href: "/about", label: "About Us"},
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              Account
            </p>
            <ul className="space-y-3">
              {[
                {href: "/login", label: "Sign In"},
                {href: "/register", label: "Sign Up"},
                {href: "/profile", label: "Profile"},
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 md:col-span-3 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              Connect
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/yourlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors group w-fit"
                >
                  GitHub
                  <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/yourlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors group w-fit"
                >
                  Twitter
                  <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@researchlab.com"
                  className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors w-fit"
                >
                  <Mail className="h-3.5 w-3.5" />
                  info@researchlab.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span className="text-[12px] text-white/40">
            © {new Date().getFullYear()} ML & AI Research Lab Bangladesh. All
            rights reserved.
          </span>
          <span className="text-[12px] text-white/40 font-mono tracking-widest uppercase">
            Built for the future
          </span>
        </div>
      </div>
    </footer>
  );
}
