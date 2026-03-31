import {Geist, Geist_Mono, Inter, Figtree } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/sonner";
import ClientAppShell from "@/components/layouts/ClientAppShell";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI/ML Lab Courses",
  description: "Advanced Platform for Machine Learning and AI Courses",
};

export default function RootLayout({children}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "dark",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <ClientAppShell>
          {children}
        </ClientAppShell>
        
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
