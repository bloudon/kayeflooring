import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-border py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer group">
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                scale: { type: "spring", stiffness: 120, damping: 18 },
                opacity: { duration: 0.4 }
              }}
              className="bg-black/55 backdrop-blur-sm rounded px-1.5 py-0.5 md:px-3 md:py-2 origin-top-left"
            >
              <img
                src="/kaye-flooring-logo.png"
                alt="Kaye Flooring Inc."
                className="h-14 md:h-36 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </motion.div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <span className={cn(
                    "text-sm font-medium transition-colors hover:text-primary cursor-pointer relative group",
                    location === link.href 
                      ? (scrolled ? "text-primary" : "text-white") 
                      : (scrolled ? "text-muted-foreground" : "text-white/80 hover:text-white")
                  )}>
                    {link.name}
                    {location === link.href && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact">
            <Button className={cn(
              "rounded-none shadow-none font-medium transition-all",
              !scrolled && location === "/" ? "bg-white text-primary hover:bg-white/90" : ""
            )}>
              Get a Free Quote
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-md transition-colors",
            scrolled ? "text-foreground" : "text-foreground md:text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div 
                    className={cn(
                      "text-lg font-serif py-2 border-b border-border/50 cursor-pointer transition-colors",
                      location === link.href ? "text-primary font-bold" : "text-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <a href="tel:4075550100" className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={18} />
                  <span>(407) 555-0100</span>
                </a>
                <Link href="/contact">
                  <Button className="w-full rounded-none" onClick={() => setIsOpen(false)}>
                    Get Your Free Estimate
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
