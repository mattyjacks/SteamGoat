/* ------------------------------------------------------------------ */
/*  DVR Service Delivery System - Types & Data                         */
/*  Based on WA State DVR Contract Fee Schedule                        */
/* ------------------------------------------------------------------ */

/* ---- Types ---- */

export type ServiceCategory = "job-placement" | "intensive-training" | "job-retention" | "pre-ets";
export type CustomerStatus = "intake" | "active" | "placed" | "stabilized" | "retained" | "closed";
export type InvoiceStatus = "draft" | "pending" | "submitted" | "paid" | "rejected";
export type BonusType = "healthcare" | "high-wage" | "rapid-placement" | "rural-residence" | "rural-job";
export type PreEtsType = "wble-a" | "wble-b" | "wble-c" | "wrt-d" | "info-interview" | "job-shadow";

export interface ServiceFee {
  id: string;
  category: ServiceCategory;
  name: string;
  level: string;
  intakeFee: number;
  activityFee: number;
  outcomeFee: number;
  totalFee: number;
  description: string;
  requirements: string[];
}

export interface BonusDef {
  type: BonusType;
  name: string;
  amount: number;
  maxPerCustomer: number;
  trigger: string;
  docsRequired: string[];
}

export interface PreEtsService {
  type: PreEtsType;
  name: string;
  fee: number;
  duration: string;
  hours: string;
  description: string;
  maxUnits?: number;
}

export interface DVRCustomer {
  id: string;
  name: string;
  caseNumber: string;
  vrcName: string;
  sdopDate: string;
  authDate: string;
  service: ServiceCategory;
  level: string;
  status: CustomerStatus;
  workflowStage: number;
  workflowStages: string[];
  address: string;
  isRuralResident: boolean;
  jobTitle: string | null;
  employer: string | null;
  employerAddress: string | null;
  isRuralJob: boolean;
  startDate: string | null;
  wage: number | null;
  weeklyHours: number | null;
  hasHealthBenefits: boolean;
  siteVisits: number;
  interviews: number;
  daysSinceAuth: number;
  retentionDay: number;
  notes: string[];
  bonusesEarned: BonusType[];
  bonusesEligible: BonusType[];
  invoices: DVRInvoice[];
  totalBilled: number;
  totalPaid: number;
}

export interface DVRInvoice {
  id: string;
  type: string;
  amount: number;
  status: InvoiceStatus;
  dateCreated: string;
  datePaid: string | null;
  sdorAttached: boolean;
  notes: string;
}

export interface PreEtsStudent {
  id: string;
  name: string;
  school: string;
  grade: number;
  iepStatus: "active" | "504" | "none";
  disability: string;
  preEtsServices: { type: PreEtsType; status: "completed" | "in-progress" | "scheduled" }[];
  totalHours: number;
  conversionReady: boolean;
  notes: string[];
}

/* ---- Fee Schedule Data ---- */

export const serviceFees: ServiceFee[] = [
  // Job Placement
  { id: "jp-1", category: "job-placement", name: "Job Placement", level: "Level 1", intakeFee: 665, activityFee: 618, outcomeFee: 1936, totalFee: 3219, description: "Standard placement - competitive integrated employment", requirements: ["SDOP authorization", "5 site visits OR 3 interviews", "Paystub or employer letter", "Outcome SDOR"] },
  { id: "jp-2", category: "job-placement", name: "Job Placement", level: "Level 2", intakeFee: 706, activityFee: 994, outcomeFee: 2076, totalFee: 3776, description: "Enhanced placement - additional barriers to employment", requirements: ["SDOP authorization", "5 site visits OR 3 interviews", "Paystub or employer letter", "Outcome SDOR", "Barrier documentation"] },
  { id: "jp-3", category: "job-placement", name: "Job Placement", level: "Level 3", intakeFee: 746, activityFee: 1370, outcomeFee: 2216, totalFee: 4332, description: "Intensive placement - significant barriers requiring customized approach", requirements: ["SDOP authorization", "5 site visits OR 3 interviews", "Paystub or employer letter", "Outcome SDOR", "Customized plan documentation"] },

  // Intensive Training
  { id: "it-1", category: "intensive-training", name: "Intensive Training", level: "Level 1", intakeFee: 480, activityFee: 720, outcomeFee: 1440, totalFee: 2640, description: "Basic supported employment training on-site", requirements: ["Daily session logs with GPS", "Employer weekly check-in", "Skills taught documentation", "Stabilization SDOR"] },
  { id: "it-2", category: "intensive-training", name: "Intensive Training", level: "Level 2", intakeFee: 580, activityFee: 1080, outcomeFee: 2160, totalFee: 3820, description: "Moderate intensity on-site job coaching", requirements: ["Daily session logs with GPS", "Employer weekly check-in", "Skills taught documentation", "Stabilization SDOR"] },
  { id: "it-3", category: "intensive-training", name: "Intensive Training", level: "Level 3", intakeFee: 680, activityFee: 1440, outcomeFee: 3240, totalFee: 5360, description: "High intensity job coaching with behavior support", requirements: ["Daily session logs with GPS", "Employer weekly check-in", "Skills taught documentation", "Behavior support plan", "Stabilization SDOR"] },
  { id: "it-4db", category: "intensive-training", name: "Intensive Training", level: "Level 4-DB", intakeFee: 780, activityFee: 1800, outcomeFee: 4321, totalFee: 6901, description: "DeafBlind specialist intensive training", requirements: ["Daily session logs with GPS", "Employer weekly check-in", "DB-specific accommodations log", "Stabilization SDOR"] },

  // Job Retention
  { id: "jr-1", category: "job-retention", name: "Job Retention", level: "Level 1", intakeFee: 416, activityFee: 624, outcomeFee: 1248, totalFee: 2288, description: "Standard 90-day retention support", requirements: ["90-day employment verification", "Employer satisfaction survey", "All intervention logs", "Retention SDOR"] },
  { id: "jr-2", category: "job-retention", name: "Job Retention", level: "Level 2", intakeFee: 503, activityFee: 937, outcomeFee: 1873, totalFee: 3313, description: "Enhanced retention - weekly check-ins required", requirements: ["90-day employment verification", "Weekly employer surveys", "All intervention logs", "Retention SDOR"] },
  { id: "jr-3", category: "job-retention", name: "Job Retention", level: "Level 3", intakeFee: 589, activityFee: 1250, outcomeFee: 2498, totalFee: 4337, description: "Intensive retention - on-site interventions", requirements: ["90-day employment verification", "Bi-weekly employer surveys", "On-site intervention logs", "Retention SDOR"] },
  { id: "jr-4db", category: "job-retention", name: "Job Retention", level: "Level 4-DB", intakeFee: 676, activityFee: 1562, outcomeFee: 3417, totalFee: 5655, description: "DeafBlind specialist retention support", requirements: ["90-day employment verification", "DB-specific accommodation logs", "Retention SDOR"] },
];

export const bonuses: BonusDef[] = [
  { type: "healthcare", name: "Healthcare Coverage Bonus", amount: 722, maxPerCustomer: 1, trigger: "Job >= 30 hrs/wk + employer-provided health benefits", docsRequired: ["Paystub showing 30+ hrs/wk", "Employer benefits letter"] },
  { type: "high-wage", name: "High Wage Bonus", amount: 722, maxPerCustomer: 1, trigger: "Supported: 25% above min wage; Non-supported: 50% above min wage", docsRequired: ["Paystub within last 2 weeks (or employer letter at day 90)"] },
  { type: "rapid-placement", name: "Rapid Placement Bonus", amount: 535, maxPerCustomer: 1, trigger: "Job secured within 60 days of SDOP authorization", docsRequired: ["SDOP authorization date", "First day of employment date"] },
  { type: "rural-residence", name: "Rural Area Bonus (Residence)", amount: 375, maxPerCustomer: 1, trigger: "Customer lives in HRSA-defined rural area", docsRequired: ["HRSA Rural Health Tool PDF", "Address verification"] },
  { type: "rural-job", name: "Rural Area Bonus (Job Location)", amount: 375, maxPerCustomer: 1, trigger: "Job located in HRSA-defined rural area", docsRequired: ["HRSA Rural Health Tool PDF", "Employer address verification"] },
];

export const preEtsServices: PreEtsService[] = [
  { type: "wble-a", name: "WBLE-A", fee: 2123, duration: "4-6 weeks", hours: "11+ hrs/wk", description: "Introduction to paid work; builds relationship with student" },
  { type: "wble-b", name: "WBLE-B", fee: 2496, duration: "7-9 weeks", hours: "11+ hrs/wk", description: "Deeper exploration; higher employer engagement" },
  { type: "wble-c", name: "WBLE-C", fee: 2869, duration: "10-12 weeks", hours: "11+ hrs/wk", description: "Almost a placement; strong transition to Job Placement" },
  { type: "wrt-d", name: "WRT-D (Standalone)", fee: 1177, duration: "15-20 hours", hours: "Flexible", description: "Soft skills only; good for students not ready for WBLE" },
  { type: "info-interview", name: "Informational Interview", fee: 401, duration: "30-60 min each", hours: "N/A", description: "Career exploration conversations with professionals", maxUnits: 3 },
  { type: "job-shadow", name: "Job Shadow", fee: 134, duration: "1-5 hrs each", hours: "Max 10 hrs total", description: "Hands-on career observation at employer sites", maxUnits: 10 },
];

/* ---- Sample Customers ---- */

export const sampleCustomers: DVRCustomer[] = [
  {
    id: "dvr-1", name: "Maria Santos", caseNumber: "DVR-2026-1847", vrcName: "Sarah Mitchell (VRC)",
    sdopDate: "2026-03-01", authDate: "2026-03-05", service: "job-placement", level: "Level 2", status: "active",
    workflowStage: 2, workflowStages: ["Intake", "Activity", "Outcome", "Bonuses"],
    address: "123 Rural Rd, Ellensburg, WA", isRuralResident: true,
    jobTitle: null, employer: null, employerAddress: null, isRuralJob: false,
    startDate: null, wage: null, weeklyHours: null, hasHealthBenefits: false,
    siteVisits: 4, interviews: 1, daysSinceAuth: 55, retentionDay: 0,
    notes: ["4 employer site visits completed", "1 interview at Safeway - pending callback", "RAPID PLACEMENT ALERT: 5 days remaining to qualify"],
    bonusesEarned: [], bonusesEligible: ["rapid-placement", "rural-residence"],
    invoices: [
      { id: "inv-1a", type: "Intake Fee", amount: 706, status: "paid", dateCreated: "2026-03-06", datePaid: "2026-03-20", sdorAttached: true, notes: "Intake SDOR signed" },
    ],
    totalBilled: 706, totalPaid: 706,
  },
  {
    id: "dvr-2", name: "James Thompson", caseNumber: "DVR-2026-2103", vrcName: "Angela Park (VRC)",
    sdopDate: "2026-01-15", authDate: "2026-01-20", service: "job-placement", level: "Level 3", status: "placed",
    workflowStage: 3, workflowStages: ["Intake", "Activity", "Outcome", "Bonuses"],
    address: "456 Oak St, Seattle, WA", isRuralResident: false,
    jobTitle: "Warehouse Associate", employer: "Amazon FC - Kent", employerAddress: "2201 S 88th St, Kent, WA", isRuralJob: false,
    startDate: "2026-03-28", wage: 20.50, weeklyHours: 38, hasHealthBenefits: true,
    siteVisits: 7, interviews: 3, daysSinceAuth: 99, retentionDay: 0,
    notes: ["Placed at Amazon FC Kent", "Full-time + benefits", "High wage eligible (50% above min wage)", "Healthcare bonus eligible"],
    bonusesEarned: [], bonusesEligible: ["healthcare", "high-wage"],
    invoices: [
      { id: "inv-2a", type: "Intake Fee", amount: 746, status: "paid", dateCreated: "2026-01-22", datePaid: "2026-02-05", sdorAttached: true, notes: "" },
      { id: "inv-2b", type: "Activity Fee", amount: 1370, status: "paid", dateCreated: "2026-03-15", datePaid: "2026-03-28", sdorAttached: true, notes: "7 site visits documented" },
      { id: "inv-2c", type: "Outcome Fee", amount: 2216, status: "submitted", dateCreated: "2026-04-01", datePaid: null, sdorAttached: true, notes: "Paystub attached" },
    ],
    totalBilled: 4332, totalPaid: 2116,
  },
  {
    id: "dvr-3", name: "Keisha Brown", caseNumber: "DVR-2026-0891", vrcName: "David Chen (VRC)",
    sdopDate: "2026-02-10", authDate: "2026-02-15", service: "intensive-training", level: "Level 2", status: "active",
    workflowStage: 2, workflowStages: ["Intake", "On-Site Training", "Stabilization", "Extended Services Handoff"],
    address: "789 Pine Ave, Spokane, WA", isRuralResident: false,
    jobTitle: "Grocery Clerk", employer: "Fred Meyer - Spokane", employerAddress: "7525 N Division, Spokane, WA", isRuralJob: false,
    startDate: "2026-03-01", wage: 18.50, weeklyHours: 25, hasHealthBenefits: false,
    siteVisits: 0, interviews: 0, daysSinceAuth: 73, retentionDay: 0,
    notes: ["On-site coaching 3x/week", "Learning register operations", "Employer reports good progress", "Needs continued support with customer interactions"],
    bonusesEarned: [], bonusesEligible: [],
    invoices: [
      { id: "inv-3a", type: "Intake Fee", amount: 580, status: "paid", dateCreated: "2026-02-16", datePaid: "2026-03-01", sdorAttached: true, notes: "" },
      { id: "inv-3b", type: "Activity Fee", amount: 1080, status: "submitted", dateCreated: "2026-04-01", datePaid: null, sdorAttached: true, notes: "Daily logs attached" },
    ],
    totalBilled: 1660, totalPaid: 580,
  },
  {
    id: "dvr-4", name: "Tyler Nguyen", caseNumber: "DVR-2026-1455", vrcName: "Sarah Mitchell (VRC)",
    sdopDate: "2026-01-02", authDate: "2026-01-08", service: "job-retention", level: "Level 1", status: "retained",
    workflowStage: 3, workflowStages: ["Authorization", "90-Day Monitoring", "Retention Verification", "Close"],
    address: "321 Maple Dr, Olympia, WA", isRuralResident: false,
    jobTitle: "IT Help Desk", employer: "WA State DSHS", employerAddress: "PO Box 45130, Olympia, WA", isRuralJob: false,
    startDate: "2025-12-15", wage: 26.50, weeklyHours: 40, hasHealthBenefits: true,
    siteVisits: 0, interviews: 0, daysSinceAuth: 112, retentionDay: 93,
    notes: ["90-day retention achieved!", "Employer satisfaction: Excellent", "Ready for case closure", "Healthcare + high wage bonuses eligible"],
    bonusesEarned: ["healthcare", "high-wage"], bonusesEligible: [],
    invoices: [
      { id: "inv-4a", type: "Intake Fee", amount: 416, status: "paid", dateCreated: "2026-01-09", datePaid: "2026-01-25", sdorAttached: true, notes: "" },
      { id: "inv-4b", type: "Activity Fee", amount: 624, status: "paid", dateCreated: "2026-03-01", datePaid: "2026-03-15", sdorAttached: true, notes: "" },
      { id: "inv-4c", type: "Outcome Fee", amount: 1248, status: "paid", dateCreated: "2026-04-10", datePaid: "2026-04-22", sdorAttached: true, notes: "90-day verification attached" },
      { id: "inv-4d", type: "Healthcare Bonus", amount: 722, status: "paid", dateCreated: "2026-04-10", datePaid: "2026-04-22", sdorAttached: true, notes: "" },
      { id: "inv-4e", type: "High Wage Bonus", amount: 722, status: "paid", dateCreated: "2026-04-10", datePaid: "2026-04-22", sdorAttached: true, notes: "" },
    ],
    totalBilled: 3732, totalPaid: 3732,
  },
  {
    id: "dvr-5", name: "Destiny Jackson", caseNumber: "DVR-2026-2287", vrcName: "Angela Park (VRC)",
    sdopDate: "2026-04-15", authDate: "2026-04-18", service: "job-placement", level: "Level 1", status: "intake",
    workflowStage: 0, workflowStages: ["Intake", "Activity", "Outcome", "Bonuses"],
    address: "567 Birch Ln, Walla Walla, WA", isRuralResident: true,
    jobTitle: null, employer: null, employerAddress: null, isRuralJob: false,
    startDate: null, wage: null, weeklyHours: null, hasHealthBenefits: false,
    siteVisits: 0, interviews: 0, daysSinceAuth: 11, retentionDay: 0,
    notes: ["New intake - initial meeting scheduled", "Rural resident (Walla Walla)", "Interested in healthcare careers"],
    bonusesEarned: [], bonusesEligible: ["rural-residence"],
    invoices: [],
    totalBilled: 0, totalPaid: 0,
  },
];

/* ---- Sample Pre-ETS Students ---- */

export const sampleStudents: PreEtsStudent[] = [
  {
    id: "stu-1", name: "Aiden Cruz", school: "Lincoln HS", grade: 11, iepStatus: "active", disability: "Autism Spectrum",
    preEtsServices: [
      { type: "wrt-d", status: "completed" },
      { type: "info-interview", status: "completed" },
      { type: "wble-a", status: "completed" },
      { type: "wble-b", status: "in-progress" },
    ],
    totalHours: 68, conversionReady: false,
    notes: ["Strong interest in IT", "Completing WBLE-B at local tech company", "On track for WBLE-C next quarter"],
  },
  {
    id: "stu-2", name: "Brianna Lopez", school: "Roosevelt HS", grade: 12, iepStatus: "active", disability: "Intellectual Disability",
    preEtsServices: [
      { type: "wrt-d", status: "completed" },
      { type: "wble-a", status: "completed" },
      { type: "wble-b", status: "completed" },
      { type: "wble-c", status: "completed" },
      { type: "job-shadow", status: "completed" },
    ],
    totalHours: 142, conversionReady: true,
    notes: ["WBLE-C completed - ready for Job Placement referral!", "Excelled at grocery store WBLE", "Graduating June 2026", "VRC referral initiated"],
  },
  {
    id: "stu-3", name: "Cameron White", school: "Garfield HS", grade: 10, iepStatus: "504", disability: "ADHD + Anxiety",
    preEtsServices: [
      { type: "info-interview", status: "completed" },
      { type: "job-shadow", status: "completed" },
      { type: "wrt-d", status: "in-progress" },
    ],
    totalHours: 18, conversionReady: false,
    notes: ["Building confidence through soft skills", "Interested in culinary arts", "Job shadow at local restaurant was successful"],
  },
  {
    id: "stu-4", name: "Destiny Okafor", school: "Ballard HS", grade: 11, iepStatus: "active", disability: "Learning Disability",
    preEtsServices: [
      { type: "wble-a", status: "completed" },
      { type: "wble-b", status: "scheduled" },
    ],
    totalHours: 52, conversionReady: false,
    notes: ["WBLE-A completed at animal shelter", "Very motivated", "WBLE-B placement being arranged at vet clinic"],
  },
  {
    id: "stu-5", name: "Ethan Park", school: "Eastside Academy", grade: 12, iepStatus: "active", disability: "Deaf/Hard of Hearing",
    preEtsServices: [
      { type: "info-interview", status: "completed" },
      { type: "wble-a", status: "completed" },
      { type: "wble-b", status: "completed" },
      { type: "wble-c", status: "in-progress" },
    ],
    totalHours: 110, conversionReady: false,
    notes: ["ASL interpreter provided for all services", "WBLE-C at Starbucks corporate office", "Strong candidate for Level 4-DB services post-graduation"],
  },
];

/* ---- Quality Metrics Targets ---- */

export const qualityTargets = {
  sdorSubmission30Days: { target: 100, label: "SDOR submission within 30 days" },
  bonusCaptureRate: { target: 80, label: "Bonus capture rate (of eligible)" },
  firstAttemptInvoice: { target: 95, label: "First-attempt invoice acceptance" },
  preEtsConversion: { target: 40, label: "Pre-ETS to Job Placement conversion" },
  staffTrainingCompliance: { target: 100, label: "Staff training compliance (13 courses)" },
};
