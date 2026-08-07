import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Star, ArrowRight, MapPin, Phone, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    name: "Do you install flooring in The Villages, FL?",
    acceptedAnswer: { text: "Yes. Kaye Flooring Inc regularly installs hardwood, luxury vinyl plank (LVP), and custom stair flooring throughout The Villages community, including Lady Lake, Wildwood, Oxford, Fruitland Park, and surrounding areas in Sumter and Lake Counties." }
  },
  {
    name: "What type of flooring is best for Villages homes?",
    acceptedAnswer: { text: "Luxury vinyl plank (LVP) is extremely popular in The Villages because it is 100% waterproof, scratch-resistant, and far easier to maintain than carpet or hardwood — ideal for active lifestyles and pet owners. Engineered hardwood is a great choice for homeowners who want the look of real wood with more dimensional stability in Florida's humidity." }
  },
  {
    name: "How long does flooring installation take in a Villages home?",
    acceptedAnswer: { text: "Most single-room or open-plan installations are completed in one to two days. Whole-home projects typically take three to five days depending on square footage and subfloor preparation needed. We work efficiently to minimize disruption to your routine." }
  },
  {
    name: "Is Kaye Flooring licensed and insured in Florida?",
    acceptedAnswer: { text: "Yes. Kaye Flooring Inc is fully licensed and insured in the state of Florida. Every job is performed by trained installers with direct owner oversight — not subcontracted crews." }
  },
  {
    name: "Do you offer free estimates in The Villages area?",
    acceptedAnswer: { text: "Yes. We offer free, no-obligation in-home estimates throughout The Villages and surrounding Sumter and Lake County communities. We bring samples directly to your home so you can see how different flooring options look in your actual lighting and space." }
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://kayeflooring.com/#business",
      "name": "Kaye Flooring Inc",
      "description": "Licensed flooring installation contractor serving The Villages, FL. Specializing in hardwood, luxury vinyl plank, and custom stair installation for residential homes in The Villages community.",
      "url": "https://kayeflooring.com/villages-fl-flooring-installation",
      "telephone": "+13529884006",
      "email": "info@kayeflooring.com",
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
        "addressLocality": "The Villages",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.9271,
        "longitude": -81.9631
      },
      "areaServed": [
        { "@type": "City", "name": "The Villages", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Lady Lake", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Wildwood", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Oxford", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Fruitland Park", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Coleman", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Leesburg", "containedInPlace": { "@type": "State", "name": "Florida" } },
        { "@type": "City", "name": "Belleview", "containedInPlace": { "@type": "State", "name": "Florida" } }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Flooring Installation Services — The Villages, FL",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Luxury Vinyl Plank (LVP) Installation", "description": "Waterproof, durable LVP flooring ideal for active retirement living. Pet-friendly and easy to maintain." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hardwood Flooring Installation", "description": "Solid and engineered hardwood installation for Villages homes seeking timeless elegance." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Stair Installation", "description": "Stair tread replacement and full staircase renovation serving The Villages area." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Floor Repair & Refinishing", "description": "Hardwood refinishing and floor repair services for existing flooring in Villages homes." } }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "47",
        "bestRating": "5"
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
  { name: "Lady Lake", county: "Lake County", note: "North Villages gateway" },
  { name: "Wildwood", county: "Sumter County", note: "Villages core & new builds" },
  { name: "Oxford", county: "Sumter County", note: "Southern Villages districts" },
  { name: "Fruitland Park", county: "Lake County", note: "East Villages corridor" },
  { name: "Coleman", county: "Sumter County", note: "West Sumter communities" },
  { name: "Lake Panasoffkee", county: "Sumter County", note: "Rural Sumter area" },
  { name: "Leesburg", county: "Lake County", note: "Lake County hub" },
  { name: "Belleview", county: "Marion County", note: "South Marion corridor" },
];

const SERVICES = [
  {
    name: "Luxury Vinyl Plank (LVP)",
    badge: "Most Popular",
    desc: "Waterproof, scratch-resistant, and indistinguishable from real wood — LVP is the top choice for Villages homeowners. Holds up to Florida humidity, pets, and an active lifestyle without the maintenance demands of hardwood.",
    points: ["100% waterproof — no warping or swelling", "Scratch-resistant surface coat", "Stays comfortable underfoot year-round", "Huge style selection to match any interior"],
  },
  {
    name: "Hardwood & Engineered Wood",
    badge: null,
    desc: "Real wood flooring adds lasting value and timeless character to Villages homes. We install solid and engineered hardwood with precision attention to acclimation, subfloor prep, and seamless transitions.",
    points: ["Solid & engineered options", "Custom staining available", "Proper acclimation in Florida humidity", "Refinishable for multi-decade life"],
  },
  {
    name: "Custom Stair Installation",
    badge: null,
    desc: "Transform worn or carpeted stairs into a design centerpiece. We replace treads, risers, and handrail skirts to match your new flooring — creating a cohesive look from the first step to the last room.",
    points: ["Tread & riser replacement", "Matching species & stain to floors", "Safe, code-compliant installation", "Dramatic visual impact"],
  },
];

export default function TheVillages() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Flooring Installer in The Villages, FL | Kaye Flooring Inc";

    // Inject JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "villages-schema";
    script.text = JSON.stringify(SCHEMA);
    document.head.appendChild(script);

    return () => {
      document.title = prev;
      document.getElementById("villages-schema")?.remove();
    };
  }, []);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="pt-32 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMzBoNjBNMzAgMHYzMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={STAGGER}>
            <motion.div variants={FADE_UP} className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-6">
              <Link href="/"><span className="hover:text-primary-foreground cursor-pointer transition-colors">Home</span></Link>
              <span>/</span>
              <span>The Villages, FL</span>
            </motion.div>
            <motion.p variants={FADE_UP} className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
              Serving Sumter &amp; Lake Counties
            </motion.p>
            <motion.h1 variants={FADE_UP} className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 text-balance">
              Flooring Installation<br className="hidden md:block" /> in The Villages, FL
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl font-light leading-relaxed">
              Hardwood, luxury vinyl plank, and custom stair installation for Villages homeowners. Family-owned, fully licensed, and working directly in your community every week.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact?ref=villages-hero">
                <Button size="lg" variant="secondary" className="rounded-none h-14 px-10 text-base shadow-xl font-semibold">
                  Get a Free Estimate
                </Button>
              </Link>
              <a href="tel:3529884006">
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

      {/* WHY VILLAGES HOMEOWNERS CHOOSE KAYE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Why Choose Kaye Flooring</motion.h2>
              <motion.h3 variants={FADE_UP} className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 leading-snug">
                The flooring contractor Villages residents refer to their neighbors
              </motion.h3>
              <motion.p variants={FADE_UP} className="text-muted-foreground leading-relaxed mb-8">
                The Villages is one of the most active residential communities in the country. That means high foot traffic, active pets, and Florida humidity — all of which put real demands on your floors. We've worked extensively in this community and understand what products perform and what pitfalls to avoid.
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
              Flooring services we provide in The Villages
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
                    <Link href={`/contact?ref=villages-${svc.name.toLowerCase().replace(/\s+/g, '-')}`}>
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

      {/* VILLAGES CONTEXT */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">The Villages Advantage</motion.h2>
              <motion.h3 variants={FADE_UP} className="text-3xl font-serif font-bold text-foreground mb-5 leading-snug">
                Flooring that fits the Villages lifestyle
              </motion.h3>
              <motion.div variants={FADE_UP} className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Villages isn't just a zip code — it's one of the fastest-growing residential communities in the United States, home to over 80,000 active residents spread across Sumter, Lake, and Marion Counties. Whether you're in a patio villa near Lake Sumter Landing, a premier home in Brownwood, or a newer build south of SR-44, the flooring demands are consistent: durable, beautiful, and low-maintenance.
                </p>
                <p>
                  Florida's humidity is real, and so are the foot traffic demands of an active retirement lifestyle. Carpet holds allergens and shows wear fast. The wrong hardwood can cup and gap. We've seen it all — and we spec our materials and installation accordingly.
                </p>
                <p>
                  LVP has become the dominant choice in The Villages for good reason: it handles the full Florida climate cycle, stands up to golf cleats and pet claws, and comes in enough species and tone options that it looks right in any home style — from coastal to cottage to contemporary.
                </p>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h3 variants={FADE_UP} className="text-xl font-serif font-bold text-foreground mb-5">Communities we serve</motion.h3>
              <motion.div variants={STAGGER} className="grid grid-cols-1 gap-3">
                {COMMUNITIES.map((c, i) => (
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
              { name: "Robert Hughes", loc: "The Villages, FL", text: "Communication was excellent throughout the entire two-week project. They moved furniture carefully, managed dust extremely well, and the baseboard work was the cherry on top. A true master of his craft." },
              { name: "Elena Rostova", loc: "Lady Lake, FL", text: "The stairs are a work of art. Period. I couldn't be happier with Kaye Flooring. If you want it done right, this is the company to hire." },
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
              Flooring FAQ — The Villages, FL
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
              Ready for new floors in The Villages?
            </motion.h2>
            <motion.p variants={FADE_UP} className="text-primary-foreground/80 text-lg mb-8">
              We'll bring samples right to your home and provide a free, no-pressure estimate. Most estimates are scheduled within 48 hours.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?ref=villages-cta">
                <Button size="lg" variant="secondary" className="rounded-none h-14 px-10 text-base font-semibold shadow-xl">
                  Schedule a Free Estimate
                </Button>
              </Link>
              <a href="tel:3529884006">
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
