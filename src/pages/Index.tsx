import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import JourneySection from "@/components/JourneySection";
import ScheduleSection from "@/components/ScheduleSection";
import InstructorsSection from "@/components/InstructorsSection";
import RegistrationSection from "@/components/RegistrationSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyJoinSection />
      <JourneySection />
      <ScheduleSection />
      <InstructorsSection />
      <RegistrationSection />
      <FAQSection />
      <ContactSection />
      <ScrollToTop />
      
      <footer className="bg-foreground/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Svastha Wellness. All rights reserved. | Transform your life through yoga.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
