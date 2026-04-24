import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Award, Code, Zap, Users, CheckCircle2, Shield, ArrowRight, Rocket, Target, Lock, Briefcase, TrendingUp } from "lucide-react";
import Image from "next/image";
import { InteractiveLogo } from "@/components/interactive-logo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      <nav className="w-full flex justify-center border-b border-blue-200/20 dark:border-blue-900/20 h-20 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 shadow-sm fade-in">
        <div className="w-full max-w-7xl flex justify-between items-center px-5">
          <Link href="/" className="flex gap-3 items-center font-bold text-2xl hover:opacity-80 transition group">
            <div className="w-10 h-10 relative group-hover:scale-110 transition-transform duration-300">
              <Image 
                src="/steamgoat-logo-1a.png" 
                alt="SteamGOAT Logo" 
                width={40} 
                height={40}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div>
              <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 transition">SteamGOAT</div>
              <div className="text-xs text-muted-foreground font-normal">Greatest Of All Time</div>
            </div>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium hover:text-blue-600 transition">Services</Link>
            <Link href="/products" className="text-sm font-medium hover:text-blue-600 transition">Products</Link>
            <Link href="/verify" className="text-sm font-medium hover:text-blue-600 transition">Verify</Link>
            <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition">About</Link>
            <Link href="#contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg">Contact</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex flex-col items-center">
        <section className="w-full py-32 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl float" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6 font-semibold text-sm fade-in-down">
              <Rocket className="w-4 h-4 animate-bounce" />
              WOSB Certified Defense Contractor
            </div>
            
            <div className="flex justify-center mb-12 fade-in-up" style={{animationDelay: '0.1s'}}>
              <InteractiveLogo />
            </div>

            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent fade-in-up" style={{animationDelay: '0.2s'}}>
              Greatest Of All Time<br />Under Pressure
            </h1>
            <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up" style={{animationDelay: '0.4s'}}>
              Mission-critical manufacturing, software development, and tactical systems for government and defense. 
              Delivering excellence when it matters most.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-12 fade-in-up" style={{animationDelay: '0.6s'}}>
              <Link 
                href="#contact"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 shadow-md group"
              >
                Start a Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/products"
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/30 transition flex items-center gap-2 group"
              >
                View Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center fade-in-up scale-in" style={{animationDelay: '0.8s'}}>
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-muted-foreground">Product Categories</div>
              </div>
              <div className="text-center fade-in-up scale-in" style={{animationDelay: '1s'}}>
                <div className="text-3xl font-bold text-blue-600">8</div>
                <div className="text-sm text-muted-foreground">Certifications</div>
              </div>
              <div className="text-center fade-in-up scale-in" style={{animationDelay: '1.2s'}}>
                <div className="text-3xl font-bold text-blue-600">$25M+</div>
                <div className="text-sm text-muted-foreground">Bonding Capacity</div>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="w-full py-24 bg-gradient-to-b from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Certifications & Credentials</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Fully certified and compliant with all federal contracting requirements</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center hover:shadow-xl transition-all hover:border-blue-400 dark:hover:border-blue-600 fade-in-up scale-in" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:pulse-glow">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">WOSB Certified</h3>
                <p className="text-muted-foreground mb-4">Women-Owned Small Business certification for government contracting</p>
                <div className="text-sm font-mono text-blue-600">WOSB-2024-0087543</div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center hover:shadow-xl transition-all hover:border-blue-400 dark:hover:border-blue-600 fade-in-up scale-in" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:pulse-glow">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">SAM Registered</h3>
                <p className="text-muted-foreground mb-4">System for Award Management registered and compliant</p>
                <div className="text-sm font-mono text-blue-600">CAGE-2G7K5</div>
              </div>
              <div className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center hover:shadow-xl transition-all hover:border-blue-400 dark:hover:border-blue-600 fade-in-up scale-in" style={{animationDelay: '0.6s'}}>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:pulse-glow">
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Ethical Practices</h3>
                <p className="text-muted-foreground mb-4">Committed to ethical labor practices and compliance</p>
                <div className="text-sm font-mono text-blue-600">ELP-2024-087543</div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-24">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Government Contracting Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Specialized services across three core NAICS codes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 hover:shadow-xl transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-1 fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Computer Programming</h3>
                <p className="text-blue-600 font-mono text-sm mb-4 font-semibold">NAICS 541511</p>
                <p className="text-muted-foreground mb-6">Enterprise-grade custom software development and system programming</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Custom software development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>RDAP system programming</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Application development</span>
                  </li>
                </ul>
              </div>

              <div className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 hover:shadow-xl transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-1 fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">System Architecture & Design</h3>
                <p className="text-blue-600 font-mono text-sm mb-4 font-semibold">NAICS 541512</p>
                <p className="text-muted-foreground mb-6">Strategic IT consulting and infrastructure design</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>System architecture design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>IT consulting services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Infrastructure planning</span>
                  </li>
                </ul>
              </div>

              <div className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 hover:shadow-xl transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-1 fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">IT Support & Services</h3>
                <p className="text-blue-600 font-mono text-sm mb-4 font-semibold">NAICS 541519</p>
                <p className="text-muted-foreground mb-6">Comprehensive IT support and operational services</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Software licenses & management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>IT support & maintenance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Training & documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-24 bg-gradient-to-b from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">About SteamGOAT</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Mission-driven defense contractor committed to excellence and ethics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold">Company Overview</h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  SteamGOAT is a women-owned small business (WOSB) specializing in government contracting solutions. 
                  Based in Washington State, we deliver excellence under pressure with a commitment to quality, 
                  compliance, and ethical business practices.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to provide innovative software development, advanced manufacturing, and tactical systems 
                  that meet the highest standards of government contracting requirements.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold">Leadership</h3>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <p className="font-bold text-lg mb-1">Joy Smith</p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">CEO & Owner (75%)</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Joy Smith leads SteamGOAT with a vision of delivering exceptional government contracting 
                    solutions. As a Black woman entrepreneur, she brings diverse perspectives and unwavering commitment to 
                    ethical business practices, quality excellence, and mission success.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-10 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Ethical Labor Practices</h3>
              </div>
              <p className="mb-4 leading-relaxed">
                SteamGOAT is committed to ethical labor practices in all operations. We partner with correctional 
                facilities in New Hampshire to provide meaningful work opportunities while maintaining the highest 
                standards of worker treatment, fair compensation, and human dignity.
              </p>
              <p className="leading-relaxed">
                Our approach ensures compliance with all federal regulations while supporting rehabilitation and 
                reintegration efforts, creating positive outcomes for all stakeholders.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-24 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-4xl mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Ready to Work With Us?</h2>
              <p className="text-xl text-muted-foreground">Contact SteamGOAT today to discuss your government contracting needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-bold mb-2">Location</p>
                <p className="text-muted-foreground">Washington State, USA</p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-bold mb-2">Email</p>
                <a href="mailto:info@steamgoat.gov" className="text-blue-600 hover:underline font-semibold">
                  info@steamgoat.gov
                </a>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-bold mb-2">SAM Registration</p>
                <p className="text-muted-foreground font-mono text-sm">CAGE-2G7K5</p>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2 shadow-md">
                Request a Quote <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        <footer className="w-full border-t border-gray-200 dark:border-gray-800 mx-auto text-center py-12 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="text-left">
                <div className="flex gap-3 items-center font-bold text-lg mb-4">
                  <div className="w-12 h-12 relative">
                    <Image 
                      src="/steamgoat-logo-1a.png" 
                      alt="SteamGOAT Logo" 
                      width={48} 
                      height={48}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <span>SteamGOAT</span>
                </div>
                <p className="text-sm text-muted-foreground">Greatest Of All Time Under Pressure</p>
              </div>
              <div className="text-left">
                <p className="font-semibold mb-3">Quick Links</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/#services" className="hover:text-blue-600 transition">Services</Link></li>
                  <li><Link href="/products" className="hover:text-blue-600 transition">Products</Link></li>
                  <li><Link href="/verify" className="hover:text-blue-600 transition">Verify</Link></li>
                </ul>
              </div>
              <div className="text-left">
                <p className="font-semibold mb-3">Certifications</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>WOSB Certified</li>
                  <li>SAM Registered</li>
                  <li>ISO 9001:2015</li>
                </ul>
              </div>
              <div className="text-left">
                <p className="font-semibold mb-3">Contact</p>
                <p className="text-sm text-muted-foreground mb-2">Washington State, USA</p>
                <a href="mailto:info@steamgoat.gov" className="text-sm text-blue-600 hover:underline">info@steamgoat.gov</a>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <p className="text-sm text-muted-foreground">
                © 2024 SteamGOAT. All rights reserved. WOSB Certified | Washington State
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
