import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PetCard } from "@/components/pets/PetCard";
import { Button } from "@/components/ui/button";
import { pets } from "@/data/pets";
import { Heart, ArrowRight } from "lucide-react";

export default function Favorites() {
  // In a real app, this would be persisted in localStorage or a database
  const [favorites, setFavorites] = useState<string[]>([]);

  const favoritePets = pets.filter((pet) => favorites.includes(pet.id));

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              Your Favorite Pets
            </h1>
            <p className="text-lg text-muted-foreground">
              Keep track of pets you're interested in adopting.
            </p>
          </div>

          {favoritePets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritePets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isFavorite={true}
                  onFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                No favorites yet
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start browsing our adorable pets and click the heart icon to save your favorites here.
              </p>
              <Button asChild>
                <Link to="/adopt">
                  Browse Pets
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
