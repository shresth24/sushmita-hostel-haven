import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "As a parent, sending my daughter to Patna was nerve-wracking. Sushmita Hostel gave us complete peace of mind. The owners are always available and genuinely care.",
    name: "Reena Kumari",
    role: "Parent, from Ranchi",
  },
  {
    quote: "The food is homely, the rooms are clean, and the warden aunty is like a second mother. I've been here two years and it truly feels like home.",
    name: "Priya Sinha",
    role: "NEET Aspirant",
  },
  {
    quote: "I chose this hostel because of the location near Boring Road coaching centres. The Wi-Fi and study environment are perfect for serious preparation.",
    name: "Ankita Verma",
    role: "UPSC Aspirant",
  },
];

const TestimonialsSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="section-padding bg-surface">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-5">
            What Our Residents Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-background rounded-2xl p-8 shadow-sm relative"
            >
              <Quote className="text-primary/20 absolute top-6 right-6" size={32} />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative">
                "{t.quote}"
              </p>
              <div>
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm mb-2">
                  {t.name.charAt(0)}
                </div>
                <p className="font-medium text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
