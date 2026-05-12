import {Suspense} from "react";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/sonner";
import ClientAppShell from "@/components/layouts/ClientAppShell";
import {getLatestWorkshop} from "@/actions/workshop.action";

import {Inter, JetBrains_Mono} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "ML & AI  Lab | Research & Education",
  description:
    "Advanced Platform for Machine Learning and AI Research and Education",
  openGraph: {
    type: "website",
    siteName: "ML & AI Research Lab, Bangladesh.",
    locale: "en_US",
    title: "ML & AI  Lab | Research & Education",
    description:
      "Advanced Platform for Machine Learning and AI Research and Education",
    images: [
      {
        url: "https://ik.imagekit.io/muhaiminulsadat/ML-AI-Research-Lab/Vivid/ML%20AI%20Lab%20Logo.PNG",
        width: 1200,
        height: 630,
        alt: "ML & AI Lab logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ML & AI  Lab | Research & Education",
    description:
      "Advanced Platform for Machine Learning and AI Research and Education",
    images: [
      "https://ik.imagekit.io/muhaiminulsadat/ML-AI-Research-Lab/Vivid/ML%20AI%20Lab%20Logo.PNG",
    ],
  },
};

export default async function RootLayout({children}) {
  const latestWorkshop = await getLatestWorkshop();
  const workshopSlug = latestWorkshop.success ? latestWorkshop.data.slug : null;

  return (
    <html
      lang="en"
      className={cn(inter.variable, jetbrainsMono.variable, "antialiased dark")}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans">
        <Suspense fallback={null}>
          <ClientAppShell workshopSlug={workshopSlug}>
            {children}
          </ClientAppShell>
        </Suspense>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
