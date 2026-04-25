import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SteamGOAT Privacy Policy - Washington State compliant data protection and privacy practices.",
};

export default function PrivacyPolicy() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
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
            <Link href="/verify" className="text-sm font-medium hover:text-blue-700 transition">Verify</Link>
            <Link href="/#contact" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition shadow-sm">Contact Us</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex flex-col items-center">
        <section className="w-full py-12 bg-blue-900 dark:bg-blue-950 text-white">
          <div className="max-w-4xl mx-auto px-5">
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-blue-200">Effective Date: April 24, 2026 | Last Updated: April 24, 2026</p>
          </div>
        </section>

        <article className="w-full py-12">
          <div className="max-w-4xl mx-auto px-5 prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                SteamGOAT ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <strong>steamgoat.com</strong> (the "Site").
              </p>
              <p className="text-muted-foreground">
                This Privacy Policy is governed by the laws of the State of Washington, including the Washington Privacy Act (RCW 19.255) and other applicable state and federal privacy laws. Please read this policy carefully. If you do not agree with our policies and practices, please do not use our Site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide Directly</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and job title when you submit contact forms or inquiries</li>
                <li><strong>Communication Data:</strong> Content of emails, messages, or correspondence you send to us</li>
                <li><strong>Government Contracting Information:</strong> UEI numbers, CAGE codes, and other business registration details you provide</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2 Information Collected Automatically</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Server Logs:</strong> IP address, browser type, operating system, referring URL, pages visited, and access times</li>
                <li><strong>Cookies & Tracking Technologies:</strong> We use Google Analytics to track user behavior, page views, and engagement metrics</li>
                <li><strong>Device Information:</strong> Device type, screen resolution, and language preferences</li>
                <li><strong>Vercel Analytics:</strong> Performance metrics and site usage data collected by our hosting provider, Vercel</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use collected information for the following purposes:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send you government contracting opportunities and capability statement requests</li>
                <li>To analyze Site usage and improve user experience through Google Analytics</li>
                <li>To monitor Site performance and security through Vercel analytics</li>
                <li>To comply with legal obligations and government contracting requirements</li>
                <li>To detect and prevent fraudulent activity and security threats</li>
                <li>To send you marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Service Providers</h2>
              
              <h3 className="text-xl font-semibold mb-3">4.1 Vercel (Hosting & Analytics)</h3>
              <p className="text-muted-foreground mb-4">
                Our Site is hosted on Vercel, which provides hosting infrastructure and analytics services. Vercel collects performance metrics, error logs, and usage data. Vercel's privacy policy is available at <a href="https://vercel.com/legal/privacy-policy" className="text-blue-700 dark:text-blue-400 hover:underline">https://vercel.com/legal/privacy-policy</a>.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.2 Google Analytics</h3>
              <p className="text-muted-foreground mb-4">
                We use Google Analytics to understand how users interact with our Site. Google Analytics collects information such as pages visited, time spent on pages, and user demographics. This data is anonymized and aggregated. Google does not identify you personally. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-700 dark:text-blue-400 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.3 Domain Registration (Dreamhost)</h3>
              <p className="text-muted-foreground">
                Our domain <strong>steamgoat.com</strong> is registered with Dreamhost. Dreamhost maintains WHOIS records as required by ICANN regulations. Your domain registration information may be publicly accessible. Dreamhost's privacy policy is available at <a href="https://www.dreamhost.com/legal/privacy-policy/" className="text-blue-700 dark:text-blue-400 hover:underline">https://www.dreamhost.com/legal/privacy-policy/</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Cookies & Tracking Technologies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and track your activity.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for Site functionality</li>
                <li><strong>Analytics Cookies:</strong> Google Analytics and Vercel analytics</li>
                <li><strong>Preference Cookies:</strong> Remember your theme preference (light/dark mode)</li>
              </ul>
              <p className="text-muted-foreground">
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, blocking cookies may affect Site functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Contact information from inquiries is retained for up to 3 years unless you request deletion. Google Analytics data is retained according to Google's default retention policy (26 months). Vercel retains logs for 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Your Privacy Rights (Washington State)</h2>
              <p className="text-muted-foreground mb-4">
                Under Washington State law (RCW 19.255), you have the following rights:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Right to Know:</strong> You may request what personal information we collect, use, and share</li>
                <li><strong>Right to Delete:</strong> You may request deletion of personal information we have collected (subject to legal exceptions)</li>
                <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information</li>
                <li><strong>Right to Opt-Out:</strong> You may opt out of targeted advertising and sale of personal information</li>
                <li><strong>Right to Portability:</strong> You may request your personal information in a portable format</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. How to Exercise Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                To exercise any of your privacy rights, please submit a written request to:
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mb-4 text-muted-foreground font-mono text-sm">
                <p><strong>SteamGOAT LLC</strong></p>
                <p>Privacy Rights Request</p>
                <p>info@steamgoat.com</p>
                <p>Washington State, USA</p>
              </div>
              <p className="text-muted-foreground">
                We will respond to your request within 45 days. If we cannot fulfill your request, we will explain the reason. You may also designate an authorized agent to submit requests on your behalf.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our Site is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>SSL/HTTPS encryption for all data in transit</li>
                <li>Secure server infrastructure provided by Vercel</li>
                <li>Regular security monitoring and updates</li>
                <li>Access controls and authentication mechanisms</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. International Data Transfers</h2>
              <p className="text-muted-foreground">
                Our Site is hosted in the United States. If you access our Site from outside the US, your information may be transferred to, stored in, and processed in the United States, which may have different data protection laws than your country of residence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Do Not Track</h2>
              <p className="text-muted-foreground">
                Some browsers include a "Do Not Track" feature. Our Site does not currently respond to Do Not Track signals. However, you can control tracking through your browser settings and by opting out of Google Analytics.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our Site may contain links to third-party websites. We are not responsible for the privacy practices of external sites. We encourage you to review the privacy policies of any third-party sites before providing personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. California Privacy Rights (CCPA)</h2>
              <p className="text-muted-foreground mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA). We comply with CCPA requirements, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by updating the "Last Updated" date at the top of this policy and, where required by law, by obtaining your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">16. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-muted-foreground font-mono text-sm">
                <p><strong>SteamGOAT LLC</strong></p>
                <p>Email: info@steamgoat.com</p>
                <p>Location: Washington State, USA</p>
                <p>Website: steamgoat.com</p>
              </div>
            </section>

            <section className="mb-8 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground">
                This Privacy Policy is provided for informational purposes and complies with Washington State law (RCW 19.255), the California Consumer Privacy Act (CCPA), and other applicable privacy regulations. By using our Site, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>
          </div>
        </article>

        <footer className="w-full border-t border-border py-8 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-5 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/steamgoat-logo-1a.png" alt="SteamGOAT" width={32} height={32} className="object-contain" />
              <span className="text-sm font-bold">SteamGOAT</span>
              <span className="text-xs text-muted-foreground">OMWBE/WOSB Certified | Washington State</span>
            </div>
            <p className="text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-blue-700 transition">Privacy Policy</Link>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
