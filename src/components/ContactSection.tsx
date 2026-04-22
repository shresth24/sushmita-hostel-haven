import { siteConfig } from "@/content/site";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

type ContactFormField = HTMLInputElement | HTMLSelectElement;

const ContactSection = () => {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occupancy: "",
    duration: "",
    branch: "",
  });

  const handleChange = (e: ChangeEvent<ContactFormField>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = [
      "New Hostel Enquiry",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Occupancy: ${formData.occupancy}`,
      `Duration: ${formData.duration}`,
      `Branch: ${formData.branch}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="section-padding">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Get in Touch</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground leading-[1.15] mb-5">
              We'd Love to
              <br />
              Hear From You
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Have questions about admission, rooms, or want to schedule a visit?
              Reach out - we respond within a few hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Phone</p>
                  <a href="tel:+919431625833" className="block text-muted-foreground text-sm hover:text-foreground">
                    {siteConfig.contact.primaryPhone}
                  </a>
                  <a href="tel:+919341453366" className="block text-muted-foreground text-sm hover:text-foreground">
                    {siteConfig.contact.secondaryPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-muted-foreground text-sm hover:text-foreground"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-primary" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Operating Hours</p>
                  {siteConfig.hours.display.map((line) => (
                    <p key={line} className="text-muted-foreground text-sm">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="contact-occupancy" className="block text-sm font-medium text-foreground mb-1.5">
                  Occupancy
                </label>
                <select
                  id="contact-occupancy"
                  required
                  name="occupancy"
                  value={formData.occupancy}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                >
                  <option value="" disabled>Select occupancy</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-duration" className="block text-sm font-medium text-foreground mb-1.5">
                  Duration of Stay
                </label>
                <select
                  id="contact-duration"
                  required
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                >
                  <option value="" disabled>Select duration</option>
                  <option value="< 6 months">&lt; 6 months</option>
                  <option value="< 1 year">&lt; 1 year</option>
                  <option value="> 1 year">&gt; 1 year</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-branch" className="block text-sm font-medium text-foreground mb-1.5">
                  Branch
                </label>
                <select
                  id="contact-branch"
                  required
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                >
                  <option value="" disabled>Select branch</option>
                  <option value="Boring Road">Boring Road</option>
                  <option value="Rajapur">Rajapur</option>
                </select>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
