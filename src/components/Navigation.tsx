import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import svasthaLogo from "@/assets/svastha.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img
              src={svasthaLogo}
              alt="Svastha Wellness"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-primary">Svastha X StrongByYoga</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Button
              onClick={() => scrollToSection("#register")}
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-hover"
            >
              Register Now
            </Button>
          </div>

          {/* Mobile Navigation - Show Register Button */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              onClick={() => scrollToSection("#register")}
              size="sm"
              className="bg-primary hover:bg-primary/90 transition-all duration-300 text-sm px-4 py-2"
            >
              Register
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            ></button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-card rounded-lg shadow-soft overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-3">
                <Button
                  onClick={() => scrollToSection("#register")}
                  className="bg-primary hover:bg-primary/90 w-full"
                >
                  Register Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
