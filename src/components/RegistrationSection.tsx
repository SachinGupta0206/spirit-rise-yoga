import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ReactCountryFlag from "react-country-flag";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WHATSAPP_LINK = "https://chat.whatsapp.com/CxkVX14yHcrLRpMoDVftMN";
const APP_DOWNLOAD_LINK = "http://svastha.fit/download";

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.771.966-.945 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.617-.92-2.215-.242-.579-.487-.5-.672-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372s-1.04 1.017-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.097 3.2 5.086 4.487.711.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.007-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 5.433h-.004a8.994 8.994 0 0 1-4.575-1.253l-.328-.195-3.403.891.909-3.32-.213-.34a8.983 8.983 0 0 1-1.38-4.799c0-4.982 4.054-9.036 9.041-9.036 2.416 0 4.688.942 6.396 2.65a8.963 8.963 0 0 1 2.645 6.385c-.003 4.982-4.057 9.036-9.088 9.036m7.662-16.697A10.924 10.924 0 0 0 12.05 1C6.003 1 1.05 5.953 1.05 12c0 1.982.519 3.915 1.507 5.615L1 23l5.518-1.438A10.948 10.948 0 0 0 12.05 23c6.047 0 11-4.953 11-11 0-2.941-1.144-5.705-3.337-7.882" />
  </svg>
);

const COUNTRY_CODES = [
  { code: "+91", country: "IN", label: "India (+91)" },
  { code: "+1", country: "US", label: "USA (+1)" },
  { code: "+44", country: "GB", label: "UK (+44)" },
  { code: "+971", country: "AE", label: "UAE (+971)" },
  { code: "+65", country: "SG", label: "Singapore (+65)" },
  { code: "+61", country: "AU", label: "Australia (+61)" },
  { code: "+49", country: "DE", label: "Germany (+49)" },
  { code: "+33", country: "FR", label: "France (+33)" },
  { code: "+81", country: "JP", label: "Japan (+81)" },
  { code: "+86", country: "CN", label: "China (+86)" },
];

const RegistrationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Restrict phone to 10 digits only
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation (optional field)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone.trim())) {
      newErrors.phone = "Only digits allowed";
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Enter at least 10 digits";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const fullPhone = `${formData.countryCode}${formData.phone.trim()}`;

      const { error } = await supabase.from("yoga_registrations").insert({
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: fullPhone,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already Registered!",
            description: "This phone number is already registered for the camp.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setIsModalOpen(true);
      setModalStep(1);
      setFormData({ name: "", email: "", countryCode: "+91", phone: "" });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinWhatsApp = () => {
    window.open(WHATSAPP_LINK, "_blank");
    setModalStep(2);
  };

  const handleDownloadApp = () => {
    window.open(APP_DOWNLOAD_LINK, "_blank");
    setIsModalOpen(false);
    setModalStep(1);
  };

  const handleSkipToApp = () => {
    setModalStep(2);
  };

  return (
    <section
      id="register"
      className="py-20 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Register Now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure your spot in the Ultimate 21-Day Yoga Camp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-hover">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="mt-2"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-base">
                  Email Address (Optional)
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="mt-2"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-base">
                  Phone Number *
                </Label>
                <div className="flex gap-2 mt-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ReactCountryFlag
                        countryCode={COUNTRY_CODES.find((c) => c.code === formData.countryCode)?.country || "IN"}
                        svg
                        style={{ width: "1.2em", height: "1.2em" }}
                      />
                    </div>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value }))}
                      disabled={isLoading}
                      className="flex h-10 w-20 rounded-md border border-input bg-background pl-9 pr-2 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    disabled={isLoading}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between mt-1">
                  {errors.phone ? (
                    <p className="text-destructive text-sm">{errors.phone}</p>
                  ) : (
                    <span />
                  )}
                  <span className={`text-sm ${formData.phone.length >= 10 ? "text-green-600" : "text-muted-foreground"}`}>
                    {formData.phone.length}/10
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 shadow-hover transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Registering..." : "Complete Registration"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Multi-Step Success Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="text-primary" size={40} />
              </motion.div>
            </div>
            <DialogTitle className="text-center text-2xl">
              {modalStep === 1 ? "✅ Registration Successful!" : "📲 One More Step!"}
            </DialogTitle>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className={`w-3 h-3 rounded-full ${modalStep >= 1 ? "bg-primary" : "bg-gray-300"}`} />
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`w-3 h-3 rounded-full ${modalStep >= 2 ? "bg-primary" : "bg-gray-300"}`} />
          </div>

          {modalStep === 1 ? (
            /* Step 1: WhatsApp */
            <div className="space-y-4">
              <DialogDescription className="text-gray-600 text-base leading-relaxed text-center">
                You're in! 🎉 Now join our WhatsApp group for Zoom links, reminders & daily updates.
              </DialogDescription>

              <Button
                onClick={handleJoinWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-6"
              >
                <WhatsAppIcon />
                <span className="ml-2">Join WhatsApp Group</span>
                <ArrowRight className="ml-2" size={18} />
              </Button>

              <button
                onClick={handleSkipToApp}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now →
              </button>
            </div>
          ) : (
            /* Step 2: App Download */
            <div className="space-y-4">
              <DialogDescription className="text-gray-600 text-base leading-relaxed text-center">
                Download <span className="font-semibold">Svastha App</span> to track progress, join live sessions & build healthy habits! 🧘‍♀️
              </DialogDescription>

              <Button
                onClick={handleDownloadApp}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6"
              >
                <Download size={20} />
                <span className="ml-2">Download Svastha App</span>
              </Button>

              <button
                onClick={() => { setIsModalOpen(false); setModalStep(1); }}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                I'll download later
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RegistrationSection;
