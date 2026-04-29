"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  Home,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Target,
  TrendingUp,
  AlertCircle,
  Sparkles,
  RotateCcw,
  FileText,
  Accessibility,
  Heart,
  Users,
  Shield,
  Brain,
  HandHelping,
  Clock,
  MapPin,
  DollarSign,
  MessageCircle,
  Lightbulb,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Transition Readiness Data                                          */
/* ------------------------------------------------------------------ */

interface ChecklistItem {
  id: string;
  text: string;
  helpText: string;
  resources?: string[];
}

interface Subdomain {
  id: string;
  title: string;
  icon: typeof Briefcase;
  items: ChecklistItem[];
}

interface Domain {
  id: string;
  title: string;
  description: string;
  icon: typeof Briefcase;
  color: string;
  subdomains: Subdomain[];
}

const domains: Domain[] = [
  {
    id: "employment",
    title: "Employment & Career",
    description: "Skills and readiness for finding, obtaining, and maintaining employment",
    icon: Briefcase,
    color: "blue",
    subdomains: [
      {
        id: "career-awareness",
        title: "Career Awareness",
        icon: Target,
        items: [
          { id: "e1", text: "I can identify at least 3 careers that interest me", helpText: "Use our Career Explorer to browse careers that match your interests and skills.", resources: ["Career Explorer", "Interest Profiler Assessment"] },
          { id: "e2", text: "I understand the education/training needed for my top career choices", helpText: "Each career has specific education requirements. Check the Career Explorer for details." },
          { id: "e3", text: "I know the salary range for careers that interest me", helpText: "Understanding earning potential helps you plan for your financial future." },
          { id: "e4", text: "I have explored job shadow videos or informational interviews", helpText: "Seeing what a job is actually like day-to-day helps you make informed decisions." },
          { id: "e5", text: "I understand how my disability may affect my career choices and what accommodations are available", helpText: "Many careers offer excellent accommodations. Knowing your rights under ADA is empowering." },
        ],
      },
      {
        id: "job-skills",
        title: "Job-Seeking Skills",
        icon: FileText,
        items: [
          { id: "e6", text: "I can write a basic resume", helpText: "A resume summarizes your education, skills, and experience for employers.", resources: ["Resume Builder Module"] },
          { id: "e7", text: "I can fill out a job application completely and accurately", helpText: "Practice filling out applications with your personal information ready." },
          { id: "e8", text: "I can prepare for and participate in a job interview", helpText: "Practice common interview questions and appropriate body language.", resources: ["Interview Prep Module"] },
          { id: "e9", text: "I know how to search for jobs online and in my community", helpText: "Job boards, company websites, and networking are all important search strategies." },
          { id: "e10", text: "I can identify my strengths and describe them to an employer", helpText: "Self-advocacy starts with knowing what you bring to the table." },
        ],
      },
      {
        id: "workplace-skills",
        title: "Workplace Readiness",
        icon: Users,
        items: [
          { id: "e11", text: "I understand the importance of being on time and regular attendance", helpText: "Reliability is one of the most valued traits employers look for." },
          { id: "e12", text: "I can follow workplace rules and dress codes", helpText: "Every workplace has expectations. Understanding them helps you succeed." },
          { id: "e13", text: "I can communicate respectfully with coworkers and supervisors", helpText: "Good communication prevents misunderstandings and builds relationships." },
          { id: "e14", text: "I can accept feedback and make improvements", helpText: "Constructive feedback is a gift that helps you grow professionally." },
          { id: "e15", text: "I know how to request workplace accommodations", helpText: "Under the ADA, you have the right to reasonable accommodations. Know how to ask." },
        ],
      },
    ],
  },
  {
    id: "education",
    title: "Education & Training",
    description: "Preparation for postsecondary education, training programs, and lifelong learning",
    icon: GraduationCap,
    color: "purple",
    subdomains: [
      {
        id: "academic-readiness",
        title: "Academic Readiness",
        icon: Brain,
        items: [
          { id: "d1", text: "I am making progress toward my high school diploma or equivalent", helpText: "A diploma or GED opens doors to most career paths and training programs." },
          { id: "d2", text: "I can identify my learning style and use strategies that work for me", helpText: "Knowing whether you learn best visually, by listening, or by doing helps you study effectively." },
          { id: "d3", text: "I can manage my time to complete assignments and meet deadlines", helpText: "Time management is critical for academic and career success." },
          { id: "d4", text: "I know how to ask for help from teachers, tutors, or support services", helpText: "Seeking help is a strength, not a weakness. Know your resources." },
          { id: "d5", text: "I understand my IEP/504 plan and can advocate for my accommodations", helpText: "You are the expert on what you need. Practice speaking up in IEP meetings.", resources: ["Self-Advocacy Module"] },
        ],
      },
      {
        id: "postsecondary-planning",
        title: "Postsecondary Planning",
        icon: MapPin,
        items: [
          { id: "d6", text: "I have researched postsecondary options (college, trade school, apprenticeship)", helpText: "There are many paths after high school. Explore what fits your goals." },
          { id: "d7", text: "I understand how to apply for financial aid (FAFSA, scholarships)", helpText: "Many students qualify for grants and scholarships. Don't leave money on the table." },
          { id: "d8", text: "I know what disability services are available at postsecondary institutions", helpText: "Colleges have disability services offices. Connect with them early." },
          { id: "d9", text: "I have identified vocational rehabilitation (VR) services available to me", helpText: "Your state VR agency can provide training, education support, and job placement assistance." },
          { id: "d10", text: "I have a plan for transportation to my postsecondary program", helpText: "Getting there is half the battle. Plan your route and backup options." },
        ],
      },
      {
        id: "self-determination",
        title: "Self-Determination",
        icon: Lightbulb,
        items: [
          { id: "d11", text: "I can set goals and create steps to achieve them", helpText: "Goal-setting is a skill that improves with practice. Start with SMART goals." },
          { id: "d12", text: "I can make decisions by weighing pros and cons", helpText: "Good decision-making involves gathering information and considering consequences." },
          { id: "d13", text: "I can speak up for myself when I need something", helpText: "Self-advocacy means communicating your needs clearly and respectfully." },
          { id: "d14", text: "I understand my rights under IDEA, ADA, and Section 504", helpText: "Knowing your legal rights empowers you to access services and accommodations." },
          { id: "d15", text: "I am involved in my own transition planning meetings", helpText: "Your voice is the most important one in your transition planning." },
        ],
      },
    ],
  },
  {
    id: "independent-living",
    title: "Independent Living",
    description: "Skills for living as independently as possible in your community",
    icon: Home,
    color: "emerald",
    subdomains: [
      {
        id: "daily-living",
        title: "Daily Living Skills",
        icon: Home,
        items: [
          { id: "l1", text: "I can prepare simple meals and understand basic nutrition", helpText: "Cooking basic meals saves money and supports your health." },
          { id: "l2", text: "I can maintain personal hygiene independently", helpText: "Personal care routines are important for health and social interactions." },
          { id: "l3", text: "I can do basic household tasks (laundry, cleaning, dishes)", helpText: "Keeping your living space clean and organized is a key life skill." },
          { id: "l4", text: "I can manage my medications or healthcare needs", helpText: "Understanding your health needs and managing medications is critical for independence." },
          { id: "l5", text: "I know how to handle emergency situations (call 911, basic first aid)", helpText: "Being prepared for emergencies gives you confidence and keeps you safe." },
        ],
      },
      {
        id: "financial",
        title: "Financial Skills",
        icon: DollarSign,
        items: [
          { id: "l6", text: "I understand how to create and follow a basic budget", helpText: "Budgeting helps you live within your means and save for goals.", resources: ["Lifestyle Calculator Assessment"] },
          { id: "l7", text: "I have or know how to open a bank account", helpText: "A bank account is essential for managing money, receiving paychecks, and paying bills." },
          { id: "l8", text: "I understand the basics of credit, debit, and avoiding debt", helpText: "Understanding credit helps you build financial stability." },
          { id: "l9", text: "I know about government benefits I may be eligible for (SSI, SSDI, Medicaid)", helpText: "Many people with disabilities qualify for benefits that support independence." },
          { id: "l10", text: "I can identify and avoid financial scams", helpText: "Scam awareness protects your money and personal information." },
        ],
      },
      {
        id: "community",
        title: "Community & Social",
        icon: Heart,
        items: [
          { id: "l11", text: "I can use public transportation or have a transportation plan", helpText: "Getting around independently is key to accessing work, school, and community." },
          { id: "l12", text: "I know how to access community resources (library, recreation, support groups)", helpText: "Your community has resources that enrich your life and support your goals." },
          { id: "l13", text: "I can build and maintain positive relationships", helpText: "Healthy relationships improve mental health and quality of life." },
          { id: "l14", text: "I understand my rights as a tenant if I plan to rent housing", helpText: "Knowing tenant rights protects you from unfair practices." },
          { id: "l15", text: "I have identified a support network (family, mentors, agencies)", helpText: "Nobody does it alone. Building a support network is a sign of strength." },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Color Maps                                                         */
/* ------------------------------------------------------------------ */

const domainColors: Record<string, { bg: string; text: string; iconBg: string; progressBg: string; progressFill: string; border: string; lightBg: string }> = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-400", iconBg: "bg-blue-100 dark:bg-blue-900/30", progressBg: "bg-blue-100 dark:bg-blue-900/20", progressFill: "bg-blue-500", border: "border-blue-200 dark:border-blue-800", lightBg: "bg-blue-50/50 dark:bg-blue-950/10" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-400", iconBg: "bg-purple-100 dark:bg-purple-900/30", progressBg: "bg-purple-100 dark:bg-purple-900/20", progressFill: "bg-purple-500", border: "border-purple-200 dark:border-purple-800", lightBg: "bg-purple-50/50 dark:bg-purple-950/10" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-700 dark:text-emerald-400", iconBg: "bg-emerald-100 dark:bg-emerald-900/30", progressBg: "bg-emerald-100 dark:bg-emerald-900/20", progressFill: "bg-emerald-500", border: "border-emerald-200 dark:border-emerald-800", lightBg: "bg-emerald-50/50 dark:bg-emerald-950/10" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TransitionPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedDomain, setExpandedDomain] = useState<string>("employment");
  const [expandedSubdomain, setExpandedSubdomain] = useState<string | null>("career-awareness");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showHelp, setShowHelp] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedChecks = localStorage.getItem("pathready-transition-checks");
      const savedNotes = localStorage.getItem("pathready-transition-notes");
      if (savedChecks) setCheckedItems(JSON.parse(savedChecks));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(checkedItems).length > 0) {
      localStorage.setItem("pathready-transition-checks", JSON.stringify(checkedItems));
    }
  }, [checkedItems]);

  useEffect(() => {
    if (Object.keys(notes).length > 0) {
      localStorage.setItem("pathready-transition-notes", JSON.stringify(notes));
    }
  }, [notes]);

  function toggleItem(id: string) {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function getDomainProgress(domain: Domain) {
    const total = domain.subdomains.reduce((sum, sd) => sum + sd.items.length, 0);
    const checked = domain.subdomains.reduce((sum, sd) => sum + sd.items.filter((i) => checkedItems[i.id]).length, 0);
    return { total, checked, pct: total > 0 ? Math.round((checked / total) * 100) : 0 };
  }

  function getOverallProgress() {
    const total = domains.reduce((sum, d) => sum + d.subdomains.reduce((s, sd) => s + sd.items.length, 0), 0);
    const checked = domains.reduce((sum, d) => sum + d.subdomains.reduce((s, sd) => s + sd.items.filter((i) => checkedItems[i.id]).length, 0), 0);
    return { total, checked, pct: total > 0 ? Math.round((checked / total) * 100) : 0 };
  }

  function resetAll() {
    setCheckedItems({});
    setNotes({});
    localStorage.removeItem("pathready-transition-checks");
    localStorage.removeItem("pathready-transition-notes");
  }

  const overall = getOverallProgress();

  function getReadinessLevel(pct: number) {
    if (pct >= 80) return { label: "Ready", color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" };
    if (pct >= 50) return { label: "Developing", color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" };
    if (pct >= 25) return { label: "Emerging", color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" };
    return { label: "Beginning", color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/30" };
  }

  const readiness = getReadinessLevel(overall.pct);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <Accessibility className="w-5 h-5 text-purple-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">IEP & 504 Aligned</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Transition Readiness Tool</h1>
        <p className="text-muted-foreground max-w-2xl">
          Track your readiness across three key life domains: Employment, Education, and Independent Living. 
          Designed for students with IEPs, 504 plans, DVR clients, and anyone preparing for life after high school.
        </p>
      </div>

      {/* Overall Progress */}
      <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 mb-8 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold mb-1">Overall Transition Readiness</h2>
            <p className="text-sm text-muted-foreground">{overall.checked} of {overall.total} indicators complete</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${readiness.bg} ${readiness.color}`}>
              {readiness.label}
            </span>
            <span className="text-2xl font-bold">{overall.pct}%</span>
          </div>
        </div>
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${overall.pct}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {domains.map((d) => {
            const prog = getDomainProgress(d);
            const colors = domainColors[d.color];
            const Icon = d.icon;
            return (
              <div key={d.id} className={`${colors.lightBg} rounded-lg p-3 text-center`}>
                <Icon className={`w-5 h-5 ${colors.text} mx-auto mb-1`} />
                <div className="text-xs font-medium mb-1">{d.title.split(" & ")[0]}</div>
                <div className={`text-lg font-bold ${colors.text}`}>{prog.pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Sections */}
      <div className="space-y-4">
        {domains.map((domain) => {
          const isExpanded = expandedDomain === domain.id;
          const prog = getDomainProgress(domain);
          const colors = domainColors[domain.color];
          const Icon = domain.icon;

          return (
            <div key={domain.id} className={`bg-white dark:bg-slate-900 border rounded-xl overflow-hidden transition-all ${isExpanded ? `border-2 ${colors.border} shadow-md` : "border-border"}`}>
              <button
                onClick={() => setExpandedDomain(isExpanded ? "" : domain.id)}
                className="w-full text-left p-5 flex items-center gap-4"
                aria-expanded={isExpanded}
              >
                <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base">{domain.title}</h3>
                  <p className="text-xs text-muted-foreground">{domain.description}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:block text-right">
                    <div className={`text-lg font-bold ${colors.text}`}>{prog.pct}%</div>
                    <div className="text-xs text-muted-foreground">{prog.checked}/{prog.total}</div>
                  </div>
                  <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full hidden sm:block">
                    <div className={`h-2 rounded-full ${colors.progressFill} transition-all duration-500`} style={{ width: `${prog.pct}%` }} />
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-4">
                  {domain.subdomains.map((subdomain) => {
                    const sdExpanded = expandedSubdomain === subdomain.id;
                    const sdChecked = subdomain.items.filter((i) => checkedItems[i.id]).length;
                    const SdIcon = subdomain.icon;

                    return (
                      <div key={subdomain.id} className={`border rounded-lg ${colors.border} overflow-hidden`}>
                        <button
                          onClick={() => setExpandedSubdomain(sdExpanded ? null : subdomain.id)}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 ${colors.lightBg}`}
                          aria-expanded={sdExpanded}
                        >
                          <SdIcon className={`w-4 h-4 ${colors.text}`} />
                          <span className="font-semibold text-sm flex-1">{subdomain.title}</span>
                          <span className="text-xs text-muted-foreground">{sdChecked}/{subdomain.items.length}</span>
                          {sdExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </button>

                        {sdExpanded && (
                          <div className="p-4 space-y-3">
                            {subdomain.items.map((item) => {
                              const isChecked = !!checkedItems[item.id];
                              const isHelpOpen = showHelp === item.id;
                              return (
                                <div key={item.id} className="group">
                                  <div className="flex items-start gap-3">
                                    <button
                                      onClick={() => toggleItem(item.id)}
                                      className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110"
                                      aria-label={isChecked ? "Uncheck item" : "Check item"}
                                    >
                                      {isChecked ? (
                                        <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
                                      ) : (
                                        <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                      )}
                                    </button>
                                    <div className="flex-1">
                                      <p className={`text-sm ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                                        {item.text}
                                      </p>
                                      <button
                                        onClick={() => setShowHelp(isHelpOpen ? null : item.id)}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 flex items-center gap-1"
                                      >
                                        <AlertCircle className="w-3 h-3" />
                                        {isHelpOpen ? "Hide help" : "Need help with this?"}
                                      </button>
                                      {isHelpOpen && (
                                        <div className="mt-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-xs text-muted-foreground border border-blue-200 dark:border-blue-800">
                                          <p className="mb-2">{item.helpText}</p>
                                          {item.resources && (
                                            <div className="flex flex-wrap gap-1">
                                              {item.resources.map((r) => (
                                                <span key={r} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                                                  {r}
                                                </span>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {/* Notes field */}
                                  <div className="ml-8 mt-2">
                                    <input
                                      type="text"
                                      placeholder="Add a personal note..."
                                      value={notes[item.id] || ""}
                                      onChange={(e) => setNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                                      className="w-full text-xs px-3 py-1.5 border border-border rounded-md bg-transparent focus:ring-1 focus:ring-blue-500 outline-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                                      aria-label={`Note for: ${item.text}`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3 fade-in-up">
        <button
          onClick={resetAll}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition"
        >
          <RotateCcw className="w-4 h-4" /> Reset All
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 transition"
        >
          <FileText className="w-4 h-4" /> Print / Export PDF
        </button>
      </div>

      {/* Info Banner */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-border rounded-xl p-6 fade-in-up">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm mb-1">About This Tool</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This Transition Readiness Tool is modeled after evidence-based transition assessment frameworks 
              used by state vocational rehabilitation agencies and school districts. It aligns with IDEA transition 
              requirements, Pre-ETS pillars, and WIOA guidelines. Your data is stored locally on your device and 
              is not shared without your consent. Designed to support IEP and 504 transition planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
