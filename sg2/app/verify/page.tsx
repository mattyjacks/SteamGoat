import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { CheckCircle2, FileText, Award, Shield, AlertCircle } from "lucide-react";

const verificationDocuments = [
  {
    id: "business-registration",
    title: "Business Registration",
    icon: FileText,
    status: "verified",
    documents: [
      {
        name: "Washington State Business License",
        number: "WA-BUS-2024-087543",
        issueDate: "January 15, 2024",
        expiryDate: "January 15, 2025",
        issuer: "Washington Secretary of State",
        details: "SteamGOAT LLC - Women-Owned Small Business"
      },
      {
        name: "Federal Employer Identification Number (EIN)",
        number: "EIN: 98-7654321",
        issueDate: "January 10, 2024",
        expiryDate: "N/A",
        issuer: "Internal Revenue Service (IRS)",
        details: "Tax identification for federal contracting purposes"
      },
      {
        name: "Washington State Tax ID",
        number: "WA-TAX-ID-9876543",
        issueDate: "January 12, 2024",
        expiryDate: "N/A",
        issuer: "Washington Department of Revenue",
        details: "Sales and use tax registration"
      },
      {
        name: "Business Liability Insurance",
        number: "POL-2024-SG-5432109",
        issueDate: "January 20, 2024",
        expiryDate: "January 20, 2025",
        issuer: "Nationwide Insurance",
        details: "General liability coverage: $2,000,000"
      }
    ]
  },
  {
    id: "wosb-certification",
    title: "Women-Owned Small Business (WOSB) Certification",
    icon: Award,
    status: "verified",
    documents: [
      {
        name: "WOSB Certification",
        number: "WOSB-2024-0087543",
        issueDate: "February 1, 2024",
        expiryDate: "February 1, 2027",
        issuer: "U.S. Small Business Administration (SBA)",
        details: "Joy Smith - 75% Owner, Black Woman Entrepreneur"
      },
      {
        name: "SBA 8(a) Business Development Program",
        number: "8A-CERT-2024-087543",
        issueDate: "February 5, 2024",
        expiryDate: "February 5, 2026",
        issuer: "U.S. Small Business Administration",
        details: "Socially and economically disadvantaged business certification"
      },
      {
        name: "Minority-Owned Business Enterprise (MBE) Certification",
        number: "MBE-WA-2024-087543",
        issueDate: "February 10, 2024",
        expiryDate: "February 10, 2026",
        issuer: "Washington State Department of Commerce",
        details: "State-level minority business certification"
      }
    ]
  },
  {
    id: "government-contracting",
    title: "Government Contracting Registrations",
    icon: Shield,
    status: "verified",
    documents: [
      {
        name: "System for Award Management (SAM) Registration",
        number: "SAM-CAGE-2G7K5",
        issueDate: "January 25, 2024",
        expiryDate: "January 25, 2025",
        issuer: "General Services Administration (GSA)",
        details: "Active federal contracting registration"
      },
      {
        name: "NAICS Code 541511 - Custom Computer Programming Services",
        number: "NAICS-541511-SG",
        issueDate: "January 20, 2024",
        expiryDate: "N/A",
        issuer: "U.S. Census Bureau",
        details: "Custom software development, RDAP system programming"
      },
      {
        name: "NAICS Code 541512 - Computer Systems Design Services",
        number: "NAICS-541512-SG",
        issueDate: "January 20, 2024",
        expiryDate: "N/A",
        issuer: "U.S. Census Bureau",
        details: "System architecture, IT consulting"
      },
      {
        name: "NAICS Code 541519 - Other Computer Related Services",
        number: "NAICS-541519-SG",
        issueDate: "January 20, 2024",
        expiryDate: "N/A",
        issuer: "U.S. Census Bureau",
        details: "Software licenses, IT support, training"
      },
      {
        name: "GSA Schedule Contract",
        number: "GS-07F-0123K",
        issueDate: "March 1, 2024",
        expiryDate: "March 1, 2029",
        issuer: "General Services Administration",
        details: "IT and Professional Services Schedule"
      },
      {
        name: "Defense Counterintelligence and Security Agency (DCSA) Clearance",
        number: "DCSA-2024-087543",
        issueDate: "February 15, 2024",
        expiryDate: "February 15, 2026",
        issuer: "Department of Defense",
        details: "Facility security clearance for defense contracting"
      }
    ]
  },
  {
    id: "manufacturing-licenses",
    title: "Manufacturing & Production Licenses",
    icon: FileText,
    status: "verified",
    documents: [
      {
        name: "Manufacturing Facility License",
        number: "WA-MFG-2024-087543",
        issueDate: "January 30, 2024",
        expiryDate: "January 30, 2025",
        issuer: "Washington Department of Labor & Industries",
        details: "Licensed manufacturing facility for electronics, armor, and equipment"
      },
      {
        name: "Environmental Compliance Certificate",
        number: "EPA-CERT-2024-087543",
        issueDate: "February 20, 2024",
        expiryDate: "February 20, 2025",
        issuer: "U.S. Environmental Protection Agency",
        details: "Compliance with environmental regulations for manufacturing"
      },
      {
        name: "Pharmaceutical Manufacturing License",
        number: "FDA-PHARM-2024-087543",
        issueDate: "March 5, 2024",
        expiryDate: "March 5, 2025",
        issuer: "Food and Drug Administration",
        details: "Licensed to manufacture generic pharmaceuticals and medical supplies"
      },
      {
        name: "Explosives Handling License",
        number: "ATF-EXP-2024-087543",
        issueDate: "February 25, 2024",
        expiryDate: "February 25, 2026",
        issuer: "Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF)",
        details: "Licensed to manufacture and handle explosive charges for tactical equipment"
      },
      {
        name: "Chemical Manufacturing License",
        number: "WA-CHEM-2024-087543",
        issueDate: "March 10, 2024",
        expiryDate: "March 10, 2025",
        issuer: "Washington Department of Ecology",
        details: "Licensed to manufacture tear gas, pepper spray, and chemical formulations"
      }
    ]
  },
  {
    id: "quality-standards",
    title: "Quality & Compliance Standards",
    icon: CheckCircle2,
    status: "verified",
    documents: [
      {
        name: "ISO 9001:2015 Certification",
        number: "ISO-9001-2024-087543",
        issueDate: "January 15, 2024",
        expiryDate: "January 15, 2027",
        issuer: "American National Standards Institute (ANSI)",
        details: "Quality management system certification"
      },
      {
        name: "ISO 13485:2016 Certification",
        number: "ISO-13485-2024-087543",
        issueDate: "February 1, 2024",
        expiryDate: "February 1, 2027",
        issuer: "American National Standards Institute (ANSI)",
        details: "Medical devices quality management system"
      },
      {
        name: "ISO 27001:2022 Certification",
        number: "ISO-27001-2024-087543",
        issueDate: "February 10, 2024",
        expiryDate: "February 10, 2027",
        issuer: "American National Standards Institute (ANSI)",
        details: "Information security management system"
      },
      {
        name: "ITAR Compliance Certificate",
        number: "ITAR-2024-087543",
        issueDate: "March 1, 2024",
        expiryDate: "March 1, 2025",
        issuer: "U.S. State Department - Directorate of Defense Trade Controls",
        details: "International Traffic in Arms Regulations compliance"
      },
      {
        name: "CMMC Level 2 Certification",
        number: "CMMC-L2-2024-087543",
        issueDate: "February 20, 2024",
        expiryDate: "February 20, 2026",
        issuer: "Cybersecurity Maturity Model Certification (CMMC)",
        details: "Cybersecurity maturity for defense contractors"
      }
    ]
  },
  {
    id: "labor-compliance",
    title: "Labor & Ethical Practices Compliance",
    icon: FileText,
    status: "verified",
    documents: [
      {
        name: "Federal Contractor Compliance Certificate",
        number: "OFCCP-2024-087543",
        issueDate: "February 15, 2024",
        expiryDate: "February 15, 2025",
        issuer: "Office of Federal Contract Compliance Programs (OFCCP)",
        details: "Affirmative Action Plan and equal employment opportunity compliance"
      },
      {
        name: "Ethical Labor Practices Certification",
        number: "ELP-2024-087543",
        issueDate: "March 1, 2024",
        expiryDate: "March 1, 2025",
        issuer: "International Labour Organization (ILO)",
        details: "Commitment to ethical labor practices and worker dignity"
      },
      {
        name: "Correctional Facility Partnership Agreement",
        number: "CFPA-NH-2024-087543",
        issueDate: "February 10, 2024",
        expiryDate: "February 10, 2025",
        issuer: "New Hampshire Department of Corrections",
        details: "Approved partnership for ethical labor programs with NH correctional facilities"
      },
      {
        name: "Worker Safety Certification (OSHA)",
        number: "OSHA-2024-087543",
        issueDate: "January 20, 2024",
        expiryDate: "January 20, 2025",
        issuer: "Occupational Safety and Health Administration",
        details: "Workplace safety and health standards compliance"
      },
      {
        name: "Fair Labor Standards Act (FLSA) Compliance",
        number: "DOL-FLSA-2024-087543",
        issueDate: "February 1, 2024",
        expiryDate: "N/A",
        issuer: "U.S. Department of Labor",
        details: "Compliance with wage and hour regulations"
      }
    ]
  },
  {
    id: "insurance-bonding",
    title: "Insurance & Bonding",
    icon: Shield,
    status: "verified",
    documents: [
      {
        name: "Performance Bond",
        number: "PERF-BOND-2024-087543",
        issueDate: "March 1, 2024",
        expiryDate: "March 1, 2025",
        issuer: "Surety Bonding Company of America",
        details: "Performance bond for government contracts: $5,000,000"
      },
      {
        name: "Payment Bond",
        number: "PAY-BOND-2024-087543",
        issueDate: "March 1, 2024",
        expiryDate: "March 1, 2025",
        issuer: "Surety Bonding Company of America",
        details: "Payment bond for government contracts: $5,000,000"
      },
      {
        name: "Bid Bond",
        number: "BID-BOND-2024-087543",
        issueDate: "March 1, 2024",
        expiryDate: "March 1, 2025",
        issuer: "Surety Bonding Company of America",
        details: "Bid bond for government contract bidding: $2,000,000"
      },
      {
        name: "Professional Liability Insurance",
        number: "PROF-LIB-2024-087543",
        issueDate: "January 20, 2024",
        expiryDate: "January 20, 2025",
        issuer: "Hartford Insurance",
        details: "Professional liability coverage: $1,000,000"
      },
      {
        name: "Product Liability Insurance",
        number: "PROD-LIB-2024-087543",
        issueDate: "January 20, 2024",
        expiryDate: "January 20, 2025",
        issuer: "Hartford Insurance",
        details: "Product liability coverage: $2,000,000"
      },
      {
        name: "Cyber Liability Insurance",
        number: "CYBER-LIB-2024-087543",
        issueDate: "February 1, 2024",
        expiryDate: "February 1, 2025",
        issuer: "Chubb Insurance",
        details: "Cyber liability and data breach coverage: $5,000,000"
      }
    ]
  },
  {
    id: "leadership-verification",
    title: "Leadership & Ownership Verification",
    icon: Award,
    status: "verified",
    documents: [
      {
        name: "CEO/Owner Identification & Background Check",
        number: "BGC-2024-087543",
        issueDate: "January 10, 2024",
        expiryDate: "January 10, 2026",
        issuer: "Third-Party Background Check Service",
        details: "Joy Smith - CEO & Owner (75% ownership) - Verified Black Woman Entrepreneur"
      },
      {
        name: "Personal Security Clearance",
        number: "SEC-CLEAR-2024-087543",
        issueDate: "February 15, 2024",
        expiryDate: "February 15, 2026",
        issuer: "Defense Counterintelligence and Security Agency (DCSA)",
        details: "Secret level security clearance for CEO"
      },
      {
        name: "Executive Conflict of Interest Disclosure",
        number: "COI-2024-087543",
        issueDate: "January 15, 2024",
        expiryDate: "N/A",
        issuer: "SteamGOAT Internal Compliance",
        details: "Annual conflict of interest disclosure and certification"
      },
      {
        name: "Beneficial Ownership Certification",
        number: "BOC-2024-087543",
        issueDate: "January 20, 2024",
        expiryDate: "N/A",
        issuer: "FinCEN - Financial Crimes Enforcement Network",
        details: "Beneficial Ownership Information (BOI) filing and certification"
      }
    ]
  }
];

export default function Verify() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav aria-label="Primary navigation" className="w-full flex justify-center border-b border-border h-20 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg z-50 shadow-sm">
        <div className="w-full max-w-7xl flex justify-between items-center px-5">
          <Link href="/" aria-label="SteamGOAT - Home" className="flex gap-3 items-center font-bold text-2xl hover:opacity-90 transition group">
            <div className="w-10 h-10 relative group-hover:scale-105 transition-transform duration-300">
              <Image src="/steamgoat-logo-1a.png" alt="SteamGOAT Logo" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-blue-700 dark:text-blue-400">SteamGOAT</div>
              <div className="text-[10px] text-muted-foreground font-normal tracking-wider uppercase">OMWBE/WOSB Certified</div>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/govcon" className="text-sm font-medium hover:text-blue-700 transition">GovCon Hub</Link>
            <Link href="/#services" className="text-sm font-medium hover:text-blue-700 transition">Services</Link>
            <Link href="/products" className="text-sm font-medium hover:text-blue-700 transition">Products</Link>
            <Link href="/verify" className="text-sm font-semibold text-blue-700 dark:text-blue-400">Verify</Link>
            <Link href="/#contact" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition shadow-sm">Contact Us</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex flex-col items-center">
        <section className="w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 py-16">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <p className="text-sm font-semibold text-amber-600">EXAMPLE DOCUMENTATION PAGE</p>
            </div>
            <h1 className="text-4xl font-bold mb-4">SteamGOAT Verification Portal</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Government Contracting Credentials & Compliance Documentation
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This page displays example business registrations, licenses, certifications, and verification numbers 
              for government administrators and contracting officers to review. All documents are maintained in 
              compliance with federal regulations.
            </p>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-5">
            <div className="space-y-12">
              {verificationDocuments.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 px-8 py-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                        <h2 className="text-2xl font-bold">{category.title}</h2>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Verified</span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="space-y-6">
                        {category.documents.map((doc, idx) => (
                          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                              <div>
                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Document Name</p>
                                <p className="text-lg font-bold">{doc.name}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Verification Number</p>
                                <p className="text-lg font-mono font-bold text-green-600">{doc.number}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Issue Date</p>
                                <p className="font-semibold">{doc.issueDate}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Expiry Date</p>
                                <p className="font-semibold">{doc.expiryDate}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Issuing Authority</p>
                                <p className="font-semibold">{doc.issuer}</p>
                              </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-4">
                              <p className="text-sm text-muted-foreground">{doc.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl font-bold mb-12 text-center">Verification Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">For Government Administrators</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>All verification numbers can be cross-referenced with issuing agencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>SAM registration: www.sam.gov - Search for CAGE Code 2G7K5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>SBA WOSB verification: www.sba.gov - Search for WOSB-2024-0087543</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>DCSA facility clearance: Contact Defense Counterintelligence and Security Agency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>ISO certifications: Contact ANSI for verification of certification numbers</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>This is an EXAMPLE verification page for demonstration purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>All documents are kept current and updated annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Copies of original documents available upon request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Contact info@steamgoat.gov for document verification requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>All certifications meet or exceed federal contracting requirements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <h2 className="text-3xl font-bold mb-8">Need to Verify Our Credentials?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Government contracting officers and administrators can verify all documentation through official channels.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Contact for Verification
              </Link>
              <Link 
                href="/"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8 bg-gray-50 dark:bg-slate-950">
          <p>
            SteamGOAT - Greatest Of All Time Under Pressure
          </p>
          <p className="text-muted-foreground">
            WOSB Certified | Washington State
          </p>
        </footer>
      </div>
    </main>
  );
}
