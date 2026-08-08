import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { trackPhoneClick } from "@/lib/analytics";
import { CheckCircle2, Star, ArrowRight, MapPin, Phone, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@assets/generated_images/gallery-6.jpg";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

interface FaqItem { name: string; acceptedAnswer: { text: string } }

const FAQS: FaqItem[] = [
  {
    name: "Do you install flooring in Clermont, FL?",
    acceptedAnswer: { text: "Yes. Kaye Flooring Inc regularly installs hardwood, luxury vinyl plank (LVP), and custom stair flooring throughout Clermont and the greater Lake County area, including Minneola, Groveland, Mascotte, Montverde, and surrounding communities." }
  },
  {
    name: "What type of flooring is best for Clermont homes?",
    acceptedAnswer: { text: "Luxury vinyl plank (LVP) is the most popular choice in Clermont because it is 100% waterproof, handles Lake County's summer humidity without warping, and is easy to maintain in an active household. Engineered hardwood is an excellent option for homeowners who want the beauty of real wood with better dimensional stability in Florida's climate." }
  },
  {
    name: "How long does flooring installation take in a Clermont home?",
    acceptedAnswer: { text: "Single-room installations are typically completed in one to two days. Whole-home projects run three to five days depending on square footage and subfloor preparation required. We work efficiently to minimize disruption to your family's routine." }
  },
  {
    name: "Is Kaye Flooring licensed and insured in Florida?",
    acceptedAnswer: { text: "Yes. Kaye Flooring Inc is fully licensed and insured in the state of Florida. Every installation is performed by trained craftsmen under direct owner supervision — not subcontracted crews." }
  },
  {
    name: "Do you offer free estimates in the Clermont area?",
    acceptedAnswer: { text: "Yes. We provide free, no-obligation in-home estimates throughout Clermont and Lake County. We bring samples directly to your home so you can see how different flooring options look in your actual space and lighting before committing." }
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://kayeflooring.com/#business",
      "name": "Kaye Flooring Inc",
      "description": "Licensed flooring installation contractor serving Clermont, FL and Lake County. Specializing in hardwood, luxury vinyl plank, and custom stair installation for residential homes.",
      "url": "https://kayeflooring.com/clermont",
      "telephone": "+13529884006",
      "email": "kayeflooring@gmail.com",
      "image": "https://kayeflooring.com/apple-touch-icon.png",
      "priceRange": "$$",
      "paymentAccepted": "Cash, Check, Credit Card",
      "currenciesAccepted": "USD",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "15:00" }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Clermont",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.5494,
        "longitude": -81.7729
      },
      "areaServed": [
        { "@type": "City", "name": "Clermont", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Minneola", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Groveland", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Mascotte", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Montverde", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Leesburg", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Tavares", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Eustis", "containedInPlace": { "@type": "State", "name": "Florida" } }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Flooring Installation Services — Clermont, FL",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Luxury Vinyl Plank (LVP) Installation", "description": "Waterproof, durable LVP flooring ideal for Clermont's growing families and Florida's humid climate." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hardwood Flooring Installation", "description": "Solid and engineered hardwood installation for Clermont homes seeking timeless elegance and lasting value." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Stair Installation", "description": "Stair tread replacement and full staircase renovation serving Clermont and Lake County." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Floor Repair & Refinishing", "description": "Hardwood refinishing and floor repair services for existing flooring throughout Lake County." } }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 5,
        "reviewCount": 47,
        "bestRating": 5,
        "worstRating": 1
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.name,
        "acceptedAnswer": { "@type": "Answer", "text": f.acceptedAnswer.text }
      }))
    }
  ]
};

const COMMUNITIES = [
  { name: "Minneola", county: "Lake County", note: "Adjacent to Clermont" },
  { name: "Groveland", county: "Lake County", note: "West Lake growth corridor" },
  { name: "Mascotte", county: "Lake County", note: "Southwest Lake County" },
  { name: "Montverde", county: "Lake County", note: "East Lake hilltop community" },
  { name: "Leesburg", county: "Lake County", note: "Lake County hub" },
  { name: "Tavares", county: "Lake County", note: "County seat" },
  { name: "Eustis", county: "Lake County", note: "Northeast Lake County" },
  { name: "Mount Dora", county: "Lake County", note: "Historic arts community" },
];

const SERVICES = [
  {
    name: "Luxury Vinyl Plank (LVP)",
    badge: "Most Popular",
    desc: "Waterproof, scratch-resistant, and strikingly realistic — LVP is the top choice for Clermont homeowners. Lake County's fast-growing communities mean more families, more pets, and more foot traffic. LVP handles all of it without the upkeep real hardwood demands.",
    points: ["100% waterproof — no warping or swelling", "Scratch-resistant surface coat", "Comfortable underfoot year-round", "Wide selection to fit any interior style"],
  },
  {
    name: "Hardwood & Engineered Wood",
    badge: null,
    desc: "Real wood flooring adds enduring value and warmth to Clermont homes. We install solid and engineered hardwood with careful attention to proper acclimation in Florida's humidity, precise subfloor preparation, and clean transitions between rooms.",
    points: ["Solid & engineered options", "Custom staining available", "Proper acclimation for Florida humidity", "Refinishable for multi-decade life"],
  },
  {
    name: "Custom Stair Installation",
    badge: null,
    desc: "Make your staircase a focal point rather than an afterthought. We replace treads, risers, and handrail skirts to match your new flooring perfectly — tying together every level of your home with one cohesive look.",
    points: ["Tread & riser replacement", "Matching species & stain to floors", "Safe, code-compliant installation", "Dramatic visual impact"],
  },
];

export default function Clermont() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Flooring Installer in Clermont, FL | Kaye Flooring Inc";

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "clermont-schema";
    script.text = JSON.stringify(SCHEMA);
    document.head.appendChild(script);

    return () => {
      document.title = prev;
      document.getElementById("clermont-schema")?.remove();
    };
  }, []);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="pt-32 pb-20 text-white relative overflow-hidden">
        <img src={heroImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={STAGGER}>
            <motion.div variants={FADE_UP} className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-6">
              <Link href="/"><span className="hover:text-primary-foreground cursor-pointer transition-colors">Home</span></Link>
              <span>/</span>
              <span>Clermont, FL</span>
            </motion.div>
            <motion.p variants={FADE_UP} className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
              Serving Lake County
            </motion.p>
            <motion.h1 variants={FADE_UP} className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 text-balance">
              Flooring Installation<br className="hidden md:block" /> in Clermont, FL
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl font-light leading-relaxed">
              Hardwood, luxury vinyl plank, and custom stair installation for Clermont homeowners. Family-owned, fully licensed, and serving Lake County every week.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact?ref=clermont-hero">
                <Button size="lg" variant="secondary" className="rounded-none h-14 px-10 text-base shadow-xl font-semibold">
                  Get a Free Estimate
                </Button>
              </Link>
              <a href="tel:3529884006" onClick={trackPhoneClick}>
                <Button size="lg" variant="outline" className="rounded-none h-14 px-10 text-base border-white/30 text-white hover:bg-white hover:text-primary transition-all">
                  <Phone size={18} className="mr-2" />
                  (352) 988-4006
                </Button>
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div variants={FADE_UP} className="mt-12 flex flex-wrap gap-6 text-sm text-primary-foreground/75">
              {[
                "✓ Licensed &amp; Insured in Florida",
                "✓ Free In-Home Estimates",
                "✓ 15+ Years Experience",
                "✓ 5-Star Rated",
              ].map(t => (
                <span key={t} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY CLERMONT HOMEOWNERS CHOOSE KAYE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Why Choose Kaye Flooring</motion.h2>
              <motion.h3 variants={FADE_UP} className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 leading-snug">
                The flooring contractor Clermont residents refer to their neighbors
              </motion.h3>
              <motion.p variants={FADE_UP} className="text-muted-foreground leading-relaxed mb-8">
                Clermont is one of the fastest-growing corridors in Central Florida. New construction, growing families, and a move-up buyer market mean homeowners here care deeply about quality and long-term value. We match that expectation on every job — no shortcuts, no subcontractors, no surprises.
              </motion.p>
              <motion.ul variants={STAGGER} className="space-y-4">
                {[
                  { title: "Owner on every job", desc: "Gerrit Kaye is personally involved in each installation — not a subcontracted crew you've never met." },
                  { title: "Bring samples to your home", desc: "We come to you with full-size samples so you can see how your new floor looks in your actual lighting before committing." },
                  { title: "Dust-controlled process", desc: "We take care of your home during installation — furniture protection, thorough cleanup, and zero surprise messes." },
                  { title: "Proper subfloor prep", desc: "Most flooring failures start below the surface. We level, inspect, and prepare every subfloor before a single plank goes down." },
                ].map((item, i) => (
                  <motion.li key={i} variants={FADE_UP} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">{item.title} — </span>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { stat: "15+", label: "Years Installing Floors" },
                { stat: "1,000+", label: "Projects Completed" },
                { stat: "5★", label: "Average Google Rating" },
                { stat: "0", label: "Subcontractors Used" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-sm p-6 text-center">
                  <p className="text-3xl font-serif font-bold text-primary mb-1">{item.stat}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER} className="text-center mb-14">
            <motion.h2 variants={FADE_UP} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Services</motion.h2>
            <motion.h3 variants={FADE_UP} className="text-3xl font-serif font-bold text-foreground">
              Flooring services we provide in Clermont
            </motion.h3>
          </motion.div>

          <div className="space-y-8">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border rounded-sm p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-serif font-bold text-foreground">{svc.name}</h4>
                      {svc.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5 rounded-sm">{svc.badge}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-5">{svc.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {svc.points.map(pt => (
                        <li key={pt} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shrink-0">
                    <Link href={`/contact?ref=clermont-${svc.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="outline" className="rounded-none whitespace-nowrap gap-2">
                        Get a Quote <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLERMONT CONTEXT */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Flooring in Lake County</motion.h2>
              <motion.h3 variants={FADE_UP} className="text-3xl font-serif font-bold text-foreground mb-5 leading-snug">
                Flooring that fits the Clermont lifestyle
              </motion.h3>
              <motion.div variants={FADE_UP} className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Clermont has earned a reputation as one of the most desirable places to live in Central Florida. Perched on rolling hills overlooking a chain of lakes, it attracts families who want space, quality schools, and a short commute to Orlando — without sacrificing the feeling of a true community. Home values reflect that demand, and so should your floors.
                </p>
                <p>
                  New construction dominates much of Clermont and Minneola, but older homes throughout the area are increasingly being updated and renovated. Whether you're refreshing a 1990s home or finishing out a brand-new build, the flooring you choose sets the tone for the entire interior.
                </p>
                <p>
                  LVP is the go-to material in Lake County because it handles the full range of Florida's climate — summer humidity, air-conditioned winters, and everything in between — without the maintenance demands of wood. For homeowners who want the character of real hardwood, engineered wood gives you the look and feel with better performance in Florida's environment.
                </p>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h3 variants={FADE_UP} className="text-xl font-serif font-bold text-foreground mb-5">Communities we serve</motion.h3>
              <motion.div variants={STAGGER} className="grid grid-cols-1 gap-3">
                {COMMUNITIES.map((c) => (
                  <motion.div
                    key={c.name}
                    variants={FADE_UP}
                    className="flex items-center gap-4 bg-card border border-border rounded-sm px-4 py-3"
                  >
                    <MapPin size={15} className="text-primary shrink-0" />
                    <div className="flex-1">
                      <span className="font-semibold text-foreground text-sm">{c.name}</span>
                      <span className="text-muted-foreground text-xs ml-2">— {c.note}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{c.county}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL PULL */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex justify-center gap-1 text-yellow-500 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={22} fill="currentColor" />)}
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground">What customers say</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Sarah Jenkins", loc: "Clermont, FL", text: "Gerrit and his team transformed our downstairs living area. The attention to detail around our stone fireplace was incredible. They showed up when they said they would, kept the house clean, and the final result is stunning. Worth every penny." },
              { name: "Michael Torres", loc: "Winter Garden, FL", text: "We had ugly carpet on our stairs that Gerrit replaced with custom stained wood treads to match our new LVP floors. The craftsmanship is flawless. It completely changed the look of our entryway. Highly professional from start to finish." },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-border p-6 rounded-sm"
              >
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[1,2,3,4,5].map(j => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-foreground/80 italic leading-relaxed mb-5">"{r.text}"</p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold text-foreground font-serif">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.loc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials">
              <span className="text-primary font-medium underline underline-offset-4 cursor-pointer text-sm hover:text-foreground transition-colors">
                Read all reviews →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER} className="text-center mb-12">
            <motion.h2 variants={FADE_UP} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Common Questions</motion.h2>
            <motion.h3 variants={FADE_UP} className="text-3xl font-serif font-bold text-foreground">
              Flooring FAQ — Clermont, FL
            </motion.h3>
          </motion.div>

          <div className="space-y-5">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-sm p-6"
              >
                <h4 className="font-serif font-bold text-foreground mb-3">{faq.name}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{faq.acceptedAnswer.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
            <motion.h2 variants={FADE_UP} className="text-4xl font-serif font-bold text-white mb-4">
              Ready for new floors in Clermont?
            </motion.h2>
            <motion.p variants={FADE_UP} className="text-primary-foreground/80 text-lg mb-8">
              We'll bring samples right to your home and provide a free, no-pressure estimate. Most estimates are scheduled within 48 hours.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?ref=clermont-cta">
                <Button size="lg" variant="secondary" className="rounded-none h-14 px-10 text-base font-semibold shadow-xl">
                  Schedule a Free Estimate
                </Button>
              </Link>
              <a href="tel:3529884006" onClick={trackPhoneClick}>
                <Button size="lg" variant="outline" className="rounded-none h-14 px-10 text-base border-white/30 text-white hover:bg-white hover:text-primary transition-all gap-2">
                  <Phone size={18} />
                  (352) 988-4006
                </Button>
              </a>
            </motion.div>
            <motion.div variants={FADE_UP} className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/65">
              <span className="flex items-center gap-2"><Shield size={14} />Licensed &amp; Insured</span>
              <span className="flex items-center gap-2"><Clock size={14} />Responds within 24 hours</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} />No high-pressure sales</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
