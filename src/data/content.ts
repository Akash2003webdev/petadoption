export interface Testimonial {
  id: string;
  name: string;
  location: string;
  petName: string;
  petType: string;
  quote: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    petName: "Cookie",
    petType: "dog",
    quote: "Adopting Cookie was the best decision we ever made. PawAdopt made the process so smooth and transparent. Our home is now filled with so much love and laughter!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: "2",
    name: "Rahul Patel",
    location: "Bangalore",
    petName: "Simba",
    petType: "cat",
    quote: "I was nervous about adopting my first pet, but the team at PawAdopt guided me through everything. Simba has become my best friend and the perfect companion for my apartment.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: "3",
    name: "Ananya Reddy",
    location: "Chennai",
    petName: "Buddy",
    petType: "dog",
    quote: "After losing our old dog, we thought we'd never love again. But Buddy came into our lives through PawAdopt and filled that void beautifully. Thank you for connecting us!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "First-Time Pet Parent? Here's Everything You Need to Know",
    excerpt: "A comprehensive guide for new pet parents covering essentials from nutrition to veterinary care.",
    category: "Getting Started",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Understanding Your Dog's Body Language",
    excerpt: "Learn to read your furry friend's signals and strengthen your bond through better communication.",
    category: "Dog Care",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1587559045816-8b0a54d1a6e3?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "The Complete Vaccination Guide for Indian Pets",
    excerpt: "Everything you need to know about essential vaccinations and schedules for dogs and cats in India.",
    category: "Health",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Creating a Cat-Friendly Home in Your Apartment",
    excerpt: "Simple tips and tricks to make your apartment the perfect haven for your feline companion.",
    category: "Cat Care",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
  },
];

export const stats = {
  petsAdopted: 2847,
  ngosConnected: 156,
  citiesCovered: 45,
  happyFamilies: 2500,
};
