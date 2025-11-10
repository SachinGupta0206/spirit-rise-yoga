import { motion } from "framer-motion";
import {
  Video,
  Users,
  Calendar,
  PlayCircle,
  Utensils,
  Heart,
} from "lucide-react";

const WhyJoinSection = () => {
  const benefits = [
    {
      icon: Video,
      title: "Daily Live Online Classes",
      description:
        "Join from the comfort of your home with interactive sessions",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description:
        "Certified yoga professionals guiding you every step of the way",
    },
    {
      icon: Calendar,
      title: "Structured Weekly Themes",
      description:
        "Balanced progression through detox, strength, and flexibility",
    },
    {
      icon: PlayCircle,
      title: "Recordings Available",
      description: "Never miss a session with on-demand access to all classes",
    },
    {
      icon: Utensils,
      title: "Diet & Lifestyle Guidance",
      description: "Personalized nutrition advice (early bird bonus)",
    },
    {
      icon: Heart,
      title: "Absolutely Free",
      description:
        "Join our 21-Day Free Yoga Camp and discover a healthier, happier you! ✨",
    },
  ];

  return (
    <section
      id="why-join"
      className="py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Join This Yoga Camp?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a transformative journey designed to help you achieve
            your wellness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
