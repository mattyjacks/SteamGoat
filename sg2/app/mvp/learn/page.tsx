"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  MessageCircle,
  DollarSign,
  Users,
  Shield,
  Heart,
  Brain,
  Lightbulb,
  CheckCircle2,
  Circle,
  ChevronRight,
  Clock,
  Star,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  Lock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Module Data                                                        */
/* ------------------------------------------------------------------ */

interface Lesson {
  id: string;
  title: string;
  content: string[];
  quiz?: { question: string; options: string[]; correct: number }[];
  tip?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  color: string;
  duration: string;
  category: string;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    id: "resume",
    title: "Resume Writing",
    description: "Learn to create a professional resume that highlights your strengths and experience.",
    icon: FileText,
    color: "blue",
    duration: "30 min",
    category: "Job Seeking",
    lessons: [
      {
        id: "r1",
        title: "What is a Resume?",
        content: [
          "A resume is a document that summarizes your education, work experience, skills, and achievements. It is your first impression with an employer.",
          "Most resumes should be one page, especially for students and early-career professionals.",
          "There are three main resume formats: Chronological (most common), Functional (focuses on skills), and Combination (mix of both).",
        ],
        tip: "Even if you have no work experience, you can highlight volunteer work, school projects, and extracurricular activities!",
      },
      {
        id: "r2",
        title: "Contact Information & Summary",
        content: [
          "Start with your full name, phone number, email address, and city/state (no full address needed).",
          "Use a professional email address. firstname.lastname@email.com is ideal.",
          "A summary statement is 2-3 sentences that highlight your key strengths and what you're looking for.",
        ],
        quiz: [
          { question: "Which email is most professional for a resume?", options: ["coolgamer2005@email.com", "j.smith@email.com", "partyanimal@email.com", "xXx_dragon_xXx@email.com"], correct: 1 },
        ],
      },
      {
        id: "r3",
        title: "Education & Experience",
        content: [
          "List your most recent education first. Include school name, expected graduation date, and GPA if above 3.0.",
          "For work experience, list your most recent job first. Include company name, job title, dates, and 3-5 bullet points describing what you did.",
          "Start each bullet point with an action verb: 'Managed', 'Created', 'Assisted', 'Organized', 'Trained'.",
          "Even volunteer work and internships count as experience!",
        ],
        quiz: [
          { question: "Which is the best way to start a resume bullet point?", options: ["I was responsible for...", "Managed a team of 5...", "My duties included...", "I did some stuff like..."], correct: 1 },
        ],
      },
      {
        id: "r4",
        title: "Skills & Final Tips",
        content: [
          "List 6-10 relevant skills. Include a mix of hard skills (software, tools) and soft skills (teamwork, communication).",
          "Tailor your resume to each job by matching keywords from the job description.",
          "Proofread carefully! Ask someone else to review it too.",
          "Save your resume as a PDF to preserve formatting.",
        ],
        tip: "Keep a 'master resume' with everything you've ever done. Then customize shorter versions for each application.",
      },
    ],
  },
  {
    id: "interview",
    title: "Interview Preparation",
    description: "Master the art of interviewing - from preparation to follow-up.",
    icon: MessageCircle,
    color: "purple",
    duration: "35 min",
    category: "Job Seeking",
    lessons: [
      {
        id: "i1",
        title: "Before the Interview",
        content: [
          "Research the company: Visit their website, read their mission statement, and understand what they do.",
          "Review the job description and prepare examples of how your skills match their needs.",
          "Plan your outfit the night before. When in doubt, dress one level above the workplace dress code.",
          "Bring copies of your resume, a notepad, and a pen.",
        ],
        tip: "Practice answering questions out loud, not just in your head. It makes a big difference!",
      },
      {
        id: "i2",
        title: "Common Interview Questions",
        content: [
          "'Tell me about yourself' - Give a 60-second summary of your background, skills, and why you're interested in this role.",
          "'What are your strengths?' - Pick 2-3 strengths relevant to the job and give a brief example for each.",
          "'What is your biggest weakness?' - Choose a real weakness, but explain what you're doing to improve it.",
          "'Why do you want to work here?' - Reference something specific about the company that appeals to you.",
          "'Tell me about a time when...' - Use the STAR method: Situation, Task, Action, Result.",
        ],
        quiz: [
          { question: "What does STAR stand for in the STAR interview method?", options: ["Start, Try, Attempt, Repeat", "Situation, Task, Action, Result", "Strengths, Talents, Abilities, Records", "Simple, Truthful, Accurate, Relevant"], correct: 1 },
        ],
      },
      {
        id: "i3",
        title: "During the Interview",
        content: [
          "Arrive 10-15 minutes early. For virtual interviews, test your technology beforehand.",
          "Make eye contact, smile, and offer a firm handshake (in-person).",
          "Listen carefully to each question. It's okay to pause and think before answering.",
          "Ask thoughtful questions at the end: 'What does a typical day look like?' or 'What do you enjoy about working here?'",
        ],
      },
      {
        id: "i4",
        title: "After the Interview",
        content: [
          "Send a thank-you email within 24 hours. Reference something specific from your conversation.",
          "If you don't hear back within the timeline they gave, it's okay to follow up once.",
          "Whether you get the job or not, every interview is practice that makes you better.",
          "If you get a rejection, it's okay to ask for feedback on how you can improve.",
        ],
        tip: "Keep a journal of interview questions you've been asked. Over time, you'll build a great library of prepared answers.",
      },
    ],
  },
  {
    id: "financial",
    title: "Financial Literacy Basics",
    description: "Understand budgeting, banking, credit, and smart money management.",
    icon: DollarSign,
    color: "emerald",
    duration: "40 min",
    category: "Life Skills",
    lessons: [
      {
        id: "f1",
        title: "Creating a Budget",
        content: [
          "A budget is a plan for how you'll spend your money each month.",
          "Start by listing all income (paychecks, allowance, benefits, etc.).",
          "Then list all expenses: rent, food, transportation, phone, entertainment, savings.",
          "The 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt repayment.",
        ],
        quiz: [
          { question: "In the 50/30/20 budget rule, what percentage goes to 'needs'?", options: ["20%", "30%", "50%", "70%"], correct: 2 },
        ],
      },
      {
        id: "f2",
        title: "Banking Basics",
        content: [
          "A checking account is for everyday spending. A savings account is for money you want to keep and grow.",
          "Direct deposit means your paycheck goes straight into your account - faster and safer.",
          "Debit cards spend money directly from your checking account. Credit cards borrow money you must repay.",
          "Watch out for fees: overdraft fees, ATM fees, and monthly maintenance fees.",
        ],
      },
      {
        id: "f3",
        title: "Understanding Credit",
        content: [
          "Your credit score is a number (300-850) that shows how reliable you are at repaying borrowed money.",
          "Good credit makes it easier to rent an apartment, get a car loan, or even get certain jobs.",
          "To build credit: get a secured credit card, make small purchases, and pay the full balance every month.",
          "Never spend more on a credit card than you can afford to pay off immediately.",
        ],
        tip: "You can check your credit report for free once a year at AnnualCreditReport.com.",
      },
      {
        id: "f4",
        title: "Avoiding Scams",
        content: [
          "If it sounds too good to be true, it probably is.",
          "Never give your Social Security number, bank info, or passwords to someone who contacts you first.",
          "Legitimate companies will never ask you to pay for a job or send money to receive money.",
          "When in doubt, look up the company independently and call their official number.",
        ],
      },
    ],
  },
  {
    id: "workplace-comm",
    title: "Workplace Communication",
    description: "Build essential communication skills for professional environments.",
    icon: Users,
    color: "orange",
    duration: "25 min",
    category: "Workplace Skills",
    lessons: [
      {
        id: "w1",
        title: "Professional Communication Basics",
        content: [
          "Use a professional tone in all work communication - even texts and instant messages.",
          "Start emails with a greeting, state your purpose clearly, and end with a professional closing.",
          "Respond to messages within 24 hours, even if just to say 'I'll get back to you soon.'",
          "Re-read messages before sending to check for tone and errors.",
        ],
      },
      {
        id: "w2",
        title: "Active Listening",
        content: [
          "Active listening means fully focusing on the speaker, not just waiting for your turn to talk.",
          "Show you're listening: nod, make eye contact, and ask clarifying questions.",
          "Repeat back what you heard: 'So what you're saying is...' to confirm understanding.",
          "Put your phone away during conversations and meetings.",
        ],
        quiz: [
          { question: "What is the best way to show you understood someone?", options: ["Say 'uh-huh' repeatedly", "Paraphrase what they said back to them", "Start talking about your own experience", "Look at your phone while nodding"], correct: 1 },
        ],
      },
      {
        id: "w3",
        title: "Handling Conflict",
        content: [
          "Stay calm. Take a deep breath before responding to a frustrating situation.",
          "Use 'I' statements: 'I feel frustrated when...' instead of 'You always...'",
          "Focus on the problem, not the person. Look for solutions together.",
          "If you can't resolve it, it's okay to involve a supervisor or HR - that's what they're there for.",
        ],
      },
    ],
  },
  {
    id: "self-advocacy",
    title: "Self-Advocacy Skills",
    description: "Learn to speak up for yourself and navigate accommodation requests.",
    icon: Shield,
    color: "rose",
    duration: "30 min",
    category: "Life Skills",
    lessons: [
      {
        id: "s1",
        title: "Understanding Your Rights",
        content: [
          "Under the ADA (Americans with Disabilities Act), employers must provide reasonable accommodations.",
          "In school, IDEA and Section 504 protect your right to accommodations and modifications.",
          "Accommodations change HOW you do something. Modifications change WHAT you're expected to do.",
          "You do not have to disclose your disability to get a job, but you do need to disclose to receive accommodations.",
        ],
      },
      {
        id: "s2",
        title: "How to Request Accommodations",
        content: [
          "You can request accommodations verbally or in writing. Written requests create a record.",
          "Be specific: Instead of 'I need help,' say 'I would benefit from written instructions in addition to verbal ones.'",
          "Prepare by knowing what works for you. Think about what has helped you succeed in the past.",
          "If your request is denied, ask why and whether alternative accommodations can be explored.",
        ],
        tip: "The Job Accommodation Network (JAN) at askjan.org has a free database of accommodations by disability type.",
      },
      {
        id: "s3",
        title: "Building Confidence",
        content: [
          "Self-advocacy gets easier with practice. Start small - order your own food, make your own appointments.",
          "Know your strengths, not just your challenges. Lead conversations with what you CAN do.",
          "It's okay to say 'I need a moment to think about that' in any conversation.",
          "Find a mentor or peer who can practice self-advocacy scenarios with you.",
        ],
        quiz: [
          { question: "What is the best way to request a workplace accommodation?", options: ["Complain to coworkers about the lack of support", "Be specific about what you need and how it helps you perform", "Demand accommodations without explanation", "Wait for someone to notice you're struggling"], correct: 1 },
        ],
      },
    ],
  },
  {
    id: "time-mgmt",
    title: "Time Management",
    description: "Develop strategies to organize your day and meet deadlines consistently.",
    icon: Clock,
    color: "cyan",
    duration: "20 min",
    category: "Workplace Skills",
    lessons: [
      {
        id: "t1",
        title: "Prioritizing Tasks",
        content: [
          "Use the Eisenhower Matrix: divide tasks into Urgent/Important, Important/Not Urgent, Urgent/Not Important, and Neither.",
          "Do the most important tasks first, when your energy is highest.",
          "Break large tasks into smaller steps. 'Write a report' becomes 'Research topic, outline, draft intro, etc.'",
          "It's okay to say no to low-priority requests if your plate is full.",
        ],
      },
      {
        id: "t2",
        title: "Tools & Techniques",
        content: [
          "Use a planner, calendar app, or to-do list - whichever works best for your style.",
          "Set alarms and reminders for deadlines and appointments.",
          "Try the Pomodoro Technique: 25 minutes of focused work, then a 5-minute break.",
          "Plan your week on Sunday evening. Review and adjust daily.",
        ],
        tip: "If you have ADHD or executive function challenges, visual timers and body-doubling (working alongside someone) can be game-changers.",
      },
    ],
  },
];

const categories = [...new Set(modules.map((m) => m.category))];

const colorClasses: Record<string, { bg: string; text: string; iconBg: string; progressFill: string }> = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-400", iconBg: "bg-blue-100 dark:bg-blue-900/30", progressFill: "bg-blue-500" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-400", iconBg: "bg-purple-100 dark:bg-purple-900/30", progressFill: "bg-purple-500" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-700 dark:text-emerald-400", iconBg: "bg-emerald-100 dark:bg-emerald-900/30", progressFill: "bg-emerald-500" },
  orange: { bg: "bg-orange-50 dark:bg-orange-950/20", text: "text-orange-700 dark:text-orange-400", iconBg: "bg-orange-100 dark:bg-orange-900/30", progressFill: "bg-orange-500" },
  rose: { bg: "bg-rose-50 dark:bg-rose-950/20", text: "text-rose-700 dark:text-rose-400", iconBg: "bg-rose-100 dark:bg-rose-900/30", progressFill: "bg-rose-500" },
  cyan: { bg: "bg-cyan-50 dark:bg-cyan-950/20", text: "text-cyan-700 dark:text-cyan-400", iconBg: "bg-cyan-100 dark:bg-cyan-900/30", progressFill: "bg-cyan-500" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LearnPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResult, setShowQuizResult] = useState<Record<string, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pathready-completed-lessons");
      if (saved) setCompletedLessons(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (Object.keys(completedLessons).length > 0) {
      localStorage.setItem("pathready-completed-lessons", JSON.stringify(completedLessons));
    }
  }, [completedLessons]);

  function completeLesson(lessonId: string) {
    setCompletedLessons((prev) => ({ ...prev, [lessonId]: true }));
  }

  function getModuleProgress(mod: Module) {
    const completed = mod.lessons.filter((l) => completedLessons[l.id]).length;
    return { completed, total: mod.lessons.length, pct: Math.round((completed / mod.lessons.length) * 100) };
  }

  const mod = modules.find((m) => m.id === activeModule);
  const filteredModules = filterCategory === "All" ? modules : modules.filter((m) => m.category === filterCategory);

  /* Lesson view */
  if (mod) {
    const lesson = mod.lessons[activeLesson];
    const colors = colorClasses[mod.color];
    const progress = getModuleProgress(mod);
    const Icon = mod.icon;
    const isComplete = !!completedLessons[lesson.id];

    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <button
          onClick={() => { setActiveModule(null); setActiveLesson(0); }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Modules
        </button>

        {/* Module header */}
        <div className={`${colors.bg} rounded-2xl p-6 mb-6 border`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{mod.title}</h1>
              <p className="text-xs text-muted-foreground">Lesson {activeLesson + 1} of {mod.lessons.length} - {progress.pct}% complete</p>
            </div>
          </div>
          <div className="w-full h-2 bg-white/50 dark:bg-slate-800 rounded-full">
            <div className={`h-2 rounded-full ${colors.progressFill} transition-all`} style={{ width: `${progress.pct}%` }} />
          </div>
        </div>

        {/* Lesson navigation pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {mod.lessons.map((l, i) => {
            const lComplete = !!completedLessons[l.id];
            return (
              <button
                key={l.id}
                onClick={() => setActiveLesson(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  i === activeLesson
                    ? `${colors.iconBg} ${colors.text} font-bold`
                    : lComplete
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {lComplete ? <CheckCircle2 className="w-3 h-3" /> : <span>{i + 1}</span>}
                {l.title}
              </button>
            );
          })}
        </div>

        {/* Lesson content */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6 lg:p-8 mb-6">
          <h2 className="text-xl font-bold mb-6">{lesson.title}</h2>
          <div className="space-y-4">
            {lesson.content.map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </div>

          {lesson.tip && (
            <div className="mt-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">Pro Tip</p>
                <p className="text-xs text-amber-700 dark:text-amber-400">{lesson.tip}</p>
              </div>
            </div>
          )}

          {lesson.quiz && lesson.quiz.map((q, qi) => {
            const qKey = `${lesson.id}-q${qi}`;
            const answered = showQuizResult[qKey];
            const isCorrect = quizAnswers[qKey] === q.correct;
            return (
              <div key={qi} className="mt-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-border">
                <p className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" /> Quick Check
                </p>
                <p className="text-sm mb-4">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    let optClass = "border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20";
                    if (answered) {
                      if (oi === q.correct) optClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
                      else if (oi === quizAnswers[qKey] && oi !== q.correct) optClass = "border-rose-500 bg-rose-50 dark:bg-rose-900/20";
                      else optClass = "border-border opacity-50";
                    }
                    return (
                      <button
                        key={oi}
                        disabled={!!answered}
                        onClick={() => {
                          setQuizAnswers((prev) => ({ ...prev, [qKey]: oi }));
                          setShowQuizResult((prev) => ({ ...prev, [qKey]: true }));
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition ${optClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <p className={`mt-3 text-sm font-medium ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
                    {isCorrect ? "Correct! Great job!" : `Not quite. The correct answer is: "${q.options[q.correct]}"`}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
            disabled={activeLesson === 0}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <div className="flex gap-2">
            {!isComplete && (
              <button
                onClick={() => completeLesson(lesson.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition bg-emerald-700 text-white hover:bg-emerald-800`}
              >
                <CheckCircle2 className="w-4 h-4" /> Mark Complete
              </button>
            )}
            {isComplete && (
              <span className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Completed
              </span>
            )}
          </div>
          <button
            onClick={() => {
              if (activeLesson < mod.lessons.length - 1) {
                setActiveLesson(activeLesson + 1);
              }
            }}
            disabled={activeLesson >= mod.lessons.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 transition disabled:opacity-40"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  /* Module listing */
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8 fade-in-up">
        <h1 className="text-3xl font-bold mb-2">Learning Center</h1>
        <p className="text-muted-foreground max-w-2xl">
          Build essential employability and life skills with self-paced modules. Each includes lessons, tips, and knowledge checks.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap fade-in-up" style={{ animationDelay: "0.1s" }}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              filterCategory === cat
                ? "bg-blue-700 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((mod, i) => {
          const colors = colorClasses[mod.color];
          const Icon = mod.icon;
          const progress = getModuleProgress(mod);

          return (
            <button
              key={mod.id}
              onClick={() => { setActiveModule(mod.id); setActiveLesson(0); }}
              className={`text-left bg-white dark:bg-slate-900 border border-border rounded-xl p-6 hover:shadow-lg transition-all group fade-in-up ${progress.pct === 100 ? "ring-2 ring-emerald-500" : ""}`}
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {mod.duration}
                  </span>
                  {progress.pct === 100 && <Trophy className="w-4 h-4 text-emerald-500" />}
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>{mod.category}</span>
              <h2 className="text-lg font-bold mt-1 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">{mod.title}</h2>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{mod.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <div className={`h-1.5 rounded-full ${colors.progressFill} transition-all`} style={{ width: `${progress.pct}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{progress.completed}/{progress.total} lessons</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
