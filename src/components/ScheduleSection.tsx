import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Video } from "lucide-react";
import { Card } from "@/components/ui/card";

const ScheduleSection = () => {
  const morningBatches = ["5:30 AM", "6:15 AM", "7:00 AM", "8:30 AM"];
  const eveningBatches = ["4:30 PM", "5:30 PM", "6:30 PM", "7:30 PM"];

  const details = [
    { icon: MapPin, label: "Venue", value: "Online (Zoom)" },
    { icon: Calendar, label: "Duration", value: "21 Days" },
    { icon: Video, label: "Recordings", value: "Available" },
  ];

  return (
    <section id="schedule" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Class Schedule
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a time that fits your schedule — join from anywhere
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Morning Batches */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 shadow-soft hover:shadow-hover transition-all duration-300 bg-gradient-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Morning Batches</h3>
                </div>
                <div className="space-y-3">
                  {morningBatches.map((time, index) => (
                    <motion.div
                      key={time}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card p-4 rounded-xl border border-border hover:border-primary transition-colors duration-300"
                    >
                      <p className="text-lg font-semibold text-foreground">{time}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Evening Batches */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 shadow-soft hover:shadow-hover transition-all duration-300 bg-gradient-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-3 rounded-xl">
                    <Clock className="text-secondary" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Evening Batches</h3>
                </div>
                <div className="space-y-3">
                  {eveningBatches.map((time, index) => (
                    <motion.div
                      key={time}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card p-4 rounded-xl border border-border hover:border-secondary transition-colors duration-300"
                    >
                      <p className="text-lg font-semibold text-foreground">{time}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Additional Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {details.map((detail) => (
              <Card
                key={detail.label}
                className="p-6 text-center shadow-soft hover:shadow-hover transition-all duration-300"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <detail.icon className="text-primary" size={24} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{detail.label}</p>
                <p className="text-lg font-semibold text-foreground">{detail.value}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
