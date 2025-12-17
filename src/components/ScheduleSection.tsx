import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Video, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

const ScheduleSection = () => {
  const [userTimezone, setUserTimezone] = useState<string>("");
  const [isIST, setIsIST] = useState(true);

  // Detect user's timezone automatically on component mount
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
    setIsIST(timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta");
  }, []);

  // Get timezone abbreviation
  const getTimezoneAbbr = (): string => {
    try {
      const date = new Date();
      const tzString = date.toLocaleTimeString("en-US", {
        timeZone: userTimezone,
        timeZoneName: "short",
      });
      const abbr = tzString.split(" ").pop() || "";
      return abbr;
    } catch (error) {
      return "";
    }
  };

  // Convert IST time to user's local timezone - returns object with time, timezone, and hour
  const convertTime = (istTime: string): { time: string; timezone: string; hour24: number } => {
    if (isIST) {
      // Parse IST time to get hour for classification
      const [time, period] = istTime.split(" ");
      const [hours] = time.split(":").map(Number);
      let hour24 = hours;
      if (period === "PM" && hours !== 12) hour24 += 12;
      if (period === "AM" && hours === 12) hour24 = 0;

      return {
        time: istTime.toLowerCase(),
        timezone: "IST",
        hour24: hour24,
      };
    }

    try {
      // Parse IST time
      const [time, period] = istTime.split(" ");
      const [hours, minutes] = time.split(":").map(Number);

      // Convert to 24-hour format
      let hour24 = hours;
      if (period === "PM" && hours !== 12) hour24 += 12;
      if (period === "AM" && hours === 12) hour24 = 0;

      // Create date object in IST
      const today = new Date();
      const istDate = new Date(
        Date.UTC(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hour24 - 5, // IST is UTC+5:30
          minutes - 30
        )
      );

      // Format in user's timezone
      const localTime = istDate
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: userTimezone,
        })
        .toLowerCase(); // Convert AM/PM to am/pm

      // Get the local hour for classification
      const localHour = istDate.getHours();

      const tzAbbr = getTimezoneAbbr();
      return {
        time: localTime,
        timezone: tzAbbr,
        hour24: localHour,
      };
    } catch (error) {
      console.error("Error converting time:", error);
      // Parse IST time to get hour for fallback
      const [time, period] = istTime.split(" ");
      const [hours] = time.split(":").map(Number);
      let hour24 = hours;
      if (period === "PM" && hours !== 12) hour24 += 12;
      if (period === "AM" && hours === 12) hour24 = 0;

      return {
        time: istTime.toLowerCase(),
        timezone: "IST",
        hour24: hour24,
      };
    }
  };

  // Determine if a batch is morning or evening based on converted times
  const getBatchLabel = (times: string[]): string => {
    const convertedTimes = times.map(time => convertTime(time));
    const avgHour = convertedTimes.reduce((sum, t) => sum + t.hour24, 0) / convertedTimes.length;

    if (avgHour < 12) {
      return "Morning Batches";
    } else if (avgHour < 17) {
      return "Afternoon Batches";
    } else {
      return "Evening Batches";
    }
  };

  const morningBatches = ["5:30 AM", "6:15 AM", "7:00 AM", "8:30 AM"];
  const eveningBatches = ["4:30 PM", "5:30 PM", "6:30 PM", "7:15 PM"];

  const details = [
    { icon: MapPin, label: "Venue", value: "Online (Zoom)" },
    { icon: Calendar, label: "Duration", value: "21 Days" },
    { icon: Video, label: "Recordings", value: "Available" },
  ];

  return (
    <section
      id="schedule"
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
            Class Schedule
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Choose a time that fits your schedule — join from anywhere
          </p>
          {!isIST && userTimezone && (
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mt-2">
              <Globe className="text-primary" size={16} />
              <p className="text-sm text-primary font-medium">
                Times shown in your timezone
              </p>
            </div>
          )}
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
                  <h3 className="text-2xl font-bold text-foreground">
                    {getBatchLabel(morningBatches)}
                  </h3>
                </div>
                <div className="space-y-3">
                  {morningBatches.map((time, index) => {
                    const converted = convertTime(time);
                    return (
                      <motion.div
                        key={time}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-4 rounded-xl border border-border hover:border-primary transition-colors duration-300"
                      >
                        <p className="text-lg font-semibold text-foreground">
                          {converted.time}{" "}
                          <span className="text-xs text-muted-foreground font-normal">
                            ({converted.timezone})
                          </span>
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

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
                  <h3 className="text-2xl font-bold text-foreground">
                    {getBatchLabel(eveningBatches)}
                  </h3>
                </div>
                <div className="space-y-3">
                  {eveningBatches.map((time, index) => {
                    const converted = convertTime(time);
                    return (
                      <motion.div
                        key={time}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card p-4 rounded-xl border border-border hover:border-secondary transition-colors duration-300"
                      >
                        <p className="text-lg font-semibold text-foreground">
                          {converted.time}{" "}
                          <span className="text-xs text-muted-foreground font-normal">
                            ({converted.timezone})
                          </span>
                        </p>
                      </motion.div>
                    );
                  })}
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
                <p className="text-sm text-muted-foreground mb-1">
                  {detail.label}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {detail.value}
                </p>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
