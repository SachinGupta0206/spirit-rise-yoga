import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import JourneySection from "@/components/JourneySection";
import ScheduleSection from "@/components/ScheduleSection";
import RegistrationSection from "@/components/RegistrationSection";
import FAQSection from "@/components/FAQSection";
import ScrollToTop from "@/components/ScrollToTop";
import InstructorsSection from "@/components/InstructorsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyJoinSection />
      <JourneySection />
      <ScheduleSection />
      <RegistrationSection />
      <InstructorsSection />
      <FAQSection />
      <ScrollToTop />

      <footer className="bg-foreground/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            © 2025 Svastha X StrongByYoga. All rights reserved. | Transform your
            life through yoga.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
