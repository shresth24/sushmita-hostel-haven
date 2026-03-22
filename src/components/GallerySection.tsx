import { useScrollReveal } from "@/hooks/useScrollReveal";

const galleryItems = [
  { label: "Common Area", span: "col-span-2 row-span-2" },
  { label: "Double Room", span: "" },
  { label: "Study Desk", span: "" },
  { label: "Dining Hall", span: "col-span-2" },
  { label: "Building Exterior", span: "" },
  { label: "Washroom", span: "" },
];

const GallerySection = () => {
  const ref = useScrollReveal();

  return (
    <section id="gallery" className="section-padding">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Gallery</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-5">
            See Where You'll Live
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Take a glimpse inside our hostels — clean, well-maintained, and designed for comfort.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
          {galleryItems.map((item) => (
            <div
              key={item.label}
              className={`${item.span} bg-muted rounded-2xl min-h-[180px] flex items-end p-5 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-sm font-medium text-foreground/70 group-hover:text-background transition-colors duration-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
