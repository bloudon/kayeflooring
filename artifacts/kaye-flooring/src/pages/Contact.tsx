import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Sent Successfully",
        description: "Thank you! We'll be in touch within 24 hours to discuss your project.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="w-full pt-28 pb-20 bg-background min-h-screen relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-primary/5 rounded-bl-[100px] -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">Get Your Free Estimate</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tell us a little about your project. We'll get back to you promptly to schedule an in-home consultation where we can look at your space, discuss options, and provide an accurate quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-10"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a href="tel:4075550100" className="text-muted-foreground hover:text-primary transition-colors">(407) 555-0100</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:info@kayeflooring.com" className="text-muted-foreground hover:text-primary transition-colors">info@kayeflooring.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Service Area</p>
                    <p className="text-muted-foreground">Port Orange, FL</p>
                    <p className="text-muted-foreground text-sm">Serving Volusia County & Central Florida</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sat: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-sm shadow-sm">
              <h4 className="font-serif font-bold text-lg mb-2">What to expect</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary font-bold">1.</span> Quick response to your inquiry</li>
                <li className="flex gap-2"><span className="text-primary font-bold">2.</span> Free in-home measurement & consultation</li>
                <li className="flex gap-2"><span className="text-primary font-bold">3.</span> Detailed, transparent quote with no hidden fees</li>
                <li className="flex gap-2"><span className="text-primary font-bold">4.</span> Expert installation by our own crew</li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-card p-8 md:p-10 rounded-sm shadow-xl border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name *</label>
                  <Input id="firstName" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name *</label>
                  <Input id="lastName" required className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</label>
                  <Input id="email" type="email" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number *</label>
                  <Input id="phone" type="tel" required className="bg-background" />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-foreground">Project Type *</label>
                <Select required>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stairs">Custom Stairs</SelectItem>
                    <SelectItem value="engineered">Engineered Hardwood</SelectItem>
                    <SelectItem value="solid">Solid Hardwood</SelectItem>
                    <SelectItem value="lvp">Luxury Vinyl Plank</SelectItem>
                    <SelectItem value="repair">Repair / Refinishing</SelectItem>
                    <SelectItem value="other">Other / Not Sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mb-8">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Tell us about your project</label>
                <Textarea 
                  id="message" 
                  placeholder="Approximate square footage, current flooring type, timeframe, etc." 
                  className="min-h-[150px] bg-background"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-auto rounded-none px-12 h-14 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending Request..." : "Request Free Estimate"}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
