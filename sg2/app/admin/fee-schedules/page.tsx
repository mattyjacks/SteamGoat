"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface FeeService {
  name: string;
  intakeFee?: number;
  activityFee?: number;
  outcomeFee?: number;
  maximumTotalFee?: number;
  bonusAmount?: number;
  description?: string;
  notes?: string;
}

interface FeeSchedule {
  id: string;
  title: string;
  program: string;
  effectiveDate: string;
  revisedDate: string;
  services: FeeService[];
}

const crpIlSchedule: FeeSchedule = {
  id: "crp-il-2025",
  title: "CRP-IL Fee Schedule",
  program: "Community Rehabilitation Program - Illinois",
  effectiveDate: "07/01/2025",
  revisedDate: "07/01/2025",
  services: [
    {
      name: "Trial Work Experience (One Level)",
      intakeFee: 886,
      activityFee: 0,
      outcomeFee: 2426,
      maximumTotalFee: 3312,
      description: "Trial work experience service",
    },
    {
      name: "Community Based Assessment (CBA)",
      intakeFee: 746,
      activityFee: 0,
      outcomeFee: 2059,
      maximumTotalFee: 2805,
      description: "Standard community-based assessment",
    },
    {
      name: "CBA - Deafblind",
      intakeFee: 1090,
      activityFee: 0,
      outcomeFee: 2986,
      maximumTotalFee: 4076,
      description: "Community-based assessment for deafblind individuals",
    },
    {
      name: "Informational Interview (General Caseload)",
      bonusAmount: 401,
      description: "$401 per interview up to 3 interviews (max $1,203)",
      notes: "Up to 3 interviews maximum",
    },
    {
      name: "Job Shadow (General Caseload)",
      bonusAmount: 134,
      description: "$134/hr with 1-5 hours per job shadow, up to 10 hours max",
      notes: "Maximum $1,340 total",
    },
    {
      name: "Discovery Services (One Level)",
      intakeFee: 733,
      activityFee: 1019,
      outcomeFee: 2324,
      maximumTotalFee: 4076,
      description: "Customized employment discovery services",
    },
    {
      name: "Customized Job Placement (One Level)",
      intakeFee: 834,
      activityFee: 1534,
      outcomeFee: 2478,
      maximumTotalFee: 4846,
      description: "Customized job placement services",
    },
    {
      name: "Job Placement Level 1",
      intakeFee: 665,
      activityFee: 618,
      outcomeFee: 1936,
      maximumTotalFee: 3219,
      description: "Standard job placement services - Level 1",
    },
    {
      name: "Job Placement Level 2",
      intakeFee: 746,
      activityFee: 997,
      outcomeFee: 2216,
      maximumTotalFee: 3959,
      description: "Job placement services - Level 2",
    },
    {
      name: "Job Placement Level 3",
      intakeFee: 746,
      activityFee: 1370,
      outcomeFee: 2216,
      maximumTotalFee: 4332,
      description: "Job placement services - Level 3",
    },
    {
      name: "Job Placement Level 4-DB",
      intakeFee: 834,
      activityFee: 1534,
      outcomeFee: 2478,
      maximumTotalFee: 4846,
      description: "Job placement services - Level 4 Deafblind",
    },
  ],
};

const bonusSchedule: FeeService[] = [
  {
    name: "Permanent Employment Bonus (CBA)",
    bonusAmount: 722,
    description: "Paid when DVR customer obtains permanent, competitive, integrated job as secondary outcome of CBA",
    notes: "Does not apply to Trial Work Experience",
  },
  {
    name: "Healthcare Coverage Bonus (CBA)",
    bonusAmount: 722,
    description: "Paid when customer obtains permanent job 30+ hrs/week with employer-provided healthcare benefits",
    notes: "Does not apply to TWE. Payment does not wait for benefits to go into effect",
  },
  {
    name: "Permanent Employment Bonus (Job Placement)",
    bonusAmount: 722,
    description: "Paid when customer obtains permanent, competitive, integrated job",
  },
  {
    name: "Healthcare Coverage Bonus (Job Placement)",
    bonusAmount: 722,
    description: "Paid when customer obtains permanent job 30+ hrs/week with employer-provided healthcare",
  },
  {
    name: "High Wage Bonus",
    bonusAmount: 722,
    description: "Paid for jobs meeting high wage threshold",
  },
  {
    name: "Rapid Placement Bonus",
    bonusAmount: 535,
    description: "Paid for placements completed within rapid timeframe",
  },
  {
    name: "Rural Area Bonus (Customer Residence)",
    bonusAmount: 375,
    description: "Paid when customer resides in rural area",
  },
  {
    name: "Rural Area Bonus (Job Location)",
    bonusAmount: 375,
    description: "Paid when job is located in rural area",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function ServiceCard({ service }: { service: FeeService }) {
  const [expanded, setExpanded] = useState(false);

  const hasStructuredFees = service.intakeFee !== undefined;

  return (
    <div className="border border-slate-700 rounded-lg p-4 bg-slate-900 hover:bg-slate-800 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between gap-4"
      >
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-slate-100">{service.name}</h3>
          {service.description && (
            <p className="text-sm text-slate-400 mt-1">{service.description}</p>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0 mt-1" />
        )}
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
          {hasStructuredFees ? (
            <>
              {service.intakeFee !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Intake Fee:</span>
                  <span className="font-mono text-slate-100">
                    {formatCurrency(service.intakeFee)}
                  </span>
                </div>
              )}
              {service.activityFee !== undefined && service.activityFee > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Activity Fee:</span>
                  <span className="font-mono text-slate-100">
                    {formatCurrency(service.activityFee)}
                  </span>
                </div>
              )}
              {service.outcomeFee !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Outcome Fee:</span>
                  <span className="font-mono text-slate-100">
                    {formatCurrency(service.outcomeFee)}
                  </span>
                </div>
              )}
              {service.maximumTotalFee !== undefined && (
                <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-700">
                  <span className="text-slate-300 font-semibold">
                    Maximum Total Fee:
                  </span>
                  <span className="font-mono text-indigo-400 font-semibold">
                    {formatCurrency(service.maximumTotalFee)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              {service.bonusAmount !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Bonus Amount:</span>
                  <span className="font-mono text-green-400 font-semibold">
                    {formatCurrency(service.bonusAmount)}
                  </span>
                </div>
              )}
            </>
          )}
          {service.notes && (
            <div className="mt-3 p-2 bg-slate-800 rounded border border-slate-700">
              <p className="text-xs text-slate-300">{service.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FeeSchedulesPage() {
  const [activeTab, setActiveTab] = useState<"services" | "bonuses">("services");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Fee Schedules</h1>
                <p className="text-slate-400 text-sm mt-1">
                  Admin Dashboard - Service & Bonus Fee Configuration
                </p>
              </div>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg text-sm font-medium transition-colors"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Schedule Info Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-400" />
                {crpIlSchedule.title}
              </h2>
              <p className="text-slate-400 mt-2">{crpIlSchedule.program}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Effective Date
                </p>
                <p className="text-lg font-semibold text-white">
                  {crpIlSchedule.effectiveDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Revised Date
                </p>
                <p className="text-lg font-semibold text-white">
                  {crpIlSchedule.revisedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200">
              All bonuses that apply may be invoiced with appropriate documentation. Multiple bonuses can apply to the same customer.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "services"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Service Fees ({crpIlSchedule.services.length})
          </button>
          <button
            onClick={() => setActiveTab("bonuses")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "bonuses"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Performance Bonuses ({bonusSchedule.length})
          </button>
        </div>

        {/* Service Fees Tab */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {crpIlSchedule.services.map((service, idx) => (
                <ServiceCard key={idx} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Bonuses Tab */}
        {activeTab === "bonuses" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {bonusSchedule.map((bonus, idx) => (
                <ServiceCard key={idx} service={bonus} />
              ))}
            </div>

            {/* Bonus Rules */}
            <div className="mt-8 bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Bonus Rules & Conditions</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-slate-100 mb-2">
                    Healthcare Coverage Bonus
                  </h4>
                  <p className="text-sm text-slate-300">
                    A bonus of $722 shall be paid if the DVR Customer obtains a permanent, competitive, and integrated job of 30 hours or more per week and includes Employer-provided Healthcare Benefits. Payment of Healthcare Coverage bonus does not have to wait until healthcare benefits go into effect.
                  </p>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-slate-100 mb-2">
                    Permanent Employment Bonus
                  </h4>
                  <p className="text-sm text-slate-300">
                    A bonus of $722 shall be paid if the DVR Customer obtains a permanent, competitive, and integrated job as a secondary outcome of their Community Based Assessment (CBA) or Job Placement service.
                  </p>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-slate-100 mb-2">
                    Rural Area Bonuses
                  </h4>
                  <p className="text-sm text-slate-300">
                    A bonus of $375 applies when the customer resides in a rural area AND/OR when the job location is in a rural area. Both bonuses may apply to the same customer.
                  </p>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-slate-100 mb-2">
                    TWE Exclusions
                  </h4>
                  <p className="text-sm text-slate-300">
                    Permanent Employment and Healthcare Coverage bonuses do NOT apply to Trial Work Experience (TWE) services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
