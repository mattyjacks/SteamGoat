'use client';

import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Printer, ArrowLeft } from "lucide-react";
import { CapabilityStatementDoc } from "./capability-doc";

export function CapabilityStatementPage() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <nav aria-label="Primary navigation" className="w-full flex justify-center border-b border-border h-20 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg z-50 shadow-sm no-print">
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
            <Link href="/govcon" className="text-sm font-medium hover:text-blue-700 transition">GovCon Hub</Link>
            <Link href="/products" className="text-sm font-medium hover:text-blue-700 transition">Products</Link>
            <Link href="/verify" className="text-sm font-medium hover:text-blue-700 transition">Verify</Link>
            <Link href="/#contact" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition shadow-sm">Contact Us</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex flex-col items-center">
        {/* Action bar */}
        <div className="w-full bg-slate-50 dark:bg-slate-900/50 border-b border-border py-4 no-print">
          <div className="max-w-4xl mx-auto px-5 flex flex-wrap items-center justify-between gap-4">
            <Link href="/govcon" className="text-sm text-muted-foreground hover:text-blue-700 transition inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Back to GovCon Hub
            </Link>
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition inline-flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" aria-hidden="true" /> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>

        {/* Capability Statement Document */}
        <CapabilityStatementDoc />

        {/* Footer */}
        <footer className="w-full border-t border-border py-8 bg-slate-50 dark:bg-slate-950 no-print" role="contentinfo">
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
