import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "SteamGOAT - OMWBE/PWSBE Certified Government Contractor | Washington State",
    template: "%s | SteamGOAT",
  },
  description: "SteamGOAT is an OMWBE-certified, WOSB women-owned small business specializing in custom software development (NAICS 541511), systems design (541512), IT services (541519), and facilities support (561210) for state and federal government contracts.",
  keywords: "government contracting, OMWBE, PWSBE, WOSB, NAICS 541511, NAICS 541512, NAICS 541519, NAICS 561210, Washington State, women-owned small business, defense contractor, set-aside contracts, SAM registered",
  openGraph: {
    title: "SteamGOAT - OMWBE/PWSBE Certified Government Contractor",
    description: "Certified women-owned small business delivering mission-critical software, manufacturing, and IT services for government agencies.",
    type: "website",
    locale: "en_US",
    siteName: "SteamGOAT",
  },
  twitter: {
    card: "summary_large_image",
    title: "SteamGOAT - Government Contracting Excellence",
    description: "OMWBE/PWSBE/WOSB certified contractor - Greatest Of All Time Under Pressure",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  display: "swap",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GovernmentService"],
  name: "SteamGOAT",
  alternateName: "SteamGOAT LLC",
  description: "OMWBE/PWSBE/WOSB certified government contractor specializing in custom software, IT services, advanced manufacturing, and facilities support.",
  url: "https://steamgoat.com",
  logo: "https://steamgoat.com/steamgoat-logo-1a.png",
  address: {
    "@type": "PostalAddress",
    addressRegion: "WA",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Joy Smith",
    jobTitle: "CEO & Owner",
  },
  naics: ["541511", "541512", "541519", "561210"],
  knowsAbout: [
    "Custom Computer Programming Services",
    "Computer Systems Design Services",
    "Other Computer Related Services",
    "Facilities Support Services",
    "Government Contracting",
    "Defense Manufacturing",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "OMWBE Certification - Office of Minority & Women's Business Enterprises",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "WOSB - Women-Owned Small Business",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "SAM.gov Registration",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-slate-950`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
