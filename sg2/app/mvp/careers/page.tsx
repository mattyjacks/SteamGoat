"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Briefcase,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Career Data                                                        */
/* ------------------------------------------------------------------ */

interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  dayInLife: string;
  salary: { low: number; median: number; high: number };
  growth: string;
  growthRate: number;
  education: string;
  educationLevel: number; // 1=HS, 2=Certificate, 3=Associate, 4=Bachelor, 5=Master, 6=Doctoral
  skills: string[];
  interests: string[];
  accessibility: string;
}

const careers: Career[] = [
  { id: "software-dev", title: "Software Developer", category: "Technology", description: "Design, develop, and maintain software applications and systems.", dayInLife: "Write code, review pull requests, attend standups, debug issues, and collaborate with product teams to build features users love.", salary: { low: 65000, median: 110000, high: 170000 }, growth: "25% (Much faster than average)", growthRate: 25, education: "Bachelor's Degree", educationLevel: 4, skills: ["Programming", "Problem Solving", "Teamwork", "Logic"], interests: ["Investigative", "Conventional"], accessibility: "Excellent remote work options. Screen reader compatible workflows." },
  { id: "registered-nurse", title: "Registered Nurse", category: "Healthcare", description: "Provide patient care, administer medications, and coordinate with healthcare teams.", dayInLife: "Assess patients, administer treatments, update medical records, educate patients about conditions, and collaborate with doctors on care plans.", salary: { low: 55000, median: 77000, high: 120000 }, growth: "6% (Faster than average)", growthRate: 6, education: "Associate or Bachelor's", educationLevel: 3, skills: ["Patient Care", "Communication", "Critical Thinking", "Empathy"], interests: ["Social", "Investigative"], accessibility: "Various specialties with different physical requirements. Many desk-based roles available." },
  { id: "graphic-designer", title: "Graphic Designer", category: "Creative Arts", description: "Create visual concepts using software to communicate ideas that inspire and inform consumers.", dayInLife: "Design layouts, choose colors and typography, meet with clients, create mockups, and iterate based on feedback.", salary: { low: 35000, median: 53000, high: 90000 }, growth: "3% (Average)", growthRate: 3, education: "Bachelor's Degree", educationLevel: 4, skills: ["Creativity", "Adobe Suite", "Typography", "Color Theory"], interests: ["Artistic", "Enterprising"], accessibility: "Strong remote options. Alternative input devices supported by design software." },
  { id: "electrician", title: "Electrician", category: "Skilled Trades", description: "Install, maintain, and repair electrical systems in buildings and structures.", dayInLife: "Read blueprints, install wiring, troubleshoot electrical problems, ensure code compliance, and work with construction teams.", salary: { low: 40000, median: 60000, high: 100000 }, growth: "7% (Faster than average)", growthRate: 7, education: "Certificate/Apprenticeship", educationLevel: 2, skills: ["Electrical Systems", "Problem Solving", "Math", "Physical Fitness"], interests: ["Realistic", "Investigative"], accessibility: "Physical role. Some positions in design/inspection may accommodate disabilities." },
  { id: "data-scientist", title: "Data Scientist", category: "Technology", description: "Analyze complex data sets to find patterns and insights that help organizations make decisions.", dayInLife: "Clean and analyze data, build machine learning models, create visualizations, present findings to stakeholders, and collaborate with engineers.", salary: { low: 70000, median: 103000, high: 167000 }, growth: "35% (Much faster than average)", growthRate: 35, education: "Master's Degree", educationLevel: 5, skills: ["Python/R", "Statistics", "Machine Learning", "Data Visualization"], interests: ["Investigative", "Conventional"], accessibility: "Excellent remote options. Fully digital workflow." },
  { id: "social-worker", title: "Social Worker", category: "Human Services", description: "Help individuals and families cope with challenges and connect with community resources.", dayInLife: "Meet with clients, assess needs, develop care plans, connect people to services, document cases, and advocate for clients.", salary: { low: 36000, median: 55000, high: 82000 }, growth: "7% (Faster than average)", growthRate: 7, education: "Bachelor's or Master's", educationLevel: 4, skills: ["Empathy", "Communication", "Case Management", "Cultural Competency"], interests: ["Social", "Enterprising"], accessibility: "Mix of office and field work. Telework options expanding." },
  { id: "teacher", title: "High School Teacher", category: "Education", description: "Instruct students in academic subjects and help prepare them for college and careers.", dayInLife: "Prepare lesson plans, teach classes, grade assignments, meet with parents, advise students, and participate in staff development.", salary: { low: 40000, median: 62000, high: 100000 }, growth: "1% (Slower than average)", growthRate: 1, education: "Bachelor's Degree + Licensure", educationLevel: 4, skills: ["Communication", "Patience", "Subject Knowledge", "Classroom Management"], interests: ["Social", "Artistic"], accessibility: "Classroom setting with assistive technology available. Online teaching options growing." },
  { id: "cybersecurity", title: "Cybersecurity Analyst", category: "Technology", description: "Protect computer networks and systems from security breaches and cyber attacks.", dayInLife: "Monitor security alerts, investigate incidents, update firewalls, conduct vulnerability assessments, and train staff on security practices.", salary: { low: 60000, median: 102000, high: 165000 }, growth: "32% (Much faster than average)", growthRate: 32, education: "Bachelor's Degree + Certifications", educationLevel: 4, skills: ["Network Security", "Risk Assessment", "Problem Solving", "Attention to Detail"], interests: ["Investigative", "Conventional"], accessibility: "Excellent remote options. Fully digital workflow." },
  { id: "hvac-tech", title: "HVAC Technician", category: "Skilled Trades", description: "Install, maintain, and repair heating, cooling, and ventilation systems.", dayInLife: "Diagnose system issues, install new equipment, perform maintenance, read technical manuals, and interact with customers.", salary: { low: 35000, median: 50000, high: 80000 }, growth: "5% (Average)", growthRate: 5, education: "Certificate/Apprenticeship", educationLevel: 2, skills: ["Mechanical Aptitude", "Customer Service", "Troubleshooting", "Physical Fitness"], interests: ["Realistic", "Conventional"], accessibility: "Physical role. Design and inspection specialties available." },
  { id: "marketing-mgr", title: "Marketing Manager", category: "Business", description: "Plan and direct marketing strategies to build brand awareness and drive revenue.", dayInLife: "Develop campaigns, analyze market data, manage budgets, lead creative teams, and present strategies to executives.", salary: { low: 65000, median: 133000, high: 200000 }, growth: "6% (Faster than average)", growthRate: 6, education: "Bachelor's Degree", educationLevel: 4, skills: ["Strategy", "Analytics", "Creativity", "Leadership"], interests: ["Enterprising", "Artistic"], accessibility: "Strong remote and hybrid options." },
  { id: "medical-assistant", title: "Medical Assistant", category: "Healthcare", description: "Perform clinical and administrative tasks in physicians' offices and clinics.", dayInLife: "Take vital signs, prepare patients for exams, schedule appointments, manage medical records, and assist physicians during procedures.", salary: { low: 29000, median: 38000, high: 48000 }, growth: "14% (Much faster than average)", growthRate: 14, education: "Certificate or Associate", educationLevel: 2, skills: ["Patient Care", "Medical Terminology", "Organization", "Communication"], interests: ["Social", "Conventional"], accessibility: "Clinical setting. Seated administrative roles available." },
  { id: "accountant", title: "Accountant", category: "Business", description: "Prepare and examine financial records, ensuring accuracy and tax compliance.", dayInLife: "Review financial statements, prepare tax returns, audit records, advise clients on finances, and ensure regulatory compliance.", salary: { low: 45000, median: 77000, high: 128000 }, growth: "4% (Average)", growthRate: 4, education: "Bachelor's Degree", educationLevel: 4, skills: ["Math", "Attention to Detail", "Organization", "Ethics"], interests: ["Conventional", "Enterprising"], accessibility: "Excellent desk-based role with strong remote options." },
  { id: "vet-tech", title: "Veterinary Technician", category: "Healthcare", description: "Assist veterinarians in diagnosing and treating animals.", dayInLife: "Restrain animals, take X-rays, assist in surgery, run lab tests, administer medications, and comfort pet owners.", salary: { low: 28000, median: 36000, high: 52000 }, growth: "20% (Much faster than average)", growthRate: 20, education: "Associate Degree", educationLevel: 3, skills: ["Animal Handling", "Medical Skills", "Communication", "Compassion"], interests: ["Realistic", "Investigative"], accessibility: "Physical role working with animals." },
  { id: "web-developer", title: "Web Developer", category: "Technology", description: "Build and maintain websites and web applications for businesses and organizations.", dayInLife: "Code frontend and backend features, design responsive layouts, optimize performance, fix bugs, and deploy updates.", salary: { low: 45000, median: 78000, high: 130000 }, growth: "16% (Much faster than average)", growthRate: 16, education: "Associate or Bachelor's", educationLevel: 3, skills: ["HTML/CSS/JS", "Frameworks", "Design", "Problem Solving"], interests: ["Investigative", "Artistic"], accessibility: "Excellent remote options. Accessible development tools available." },
  { id: "paralegal", title: "Paralegal", category: "Legal", description: "Assist lawyers with research, document preparation, and case management.", dayInLife: "Research legal precedents, draft documents, organize case files, interview clients, and prepare for trials.", salary: { low: 36000, median: 56000, high: 86000 }, growth: "4% (Average)", growthRate: 4, education: "Associate or Bachelor's", educationLevel: 3, skills: ["Research", "Writing", "Organization", "Attention to Detail"], interests: ["Conventional", "Investigative"], accessibility: "Desk-based with strong remote options for research tasks." },
  { id: "phlebotomist", title: "Phlebotomist", category: "Healthcare", description: "Draw blood from patients for medical testing, transfusions, or donations.", dayInLife: "Verify patient identity, draw blood samples, label specimens, maintain equipment, and calm anxious patients.", salary: { low: 30000, median: 38000, high: 50000 }, growth: "8% (Faster than average)", growthRate: 8, education: "Certificate", educationLevel: 2, skills: ["Precision", "Patient Care", "Communication", "Attention to Detail"], interests: ["Realistic", "Social"], accessibility: "Clinical environment. Requires fine motor skills." },
  { id: "project-manager", title: "Project Manager", category: "Business", description: "Plan, execute, and close projects, ensuring they're delivered on time and within budget.", dayInLife: "Lead team meetings, track milestones, manage risks, communicate with stakeholders, and resolve blockers.", salary: { low: 55000, median: 95000, high: 150000 }, growth: "6% (Faster than average)", growthRate: 6, education: "Bachelor's Degree", educationLevel: 4, skills: ["Leadership", "Organization", "Communication", "Risk Management"], interests: ["Enterprising", "Conventional"], accessibility: "Strong remote and hybrid options. Primarily coordination-based." },
  { id: "environmental-sci", title: "Environmental Scientist", category: "Science", description: "Study the environment and develop solutions to environmental problems.", dayInLife: "Collect field samples, analyze lab data, write reports, advise on regulations, and collaborate on conservation projects.", salary: { low: 45000, median: 76000, high: 130000 }, growth: "6% (Faster than average)", growthRate: 6, education: "Bachelor's Degree", educationLevel: 4, skills: ["Research", "Analysis", "Writing", "Fieldwork"], interests: ["Investigative", "Realistic"], accessibility: "Mix of lab and field work. Lab-only roles available." },
  { id: "culinary-chef", title: "Chef / Head Cook", category: "Hospitality", description: "Direct food preparation, create menus, and manage kitchen operations.", dayInLife: "Plan menus, prep ingredients, cook meals, train staff, manage inventory, and ensure food safety standards.", salary: { low: 30000, median: 50000, high: 86000 }, growth: "5% (Average)", growthRate: 5, education: "Certificate or Associate", educationLevel: 2, skills: ["Cooking", "Creativity", "Leadership", "Time Management"], interests: ["Realistic", "Artistic"], accessibility: "Physical kitchen environment. Recipe development and food writing alternatives." },
  { id: "counselor", title: "Mental Health Counselor", category: "Human Services", description: "Help individuals manage mental health conditions, stress, and life transitions.", dayInLife: "Conduct therapy sessions, develop treatment plans, maintain case notes, coordinate with other providers, and attend training.", salary: { low: 36000, median: 49000, high: 80000 }, growth: "18% (Much faster than average)", growthRate: 18, education: "Master's Degree + Licensure", educationLevel: 5, skills: ["Active Listening", "Empathy", "Ethics", "Assessment"], interests: ["Social", "Investigative"], accessibility: "Telehealth options expanding rapidly. Primarily seated/office-based." },
];

const categories = [...new Set(careers.map((c) => c.category))].sort();
const educationLevels = [
  { level: 1, label: "High School Diploma" },
  { level: 2, label: "Certificate / Apprenticeship" },
  { level: 3, label: "Associate Degree" },
  { level: 4, label: "Bachelor's Degree" },
  { level: 5, label: "Master's Degree" },
  { level: 6, label: "Doctoral Degree" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxEducation, setMaxEducation] = useState(6);
  const [minSalary, setMinSalary] = useState(0);
  const [sortBy, setSortBy] = useState<"title" | "salary" | "growth">("title");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedCareers, setSavedCareers] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("pathready-saved-careers") || "[]");
      } catch { return []; }
    }
    return [];
  });
  const [showFilters, setShowFilters] = useState(false);

  function toggleSave(id: string) {
    const next = savedCareers.includes(id) ? savedCareers.filter((c) => c !== id) : [...savedCareers, id];
    setSavedCareers(next);
    localStorage.setItem("pathready-saved-careers", JSON.stringify(next));
  }

  const filtered = useMemo(() => {
    let list = careers.filter((c) => {
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.category.toLowerCase().includes(search.toLowerCase()) && !c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))) return false;
      if (selectedCategory !== "All" && c.category !== selectedCategory) return false;
      if (c.educationLevel > maxEducation) return false;
      if (c.salary.median < minSalary) return false;
      return true;
    });
    if (sortBy === "salary") list.sort((a, b) => b.salary.median - a.salary.median);
    else if (sortBy === "growth") list.sort((a, b) => b.growthRate - a.growthRate);
    else list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [search, selectedCategory, maxEducation, minSalary, sortBy]);

  function formatSalary(n: number) {
    return "$" + n.toLocaleString();
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8 fade-in-up">
        <h1 className="text-3xl font-bold mb-2">Career Explorer</h1>
        <p className="text-muted-foreground">
          Browse {careers.length} career profiles with real salary data, education requirements, and growth outlook.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 space-y-4 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search careers, categories, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              aria-label="Search careers"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-medium transition ${showFilters ? "bg-blue-700 text-white border-blue-700" : "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white dark:bg-slate-900"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Max Education Required</label>
              <select
                value={maxEducation}
                onChange={(e) => setMaxEducation(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white dark:bg-slate-900"
              >
                {educationLevels.map((ed) => (
                  <option key={ed.level} value={ed.level}>{ed.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Min Median Salary</label>
              <select
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white dark:bg-slate-900"
              >
                <option value={0}>Any</option>
                <option value={30000}>$30,000+</option>
                <option value={50000}>$50,000+</option>
                <option value={75000}>$75,000+</option>
                <option value={100000}>$100,000+</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "title" | "salary" | "growth")}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white dark:bg-slate-900"
              >
                <option value="title">Name (A-Z)</option>
                <option value="salary">Highest Salary</option>
                <option value="growth">Fastest Growing</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{filtered.length}</strong> of {careers.length} careers
          {savedCareers.length > 0 && <span className="ml-3 text-blue-700 dark:text-blue-400 font-medium">{savedCareers.length} saved</span>}
        </p>
      </div>

      {/* Career Cards */}
      <div className="space-y-4">
        {filtered.map((career) => {
          const isExpanded = expandedId === career.id;
          const isSaved = savedCareers.includes(career.id);

          return (
            <div
              key={career.id}
              className={`bg-white dark:bg-slate-900 border rounded-xl transition-all ${isExpanded ? "border-blue-500 shadow-lg" : "border-border hover:shadow-md"}`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : career.id)}
                className="w-full text-left p-5 flex items-center gap-4"
                aria-expanded={isExpanded}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base">{career.title}</h3>
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-muted-foreground">{career.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 truncate">{career.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{formatSalary(career.salary.median)}</div>
                    <div className="text-xs text-muted-foreground">Median</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${career.growthRate >= 10 ? "text-blue-700 dark:text-blue-400" : "text-muted-foreground"}`}>
                      {career.growthRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border pt-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-600" /> A Day in the Life
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{career.dayInLife}</p>

                      <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" /> Key Skills
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {career.skills.map((s) => (
                          <span key={s} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full font-medium">{s}</span>
                        ))}
                      </div>

                      <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-500" /> Interest Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.interests.map((i) => (
                          <span key={i} className="text-xs bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 px-3 py-1 rounded-full font-medium">{i}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" /> Salary Range
                      </h4>
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>{formatSalary(career.salary.low)}</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">{formatSalary(career.salary.median)}</span>
                          <span>{formatSalary(career.salary.high)}</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full relative">
                          <div
                            className="absolute h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                            style={{
                              left: `${(career.salary.low / career.salary.high) * 100}%`,
                              width: `${((career.salary.high - career.salary.low) / career.salary.high) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-emerald-600 rounded-full shadow"
                            style={{ left: `${(career.salary.median / career.salary.high) * 100}%`, transform: "translate(-50%, -50%)" }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                          <span>Entry</span>
                          <span>Median</span>
                          <span>Senior</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-purple-600" /> Education
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">{career.education}</p>

                      <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" /> Job Growth
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">{career.growth}</p>

                      <h4 className="font-bold text-sm mb-2">Accessibility Notes</h4>
                      <p className="text-sm text-muted-foreground">{career.accessibility}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5 pt-4 border-t border-border">
                    <button
                      onClick={() => toggleSave(career.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isSaved ? "bg-blue-700 text-white" : "border border-border hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      {isSaved ? "Saved" : "Save Career"}
                    </button>
                    <Link
                      href="/mvp/learn"
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition"
                    >
                      Build Skills <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-border rounded-xl">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">No careers match your filters</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p>
            <button onClick={() => { setSearch(""); setSelectedCategory("All"); setMaxEducation(6); setMinSalary(0); }} className="text-sm text-blue-700 dark:text-blue-400 font-medium hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
