import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { branches, siteConfig } from "@/content/site";

const Footer = () => (
  <footer className="border-t border-border bg-surface">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-display text-lg text-foreground">{siteConfig.name}</p>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Safe, owner-managed girls hostel accommodation in Patna with branches at Boring Road and Rajapur.
          </p>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <a href="tel:+919431625833" className="block hover:text-foreground">
              {siteConfig.contact.primaryPhone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="block hover:text-foreground">
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Branch Pages</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {branches.map((branch) => (
              <Link key={branch.slug} to={branch.path} className="block hover:text-foreground">
                {branch.shortName} girls hostel
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Credits</p>
          <p className="mt-3 text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={14} className="text-primary" /> by Shresth Rakesh
          </p>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border/60 text-center">
        <p className="text-xs text-muted-foreground">
          Copyright {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
