import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { pets } from "@/data/pets";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Check, 
  X, 
  ChevronLeft, 
  Share2, 
  Baby, 
  Dog, 
  Building2,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function PetDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-wide pt-32 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Pet Not Found</h1>
          <p className="text-muted-foreground mb-8">The pet you're looking for doesn't exist or has been adopted.</p>
          <Button asChild>
            <Link to="/adopt">Browse All Pets</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAdoptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast({
      title: "Adoption Request Sent!",
      description: `We've received your request to adopt ${pet.name}. The rescue organization will contact you soon.`,
    });
  };

  const compatibility = [
    { label: "Good with Kids", value: pet.compatibility.kids, icon: Baby },
    { label: "Good with Other Pets", value: pet.compatibility.otherPets, icon: Dog },
    { label: "Apartment Friendly", value: pet.compatibility.apartment, icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container-wide">
          {/* Back Button */}
          <Link
            to="/adopt"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to all pets
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-card-hover">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={cn(
                      "p-3 rounded-full transition-all duration-200 shadow-lg",
                      isFavorite
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-muted-foreground hover:text-accent"
                    )}
                  >
                    <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
                  </button>
                  <button className="p-3 rounded-full bg-card text-muted-foreground hover:text-foreground transition-colors shadow-lg">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Status Badge */}
                {pet.status === "pending" && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gold text-foreground text-sm px-4 py-1">
                      Adoption Pending
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery (if multiple images) */}
              {pet.images.length > 1 && (
                <div className="flex gap-3">
                  {pet.images.map((img, index) => (
                    <button
                      key={index}
                      className="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
                    >
                      <img
                        src={img}
                        alt={`${pet.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pet Details */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">
                    {pet.name}
                  </h1>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium capitalize",
                    pet.gender === "male" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-pink-100 text-pink-700"
                  )}>
                    {pet.gender}
                  </span>
                </div>
                <p className="text-xl text-muted-foreground">
                  {pet.breed} • {pet.age}
                </p>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="bg-sage-light border-primary/20 text-primary gap-1 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {pet.location}
                </Badge>
                {pet.vaccinated && (
                  <Badge variant="outline" className="bg-sage-light border-primary/20 text-primary gap-1 px-3 py-1">
                    <Check className="h-3.5 w-3.5" />
                    Vaccinated
                  </Badge>
                )}
                {pet.neutered && (
                  <Badge variant="outline" className="bg-accent-light border-accent/20 text-accent gap-1 px-3 py-1">
                    <Check className="h-3.5 w-3.5" />
                    {pet.gender === "male" ? "Neutered" : "Spayed"}
                  </Badge>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-4 mb-8">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="xl" className="flex-1">
                      <Heart className="h-5 w-5 mr-2" />
                      Adopt {pet.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-display">
                        Adopt {pet.name}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAdoptSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Your Name</Label>
                          <Input id="name" placeholder="Full name" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                      </div>
                      <div>
                        <Label htmlFor="message">Why do you want to adopt {pet.name}?</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about yourself and your home..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Submit Adoption Request
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        The rescue organization will review your request and contact you within 24-48 hours.
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="xl" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Contact
                </Button>
              </div>

              {/* Story */}
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-foreground mb-3">
                  About {pet.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {pet.description}
                </p>
              </div>

              {/* Personality */}
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-foreground mb-3">
                  Personality
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pet.personality.map((trait) => (
                    <Badge
                      key={trait}
                      variant="secondary"
                      className="px-4 py-1.5 text-sm"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Compatibility */}
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-foreground mb-3">
                  Compatibility
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {compatibility.map((item) => (
                    <div
                      key={item.label}
                      className={cn(
                        "p-4 rounded-xl text-center transition-colors",
                        item.value ? "bg-sage-light" : "bg-muted"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-6 w-6 mx-auto mb-2",
                          item.value ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <p className="text-xs font-medium text-foreground">
                        {item.label}
                      </p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          item.value ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {item.value ? "Yes" : "No"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health */}
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-foreground mb-3">
                  Health Details
                </h2>
                <p className="text-muted-foreground">{pet.healthNotes}</p>
              </div>

              {/* Listed By */}
              <div className="p-6 bg-card rounded-2xl border border-border">
                <p className="text-sm text-muted-foreground mb-1">Listed by</p>
                <p className="font-semibold text-foreground">{pet.listedBy}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Listed on {new Date(pet.listedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
