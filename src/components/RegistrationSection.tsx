import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
  email: z.string().email("Please enter a valid email address"),
  batch: z.string().min(1, "Please select a batch timing"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const RegistrationSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const selectedBatch = watch("batch");

  const batches = [
    "Morning - 5:30 AM",
    "Morning - 6:15 AM",
    "Morning - 7:00 AM",
    "Morning - 8:30 AM",
    "Evening - 4:30 PM",
    "Evening - 5:30 PM",
    "Evening - 6:30 PM",
    "Evening - 7:30 PM",
  ];

  const onSubmit = (data: RegistrationForm) => {
    console.log("Registration data:", data);
    
    toast({
      title: "Registration Successful!",
      description: "Redirecting you to the WhatsApp group...",
    });

    setIsSubmitted(true);

    // Redirect to WhatsApp group after 2 seconds
    setTimeout(() => {
      window.open("https://chat.whatsapp.com/YOUR_LINK", "_blank");
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <section id="register" className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-card rounded-3xl p-12 shadow-hover">
              <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-primary" size={48} />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Welcome to the Yoga Camp!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                You're all set! We're redirecting you to our WhatsApp group where you'll receive
                class links and updates.
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

  return (
    <section id="register" className="py-20 bg-gradient-to-b from-background to-primary/5">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-base">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Enter your 10-digit phone number"
                  className="mt-2"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="batch" className="text-base">
                  Preferred Batch Timing *
                </Label>
                <Select
                  onValueChange={(value) => setValue("batch", value)}
                  value={selectedBatch}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.batch && (
                  <p className="text-destructive text-sm mt-1">{errors.batch.message}</p>
                )}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  After registration, you'll receive the WhatsApp group link and class updates via
                  email.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 shadow-hover transition-all duration-300 hover:scale-105"
              >
                Complete Registration
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationSection;
