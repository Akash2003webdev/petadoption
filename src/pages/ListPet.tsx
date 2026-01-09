import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  Check,
  ChevronRight,
  ChevronLeft,
  Camera,
  Dog,
  Cat,
  Rabbit,
  MapPin,
  FileText,
  User,
  CheckCircle2,
  PawPrint,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { cities } from "@/data/pets";
import { supabase } from "@/supabaseClient"; // Ensure you have this client setup

const steps = [
  { id: 1, title: "Pet Info", icon: PawPrint },
  { id: 2, title: "Photos", icon: Camera },
  { id: 3, title: "Details", icon: FileText },
  { id: 4, title: "Contact", icon: User },
];

export default function ListPet() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for upload

  // We need to store the actual File objects for uploading, not just the preview URLs
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    breed: "",
    age: "",
    gender: "",
    city: "",
    vaccinated: false,
    neutered: false,
    description: "",
    personality: "",
    healthNotes: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    organization: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);

      // Update the File state for backend upload
      setImageFiles((prev) => [...prev, ...newFiles].slice(0, 5));

      // Existing preview logic
      const newPreviews: string[] = [];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newFiles.length) {
            setPreviewImages((prev) => [...prev, ...newPreviews].slice(0, 5));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Helper to upload images to Supabase Storage
  const uploadImagesToSupabase = async () => {
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("pet-images") // Make sure this bucket exists in Supabase
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("pet-images")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Upload Images first
      const imageUrls = await uploadImagesToSupabase();

      // 2. Prepare Personality Array (convert string to array)
      const personalityArray = formData.personality
        .split(",")
        .map((trait) => trait.trim())
        .filter((trait) => trait !== "");

      // 3. Insert into Supabase 'pets' table
      const { error } = await supabase.from("pets").insert({
        id: crypto.randomUUID(), // <--- FIX: Generating ID manually
        name: formData.petName,
        type: formData.petType,
        breed: formData.breed,
        age: formData.age,
        gender: formData.gender,
        location: formData.city,
        city: formData.city,
        image_url: imageUrls[0] || null, // Main image
        images: imageUrls, // Array of all images
        vaccinated: formData.vaccinated,
        neutered: formData.neutered,
        description: formData.description,
        personality: personalityArray,
        health_notes: formData.healthNotes,
        listed_by: formData.contactName, // Storing contact name
        status: "available",
        listed_date: new Date().toISOString(),
        age_category: "puppy",
        compatibility:`{
  "kids": true,
  "apartment": true,
  "otherPets": true
}`
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Pet Listed Successfully!",
        description: "Your pet listing is now live on the platform.",
      });
    } catch (error: any) {
      console.error("Error submitting pet:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container-wide max-w-2xl">
            <div className="text-center bg-card rounded-3xl p-12 shadow-card">
              <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your pet listing for <strong>{formData.petName}</strong> has
                been submitted successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/">Go to Home</a>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      petName: "",
                      petType: "",
                      breed: "",
                      age: "",
                      gender: "",
                      city: "",
                      vaccinated: false,
                      neutered: false,
                      description: "",
                      personality: "",
                      healthNotes: "",
                      contactName: "",
                      contactPhone: "",
                      contactEmail: "",
                      organization: "",
                    });
                    setPreviewImages([]);
                    setImageFiles([]);
                  }}
                >
                  List Another Pet
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container-wide max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              List a Pet for Adoption
            </h1>
            <p className="text-lg text-muted-foreground">
              Help a rescued pet find their forever home. Fill in the details
              below to create a listing.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-6 h-0.5 bg-border" />
              <div
                className="absolute left-0 top-6 h-0.5 bg-primary transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />

              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "bg-card border-2 border-border text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-sm font-medium",
                      currentStep >= step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-card rounded-3xl p-8 shadow-card">
              {/* Step 1: Pet Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Basic Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="petName">Pet's Name</Label>
                      <Input
                        id="petName"
                        placeholder="e.g., Bruno, Luna"
                        value={formData.petName}
                        onChange={(e) =>
                          handleInputChange("petName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label>Pet Type</Label>
                      <Select
                        value={formData.petType}
                        onValueChange={(value) =>
                          handleInputChange("petType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">
                            <span className="flex items-center gap-2">
                              <Dog className="h-4 w-4" /> Dog
                            </span>
                          </SelectItem>
                          <SelectItem value="cat">
                            <span className="flex items-center gap-2">
                              <Cat className="h-4 w-4" /> Cat
                            </span>
                          </SelectItem>
                          <SelectItem value="other">
                            <span className="flex items-center gap-2">
                              <Rabbit className="h-4 w-4" /> Other
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="breed">Breed</Label>
                      <Input
                        id="breed"
                        placeholder="e.g., Labrador, Persian, Indie"
                        value={formData.breed}
                        onChange={(e) =>
                          handleInputChange("breed", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        placeholder="e.g., 6 months, 2 years"
                        value={formData.age}
                        onChange={(e) =>
                          handleInputChange("age", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label>Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>City</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) =>
                          handleInputChange("city", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              <span className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" /> {city}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={formData.vaccinated}
                        onCheckedChange={(checked) =>
                          handleInputChange("vaccinated", checked === true)
                        }
                      />
                      <span className="text-sm font-medium">Vaccinated</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={formData.neutered}
                        onCheckedChange={(checked) =>
                          handleInputChange("neutered", checked === true)
                        }
                      />
                      <span className="text-sm font-medium">
                        Neutered/Spayed
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Photos */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Upload Photos
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Add up to 5 photos of your pet. Good photos significantly
                    increase adoption chances!
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previewImages.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary"
                      >
                        <img
                          src={img}
                          alt={`Pet ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {previewImages.length < 5 && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary-light transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Add Photo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Pet Details
                  </h2>

                  <div>
                    <Label htmlFor="description">Pet's Story</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell potential adopters about this pet's background..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="personality">Personality Traits</Label>
                    <Input
                      id="personality"
                      placeholder="e.g., Playful, Calm, Friendly (comma separated)"
                      value={formData.personality}
                      onChange={(e) =>
                        handleInputChange("personality", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="healthNotes">Health Notes</Label>
                    <Textarea
                      id="healthNotes"
                      placeholder="Any medical history, vaccination details..."
                      rows={3}
                      value={formData.healthNotes}
                      onChange={(e) =>
                        handleInputChange("healthNotes", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Contact */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Contact Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactName">Your Name</Label>
                      <Input
                        id="contactName"
                        placeholder="Full name"
                        value={formData.contactName}
                        onChange={(e) =>
                          handleInputChange("contactName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization">
                        Organization (Optional)
                      </Label>
                      <Input
                        id="organization"
                        placeholder="NGO or Rescue name"
                        value={formData.organization}
                        onChange={(e) =>
                          handleInputChange("organization", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          handleInputChange("contactPhone", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Warning about missing contact columns in DB */}
                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Dev Note:</strong> Ensure your Supabase{" "}
                      <code>pets</code> table has columns for contact info
                      (e.g., <code>contact_phone</code>,{" "}
                      <code>contact_email</code>) if you want to query them
                      later. Currently, only Name is saved to{" "}
                      <code>listed_by</code>.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isLoading}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep} className="gap-2">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className="gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Listing
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
