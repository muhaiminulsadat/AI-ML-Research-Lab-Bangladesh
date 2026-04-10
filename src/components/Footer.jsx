import Link from "next/link";
import {FlaskConical} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050508] overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] transition-all duration-500 shrink-0">
                <FlaskConical className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight text-white/90 group-hover:text-white transition-colors">
                  ML & AI Research Lab
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold tracking-[0.25em] text-primary/70 uppercase mt-1.5">
                  Bangladesh
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs leading-relaxed mb-6 font-medium">
              Advancing the boundaries of artificial intelligence and machine
              learning through innovative research and collaborative education.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-foreground">Explore</h4>
              <nav className="flex flex-col gap-3">
                {[
                  {href: "/research", label: "Research"},
                  {href: "/publications", label: "Publications"},
                  {href: "/courses", label: "Courses & Workshops"},
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium relative w-fit group sm:mx-0 mx-auto"
                  >
                    <span>{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-foreground">
                Organization
              </h4>
              <nav className="flex flex-col gap-3">
                {[
                  {href: "/about", label: "About Us"},
                  {href: "/members", label: "Our Team"},
                  {href: "/careers", label: "Careers"},
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium relative w-fit group sm:mx-0 mx-auto"
                  >
                    <span>{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h4 className="text-sm font-bold text-foreground">Connect</h4>
              <nav className="flex flex-col gap-3">
                <a
                  href="mailto:contact@aimllab.bd"
                  className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium relative w-fit group sm:mx-0 mx-auto"
                >
                  <span>contact@aimllab.bd</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} ML & AI Research Lab BD. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground font-medium">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
