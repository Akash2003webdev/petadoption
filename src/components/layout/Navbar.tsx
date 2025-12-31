import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Adopt", href: "/adopt" },
  { name: "List a Pet", href: "/list-pet" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <PawPrint className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <Heart className="absolute -top-1 -right-1 h-3 w-3 text-accent fill-accent animate-pulse" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              Paw<span className="text-primary">Adopt</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  location.pathname === link.href
                    ? "text-primary bg-primary-light"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="soft" size="sm" asChild>
              <Link to="/favorites">
                <Heart className="h-4 w-4" />
                Favorites
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/adopt">Adopt Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] mt-4" : "max-h-0"
          )}
        >
          <div className="bg-card rounded-2xl p-4 shadow-card space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  location.pathname === link.href
                    ? "text-primary bg-primary-light"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="soft" asChild className="w-full">
                <Link to="/favorites">
                  <Heart className="h-4 w-4" />
                  Favorites
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/adopt">Adopt Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
