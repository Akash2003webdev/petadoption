import { Link } from "react-router-dom";
import { Heart, MapPin, Check, Dog, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Pet } from "@/data/pets";

interface PetCardProps {
  pet: Pet;
  className?: string;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export function PetCard({ pet, className, onFavorite, isFavorite = false }: PetCardProps) {
  const TypeIcon = pet.type === "dog" ? Dog : Cat;

  return (
    <div
      className={cn(
        "group bg-card rounded-2xl overflow-hidden shadow-card pet-card",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Badge 
            variant="secondary" 
            className="bg-card/90 backdrop-blur-sm text-foreground border-0 gap-1"
          >
            <TypeIcon className="h-3 w-3" />
            {pet.type === "dog" ? "Dog" : "Cat"}
          </Badge>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavorite?.(pet.id);
            }}
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              isFavorite
                ? "bg-accent text-accent-foreground"
                : "bg-card/90 backdrop-blur-sm text-muted-foreground hover:text-accent hover:bg-card"
            )}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </button>
        </div>

        {/* Status Badge */}
        {pet.status === "pending" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-gold text-foreground border-0">
              Adoption Pending
            </Badge>
          </div>
        )}

        {/* Quick View Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button asChild variant="hero-outline" size="sm" className="w-full bg-card/90 backdrop-blur-sm">
            <Link to={`/pet/${pet.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
              {pet.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {pet.breed} • {pet.age}
            </p>
          </div>
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full capitalize",
            pet.gender === "male" 
              ? "bg-blue-100 text-blue-700" 
              : "bg-pink-100 text-pink-700"
          )}>
            {pet.gender}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span>{pet.location}</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {pet.vaccinated && (
            <Badge variant="outline" className="bg-sage-light border-primary/20 text-primary gap-1 text-xs">
              <Check className="h-3 w-3" />
              Vaccinated
            </Badge>
          )}
          {pet.neutered && (
            <Badge variant="outline" className="bg-accent-light border-accent/20 text-accent gap-1 text-xs">
              <Check className="h-3 w-3" />
              {pet.gender === "male" ? "Neutered" : "Spayed"}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
