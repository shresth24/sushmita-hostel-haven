import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Users, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "Round-the-clock security, CCTV monitoring, and strict visitor policies ensure your daughter is always protected.",
  },
  {
    icon: Heart,
    title: "Personal Care",
    desc: "Our owners live on-site and treat every resident like family. We believe in nurturing, not just housing.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "A warm community of like-minded students, supportive staff, and a culture that encourages academic excellence.",
  },
];

const AboutSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section-padding bg-surface">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">About Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-5">
            More Than a Hostel —<br />A Second Home
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Sushmita Girls' Hostel was founded with a simple mission: to give every young woman
            pursuing education in Patna a place that feels like home. Our owners are personally
            involved in daily operations, ensuring every resident receives individual attention,
            nutritious meals, and a secure environment where they can focus entirely on their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <v.icon className="text-primary" size={22} />
              </div>
              <h3 className="text-lg font-display text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
