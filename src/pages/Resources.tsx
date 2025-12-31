import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/content";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const categories = [
  { name: "All", count: 12 },
  { name: "Getting Started", count: 3 },
  { name: "Dog Care", count: 4 },
  { name: "Cat Care", count: 3 },
  { name: "Health", count: 2 },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-sage-light">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Pet Care Resources
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              Tips & Guides for Pet Parents
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about caring for your furry friends—from first-time tips to advanced care guides.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border sticky top-20 bg-background z-30">
        <div className="container-wide">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, index) => (
              <button
                key={cat.name}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12">
        <div className="container-wide">
          <div className="bg-card rounded-3xl overflow-hidden shadow-card-hover">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-accent-light text-accent rounded-full text-xs font-medium mb-4 w-fit">
                  Featured
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    {blogPosts[0].category}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <Button className="w-fit">
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-4">
            Get Pet Care Tips in Your Inbox
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for weekly tips, new pet listings, and heartwarming adoption stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            />
            <Button variant="accent">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
