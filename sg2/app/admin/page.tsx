"use client";

import Link from "next/link";
import { LayoutDashboard, DollarSign, Users, BarChart3, Settings, FileText } from "lucide-react";

const adminSections = [
  {
    id: "fee-schedules",
    title: "Fee Schedules",
    description: "Manage service fees, bonuses, and payment schedules",
    icon: DollarSign,
    href: "/admin/fee-schedules",
    color: "indigo",
  },
  {
    id: "customers",
    title: "Customer Management",
    description: "View and manage DVR customers and their service records",
    icon: Users,
    href: "/admin/customers",
    color: "blue",
    comingSoon: true,
  },
  {
    id: "reporting",
    title: "Reporting & Analytics",
    description: "Generate reports, track KPIs, and analyze program performance",
    icon: BarChart3,
    href: "/admin/reporting",
    color: "green",
    comingSoon: true,
  },
  {
    id: "settings",
    title: "System Settings",
    description: "Configure system parameters, user roles, and integrations",
    icon: Settings,
    href: "/admin/settings",
    color: "purple",
    comingSoon: true,
  },
];

const colorClasses = {
  indigo: "bg-indigo-600 hover:bg-indigo-700",
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  purple: "bg-purple-600 hover:bg-purple-700",
};

const colorBgClasses = {
  indigo: "bg-indigo-900/20 border-indigo-700/30",
  blue: "bg-blue-900/20 border-blue-700/30",
  green: "bg-green-900/20 border-green-700/30",
  purple: "bg-purple-900/20 border-purple-700/30",
};

const colorIconClasses = {
  indigo: "text-indigo-400",
  blue: "text-blue-400",
  green: "text-green-400",
  purple: "text-purple-400",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">
                Manage fee schedules, customers, and program settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Customers</p>
                <p className="text-3xl font-bold text-white mt-2">247</p>
              </div>
              <Users className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">$847K</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400 opacity-50" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Placement Rate</p>
                <p className="text-3xl font-bold text-white mt-2">78%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Pending Invoices</p>
                <p className="text-3xl font-bold text-white mt-2">$156K</p>
              </div>
              <FileText className="w-8 h-8 text-orange-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            const colorClass = colorClasses[section.color as keyof typeof colorClasses];
            const bgClass = colorBgClasses[section.color as keyof typeof colorBgClasses];
            const iconClass = colorIconClasses[section.color as keyof typeof colorIconClasses];

            return (
              <div
                key={section.id}
                className={`border border-slate-700 rounded-lg p-6 bg-slate-900 hover:bg-slate-800 transition-all ${
                  section.comingSoon ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg border ${bgClass}`}
                  >
                    <Icon className={`w-6 h-6 ${iconClass}`} />
                  </div>
                  {section.comingSoon && (
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  {section.description}
                </p>

                {section.comingSoon ? (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-slate-700 text-slate-400 rounded-lg font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Link
                    href={section.href}
                    className={`block w-full px-4 py-2 ${colorClass} text-white rounded-lg font-medium text-center transition-colors`}
                  >
                    Access →
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: "Fee schedule updated",
                details: "CRP-IL schedule revised to 07/01/2025",
                time: "2 hours ago",
              },
              {
                action: "Customer invoice submitted",
                details: "Invoice INV-2026-4847 for James Thompson",
                time: "4 hours ago",
              },
              {
                action: "Bonus payment processed",
                details: "Healthcare + High Wage bonus for Tyler Nguyen",
                time: "1 day ago",
              },
              {
                action: "Report generated",
                details: "Monthly performance report for April 2026",
                time: "2 days ago",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-4 bg-slate-800 rounded-lg border border-slate-700"
              >
                <div>
                  <p className="font-medium text-white">{item.action}</p>
                  <p className="text-sm text-slate-400 mt-1">{item.details}</p>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
