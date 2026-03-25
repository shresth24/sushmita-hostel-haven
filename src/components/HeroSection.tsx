import { Button } from "@/components/ui/button";
import { Shield, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center section-padding pt-28 sm:pt-32 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/hero-bg.png")' }}
    >
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-3xl animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Shield size={16} />
            <span>Trusted by 200+ families in Patna</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] tracking-tight text-white mb-6">
            Sushmita Girls Hostel
            <br />
            Home Away From Home
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
            Where your daughter's safety meets comfort. Our owner-managed hostel
            provides secure, hygienic, and caring accommodation for female students
            pursuing their dreams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">Contact Us</a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#contact">
                <Heart size={18} />
                Book a Visit
              </a>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-14 flex flex-wrap gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              15+ Years of Trust
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              24/7 CCTV Surveillance
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Female Warden On-Site
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
