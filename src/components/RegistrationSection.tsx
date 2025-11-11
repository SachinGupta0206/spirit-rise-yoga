import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChartSpline, CheckCircle2 } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RegistrationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       "https://spirit-rise-yoga-3.onrender.com/api/register",
  //       {
  //         name: formData.name.trim(),
  //         email: formData.email.trim(),
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("✅ Server Response:", response.data);

  //     // Show success modal
  //     setIsModalOpen(true);
  //     setFormData({ name: "", email: "" });
  //   } catch (error: any) {
  //     console.error("❌ Registration failed:", error);

  //     // Show error message
  //     toast({
  //       title: "⚠️ Something went wrong. Please try again.",
  //       description:
  //         error.response?.data?.message ||
  //         "Registration failed. Please check your details and try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const registrationData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    try {
      // Send to BOTH endpoints simultaneously
      const results = await Promise.allSettled([
        // Old backend endpoint
        axios.post(
          "https://spirit-rise-yoga-3.onrender.com/api/register",
          registrationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        // New Google Apps Script webhook
        axios.post(
          "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjMmjydMjWDCr3guw252R63EBfxGxzNBbdaGDS-xwCJWuAUxcqiUi7YkEoo5WdRf0G3UthXrL8JwVe3GIPv4NQ6UT5lgXruFuU541kdtbIHmp9xfwyF4ryWoNm5UeZ3H-KxINsaIhQcunbI1GB0oA93a8xsATthlPVs7GQOex7MRnWwyQhze4wE8EzAbylDHnP-Qg6TEpY7_b1KRuLB28haT6jDxFYe8jle9YsfSaRUCaV6hokzdaeIc25XMn9ovwkgOB9nB7wWxxS4N_38RW8lgCKxSMxmt7c3IlM_0HO641GGymCXUqPW5g4vEQ&lib=M2vNyyvQD1EbOwtfPcwYK8wUC-3XS2GZ-",
          registrationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
      ]);

      // Check results
      const [oldEndpointResult, googleScriptResult] = results;

      // Log results for debugging
      console.log(
        "✅ Old Endpoint:",
        oldEndpointResult.status === "fulfilled" ? "Success" : "Failed"
      );
      console.log(
        "✅ Google Script:",
        googleScriptResult.status === "fulfilled" ? "Success" : "Failed"
      );

      if (oldEndpointResult.status === "fulfilled") {
        console.log("Old Backend Response:", oldEndpointResult.value.data);
      }
      if (googleScriptResult.status === "fulfilled") {
        console.log("Google Script Response:", googleScriptResult.value.data);
      }

      // Show success modal if at least one succeeded
      if (
        oldEndpointResult.status === "fulfilled" ||
        googleScriptResult.status === "fulfilled"
      ) {
        setIsModalOpen(true);
        setFormData({ name: "", email: "" });

        // Optional: Show warning if one failed
        if (
          oldEndpointResult.status === "rejected" ||
          googleScriptResult.status === "rejected"
        ) {
          console.warn(
            "⚠️ One of the endpoints failed, but registration was recorded"
          );
        }
      } else {
        // Both failed
        throw new Error("Both registration endpoints failed");
      }
    } catch (error: any) {
      console.error("❌ Registration failed:", error);

      toast({
        title: "⚠️ Something went wrong. Please try again.",
        description:
          "Registration failed. Please check your details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinWhatsApp = () => {
    const whatsappLink = "https://chat.whatsapp.com/CxkVX14yHcrLRpMoDVftMN";

    try {
      const newWindow = window.open(whatsappLink, "_blank");

      if (!newWindow) {
        window.location.href = whatsappLink;
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ Error opening WhatsApp link:", error);
      toast({
        title: "Join our WhatsApp Group",
        description: "Please manually join: " + whatsappLink,
      });
    }
  };

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

      {/* Success Modal */}
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
              ✅ Registration Successful!
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base leading-relaxed pt-3">
              You’re officially part of the
              <span className="text-primary font-semibold">
                {" "}
                Ultimate 21-Day Yoga Camp! 🧘‍♀️
              </span>
              <br />
            </DialogDescription>
            {/* Divider */}
            <div className="my-5 border-t border-gray-200" />

            {/* WhatsApp Section */}
            <div className="space-y-3">
              <p className="text-gray-800 font-medium mt-6">
                📢{" "}
                <span className="font-semibold">
                  Important Next Step — Don’t Skip!
                </span>
              </p>
              <p className="text-sm text-gray-600">
                All Zoom links, reminders, and daily updates will be shared only
                in our official WhatsApp group.
              </p>

              <Button
                onClick={handleJoinWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium mt-6"
              >
                <WhatsAppIcon />
                Join WhatsApp Group
              </Button>
            </div>

            {/* Optional App Section */}
            <div className="space-y-3 mt-6">
              <p className="text-gray-800 font-medium mt-8">
                💡 Optional: Stay Connected Anywhere
              </p>
              <p className="text-sm text-gray-600">
                Download our <span className="font-semibold">Svastha App</span>{" "}
                to track your yoga progress, join live sessions, and form new
                habits easily 📲
              </p>

              <Button
                variant="outline"
                className="w-full font-medium mt-2"
                onClick={() =>
                  window.open("http://svastha.fit/download", "_blank")
                }
              >
                📱 Download App
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RegistrationSection;
