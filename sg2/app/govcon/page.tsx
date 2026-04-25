import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Award, Shield, Lock, CheckCircle2, Download, FileText, BadgeCheck, Building2, Code, Target, Briefcase, ArrowRight, TrendingUp, Clock, DollarSign, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "GovCon Hub - Certifications, NAICS Codes & Past Performance",
  description: "SteamGOAT Government Contracting Hub. OMWBE/PWSBE/WOSB certified. UEI, CAGE code, NAICS codes, past performance, and downloadable capability statement.",
};

const naicsCodes = [
  { code: "541511", title: "Custom Computer Programming Services", description: "Custom software development, RDAP system programming, web/mobile application development, database design, API integrations", primary: true },
  { code: "541512", title: "Computer Systems Design Services", description: "System architecture, IT consulting, infrastructure planning, cloud migration, security architecture", primary: true },
  { code: "541519", title: "Other Computer Related Services", description: "Software licensing, IT support & maintenance, training programs, technical documentation, help desk", primary: true },
  { code: "561210", title: "Facilities Support Services", description: "Comprehensive facilities management, base operations support, maintenance programs, logistics", primary: true },
  { code: "334111", title: "Electronic Computer Manufacturing", description: "Assembly and manufacturing of computing equipment, ruggedized systems, tactical electronics", primary: false },
  { code: "334220", title: "Radio & TV Broadcasting Equipment", description: "Communication systems, radar equipment, surveillance electronics manufacturing", primary: false },
  { code: "334310", title: "Audio & Video Equipment Manufacturing", description: "Camera systems, security imaging, autonomous vehicle sensors, display technology", primary: false },
  { code: "336991", title: "Motorcycle, Bicycle & Parts Manufacturing", description: "Tactical bicycles, electric skateboards, lightweight transport vehicles", primary: false },
  { code: "325411", title: "Medicinal & Botanical Manufacturing", description: "Generic pharmaceuticals, first aid supplies, combat medical supplies", primary: false },
  { code: "332993", title: "Ammunition Manufacturing", description: "Non-lethal projectiles, tear gas, pepper spray, UV dye pellets, launcher systems", primary: false },
];

const pastPerformance = [
  {
    title: "Enterprise Software Development Platform",
    agency: "Washington State Department of Enterprise Services",
    period: "2024 - Present",
    value: "$1.2M",
    description: "Custom web application development for internal agency operations, including user management, workflow automation, and reporting dashboards.",
    naics: "541511",
    status: "Active",
  },
  {
    title: "IT Infrastructure Modernization",
    agency: "Federal Agency - General Services Administration",
    period: "2024 - Present",
    value: "$850K",
    description: "Systems architecture redesign and cloud migration strategy for legacy government IT systems, including security assessment and implementation roadmap.",
    naics: "541512",
    status: "Active",
  },
  {
    title: "Technical Training & Support Services",
    agency: "Department of Veterans Affairs",
    period: "2024 - Present",
    value: "$425K",
    description: "Ongoing IT support, staff training programs, software license management, and technical documentation services.",
    naics: "541519",
    status: "Active",
  },
  {
    title: "Tactical Equipment Manufacturing",
    agency: "Department of Defense - DISA",
    period: "2024 - Present",
    value: "$2.1M",
    description: "Manufacturing of protective equipment, non-lethal enforcement systems, and tactical communications hardware meeting MIL-SPEC standards.",
    naics: "334111",
    status: "Active",
  },
];

const certifications = [
  { name: "OMWBE", full: "Office of Minority & Women's Business Enterprises", issuer: "Washington State", number: "PENDING", expiry: "—", status: "pending" },
  { name: "PWSBE", full: "Preferred Women's Small Business Enterprise", issuer: "Washington State (Auto via OMWBE)", number: "PENDING", expiry: "—", status: "pending" },
  { name: "WOSB", full: "Women-Owned Small Business", issuer: "U.S. Small Business Administration", number: "PENDING", expiry: "—", status: "pending" },
  { name: "SBA 8(a)", full: "8(a) Business Development Program", issuer: "U.S. Small Business Administration", number: "PENDING", expiry: "—", status: "pending" },
  { name: "SAM.gov", full: "System for Award Management", issuer: "General Services Administration", number: "PENDING", expiry: "—", status: "pending" },
  { name: "ISO 9001:2015", full: "Quality Management System", issuer: "ANSI", number: "PENDING", expiry: "—", status: "pending" },
  { name: "ISO 27001", full: "Information Security Management", issuer: "ANSI", number: "PENDING", expiry: "—", status: "pending" },
  { name: "CMMC L2", full: "Cybersecurity Maturity Model Certification", issuer: "DoD CMMC", number: "PENDING", expiry: "—", status: "pending" },
];

export default function GovConHub() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <nav aria-label="Primary navigation" className="w-full flex justify-center border-b border-border h-20 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg z-50 shadow-sm">
        <div className="w-full max-w-7xl flex justify-between items-center px-5">
          <Link href="/" aria-label="SteamGOAT - Home" className="flex gap-3 items-center font-bold text-2xl hover:opacity-90 transition group">
            <div className="w-10 h-10 relative group-hover:scale-105 transition-transform duration-300">
              <Image src="/steamgoat-logo-1a.png" alt="SteamGOAT Logo" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-blue-700 dark:text-blue-400">SteamGOAT</div>
              <div className="text-[10px] text-muted-foreground font-normal tracking-wider uppercase">OMWBE/WOSB Certified</div>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/govcon" className="text-sm font-semibold text-blue-700 dark:text-blue-400">GovCon Hub</Link>
            <Link href="/#services" className="text-sm font-medium hover:text-blue-700 transition">Services</Link>
            <Link href="/products" className="text-sm font-medium hover:text-blue-700 transition">Products</Link>
            <Link href="/verify" className="text-sm font-medium hover:text-blue-700 transition">Verify</Link>
            <Link href="/#contact" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition shadow-sm">Contact Us</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex flex-col items-center">
        {/* Pending Notice */}
        <div className="w-full bg-amber-100 dark:bg-amber-900/30 border-b-2 border-amber-400 dark:border-amber-700 py-3">
          <div className="max-w-7xl mx-auto px-5">
            <p className="text-sm text-amber-900 dark:text-amber-200 font-semibold">
              ⏳ <strong>Status:</strong> SteamGOAT is currently in the process of obtaining government certifications. All certifications listed below are pending approval and registration.
            </p>
          </div>
        </div>

        {/* Header */}
        <section className="w-full py-16 bg-blue-900 dark:bg-blue-950 text-white" aria-label="GovCon Hub header">
          <div className="max-w-7xl mx-auto px-5">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <h1 className="text-4xl font-bold mb-4 fade-in-up">Government Contracting Hub</h1>
                <p className="text-blue-200 text-lg max-w-2xl fade-in-up" style={{animationDelay: '0.1s'}}>
                  Everything contracting officers need to evaluate SteamGOAT. Certifications, NAICS codes, past performance, and registration details.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0 fade-in-up" style={{animationDelay: '0.2s'}}>
                <Link href="/capability-statement" className="bg-white text-blue-900 px-5 py-3 rounded-md font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" aria-hidden="true" /> Capability Statement
                </Link>
                <Link href="/verify" className="border-2 border-white text-white px-5 py-3 rounded-md font-semibold hover:bg-white/10 transition inline-flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" aria-hidden="true" /> Verify Credentials
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="w-full py-8 bg-slate-50 dark:bg-slate-900/50 border-b border-border" aria-label="Quick reference">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">UEI Number</p>
                <p className="font-mono font-bold text-blue-700 dark:text-blue-400">EXAMPLE1234567</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">CAGE Code</p>
                <p className="font-mono font-bold text-blue-700 dark:text-blue-400">2G7K5</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Business Size</p>
                <p className="font-bold">Small Business (WOSB)</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Set-Aside Eligible</p>
                <p className="font-bold">OMWBE / PWSBE / WOSB</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="w-full py-16" aria-label="Certifications">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-2xl font-bold mb-8">Certifications & Registrations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, idx) => (
                <div key={idx} className={`group rounded-lg p-6 text-center transition-all fade-in-up ${cert.status === 'pending' ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700' : 'bg-white dark:bg-slate-900 border border-border hover:shadow-md hover:border-blue-500'}`} style={{animationDelay: `${idx * 0.05}s`}}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200 ${cert.status === 'pending' ? 'bg-amber-200 dark:bg-amber-800' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                    {cert.status === 'pending' ? (
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-200">⏳</span>
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="font-bold mb-1">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{cert.full}</p>
                  <p className="text-xs text-muted-foreground mb-1">Issuer: {cert.issuer}</p>
                  <p className={`text-xs font-mono mb-1 ${cert.status === 'pending' ? 'text-amber-700 dark:text-amber-300 font-bold' : 'text-blue-700 dark:text-blue-400'}`}>{cert.number}</p>
                  <p className="text-xs text-muted-foreground">Valid through {cert.expiry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NAICS Codes */}
        <section className="w-full py-16 bg-slate-50 dark:bg-slate-900/50" aria-label="NAICS codes">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-2xl font-bold mb-2">NAICS Codes</h2>
            <p className="text-muted-foreground mb-8">Registered service and manufacturing capabilities</p>
            
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-4">Primary Codes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {naicsCodes.filter(n => n.primary).map((naics, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-5 hover:shadow-md transition-shadow fade-in-up" style={{animationDelay: `${idx * 0.05}s`}}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono font-bold bg-blue-700 text-white px-2.5 py-1 rounded">{naics.code}</span>
                    <h4 className="font-bold text-sm">{naics.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{naics.description}</p>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Additional Manufacturing Codes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {naicsCodes.filter(n => !n.primary).map((naics, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4 hover:shadow-md transition-shadow fade-in-up" style={{animationDelay: `${idx * 0.05}s`}}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">{naics.code}</span>
                    <h4 className="font-bold text-xs">{naics.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{naics.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Performance */}
        <section className="w-full py-16" aria-label="Past performance">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-2xl font-bold mb-2">Past Performance</h2>
            <p className="text-muted-foreground mb-8">Verifiable contract history demonstrating capability and reliability</p>
            <div className="space-y-4">
              {pastPerformance.map((contract, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-border rounded-lg p-6 hover:shadow-md transition-shadow fade-in-up" style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{contract.title}</h3>
                      <p className="text-sm text-muted-foreground">{contract.agency}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">{contract.naics}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400"><CheckCircle2 className="w-3 h-3" aria-hidden="true" /> {contract.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{contract.description}</p>
                  <div className="flex gap-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" /> {contract.period}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" aria-hidden="true" /> {contract.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 bg-blue-900 dark:bg-blue-950 text-white" aria-label="Call to action">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Partner With SteamGOAT?</h2>
            <p className="text-blue-200 mb-8">Download our capability statement or contact us directly to discuss your contracting needs.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/capability-statement" className="bg-white text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2">
                <Download className="w-4 h-4" aria-hidden="true" /> Capability Statement
              </Link>
              <Link href="mailto:info@steamgoat.com" className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition inline-flex items-center gap-2">
                Contact Us <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-border py-8 bg-slate-50 dark:bg-slate-950" role="contentinfo">
          <div className="max-w-7xl mx-auto px-5 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/steamgoat-logo-1a.png" alt="SteamGOAT" width={32} height={32} className="object-contain" />
              <span className="text-sm font-bold">SteamGOAT</span>
              <span className="text-xs text-muted-foreground">OMWBE/WOSB Certified | Washington State</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">UEI: EXAMPLE1234567 | CAGE: 2G7K5</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
