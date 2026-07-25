import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

import gal1 from "@assets/generated_images/gallery-1.jpg";
import gal2 from "@assets/generated_images/gallery-2.jpg";
import gal3 from "@assets/generated_images/gallery-3.jpg";
import gal4 from "@assets/generated_images/gallery-4.jpg";
import gal5 from "@assets/generated_images/gallery-5.jpg";
import gal6 from "@assets/generated_images/gallery-6.jpg";
import gal7 from "@assets/generated_images/gallery-7.jpg";
import gal8 from "@assets/generated_images/gallery-8.jpg";

const images = [
  { src: gal1, alt: "Custom Staircase", span: "md:col-span-2 md:row-span-2" },
  { src: gal2, alt: "Hardwood Detail", span: "md:col-span-1 md:row-span-1" },
  { src: gal3, alt: "LVP Sunroom", span: "md:col-span-1 md:row-span-1" },
  { src: gal4, alt: "Dining Room Solid Wood", span: "md:col-span-1 md:row-span-2" },
  { src: gal5, alt: "Herringbone Hallway", span: "md:col-span-2 md:row-span-1" },
  { src: gal6, alt: "Open Concept Hardwood", span: "md:col-span-2 md:row-span-2" },
  { src: gal7, alt: "Transition Detail", span: "md:col-span-1 md:row-span-1" },
  { src: gal8, alt: "Cozy Bedroom Wood", span: "md:col-span-1 md:row-span-1" },
];

export default function Gallery() {
  return (
    <div className="w-full pt-28 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">Our Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            A selection of our recent installations across Central Florida. Every photo represents a transformed home and a satisfied customer.
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden group rounded-sm ${img.span}`}
            >
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                <span className="text-white font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.alt}</span>
              </div>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-xl font-serif mb-6">Inspired to start your own project?</p>
          <Link href="/contact?ref=gallery">
            <Button size="lg" className="rounded-none px-8">
              Get Your Free Estimate
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
