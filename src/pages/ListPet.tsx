import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  PawPrint
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { cities } from "@/data/pets";

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

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setPreviewImages((prev) => [...prev, ...newPreviews].slice(0, 5));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Pet Listed Successfully!",
      description: "Your pet listing has been submitted for review. We'll notify you once it's approved.",
    });
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
                Your pet listing for <strong>{formData.petName}</strong> has been submitted successfully. 
                Our team will review it and publish it within 24-48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/">Go to Home</a>
                </Button>
                <Button variant="outline" onClick={() => {
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
                }}>
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
              Help a rescued pet find their forever home. Fill in the details below to create a listing.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute left-0 right-0 top-6 h-0.5 bg-border" />
              <div 
                className="absolute left-0 top-6 h-0.5 bg-primary transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
              
              {steps.map((step) => (
                <div key={step.id} className="relative flex flex-col items-center">
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
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
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
                        onChange={(e) => handleInputChange("petName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Pet Type</Label>
                      <Select
                        value={formData.petType}
                        onValueChange={(value) => handleInputChange("petType", value)}
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
                        onChange={(e) => handleInputChange("breed", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        placeholder="e.g., 6 months, 2 years"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label>Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange("gender", value)}
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
                        onValueChange={(value) => handleInputChange("city", value)}
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
                        onCheckedChange={(checked) => handleInputChange("vaccinated", checked === true)}
                      />
                      <span className="text-sm font-medium">Vaccinated</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={formData.neutered}
                        onCheckedChange={(checked) => handleInputChange("neutered", checked === true)}
                      />
                      <span className="text-sm font-medium">Neutered/Spayed</span>
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
                    Add up to 5 photos of your pet. Good photos significantly increase adoption chances!
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previewImages.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary">
                        <img src={img} alt={`Pet ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPreviewImages(prev => prev.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    
                    {previewImages.length < 5 && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary-light transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Add Photo</span>
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
                      placeholder="Tell potential adopters about this pet's background, how they were rescued, and what makes them special..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="personality">Personality Traits</Label>
                    <Input
                      id="personality"
                      placeholder="e.g., Playful, Calm, Friendly, Curious (comma separated)"
                      value={formData.personality}
                      onChange={(e) => handleInputChange("personality", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="healthNotes">Health Notes</Label>
                    <Textarea
                      id="healthNotes"
                      placeholder="Any medical history, vaccination details, or special needs..."
                      rows={3}
                      value={formData.healthNotes}
                      onChange={(e) => handleInputChange("healthNotes", e.target.value)}
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
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization (Optional)</Label>
                      <Input
                        id="organization"
                        placeholder="NGO or Rescue name"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
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
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
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
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-primary-light rounded-xl">
                    <p className="text-sm text-primary">
                      <strong>Note:</strong> Your contact information will only be shared with verified potential adopters after they submit an adoption request.
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
                  disabled={currentStep === 1}
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
                  <Button type="submit" className="gap-2">
                    Submit Listing
                    <Check className="h-4 w-4" />
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
