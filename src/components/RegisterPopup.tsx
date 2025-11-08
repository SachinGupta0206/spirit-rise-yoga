import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const RegisterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRegister = () => {
    const element = document.querySelector("#register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-4 md:mx-0"
        >
          <div className="bg-card rounded-2xl shadow-hover border border-primary/20 p-6 relative overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="relative">
              <h3 className="text-xl font-bold text-foreground mb-2 pr-6">
                🌿 Join Our FREE 21-Day Yoga Camp
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                Starting November 17, 2025
              </p>
              <p className="text-sm text-foreground mb-4">
                Feel lighter, stronger & calmer — from home!
              </p>

              {/* Animated Register Button */}
              <Button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-6 rounded-xl shadow-soft transition-all duration-300 hover:shadow-hover hover:scale-105 animate-pulse"
              >
                Register Now
              </Button>

              {/* Social proof */}
              <p className="text-xs text-center text-muted-foreground mt-3">
                🔥 3500+ people already joined!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterPopup;
