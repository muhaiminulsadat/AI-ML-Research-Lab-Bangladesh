import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">ML/AI Research Lab</h3>
            <p className="text-sm text-muted-foreground">
              Uniting researchers and students to advance AI & ML in Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/yourlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/yourlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@researchlab.com"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ML/AI Research Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
