import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, Send } from "lucide-react";

const ContactSection = () => {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occupancy: "",
    duration: "",
    branch: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      "New Hostel Enquiry",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Occupancy: ${formData.occupancy}`,
      `Duration: ${formData.duration}`,
      `Branch: ${formData.branch}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/917903304001?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
                  <p className="text-muted-foreground text-sm">+91 94316 25833</p>
                  <p className="text-muted-foreground text-sm">+91 93414 53366</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Email</p>
                  <p className="text-muted-foreground text-sm">sushmitagirlshostelpatna@gmail.com</p>
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
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <input
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
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                  <input
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
                  <label className="block text-sm font-medium text-foreground mb-1.5">Occupancy</label>
                  <select
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
                  <label className="block text-sm font-medium text-foreground mb-1.5">Duration of Stay</label>
                  <select
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
                  <label className="block text-sm font-medium text-foreground mb-1.5">Branch</label>
                  <select
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
