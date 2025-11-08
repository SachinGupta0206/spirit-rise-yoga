import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";

const RegistrationSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const { toast } = useToast();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  // Form submit logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://spirit-rise-yoga-3.onrender.com/api/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Server Response:", response.data);

      // Show success message
      toast({
        title: "🎉 Successfully Registered for the Free Yoga Camp!",
        description:
          "Welcome to our yoga community! Check your email for details.",
      });

      setIsSubmitted(true);

      // Auto-close after 2-3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "" });
      }, 3000);
    } catch (error: any) {
      console.error("❌ Registration failed:", error);

      // Show error message
      toast({
        title: "⚠️ Something went wrong. Please try again.",
        description:
          error.response?.data?.message ||
          "Registration failed. Please check your details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success message after submit
  if (isSubmitted) {
    return (
      <section
        id="register"
        className="py-20 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-card rounded-3xl p-12 shadow-hover">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="text-primary" size={48} />
              </motion.div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Welcome to the Yoga Camp!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                🎉 Successfully Registered for the Free Yoga Camp!
              </p>
              <p className="text-sm text-muted-foreground">
                Check your email for confirmation and additional details.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Registration form UI
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
              {/* Full Name */}
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

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mt-2"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Info Note */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  After registration, you'll receive confirmation and class
                  details via email.
                </p>
              </div>

              {/* Submit Button */}
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
    </section>
  );
};

export default RegistrationSection;
