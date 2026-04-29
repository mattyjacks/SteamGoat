"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  DollarSign,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Calendar,
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  Info,
  CheckCircle2,
  XCircle,
  Briefcase,
  GraduationCap,
  Users,
  Star,
  ArrowUpDown,
  Eye,
  Printer,
} from "lucide-react";

/* ================================================================== */
/*  CRP-IL Fee Schedule Data (Exhibit L - Revised 07/01/2025)          */
/* ================================================================== */

interface CRPService {
  id: string;
  category: string;
  name: string;
  level?: string;
  intakeFee: number;
  activityFee: number;
  outcomeFee: number;
  maximumTotalFee: number;
  description: string;
  requirements: string[];
  bonusesApply: boolean;
  twoFeeOnly?: boolean;
}

interface CRPBonus {
  id: string;
  name: string;
  amount: number;
  appliesTo: string[];
  excludesFrom: string[];
  condition: string;
  documentation: string[];
  stackable: boolean;
}

interface PerUnitService {
  id: string;
  category: string;
  name: string;
  rateType: "per-unit" | "hourly";
  rate: number;
  maxUnits: number;
  maxTotal: number;
  description: string;
  notes: string;
}

interface PreEtsFee {
  id: string;
  name: string;
  fee: number;
  duration: string;
  hoursPerWeek: string;
  description: string;
  maxUnits?: number;
}

/* ---- Structured Fee Services ---- */

const crpServices: CRPService[] = [
  // Trial Work Experience
  {
    id: "twe-1", category: "Trial Work Experience", name: "Trial Work Experience", level: "One Level",
    intakeFee: 886, activityFee: 0, outcomeFee: 2426, maximumTotalFee: 3312,
    description: "Time-limited work experience to assess vocational interests, strengths, abilities, and needs",
    requirements: ["SDOP authorization", "TWE plan with measurable goals", "Daily attendance logs", "Outcome assessment report", "SDOR within 30 days"],
    bonusesApply: false, twoFeeOnly: true,
  },

  // Community Based Assessment
  {
    id: "cba-1", category: "Community Based Assessment", name: "CBA - Standard", level: "Standard",
    intakeFee: 746, activityFee: 0, outcomeFee: 2059, maximumTotalFee: 2805,
    description: "Community-based situational assessment to determine vocational interests and support needs",
    requirements: ["SDOP authorization", "Assessment plan", "Employer site documentation", "Written assessment report", "SDOR within 30 days"],
    bonusesApply: true, twoFeeOnly: true,
  },
  {
    id: "cba-db", category: "Community Based Assessment", name: "CBA - Deafblind", level: "Deafblind",
    intakeFee: 1090, activityFee: 0, outcomeFee: 2986, maximumTotalFee: 4076,
    description: "Specialized CBA for individuals who are deafblind requiring additional accommodations and interpreter services",
    requirements: ["SDOP authorization", "DB accommodation plan", "Interpreter logs", "Written assessment report", "SDOR within 30 days"],
    bonusesApply: true, twoFeeOnly: true,
  },

  // Customized Employment - Discovery
  {
    id: "ce-disc", category: "Customized Employment", name: "Discovery Services", level: "One Level",
    intakeFee: 733, activityFee: 1019, outcomeFee: 2324, maximumTotalFee: 4076,
    description: "Person-centered discovery process to identify strengths, conditions for employment, and potential job matches",
    requirements: ["SDOP authorization", "Discovery profile document", "Informational interviews", "Community mapping", "Visual resume/portfolio", "SDOR within 30 days"],
    bonusesApply: false,
  },

  // Customized Employment - Job Placement
  {
    id: "ce-jp", category: "Customized Employment", name: "Customized Job Placement", level: "One Level",
    intakeFee: 834, activityFee: 1534, outcomeFee: 2478, maximumTotalFee: 4846,
    description: "Customized job development and placement using discovery profile to negotiate individualized position",
    requirements: ["Completed Discovery profile", "SDOP authorization", "Employer negotiation logs", "Job description (customized)", "Paystub or employer letter", "SDOR within 30 days"],
    bonusesApply: true,
  },

  // Job Placement Services
  {
    id: "jp-1", category: "Job Placement", name: "Job Placement", level: "Level 1",
    intakeFee: 665, activityFee: 618, outcomeFee: 1936, maximumTotalFee: 3219,
    description: "Standard competitive integrated employment placement services",
    requirements: ["SDOP authorization", "5 employer site visits OR 3 interviews", "Paystub or employer letter", "SDOR within 30 days"],
    bonusesApply: true,
  },
  {
    id: "jp-2", category: "Job Placement", name: "Job Placement", level: "Level 2",
    intakeFee: 746, activityFee: 997, outcomeFee: 2216, maximumTotalFee: 3959,
    description: "Enhanced placement for customers with additional barriers to employment",
    requirements: ["SDOP authorization", "5 employer site visits OR 3 interviews", "Barrier documentation", "Paystub or employer letter", "SDOR within 30 days"],
    bonusesApply: true,
  },
  {
    id: "jp-3", category: "Job Placement", name: "Job Placement", level: "Level 3",
    intakeFee: 746, activityFee: 1370, outcomeFee: 2216, maximumTotalFee: 4332,
    description: "Intensive placement services for customers with significant barriers requiring customized approaches",
    requirements: ["SDOP authorization", "5 employer site visits OR 3 interviews", "Customized plan documentation", "Paystub or employer letter", "SDOR within 30 days"],
    bonusesApply: true,
  },
  {
    id: "jp-4db", category: "Job Placement", name: "Job Placement", level: "Level 4-DB",
    intakeFee: 834, activityFee: 1534, outcomeFee: 2478, maximumTotalFee: 4846,
    description: "Deafblind specialist job placement services with interpreter and accommodation support",
    requirements: ["SDOP authorization", "DB accommodation plan", "Interpreter logs", "5 employer site visits OR 3 interviews", "Paystub or employer letter", "SDOR within 30 days"],
    bonusesApply: true,
  },
];

/* ---- Per-Unit Services ---- */

const perUnitServices: PerUnitService[] = [
  {
    id: "ii-1", category: "Informational Interview", name: "Informational Interview (General Caseload)",
    rateType: "per-unit", rate: 401, maxUnits: 3, maxTotal: 1203,
    description: "Career exploration conversations with professionals in fields of interest",
    notes: "$401 per interview, up to 3 interviews maximum",
  },
  {
    id: "js-1", category: "Job Shadow", name: "Job Shadow (General Caseload)",
    rateType: "hourly", rate: 134, maxUnits: 10, maxTotal: 1340,
    description: "Hands-on career observation at employer sites with guided reflection",
    notes: "$134/hr with 1-5 hours per job shadow, up to 10 hours maximum",
  },
];

/* ---- Pre-ETS Services ---- */

const preEtsServices: PreEtsFee[] = [
  { id: "wble-a", name: "WBLE-A (Work-Based Learning Experience A)", fee: 2123, duration: "4-6 weeks", hoursPerWeek: "11+ hrs/wk", description: "Introduction to paid work; builds relationship with student and employer" },
  { id: "wble-b", name: "WBLE-B (Work-Based Learning Experience B)", fee: 2496, duration: "7-9 weeks", hoursPerWeek: "11+ hrs/wk", description: "Deeper exploration; higher employer engagement and skill building" },
  { id: "wble-c", name: "WBLE-C (Work-Based Learning Experience C)", fee: 2869, duration: "10-12 weeks", hoursPerWeek: "11+ hrs/wk", description: "Near-placement level; strong transition pathway to Job Placement referral" },
  { id: "wrt-d", name: "WRT-D (Workplace Readiness Training - Standalone)", fee: 1177, duration: "15-20 hours", hoursPerWeek: "Flexible", description: "Soft skills and workplace readiness for students not yet ready for WBLE" },
  { id: "pre-ii", name: "Informational Interview (Pre-ETS)", fee: 401, duration: "30-60 min each", hoursPerWeek: "N/A", description: "Career exploration conversations for Pre-ETS eligible students", maxUnits: 3 },
  { id: "pre-js", name: "Job Shadow (Pre-ETS)", fee: 134, duration: "1-5 hrs each", hoursPerWeek: "Max 10 hrs total", description: "Hands-on career observation for Pre-ETS eligible students", maxUnits: 10 },
];

/* ---- Performance Bonuses ---- */

const bonuses: CRPBonus[] = [
  {
    id: "b-perm-cba", name: "Permanent Employment Bonus (CBA)", amount: 722,
    appliesTo: ["Community Based Assessment"],
    excludesFrom: ["Trial Work Experience"],
    condition: "DVR Customer obtains permanent, competitive, integrated job as secondary outcome of CBA",
    documentation: ["Paystub showing employment", "Employer letter confirming permanent status"],
    stackable: true,
  },
  {
    id: "b-hc-cba", name: "Healthcare Coverage Bonus (CBA)", amount: 722,
    appliesTo: ["Community Based Assessment"],
    excludesFrom: ["Trial Work Experience"],
    condition: "DVR Customer obtains permanent job of 30+ hrs/week with employer-provided healthcare benefits as secondary outcome of CBA",
    documentation: ["Paystub showing 30+ hrs/week", "Employer benefits enrollment or letter"],
    stackable: true,
  },
  {
    id: "b-hc-jp", name: "Healthcare Coverage Bonus", amount: 722,
    appliesTo: ["Job Placement", "Customized Employment"],
    excludesFrom: [],
    condition: "DVR Customer obtains permanent, competitive, integrated job of 30+ hrs/week with employer-provided healthcare benefits. Payment does not have to wait until healthcare benefits go into effect.",
    documentation: ["Paystub showing 30+ hrs/week", "Employer benefits letter or enrollment confirmation"],
    stackable: true,
  },
  {
    id: "b-hw", name: "High Wage Bonus", amount: 722,
    appliesTo: ["Job Placement", "Customized Employment"],
    excludesFrom: [],
    condition: "Job wage meets high wage threshold: Supported employment 25% above state minimum wage; Non-supported 50% above state minimum wage",
    documentation: ["Paystub within last 2 weeks (or employer letter at day 90)"],
    stackable: true,
  },
  {
    id: "b-rapid", name: "Rapid Placement Bonus", amount: 535,
    appliesTo: ["Job Placement", "Customized Employment"],
    excludesFrom: [],
    condition: "Customer secures competitive integrated employment within 60 calendar days of SDOP authorization date",
    documentation: ["SDOP authorization date", "First day of employment documentation"],
    stackable: true,
  },
  {
    id: "b-rural-res", name: "Rural Area Bonus (Customer Residence)", amount: 375,
    appliesTo: ["Job Placement", "Customized Employment"],
    excludesFrom: [],
    condition: "Customer resides in HRSA-defined rural area",
    documentation: ["HRSA Rural Health Grants Eligibility Analyzer printout", "Customer address verification"],
    stackable: true,
  },
  {
    id: "b-rural-job", name: "Rural Area Bonus (Job Location)", amount: 375,
    appliesTo: ["Job Placement", "Customized Employment"],
    excludesFrom: [],
    condition: "Job is located in HRSA-defined rural area",
    documentation: ["HRSA Rural Health Grants Eligibility Analyzer printout", "Employer address verification"],
    stackable: true,
  },
];

/* ---- Exhibit L Metadata ---- */

const exhibitL = {
  title: "Exhibit L - CRP-IL Fee Schedule",
  program: "Community Rehabilitation Program - Individualized Level",
  effectiveDate: "07/01/2025",
  revisedDate: "07/01/2025",
  maxBonusPerCustomer: 722 + 722 + 535 + 375 + 375, // $2,729
};

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

function fmt(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);
}

function categoryIcon(cat: string) {
  if (cat.includes("Trial")) return "bg-amber-900/30 text-amber-400 border-amber-700/40";
  if (cat.includes("Community Based")) return "bg-teal-900/30 text-teal-400 border-teal-700/40";
  if (cat.includes("Customized")) return "bg-purple-900/30 text-purple-400 border-purple-700/40";
  if (cat.includes("Job Placement")) return "bg-indigo-900/30 text-indigo-400 border-indigo-700/40";
  return "bg-slate-800 text-slate-400 border-slate-700";
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function FeeSchedulesPage() {
  const [activeTab, setActiveTab] = useState<"services" | "per-unit" | "pre-ets" | "bonuses" | "rules">("services");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "fee">("name");

  const categories = useMemo(() => {
    const cats = [...new Set(crpServices.map((s) => s.category))];
    return ["All", ...cats];
  }, []);

  const filteredServices = useMemo(() => {
    let result = crpServices;
    if (categoryFilter !== "All") result = result.filter((s) => s.category === categoryFilter);
    if (search) result = result.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "fee") result = [...result].sort((a, b) => b.maximumTotalFee - a.maximumTotalFee);
    else result = [...result].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    return result;
  }, [categoryFilter, search, sortBy]);

  const filteredPreEts = useMemo(() => {
    if (!search) return preEtsServices;
    return preEtsServices.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const filteredBonuses = useMemo(() => {
    if (!search) return bonuses;
    return bonuses.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.condition.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const totalMaxRevenue = crpServices.reduce((sum, s) => sum + s.maximumTotalFee, 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/mvp/admin" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-xl">
            <DollarSign className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{exhibitL.title}</h1>
            <p className="text-slate-400 text-sm mt-0.5">{exhibitL.program}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition border border-slate-700">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 uppercase tracking-wide">Effective</span>
          </div>
          <p className="text-lg font-bold text-white">{exhibitL.effectiveDate}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 uppercase tracking-wide">Revised</span>
          </div>
          <p className="text-lg font-bold text-white">{exhibitL.revisedDate}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 uppercase tracking-wide">Services</span>
          </div>
          <p className="text-lg font-bold text-white">{crpServices.length + perUnitServices.length + preEtsServices.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 uppercase tracking-wide">Max Bonus/Customer</span>
          </div>
          <p className="text-lg font-bold text-green-400">{fmt(exhibitL.maxBonusPerCustomer)}</p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search services, bonuses, descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        {activeTab === "services" && (
          <div className="flex items-center gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={() => setSortBy(sortBy === "name" ? "fee" : "name")}
              className="flex items-center gap-2 px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortBy === "name" ? "By Name" : "By Fee"}
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-slate-900 rounded-lg p-1 border border-slate-700">
        {[
          { key: "services", label: "CRP Services", count: crpServices.length },
          { key: "per-unit", label: "Per-Unit Services", count: perUnitServices.length },
          { key: "pre-ets", label: "Pre-ETS Services", count: preEtsServices.length },
          { key: "bonuses", label: "Performance Bonuses", count: bonuses.length },
          { key: "rules", label: "Billing Rules", count: null },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as typeof activeTab)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${
              activeTab === t.key ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            {t.label} {t.count !== null && <span className="ml-1 text-xs opacity-60">({t.count})</span>}
          </button>
        ))}
      </div>

      {/* =================== CRP Services Tab =================== */}
      {activeTab === "services" && (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Service / Level</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Intake Fee</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Activity Fee</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Outcome Fee</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Max Total</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Bonuses</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((svc) => (
                  <>
                    <tr
                      key={svc.id}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition cursor-pointer"
                      onClick={() => setExpandedId(expandedId === svc.id ? null : svc.id)}
                    >
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${categoryIcon(svc.category)}`}>
                          {svc.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className="text-white font-medium">{svc.name}</span>
                          {svc.level && <span className="text-slate-400 ml-2 text-xs">({svc.level})</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-white">{fmt(svc.intakeFee)}</td>
                      <td className="py-3 px-4 text-right font-mono text-white">
                        {svc.activityFee > 0 ? fmt(svc.activityFee) : <span className="text-slate-600">-</span>}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-white">{fmt(svc.outcomeFee)}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-indigo-400">{fmt(svc.maximumTotalFee)}</td>
                      <td className="py-3 px-4 text-center">
                        {svc.bonusesApply ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="p-1 hover:bg-slate-700 rounded transition">
                          {expandedId === svc.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                      </td>
                    </tr>
                    {expandedId === svc.id && (
                      <tr key={`${svc.id}-detail`} className="bg-slate-800/30">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                            <div>
                              <h4 className="text-sm font-semibold text-slate-200 mb-2">Description</h4>
                              <p className="text-sm text-slate-400 leading-relaxed">{svc.description}</p>
                              {svc.twoFeeOnly && (
                                <div className="mt-3 p-2 bg-amber-900/20 border border-amber-700/40 rounded text-xs text-amber-300">
                                  Two-fee structure (Intake + Outcome only). No Activity Fee.
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-slate-200 mb-2">Requirements</h4>
                              <ul className="space-y-1">
                                {svc.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                                    <CheckCircle2 className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-600 bg-slate-800/60">
                  <td colSpan={5} className="py-3 px-4 text-sm font-semibold text-slate-300">
                    Total ({filteredServices.length} services)
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-indigo-400 text-base">
                    {fmt(filteredServices.reduce((s, svc) => s + svc.maximumTotalFee, 0))}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* =================== Per-Unit Services Tab =================== */}
      {activeTab === "per-unit" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/60">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Service</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Rate Type</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Rate</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Max Units</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Max Total</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {perUnitServices.map((svc) => (
                    <tr key={svc.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4">
                        <div className="text-white font-medium">{svc.name}</div>
                        <div className="text-xs text-slate-400 mt-1">{svc.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-900/30 text-blue-400 border border-blue-700/40">
                          {svc.rateType === "hourly" ? "Hourly" : "Per Unit"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-white">
                        {fmt(svc.rate)}{svc.rateType === "hourly" ? "/hr" : "/each"}
                      </td>
                      <td className="py-3 px-4 text-right text-white">{svc.maxUnits} {svc.rateType === "hourly" ? "hours" : "units"}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-indigo-400">{fmt(svc.maxTotal)}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs max-w-xs">{svc.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================== Pre-ETS Tab =================== */}
      {activeTab === "pre-ets" && (
        <div className="space-y-6">
          <div className="p-4 bg-blue-900/20 border border-blue-700/40 rounded-lg flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-200 text-sm">Pre-Employment Transition Services</h4>
              <p className="text-sm text-blue-300/70 mt-1">For students aged 14-21 with IEP or 504 plans. Services build progressively from WRT-D through WBLE-A/B/C toward job placement readiness.</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/60">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Service</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Fee</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Duration</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Hours/Week</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPreEts.map((svc) => (
                    <tr key={svc.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 text-white font-medium">{svc.name}</td>
                      <td className="py-3 px-4 text-right font-mono text-indigo-400 font-bold">
                        {fmt(svc.fee)}{svc.maxUnits ? <span className="text-slate-500 font-normal text-xs"> x{svc.maxUnits}</span> : ""}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-300">{svc.duration}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{svc.hoursPerWeek}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs max-w-sm">{svc.description}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-600 bg-slate-800/60">
                    <td className="py-3 px-4 text-sm font-semibold text-slate-300">
                      Full WBLE Progression (WRT-D + A + B + C)
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-indigo-400 text-base">
                      {fmt(1177 + 2123 + 2496 + 2869)}
                    </td>
                    <td colSpan={3} className="py-3 px-4 text-xs text-slate-500">
                      Complete Pre-ETS pathway revenue per student
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================== Bonuses Tab =================== */}
      {activeTab === "bonuses" && (
        <div className="space-y-6">
          <div className="p-4 bg-green-900/20 border border-green-700/40 rounded-lg flex items-start gap-3">
            <Star className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-200 text-sm">All bonuses that apply may be invoiced with appropriate documentation</h4>
              <p className="text-sm text-green-300/70 mt-1">Multiple bonuses can stack on the same customer. Maximum bonus potential per customer: {fmt(exhibitL.maxBonusPerCustomer)}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/60">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Bonus</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Applies To</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Excludes</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBonuses.map((bonus) => (
                    <>
                      <tr
                        key={bonus.id}
                        className="border-b border-slate-800 hover:bg-slate-800/50 transition cursor-pointer"
                        onClick={() => setExpandedId(expandedId === bonus.id ? null : bonus.id)}
                      >
                        <td className="py-3 px-4 text-white font-medium">{bonus.name}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-green-400">{fmt(bonus.amount)}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {bonus.appliesTo.map((a) => (
                              <span key={a} className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400 border border-green-700/40">{a}</span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {bonus.excludesFrom.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {bonus.excludesFrom.map((e) => (
                                <span key={e} className="px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-700/40">{e}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-600 text-xs">None</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="p-1 hover:bg-slate-700 rounded transition">
                            {expandedId === bonus.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </button>
                        </td>
                      </tr>
                      {expandedId === bonus.id && (
                        <tr key={`${bonus.id}-detail`} className="bg-slate-800/30">
                          <td colSpan={5} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                              <div>
                                <h4 className="text-sm font-semibold text-slate-200 mb-2">Eligibility Condition</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">{bonus.condition}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-slate-200 mb-2">Required Documentation</h4>
                                <ul className="space-y-1">
                                  {bonus.documentation.map((doc, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                                      <FileText className="w-3 h-3 text-indigo-400 mt-1 flex-shrink-0" />
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-600 bg-slate-800/60">
                    <td className="py-3 px-4 text-sm font-semibold text-slate-300">
                      Maximum Bonus Potential (per customer)
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-green-400 text-base">
                      {fmt(exhibitL.maxBonusPerCustomer)}
                    </td>
                    <td colSpan={3} className="py-3 px-4 text-xs text-slate-500">
                      Healthcare + High Wage + Rapid Placement + Rural Residence + Rural Job
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================== Billing Rules Tab =================== */}
      {activeTab === "rules" && (
        <div className="space-y-6">
          {/* Invoice Validation Rules */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Invoice Validation Rules
            </h3>
            <div className="space-y-3">
              {[
                { rule: "SDOR must be attached to every invoice", enforced: true, section: "General" },
                { rule: "Intake fee invoiced only after SDOP authorization date", enforced: true, section: "Intake" },
                { rule: "Activity fee requires documented site visits OR interviews", enforced: true, section: "Activity" },
                { rule: "Outcome fee requires paystub or employer letter", enforced: true, section: "Outcome" },
                { rule: "Bonuses require all specified documentation attached", enforced: true, section: "Bonuses" },
                { rule: "Healthcare bonus requires proof of 30+ hrs/week AND employer healthcare", enforced: true, section: "Bonuses" },
                { rule: "Rapid placement bonus: employment must start within 60 days of auth", enforced: true, section: "Bonuses" },
                { rule: "Rural bonus requires HRSA Rural Health Tool printout", enforced: true, section: "Bonuses" },
                { rule: "High wage bonus: paystub within 2 weeks (or employer letter at day 90)", enforced: true, section: "Bonuses" },
                { rule: "Invoice must not exceed maximum total fee per service", enforced: true, section: "Limits" },
                { rule: "TWE services do NOT qualify for Permanent Employment or Healthcare bonuses", enforced: true, section: "Exclusions" },
                { rule: "SDOR submission required within 30 days of service completion", enforced: true, section: "Timing" },
                { rule: "Duplicate invoice detection per customer per service fee type", enforced: true, section: "Validation" },
                { rule: "Informational interviews limited to 3 per customer ($1,203 max)", enforced: true, section: "Limits" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.enforced ? "text-green-400" : "text-amber-400"}`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">{item.rule}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-700 text-slate-400 whitespace-nowrap">
                    {item.section}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Partial Payment Scenarios */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" /> Partial Payment Scenarios (Contract Section 7)
            </h3>
            <div className="space-y-3">
              {[
                { scenario: "Customer quits within first 30 days of employment", payment: "Intake + Activity fees only; Outcome fee forfeited", color: "amber" },
                { scenario: "Customer terminated by employer for cause", payment: "Intake + Activity fees; Outcome fee paid only if re-placed within 30 days", color: "amber" },
                { scenario: "Service authorization expires before placement", payment: "Intake fee only; must request new authorization", color: "red" },
                { scenario: "Customer achieves 90-day retention milestone", payment: "Full fee schedule applies including all earned bonuses", color: "green" },
                { scenario: "Customer moves out of state before job start", payment: "Intake fee only; case closed with documentation", color: "amber" },
                { scenario: "Employer closes/relocates within 90-day retention period", payment: "Full Activity + pro-rated Outcome; re-placement efforts documented", color: "amber" },
                { scenario: "Customer voluntarily reduces hours below 30/week", payment: "Healthcare bonus ineligible; other fees unaffected", color: "amber" },
                { scenario: "Rural customer takes urban job (or vice versa)", payment: "Only applicable rural bonus paid; other rural bonus forfeited", color: "blue" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.color === "green" ? "bg-green-400" : item.color === "red" ? "bg-red-400" : item.color === "blue" ? "bg-blue-400" : "bg-amber-400"
                    }`} />
                    <div>
                      <h4 className="font-semibold text-slate-100 text-sm">{item.scenario}</h4>
                      <p className="text-sm text-slate-400 mt-1">{item.payment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Structure Notes */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" /> Fee Structure Notes
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p><strong className="text-white">Two-Fee Services:</strong> Trial Work Experience and Community Based Assessment use a two-fee structure (Intake + Outcome). No Activity Fee applies.</p>
              <p><strong className="text-white">Three-Fee Services:</strong> Job Placement, Customized Employment, and Discovery Services use a three-fee structure (Intake + Activity + Outcome).</p>
              <p><strong className="text-white">Bonus Stacking:</strong> All applicable bonuses may be invoiced for the same customer. For example, a rural customer placed in a rural healthcare job earning a high wage could receive: Healthcare ($722) + High Wage ($722) + Rapid Placement ($535) + Rural Residence ($375) + Rural Job ($375) = {fmt(2729)} in bonuses.</p>
              <p><strong className="text-white">CBA Bonuses:</strong> Permanent Employment and Healthcare Coverage bonuses apply to CBA services but NOT to Trial Work Experience.</p>
              <p><strong className="text-white">Level 4-DB:</strong> DeafBlind specialist services include higher fee rates to accommodate interpreter services and specialized accommodation needs.</p>
              <p><strong className="text-white">SDOR Requirement:</strong> All invoices must include a signed Service Delivery Outcome Report (SDOR) as documentation of service completion.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
