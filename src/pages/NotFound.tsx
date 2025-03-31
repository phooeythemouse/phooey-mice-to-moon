
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import StarryBackground from "@/components/StarryBackground";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="space-bg min-h-screen flex items-center justify-center relative">
      <StarryBackground />
      
      <div className="glass-card p-12 text-center max-w-lg z-10">
        <AlertTriangle className="h-16 w-16 text-space-accent mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Houston, we have a problem! This page has floated off into space.</p>
        <Link to="/" className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center transition-all">
          <Home className="mr-2 h-5 w-5" />
          Return to Mission Control
        </Link>
      </div>
      
      {/* Floating Space Elements */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-space-blue/20 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-space-accent/20 animate-float"></div>
      <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-purple-500/20 animate-twinkle"></div>
    </div>
  );
};

export default NotFound;
