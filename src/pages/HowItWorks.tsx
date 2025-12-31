import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, Users, Heart, Home, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Browse & Discover",
    description: "Explore our curated collection of rescued pets. Use filters to find pets by type, age, location, and more. Each pet has a detailed profile with photos, personality traits, and health information.",
    icon: Search,
    color: "bg-primary",
  },
  {
    number: 2,
    title: "Connect & Meet",
    description: "Found a pet you love? Submit an adoption request through our platform. The rescue organization or foster parent will review your request and arrange a meet-and-greet session.",
    icon: Users,
    color: "bg-accent",
  },
  {
    number: 3,
    title: "Adopt & Welcome Home",
    description: "After a successful meeting, complete the adoption formalities. Our partner NGOs will guide you through the process, and you can finally bring your new family member home!",
    icon: Home,
    color: "bg-primary",
  },
];

const faqs = [
  {
    question: "Is there an adoption fee?",
    answer: "Adoption fees vary by rescue organization. Some may charge a nominal fee to cover vaccination, neutering, and care costs. All fees are transparent and communicated upfront.",
  },
  {
    question: "What documents do I need?",
    answer: "Typically, you'll need a valid ID proof and address proof. Some organizations may ask for a home visit or video call to ensure the pet will have a safe environment.",
  },
  {
    question: "Can I return the pet if it doesn't work out?",
    answer: "Most rescue organizations have a return policy within a certain period. However, we encourage you to give the pet adequate time to adjust (usually 2-4 weeks) before making a decision.",
  },
  {
    question: "Are the pets vaccinated?",
    answer: "Most pets listed on PawAdopt are vaccinated and dewormed. Each pet's profile clearly mentions their vaccination status and health details.",
  },
  {
    question: "Can I adopt if I live in an apartment?",
    answer: "Absolutely! Many pets are apartment-friendly. Check the pet's profile for compatibility information or filter by 'apartment friendly' when browsing.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-sage-light">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Simple & Transparent
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              How Adoption Works
            </h1>
            <p className="text-xl text-muted-foreground">
              We've made the adoption process as simple and heartwarming as possible. 
              Here's everything you need to know to bring home your new best friend.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container-wide">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`w-12 h-12 ${step.color} text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold`}>
                      {step.number}
                    </span>
                    <h2 className="text-3xl font-display font-bold text-foreground">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                  {step.number === 1 && (
                    <Button asChild>
                      <Link to="/adopt">
                        Start Browsing
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className={`relative ${step.color}/10 rounded-3xl p-12 flex items-center justify-center`}>
                    <step.icon className={`h-32 w-32 ${step.color === 'bg-primary' ? 'text-primary' : 'text-accent'} opacity-80`} />
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-accent/20 rounded-full" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 bg-muted">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Our Commitment to Safe Adoptions
            </h2>
            <p className="text-lg text-muted-foreground">
              We work only with verified rescue organizations and ensure every pet is healthy and ready for adoption.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Verified Rescues", desc: "All partner NGOs are verified" },
              { title: "Health Checked", desc: "Pets are vet-checked before listing" },
              { title: "Vaccinated", desc: "Up-to-date vaccination records" },
              { title: "Support Available", desc: "Post-adoption guidance included" },
            ].map((item) => (
              <div key={item.title} className="bg-card p-6 rounded-2xl shadow-card text-center">
                <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent-light text-accent rounded-full text-sm font-medium mb-4">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-6">
            Ready to Find Your Companion?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Browse our rescued pets and start your adoption journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" asChild>
              <Link to="/adopt">
                Browse Pets
                <Heart className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
