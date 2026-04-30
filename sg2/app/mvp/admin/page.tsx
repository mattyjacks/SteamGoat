"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Bell,
  Calendar,
  Briefcase,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface AdminStat {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: typeof DollarSign;
  color: string;
}

interface Alert {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  message: string;
  timestamp: string;
}

interface RecentInvoice {
  id: string;
  customer: string;
  service: string;
  amount: number;
  status: "paid" | "submitted" | "draft" | "rejected";
  date: string;
}

const stats: AdminStat[] = [
  { label: "Active Customers", value: "247", change: "+12 this month", changeType: "up", icon: Users, color: "blue" },
  { label: "Total Revenue (FY)", value: "$847,230", change: "+18.3% YoY", changeType: "up", icon: DollarSign, color: "green" },
  { label: "Pending Invoices", value: "$156,420", change: "34 invoices", changeType: "neutral", icon: FileText, color: "orange" },
  { label: "Placement Rate", value: "78.4%", change: "+3.2% vs target", changeType: "up", icon: TrendingUp, color: "purple" },
  { label: "Bonus Capture Rate", value: "82.1%", change: "Target: 80%", changeType: "up", icon: BarChart3, color: "emerald" },
  { label: "Avg Days to Placement", value: "42.6", change: "-5.1 days YoY", changeType: "up", icon: Clock, color: "indigo" },
];

const alerts: Alert[] = [
  { id: "a1", type: "warning", title: "Fee Schedule Update Due", message: "CRP-IL fee schedule expires 06/30/2026. New rates pending state approval.", timestamp: "2 hours ago" },
  { id: "a2", type: "error", title: "3 Invoices Past Due", message: "Invoices INV-4821, INV-4835, INV-4847 are 30+ days past submitted date.", timestamp: "4 hours ago" },
  { id: "a3", type: "success", title: "Bonus Milestone Reached", message: "Healthcare bonus capture rate exceeded 80% target for Q2 2026.", timestamp: "1 day ago" },
  { id: "a4", type: "info", title: "New CRP-IL Rates Published", message: "Exhibit L revised 07/01/2025 rates are loaded and active in the system.", timestamp: "2 days ago" },
  { id: "a5", type: "warning", title: "SDOR Submission Deadline", message: "5 customers have SDORs due within 7 days. Review required.", timestamp: "3 days ago" },
];

const recentInvoices: RecentInvoice[] = [
  { id: "INV-4892", customer: "Maria Santos", service: "Job Placement L2", amount: 994, status: "submitted", date: "2026-04-28" },
  { id: "INV-4891", customer: "Tyler Nguyen", service: "Job Retention L1 - Healthcare Bonus", amount: 722, status: "paid", date: "2026-04-27" },
  { id: "INV-4890", customer: "Keisha Brown", service: "Intensive Training L2 - Activity", amount: 1080, status: "submitted", date: "2026-04-26" },
  { id: "INV-4889", customer: "James Thompson", service: "Job Placement L3 - Outcome", amount: 2216, status: "paid", date: "2026-04-25" },
  { id: "INV-4888", customer: "Destiny Jackson", service: "Job Placement L1 - Intake", amount: 665, status: "draft", date: "2026-04-24" },
  { id: "INV-4887", customer: "Aiden Cruz (Pre-ETS)", service: "WBLE-B", amount: 2496, status: "submitted", date: "2026-04-23" },
  { id: "INV-4886", customer: "Tyler Nguyen", service: "Job Retention L1 - High Wage Bonus", amount: 722, status: "paid", date: "2026-04-22" },
  { id: "INV-4885", customer: "James Thompson", service: "Job Placement L3 - Activity", amount: 1370, status: "paid", date: "2026-04-20" },
];

const adminModules = [
  { id: "invoice-rules", title: "Invoice Validation", description: "Automated validation rules, SDOR requirements, and payment logic", icon: FileText, href: "/mvp/admin/invoice-rules", count: "14 rules", color: "blue", comingSoon: true },
  { id: "bonus-config", title: "Bonus Configuration", description: "Performance bonus thresholds, eligibility criteria, and auto-detection", icon: TrendingUp, href: "/mvp/admin/bonus-config", count: "8 bonuses", color: "green", comingSoon: true },
  { id: "user-mgmt", title: "User Management", description: "Staff accounts, VRC assignments, role permissions", icon: Users, href: "/mvp/admin/users", count: "18 users", color: "purple", comingSoon: true },
  { id: "reporting", title: "Reports & Analytics", description: "Monthly reports, DVR performance metrics, WIOA compliance", icon: BarChart3, href: "/mvp/admin/reports", count: "6 reports", color: "emerald", comingSoon: true },
  { id: "settings", title: "System Settings", description: "Rural area definitions, wage thresholds, SDOR templates", icon: Settings, href: "/mvp/admin/settings", count: "Configuration", color: "slate", comingSoon: true },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);
}

function statusColor(status: string) {
  switch (status) {
    case "paid": return "bg-green-900/30 text-green-400 border-green-700/50";
    case "submitted": return "bg-blue-900/30 text-blue-400 border-blue-700/50";
    case "draft": return "bg-slate-700/30 text-slate-300 border-slate-600/50";
    case "rejected": return "bg-red-900/30 text-red-400 border-red-700/50";
    default: return "bg-slate-700/30 text-slate-300 border-slate-600/50";
  }
}

function alertColor(type: string) {
  switch (type) {
    case "warning": return { bg: "bg-amber-900/20 border-amber-700/40", icon: "text-amber-400", dot: "bg-amber-400" };
    case "error": return { bg: "bg-red-900/20 border-red-700/40", icon: "text-red-400", dot: "bg-red-400" };
    case "success": return { bg: "bg-green-900/20 border-green-700/40", icon: "text-green-400", dot: "bg-green-400" };
    case "info": return { bg: "bg-blue-900/20 border-blue-700/40", icon: "text-blue-400", dot: "bg-blue-400" };
    default: return { bg: "bg-slate-800 border-slate-700", icon: "text-slate-400", dot: "bg-slate-400" };
  }
}

function statIconColor(color: string) {
  const map: Record<string, string> = {
    blue: "text-blue-400 bg-blue-900/30",
    green: "text-green-400 bg-green-900/30",
    orange: "text-orange-400 bg-orange-900/30",
    purple: "text-purple-400 bg-purple-900/30",
    emerald: "text-emerald-400 bg-emerald-900/30",
    indigo: "text-indigo-400 bg-indigo-900/30",
  };
  return map[color] || "text-slate-400 bg-slate-800";
}

function moduleColor(color: string) {
  const map: Record<string, { bg: string; icon: string; btn: string }> = {
    indigo: { bg: "bg-indigo-900/20 border-indigo-700/30", icon: "text-indigo-400", btn: "bg-indigo-600 hover:bg-indigo-700" },
    blue: { bg: "bg-blue-900/20 border-blue-700/30", icon: "text-blue-400", btn: "bg-blue-600 hover:bg-blue-700" },
    green: { bg: "bg-green-900/20 border-green-700/30", icon: "text-green-400", btn: "bg-green-600 hover:bg-green-700" },
    purple: { bg: "bg-purple-900/20 border-purple-700/30", icon: "text-purple-400", btn: "bg-purple-600 hover:bg-purple-700" },
    emerald: { bg: "bg-emerald-900/20 border-emerald-700/30", icon: "text-emerald-400", btn: "bg-emerald-600 hover:bg-emerald-700" },
    slate: { bg: "bg-slate-800/50 border-slate-700/30", icon: "text-slate-400", btn: "bg-slate-600 hover:bg-slate-700" },
  };
  return map[color] || { bg: "bg-slate-800 border-slate-700", icon: "text-slate-400", btn: "bg-slate-600 hover:bg-slate-700" };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [tab, setTab] = useState<"overview" | "alerts" | "invoices">("overview");

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-slate-400 text-sm mt-1">CRP-IL Program Management - Fee Schedules, Billing & Configuration</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
          </div>
          <span className="text-xs text-slate-500 border-l border-slate-700 pl-3">Last updated: Apr 29, 2026 4:53 PM</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${statIconColor(stat.color)}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              <p className={`text-xs mt-2 ${stat.changeType === "up" ? "text-green-400" : stat.changeType === "down" ? "text-red-400" : "text-slate-500"}`}>
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 rounded-lg p-1 border border-slate-700 w-fit">
        {(["overview", "alerts", "invoices"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              tab === t ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t === "overview" ? "Modules" : t === "alerts" ? `Alerts (${alerts.length})` : `Recent Invoices (${recentInvoices.length})`}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((mod) => {
            const Icon = mod.icon;
            const colors = moduleColor(mod.color);
            return (
              <div key={mod.id} className={`border rounded-xl p-6 transition-all ${mod.comingSoon ? "bg-slate-900/50 border-slate-800 opacity-60" : "bg-slate-900 border-slate-700 hover:border-slate-600"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg border ${colors.bg}`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  {mod.comingSoon && (
                    <span className="px-2 py-1 bg-slate-700 text-slate-400 text-[10px] font-bold rounded uppercase tracking-wide">Soon</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{mod.title}</h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{mod.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{mod.count}</span>
                  {mod.comingSoon ? (
                    <span className="text-xs text-slate-600">Coming Soon</span>
                  ) : (
                    <Link href={mod.href} className={`flex items-center gap-1 px-3 py-1.5 ${colors.btn} text-white rounded-lg text-xs font-semibold transition`}>
                      Open <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Alerts Tab */}
      {tab === "alerts" && (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const colors = alertColor(alert.type);
            return (
              <div key={alert.id} className={`border rounded-lg p-4 flex items-start gap-4 ${colors.bg}`}>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-semibold text-white text-sm">{alert.title}</h4>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{alert.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoices Tab */}
      {tab === "invoices" && (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Invoice ID</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Service</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Amount</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                    <td className="py-3 px-4 font-mono text-indigo-400 text-xs">{inv.id}</td>
                    <td className="py-3 px-4 text-white font-medium">{inv.customer}</td>
                    <td className="py-3 px-4 text-slate-300">{inv.service}</td>
                    <td className="py-3 px-4 text-right font-mono text-white">{formatCurrency(inv.amount)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-400">{inv.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Revenue by Service Line</h3>
          <div className="space-y-3">
            {[
              { name: "Job Placement (L1-L4-DB)", amount: 312450, pct: 37 },
              { name: "Intensive Training (L1-L4-DB)", amount: 198720, pct: 23 },
              { name: "Job Retention (L1-L4-DB)", amount: 156340, pct: 18 },
              { name: "Pre-ETS (WBLE/WRT/Shadows)", amount: 98420, pct: 12 },
              { name: "Performance Bonuses", amount: 52180, pct: 6 },
              { name: "CBA & Discovery", amount: 29120, pct: 4 },
            ].map((line) => (
              <div key={line.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-300">{line.name}</span>
                  <span className="font-mono text-white">{formatCurrency(line.amount)}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all"
                    style={{ width: `${line.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Bonus Performance (FY 2026)</h3>
          <div className="space-y-4">
            {[
              { name: "Healthcare Coverage ($722)", earned: 38, eligible: 52, amount: 27436 },
              { name: "High Wage ($722)", earned: 24, eligible: 40, amount: 17328 },
              { name: "Rapid Placement ($535)", earned: 15, eligible: 28, amount: 8025 },
              { name: "Rural Residence ($375)", earned: 8, eligible: 12, amount: 3000 },
              { name: "Rural Job Location ($375)", earned: 6, eligible: 10, amount: 2250 },
              { name: "Permanent Employment ($722)", earned: 5, eligible: 8, amount: 3610 },
            ].map((bonus) => {
              const pct = Math.round((bonus.earned / bonus.eligible) * 100);
              return (
                <div key={bonus.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-300">{bonus.name}</span>
                    <span className="text-xs text-slate-500">{bonus.earned}/{bonus.eligible} captured ({pct}%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-white w-16 text-right">{formatCurrency(bonus.amount)}</span>
                  </div>
                </div>
              );
            })}
            <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Total Bonuses Captured</span>
              <span className="font-mono text-lg font-bold text-green-400">{formatCurrency(61649)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
