import { Link, useParams } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { branches, getBranchBySlug, siteConfig } from "@/content/site";
import { toAbsoluteUrl } from "@/lib/seo";
import NotFound from "./NotFound";

const BranchPage = () => {
  const { slug = "" } = useParams();
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return <NotFound />;
  }

  const alternateBranches = branches.filter((item) => item.slug !== branch.slug);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: toAbsoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: branch.shortName,
          item: toAbsoluteUrl(branch.path),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: branch.name,
      url: toAbsoluteUrl(branch.path),
      image: toAbsoluteUrl(branch.image),
      description: branch.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.primaryPhone,
      foundingDate: siteConfig.establishedYear,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.addressLine1,
        addressLocality: branch.locality,
        addressRegion: siteConfig.region,
        postalCode: branch.postalCode,
        addressCountry: siteConfig.country,
      },
      areaServed: {
        "@type": "City",
        name: siteConfig.city,
      },
      amenityFeature: branch.features.map((feature) => ({
        "@type": "LocationFeatureSpecification",
        name: feature,
        value: true,
      })),
      openingHoursSpecification: siteConfig.hours.structured.map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.days,
        opens: entry.opens,
        closes: entry.closes,
      })),
      parentOrganization: {
        "@type": "Organization",
        name: siteConfig.name,
        url: toAbsoluteUrl("/"),
      },
    },
  ];

  return (
    <>
      <SeoHead
        title={branch.title}
        description={branch.description}
        path={branch.path}
        image={branch.image}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="pt-16">
        <section className="section-padding bg-surface">
          <div className="max-w-6xl mx-auto space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} />
              Back to home
            </Link>
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                  Girls Hostel in {branch.locality}, Patna
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-foreground mb-5">
                  {branch.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {branch.intro}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                  >
                    <Phone size={16} />
                    Call now
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground"
                  >
                    <ExternalLink size={16} />
                    WhatsApp inquiry
                  </a>
                </div>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-lg shadow-primary/10 bg-background">
                <img
                  src={branch.image}
                  alt={`${branch.shortName} branch of Sushmita Girls Hostel in Patna`}
                  className="w-full h-[320px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl text-foreground mb-4">Why students choose this branch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Families searching for a safe girls hostel in {branch.locality}, Patna usually want three things:
                  reliable supervision, a clean daily routine, and a location that makes student life easier. This
                  branch is built around those priorities.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {branch.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted-foreground">
                    {feature}
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl text-foreground mb-4">Location advantages</h2>
                <ul className="space-y-3">
                  {branch.nearby.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-border bg-surface p-8">
                <h2 className="text-2xl text-foreground mb-6">Branch details</h2>
                <div className="space-y-5 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 text-primary" size={18} />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 text-primary" size={18} />
                    <div>
                      <a href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`} className="block hover:text-foreground">
                        {siteConfig.contact.primaryPhone}
                      </a>
                      <a href={`tel:${siteConfig.contact.secondaryPhone.replace(/\s+/g, "")}`} className="block hover:text-foreground">
                        {siteConfig.contact.secondaryPhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 text-primary" size={18} />
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 text-primary" size={18} />
                    <div>
                      {siteConfig.hours.display.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-72 overflow-hidden rounded-[2rem] border border-border">
                <iframe
                  title={`${branch.shortName} branch map`}
                  className="h-full w-full border-0"
                  src={`https://www.google.com/maps?q=${branch.mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </div>
        </section>

        <section className="section-padding bg-surface">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-6">Explore our other Patna branch</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {alternateBranches.map((item) => (
                <Link
                  key={item.slug}
                  to={item.path}
                  className="rounded-[2rem] border border-border bg-background p-7 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <p className="text-sm font-semibold text-primary uppercase tracking-[0.18em] mb-3">{item.shortName}</p>
                  <h3 className="text-2xl text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BranchPage;
