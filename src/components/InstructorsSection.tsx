import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import instructor4 from "@/assets/instructor-4.jpg";

const InstructorsSection = () => {
  const instructors = [
    {
      name: "Sarah Mitchell",
      title: "Yoga & Wellness Coach",
      image: instructor1,
    },
    {
      name: "Michael Chen",
      title: "Vinyasa Flow Specialist",
      image: instructor2,
    },
    {
      name: "Priya Sharma",
      title: "Meditation & Mindfulness Expert",
      image: instructor3,
    },
    {
      name: "David Thompson",
      title: "Restorative Yoga Master",
      image: instructor4,
    },
  ];

  return (
    <section id="instructors" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Your Instructors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from certified experts passionate about your wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-muted-foreground">{instructor.title}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
