import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Loader2, ImagePlus } from "lucide-react";

import gal1 from "@assets/generated_images/gallery-1.jpg";
import gal2 from "@assets/generated_images/gallery-2.jpg";
import gal3 from "@assets/generated_images/gallery-3.jpg";
import gal4 from "@assets/generated_images/gallery-4.jpg";
import gal5 from "@assets/generated_images/gallery-5.jpg";
import gal6 from "@assets/generated_images/gallery-6.jpg";
import gal7 from "@assets/generated_images/gallery-7.jpg";
import gal8 from "@assets/generated_images/gallery-8.jpg";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const PLACEHOLDER_IMAGES = [
  { src: gal1, alt: "Custom Staircase" },
  { src: gal2, alt: "Hardwood Detail" },
  { src: gal3, alt: "LVP Sunroom" },
  { src: gal4, alt: "Dining Room Solid Wood" },
  { src: gal5, alt: "Herringbone Hallway" },
  { src: gal6, alt: "Open Concept Hardwood" },
  { src: gal7, alt: "Transition Detail" },
  { src: gal8, alt: "Cozy Bedroom Wood" },
];

interface ApiPhoto {
  id: string;
  full: string;
  thumb: string;
}

interface GalleryItem {
  src: string;       // thumb URL
  fullSrc: string;   // full URL for lightbox
  alt: string;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose }: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
        onClick={onClose}
      >
        <X className="w-7 h-7" />
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
        {current + 1} / {items.length}
      </span>

      {/* Prev */}
      {items.length > 1 && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
          onClick={(e) => { e.stopPropagation(); prev(); }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          src={items[current]!.fullSrc}
          alt={items[current]!.alt}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      {items.length > 1 && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
          onClick={(e) => { e.stopPropagation(); next(); }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </motion.div>
  );
}

// ── Main Gallery ──────────────────────────────────────────────────────────────
export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${BASE}/api/photos`)
      .then((r) => r.json())
      .then((data: ApiPhoto[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map((p, i) => ({
            src: p.thumb,
            fullSrc: p.full,
            alt: `Kaye Flooring installation ${i + 1}`,
          })));
        } else {
          // Fall back to placeholders until real photos are uploaded
          setItems(PLACEHOLDER_IMAGES.map((p) => ({ src: p.src, fullSrc: p.src, alt: p.alt })));
        }
      })
      .catch(() => {
        setItems(PLACEHOLDER_IMAGES.map((p) => ({ src: p.src, fullSrc: p.src, alt: p.alt })));
      })
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-[#c8956c] animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 text-muted-foreground">
            <ImagePlus className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-serif text-xl">Photos coming soon</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
            {items.map((img, i) => (
              <motion.div
                key={img.src + i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                className="relative overflow-hidden group rounded-sm break-inside-avoid cursor-pointer"
                onClick={() => setLightboxIdx(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={items}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
