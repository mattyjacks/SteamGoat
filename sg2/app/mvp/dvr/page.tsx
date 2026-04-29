"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  GraduationCap,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
  Shield,
  Star,
  Sparkles,
  Building2,
  Briefcase,
  Heart,
  Flag,
  Bell,
  BarChart3,
  MapPin,
  Calendar,
  Award,
  Zap,
  CircleDollarSign,
} from "lucide-react";
import {
  serviceFees,
  bonuses,
  preEtsServices,
  sampleCustomers,
  sampleStudents,
  qualityTargets,
  type DVRCustomer,
  type PreEtsStudent,
  type ServiceCategory,
  type BonusType,
} from "./dvr-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

function statusColor(status: string) {
  const map: Record<string, string> = {
    intake: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    active: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    placed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    stabilized: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    retained: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    closed: "bg-slate-100 dark:bg-slate-800 text-muted-foreground",
    draft: "bg-slate-100 dark:bg-slate-800 text-slate-600",
    pending: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    submitted: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    paid: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    rejected: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400",
  };
  return map[status] || "bg-slate-100 text-slate-600";
}

function categoryLabel(cat: ServiceCategory) {
  const map: Record<ServiceCategory, string> = {
    "job-placement": "Job Placement",
    "intensive-training": "Intensive Training",
    "job-retention": "Job Retention",
    "pre-ets": "Pre-ETS",
    "twe": "Trial Work Experience",
    "cba": "Community Based Assessment",
    "discovery": "Discovery Services",
    "customized-jp": "Customized Job Placement",
  };
  return map[cat];
}

function categoryColor(cat: ServiceCategory) {
  const map: Record<ServiceCategory, string> = {
    "job-placement": "text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
    "intensive-training": "text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30",
    "job-retention": "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
    "pre-ets": "text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30",
    "twe": "text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
    "cba": "text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30",
    "discovery": "text-pink-700 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30",
    "customized-jp": "text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30",
  };
  return map[cat];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DVRPage() {
  const [tab, setTab] = useState<"dashboard" | "customers" | "services" | "pre-ets" | "billing">("dashboard");
  const [customers] = useState<DVRCustomer[]>(sampleCustomers);
  const [students] = useState<PreEtsStudent[]>(sampleStudents);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [serviceFilter, setServiceFilter] = useState<"all" | ServiceCategory>("all");

  // Computed metrics
  const totalRevenue = customers.reduce((s, c) => s + c.totalPaid, 0);
  const totalBilled = customers.reduce((s, c) => s + c.totalBilled, 0);
  const pendingInvoices = customers.flatMap((c) => c.invoices).filter((i) => i.status === "submitted" || i.status === "pending");
  const totalPending = pendingInvoices.reduce((s, i) => s + i.amount, 0);
  const placedCount = customers.filter((c) => c.status === "placed" || c.status === "retained").length;
  const activeCount = customers.filter((c) => c.status === "active" || c.status === "intake").length;
  const conversionReady = students.filter((s) => s.conversionReady).length;

  // Alerts
  const alerts: { type: "warning" | "success" | "info"; message: string; customer?: string }[] = [];
  customers.forEach((c) => {
    if (c.service === "job-placement" && c.daysSinceAuth >= 50 && c.daysSinceAuth <= 60 && !c.startDate) {
      alerts.push({ type: "warning", message: `RAPID PLACEMENT: ${60 - c.daysSinceAuth} days remaining for ${c.name} (${c.caseNumber})`, customer: c.id });
    }
    if (c.bonusesEligible.length > 0 && c.startDate) {
      alerts.push({ type: "info", message: `${c.name} eligible for ${c.bonusesEligible.length} bonus(es): ${c.bonusesEligible.map((b) => bonuses.find((bd) => bd.type === b)?.name).join(", ")}`, customer: c.id });
    }
    if (c.status === "placed" && c.bonusesEarned.length === 0 && c.bonusesEligible.length > 0) {
      alerts.push({ type: "warning", message: `Uncaptured bonuses for ${c.name} - potential ${fmt(c.bonusesEligible.reduce((s, b) => s + (bonuses.find((bd) => bd.type === b)?.amount || 0), 0))} revenue`, customer: c.id });
    }
  });
  students.forEach((s) => {
    if (s.conversionReady) {
      alerts.push({ type: "success", message: `${s.name} (${s.school}, Grade ${s.grade}) ready for Job Placement conversion!`, customer: s.id });
    }
  });

  const maxBonusPotential = customers.reduce((sum, c) => {
    return sum + c.bonusesEligible.reduce((s, b) => s + (bonuses.find((bd) => bd.type === b)?.amount || 0), 0);
  }, 0);

  // Filter customers
  const filteredCustomers = serviceFilter === "all" ? customers : customers.filter((c) => c.service === serviceFilter);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">DVR Service Delivery System</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">DVR Services Management</h1>
        <p className="text-muted-foreground max-w-3xl">
          Complete service delivery platform for Job Placement (L1-3), Intensive Training (L1-4-DB), 
          Job Retention (L1-4-DB), and Pre-ETS programs with automated bonus tracking, SDOR generation, 
          and audit-ready billing.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 overflow-x-auto fade-in-up" style={{ animationDelay: "0.05s" }}>
        {([
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "customers", label: "Customers", icon: Users },
          { id: "services", label: "Fee Schedule", icon: DollarSign },
          { id: "pre-ets", label: "Pre-ETS Pipeline", icon: GraduationCap },
          { id: "billing", label: "Billing & Bonuses", icon: CircleDollarSign },
        ] as const).map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                tab === t.id ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-700 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/*  DASHBOARD TAB                                               */}
      {/* ============================================================ */}
      {tab === "dashboard" && (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 fade-in-up" style={{ animationDelay: "0.1s" }}>
            {[
              { label: "Revenue Collected", value: fmt(totalRevenue), icon: DollarSign, color: "text-emerald-600", sub: `${fmt(totalBilled)} billed` },
              { label: "Pending Invoices", value: fmt(totalPending), icon: Clock, color: "text-amber-600", sub: `${pendingInvoices.length} invoices` },
              { label: "Active Customers", value: String(activeCount), icon: Users, color: "text-blue-600", sub: `${placedCount} placed/retained` },
              { label: "Bonus Potential", value: fmt(maxBonusPotential), icon: Zap, color: "text-purple-600", sub: "uncaptured bonuses" },
              { label: "Pre-ETS Pipeline", value: String(students.length), icon: GraduationCap, color: "text-orange-600", sub: `${conversionReady} conversion-ready` },
            ].map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4">
                  <Icon className={`w-5 h-5 ${kpi.color} mb-2`} />
                  <div className="text-xl font-bold">{kpi.value}</div>
                  <div className="text-xs text-muted-foreground">{kpi.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{kpi.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 fade-in-up" style={{ animationDelay: "0.15s" }}>
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-600" /> Action Items & Alerts ({alerts.length})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {alerts.map((alert, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
                    alert.type === "warning" ? "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800" :
                    alert.type === "success" ? "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800" :
                    "bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
                  }`}>
                    {alert.type === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" /> :
                     alert.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" /> :
                     <Flag className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />}
                    <span className="text-xs">{alert.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pipeline Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Mix */}
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" /> Active Service Mix
              </h3>
              {(["job-placement", "intensive-training", "job-retention"] as ServiceCategory[]).map((cat) => {
                const count = customers.filter((c) => c.service === cat).length;
                const pct = customers.length > 0 ? (count / customers.length) * 100 : 0;
                return (
                  <div key={cat} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{categoryLabel(cat)}</span>
                      <span className="text-muted-foreground">{count} customers</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div className={`h-3 rounded-full transition-all ${cat === "job-placement" ? "bg-blue-500" : cat === "intensive-training" ? "bg-purple-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Workflow Stages */}
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 fade-in-up" style={{ animationDelay: "0.25s" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" /> Customer Pipeline
              </h3>
              {(["intake", "active", "placed", "stabilized", "retained"] as const).map((status) => {
                const count = customers.filter((c) => c.status === status).length;
                return (
                  <div key={status} className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColor(status)}`}>{status}</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div className="h-2 bg-indigo-500 rounded-full transition-all" style={{ width: `${customers.length > 0 ? (count / customers.length) * 100 : 0}%` }} />
                    </div>
                    <span className="text-sm font-bold w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" /> Quality Metrics (Target: Exceeds Standards)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(qualityTargets).map(([key, qt]) => {
                // Simulated current values
                const simValues: Record<string, number> = { sdorSubmission30Days: 96, bonusCaptureRate: 67, firstAttemptInvoice: 92, preEtsConversion: 45, staffTrainingCompliance: 100 };
                const current = simValues[key] || 0;
                const isGood = current >= qt.target;
                return (
                  <div key={key} className={`rounded-xl p-4 border-2 ${isGood ? "border-emerald-300 dark:border-emerald-800" : "border-amber-300 dark:border-amber-800"}`}>
                    <div className={`text-2xl font-bold ${isGood ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>{current}%</div>
                    <div className="text-[10px] text-muted-foreground">{qt.label}</div>
                    <div className="text-[10px] font-medium mt-1">Target: {qt.target}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  CUSTOMERS TAB                                               */}
      {/* ============================================================ */}
      {tab === "customers" && (
        <div className="space-y-4">
          {/* Filter */}
          <div className="flex gap-2 flex-wrap mb-2">
            {(["all", "job-placement", "intensive-training", "job-retention"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setServiceFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${serviceFilter === f ? "bg-indigo-700 text-white" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              >
                {f === "all" ? "All Services" : categoryLabel(f)}
              </button>
            ))}
          </div>

          {filteredCustomers.map((cust) => {
            const isExpanded = expandedCustomer === cust.id;
            const fee = serviceFees.find((sf) => sf.category === cust.service && sf.level === cust.level);

            return (
              <div key={cust.id} className={`bg-white dark:bg-slate-900 border rounded-xl transition-all ${isExpanded ? "border-indigo-500 shadow-lg" : "border-border hover:shadow-md"}`}>
                <button onClick={() => setExpandedCustomer(isExpanded ? null : cust.id)} className="w-full text-left p-5 flex items-center gap-4" aria-expanded={isExpanded}>
                  <div className="w-11 h-11 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm">{cust.name}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColor(cust.status)}`}>{cust.status}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColor(cust.service)}`}>{categoryLabel(cust.service)} {cust.level}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{cust.caseNumber} - {cust.vrcName}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-6">
                    {cust.bonusesEligible.length > 0 && (
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {cust.bonusesEligible.length} bonus{cust.bonusesEligible.length > 1 ? "es" : ""}
                      </span>
                    )}
                    <div className="text-right">
                      <div className="text-sm font-bold">{fmt(cust.totalPaid)}</div>
                      <div className="text-[10px] text-muted-foreground">collected</div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border pt-5">
                    {/* Workflow Progress */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">Service Workflow</h4>
                      <div className="flex items-center gap-2">
                        {cust.workflowStages.map((stage, i) => (
                          <div key={i} className="flex items-center gap-2 flex-1">
                            <div className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-medium transition ${
                              i < cust.workflowStage ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                              i === cust.workflowStage ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-500" :
                              "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
                            }`}>
                              {i < cust.workflowStage ? <CheckCircle2 className="w-3 h-3 inline mr-1" /> : null}
                              {stage}
                            </div>
                            {i < cust.workflowStages.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Customer Details */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                            <span className="text-muted-foreground block">SDOP Date</span>
                            <span className="font-bold">{cust.sdopDate}</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                            <span className="text-muted-foreground block">Days Since Auth</span>
                            <span className={`font-bold ${cust.daysSinceAuth > 55 && !cust.startDate ? "text-amber-600" : ""}`}>{cust.daysSinceAuth} days</span>
                          </div>
                          {cust.jobTitle && (
                            <>
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                                <span className="text-muted-foreground block">Job Title</span>
                                <span className="font-bold">{cust.jobTitle}</span>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                                <span className="text-muted-foreground block">Employer</span>
                                <span className="font-bold">{cust.employer}</span>
                              </div>
                            </>
                          )}
                          {cust.wage && (
                            <>
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                                <span className="text-muted-foreground block">Wage</span>
                                <span className="font-bold">${cust.wage.toFixed(2)}/hr</span>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                                <span className="text-muted-foreground block">Weekly Hours</span>
                                <span className="font-bold">{cust.weeklyHours}h</span>
                              </div>
                            </>
                          )}
                          {cust.service === "job-placement" && (
                            <>
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                                <span className="text-muted-foreground block">Site Visits</span>
                                <span className={`font-bold ${cust.siteVisits >= 5 ? "text-emerald-600" : "text-amber-600"}`}>{cust.siteVisits}/5</span>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                                <span className="text-muted-foreground block">Interviews</span>
                                <span className="font-bold">{cust.interviews}</span>
                              </div>
                            </>
                          )}
                          {cust.retentionDay > 0 && (
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 col-span-2">
                              <span className="text-muted-foreground block">Retention Day</span>
                              <span className={`font-bold ${cust.retentionDay >= 90 ? "text-emerald-600" : ""}`}>{cust.retentionDay}/90</span>
                            </div>
                          )}
                        </div>

                        {/* Bonus Eligibility */}
                        {(cust.bonusesEligible.length > 0 || cust.bonusesEarned.length > 0) && (
                          <div>
                            <h4 className="text-xs font-bold text-muted-foreground mb-2 uppercase">Bonus Tracking</h4>
                            <div className="space-y-1.5">
                              {bonuses.map((b) => {
                                const earned = cust.bonusesEarned.includes(b.type);
                                const eligible = cust.bonusesEligible.includes(b.type);
                                if (!earned && !eligible) return null;
                                return (
                                  <div key={b.type} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${earned ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-amber-50 dark:bg-amber-950/20"}`}>
                                    {earned ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Zap className="w-4 h-4 text-amber-600" />}
                                    <span className="flex-1 font-medium">{b.name}</span>
                                    <span className="font-bold">{fmt(b.amount)}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${earned ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                      {earned ? "EARNED" : "ELIGIBLE"}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Invoices & Notes */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase">Invoices ({cust.invoices.length})</h4>
                        <div className="space-y-1.5">
                          {cust.invoices.map((inv) => (
                            <div key={inv.id} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="flex-1 font-medium">{inv.type}</span>
                              <span className="font-bold">{fmt(inv.amount)}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusColor(inv.status)}`}>{inv.status}</span>
                              {inv.sdorAttached ? <Shield className="w-3 h-3 text-emerald-600" aria-label="SDOR attached" /> : null}
                            </div>
                          ))}
                          {fee && (
                            <div className="flex items-center justify-between text-xs pt-2 border-t border-border mt-2">
                              <span className="text-muted-foreground">Max fee ({cust.level}):</span>
                              <span className="font-bold">{fmt(fee.totalFee)}</span>
                            </div>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-muted-foreground uppercase mt-4">Case Notes</h4>
                        <div className="space-y-1">
                          {cust.notes.map((n, i) => (
                            <p key={i} className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-800/50 rounded px-2 py-1.5">{n}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/*  FEE SCHEDULE TAB                                            */}
      {/* ============================================================ */}
      {tab === "services" && (
        <div className="space-y-8">
          {/* Core Services */}
          {(["job-placement", "intensive-training", "job-retention"] as ServiceCategory[]).map((cat) => {
            const fees = serviceFees.filter((f) => f.category === cat);
            return (
              <div key={cat} className="fade-in-up">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor(cat)}`}>{categoryLabel(cat)}</span>
                </h2>
                <div className="bg-white dark:bg-slate-900 border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">
                          <th className="text-left px-4 py-3 font-semibold text-xs">Level</th>
                          <th className="text-right px-4 py-3 font-semibold text-xs">Intake</th>
                          <th className="text-right px-4 py-3 font-semibold text-xs">Activity</th>
                          <th className="text-right px-4 py-3 font-semibold text-xs">Outcome</th>
                          <th className="text-right px-4 py-3 font-semibold text-xs text-indigo-700 dark:text-indigo-400">Total</th>
                          <th className="text-left px-4 py-3 font-semibold text-xs hidden lg:table-cell">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fees.map((f) => (
                          <tr key={f.id} className="border-b border-border last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                            <td className="px-4 py-3 font-bold">{f.level}</td>
                            <td className="px-4 py-3 text-right font-mono">{fmt(f.intakeFee)}</td>
                            <td className="px-4 py-3 text-right font-mono">{fmt(f.activityFee)}</td>
                            <td className="px-4 py-3 text-right font-mono">{fmt(f.outcomeFee)}</td>
                            <td className="px-4 py-3 text-right font-mono font-bold text-indigo-700 dark:text-indigo-400">{fmt(f.totalFee)}</td>
                            <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pre-ETS */}
          <div className="fade-in-up">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor("pre-ets")}`}>Pre-ETS Services</span>
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">
                      <th className="text-left px-4 py-3 font-semibold text-xs">Service</th>
                      <th className="text-right px-4 py-3 font-semibold text-xs">Fee</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs">Duration</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs">Hours</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs hidden lg:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preEtsServices.map((s) => (
                      <tr key={s.type} className="border-b border-border last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                        <td className="px-4 py-3 font-bold">{s.name}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-orange-700 dark:text-orange-400">
                          {fmt(s.fee)}{s.maxUnits ? <span className="text-xs text-muted-foreground font-normal"> /unit (max {s.maxUnits})</span> : ""}
                        </td>
                        <td className="px-4 py-3">{s.duration}</td>
                        <td className="px-4 py-3">{s.hours}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{s.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bonuses */}
          <div className="fade-in-up">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" /> Performance Bonuses
              <span className="text-xs font-normal text-muted-foreground">(Up to {fmt(bonuses.reduce((s, b) => s + b.amount * b.maxPerCustomer, 0))} per customer)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bonuses.map((b) => (
                <div key={b.type} className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-amber-600">{fmt(b.amount)}</span>
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">
                      Max {b.maxPerCustomer}x
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{b.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{b.trigger}</p>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground mb-1">Required Documentation:</p>
                    {b.docsRequired.map((d) => (
                      <p key={d} className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {d}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  PRE-ETS PIPELINE TAB                                        */}
      {/* ============================================================ */}
      {tab === "pre-ets" && (
        <div className="space-y-6">
          {/* Pipeline Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in-up">
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{students.length}</div>
              <div className="text-xs text-muted-foreground">Total Students</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{students.filter((s) => s.preEtsServices.some((ps) => ps.status === "in-progress")).length}</div>
              <div className="text-xs text-muted-foreground">In Active Services</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{conversionReady}</div>
              <div className="text-xs text-muted-foreground">Conversion-Ready</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{Math.round((conversionReady / Math.max(students.length, 1)) * 100)}%</div>
              <div className="text-xs text-muted-foreground">Conversion Rate</div>
            </div>
          </div>

          {/* Student Cards */}
          <div className="space-y-3">
            {students.map((stu) => {
              const isExpanded = expandedStudent === stu.id;
              const completedServices = stu.preEtsServices.filter((s) => s.status === "completed").length;
              const totalServices = stu.preEtsServices.length;

              return (
                <div key={stu.id} className={`bg-white dark:bg-slate-900 border rounded-xl transition-all ${isExpanded ? "border-orange-500 shadow-lg" : "border-border hover:shadow-md"} ${stu.conversionReady ? "ring-2 ring-emerald-500" : ""}`}>
                  <button onClick={() => setExpandedStudent(isExpanded ? null : stu.id)} className="w-full text-left p-5 flex items-center gap-4" aria-expanded={isExpanded}>
                    <div className="w-11 h-11 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-orange-700 dark:text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm">{stu.name}</h3>
                        {stu.conversionReady && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> CONVERSION READY
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stu.iepStatus === "active" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700" : stu.iepStatus === "504" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700" : "bg-slate-100 text-muted-foreground"}`}>
                          {stu.iepStatus === "active" ? "IEP" : stu.iepStatus === "504" ? "504" : "No Plan"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{stu.school} - Grade {stu.grade} - {stu.disability}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-bold">{completedServices}/{totalServices}</div>
                        <div className="text-[10px] text-muted-foreground">services</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{stu.totalHours}h</div>
                        <div className="text-[10px] text-muted-foreground">total hours</div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-border pt-5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Service Journey */}
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Pre-ETS Service Journey</h4>
                          <div className="space-y-2">
                            {stu.preEtsServices.map((ps, i) => {
                              const svc = preEtsServices.find((s) => s.type === ps.type);
                              return (
                                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                                  ps.status === "completed" ? "bg-emerald-50 dark:bg-emerald-950/20" :
                                  ps.status === "in-progress" ? "bg-blue-50 dark:bg-blue-950/20 ring-1 ring-blue-300" :
                                  "bg-slate-50 dark:bg-slate-800/50"
                                }`}>
                                  {ps.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> :
                                   ps.status === "in-progress" ? <Clock className="w-4 h-4 text-blue-600" /> :
                                   <Calendar className="w-4 h-4 text-muted-foreground" />}
                                  <div className="flex-1">
                                    <span className="text-xs font-bold">{svc?.name}</span>
                                    <span className="text-[10px] text-muted-foreground ml-2">{svc?.duration}</span>
                                  </div>
                                  <span className="text-xs font-bold text-orange-700 dark:text-orange-400">{fmt(svc?.fee || 0)}</span>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    ps.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                                    ps.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                                    "bg-slate-200 text-slate-600"
                                  }`}>{ps.status}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-3 text-xs text-muted-foreground flex justify-between border-t border-border pt-2">
                            <span>Total Pre-ETS Revenue:</span>
                            <span className="font-bold text-orange-700 dark:text-orange-400">
                              {fmt(stu.preEtsServices.filter((ps) => ps.status === "completed").reduce((s, ps) => {
                                const svc = preEtsServices.find((sv) => sv.type === ps.type);
                                return s + (svc?.fee || 0);
                              }, 0))}
                            </span>
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Notes & Progress</h4>
                          <div className="space-y-1.5">
                            {stu.notes.map((n, i) => (
                              <p key={i} className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-800/50 rounded px-3 py-2">{n}</p>
                            ))}
                          </div>
                          {stu.conversionReady && (
                            <div className="mt-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                <Sparkles className="w-4 h-4" /> Ready for Job Placement Referral
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-1">
                                This student has completed WBLE-C and is eligible for conversion to Job Placement services post-graduation. Initiate VRC referral.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  BILLING TAB                                                 */}
      {/* ============================================================ */}
      {tab === "billing" && (
        <div className="space-y-6">
          {/* Revenue Summary */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden fade-in-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-sm font-semibold text-indigo-200 mb-1">Total Revenue</h2>
              <div className="text-4xl font-bold mb-4">{fmt(totalRevenue)}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-lg font-bold">{fmt(totalBilled)}</div>
                  <div className="text-[10px] text-indigo-200">Total Billed</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-lg font-bold">{fmt(totalPending)}</div>
                  <div className="text-[10px] text-indigo-200">Pending</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-lg font-bold">{fmt(maxBonusPotential)}</div>
                  <div className="text-[10px] text-indigo-200">Uncaptured Bonuses</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-lg font-bold">{customers.flatMap((c) => c.invoices).filter((i) => i.status === "paid").length}</div>
                  <div className="text-[10px] text-indigo-200">Invoices Paid</div>
                </div>
              </div>
            </div>
          </div>

          {/* All Invoices */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl overflow-hidden fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="p-5 border-b border-border">
              <h3 className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-600" /> All Invoices</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Type</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Date</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold">SDOR</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.flatMap((c) => c.invoices.map((inv) => ({ ...inv, customerName: c.name, caseNumber: c.caseNumber }))).sort((a, b) => b.dateCreated.localeCompare(a.dateCreated)).map((inv) => (
                    <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                      <td className="px-4 py-3">
                        <div className="font-medium">{inv.customerName}</div>
                        <div className="text-[10px] text-muted-foreground">{inv.caseNumber}</div>
                      </td>
                      <td className="px-4 py-3">{inv.type}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold">{fmt(inv.amount)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{inv.dateCreated}</td>
                      <td className="px-4 py-3 text-center">
                        {inv.sdorAttached ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <AlertTriangle className="w-4 h-4 text-amber-600 mx-auto" />}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColor(inv.status)}`}>{inv.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Rules */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 fade-in-up" style={{ animationDelay: "0.15s" }}>
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" /> Invoice Validation Rules (Auto-Enforced)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { rule: "Invoice within 30 days of service completion", action: "Auto-reminder at day 25; escalate at day 30" },
                { rule: "SDOR attached to every invoice", action: "Block submission if SDOR missing" },
                { rule: "Paystub dated within last 2 weeks (High Wage)", action: "Validate date; reject if older" },
                { rule: "Rural bonus requires HRSA PDF", action: "Block bonus invoice without attached PDF" },
                { rule: "No duplicate invoicing", action: "Check against prior invoices for same customer/service" },
                { rule: "Employer != Contractor's own business", action: "Auto-block if employer matches contractor EIN" },
              ].map((r) => (
                <div key={r.rule} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <Shield className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium">{r.rule}</p>
                    <p className="text-[10px] text-muted-foreground">{r.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partial Payment Rules */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-950/20 border border-border rounded-xl p-5 fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-indigo-600" /> Partial Payment Scenarios (Contract Section 7)
            </h3>
            <div className="space-y-2">
              {[
                { scenario: "Service not completed (outside contractor control)", max: "50%", approval: "DVR unit supervisor" },
                { scenario: "Customized job not achieved but job found", max: "80%", approval: "DVR unit supervisor" },
                { scenario: "Emergency (state/regional/national)", max: "Up to 100% (temporary)", approval: "DVR Director or Chief of Field Services" },
              ].map((p) => (
                <div key={p.scenario} className="flex items-center gap-4 text-xs p-3 bg-white dark:bg-slate-900 rounded-lg border border-border">
                  <div className="flex-1">{p.scenario}</div>
                  <span className="font-bold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">Max: {p.max}</span>
                  <span className="text-muted-foreground whitespace-nowrap">{p.approval}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
