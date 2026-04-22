import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BranchesSection from "@/components/BranchesSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { branches, siteConfig } from "@/content/site";
import { toAbsoluteUrl } from "@/lib/seo";

const Index = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: toAbsoluteUrl("/"),
      description: siteConfig.defaultDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: toAbsoluteUrl("/"),
      logo: toAbsoluteUrl("/favicon.svg"),
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.primaryPhone,
      foundingDate: siteConfig.establishedYear,
      founder: siteConfig.founderNames.map((name) => ({
        "@type": "Person",
        name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sushmita Girls Hostel branches in Patna",
      itemListElement: branches.map((branch, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: toAbsoluteUrl(branch.path),
        name: branch.name,
      })),
    },
  ];

  return (
    <>
      <SeoHead
        title={siteConfig.defaultTitle}
        description={siteConfig.defaultDescription}
        path="/"
        structuredData={structuredData}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BranchesSection />
      <FacilitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
