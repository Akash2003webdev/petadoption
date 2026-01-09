import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Heart,
  MapPin,
  Check,
  ChevronLeft,
  Share2,
  Baby,
  Dog,
  Building2,
  MessageCircle,
  Loader2,
  Phone,
  Mail,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseClient";
import emailjs from "@emailjs/browser";

interface Pet {
  id: string;
  name: string;
  image: string;
  images: string[];
  status: string;
  gender: string;
  breed: string;
  age: string;
  location: string;
  vaccinated: boolean;
  neutered: boolean;
  description: string;
  personality: string[];
  compatibility: {
    kids: boolean;
    otherPets: boolean;
    apartment: boolean;
  };
  health_notes: string;
  listed_by: string;
  listed_date: string;
}

export default function PetDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (id) {
      fetchPetDetails();
      checkFavoriteStatus();
    }
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      let parsedCompatibility = data.compatibility;
      if (typeof data.compatibility === "string") {
        try {
          parsedCompatibility = JSON.parse(data.compatibility);
        } catch (e) {
          parsedCompatibility = {
            kids: false,
            otherPets: false,
            apartment: false,
          };
        }
      }

      setPet({
        ...data,
        compatibility: parsedCompatibility || {
          kids: false,
          otherPets: false,
          apartment: false,
        },
        personality: data.personality || [],
        images: data.images || (data.image_url ? [data.image_url] : []),
      });
    } catch (error) {
      console.error("Error fetching pet details:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && id) {
      const { data } = await supabase
        .from("fav_pets")
        .select("*")
        .eq("user_id", user.id)
        .eq("pet_id", id)
        .single();

      if (data) {
        setIsFavorite(true);
      }
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Please Login",
        description: "You need to be logged in to save favorites.",
        variant: "destructive",
      });
      return;
    }

    if (!id) return;

    if (isFavorite) {
      const { error } = await supabase
        .from("fav_pets")
        .delete()
        .eq("user_id", user.id)
        .eq("pet_id", id);

      if (!error) {
        setIsFavorite(false);
        toast({ title: "Removed from favorites" });
      } else {
        toast({
          title: "Error",
          description: "Could not remove from favorites",
          variant: "destructive",
        });
      }
    } else {
      const { error } = await supabase
        .from("fav_pets")
        .insert([{ pet_id: id }]);

      if (!error) {
        setIsFavorite(true);
        toast({ title: "Added to favorites" });
      } else {
        toast({
          title: "Error",
          description: "Could not add to favorites",
          variant: "destructive",
        });
      }
    }
  };

  const handleAdoptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    const SERVICE_ID = "service_htfvhkp";
    const TEMPLATE_ID = "template_157k0d8";
    const PUBLIC_KEY = "s10f63UhhhJ41fATp";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setIsDialogOpen(false);
          toast({
            title: "Adoption Request Sent!",
            description: `We've received your request to adopt ${pet?.name}. The rescue organization will contact you soon.`,
          });
          formRef.current?.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
          toast({
            title: "Error Sending Request",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-wide pt-32 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Pet Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The pet you're looking for doesn't exist or has been adopted.
          </p>
          <Button asChild>
            <Link to="/adopt">Browse All Pets</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const compatibility = [
    { label: "Good with Kids", value: pet.compatibility?.kids, icon: Baby },
    {
      label: "Good with Other Pets",
      value: pet.compatibility?.otherPets,
      icon: Dog,
    },
    {
      label: "Apartment Friendly",
      value: pet.compatibility?.apartment,
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container-wide">
          <Link
            to="/adopt"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to all pets
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-card-hover">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    className={cn(
                      "p-3 rounded-full transition-all duration-200 shadow-lg",
                      isFavorite
                        ? "bg-white text-red-500 border border-red-100"
                        : "bg-card text-muted-foreground hover:text-red-500 hover:bg-white"
                    )}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-all",
                        isFavorite && "fill-red-500 text-red-500"
                      )}
                    />
                  </button>
                  <button className="p-3 rounded-full bg-card text-muted-foreground hover:text-foreground transition-colors shadow-lg">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {pet.status === "pending" && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gold text-foreground text-sm px-4 py-1">
                      Adoption Pending
                    </Badge>
                  </div>
                )}
              </div>

              {pet.images && pet.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {pet.images.map((img, index) => (
                    <button
                      key={index}
                      className="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-colors shrink-0"
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

            <div>
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">
                    {pet.name}
                  </h1>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium capitalize",
                      pet.gender === "male"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    )}
                  >
                    {pet.gender}
                  </span>
                </div>
                <p className="text-xl text-muted-foreground">
                  {pet.breed} • {pet.age}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge
                  variant="outline"
                  className="bg-sage-light border-primary/20 text-primary gap-1 px-3 py-1"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {pet.location}
                </Badge>
                {pet.vaccinated && (
                  <Badge
                    variant="outline"
                    className="bg-sage-light border-primary/20 text-primary gap-1 px-3 py-1"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Vaccinated
                  </Badge>
                )}
                {pet.neutered && (
                  <Badge
                    variant="outline"
                    className="bg-accent-light border-accent/20 text-accent gap-1 px-3 py-1"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {pet.gender === "male" ? "Neutered" : "Spayed"}
                  </Badge>
                )}
              </div>

              <div className="flex gap-4 mb-8">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="xl" className="flex-1">
                      <Heart
                        className={cn(
                          "h-5 w-5 mr-2",
                          isFavorite && "fill-current"
                        )}
                      />
                      Adopt {pet.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-display">
                        Adopt {pet.name}
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      ref={formRef}
                      onSubmit={handleAdoptSubmit}
                      className="space-y-4 mt-4"
                    >
                      <input type="hidden" name="pet_name" value={pet.name} />
                      <input type="hidden" name="pet_id" value={pet.id} />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            name="user_name"
                            placeholder="Full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="user_phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="user_email"
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">
                          Why do you want to adopt {pet.name}?
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about yourself and your home..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Submit Adoption Request"
                        )}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        The rescue organization will review your request and
                        contact you within 24-48 hours.
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="xl" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Contact
                </Button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-foreground mb-3">
                  About {pet.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {pet.description}
                </p>
              </div>

              {pet.personality && pet.personality.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-display font-bold text-foreground mb-3">
                    Personality
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {pet.personality.map((trait, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="px-4 py-1.5 text-sm"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

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

              {pet.health_notes && (
                <div className="mb-8">
                  <h2 className="text-xl font-display font-bold text-foreground mb-3">
                    Health Details
                  </h2>
                  <p className="text-muted-foreground">{pet.health_notes}</p>
                </div>
              )}

              <div className="p-6 bg-card rounded-2xl border border-border">
                <p className="text-sm text-muted-foreground mb-1">Listed by</p>
                <p className="font-semibold text-foreground">
                  {pet.listed_by || "Unknown"}
                </p>
                {pet.listed_date && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Listed on{" "}
                    {new Date(pet.listed_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
