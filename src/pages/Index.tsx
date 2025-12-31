import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, PawPrint, Search, Users, MapPin, CheckCircle2, ArrowUpRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PetCard } from "@/components/pets/PetCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { pets } from "@/data/pets";
import { testimonials, blogPosts, stats } from "@/data/content";
import { useState } from "react";
import heroImage from "@/assets/hero-dog.jpg";

const howItWorks = [
  {
    step: 1,
    title: "Browse & Connect",
    description: "Explore our curated list of rescued pets looking for homes. Filter by location, type, and more.",
    icon: Search,
  },
  {
    step: 2,
    title: "Meet Your Match",
    description: "Connect with the rescue organization or foster parent. Schedule a meet-and-greet with your potential new family member.",
    icon: Users,
  },
  {
    step: 3,
    title: "Welcome Home",
    description: "Complete the adoption process and bring your new furry friend home. We'll support you every step of the way.",
    icon: Heart,
  },
];

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const featuredPets = pets.slice(0, 6);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
        {/* Decorative Blobs */}
        <div className="blob blob-primary w-96 h-96 -top-48 -left-48 animate-float-slow" />
        <div className="blob blob-accent w-64 h-64 top-1/3 right-0 animate-float animation-delay-1000" />
        <div className="blob blob-primary w-48 h-48 bottom-20 left-1/4 animate-float animation-delay-400" />

        <div className="container-wide relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
                <PawPrint className="h-4 w-4" />
                <span>2,847+ pets found their forever homes</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-in animation-delay-200">
                Adopt Love.
                <br />
                <span className="text-gradient">Save a Life.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in animation-delay-400">
                Every pet deserves a loving home. Connect with rescued animals across India and find your perfect companion today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-600">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/adopt">
                    Adopt a Pet
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/list-pet">
                    <PawPrint className="h-5 w-5 mr-1" />
                    List a Pet
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-12 animate-fade-in animation-delay-1000">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Verified NGOs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Safe Adoptions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Lifetime Support</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in-right animation-delay-400">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-3 scale-105" />
                <img
                  src={heroImage}
                  alt="Adorable rescue dog looking for a home"
                  className="relative rounded-3xl shadow-card-hover w-full object-cover aspect-[4/3]"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-card-hover animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-foreground">156+</p>
                      <p className="text-sm text-muted-foreground">Partner NGOs</p>
                    </div>
                  </div>
                </div>

                {/* Another Floating Element */}
                <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-3 rounded-xl shadow-lg animate-paw-bounce">
                  <PawPrint className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background relative -mt-1">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: stats.petsAdopted, label: "Pets Adopted", suffix: "+" },
              { value: stats.ngosConnected, label: "NGOs Connected", suffix: "+" },
              { value: stats.citiesCovered, label: "Cities Covered", suffix: "" },
              { value: stats.happyFamilies, label: "Happy Families", suffix: "+" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 bg-accent-light text-accent rounded-full text-sm font-medium mb-4">
              Find Your Companion
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Pets Looking for a Home
            </h2>
            <p className="text-lg text-muted-foreground">
              Each of these adorable souls has a unique story and is waiting for someone special—like you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredPets.map((pet, index) => (
              <div
                key={pet.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PetCard pet={pet} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/adopt">
                View All Pets
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-sage-light">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              How Adoption Works
            </h2>
            <p className="text-lg text-muted-foreground">
              We've made the adoption process simple, transparent, and heartwarming.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="relative text-center p-8 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-light rounded-2xl flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>

                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/how-it-works">
                Learn More
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 bg-accent-light text-accent rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Happy Tails, Happy Families
            </h2>
            <p className="text-lg text-muted-foreground">
              Real stories from families who found their perfect companions through PawAdopt.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-card rounded-3xl shadow-card-hover p-8 md:p-12">
              <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/10" />
              
              <div className="text-center relative z-10">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-primary-light"
                />
                
                <p className="text-lg md:text-xl text-foreground mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                
                <div>
                  <p className="font-display font-bold text-foreground">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Adopted {testimonials[currentTestimonial].petName} • {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-muted hover:bg-primary-light hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2 items-center">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-primary w-6"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-muted hover:bg-primary-light hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Resources Preview */}
      <section className="py-20 bg-muted">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-sm font-medium mb-4">
                Pet Care Resources
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Tips for Pet Parents
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/resources">
                View All Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/resources/${post.id}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="font-display font-bold text-foreground mt-3 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">{post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <PawPrint className="h-32 w-32 text-primary-foreground" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Heart className="h-24 w-24 text-primary-foreground" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Change a Life?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Every adoption creates space for another rescue. Join our community of pet lovers and make a difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="xl" asChild>
                <Link to="/adopt">
                  Start Adopting
                  <Heart className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="xl" 
                asChild
                className="bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/20 hover:bg-primary-foreground/20"
              >
                <Link to="/donate">
                  Support Our Cause
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
