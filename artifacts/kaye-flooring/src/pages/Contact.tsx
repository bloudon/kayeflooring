import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Tag, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_REVIEW_URL = "https://g.page/r/CbI2aQ6FKayeFlooring/review";

const REF_LABELS: Record<string, string> = {
  "hero":                  "Hero — Get Your Free Estimate",
  "home-cta":              "Home Page — Ready to Upgrade",
  "service-custom-stairs": "Custom Stairs Inquiry",
  "service-solid":         "Solid Hardwood Inquiry",
  "service-engineered":    "Engineered Hardwood Inquiry",
  "service-lvp":           "Luxury Vinyl Plank Inquiry",
  "custom-project":        "Custom / Other Project",
  "gallery":               "Portfolio Gallery",
  "about":                 "About — Work With Us",
  "testimonials":          "Testimonials — Get Started",
  "navbar":                "Nav — Get a Free Quote",
};

const REF_TO_SERVICE: Record<string, string> = {
  "service-custom-stairs": "stairs",
  "service-solid":         "solid",
  "service-engineered":    "engineered",
  "service-lvp":           "lvp",
};

export default function Contact() {
  const { toast } = useToast();
  const search = useSearch();

  const ref = useMemo(() => new URLSearchParams(search).get("ref") ?? "", [search]);
  const refLabel = REF_LABELS[ref] ?? "";
  const preselectedService = REF_TO_SERVICE[ref] ?? "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    phone:     "",
    service:   preselectedService,
    message:   "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: refLabel || "Direct",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Unknown error");

      toast({
        title: "Request Sent Successfully",
        description: "Thank you! We'll be in touch within 24 hours to discuss your project.",
      });

      // Fire GA4 conversion event
      if (typeof gtag !== "undefined") {
        gtag("event", "generate_lead", {
          source: ref || "direct",
        });
      }

      setFormData({ firstName: "", lastName: "", email: "", phone: "", service: preselectedService, message: "" });
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-28 pb-20 bg-background min-h-screen relative">
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
            Tell us a little about your project. We'll get back to you promptly to schedule an in-home
            consultation where we can look at your space, discuss options, and provide an accurate quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">

          {/* Contact info sidebar */}
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
                    <a href="tel:3529884006" className="text-muted-foreground hover:text-primary transition-colors">(352) 988-4006</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:kayeflooring@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">kayeflooring@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Service Area</p>
                    <p className="text-muted-foreground text-sm">Lake, Marion &amp; Orange Counties</p>
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

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-card p-8 md:p-10 rounded-sm shadow-xl border border-border">

              {/* Lead source badge */}
              {refLabel && (
                <div className="flex items-center gap-2 bg-primary/8 border border-primary/20 text-primary px-4 py-2.5 rounded-sm mb-8 text-sm font-medium">
                  <Tag size={14} className="shrink-0" />
                  <span>Asking about: <strong>{refLabel}</strong></span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name *</label>
                  <Input id="firstName" value={formData.firstName} onChange={set("firstName")} required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name *</label>
                  <Input id="lastName" value={formData.lastName} onChange={set("lastName")} required className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</label>
                  <Input id="email" type="email" value={formData.email} onChange={set("email")} required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number *</label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={set("phone")} required className="bg-background" />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-foreground">Project Type *</label>
                <Select
                  required
                  value={formData.service}
                  onValueChange={val => setFormData(prev => ({ ...prev, service: val }))}
                >
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
                  value={formData.message}
                  onChange={set("message")}
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

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 bg-card border border-border rounded-sm p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5"
              >
                <div className="flex gap-0.5 text-yellow-500 shrink-0">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-semibold text-foreground text-sm">Had a great experience with us?</p>
                  <p className="text-muted-foreground text-sm mt-0.5">Leave a quick Google review — it only takes a minute and helps other homeowners find us.</p>
                </div>
                <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <Button variant="outline" size="sm" className="rounded-none gap-2 whitespace-nowrap">
                    <ExternalLink size={14} />
                    Leave a Review
                  </Button>
                </a>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
