"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  Briefcase,
  BookOpen,
  ArrowLeftRight,
  LayoutDashboard,
  Sparkles,
  Users,
  GraduationCap,
  Heart,
  Target,
  TrendingUp,
  Shield,
  ArrowRight,
  Star,
  Accessibility,
  Brain,
  Lightbulb,
  Clock,
  MapPin,
  Building2,
} from "lucide-react";

const features = [
  {
    href: "/mvp/assessments",
    icon: ClipboardCheck,
    title: "Career Assessments",
    description: "5 research-backed assessments covering interests, skills, values, lifestyle preferences, and aptitudes. Discover career pathways that truly match who you are.",
    color: "blue",
    stats: "5 Assessments",
    badge: "Interactive",
  },
  {
    href: "/mvp/careers",
    icon: Briefcase,
    title: "Career Explorer",
    description: "Browse 100+ career profiles with real salary data, education requirements, growth outlook, and day-in-the-life descriptions. Filter by interest, salary, and education level.",
    color: "emerald",
    stats: "100+ Careers",
    badge: "Searchable",
  },
  {
    href: "/mvp/learn",
    icon: BookOpen,
    title: "Learning Center",
    description: "Build essential employability skills with interactive modules covering resume writing, interview prep, workplace communication, financial literacy, and self-advocacy.",
    color: "purple",
    stats: "20+ Modules",
    badge: "Self-Paced",
  },
  {
    href: "/mvp/transition",
    icon: ArrowLeftRight,
    title: "Transition Readiness",
    description: "Comprehensive transition planning tool for students with IEPs, 504 plans, or disabilities. Track readiness across employment, education, and independent living domains.",
    color: "orange",
    stats: "3 Domains",
    badge: "IEP Aligned",
  },
  {
    href: "/mvp/dvr",
    icon: Building2,
    title: "DVR Services",
    description: "Full DVR service delivery system with Job Placement (L1-3), Intensive Training (L1-4), Job Retention (L1-4), Pre-ETS pipeline, bonus tracking, and SDOR-ready billing automation.",
    color: "indigo",
    stats: "6 Service Lines",
    badge: "DVR Ready",
  },
  {
    href: "/mvp/attendance",
    icon: Clock,
    title: "Attendance Tracker",
    description: "GPS-verified clock in/out with audit-ready time logs, client service documentation, geofence verification, and WIOA/DVR compliance reporting.",
    color: "teal",
    stats: "GPS Verified",
    badge: "Audit Ready",
  },
  {
    href: "/mvp/dashboard",
    icon: LayoutDashboard,
    title: "My Dashboard",
    description: "Track your progress across all assessments, saved careers, completed modules, and transition goals. See your career readiness score grow over time.",
    color: "rose",
    stats: "Real-Time",
    badge: "Personal",
  },
];

const audiences = [
  { icon: GraduationCap, title: "High School Students", desc: "College & career exploration for grades 9-12" },
  { icon: Accessibility, title: "Students with Disabilities", desc: "IEP/504 transition planning & Pre-ETS support" },
  { icon: Users, title: "DVR/VR Clients", desc: "Division of Vocational Rehabilitation participants" },
  { icon: Brain, title: "Neurodivergent Learners", desc: "Sensory-friendly, structured learning paths" },
  { icon: Heart, title: "Foster Youth", desc: "Independent living skills & career preparation" },
  { icon: Target, title: "Workforce Development", desc: "Job seekers & career changers of all ages" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "hover:border-blue-500", badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
  emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", border: "hover:border-emerald-500", badge: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" },
  purple: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "hover:border-purple-500", badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" },
  orange: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "hover:border-orange-500", badge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" },
  rose: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-400", border: "hover:border-rose-500", badge: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400" },
  teal: { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-400", border: "hover:border-teal-500", badge: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400" },
  indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-400", border: "hover:border-indigo-500", badge: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" },
};

export default function MVPHub() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Hero */}
      <section className="mb-12 fade-in-up">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-blue-100 uppercase tracking-wider">SteamGOAT PathReady Platform</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              Your Path to Career<br />Readiness Starts Here
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mb-8 leading-relaxed">
              A comprehensive career exploration, assessment, and transition planning platform designed for 
              high school students, individuals with disabilities, and anyone preparing for their next career move.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/mvp/assessments"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2 shadow-lg group"
              >
                Start Your Assessments
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/mvp/transition"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition flex items-center gap-2"
              >
                <Accessibility className="w-4 h-4" />
                Transition Readiness Tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-12 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "5", label: "Career Assessments", icon: ClipboardCheck },
            { num: "100+", label: "Career Profiles", icon: Briefcase },
            { num: "20+", label: "Learning Modules", icon: BookOpen },
            { num: "3", label: "Transition Domains", icon: ArrowLeftRight },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4 text-center hover:shadow-md transition">
              <stat.icon className="w-5 h-5 text-blue-700 dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.num}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className={`group bg-white dark:bg-slate-900 border border-border rounded-xl p-6 hover:shadow-lg transition-all ${colors.border} fade-in-up`}
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${colors.badge}`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${colors.text}`}>{feature.stats}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Who Is This For */}
      <section className="mb-12 fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-2xl font-bold mb-6">Who Is This For?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div key={aud.title} className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{aud.title}</h3>
                  <p className="text-xs text-muted-foreground">{aud.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compliance Banner */}
      <section className="mb-8 fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-blue-600" /> Section 508 Compliant</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-600" /> FERPA Aligned</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-purple-600" /> WCAG 2.1 AA</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-orange-600" /> Pre-ETS Ready</span>
            <span className="flex items-center gap-1.5"><Lightbulb className="w-4 h-4 text-yellow-600" /> IEP/504 Aligned</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-rose-600" /> WIOA Compliant</span>
          </div>
        </div>
      </section>
    </div>
  );
}
