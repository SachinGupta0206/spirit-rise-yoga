import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import JourneySection from "@/components/JourneySection";
import ScheduleSection from "@/components/ScheduleSection";
import RegistrationSection from "@/components/RegistrationSection";
import FAQSection from "@/components/FAQSection";
import ScrollToTop from "@/components/ScrollToTop";
import RegisterPopup from "@/components/RegisterPopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyJoinSection />
      <JourneySection />
      <ScheduleSection />
      <RegistrationSection />
      <FAQSection />
      <ScrollToTop />
      <RegisterPopup />

      <footer className="bg-foreground/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Svastha Wellness. All rights reserved. | Transform your life
            through yoga.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
