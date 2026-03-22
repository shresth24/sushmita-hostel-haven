import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-surface">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg text-foreground">Sushmita Girls' Hostel</p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Made with <Heart size={14} className="text-primary" /> in Patna, Bihar
        </p>
      </div>
      <div className="mt-6 pt-6 border-t border-border/60 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sushmita Girls' Hostel. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
