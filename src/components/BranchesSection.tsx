import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, BookOpen, Building2 } from "lucide-react";

const branches = [
  {
    name: "Boring Road Branch",
    address: "House No. 14, Montessori School Lane, Boring Road, Patna 800001",
    features: [
      "Quiet residential neighbourhood",
      "Walking distance to coaching institutes",
      "Close to major colleges",
      "Peaceful study environment",
    ],
    icon: BookOpen,
    mapQuery: "House+No+14+Montessori+School+Lane+Boring+Road+Patna",
  },
  {
    name: "Buddha Colony Branch",
    address: "4th Floor, East Boring Canal Link Road, Buddha Colony, Patna",
    features: [
      "Modern infrastructure",
      "Easy accessibility via main road",
      "Lively and safe neighbourhood",
      "Near markets & essential services",
    ],
    icon: Building2,
    mapQuery: "East+Boring+Canal+Link+Road+Buddha+Colony+Patna",
  },
];

const BranchesSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="branches" className="section-padding">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Branches</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-5">
            Two Locations,<br />One Promise of Care
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Both our branches are strategically located near Patna's top coaching centres
            and colleges, ensuring convenience without compromising on peace and safety.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 stagger-children">
          {branches.map((b) => (
            <div
              key={b.name}
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Map placeholder */}
              <div className="h-48 bg-muted flex items-center justify-center relative">
                <iframe
                  title={b.name}
                  className="w-full h-full border-0"
                  src={`https://www.google.com/maps?q=${b.mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-8">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <b.icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-foreground">{b.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-start gap-1 mt-1">
                      <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                      {b.address}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mt-5">
                  {b.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
