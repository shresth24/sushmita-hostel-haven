import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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

  const photoGroups = useMemo(() => {
    const groups = [];
    if ("sixtyBPhotos" in branch && Array.isArray(branch.sixtyBPhotos)) {
      groups.push({
        id: "house-60b",
        label: "House No. 60B",
        description: "New Boring Road facility",
        photos: branch.sixtyBPhotos,
      });
    }
    groups.push({
      id: "house-14",
      label: "House No. 14",
      description: "Primary Boring Road branch",
      photos: [
        {
          src: "/gallery/entrance.png",
          alt: `${branch.shortName} House No. 14 branch entrance`,
          type: "image",
        },
        {
          src: "/gallery/common-area.mp4",
          alt: `${branch.shortName} House No. 14 branch common area`,
          type: "video",
        },
      ],
    });

    return groups;
  }, [branch]);

  const [activeGroupId, setActiveGroupId] = useState(photoGroups[0]?.id ?? "house-14");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const activeGroup = photoGroups.find((group) => group.id === activeGroupId) ?? photoGroups[0];
  const activePhoto = activeGroup?.photos[activePhotoIndex] ?? activeGroup?.photos[0];
  const activePhotoCount = activeGroup?.photos.length ?? 0;

  const showNextPhoto = () => {
    if (!activeGroup || activePhotoCount <= 1) return;
    setActivePhotoIndex((prev) => (prev + 1) % activePhotoCount);
  };

  const showPrevPhoto = () => {
    if (!activeGroup || activePhotoCount <= 1) return;
    setActivePhotoIndex((prev) => (prev - 1 + activePhotoCount) % activePhotoCount);
  };

  useEffect(() => {
    if (activePhotoCount <= 1) return;
    const timer = window.setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % activePhotoCount);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [activeGroupId, activePhotoCount]);

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
        <section className="bg-surface py-10 sm:py-12">
          <div className="max-w-6xl mx-auto space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} />
              Back to home
            </Link>
            <div className="max-w-5xl">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                  Girls Hostel in {branch.locality}, Patna
                </p>
                {"isNew" in branch && branch.isNew ? (
                  <span className="mb-4 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                    New Branch
                  </span>
                ) : null}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-foreground mb-3">
                  {branch.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {branch.intro}
                </p>
                {"subLocations" in branch && Array.isArray(branch.subLocations) ? (
                  <div className="mt-4 grid sm:grid-cols-2 gap-3 max-w-4xl">
                    {branch.subLocations.map((location) => (
                      <div key={location.label} className="rounded-xl border border-border bg-background px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{location.label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{location.address}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-3">
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
            </div>
          </div>
        </section>

        {activeGroup && activePhoto ? (
          <section className="pt-4 pb-16 bg-surface">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl text-foreground">Branch Photo Tour</h2>
                  <p className="text-muted-foreground mt-2">
                    Explore both Boring Road facilities through dedicated photo sets.
                  </p>
                </div>
                <div className="inline-flex rounded-xl border border-border bg-background p-1">
                  {photoGroups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => {
                        setActiveGroupId(group.id);
                        setActivePhotoIndex(0);
                      }}
                      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                        activeGroupId === group.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
                <div
                  className="relative overflow-hidden rounded-2xl border border-border bg-background"
                  onTouchStart={(event) => {
                    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
                  }}
                  onTouchEnd={(event) => {
                    const startX = touchStartX.current;
                    const endX = event.changedTouches[0]?.clientX ?? null;
                    touchStartX.current = null;
                    if (startX == null || endX == null) return;
                    const deltaX = endX - startX;
                    if (Math.abs(deltaX) < 40) return;
                    if (deltaX < 0) showNextPhoto();
                    if (deltaX > 0) showPrevPhoto();
                  }}
                >
                  {"type" in activePhoto && activePhoto.type === "video" ? (
                    <video
                      src={activePhoto.src}
                      className="h-[280px] w-full object-cover sm:h-[340px] md:h-[380px] lg:h-[420px]"
                      controls
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      className="h-[280px] w-full object-cover sm:h-[340px] md:h-[380px] lg:h-[420px]"
                      loading="lazy"
                    />
                  )}
                  {activePhotoCount > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={showPrevPhoto}
                        aria-label="Previous branch photo"
                        className="absolute left-3 top-[140px] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition hover:bg-background sm:top-[170px] md:top-[190px] lg:top-[210px]"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={showNextPhoto}
                        aria-label="Next branch photo"
                        className="absolute right-3 top-[140px] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition hover:bg-background sm:top-[170px] md:top-[190px] lg:top-[210px]"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  ) : null}
                  <div className="border-t border-border px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{activeGroup.label}</p>
                    <p className="text-xs text-muted-foreground">{activeGroup.description}</p>
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 lg:grid-cols-2">
                  {activeGroup.photos.map((photo, index) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setActivePhotoIndex(index)}
                      className={`w-28 flex-none overflow-hidden rounded-xl border bg-background text-left transition md:w-auto ${
                        activePhotoIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {"type" in photo && photo.type === "video" ? (
                        <video src={photo.src} className="h-28 w-full object-cover" muted playsInline />
                      ) : (
                        <img src={photo.src} alt={photo.alt} className="h-28 w-full object-cover" loading="lazy" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

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
                  {"addressPoints" in branch && Array.isArray(branch.addressPoints)
                    ? branch.addressPoints.map((address) => (
                        <div key={address} className="flex items-start gap-3">
                          <MapPin className="mt-0.5 text-primary" size={18} />
                          <span>{address}</span>
                        </div>
                      ))
                    : (
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 text-primary" size={18} />
                        <span>{branch.address}</span>
                      </div>
                    )}
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
