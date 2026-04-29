"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Wrench,
  Compass,
  DollarSign,
  Brain,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  BarChart3,
  Trophy,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Assessment Data                                                    */
/* ------------------------------------------------------------------ */

interface Question {
  text: string;
  options: { label: string; scores: Record<string, number> }[];
}

interface AssessmentDef {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Heart;
  color: string;
  description: string;
  questions: Question[];
  resultCategories: { key: string; label: string; description: string; careers: string[] }[];
}

const assessments: AssessmentDef[] = [
  {
    id: "interest",
    title: "Interest Profiler",
    subtitle: "What excites you?",
    icon: Heart,
    color: "rose",
    description: "Discover career fields aligned with your natural interests using the Holland Code (RIASEC) framework.",
    questions: [
      { text: "I enjoy working with my hands to build or fix things.", options: [
        { label: "Strongly Agree", scores: { realistic: 3 } },
        { label: "Agree", scores: { realistic: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { artistic: 1 } },
      ]},
      { text: "I like solving puzzles, math problems, or scientific questions.", options: [
        { label: "Strongly Agree", scores: { investigative: 3 } },
        { label: "Agree", scores: { investigative: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { social: 1 } },
      ]},
      { text: "I enjoy creating art, music, writing, or design.", options: [
        { label: "Strongly Agree", scores: { artistic: 3 } },
        { label: "Agree", scores: { artistic: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { conventional: 1 } },
      ]},
      { text: "I like helping, teaching, or counseling other people.", options: [
        { label: "Strongly Agree", scores: { social: 3 } },
        { label: "Agree", scores: { social: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { realistic: 1 } },
      ]},
      { text: "I enjoy leading projects, making decisions, and persuading others.", options: [
        { label: "Strongly Agree", scores: { enterprising: 3 } },
        { label: "Agree", scores: { enterprising: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { investigative: 1 } },
      ]},
      { text: "I like organizing data, following procedures, and keeping records.", options: [
        { label: "Strongly Agree", scores: { conventional: 3 } },
        { label: "Agree", scores: { conventional: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { artistic: 1 } },
      ]},
      { text: "I would rather work outdoors than in an office.", options: [
        { label: "Strongly Agree", scores: { realistic: 3 } },
        { label: "Agree", scores: { realistic: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { conventional: 2 } },
      ]},
      { text: "I enjoy researching topics deeply before making decisions.", options: [
        { label: "Strongly Agree", scores: { investigative: 3 } },
        { label: "Agree", scores: { investigative: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { enterprising: 1 } },
      ]},
      { text: "I find it energizing to brainstorm new ideas and concepts.", options: [
        { label: "Strongly Agree", scores: { artistic: 2, investigative: 1 } },
        { label: "Agree", scores: { artistic: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { conventional: 1 } },
      ]},
      { text: "I feel fulfilled when I help someone solve a personal problem.", options: [
        { label: "Strongly Agree", scores: { social: 3 } },
        { label: "Agree", scores: { social: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { realistic: 1 } },
      ]},
    ],
    resultCategories: [
      { key: "realistic", label: "Realistic (Doers)", description: "You prefer hands-on, physical activities. You like working with tools, machines, plants, or animals.", careers: ["Electrician", "Mechanic", "Park Ranger", "Civil Engineer", "Carpenter"] },
      { key: "investigative", label: "Investigative (Thinkers)", description: "You enjoy solving complex problems, conducting research, and working with ideas.", careers: ["Data Scientist", "Biologist", "Software Developer", "Pharmacist", "Forensic Analyst"] },
      { key: "artistic", label: "Artistic (Creators)", description: "You value self-expression, creativity, and working in unstructured environments.", careers: ["Graphic Designer", "Writer", "Musician", "UX Designer", "Architect"] },
      { key: "social", label: "Social (Helpers)", description: "You thrive when helping, teaching, or providing service to others.", careers: ["Teacher", "Counselor", "Nurse", "Social Worker", "Physical Therapist"] },
      { key: "enterprising", label: "Enterprising (Persuaders)", description: "You enjoy leading, managing, and influencing others. You're drawn to business and sales.", careers: ["Entrepreneur", "Marketing Manager", "Lawyer", "Real Estate Agent", "Project Manager"] },
      { key: "conventional", label: "Conventional (Organizers)", description: "You prefer structured tasks, organization, and working with data and details.", careers: ["Accountant", "Database Admin", "Office Manager", "Financial Analyst", "Logistics Coordinator"] },
    ],
  },
  {
    id: "skills",
    title: "Skills Assessment",
    subtitle: "What are you good at?",
    icon: Wrench,
    color: "blue",
    description: "Identify your strongest skill areas to match with careers that leverage your natural abilities.",
    questions: [
      { text: "I can explain complex ideas clearly to others.", options: [
        { label: "Strongly Agree", scores: { communication: 3 } },
        { label: "Agree", scores: { communication: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { technical: 1 } },
      ]},
      { text: "I am comfortable using computers and learning new software.", options: [
        { label: "Strongly Agree", scores: { technical: 3 } },
        { label: "Agree", scores: { technical: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { creative: 1 } },
      ]},
      { text: "I am good at managing my time and staying organized.", options: [
        { label: "Strongly Agree", scores: { organizational: 3 } },
        { label: "Agree", scores: { organizational: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { creative: 1 } },
      ]},
      { text: "I enjoy coming up with original ideas or solutions.", options: [
        { label: "Strongly Agree", scores: { creative: 3 } },
        { label: "Agree", scores: { creative: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { analytical: 1 } },
      ]},
      { text: "I can analyze data and draw logical conclusions.", options: [
        { label: "Strongly Agree", scores: { analytical: 3 } },
        { label: "Agree", scores: { analytical: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { interpersonal: 1 } },
      ]},
      { text: "I work well in teams and can resolve conflicts.", options: [
        { label: "Strongly Agree", scores: { interpersonal: 3 } },
        { label: "Agree", scores: { interpersonal: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { technical: 1 } },
      ]},
      { text: "I can follow detailed instructions accurately.", options: [
        { label: "Strongly Agree", scores: { organizational: 2, analytical: 1 } },
        { label: "Agree", scores: { organizational: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { creative: 1 } },
      ]},
      { text: "I am good at presenting information to groups.", options: [
        { label: "Strongly Agree", scores: { communication: 3, interpersonal: 1 } },
        { label: "Agree", scores: { communication: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { analytical: 1 } },
      ]},
    ],
    resultCategories: [
      { key: "communication", label: "Communication", description: "Strong verbal and written skills. You excel at conveying ideas clearly.", careers: ["Public Relations", "Journalism", "Teaching", "Sales", "Technical Writing"] },
      { key: "technical", label: "Technical", description: "You're comfortable with technology, tools, and systems.", careers: ["IT Support", "Software Engineering", "Cybersecurity", "Network Admin", "Data Engineering"] },
      { key: "organizational", label: "Organizational", description: "You keep things running smoothly with structure and planning.", careers: ["Project Management", "Operations", "Event Planning", "Supply Chain", "Admin Assistant"] },
      { key: "creative", label: "Creative", description: "You think outside the box and produce original work.", careers: ["Marketing", "Product Design", "Content Creator", "Art Director", "Game Designer"] },
      { key: "analytical", label: "Analytical", description: "You break down complex problems with logic and data.", careers: ["Business Analyst", "Actuary", "Research Scientist", "Quality Assurance", "Epidemiologist"] },
      { key: "interpersonal", label: "Interpersonal", description: "You connect with people and build strong relationships.", careers: ["Human Resources", "Counseling", "Customer Success", "Community Outreach", "Mediation"] },
    ],
  },
  {
    id: "values",
    title: "Work Values",
    subtitle: "What matters to you?",
    icon: Compass,
    color: "emerald",
    description: "Understand what you value most in a work environment so you can find careers that feel right.",
    questions: [
      { text: "Having a high salary is very important to me.", options: [
        { label: "Strongly Agree", scores: { compensation: 3 } },
        { label: "Agree", scores: { compensation: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { purpose: 1 } },
      ]},
      { text: "I want a job that helps make the world a better place.", options: [
        { label: "Strongly Agree", scores: { purpose: 3 } },
        { label: "Agree", scores: { purpose: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { autonomy: 1 } },
      ]},
      { text: "Having flexible hours and work-life balance matters a lot.", options: [
        { label: "Strongly Agree", scores: { balance: 3 } },
        { label: "Agree", scores: { balance: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { advancement: 1 } },
      ]},
      { text: "I want to continuously learn and advance in my career.", options: [
        { label: "Strongly Agree", scores: { advancement: 3 } },
        { label: "Agree", scores: { advancement: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { security: 1 } },
      ]},
      { text: "Job security and stability are my top priorities.", options: [
        { label: "Strongly Agree", scores: { security: 3 } },
        { label: "Agree", scores: { security: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { autonomy: 1 } },
      ]},
      { text: "I prefer to work independently and be my own boss.", options: [
        { label: "Strongly Agree", scores: { autonomy: 3 } },
        { label: "Agree", scores: { autonomy: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { security: 1 } },
      ]},
      { text: "Being recognized and respected for my work is important.", options: [
        { label: "Strongly Agree", scores: { recognition: 3 } },
        { label: "Agree", scores: { recognition: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { balance: 1 } },
      ]},
      { text: "I want a diverse, inclusive workplace.", options: [
        { label: "Strongly Agree", scores: { purpose: 2, balance: 1 } },
        { label: "Agree", scores: { purpose: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { compensation: 1 } },
      ]},
    ],
    resultCategories: [
      { key: "compensation", label: "Compensation", description: "You prioritize strong pay and financial rewards.", careers: ["Investment Banking", "Software Engineering", "Dentistry", "Airline Pilot", "Petroleum Engineering"] },
      { key: "purpose", label: "Purpose & Impact", description: "You want meaningful work that contributes to society.", careers: ["Non-Profit Director", "Environmental Scientist", "Public Health", "Teacher", "Social Worker"] },
      { key: "balance", label: "Work-Life Balance", description: "You value flexibility, free time, and personal well-being.", careers: ["UX Researcher", "Librarian", "Data Analyst", "Technical Writer", "Web Developer"] },
      { key: "advancement", label: "Growth & Advancement", description: "You seek continuous learning and career progression.", careers: ["Management Consulting", "Product Manager", "Medical Doctor", "Research Scientist", "Attorney"] },
      { key: "security", label: "Security & Stability", description: "You prefer predictable, stable employment.", careers: ["Government Admin", "Accounting", "Nursing", "Utility Worker", "Postal Service"] },
      { key: "autonomy", label: "Autonomy & Independence", description: "You want freedom to direct your own work.", careers: ["Freelance Designer", "Consultant", "Entrepreneur", "Real Estate Agent", "Photographer"] },
      { key: "recognition", label: "Recognition", description: "You thrive on acknowledgment and professional respect.", careers: ["Attorney", "Physician", "Professor", "Executive", "Architect"] },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle Calculator",
    subtitle: "What life do you want?",
    icon: DollarSign,
    color: "amber",
    description: "Calculate your target lifestyle costs and discover careers that can support the life you envision.",
    questions: [
      { text: "What type of housing do you prefer?", options: [
        { label: "Shared apartment/roommates", scores: { housing: 1 } },
        { label: "My own apartment", scores: { housing: 2 } },
        { label: "Small house", scores: { housing: 3 } },
        { label: "Large house", scores: { housing: 4 } },
      ]},
      { text: "How do you want to get around?", options: [
        { label: "Public transit / bike", scores: { transport: 1 } },
        { label: "Used reliable car", scores: { transport: 2 } },
        { label: "New mid-range car", scores: { transport: 3 } },
        { label: "Luxury / new car", scores: { transport: 4 } },
      ]},
      { text: "How often do you eat out?", options: [
        { label: "Rarely - I cook at home", scores: { food: 1 } },
        { label: "Once or twice a week", scores: { food: 2 } },
        { label: "Several times a week", scores: { food: 3 } },
        { label: "Most meals out", scores: { food: 4 } },
      ]},
      { text: "How important is entertainment and hobbies spending?", options: [
        { label: "Minimal - free activities", scores: { entertainment: 1 } },
        { label: "Some - streaming + occasional outings", scores: { entertainment: 2 } },
        { label: "Regular - concerts, sports, travel", scores: { entertainment: 3 } },
        { label: "High - frequent travel, premium experiences", scores: { entertainment: 4 } },
      ]},
      { text: "What level of healthcare coverage do you want?", options: [
        { label: "Basic / employer-provided", scores: { healthcare: 1 } },
        { label: "Standard with dental", scores: { healthcare: 2 } },
        { label: "Comprehensive including vision", scores: { healthcare: 3 } },
        { label: "Premium - best available", scores: { healthcare: 4 } },
      ]},
      { text: "How much do you want to save each month?", options: [
        { label: "A little - just starting out", scores: { savings: 1 } },
        { label: "10-15% of income", scores: { savings: 2 } },
        { label: "20-30% of income", scores: { savings: 3 } },
        { label: "30%+ - aggressive savings", scores: { savings: 4 } },
      ]},
    ],
    resultCategories: [
      { key: "budget", label: "Budget Lifestyle", description: "Estimated need: $25,000 - $35,000/year. Modest living with roommates and public transit.", careers: ["Administrative Assistant", "Retail Manager", "Library Technician", "Child Care Worker", "Receptionist"] },
      { key: "comfortable", label: "Comfortable Lifestyle", description: "Estimated need: $45,000 - $65,000/year. Own apartment, reliable car, regular dining out.", careers: ["Registered Nurse", "Graphic Designer", "Electrician", "Police Officer", "Accountant"] },
      { key: "upscale", label: "Upscale Lifestyle", description: "Estimated need: $75,000 - $100,000/year. Nice house, new car, frequent entertainment.", careers: ["Software Developer", "Pharmacist", "Mechanical Engineer", "Financial Analyst", "Marketing Director"] },
      { key: "luxury", label: "Premium Lifestyle", description: "Estimated need: $120,000+/year. Large home, luxury vehicle, premium everything.", careers: ["Surgeon", "Corporate Attorney", "Investment Banker", "Airline Pilot", "Senior VP of Engineering"] },
    ],
  },
  {
    id: "aptitude",
    title: "Aptitude Assessment",
    subtitle: "What comes naturally?",
    icon: Brain,
    color: "purple",
    description: "Discover your natural cognitive strengths - the types of thinking and problem-solving that come easiest to you.",
    questions: [
      { text: "I can easily visualize objects in 3D and rotate them in my mind.", options: [
        { label: "Strongly Agree", scores: { spatial: 3 } },
        { label: "Agree", scores: { spatial: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { verbal: 1 } },
      ]},
      { text: "I enjoy reading and have a strong vocabulary.", options: [
        { label: "Strongly Agree", scores: { verbal: 3 } },
        { label: "Agree", scores: { verbal: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { numerical: 1 } },
      ]},
      { text: "I'm quick with numbers and mental math.", options: [
        { label: "Strongly Agree", scores: { numerical: 3 } },
        { label: "Agree", scores: { numerical: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { spatial: 1 } },
      ]},
      { text: "I pick up on patterns and sequences easily.", options: [
        { label: "Strongly Agree", scores: { logical: 3 } },
        { label: "Agree", scores: { logical: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { mechanical: 1 } },
      ]},
      { text: "I understand how machines and mechanical systems work.", options: [
        { label: "Strongly Agree", scores: { mechanical: 3 } },
        { label: "Agree", scores: { mechanical: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { verbal: 1 } },
      ]},
      { text: "I notice small details that others often miss.", options: [
        { label: "Strongly Agree", scores: { perceptual: 3 } },
        { label: "Agree", scores: { perceptual: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { logical: 1 } },
      ]},
      { text: "I can quickly spot errors in text or data.", options: [
        { label: "Strongly Agree", scores: { perceptual: 2, numerical: 1 } },
        { label: "Agree", scores: { perceptual: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { spatial: 1 } },
      ]},
      { text: "I enjoy learning new languages or word games.", options: [
        { label: "Strongly Agree", scores: { verbal: 3 } },
        { label: "Agree", scores: { verbal: 2 } },
        { label: "Neutral", scores: {} },
        { label: "Disagree", scores: { mechanical: 1 } },
      ]},
    ],
    resultCategories: [
      { key: "spatial", label: "Spatial Reasoning", description: "You think in 3D and understand spatial relationships.", careers: ["Architect", "Surgeon", "Interior Designer", "Pilot", "Civil Engineer"] },
      { key: "verbal", label: "Verbal Ability", description: "You excel with language, reading, and written communication.", careers: ["Journalist", "Attorney", "Editor", "Translator", "Speech Pathologist"] },
      { key: "numerical", label: "Numerical Ability", description: "You're comfortable with numbers, calculations, and quantitative reasoning.", careers: ["Actuary", "Accountant", "Data Scientist", "Economist", "Statistician"] },
      { key: "logical", label: "Logical Reasoning", description: "You see patterns, think sequentially, and solve abstract problems.", careers: ["Software Engineer", "Detective", "Strategist", "Mathematician", "Systems Analyst"] },
      { key: "mechanical", label: "Mechanical Reasoning", description: "You understand how physical systems and machines operate.", careers: ["Mechanical Engineer", "HVAC Technician", "Auto Mechanic", "Robotics Engineer", "Machinist"] },
      { key: "perceptual", label: "Perceptual Speed", description: "You quickly notice details, errors, and differences.", careers: ["Quality Inspector", "Proofreader", "Air Traffic Controller", "Lab Technician", "Radiologist"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Color maps                                                         */
/* ------------------------------------------------------------------ */

const colorClasses: Record<string, { bg: string; text: string; ring: string; iconBg: string; barBg: string; barFill: string }> = {
  rose: { bg: "bg-rose-50 dark:bg-rose-950/20", text: "text-rose-700 dark:text-rose-400", ring: "ring-rose-500", iconBg: "bg-rose-100 dark:bg-rose-900/30", barBg: "bg-rose-100 dark:bg-rose-900/20", barFill: "bg-rose-500" },
  blue: { bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-500", iconBg: "bg-blue-100 dark:bg-blue-900/30", barBg: "bg-blue-100 dark:bg-blue-900/20", barFill: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-700 dark:text-emerald-400", ring: "ring-emerald-500", iconBg: "bg-emerald-100 dark:bg-emerald-900/30", barBg: "bg-emerald-100 dark:bg-emerald-900/20", barFill: "bg-emerald-500" },
  amber: { bg: "bg-amber-50 dark:bg-amber-950/20", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-500", iconBg: "bg-amber-100 dark:bg-amber-900/30", barBg: "bg-amber-100 dark:bg-amber-900/20", barFill: "bg-amber-500" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-400", ring: "ring-purple-500", iconBg: "bg-purple-100 dark:bg-purple-900/30", barBg: "bg-purple-100 dark:bg-purple-900/20", barFill: "bg-purple-500" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AssessmentsPage() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [results, setResults] = useState<Record<string, Record<string, number>>>({});
  const [showResults, setShowResults] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pathready-results");
      if (saved) setResults(JSON.parse(saved));
    } catch {}
  }, []);

  // Save results to localStorage
  useEffect(() => {
    if (Object.keys(results).length > 0) {
      localStorage.setItem("pathready-results", JSON.stringify(results));
    }
  }, [results]);

  const assessment = assessments.find((a) => a.id === activeAssessment);
  const colors = assessment ? colorClasses[assessment.color] : null;

  function handleAnswer(optionIndex: number) {
    if (!assessment) return;
    const newAnswers = { ...answers, [assessment.id]: [...(answers[assessment.id] || []), optionIndex] };
    setAnswers(newAnswers);

    if (currentQ < assessment.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate results
      const scores: Record<string, number> = {};
      assessment.resultCategories.forEach((c) => (scores[c.key] = 0));
      assessment.questions.forEach((q, qi) => {
        const chosen = newAnswers[assessment.id]?.[qi];
        if (chosen !== undefined) {
          const option = q.options[chosen];
          if (option) {
            Object.entries(option.scores).forEach(([key, val]) => {
              scores[key] = (scores[key] || 0) + val;
            });
          }
        }
      });
      setResults((prev) => ({ ...prev, [assessment.id]: scores }));
      setShowResults(true);
    }
  }

  function resetAssessment() {
    if (!assessment) return;
    const newAnswers = { ...answers };
    delete newAnswers[assessment.id];
    setAnswers(newAnswers);
    const newResults = { ...results };
    delete newResults[assessment.id];
    setResults(newResults);
    localStorage.setItem("pathready-results", JSON.stringify(newResults));
    setCurrentQ(0);
    setShowResults(false);
  }

  function exitAssessment() {
    setActiveAssessment(null);
    setCurrentQ(0);
    setShowResults(false);
  }

  /* Results view */
  if (assessment && showResults && results[assessment.id]) {
    const scores = results[assessment.id];
    const maxScore = Math.max(...Object.values(scores), 1);
    const sorted = [...assessment.resultCategories].sort((a, b) => (scores[b.key] || 0) - (scores[a.key] || 0));
    const topResult = sorted[0];

    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <button onClick={exitAssessment} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700 transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to All Assessments
        </button>

        <div className={`${colors!.bg} rounded-2xl p-8 mb-8 border`}>
          <div className="flex items-center gap-3 mb-2">
            <Trophy className={`w-8 h-8 ${colors!.text}`} />
            <h1 className="text-2xl font-bold">{assessment.title} Results</h1>
          </div>
          <p className="text-muted-foreground mb-6">Your top result: <strong className={colors!.text}>{topResult.label}</strong></p>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 mb-6 border border-border">
            <h2 className="text-lg font-bold mb-2">{topResult.label}</h2>
            <p className="text-sm text-muted-foreground mb-4">{topResult.description}</p>
            <div className="flex flex-wrap gap-2">
              {topResult.careers.map((c) => (
                <span key={c} className={`text-xs px-3 py-1.5 rounded-full font-medium ${colors!.iconBg} ${colors!.text}`}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-bold mb-4">Full Score Breakdown</h3>
          <div className="space-y-3">
            {sorted.map((cat) => {
              const score = scores[cat.key] || 0;
              const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
              return (
                <div key={cat.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{cat.label}</span>
                    <span className="text-muted-foreground">{score} pts</span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${colors!.barBg}`}>
                    <div
                      className={`h-3 rounded-full ${colors!.barFill} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={resetAssessment} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition">
            <RotateCcw className="w-4 h-4" /> Retake
          </button>
          <Link href="/mvp/careers" className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 transition">
            Explore Matching Careers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* Active assessment - question view */
  if (assessment && !showResults) {
    const question = assessment.questions[currentQ];
    const progress = ((currentQ) / assessment.questions.length) * 100;
    const Icon = assessment.icon;

    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <button onClick={exitAssessment} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700 transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to All Assessments
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 ${colors!.iconBg} rounded-xl flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors!.text}`} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{assessment.title}</h1>
              <p className="text-xs text-muted-foreground">Question {currentQ + 1} of {assessment.questions.length}</p>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-4">
            <div
              className={`h-2 rounded-full ${colors!.barFill} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-8 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6 leading-relaxed">{question.text}</h2>
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all text-sm font-medium group flex items-center gap-3`}
              >
                <span className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-bold group-hover:border-blue-500 group-hover:bg-blue-700 group-hover:text-white transition-all">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {currentQ > 0 && (
          <button
            onClick={() => {
              setCurrentQ(currentQ - 1);
              const newAns = { ...answers };
              if (newAns[assessment.id]) {
                newAns[assessment.id] = newAns[assessment.id].slice(0, -1);
              }
              setAnswers(newAns);
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Question
          </button>
        )}
      </div>
    );
  }

  /* Assessment selection grid */
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8 fade-in-up">
        <h1 className="text-3xl font-bold mb-2">Career Assessments</h1>
        <p className="text-muted-foreground max-w-2xl">
          Take our suite of five research-backed assessments to discover career pathways aligned with your 
          personality, skills, values, lifestyle, and natural aptitudes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((a, i) => {
          const Icon = a.icon;
          const c = colorClasses[a.color];
          const isComplete = !!results[a.id];

          return (
            <button
              key={a.id}
              onClick={() => {
                setActiveAssessment(a.id);
                setCurrentQ(0);
                setShowResults(isComplete);
              }}
              className={`text-left bg-white dark:bg-slate-900 border border-border rounded-xl p-6 hover:shadow-lg transition-all group fade-in-up relative ${isComplete ? "ring-2 " + c.ring : ""}`}
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
            >
              {isComplete && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className={`w-6 h-6 ${c.text}`} />
                </div>
              )}
              <div className={`w-14 h-14 ${c.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${c.text}`} />
              </div>
              <h2 className="text-lg font-bold mb-1">{a.title}</h2>
              <p className="text-sm font-medium text-muted-foreground mb-3">{a.subtitle}</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{a.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{a.questions.length} questions</span>
                <span className={`text-xs font-semibold ${isComplete ? c.text : "text-blue-700 dark:text-blue-400"} flex items-center gap-1`}>
                  {isComplete ? "View Results" : "Start"} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {Object.keys(results).length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-border rounded-xl p-6 fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            <h3 className="font-bold">Your Progress</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You have completed {Object.keys(results).length} of {assessments.length} assessments.
            {Object.keys(results).length === assessments.length && (
              <span className="ml-1 font-semibold text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-4 h-4 inline" /> All complete! Visit your Dashboard to see your full profile.
              </span>
            )}
          </p>
          <div className="flex gap-2 flex-wrap">
            {assessments.map((a) => {
              const c = colorClasses[a.color];
              return (
                <span key={a.id} className={`text-xs px-3 py-1 rounded-full font-medium ${results[a.id] ? c.iconBg + " " + c.text : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"}`}>
                  {results[a.id] ? "\u2713 " : ""}{a.title}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
