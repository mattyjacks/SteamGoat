import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Shield, Zap, Cpu, Bike, Pill, BookOpen, Radar, Crosshair, Package } from "lucide-react";

const productCategories = [
  {
    id: "protective-equipment",
    title: "Protective Equipment & Armor",
    icon: Shield,
    description: "Advanced protective systems for military and law enforcement",
    products: [
      { name: "Body armor systems (ballistic protection)", cost: "$800-$2,500 per unit", details: "NIJ Level III/IV ceramic composite plates with soft armor backing. Lightweight design for extended wear comfort. Available in various sizes and configurations for different threat levels." },
      { name: "Tactical protective gear", cost: "$150-$600 per unit", details: "Includes knee pads, elbow pads, shoulder protectors, and integrated load-bearing systems. Made from impact-resistant polymers with moisture-wicking liners for all-day comfort." },
      { name: "Helmet systems with integrated communications", cost: "$400-$1,200 per unit", details: "Advanced combat helmets with built-in communication systems, night vision mounts, and ballistic protection. Includes integrated audio systems for team coordination." },
      { name: "Blast-resistant equipment", cost: "$2,000-$5,000 per unit", details: "Specialized protective systems designed for explosive ordnance disposal and high-threat environments. Includes face shields, hand protection, and body coverage." }
    ]
  },
  {
    id: "tools-equipment",
    title: "Specialized Tools & Equipment",
    icon: Zap,
    description: "Precision tools for emergency response and tactical operations",
    products: [
      { name: "Firefighter axes with explosive charges for rapid entry", cost: "$500-$1,500 per unit", details: "High-performance axes featuring precision-engineered explosive charges in the head for controlled rapid entry. Reduces entry time by 60% compared to traditional methods. Includes safety mechanisms and detonation controls." },
      { name: "Metal pokers and tampers", cost: "$50-$200 per unit", details: "Heavy-duty steel construction with ergonomic handles. Used for debris removal, compaction, and tactical applications. Available in various weights and configurations for different operational needs." },
      { name: "Tactical pry bars and breaching tools", cost: "$75-$300 per unit", details: "Reinforced steel pry bars with specialized tips for door breaching and entry operations. Designed for law enforcement and tactical teams. Includes non-slip grips and weight-optimized designs." },
      { name: "Emergency response equipment kits", cost: "$1,000-$3,500 per kit", details: "Complete tactical kits including multiple tools, carrying cases, and maintenance supplies. Customizable configurations for specific operational requirements. Includes training materials." }
    ]
  },
  {
    id: "materials",
    title: "Advanced Materials & Plastics",
    icon: Package,
    description: "High-performance materials for defense applications",
    products: [
      { name: "Reinforced composite materials", cost: "$15-$50 per pound", details: "Carbon fiber and aramid fiber composites for lightweight structural applications. Superior strength-to-weight ratio. Used in armor systems, vehicle components, and protective equipment." },
      { name: "Lightweight tactical plastics", cost: "$8-$30 per pound", details: "Advanced polymer blends engineered for impact resistance and durability. Used in equipment cases, magazine carriers, and modular tactical systems. Available in various colors and finishes." },
      { name: "Impact-resistant polymers", cost: "$10-$40 per pound", details: "High-performance plastics designed to absorb and dissipate impact energy. Used in protective gear, equipment housings, and structural components. Meets military specifications." },
      { name: "Custom molded components", cost: "$100-$500 per component", details: "Precision-molded parts manufactured to exact specifications. Includes prototyping, tooling, and production runs. Available in various materials and sizes for specialized applications." }
    ]
  },
  {
    id: "electronics",
    title: "Electronics & Imaging Systems",
    icon: Cpu,
    description: "Cutting-edge surveillance and sensor technology",
    products: [
      { name: "Security cameras and surveillance systems", cost: "$200-$1,500 per unit", details: "High-resolution IP cameras with 4K capability, night vision, and wide-angle lenses. Includes cloud storage integration and mobile app access. Weather-resistant housings for outdoor deployment." },
      { name: "Autonomous vehicle cameras", cost: "$300-$2,000 per unit", details: "Multi-sensor camera systems for autonomous navigation and obstacle detection. Includes fisheye and telephoto lenses. Integrated with LIDAR and radar systems for comprehensive environmental awareness." },
      { name: "Self-driving car imaging systems", cost: "$5,000-$15,000 per system", details: "Complete imaging suite for autonomous vehicles including stereo cameras, depth sensors, and 360-degree coverage. Real-time processing with AI-powered object recognition and lane detection." },
      { name: "Thermal imaging equipment", cost: "$800-$3,500 per unit", details: "Infrared thermal cameras for surveillance and tactical operations. Detects heat signatures in complete darkness. Available in handheld and fixed-mount configurations." },
      { name: "Night vision systems", cost: "$400-$2,000 per unit", details: "Image intensification and thermal night vision devices. Military-grade optics with extended range. Includes helmet mounts and weapon-mounted options." },
      { name: "Radar equipment and sensors", cost: "$1,500-$8,000 per unit", details: "Advanced radar systems for perimeter security and air defense. Includes doppler radar for motion detection and range finding. Customizable for various threat detection scenarios." },
      { name: "Metal detectors (handheld and walk-through)", cost: "$150-$2,500 per unit", details: "Handheld metal detectors for personnel screening and walk-through portal systems for high-volume security checkpoints. Adjustable sensitivity for different metal types." },
      { name: "Integrated sensor arrays", cost: "$2,000-$10,000 per array", details: "Multi-sensor systems combining cameras, radar, thermal imaging, and acoustic sensors. Provides comprehensive environmental awareness for security and autonomous applications." }
    ]
  },
  {
    id: "consumer-electronics",
    title: "Consumer Electronics",
    icon: Cpu,
    description: "Commercial-grade electronics manufacturing",
    products: [
      { name: "Television manufacturing and assembly", cost: "$150-$800 per unit", details: "Full-service TV manufacturing from component sourcing to final assembly. Supports 32-inch to 75-inch displays. Includes quality testing, packaging, and logistics support." },
      { name: "Cell phones and mobile devices", cost: "$100-$600 per unit", details: "Complete smartphone manufacturing and assembly. Includes sourcing, assembly, testing, and packaging. Supports custom configurations and branding." },
      { name: "Smartphone cameras and optics", cost: "$20-$150 per unit", details: "High-quality camera modules with advanced optics. Includes wide-angle, telephoto, and macro lenses. Integrated with image processing chips for enhanced performance." },
      { name: "Communication devices", cost: "$50-$400 per unit", details: "Specialized communication equipment for military and law enforcement. Includes encrypted radio systems, satellite phones, and tactical communication devices." },
      { name: "Display technology", cost: "$30-$300 per unit", details: "LCD, OLED, and advanced display panels. Supports various sizes and resolutions. Includes touch-screen integration and custom color calibration." }
    ]
  },
  {
    id: "non-lethal",
    title: "Non-Lethal Enforcement Systems",
    icon: Crosshair,
    description: "Safe, effective crowd management and neutralization",
    products: [
      { name: "Drone systems for non-lethal neutralization", cost: "$3,000-$12,000 per unit", details: "Autonomous drones equipped with non-lethal payload delivery systems. Includes precision targeting, GPS navigation, and real-time video feedback. Designed for crowd control and threat neutralization." },
      { name: "Autonomous response drones", cost: "$5,000-$15,000 per unit", details: "AI-powered autonomous drones for rapid response operations. Includes obstacle avoidance, autonomous flight patterns, and integrated communication systems. Customizable payload options." },
      { name: "Tear gas and pepper spray formulations", cost: "$5-$25 per unit", details: "Advanced chemical formulations for crowd control. Includes CS tear gas, OC pepper spray, and hybrid formulations. Meets all safety and regulatory standards. Available in various concentrations." },
      { name: "UV dye pellet systems (Byrna-compatible)", cost: "$15-$50 per round", details: "Non-lethal projectiles filled with UV dye for suspect identification. Byrna-compatible ammunition for use with standard launcher platforms. Leaves invisible mark for identification." },
      { name: "Launcher platforms and delivery systems", cost: "$400-$2,000 per unit", details: "Handheld and mounted launcher systems for non-lethal projectiles. Includes tear gas canisters, pepper spray dispensers, and dye pellet launchers. Ergonomic design for extended use." },
      { name: "Precision targeting systems", cost: "$800-$3,000 per unit", details: "Laser targeting and ballistic computer systems for accurate non-lethal projectile delivery. Includes range finding, wind compensation, and real-time trajectory calculation." },
      { name: "Safety-engineered deployment mechanisms", cost: "$200-$800 per unit", details: "Advanced safety systems preventing accidental discharge. Includes biometric locks, dual-action triggers, and deployment verification systems. Meets all safety standards." }
    ]
  },
  {
    id: "transportation",
    title: "Transportation & Mobility",
    icon: Bike,
    description: "Innovative personal and tactical mobility solutions",
    products: [
      { name: "High-performance bicycles", cost: "$300-$1,500 per unit", details: "Lightweight aluminum and carbon fiber frames with advanced suspension systems. Designed for rapid deployment and tactical operations. Includes integrated cargo systems and quick-release components." },
      { name: "Tactical mountain bikes", cost: "$400-$2,000 per unit", details: "Heavy-duty off-road bicycles with reinforced frames and all-terrain tires. Includes mounting points for tactical gear and communication equipment. Suitable for rough terrain operations." },
      { name: "Electric skateboards", cost: "$200-$800 per unit", details: "High-performance electric skateboards with extended range and rapid acceleration. Includes regenerative braking and mobile app control. Suitable for urban tactical operations and rapid personnel movement." },
      { name: "Lightweight transport vehicles", cost: "$5,000-$20,000 per unit", details: "Compact, fuel-efficient vehicles for rapid deployment. Includes all-terrain capability and modular cargo systems. Customizable for various operational requirements." },
      { name: "Rapid deployment mobility systems", cost: "$10,000-$40,000 per unit", details: "Advanced mobility platforms combining multiple transport modes. Includes rapid setup/teardown and autonomous navigation options. Designed for emergency response and tactical operations." }
    ]
  },
  {
    id: "medical",
    title: "Medical & Pharmaceutical",
    icon: Pill,
    description: "Healthcare solutions for military and civilian use",
    products: [
      { name: "Affordable pharmaceutical manufacturing", cost: "$0.50-$5 per unit", details: "Cost-effective production of essential medications. Includes antibiotics, pain relievers, and common treatments. Meets FDA and international pharmaceutical standards." },
      { name: "Generic medication production", cost: "$1-$10 per unit", details: "High-volume manufacturing of generic pharmaceuticals. Includes tablets, capsules, and liquid formulations. Supports bulk government and humanitarian orders." },
      { name: "First aid supplies and kits", cost: "$20-$150 per kit", details: "Comprehensive first aid kits for various scenarios. Includes bandages, antiseptics, tourniquets, and emergency medications. Customizable configurations for specific needs." },
      { name: "Combat medical supplies", cost: "$50-$300 per unit", details: "Specialized medical supplies for tactical and combat environments. Includes hemostatic agents, chest seals, and emergency airway equipment. Meets military medical standards." },
      { name: "Emergency medical technology", cost: "$500-$5,000 per unit", details: "Advanced medical devices for emergency response. Includes defibrillators, portable ultrasound, and vital sign monitors. Designed for rapid deployment and field use." },
      { name: "Field medical equipment", cost: "$100-$1,000 per unit", details: "Portable medical equipment for field operations. Includes stretchers, medical bags, and diagnostic tools. Lightweight and durable for extended field use." },
      { name: "Trauma care supplies", cost: "$30-$200 per unit", details: "Specialized supplies for treating traumatic injuries. Includes wound dressings, surgical tools, and stabilization equipment. Meets emergency medicine standards." }
    ]
  },
  {
    id: "publications",
    title: "Technical Publications & Knowledge",
    icon: BookOpen,
    description: "Expert-authored technical and operational resources",
    products: [
      { name: "Technical manuals and guides", cost: "$25-$150 per copy", details: "Comprehensive technical documentation for equipment operation and maintenance. Includes diagrams, troubleshooting guides, and maintenance schedules. Available in print and digital formats." },
      { name: "Operational handbooks", cost: "$30-$200 per copy", details: "Detailed operational procedures for tactical and emergency response operations. Includes best practices, safety protocols, and decision-making frameworks. Regularly updated with field experience." },
      { name: "Training materials by industry experts", cost: "$50-$300 per course", details: "Comprehensive training packages developed by experienced professionals. Includes video content, workbooks, and certification programs. Customizable for specific organizational needs." },
      { name: "Publications by thought leaders (including FirebringerAI.com contributors)", cost: "$20-$100 per publication", details: "Expert insights and analysis from industry leaders and innovators. Covers emerging technologies, strategic planning, and operational innovation. Includes research papers and case studies." },
      { name: "Research and development documentation", cost: "$100-$500 per document", details: "Detailed R&D reports on new technologies and methodologies. Includes prototyping results, testing data, and implementation recommendations. Proprietary and confidential information available under NDA." },
      { name: "Best practices guides", cost: "$40-$250 per guide", details: "Practical guides based on field experience and industry standards. Covers procurement, deployment, maintenance, and optimization. Includes checklists and implementation templates." }
    ]
  }
];

export default function Products() {
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
            <Link href="/products" className="text-sm font-semibold text-blue-700 dark:text-blue-400">Products</Link>
            <Link href="/verify" className="text-sm font-medium hover:text-blue-700 transition">Verify</Link>
            <Link href="/#contact" className="bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition shadow-sm">Contact Us</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex flex-col items-center">
        <section className="w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 py-16">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <h1 className="text-4xl font-bold mb-4">SteamGOAT Product Catalog</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Comprehensive manufacturing and supply solutions for government, military, law enforcement, and commercial sectors
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From advanced protective equipment to cutting-edge electronics, medical supplies, and specialized tools - 
              SteamGOAT manufactures and supplies mission-critical products across multiple industries.
            </p>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div 
                    key={category.id}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {category.products.map((product, idx) => (
                        <li key={idx} className="border-l-2 border-blue-600 pl-4 py-2">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-semibold text-sm">{product.name}</p>
                            <span className="text-blue-600 font-bold text-xs whitespace-nowrap ml-2">{product.cost}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{product.details}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl font-bold mb-12 text-center">Manufacturing Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Military-grade quality standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Rigorous testing and inspection protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Compliance with government specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Traceability and documentation</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Production Capacity</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Scalable manufacturing operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Rapid prototyping and customization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Just-in-time delivery systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Supply chain management expertise</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Order?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact SteamGOAT for bulk orders, custom manufacturing, and government contracting solutions.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Request Quote
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
