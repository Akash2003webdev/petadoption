import { useState, useRef } from "react";
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
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inquiryType, setInquiryType] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.current) return;

    const SERVICE_ID = "service_htfvhkp";
    const TEMPLATE_ID = "template_157k0d8";
    const PUBLIC_KEY = "s10f63UhhhJ41fATp";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setIsLoading(false);
          toast({
            title: "Message Sent!",
            description:
              "Thank you for reaching out. We'll get back to you shortly.",
            variant: "default",
          });
          e.currentTarget.reset();
          setInquiryType("");
        },
        (error) => {
          setIsLoading(false);
          console.error(error.text);
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
      );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-sage-light">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              We'd Love to Hear From You
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about adoption, want to partner with us, or just
              want to say hello? We're here to help!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <a
                    href="mailto:tthivyaa048@gmail.com"
                    className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email Us</p>
                      <p className="text-muted-foreground">
                        tthivyaa048@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Phone className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Call Us</p>
                      <p className="text-muted-foreground">+91 9876543210</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-sage-light rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <MessageCircle className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <p className="text-muted-foreground">Chat with us</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-card">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground">
                        Sri Ramasamy Naidu college
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary-light rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="font-semibold text-foreground">Response Time</p>
                </div>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 24-48 hours. For urgent adoption
                  queries, please call us directly or send a WhatsApp message.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-card p-8 rounded-3xl shadow-card">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>

                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="user_name"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="user_email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label>Inquiry Type</Label>
                      <input
                        type="hidden"
                        name="inquiry_type"
                        value={inquiryType}
                      />
                      <Select onValueChange={(value) => setInquiryType(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adoption">
                            Adoption Query
                          </SelectItem>
                          <SelectItem value="listing">Listing a Pet</SelectItem>
                          <SelectItem value="partnership">
                            NGO Partnership
                          </SelectItem>
                          <SelectItem value="volunteer">
                            Volunteering
                          </SelectItem>
                          <SelectItem value="donation">Donation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
