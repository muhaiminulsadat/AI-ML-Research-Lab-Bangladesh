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
    <footer className="border-t bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
                <FlaskConical className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight">
                  ML/AI Research
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  Lab · Bangladesh
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Uniting researchers and students across Bangladesh to advance AI &
              ML research and build a stronger research culture.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Platform
            </p>
            <ul className="space-y-2">
              {[
                {href: "/members", label: "Members"},
                {href: "/dashboard", label: "Dashboard"},
                {href: "/research", label: "Research"},
                {href: "/about", label: "About Us"},
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Account
            </p>
            <ul className="space-y-2">
              {[
                {href: "/login", label: "Sign In"},
                {href: "/register", label: "Sign Up"},
                {href: "/profile", label: "Profile"},
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Connect
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/yourlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
                >
                  {/* <GitBranch className="h-3.5 w-3.5" /> */}
                  GitHub
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/yourlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
                >
                  {/* <Twitter className="h-3.5 w-3.5" /> */}
                  Twitter
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@researchlab.com"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  info@researchlab.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} ML/AI Research Lab Bangladesh. All
            rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Built for the future of AI research in Bangladesh
          </span>
        </div>
      </div>
    </footer>
  );
}
