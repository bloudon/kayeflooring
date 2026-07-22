import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

import ownerImg from "@assets/generated_images/about-owner.jpg";

export default function About() {
  return (
    <div className="w-full pt-28 pb-20 bg-background bg-noise min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[3/4] max-w-md mx-auto lg:ml-0 relative z-10">
              <img 
                src={ownerImg} 
                alt="Nicholas Kaye, Owner" 
                className="w-full h-full object-cover rounded-sm shadow-2xl"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute top-8 -right-8 bottom-8 -left-8 bg-card border border-border -z-10 rounded-sm hidden md:block"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-primary"></div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Story</span>
              </div>
              <h1 className="text-5xl font-serif font-bold text-foreground mb-6">
                Craftsmanship is not a commodity.
              </h1>
            </div>

            <div className="prose prose-lg prose-p:text-muted-foreground prose-p:leading-relaxed">
              <p>
                Kaye Flooring Inc was founded by Nicholas Kaye with a simple premise: Central Florida homeowners deserve better than the rushed, mass-volume installations provided by big-box stores.
              </p>
              <p>
                Flooring is the foundation of your home's interior. It's the surface you walk on, play on, and live on every single day. A poor installation isn't just an aesthetic issue—it's a daily annoyance that diminishes the value of your property.
              </p>
              <p>
                We approach every job, whether it's a small bedroom or a 5,000 square foot custom build, with the mindset of a craftsman. That means proper subfloor preparation (the secret to a floor that lasts), immaculate transitions, and a clean, respectful work environment.
              </p>
              <p>
                When you hire Kaye Flooring, you deal directly with the owner. No middlemen, no disappearing acts, no excuses. Just honest communication and premium results.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-border mt-8">
              <div>
                <h4 className="font-bold text-xl text-foreground mb-2">Licensed</h4>
                <p className="text-sm text-muted-foreground">Fully licensed and insured in the state of Florida for your peace of mind.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-foreground mb-2">Local</h4>
                <p className="text-sm text-muted-foreground">Based in Port Orange, serving Volusia County and surrounding areas.</p>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/contact">
                <Button size="lg" className="rounded-none shadow-lg">
                  Work With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
