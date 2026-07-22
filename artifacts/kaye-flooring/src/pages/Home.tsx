import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@assets/generated_images/hero.jpg";
import stairsImg from "@assets/generated_images/stairs.jpg";
import lvpImg from "@assets/generated_images/lvp.jpg";
import solidImg from "@assets/generated_images/solid.jpg";
import ownerImg from "@assets/generated_images/about-owner.jpg";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-[95vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImg} 
            alt="Beautiful hardwood flooring" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER}
            >
              <motion.div variants={FADE_UP} className="inline-block bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-sm text-sm font-semibold mb-6 tracking-wide uppercase">
                Central Florida Flooring Installation Experts
              </motion.div>
              <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 text-balance">
                Craftsmanship <br className="hidden md:block"/>You Can Stand On.
              </motion.h1>
              <motion.p variants={FADE_UP} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed">
                Specializing in premium hardwood, custom stairs, and luxury vinyl plank. We bring precision and care to every room in your home.
              </motion.p>
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-none text-base h-14 px-8 shadow-xl hover:scale-105 transition-transform duration-300">
                    Get Your Free Estimate
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button size="lg" variant="outline" className="rounded-none text-base h-14 px-8 bg-transparent text-white border-white hover:bg-white hover:text-foreground transition-all duration-300">
                    View Our Portfolio
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section className="py-20 bg-background bg-noise relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}
              className="text-center space-y-4"
            >
              <h3 className="text-4xl font-serif font-bold text-primary">15+</h3>
              <p className="text-foreground font-medium text-lg">Years of Experience</p>
              <p className="text-muted-foreground text-sm leading-relaxed">Mastering the art of perfect seams and seamless transitions.</p>
            </motion.div>
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}
              className="text-center space-y-4 relative"
            >
              <div className="hidden md:block absolute top-1/4 -left-6 w-[1px] h-1/2 bg-border"></div>
              <h3 className="text-4xl font-serif font-bold text-primary">1,000+</h3>
              <p className="text-foreground font-medium text-lg">Projects Completed</p>
              <p className="text-muted-foreground text-sm leading-relaxed">From single rooms to full custom home installations.</p>
              <div className="hidden md:block absolute top-1/4 -right-6 w-[1px] h-1/2 bg-border"></div>
            </motion.div>
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}
              className="text-center space-y-4"
            >
              <h3 className="text-4xl font-serif font-bold text-primary">5-Star</h3>
              <p className="text-foreground font-medium text-lg">Customer Satisfaction</p>
              <p className="text-muted-foreground text-sm leading-relaxed">Built on trust, transparency, and doing it right the first time.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Expertise</h2>
              <h3 className="text-4xl font-serif font-bold text-foreground">Premium Flooring Services</h3>
            </div>
            <Link href="/services">
              <span className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all cursor-pointer group">
                View all services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Custom Stairs", img: stairsImg, desc: "Transform your staircase into a breathtaking architectural centerpiece." },
              { title: "Hardwood", img: solidImg, desc: "Timeless beauty and durability that lasts for generations." },
              { title: "Luxury Vinyl", img: lvpImg, desc: "Water-proof, family-friendly, and stunningly realistic wood looks." }
            ].map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="text-2xl font-serif font-bold mb-3">{service.title}</h4>
                <p className="text-muted-foreground mb-4">{service.desc}</p>
                <Link href="/services">
                  <span className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2 hover:text-foreground transition-colors">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0yMCAyMGgtdjEwaDEwdjEwaC0xMHYtMTBIMTB2MTBoMTB2MTBoMTB2LTEwaC0xMHYtMTBoLTEwdi0xMGgtMTB2MTBIMTB2LTEwaDEwVjBoMTBWMHoiIGZpbGw9IiNmZmZiIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3">About The Owner</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                  Hi, I'm Gerrit Kaye.
                </h3>
              </div>
              <p className="text-lg text-primary-foreground/90 leading-relaxed font-light">
                I didn't start this company to be the biggest flooring contractor in Florida. I started it because I believe in doing things right. When you hire Kaye Flooring, you're not getting a random crew—you're getting craftsmen who treat your home like their own.
              </p>
              <ul className="space-y-4">
                {[
                  "Direct owner involvement on every job",
                  "Dust-controlled installation process",
                  "Precise attention to baseboards and transitions",
                  "Fully licensed and insured in FL"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 size={20} className="text-secondary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="outline" className="rounded-none mt-4 border-white/30 hover:bg-white hover:text-primary">
                  Read Our Story
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border-8 border-white/10 shadow-2xl">
                <img src={ownerImg} alt="Gerrit Kaye" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl max-w-[200px] hidden md:block rounded-sm">
                <div className="flex gap-1 text-yellow-500 mb-2">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-xs font-bold text-foreground">"The absolute best contractor we've worked with in Florida."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Ready to upgrade your home?</h2>
          <p className="text-muted-foreground text-lg mb-10">Contact us today for a free, no-pressure estimate. We'll bring samples to your home and discuss the best options for your space.</p>
          <Link href="/contact">
            <Button size="lg" className="rounded-none h-14 px-10 text-base shadow-xl">
              Get Your Free Estimate
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
