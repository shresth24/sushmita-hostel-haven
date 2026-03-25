import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const galleryItems = [
  { label: "Building Exterior", span: "col-span-2 row-span-2", image: "/gallery/building-exterior.png" },
  { label: "Entrance", span: "", image: "/gallery/entrance.png" },
  { label: "Double Room", span: "", image: "/gallery/double-room.png" },
  { label: "Common Area", span: "col-span-2", video: "/gallery/common-area.mp4" },
  { label: "Saraswati Pooja Celebration", span: "col-span-2", image: "/gallery/saraswati-pooja-1.png" },
  { label: "Saraswati Pooja Celebration", span: "col-span-2", image: "/gallery/saraswati-pooja-2.png" },
];

const GallerySection = () => {
  const ref = useScrollReveal();
  const [activeMedia, setActiveMedia] = useState<{ src: string; label: string; type: "image" | "video" } | null>(
    null,
  );
  const [hoverTimeoutId, setHoverTimeoutId] = useState<number | null>(null);

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
              className={`${item.span} bg-muted rounded-2xl min-h-[180px] flex items-end p-5 relative overflow-hidden group bg-cover bg-center`}
              style={item.image ? { backgroundImage: `url("${item.image}")` } : undefined}
              onMouseEnter={
                item.image || item.video
                  ? () => {
                      const id = window.setTimeout(
                        () =>
                          setActiveMedia({
                            src: (item.image ?? item.video) as string,
                            label: item.label,
                            type: item.video ? "video" : "image",
                          }),
                        120,
                      );
                      setHoverTimeoutId(id);
                    }
                  : undefined
              }
              onMouseLeave={
                item.image || item.video
                  ? () => {
                      if (hoverTimeoutId !== null) {
                        window.clearTimeout(hoverTimeoutId);
                        setHoverTimeoutId(null);
                      }
                      setActiveMedia(null);
                    }
                  : undefined
              }
            >
              {item.video && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-sm font-medium text-foreground/70 group-hover:text-background transition-colors duration-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeMedia && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 pointer-events-none"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-5xl w-full">
            {activeMedia.type === "image" ? (
              <img
                src={activeMedia.src}
                alt={activeMedia.label}
                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <video
                src={activeMedia.src}
                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                muted
                loop
                autoPlay
                playsInline
              />
            )}
            <div className="mt-3 text-center text-sm text-white/80">{activeMedia.label}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
