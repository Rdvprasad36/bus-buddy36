
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Share2, MapPin } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay for the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-6">
      <div className={cn(
        "max-w-md w-full flex flex-col items-center text-center transition-all duration-700 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}>
        <div className="mb-8">
          <Logo size="lg" withText withTagline />
        </div>
        
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Your real-time bus companion
          </h1>
          <p className="text-muted-foreground">
            Track buses in real-time, get arrival predictions, and share your location to help other commuters in Visakhapatnam
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button 
            size="lg" 
            className="flex-1 relative overflow-hidden group"
            onClick={() => navigate("/login")}
          >
            <span className="absolute inset-0 bg-primary-foreground/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Get Bus Info</span>
            </span>
          </Button>
          
          <Button 
            variant="outline"
            size="lg" 
            className="flex-1 relative overflow-hidden group"
            onClick={() => navigate("/signup")}
          >
            <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Share2 className="h-5 w-5" />
              <span>Share Location</span>
            </span>
          </Button>
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>
            By using Bus Buddy, you agree to our{" "}
            <a href="#" className="text-primary hover:underline bus-buddy-transition">
              Terms of Service
            </a>
            {" "}and{" "}
            <a href="#" className="text-primary hover:underline bus-buddy-transition">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
