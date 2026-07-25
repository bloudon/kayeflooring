import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import stairsImg from "@assets/generated_images/stairs.jpg";
import engineeredImg from "@assets/generated_images/engineered.jpg";
import solidImg from "@assets/generated_images/solid.jpg";
import lvpImg from "@assets/generated_images/lvp.jpg";

export default function Services() {
  const services = [
    {
      id: "custom-stairs",
      title: "Custom Stairs",
      description: "Staircases are the focal point of many homes, yet they are often the most challenging flooring project. We specialize in transforming carpeted or outdated stairs into stunning architectural features with custom wood treads, painted risers, and flawless trim work.",
      image: stairsImg,
      features: ["Custom-stained treads to match floors", "White painted risers", "Skirting board installation", "Complex pie steps and landings"],
      reversed: false
    },
    {
      id: "solid",
      title: "Solid Hardwood",
      description: "Nothing matches the authentic feel, sound, and longevity of solid hardwood. We install premium solid wood flooring that adds true value to your home. With proper installation and subfloor preparation, these floors can last generations.",
      image: solidImg,
      features: ["Wide-plank and traditional strip", "Nail-down or glue-down installation", "Moisture testing and mitigation", "Custom borders and patterns"],
      reversed: true
    },
    {
      id: "engineered",
      title: "Engineered Hardwood",
      description: "Engineered hardwood provides the beauty of real wood with enhanced stability, making it perfect for Florida's humid climate and concrete slab foundations. We ensure perfect seams, hollow-spot prevention, and proper acclimation.",
      image: engineeredImg,
      features: ["Floating, glue-down, or staple installation", "High-end European Oak specialists", "Flawless transitions to tile", "Subfloor leveling included"],
      reversed: false
    },
    {
      id: "lvp",
      title: "Luxury Vinyl Plank (LVP)",
      description: "Modern LVP offers incredible realism with unmatched durability. Waterproof, scratch-resistant, and perfect for active families or pets. We install premium vinyl that looks like real wood without the maintenance anxiety.",
      image: lvpImg,
      features: ["100% waterproof options", "Rigid core and WPC types", "Acoustic underlayment", "Staggered natural patterns"],
      reversed: true
    }
  ];

  return (
    <div className="w-full pt-28 pb-20 bg-background bg-noise min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground">
            We don't just lay floors; we craft surfaces you'll live on for decades. From complete home renovations to a single staircase, every project gets our signature attention to detail.
          </p>
        </motion.div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-32">
              <div className={`flex flex-col lg:flex-row gap-12 items-center ${service.reversed ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: service.reversed ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: service.reversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-[1px] bg-primary"></div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">Specialty</span>
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-foreground">{service.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={20} className="text-secondary shrink-0 mt-0.5" />
                        <span className="text-foreground/80 font-medium text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <Link href={`/contact?ref=service-${service.id}`}>
                      <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                        Request Quote for {service.title}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-primary text-primary-foreground p-12 text-center relative overflow-hidden rounded-sm"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0yMCAyMGgtdjEwaDEwdjEwaC0xMHYtMTBIMTB2MTBoMTB2MTBoMTB2LTEwaC0xMHYtMTBoLTEwdi0xMGgtMTB2MTBIMTB2LTEwaDEwVjBoMTBWMHoiIGZpbGw9IiNmZmZiIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-white mb-4">Don't see what you're looking for?</h3>
            <p className="text-white/80 mb-8">We also handle subfloor repair, baseboard installation, demolition of existing flooring, and transition molding custom fabrication.</p>
            <Link href="/contact?ref=custom-project">
              <Button size="lg" className="rounded-none bg-white text-primary hover:bg-white/90">
                Discuss Your Custom Project <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
