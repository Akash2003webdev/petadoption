import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, PawPrint, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/supabaseClient";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Adopt", href: "/adopt" },
  { name: "List a Pet", href: "/list-pet" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }, // Added Contact Us here
];

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let result;
    if (isSignUp) {
      result = await supabase.auth.signUp({
        email,
        password,
      });
    } else {
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    }

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      onLoginSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-border">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {isSignUp ? "Join us to find your furry friend." : "Login to manage your adoptions."}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 rounded-md border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-2 rounded-md border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Login")}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
          </span>
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-card py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-wide mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <PawPrint className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
                <Heart className="absolute -top-1 -right-1 h-3 w-3 text-accent fill-accent animate-pulse" />
              </div>
              <span className="text-2xl font-display font-bold text-foreground">
                Paw<span className="text-primary">Adopt</span>
              </span>
            </Link>

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

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="soft" size="sm" asChild>
                <Link to="/favorites">
                  <Heart className="h-4 w-4" />
                  Favorites
                </Link>
              </Button>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground truncate max-w-[100px]">
                     {user.email?.split('@')[0]}
                  </span>
                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => setShowAuthModal(true)}>
                  <User className="h-4 w-4 mr-1" /> Login
                </Button>
              )}

              <Button size="sm" asChild>
                <Link to="/adopt">Adopt Now</Link>
              </Button>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300",
              isOpen ? "max-h-[600px] mt-4" : "max-h-0"
            )}
          >
            <div className="bg-card rounded-2xl p-4 shadow-card space-y-2 border">
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
              <div className="pt-4 flex flex-col gap-2 border-t mt-2">
                
                {user ? (
                   <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
                     <LogOut className="h-4 w-4 mr-2" /> Logout ({user.email?.split('@')[0]})
                   </Button>
                ) : (
                   <Button onClick={() => { setShowAuthModal(true); setIsOpen(false); }} className="w-full">
                     <User className="h-4 w-4 mr-2" /> Login / Signup
                   </Button>
                )}

                <Button variant="soft" asChild className="w-full justify-start">
                  <Link to="/favorites">
                    <Heart className="h-4 w-4 mr-2" />
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

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}