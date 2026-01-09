import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PetCard } from "@/components/pets/PetCard";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/supabaseClient";

export default function Favorites() {
  const [favoritePets, setFavoritePets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data: favData, error: favError } = await supabase
        .from('fav_pets')
        .select('pet_id');

      if (favError) throw favError;

      if (favData && favData.length > 0) {
        const petIds = favData.map((item) => item.pet_id);

        const { data: petsData, error: petsError } = await supabase
          .from('pets')
          .select('*')
          .in('id', petIds);

        if (petsError) throw petsError;
        setFavoritePets(petsData || []);
      } else {
        setFavoritePets([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const isCurrentlyFavorite = favoritePets.some(pet => pet.id === id);
      
      if (isCurrentlyFavorite) {
        setFavoritePets(prev => prev.filter(pet => pet.id !== id));
        
        const { error } = await supabase
          .from('fav_pets')
          .delete()
          .eq('pet_id', id);

        if (error) {
          fetchFavorites();
        }
      }
    } catch (error) {
      console.error(error);
    }
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

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : favoritePets.length > 0 ? (
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