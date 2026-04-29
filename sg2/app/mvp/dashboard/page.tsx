"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardCheck,
  Briefcase,
  BookOpen,
  ArrowLeftRight,
  ArrowRight,
  Trophy,
  Target,
  Star,
  Sparkles,
  TrendingUp,
  BarChart3,
  Bookmark,
  CheckCircle2,
  Circle,
  Flame,
  Heart,
  Wrench,
  Compass,
  DollarSign,
  Brain,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Career data for saved lookups                                      */
/* ------------------------------------------------------------------ */

const careerNames: Record<string, string> = {
  "software-dev": "Software Developer",
  "registered-nurse": "Registered Nurse",
  "graphic-designer": "Graphic Designer",
  "electrician": "Electrician",
  "data-scientist": "Data Scientist",
  "social-worker": "Social Worker",
  "teacher": "High School Teacher",
  "cybersecurity": "Cybersecurity Analyst",
  "hvac-tech": "HVAC Technician",
  "marketing-mgr": "Marketing Manager",
  "medical-assistant": "Medical Assistant",
  "accountant": "Accountant",
  "vet-tech": "Veterinary Technician",
  "web-developer": "Web Developer",
  "paralegal": "Paralegal",
  "phlebotomist": "Phlebotomist",
  "project-manager": "Project Manager",
  "environmental-sci": "Environmental Scientist",
  "culinary-chef": "Chef / Head Cook",
  "counselor": "Mental Health Counselor",
};

const assessmentMeta = [
  { id: "interest", title: "Interest Profiler", icon: Heart, color: "rose" },
  { id: "skills", title: "Skills Assessment", icon: Wrench, color: "blue" },
  { id: "values", title: "Work Values", icon: Compass, color: "emerald" },
  { id: "lifestyle", title: "Lifestyle Calculator", icon: DollarSign, color: "amber" },
  { id: "aptitude", title: "Aptitude Assessment", icon: Brain, color: "purple" },
];

const colorClasses: Record<string, { bg: string; text: string; iconBg: string }> = {
  rose: { bg: "bg-rose-50 dark:bg-rose-950/20", text: "text-rose-700 dark:text-rose-400", iconBg: "bg-rose-100 dark:bg-rose-900/30" },
  blue: { bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-400", iconBg: "bg-blue-100 dark:bg-blue-900/30" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-700 dark:text-emerald-400", iconBg: "bg-emerald-100 dark:bg-emerald-900/30" },
  amber: { bg: "bg-amber-50 dark:bg-amber-950/20", text: "text-amber-700 dark:text-amber-400", iconBg: "bg-amber-100 dark:bg-amber-900/30" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-400", iconBg: "bg-purple-100 dark:bg-purple-900/30" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [assessmentResults, setAssessmentResults] = useState<Record<string, Record<string, number>>>({});
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [transitionChecks, setTransitionChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const results = localStorage.getItem("pathready-results");
      const careers = localStorage.getItem("pathready-saved-careers");
      const lessons = localStorage.getItem("pathready-completed-lessons");
      const checks = localStorage.getItem("pathready-transition-checks");
      if (results) setAssessmentResults(JSON.parse(results));
      if (careers) setSavedCareers(JSON.parse(careers));
      if (lessons) setCompletedLessons(JSON.parse(lessons));
      if (checks) setTransitionChecks(JSON.parse(checks));
    } catch {}
  }, []);

  const assessmentsCompleted = Object.keys(assessmentResults).length;
  const lessonsCompleted = Object.values(completedLessons).filter(Boolean).length;
  const transitionCompleted = Object.values(transitionChecks).filter(Boolean).length;
  const totalTransition = 45; // 15 items per domain x 3 domains

  // Calculate overall readiness score
  const assessmentScore = Math.round((assessmentsCompleted / 5) * 100);
  const lessonScore = Math.min(100, Math.round((lessonsCompleted / 20) * 100));
  const transitionScore = Math.round((transitionCompleted / totalTransition) * 100);
  const overallScore = Math.round((assessmentScore + lessonScore + transitionScore) / 3);

  function getTopResult(assessmentId: string) {
    const scores = assessmentResults[assessmentId];
    if (!scores) return null;
    const entries = Object.entries(scores);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8 fade-in-up">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">Track your progress across assessments, career exploration, learning, and transition readiness.</p>
      </div>

      {/* Readiness Score */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 mb-8 text-white relative overflow-hidden fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-semibold text-blue-100">Career Readiness Score</span>
              </div>
              <div className="text-6xl font-bold mb-2">{overallScore}%</div>
              <p className="text-blue-100 text-sm">
                {overallScore === 0 && "Start your journey! Take an assessment to get going."}
                {overallScore > 0 && overallScore < 30 && "You're getting started! Keep building your profile."}
                {overallScore >= 30 && overallScore < 60 && "Good progress! You're building a strong foundation."}
                {overallScore >= 60 && overallScore < 90 && "Excellent work! You're well on your way to career readiness."}
                {overallScore >= 90 && "Outstanding! You're career-ready and prepared for your next step!"}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <ClipboardCheck className="w-5 h-5 mx-auto mb-1 text-blue-200" />
                <div className="text-2xl font-bold">{assessmentsCompleted}/5</div>
                <div className="text-[10px] text-blue-200">Assessments</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <BookOpen className="w-5 h-5 mx-auto mb-1 text-blue-200" />
                <div className="text-2xl font-bold">{lessonsCompleted}</div>
                <div className="text-[10px] text-blue-200">Lessons Done</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <ArrowLeftRight className="w-5 h-5 mx-auto mb-1 text-blue-200" />
                <div className="text-2xl font-bold">{transitionScore}%</div>
                <div className="text-[10px] text-blue-200">Transition</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Results */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-blue-600" /> Assessments
            </h2>
            <Link href="/mvp/assessments" className="text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {assessmentMeta.map((a) => {
              const isComplete = !!assessmentResults[a.id];
              const topResult = getTopResult(a.id);
              const colors = colorClasses[a.color];
              const Icon = a.icon;
              return (
                <div key={a.id} className={`flex items-center gap-3 p-3 rounded-lg ${isComplete ? colors.bg : "bg-slate-50 dark:bg-slate-800/50"}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isComplete ? colors.iconBg : "bg-slate-200 dark:bg-slate-700"}`}>
                    <Icon className={`w-4 h-4 ${isComplete ? colors.text : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    {isComplete && topResult && (
                      <p className={`text-xs ${colors.text} font-medium capitalize`}>Top: {topResult.replace(/_/g, " ")}</p>
                    )}
                    {!isComplete && (
                      <p className="text-xs text-muted-foreground">Not started</p>
                    )}
                  </div>
                  {isComplete ? (
                    <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
                  ) : (
                    <Link href="/mvp/assessments" className="text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline">
                      Start
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Saved Careers */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-600" /> Saved Careers
            </h2>
            <Link href="/mvp/careers" className="text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
              Explore <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {savedCareers.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground mb-3">No careers saved yet</p>
              <Link href="/mvp/careers" className="text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline">
                Browse Career Explorer
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {savedCareers.slice(0, 8).map((id) => (
                <div key={id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <div className="w-9 h-9 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium">{careerNames[id] || id}</span>
                </div>
              ))}
              {savedCareers.length > 8 && (
                <p className="text-xs text-muted-foreground text-center mt-2">+{savedCareers.length - 8} more saved</p>
              )}
            </div>
          )}
        </div>

        {/* Learning Progress */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6 fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" /> Learning Progress
            </h2>
            <Link href="/mvp/learn" className="text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
              Continue <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold text-purple-700 dark:text-purple-400">{lessonsCompleted}</span>
            </div>
            <div>
              <p className="text-sm font-medium">Lessons Completed</p>
              <p className="text-xs text-muted-foreground">
                {lessonsCompleted === 0 ? "Start a module to begin tracking" : `${lessonScore}% of recommended modules`}
              </p>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
            <div className="h-2 bg-purple-500 rounded-full transition-all" style={{ width: `${lessonScore}%` }} />
          </div>
          {lessonsCompleted === 0 && (
            <Link href="/mvp/learn" className="inline-flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline mt-4">
              Start Learning <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Transition Readiness */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6 fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-emerald-600" /> Transition Readiness
            </h2>
            <Link href="/mvp/transition" className="text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
              Continue <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Employment", color: "blue", count: Object.entries(transitionChecks).filter(([k, v]) => k.startsWith("e") && v).length, total: 15 },
              { label: "Education", color: "purple", count: Object.entries(transitionChecks).filter(([k, v]) => k.startsWith("d") && v).length, total: 15 },
              { label: "Living", color: "emerald", count: Object.entries(transitionChecks).filter(([k, v]) => k.startsWith("l") && v).length, total: 15 },
            ].map((d) => (
              <div key={d.label} className={`text-center p-3 rounded-lg ${colorClasses[d.color].bg}`}>
                <div className={`text-lg font-bold ${colorClasses[d.color].text}`}>{d.count}/{d.total}</div>
                <div className="text-[10px] text-muted-foreground">{d.label}</div>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full transition-all" style={{ width: `${transitionScore}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{transitionCompleted} of {totalTransition} indicators complete</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-6 fade-in-up" style={{ animationDelay: "0.6s" }}>
        <h3 className="font-bold mb-4">Recommended Next Steps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {assessmentsCompleted < 5 && (
            <Link href="/mvp/assessments" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-lg hover:shadow-md transition group">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs font-bold">Complete Assessments</p>
                <p className="text-[10px] text-muted-foreground">{5 - assessmentsCompleted} remaining</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {savedCareers.length === 0 && (
            <Link href="/mvp/careers" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-lg hover:shadow-md transition group">
              <Briefcase className="w-5 h-5 text-amber-600" />
              <div className="flex-1">
                <p className="text-xs font-bold">Explore Careers</p>
                <p className="text-[10px] text-muted-foreground">Save your favorites</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {lessonsCompleted < 5 && (
            <Link href="/mvp/learn" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-lg hover:shadow-md transition group">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-xs font-bold">Start Learning</p>
                <p className="text-[10px] text-muted-foreground">Build key skills</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          <Link href="/mvp/transition" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-lg hover:shadow-md transition group">
            <Target className="w-5 h-5 text-emerald-600" />
            <div className="flex-1">
              <p className="text-xs font-bold">Transition Planning</p>
              <p className="text-[10px] text-muted-foreground">Check your readiness</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
