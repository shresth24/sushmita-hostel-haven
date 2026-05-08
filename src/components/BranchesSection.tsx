import { Link } from "react-router-dom";
import { MapPin, BookOpen, Building2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { branches } from "@/content/site";

const branchIcons = {
  "Boring Road": BookOpen,
  "Boring Road 60B": BookOpen,
  Rajapur: Building2,
} as const;

const branchCards = [
  {
    slug: "girls-hostel-boring-road-60b-card",
    path: "/girls-hostel-boring-road-patna",
    shortName: "Boring Road 60B",
    name: "Sushmita Girls Hostel - Boring Road 60B Branch",
    address: "House no 60B, Montessori School Lane, Boring Road, Patna - 800001",
    mapQuery: "House+No+60B+Montessori+School+Lane+Boring+Road+Patna+800001",
    features: [
      "New branch",
      "Owner-managed hostel environment",
      "24/7 CCTV surveillance",
      "Female warden on site",
      "Hygienic home-style meals",
      "RO water cooler",
    ],
    isNew: true,
  },
  ...branches,
] as const;

const BranchesSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="branches" className="section-padding">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Branches</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-5">
            Three Locations,
            <br />
            One Promise of Care
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our branches are placed near Patna's student hubs so residents can stay close to colleges, coaching
            centers, and everyday essentials without giving up safety or peace.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 stagger-children">
          {branchCards.map((branch) => {
            const BranchIcon = branchIcons[branch.shortName];

            return (
              <div
                key={branch.slug}
                className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-48 bg-muted flex items-center justify-center relative">
                  <iframe
                    title={branch.name}
                    className="w-full h-full border-0"
                    src={`https://www.google.com/maps?q=${branch.mapQuery}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BranchIcon className="text-primary" size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-display text-foreground">{branch.shortName} Branch</h3>
                        {"isNew" in branch && branch.isNew ? (
                          <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                            New
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-start gap-1 mt-1">
                        <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                        {branch.address}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-5">
                    {branch.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      to={branch.path}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                    >
                      Explore {branch.shortName === "Boring Road 60B" ? "Boring Road" : branch.shortName} branch
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
