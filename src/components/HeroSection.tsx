import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import heroImage from "@/assets/hero-yoga.jpg";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-11-17T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToRegister = () => {
    const element = document.querySelector("#register");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(28, 40, 98, 0.7), rgba(156, 35, 55, 0.5)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-soft">
              <Calendar className="text-primary" size={20} />
              <span className="text-sm font-medium">Starting November 17, 2025</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Ultimate 21-Day
              <br />
              <span className="text-primary">Yoga Camp</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              A life-changing journey to feel lighter, stronger, and calmer — in just 21 days.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                onClick={scrollToRegister}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 shadow-hover transition-all duration-300 hover:scale-105"
              >
                Register Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.querySelector("#why-join")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-card/90 backdrop-blur-sm border-2 border-white text-foreground hover:bg-white text-lg px-8 py-6 transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-card/90 backdrop-blur-md rounded-2xl p-6 shadow-hover max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="text-primary" size={20} />
                <h3 className="text-lg font-semibold">Camp Starts In</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </section>
  );
};

export default HeroSection;
