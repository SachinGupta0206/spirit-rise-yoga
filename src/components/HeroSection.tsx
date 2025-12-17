import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import heroImage from "@/assets/hero-yoga.jpg";
import ReactCountryFlag from "react-country-flag";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-01-05T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
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
              <span className="text-sm font-medium">
                Starting January 05, 2026
              </span>
            </div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ultimate 21-Day
              <br />
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Yoga Camp
              </motion.span>
            </motion.h1>
            <motion.h3
              className="text-xl font-bold text-white text-foreground mb-6 inline-flex items-center gap-2 bg-card/40 backdrop-blur-sm px-4 py-2 rounded-sm shadow-soft"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.span
                className="inline-flex items-center gap-1"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </motion.span>
              {" "}from India{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <ReactCountryFlag
                  countryCode="IN"
                  svg
                  style={{ width: "0.9em", height: "0.9em" }}
                />
              </motion.span>
              {" "}to USA{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{ width: "0.9em", height: "0.9em" }}
                />
              </motion.span>
            </motion.h3>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              A life-changing journey to feel lighter, stronger, and calmer — in
              just 21 days.
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 shadow-hover transition-all duration-300 hover:scale-110"
              >
                Register Now
              </Button>

            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-card/90 backdrop-blur-md rounded-2xl p-6 shadow-hover max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(156, 35, 55, 0.3), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="text-primary" size={20} />
                  </motion.div>
                  <h3 className="text-lg font-semibold">Camp Starts In</h3>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="text-center relative"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    >
                      <motion.div
                        className="text-3xl md:text-4xl font-bold text-primary relative"
                        key={item.value}
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Glow effect for seconds */}
                        {item.label === "Seconds" && (
                          <motion.span
                            className="absolute inset-0 text-primary blur-sm"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            {String(item.value).padStart(2, "0")}
                          </motion.span>
                        )}
                        <span className="relative">{String(item.value).padStart(2, "0")}</span>
                      </motion.div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.label}
                      </div>
                      {/* Separator dots */}
                      {index < 3 && (
                        <motion.span
                          className="absolute -right-2 top-1/4 text-primary text-2xl font-bold hidden md:block"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          :
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Sparkles/Stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="opacity-60">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-32 left-[10%]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 45, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1">
          <circle cx="20" cy="20" r="18" />
          <circle cx="20" cy="20" r="10" />
          <circle cx="20" cy="20" r="4" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-[12%]"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="rgba(156, 35, 55, 0.4)" strokeWidth="1.5">
          <polygon points="25,5 45,40 5,40" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-[8%]"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="white" strokeWidth="1" className="opacity-20">
          <rect x="5" y="5" width="20" height="20" rx="2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-[8%]"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="white" strokeWidth="1">
          <circle cx="30" cy="30" r="25" />
          <path d="M30 5 L30 55 M5 30 L55 30" />
          <circle cx="30" cy="30" r="12" />
        </svg>
      </motion.div>

      {/* Floating Dots Pattern */}
      <motion.div
        className="absolute top-1/2 left-[5%]"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="white" className="opacity-20">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="2" />
            ))
          )}
        </svg>
      </motion.div>

      {/* Floating Orbs with Glow */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-lg"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Animated Lines/Rays */}
      <motion.div
        className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-white/20 to-transparent"
        animate={{
          opacity: [0, 0.5, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 left-1/3 w-px h-24 bg-gradient-to-b from-primary/30 to-transparent rotate-12"
        animate={{
          opacity: [0, 0.4, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-5 right-1/3 w-px h-28 bg-gradient-to-b from-white/15 to-transparent -rotate-12"
        animate={{
          opacity: [0, 0.3, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </section>
  );
};

export default HeroSection;
