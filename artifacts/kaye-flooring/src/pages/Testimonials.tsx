import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Sarah Jenkins",
    location: "Ormond Beach, FL",
    project: "Solid Hardwood Installation",
    text: "Gerrit and his team transformed our downstairs living area. The attention to detail around our stone fireplace was incredible. They showed up when they said they would, kept the house clean, and the final result is stunning. Worth every penny.",
    rating: 5
  },
  {
    name: "Michael Torres",
    location: "Port Orange, FL",
    project: "Custom Stairs & LVP",
    text: "We had ugly carpet on our stairs that Gerrit replaced with custom stained wood treads to match our new LVP floors. The craftsmanship is flawless. It completely changed the look of our entryway. Highly professional from start to finish.",
    rating: 5
  },
  {
    name: "David & Linda Vance",
    location: "New Smyrna Beach, FL",
    project: "Engineered Hardwood",
    text: "After a terrible experience with a big box store contractor, we found Kaye Flooring. The difference is night and day. Nick leveled our uneven concrete slab before installing the engineered wood, which the previous guys didn't even mention. The floor feels solid and looks beautiful.",
    rating: 5
  },
  {
    name: "Amanda Clark",
    location: "Daytona Beach, FL",
    project: "Luxury Vinyl Plank",
    text: "I wanted durable floors for my dogs but didn't want it to look cheap. Nick brought samples to the house, helped me pick a beautiful LVP, and installed it flawlessly. The transitions between rooms are seamless. Outstanding work.",
    rating: 5
  },
  {
    name: "Robert Hughes",
    location: "Ponce Inlet, FL",
    project: "Whole House Flooring",
    text: "Communication was excellent throughout the entire two-week project. They moved furniture carefully, managed dust extremely well, and the baseboard work was the cherry on top. A true master of his craft.",
    rating: 5
  },
  {
    name: "Elena Rostova",
    location: "Deland, FL",
    project: "Staircase Renovation",
    text: "The stairs are a work of art. Period. I couldn't be happier with Kaye Flooring. If you want it done right, this is the company to hire.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <div className="w-full pt-28 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex justify-center gap-1 text-primary mb-6">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={28} fill="currentColor" />)}
          </div>
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">Client Stories</h1>
          <p className="text-lg text-muted-foreground">
            We build our business on reputation. Read what your neighbors have to say about their experience with Kaye Flooring.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border p-8 rounded-sm relative shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote size={40} className="text-primary/10 absolute top-6 right-6" />
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-8 italic">
                "{review.text}"
              </p>
              <div className="mt-auto pt-6 border-t border-border/50">
                <p className="font-bold text-foreground font-serif text-lg">{review.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider">{review.project}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-secondary/10 py-16 px-4 rounded-sm"
        >
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Ready to be our next success story?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Contact us today to schedule your free in-home consultation and estimate.</p>
          <Link href="/contact?ref=testimonials">
            <Button size="lg" className="rounded-none shadow-xl px-10">
              Get Started
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
