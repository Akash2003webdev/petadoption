import petCat1 from "@/assets/pet-cat-1.jpg";
import petDog1 from "@/assets/pet-dog-1.jpg";
import petDog2 from "@/assets/pet-dog-2.jpg";
import petCat2 from "@/assets/pet-cat-2.jpg";
import petDog3 from "@/assets/pet-dog-3.jpg";

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

export const pets: Pet[] = [
  {
    id: "1",
    name: "Bruno",
    type: "dog",
    breed: "Beagle Mix",
    age: "8 months",
    ageCategory: "puppy",
    gender: "male",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    image: petDog1,
    images: [petDog1],
    vaccinated: true,
    neutered: false,
    description: "Bruno is an energetic and playful puppy who loves to explore. He was rescued from a construction site and has blossomed into a loving companion. He enjoys long walks, playing fetch, and cuddling on the couch.",
    personality: ["Playful", "Curious", "Affectionate", "Energetic"],
    compatibility: {
      kids: true,
      otherPets: true,
      apartment: true,
    },
    healthNotes: "Up to date on all vaccinations. Healthy and active.",
    listedBy: "Paws Foundation Mumbai",
    listedDate: "2024-12-15",
    status: "available",
  },
  {
    id: "2",
    name: "Whiskers",
    type: "cat",
    breed: "Orange Tabby",
    age: "2 years",
    ageCategory: "young",
    gender: "male",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    image: petCat1,
    images: [petCat1],
    vaccinated: true,
    neutered: true,
    description: "Whiskers is a calm and dignified gentleman who enjoys sunny spots and gentle head scratches. He's independent but loves companionship and will purr contentedly in your lap.",
    personality: ["Calm", "Independent", "Gentle", "Affectionate"],
    compatibility: {
      kids: true,
      otherPets: false,
      apartment: true,
    },
    healthNotes: "Neutered and fully vaccinated. No health issues.",
    listedBy: "CUPA Bangalore",
    listedDate: "2024-12-10",
    status: "available",
  },
  {
    id: "3",
    name: "Snowy",
    type: "dog",
    breed: "Labrador",
    age: "4 months",
    ageCategory: "puppy",
    gender: "female",
    location: "Delhi NCR",
    city: "Delhi",
    image: petDog2,
    images: [petDog2],
    vaccinated: true,
    neutered: false,
    description: "Snowy is a gentle soul with the sweetest eyes. She was found wandering alone and is now looking for her forever home. She loves belly rubs and is great with children.",
    personality: ["Gentle", "Sweet", "Calm", "Loving"],
    compatibility: {
      kids: true,
      otherPets: true,
      apartment: true,
    },
    healthNotes: "All vaccinations complete. Dewormed and healthy.",
    listedBy: "Friendicoes Delhi",
    listedDate: "2024-12-18",
    status: "available",
  },
  {
    id: "4",
    name: "Luna",
    type: "cat",
    breed: "Persian Mix",
    age: "1 year",
    ageCategory: "young",
    gender: "female",
    location: "Pune, Maharashtra",
    city: "Pune",
    image: petCat2,
    images: [petCat2],
    vaccinated: true,
    neutered: true,
    description: "Luna is a beautiful and curious cat with striking blue eyes. She loves to play with feather toys and will follow you around the house. She's very vocal and loves to 'talk' to her humans.",
    personality: ["Curious", "Playful", "Vocal", "Social"],
    compatibility: {
      kids: true,
      otherPets: true,
      apartment: true,
    },
    healthNotes: "Spayed and vaccinated. In perfect health.",
    listedBy: "RESQ Pune",
    listedDate: "2024-12-12",
    status: "available",
  },
  {
    id: "5",
    name: "Raja",
    type: "dog",
    breed: "Indian Pariah",
    age: "3 years",
    ageCategory: "adult",
    gender: "male",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    image: petDog3,
    images: [petDog3],
    vaccinated: true,
    neutered: true,
    description: "Raja is a handsome and loyal indie dog with a heart of gold. He was a street dog who learned to trust humans again. He's protective, intelligent, and makes an excellent companion.",
    personality: ["Loyal", "Intelligent", "Protective", "Friendly"],
    compatibility: {
      kids: true,
      otherPets: false,
      apartment: false,
    },
    healthNotes: "Neutered and fully vaccinated. Very healthy and active.",
    listedBy: "Blue Cross Chennai",
    listedDate: "2024-12-08",
    status: "available",
  },
  {
    id: "6",
    name: "Milo",
    type: "dog",
    breed: "Indie Mix",
    age: "6 months",
    ageCategory: "puppy",
    gender: "male",
    location: "Hyderabad, Telangana",
    city: "Hyderabad",
    image: petDog1,
    images: [petDog1],
    vaccinated: true,
    neutered: false,
    description: "Milo is a bundle of joy! This adorable pup loves everyone he meets and has never met a stranger. Perfect for an active family looking for a fun companion.",
    personality: ["Friendly", "Energetic", "Social", "Happy"],
    compatibility: {
      kids: true,
      otherPets: true,
      apartment: true,
    },
    healthNotes: "Vaccinated and dewormed. Healthy puppy.",
    listedBy: "PFA Hyderabad",
    listedDate: "2024-12-20",
    status: "available",
  },
];

export const cities = ["Mumbai", "Bangalore", "Delhi", "Pune", "Chennai", "Hyderabad", "Kolkata"];
export const petTypes = ["dog", "cat", "other"] as const;
export const ageCategories = ["puppy", "young", "adult", "senior"] as const;
