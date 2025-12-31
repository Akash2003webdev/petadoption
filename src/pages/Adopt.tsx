import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PetCard } from "@/components/pets/PetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { pets, cities, petTypes, ageCategories } from "@/data/pets";
import { Search, SlidersHorizontal, X, Dog, Cat, Rabbit, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type PetType = (typeof petTypes)[number];
type AgeCategory = (typeof ageCategories)[number];

export default function Adopt() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<PetType[]>([]);
  const [selectedAges, setSelectedAges] = useState<AgeCategory[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [vaccinatedOnly, setVaccinatedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          pet.name.toLowerCase().includes(query) ||
          pet.breed.toLowerCase().includes(query) ||
          pet.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(pet.type)) {
        return false;
      }

      // Age filter
      if (selectedAges.length > 0 && !selectedAges.includes(pet.ageCategory)) {
        return false;
      }

      // City filter
      if (selectedCities.length > 0 && !selectedCities.includes(pet.city)) {
        return false;
      }

      // Vaccinated filter
      if (vaccinatedOnly && !pet.vaccinated) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTypes, selectedAges, selectedCities, vaccinatedOnly]);

  const toggleType = (type: PetType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAge = (age: AgeCategory) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setSelectedAges([]);
    setSelectedCities([]);
    setVaccinatedOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedTypes.length > 0 ||
    selectedAges.length > 0 ||
    selectedCities.length > 0 ||
    vaccinatedOnly;

  const typeIcons = {
    dog: Dog,
    cat: Cat,
    other: Rabbit,
  };

  const ageLabels = {
    puppy: "Puppy/Kitten",
    young: "Young (1-3 years)",
    adult: "Adult (3-7 years)",
    senior: "Senior (7+ years)",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-sage-light">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              Find Your Perfect Companion
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our rescued pets looking for loving homes. Each one has a unique personality waiting to brighten your life.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, breed, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 rounded-full text-lg bg-card border-border shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-lg text-foreground">Filters</h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Pet Type */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Dog className="h-4 w-4" />
                    Pet Type
                  </h3>
                  <div className="space-y-2">
                    {petTypes.map((type) => {
                      const Icon = typeIcons[type];
                      return (
                        <label
                          key={type}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <Checkbox
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={() => toggleType(type)}
                          />
                          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors capitalize">
                            {type === "other" ? "Others" : `${type}s`}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Age Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Age
                  </h3>
                  <div className="space-y-2">
                    {ageCategories.map((age) => (
                      <label
                        key={age}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedAges.includes(age)}
                          onCheckedChange={() => toggleAge(age)}
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {ageLabels[age]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cities.map((city) => (
                      <label
                        key={city}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedCities.includes(city)}
                          onCheckedChange={() => toggleCity(city)}
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {city}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Vaccinated Only */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={vaccinatedOnly}
                      onCheckedChange={(checked) => setVaccinatedOnly(checked === true)}
                    />
                    <span className="text-sm font-medium text-foreground">
                      Vaccinated pets only
                    </span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredPets.length} {filteredPets.length === 1 ? "pet" : "pets"} found
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                    {selectedTypes.length + selectedAges.length + selectedCities.length + (vaccinatedOnly ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-lg">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {petTypes.map((type) => {
                    const Icon = typeIcons[type];
                    return (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all",
                          selectedTypes.includes(type)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {type === "other" ? "Others" : `${type}s`}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cities.slice(0, 5).map((city) => (
                    <button
                      key={city}
                      onClick={() => toggleCity(city)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all",
                        selectedCities.includes(city)
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={vaccinatedOnly}
                      onCheckedChange={(checked) => setVaccinatedOnly(checked === true)}
                    />
                    <span className="text-sm">Vaccinated only</span>
                  </label>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Pet Grid */}
            <div className="flex-1">
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredPets.length} {filteredPets.length === 1 ? "pet" : "pets"} found
                </p>
              </div>

              {filteredPets.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    No pets found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
