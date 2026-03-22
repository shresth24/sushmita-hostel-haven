import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Wifi,
  ShieldCheck,
  Utensils,
  Zap,
  Bath,
  BedDouble,
  Tv,
  Lock,
} from "lucide-react";

const facilities = [
  { icon: BedDouble, title: "Room Options", desc: "Comfortable single & double-sharing rooms with quality furnishing" },
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Uninterrupted internet for study and staying connected" },
  { icon: ShieldCheck, title: "24/7 Security", desc: "CCTV surveillance, female warden, and strict entry protocols" },
  { icon: Utensils, title: "Hygienic Meals", desc: "Nutritious home-style meals prepared in a clean kitchen" },
  { icon: Zap, title: "Power Backup", desc: "Generator backup ensuring uninterrupted electricity" },
  { icon: Bath, title: "Clean Washrooms", desc: "Well-maintained and sanitized washrooms on every floor" },
  { icon: Tv, title: "Recreation Area", desc: "Common room with TV for relaxation and socialising" },
  { icon: Lock, title: "Secure Lockers", desc: "Personal storage lockers to safeguard your belongings" },
];

const FacilitiesSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="facilities" className="section-padding bg-surface">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Facilities</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-5">
            Everything You Need,<br />Nothing You Don't
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We've thought of every detail so students can focus on what matters most — their education.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="group bg-background rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <f.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-foreground mb-1.5">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
