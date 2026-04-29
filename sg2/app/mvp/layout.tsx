"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Briefcase,
  BookOpen,
  ArrowLeftRight,
  Home,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
  Accessibility,
  Clock,
  MapPin,
  Building2,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/mvp", label: "Hub", icon: Home, description: "Platform Overview" },
  { href: "/mvp/dashboard", label: "My Dashboard", icon: LayoutDashboard, description: "Track Progress" },
  { href: "/mvp/assessments", label: "Assessments", icon: ClipboardCheck, description: "5 Career Assessments" },
  { href: "/mvp/careers", label: "Career Explorer", icon: Briefcase, description: "Browse 100+ Careers" },
  { href: "/mvp/learn", label: "Learning Center", icon: BookOpen, description: "Skills & Modules" },
  { href: "/mvp/transition", label: "Transition Readiness", icon: ArrowLeftRight, description: "IEP & 504 Support" },
  { href: "/mvp/attendance", label: "Attendance Tracker", icon: Clock, description: "GPS Time & Audit Logs" },
  { href: "/mvp/dvr", label: "DVR Services", icon: Building2, description: "Placement, Training & Billing" },
];

export default function MVPLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="h-16 border-b border-border bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg sticky top-0 z-50 flex items-center px-4 gap-4 shadow-sm">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link href="/mvp" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative">
            <Image src="/steamgoat-logo-1a.png" alt="SteamGOAT Logo" width={32} height={32} className="w-full h-full object-contain" priority />
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-blue-700 dark:text-blue-400 text-lg">PathReady</span>
            <span className="text-xs text-muted-foreground ml-2 font-medium">by SteamGOAT</span>
          </div>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <span className="hidden md:flex items-center gap-1.5 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full font-semibold">
            <Sparkles className="w-3 h-3" />
            MVP Demo
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1.5 rounded-full font-semibold">
            <Accessibility className="w-3 h-3" />
            WCAG 2.1 AA
          </span>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-700 transition px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Main Site</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-slate-50 dark:bg-slate-950 p-4 gap-1 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="MVP navigation" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                    isActive
                      ? "bg-blue-700 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-sm"
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-400"}`} />
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <span className={`text-[10px] ${isActive ? "text-blue-100" : "text-muted-foreground"}`}>
                      {item.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">Government Ready</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Section 508 compliant. FERPA aligned. Designed for DVR, Pre-ETS, and IEP programs.
              </p>
            </div>
          </div>
        </aside>

        {/* Sidebar - Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-16 bottom-0 w-72 bg-white dark:bg-slate-950 border-r border-border p-4 overflow-y-auto shadow-xl">
              <nav aria-label="MVP mobile navigation" className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main id="main-content" className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
