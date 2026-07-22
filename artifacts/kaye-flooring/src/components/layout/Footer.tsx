import { Link } from "wouter";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="md:col-span-1 space-y-4">
            <div className="mb-6">
              <img
                src="/kaye-flooring-logo.png"
                alt="Kaye Flooring Inc."
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Central Florida's trusted experts in premium hardwood, custom stairs, and luxury vinyl plank installation. Craftsmanship you can stand on.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services#custom-stairs">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">Custom Stairs</span>
                </Link>
              </li>
              <li>
                <Link href="/services#engineered">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">Engineered Hardwood</span>
                </Link>
              </li>
              <li>
                <Link href="/services#solid">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">Solid Hardwood</span>
                </Link>
              </li>
              <li>
                <Link href="/services#lvp">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">Luxury Vinyl Plank</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">Portfolio</span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">Testimonials</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Port Orange, FL<br/>Serving Central Florida</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:4075550100" className="hover:text-white transition-colors">(407) 555-0100</a>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@kayeflooring.com" className="hover:text-white transition-colors">info@kayeflooring.com</a>
              </li>
            </ul>
            
            <div className="pt-4 flex items-center gap-4">
              <a 
                href="https://www.facebook.com/kayeflooringinc/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Kaye Flooring Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy"><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></Link>
            <Link href="/terms"><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
