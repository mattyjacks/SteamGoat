'use client';

export function CapabilityStatementDoc() {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-5 print:my-0 print:px-0 print:max-w-none">
      <div className="bg-white dark:bg-slate-900 border border-border rounded-lg shadow-sm print:shadow-none print:border-none print:rounded-none" style={{ minHeight: '11in' }}>
        
        {/* Header */}
        <div className="bg-blue-900 text-white p-8 print:p-6 rounded-t-lg print:rounded-none">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">SteamGOAT</h1>
              <p className="text-blue-200 text-sm font-semibold">Greatest Of All Time Under Pressure</p>
              <p className="text-blue-300 text-xs mt-2">OMWBE / PWSBE / WOSB Certified Government Contractor</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-bold">Capability Statement</p>
              <p className="text-blue-200 text-xs">Washington State, USA</p>
              <p className="text-blue-200 text-xs mt-1">info@steamgoat.com</p>
              <p className="text-blue-200 text-xs">steamgoat.com</p>
            </div>
          </div>
        </div>

        <div className="p-8 print:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 print:gap-4 text-sm">
          
          {/* Left Column - 2/3 width */}
          <div className="md:col-span-2 space-y-6 print:space-y-4">
            
            {/* Company Overview */}
            <div>
              <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400 pb-1 mb-3">Company Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                SteamGOAT is an OMWBE-certified, women-owned small business (WOSB) based in Washington State, 
                specializing in custom software development, computer systems design, IT services, advanced 
                manufacturing, and facilities support for state and federal government agencies. We deliver 
                mission-critical solutions with a commitment to quality, compliance, and ethical business practices.
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400 pb-1 mb-3">Core Competencies</h2>
              <div className="grid grid-cols-2 gap-3">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> Custom Software Development</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> System Architecture & Design</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> IT Consulting & Support</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> RDAP System Programming</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> Cloud Migration & Strategy</li>
                </ul>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> Facilities Support Services</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> Advanced Manufacturing</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> Tactical Equipment Production</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> Training & Documentation</li>
                  <li className="flex items-start gap-1.5"><span className="text-blue-700 font-bold mt-0.5">-</span> Software Licensing Mgmt</li>
                </ul>
              </div>
            </div>

            {/* NAICS Codes */}
            <div>
              <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400 pb-1 mb-3">NAICS Codes</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex gap-2"><span className="font-mono font-bold text-blue-700 dark:text-blue-400">541511</span><span className="text-muted-foreground">Custom Computer Programming</span></div>
                <div className="flex gap-2"><span className="font-mono font-bold text-blue-700 dark:text-blue-400">541512</span><span className="text-muted-foreground">Computer Systems Design</span></div>
                <div className="flex gap-2"><span className="font-mono font-bold text-blue-700 dark:text-blue-400">541519</span><span className="text-muted-foreground">Other Computer Services</span></div>
                <div className="flex gap-2"><span className="font-mono font-bold text-blue-700 dark:text-blue-400">561210</span><span className="text-muted-foreground">Facilities Support Services</span></div>
                <div className="flex gap-2"><span className="font-mono font-bold text-muted-foreground">334111</span><span className="text-muted-foreground">Electronic Computer Mfg</span></div>
                <div className="flex gap-2"><span className="font-mono font-bold text-muted-foreground">334220</span><span className="text-muted-foreground">Broadcasting Equipment</span></div>
                <div className="flex gap-2"><span className="font-mono font-bold text-muted-foreground">334310</span><span className="text-muted-foreground">Audio & Video Equipment</span></div>
                <div className="flex gap-2"><span className="font-mono font-bold text-muted-foreground">332993</span><span className="text-muted-foreground">Ammunition Manufacturing</span></div>
              </div>
            </div>

            {/* Past Performance */}
            <div>
              <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400 pb-1 mb-3">Past Performance</h2>
              <div className="space-y-3">
                <div className="border-l-2 border-blue-700 pl-3">
                  <p className="font-bold text-sm">Enterprise Software Development - WA Dept. of Enterprise Services</p>
                  <p className="text-xs text-muted-foreground">NAICS 541511 | $1.2M | 2024-Present | Active</p>
                </div>
                <div className="border-l-2 border-blue-700 pl-3">
                  <p className="font-bold text-sm">IT Infrastructure Modernization - GSA</p>
                  <p className="text-xs text-muted-foreground">NAICS 541512 | $850K | 2024-Present | Active</p>
                </div>
                <div className="border-l-2 border-blue-700 pl-3">
                  <p className="font-bold text-sm">Technical Training & Support - VA</p>
                  <p className="text-xs text-muted-foreground">NAICS 541519 | $425K | 2024-Present | Active</p>
                </div>
                <div className="border-l-2 border-blue-700 pl-3">
                  <p className="font-bold text-sm">Tactical Equipment Manufacturing - DoD DISA</p>
                  <p className="text-xs text-muted-foreground">NAICS 334111 | $2.1M | 2024-Present | Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6 print:space-y-4">
            
            {/* Registration */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-4 border border-blue-200 dark:border-blue-800">
              <h2 className="font-bold text-sm text-blue-900 dark:text-blue-400 mb-3">Registration</h2>
              <div className="space-y-2 text-xs">
                <div><span className="text-muted-foreground">UEI:</span> <span className="font-mono font-bold">EXAMPLE1234567</span></div>
                <div><span className="text-muted-foreground">CAGE:</span> <span className="font-mono font-bold">2G7K5</span></div>
                <div><span className="text-muted-foreground">Size:</span> <span className="font-bold">Small Business</span></div>
                <div><span className="text-muted-foreground">Bonding:</span> <span className="font-bold">$25M+</span></div>
              </div>
            </div>

            {/* Set-Aside Eligibility */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-4 border border-green-200 dark:border-green-800">
              <h2 className="font-bold text-sm text-green-900 dark:text-green-400 mb-3">Set-Aside Eligibility</h2>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span> OMWBE (WA State)</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span> PWSBE (Auto-Certified)</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span> WOSB (SBA)</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span> SBA 8(a)</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span> Small Business</li>
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="font-bold text-sm text-blue-900 dark:text-blue-400 mb-3">Certifications</h2>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>OMWBE Certified</li>
                <li>WOSB Certified</li>
                <li>SBA 8(a) Program</li>
                <li>SAM.gov Registered</li>
                <li>ISO 9001:2015</li>
                <li>ISO 27001</li>
                <li>CMMC Level 2</li>
              </ul>
            </div>

            {/* Differentiators */}
            <div>
              <h2 className="font-bold text-sm text-blue-900 dark:text-blue-400 mb-3">Differentiators</h2>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>Women-owned (75% - Joy Smith)</li>
                <li>Washington State based</li>
                <li>$25M+ bonding capacity</li>
                <li>50+ product categories</li>
                <li>Ethical labor program</li>
                <li>MIL-SPEC manufacturing</li>
                <li>Full SDLC capability</li>
              </ul>
            </div>

            {/* Leadership */}
            <div>
              <h2 className="font-bold text-sm text-blue-900 dark:text-blue-400 mb-3">Leadership</h2>
              <div className="text-xs text-muted-foreground">
                <p className="font-bold text-foreground">Joy Smith</p>
                <p>CEO & Owner (75%)</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-4">
              <h2 className="font-bold text-sm mb-2">Contact</h2>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>info@steamgoat.com</p>
                <p>steamgoat.com</p>
                <p>Washington State, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
