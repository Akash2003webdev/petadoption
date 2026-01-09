import { supabase } from "@/supabaseClient";

/* ================= INTERFACES ================= */

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  petName: string;
  petType: string;
  quote: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

/* ================= FETCH FUNCTIONS ================= */

const fetchTestimonialsFromSupabase = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select(`
      id,
      name,
      location,
      pet_name,
      pet_type,
      quote,
      image_url
    `);

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    location: item.location,
    petName: item.pet_name,
    petType: item.pet_type,
    quote: item.quote,
    image: item.image_url,
  }));
};

const fetchBlogPostsFromSupabase = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      excerpt,
      category,
      read_time,
      image_url
    `);

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    readTime: item.read_time,
    image: item.image_url,
  }));
};

const fetchStatsFromSupabase = async () => {
  const { data, error } = await supabase
    .from("site_stats")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return {
      petsAdopted: 0,
      ngosConnected: 0,
      citiesCovered: 0,
      happyFamilies: 0,
    };
  }

  return {
    petsAdopted: data.pets_adopted,
    ngosConnected: data.ngos_connected,
    citiesCovered: data.cities_covered,
    happyFamilies: data.happy_families,
  };
};

/* ================= TOP-LEVEL AWAIT EXPORTS 🔥 ================= */

export const testimonials: Testimonial[] =
  await fetchTestimonialsFromSupabase();

export const blogPosts: BlogPost[] =
  await fetchBlogPostsFromSupabase();

export const stats =
  await fetchStatsFromSupabase();
