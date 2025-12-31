import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { stats, testimonials } from "@/data/content";
import { Heart, Target, Eye, Users, Building2, ArrowRight, Quote } from "lucide-react";

const partnerLogos = [
  "CUPA Bangalore",
  "Friendicoes Delhi",
  "Blue Cross Chennai",
  "RESQ Pune",
  "PFA Hyderabad",
  "SPCA Mumbai",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-sage-light relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Every Pet Deserves a Loving Home
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              PawAdopt was born from a simple belief: that every rescued animal deserves a second chance at happiness, 
              and every family deserves the unconditional love that a pet can bring.
            </p>
            <Button size="xl" asChild>
              <Link to="/adopt">
                Start Adopting
                <Heart className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-3xl shadow-card">
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a compassionate bridge between rescued animals and loving families across India. 
                We strive to make pet adoption accessible, transparent, and joyful while supporting 
                the incredible work of animal rescue organizations nationwide.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-3xl shadow-card">
              <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where every stray animal finds a home, every rescue organization has the support 
                they need, and pet adoption is the first choice for families looking to add a furry member. 
                Together, we can end pet homelessness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-foreground text-primary-foreground">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Our Impact</h2>
            <p className="text-primary-foreground/70">Together, we're making a difference—one adoption at a time.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: stats.petsAdopted, label: "Pets Adopted", suffix: "+" },
              { value: stats.ngosConnected, label: "Partner NGOs", suffix: "+" },
              { value: stats.citiesCovered, label: "Cities Covered", suffix: "" },
              { value: stats.happyFamilies, label: "Happy Families", suffix: "+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-display font-bold text-accent mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner NGOs */}
      <section className="py-20" id="partners">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent-light text-accent rounded-full text-sm font-medium mb-4">
              Our Partners
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Trusted Rescue Organizations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with verified animal welfare organizations and rescue groups across India 
              to ensure every listed pet comes from a trusted source.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partnerLogos.map((name) => (
              <div
                key={name}
                className="bg-card p-6 rounded-2xl shadow-card flex items-center justify-center text-center hover:shadow-card-hover transition-shadow"
              >
                <div>
                  <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Are you an NGO or rescue organization?</p>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Partner with Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted" id="stories">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Happy Tails
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((story) => (
              <div key={story.id} className="bg-card p-8 rounded-3xl shadow-card relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-primary-light"
                />
                <p className="text-muted-foreground mb-4 italic">"{story.quote}"</p>
                <p className="font-semibold text-foreground">{story.name}</p>
                <p className="text-sm text-muted-foreground">
                  Adopted {story.petName} • {story.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-accent-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg text-accent-foreground/80 mb-8 max-w-xl mx-auto">
            Whether you adopt, foster, volunteer, or donate—every action helps save a life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-foreground text-background hover:bg-foreground/90" asChild>
              <Link to="/adopt">Adopt a Pet</Link>
            </Button>
            <Button size="xl" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10" asChild>
              <Link to="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
