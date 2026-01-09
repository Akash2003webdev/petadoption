import { supabase } from "@/supabaseClient";

/* -------- INTERFACE (NO CHANGE) -------- */

export interface Pet {
  id: string;
  name: string;
  type: "dog" | "cat" | "other";
  breed: string;
  age: string;
  ageCategory: "puppy" | "young" | "adult" | "senior";
  gender: "male" | "female";
  location: string;
  city: string;
  image: string;
  images: string[];
  vaccinated: boolean;
  neutered: boolean;
  description: string;
  personality: string[];
  compatibility: {
    kids: boolean;
    otherPets: boolean;
    apartment: boolean;
  };
  healthNotes: string;
  listedBy: string;
  listedDate: string;
  status: "available" | "pending" | "adopted";
}

/* -------- INTERNAL FETCH -------- */

const fetchPetsFromSupabase = async (): Promise<Pet[]> => {
  const { data, error } = await supabase.from("pets").select("*");

  if (error) {
    console.error("Supabase pets fetch error:", error);
    return [];
  }

  return data.map((pet: any) => ({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    breed: pet.breed,
    age: pet.age,
    ageCategory: pet.age_category,
    gender: pet.gender,
    location: pet.location,
    city: pet.city,
    image: pet.image,
    images: pet.images || [],
    vaccinated: pet.vaccinated,
    neutered: pet.neutered,
    description: pet.description,
    personality: pet.personality || [],
    compatibility: pet.compatibility,
    healthNotes: pet.health_notes,
    listedBy: pet.listed_by,
    listedDate: pet.listed_date,
    status: pet.status,
  }));
};

/* -------- ✅ SAME EXPORT STYLE AS BEFORE -------- */

export const pets: Pet[] = await fetchPetsFromSupabase();

/* -------- FILTER DATA (UNCHANGED) -------- */

export const cities = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Eroade",
  "Chennai",
  "Hyderabad",
  "Kolkata",
];

export const petTypes = ["dog", "cat", "other"] as const;
export const ageCategories = ["puppy", "young", "adult", "senior"] as const;
