
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Share2, MapPin } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Index() {
  const navigate = useNavigate();
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  
  useEffect(() => {
    // Animation sequence
    const introTimer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 4000);
    
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 4300);
    
    return () => {
      clearTimeout(introTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const busImages = [
    "/lovable-uploads/3bb69279-098d-4732-b96c-4b8823d96670.png",
    "https://source.unsplash.com/random/400x300/?bus",
    "https://source.unsplash.com/random/400x300/?public-transport",
    "https://source.unsplash.com/random/400x300/?city-bus"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900 p-6 pt-16">
      {!isIntroComplete ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-64 h-64 relative">
            <Logo size="lg" withText withTagline animated />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <Logo size="md" withText={false} className="mr-2" />
              <h1 className="text-2xl font-bold text-brand font-mono uppercase">
                BUS BUDDY
              </h1>
            </div>
          </div>
          
          <div className={cn(
            "max-w-4xl w-full flex flex-col items-center text-center transition-all duration-700 transform",
            isContentVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
              {busImages.map((src, index) => (
                <div key={index} className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src={src} 
                      alt={`Bus ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
            
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                Your real-time bus companion
              </h2>
              <p className="text-muted-foreground">
                Track buses in real-time, get arrival predictions, and share your location to help other commuters in Visakhapatnam
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button 
                size="lg" 
                className="flex-1 relative overflow-hidden group bg-brand hover:bg-brand/90"
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
                className="flex-1 relative overflow-hidden group border-brand text-brand hover:text-brand/90 hover:bg-brand/10"
                onClick={() => navigate("/signup")}
              >
                <span className="absolute inset-0 bg-brand/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share Location</span>
                </span>
              </Button>
            </div>
            
            <div className="mt-8 text-xs text-muted-foreground">
              <p>
                By using Bus Buddy, you agree to our{" "}
                <a href="#" className="text-brand hover:underline bus-buddy-transition">
                  Terms of Service
                </a>
                {" "}and{" "}
                <a href="#" className="text-brand hover:underline bus-buddy-transition">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
