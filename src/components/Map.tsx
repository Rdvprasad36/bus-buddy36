
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  children?: React.ReactNode;
}

// Visakhapatnam coordinates
const VIZAG_COORDINATES: [number, number] = [83.2185, 17.6868];

export function Map({ 
  className, 
  center = VIZAG_COORDINATES, 
  zoom = 12,
  children 
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLocateMe = () => {
    setIsLocating(true);
    // In a real app, we would use the browser's geolocation API
    setTimeout(() => {
      setIsLocating(false);
    }, 2000);
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      {!isLoaded ? (
        <Skeleton className="w-full h-full absolute inset-0" />
      ) : (
        <>
          <div 
            ref={mapRef} 
            className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/83.2185,17.6868,11,0/600x600@2x?access_token=pk.eyJ1IjoiZHVtbXkiLCJhIjoicGxhY2Vob2xkZXIifQ.dummy')] bg-cover bg-center"
          >
            {/* This is a static map image, in a real app we would use a proper map library */}
            {children}
          </div>
          
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-10 w-10 rounded-full shadow-lg"
              onClick={handleLocateMe}
              disabled={isLocating}
            >
              <Navigation className={cn(
                "h-5 w-5 transition-transform", 
                isLocating && "animate-bounce-soft"
              )} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-10 w-10 rounded-full shadow-lg"
            >
              <MapPin className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
