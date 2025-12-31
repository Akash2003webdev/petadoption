import { Link } from "react-router-dom";
import { Heart, PawPrint, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  adopt: [
    { name: "Browse Pets", href: "/adopt" },
    { name: "Dogs", href: "/adopt?type=dog" },
    { name: "Cats", href: "/adopt?type=cat" },
    { name: "How to Adopt", href: "/how-it-works" },
  ],
  resources: [
    { name: "Pet Care Tips", href: "/resources" },
    { name: "First-Time Owner Guide", href: "/resources" },
    { name: "Vaccination Info", href: "/resources" },
    { name: "Training Tips", href: "/resources" },
  ],
  about: [
    { name: "Our Mission", href: "/about" },
    { name: "Partner NGOs", href: "/about#partners" },
    { name: "Success Stories", href: "/about#stories" },
    { name: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold mb-2">
                Stay Updated on Pet Adoption
              </h3>
              <p className="text-primary-foreground/70">
                Get notified about new pets and adoption tips straight to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-full"
              />
              <Button variant="accent" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="relative">
                <PawPrint className="h-8 w-8 text-primary-foreground" />
                <Heart className="absolute -top-1 -right-1 h-3 w-3 text-accent fill-accent" />
              </div>
              <span className="text-2xl font-display font-bold">
                PawAdopt
              </span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Connecting rescued animals with loving families across India. 
              Every pet deserves a home, every home deserves a pet.
            </p>
            <div className="space-y-3 text-primary-foreground/70">
              <a href="mailto:hello@pawadopt.in" className="flex items-center gap-3 hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
                hello@pawadopt.in
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Adopt</h4>
            <ul className="space-y-3">
              {footerLinks.adopt.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 PawAdopt. All rights reserved. Made with ❤️ for animals.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
