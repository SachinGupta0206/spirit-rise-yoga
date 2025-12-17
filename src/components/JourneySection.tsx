import { motion } from "framer-motion";
import { Sparkles, Dumbbell, Wind } from "lucide-react";

const JourneySection = () => {
  const weeks = [
    {
      week: 1,
      icon: Sparkles,
      title: "Cleanse & Awaken",
      description: "Gentle flows and breathing practices to purify your body and reawaken your inner energy.",
      color: "bg-primary/10 text-primary",
    },
    {
      week: 2,
      icon: Dumbbell,
      title: "Strength & Stability",
      description: "Build strength, balance, and focus through guided Hatha and Vinyasa sessions.",
      color: "bg-secondary/10 text-secondary",
    },
    {
      week: 3,
      icon: Wind,
      title: "Flexibility Flow",
      description: "Expand your range of motion, ease tension, and experience peace in movement.",
      color: "bg-accent text-accent-foreground",
    },
  ];

  return (
    <section id="journey" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your 3-Week Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A carefully structured program designed for progressive transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {weeks.map((week, index) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.25,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="relative"
            >
              <div className="bg-card rounded-3xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 h-full">
                <motion.div
                  className={`${week.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.25 + 0.3, duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <week.icon size={32} />
                </motion.div>

                <div className="mb-4">
                  <motion.span
                    className="text-sm font-semibold text-primary uppercase tracking-wider"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.25 + 0.4 }}
                  >
                    Week {week.week}
                  </motion.span>
                  <h3 className="text-2xl font-bold text-foreground mt-2">
                    {week.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {week.description}
                </p>
              </div>

              {/* Animated Connector line for desktop */}
              {index < weeks.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 h-0.5 bg-primary/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.25 + 0.5, duration: 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
