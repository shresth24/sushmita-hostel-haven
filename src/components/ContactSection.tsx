import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, Send } from "lucide-react";

const ContactSection = () => {
  const ref = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section-padding">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Get in Touch</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground leading-[1.15] mb-5">
              We'd Love to<br />Hear From You
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Have questions about admission, rooms, or want to schedule a visit?
              Reach out — we respond within a few hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Phone</p>
                  <p className="text-muted-foreground text-sm">+91 98765 43210</p>
                  <p className="text-muted-foreground text-sm">+91 91234 56789</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Email</p>
                  <p className="text-muted-foreground text-sm">info@sushmitagirlshostel.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-primary" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Operating Hours</p>
                  <p className="text-muted-foreground text-sm">Mon – Sat: 9:00 AM – 7:00 PM</p>
                  <p className="text-muted-foreground text-sm">Sunday: 10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-surface rounded-2xl p-8 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Send className="text-green-600" size={22} />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">We'll get back to you shortly. Thank you for your interest.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
