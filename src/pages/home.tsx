import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleDashboardNav = () => {
    navigate("/dashboard");
  };

  const handleVisualizerNav = () => {
    navigate("/visualizer");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-indigo-900 space-y-10">
      <div className="flex flex-col items-center text-cyan-400">
        <h1 className="text-3xl">Welcome to</h1>
        <h1 className="text-8xl">VJ Controller</h1>
        <h1 className="text-xl">v0.0.1 - Beta</h1>
      </div>
      <div className="flex space-x-6">
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={handleDashboardNav}
        >
          Go to Dashboard
          <IconArrowRight className="ml-2" />
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={handleVisualizerNav}
        >
          Go to Visualizer
          <IconArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Home;
