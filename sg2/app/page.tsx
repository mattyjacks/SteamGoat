import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Award, Code, CheckCircle2, Shield, ArrowRight, Target, Lock, Briefcase, TrendingUp, Users, FileText, Download, Building2, BadgeCheck, Sparkles, BookOpen, ClipboardCheck, ArrowLeftRight, Clock } from "lucide-react";
import Image from "next/image";
import { InteractiveLogo } from "@/components/interactive-logo";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <nav aria-label="Primary navigation" className="w-full flex justify-center border-b border-border h-20 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg z-50 shadow-sm fade-in">
        <div className="w-full max-w-7xl flex justify-between items-center px-5">
          <Link href="/" aria-label="SteamGOAT - Home" className="flex gap-3 items-center font-bold text-2xl hover:opacity-90 transition group">
            <div className="w-10 h-10 relative group-hover:scale-105 transition-transform duration-300">
              <Image src="/steamgoat-logo-1a.png" alt="SteamGOAT Logo" width={40} height={40} className="w-full h-full object-contain" priority />
            </div>
            <div>
              <div className="text-blue-700 dark:text-blue-400">SteamGOAT</div>
              <div className="text-[10px] text-muted-foreground font-normal tracking-wider uppercase">OMWBE/WOSB Certified</div>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/govcon" className="text-sm font-medium hover:text-blue-700 transition">GovCon Hub</Link>
            <Link href="#services" className="text-sm font-medium hover:text-blue-700 transition">Services</Link>
            <Link href="/products" className="text-sm font-medium hover:text-blue-700 transition">Products</Link>
            <Link href="/mvp" className="text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition flex items-center gap-1">PathReady <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded font-bold">MVP</span></Link>
            <Link href="/verify" className="text-sm font-medium hover:text-blue-700 transition">Verify</Link>
            <Link href="#contact" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition shadow-sm">Contact Us</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex flex-col items-center">
        {/* Trust Badge Bar */}
        <div className="w-full bg-blue-900 dark:bg-blue-950 text-white py-3 fade-in" role="banner">
          <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium tracking-wide">
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-green-400" aria-hidden="true" /> OMWBE Certified</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-green-400" aria-hidden="true" /> PWSBE Auto-Certified</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-green-400" aria-hidden="true" /> WOSB Certified</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-green-400" aria-hidden="true" /> SAM Registered</span>
            <span className="text-blue-300">UEI: EXAMPLE1234567 | CAGE: 2G7K5</span>
          </div>
        </div>

        {/* Hero - 5 Second Credibility Pitch */}
        <section className="w-full py-20 lg:py-28 relative overflow-hidden" aria-label="Company overview">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/10 rounded-full blur-3xl float" style={{animationDelay: '1.5s'}}></div>
          </div>
          <div className="max-w-7xl mx-auto px-5 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-4 py-1.5 rounded-md mb-6 font-semibold text-xs tracking-wider uppercase fade-in-down">
                  <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                  Washington State OMWBE/PWSBE Certified Contractor
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight fade-in-up" style={{animationDelay: '0.1s'}}>
                  Certified Women-Owned<br />Government Contractor
                </h1>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed fade-in-up max-w-xl" style={{animationDelay: '0.2s'}}>
                  SteamGOAT delivers mission-critical software development, IT systems design, advanced manufacturing, 
                  and facilities support for state and federal agencies.
                </p>
                <p className="text-sm text-muted-foreground mb-8 fade-in-up font-mono" style={{animationDelay: '0.25s'}}>
                  NAICS: 541511 | 541512 | 541519 | 561210 | 561311 | 561320 | 561621
                </p>
                <div className="flex gap-3 flex-wrap mb-8 fade-in-up" style={{animationDelay: '0.3s'}}>
                  <Link href="/govcon" className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm group">
                    GovCon Hub <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                  <Link href="/capability-statement" className="border-2 border-blue-700 text-blue-700 dark:text-blue-400 dark:border-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/30 transition flex items-center gap-2 group">
                    <Download className="w-4 h-4" aria-hidden="true" /> Capability Statement
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-6 fade-in-up" style={{animationDelay: '0.4s'}}>
                  <div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">50+</div>
                    <div className="text-xs text-muted-foreground">Product Lines</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">$25M+</div>
                    <div className="text-xs text-muted-foreground">Bonding Capacity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">4</div>
                    <div className="text-xs text-muted-foreground">NAICS Codes</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center fade-in-up" style={{animationDelay: '0.15s'}}>
                <InteractiveLogo />
              </div>
            </div>
          </div>
        </section>

        {/* MVP Showcase Section */}
        <section className="w-full py-20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-y border-emerald-200 dark:border-emerald-800/30" aria-label="PathReady MVP Platform">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-4 py-1.5 rounded-md mb-6 font-semibold text-xs tracking-wider uppercase fade-in-down">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Featured Product
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-slate-900 dark:text-white">PathReady MVP Platform</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A comprehensive career readiness and DVR service delivery platform for high school students, individuals with disabilities, and workforce development programs. WCAG 2.1 AA compliant, Section 508 accessible, and government-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">5 Career Assessments</h3>
                    <p className="text-sm text-muted-foreground">Research-backed assessments covering interests, skills, values, lifestyle, and aptitudes to discover matching career pathways.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">100+ Career Profiles</h3>
                    <p className="text-sm text-muted-foreground">Browse careers with real 2026 salary data, education requirements, growth outlook, and day-in-the-life descriptions.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">20+ Learning Modules</h3>
                    <p className="text-sm text-muted-foreground">Self-paced employability skills training covering resume writing, interview prep, workplace communication, and financial literacy.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ArrowLeftRight className="w-6 h-6 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Transition Planning</h3>
                    <p className="text-sm text-muted-foreground">IEP/504 aligned transition readiness tracking across employment, education, and independent living domains.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">DVR Service Delivery</h3>
                    <p className="text-sm text-muted-foreground">Complete DVR system with job placement, training, retention, Pre-ETS pipeline, bonus tracking, and SDOR-ready billing.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-emerald-200 dark:border-emerald-800/50 shadow-lg">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <span className="font-semibold text-slate-900 dark:text-white">Active Customers</span>
                    <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">247</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <span className="font-semibold text-slate-900 dark:text-white">Placement Rate</span>
                    <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">78.4%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <span className="font-semibold text-slate-900 dark:text-white">FY Revenue</span>
                    <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">$847K</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <span className="font-semibold text-slate-900 dark:text-white">Bonus Capture</span>
                    <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">82.1%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg p-6 text-white">
                  <p className="text-sm font-semibold mb-4 opacity-90">Admin Dashboard & Analytics</p>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Real-time KPI tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Revenue & placement analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Alerts & performance tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Invoice & bonus management</span>
                    </div>
                  </div>
                  <Link href="/mvp/admin" className="block w-full bg-white text-emerald-700 font-semibold py-2 rounded-lg text-center hover:bg-emerald-50 transition">
                    Access Admin Portal
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/mvp" className="bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-all flex items-center gap-2 shadow-md group">
                Explore PathReady <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
              <Link href="/mvp/admin" className="border-2 border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition">
                Admin Portal
              </Link>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section id="certifications" className="w-full py-20 bg-slate-50 dark:bg-slate-900/50" aria-label="Certifications">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Certifications & Set-Aside Eligibility</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Fully certified for OMWBE and PWSBE set-aside contracts at state and federal levels</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 text-center hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Award className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-1">OMWBE</h3>
                <p className="text-sm text-muted-foreground mb-2">Office of Minority & Women's Business Enterprises</p>
                <div className="text-xs font-mono text-blue-700 dark:text-blue-400">WA State Certified</div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 text-center hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200">
                  <BadgeCheck className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-1">PWSBE</h3>
                <p className="text-sm text-muted-foreground mb-2">Preferred Women's Small Business Enterprise</p>
                <div className="text-xs font-mono text-blue-700 dark:text-blue-400">Auto-Certified via OMWBE</div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 text-center hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Shield className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-1">WOSB</h3>
                <p className="text-sm text-muted-foreground mb-2">Women-Owned Small Business (SBA)</p>
                <div className="text-xs font-mono text-blue-700 dark:text-blue-400">WOSB-2024-0087543</div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 text-center hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Lock className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-1">SAM.gov</h3>
                <p className="text-sm text-muted-foreground mb-2">System for Award Management</p>
                <div className="text-xs font-mono text-blue-700 dark:text-blue-400">CAGE: 2G7K5</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services / NAICS Codes */}
        <section id="services" className="w-full py-20" aria-label="Services and NAICS codes">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Core NAICS Capabilities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Primary service areas registered for state and federal government contracting</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Code className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold">Custom Computer Programming</h3>
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">541511</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Enterprise-grade custom software, RDAP system programming, AI tools, and application development for government agencies.</p>
                    <ul className="flex flex-wrap gap-2 text-xs">
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Custom Software</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">AI Tools</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Web Applications</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Target className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold">Computer Systems Design</h3>
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">541512</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">System architecture design, IT infrastructure consulting, AI integration, and strategic technology planning.</p>
                    <ul className="flex flex-wrap gap-2 text-xs">
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Architecture</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">AI Integration</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Briefcase className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold">Other Computer Related Services</h3>
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">541519</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Software licensing, IT support and maintenance, AI tool deployment, training programs, and technical documentation.</p>
                    <ul className="flex flex-wrap gap-2 text-xs">
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Licensing</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">IT Support</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">AI Deployment</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Building2 className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold">Facilities & Staffing Support</h3>
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">561210</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Comprehensive facilities management, compound staffing model, operations support, and base operations services.</p>
                    <ul className="flex flex-wrap gap-2 text-xs">
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Facilities Mgmt</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Staffing</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Operations</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Users className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold">Permanent & Temporary Staffing</h3>
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">561311/561320</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Facility personnel, security guards, transport crews, and emergency response staffing for government compounds.</p>
                    <ul className="flex flex-wrap gap-2 text-xs">
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Permanent Staff</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Temporary Staff</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Security</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-border rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-500 fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Lock className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold">Security Systems & Monitoring</h3>
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">561621</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Security systems design, installation, monitoring services, access control, and threat detection for government facilities.</p>
                    <ul className="flex flex-wrap gap-2 text-xs">
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Installation</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Monitoring</li>
                      <li className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Access Control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="w-full py-20 bg-slate-50 dark:bg-slate-900/50" aria-label="About SteamGOAT">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">About SteamGOAT</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Greatest Of All Time Under Pressure</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-border fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  <h3 className="text-lg font-bold">Company Overview</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  SteamGOAT is an OMWBE-certified, women-owned small business based in Washington State specializing 
                  in government contracting. We deliver software, manufacturing, and facilities support for state 
                  and federal agencies with a commitment to quality and compliance.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-border fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  <h3 className="text-lg font-bold">Leadership</h3>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-4 border border-blue-200 dark:border-blue-800">
                  <p className="font-bold mb-0.5">Joy Smith</p>
                  <p className="text-blue-700 dark:text-blue-400 font-semibold text-sm mb-2">CEO & Owner (75%)</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Black woman entrepreneur delivering exceptional government contracting solutions with 
                    unwavering commitment to ethics, quality, and mission success.
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-border fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  <h3 className="text-lg font-bold">Ethical Labor Program</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We partner with NH Correctional Facilities to provide ethical, dignified work opportunities. 
                  Our program ensures fair compensation, skills development, and full compliance with federal 
                  labor regulations while supporting rehabilitation and reintegration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full py-20" aria-label="Contact information">
          <div className="max-w-4xl mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Ready to Work With Us?</h2>
              <p className="text-muted-foreground">Contact SteamGOAT for your next government contract</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-border text-center hover:shadow-md transition-shadow">
                <Briefcase className="w-5 h-5 text-blue-700 dark:text-blue-400 mx-auto mb-3" aria-hidden="true" />
                <p className="font-bold text-sm mb-1">Location</p>
                <p className="text-sm text-muted-foreground">Washington State, USA</p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-border text-center hover:shadow-md transition-shadow">
                <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400 mx-auto mb-3" aria-hidden="true" />
                <p className="font-bold text-sm mb-1">Email</p>
                <a href="mailto:info@steamgoat.com" className="text-sm text-blue-700 dark:text-blue-400 hover:underline font-semibold">info@steamgoat.com</a>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-border text-center hover:shadow-md transition-shadow">
                <FileText className="w-5 h-5 text-blue-700 dark:text-blue-400 mx-auto mb-3" aria-hidden="true" />
                <p className="font-bold text-sm mb-1">Registration</p>
                <p className="text-sm text-muted-foreground font-mono">UEI: EXAMPLE1234567</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="mailto:info@steamgoat.com" className="bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-all inline-flex items-center gap-2 shadow-sm">
                Request a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/capability-statement" className="border-2 border-blue-700 text-blue-700 dark:text-blue-400 dark:border-blue-500 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/30 transition inline-flex items-center gap-2">
                <Download className="w-4 h-4" aria-hidden="true" /> Download Capability Statement
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-border py-12 bg-slate-50 dark:bg-slate-950" role="contentinfo">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="text-left">
                <div className="flex gap-3 items-center font-bold text-lg mb-3">
                  <div className="w-10 h-10 relative">
                    <Image src="/steamgoat-logo-1a.png" alt="SteamGOAT Logo" width={40} height={40} className="w-full h-full object-contain" />
                  </div>
                  <span>SteamGOAT</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Greatest Of All Time Under Pressure</p>
                <p className="text-xs text-muted-foreground font-mono">UEI: EXAMPLE1234567</p>
                <p className="text-xs text-muted-foreground font-mono">CAGE: 2G7K5</p>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm mb-3">Quick Links</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/govcon" className="hover:text-blue-700 transition">GovCon Hub</Link></li>
                  <li><Link href="/products" className="hover:text-blue-700 transition">Products</Link></li>
                  <li><Link href="/mvp" className="hover:text-emerald-600 transition font-medium text-emerald-700 dark:text-emerald-400">PathReady MVP</Link></li>
                  <li><Link href="/verify" className="hover:text-blue-700 transition">Verify Credentials</Link></li>
                  <li><Link href="/capability-statement" className="hover:text-blue-700 transition">Capability Statement</Link></li>
                </ul>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm mb-3">Certifications</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>OMWBE Certified</li>
                  <li>PWSBE Auto-Certified</li>
                  <li>WOSB (SBA)</li>
                  <li>SAM Registered</li>
                  <li>ISO 9001:2015</li>
                </ul>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm mb-3">NAICS Codes</p>
                <ul className="space-y-2 text-sm text-muted-foreground font-mono">
                  <li>541511 - Programming</li>
                  <li>541512 - Systems Design</li>
                  <li>541519 - IT Services</li>
                  <li>561210 - Facilities Support</li>
                  <li>561311 - Permanent Staffing</li>
                  <li>561320 - Temporary Staffing</li>
                  <li>561621 - Security Systems</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 flex flex-wrap justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                &copy; 2024 SteamGOAT LLC. All rights reserved. OMWBE/WOSB Certified | Washington State
              </p>
              <p className="text-xs text-muted-foreground">
                <Link href="/privacy" className="hover:text-blue-700 transition">Privacy Policy</Link>
                {" | "}
                <Link href="/verify" className="hover:text-blue-700 transition">Verify Credentials</Link>
                {" | "}
                <Link href="/govcon" className="hover:text-blue-700 transition">GovCon Hub</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
