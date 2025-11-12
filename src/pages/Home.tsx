import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Spirit Rise Yoga
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your life through the power of yoga and mindfulness
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/ultimate-21days-yoga-camp")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
          >
            Join Our 21-Day Yoga Camp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
