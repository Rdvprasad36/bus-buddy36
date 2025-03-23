
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  children?: React.ReactNode;
  allowEditing?: boolean;
}

// Andhra Pradesh coordinates
const AP_COORDINATES: [number, number] = [80.7143, 16.4543];

export function Map({ 
  className, 
  center = AP_COORDINATES, 
  zoom = 6.5,
  children,
  allowEditing = true
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(zoom);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Use a placeholder token for now
    const token = 'pk.eyJ1IjoiYnVzYnVkZHlhcHAiLCJhIjoiY2xrYXYwcXBuMDRtYjNmcGU5bnZmam10bSJ9.iMQEV6vuxQ1Y-H8XJyxKqQ';
    mapboxgl.accessToken = token;
    
    try {
      mapInstance.current = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: zoom,
        attributionControl: false
      });

      mapInstance.current.on('load', () => {
        setIsLoaded(true);
      });

      mapInstance.current.on('zoom', () => {
        if (mapInstance.current) {
          setCurrentZoom(mapInstance.current.getZoom());
        }
      });

      // Add navigation controls
      if (allowEditing) {
        mapInstance.current.addControl(
          new mapboxgl.NavigationControl(),
          'top-right'
        );
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      // Fallback to static map if mapbox fails to load
      setIsLoaded(true);
    }

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [center, zoom, allowEditing]);

  const handleLocateMe = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          mapInstance.current?.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            essential: true
          });
          setIsLocating(false);
        },
        () => {
          // Error getting location
          setIsLocating(false);
        }
      );
    } else {
      // Geolocation not supported
      setIsLocating(false);
    }
  };

  const handleZoomIn = () => {
    mapInstance.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstance.current?.zoomOut();
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      {!isLoaded ? (
        <Skeleton className="w-full h-full absolute inset-0" />
      ) : (
        <>
          <div 
            ref={mapRef} 
            className="w-full h-full"
          >
            {!mapInstance.current && (
              <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/80.7143,16.4543,6,0/1200x800@2x?access_token=pk.eyJ1IjoiYnVzYnVkZHlhcHAiLCJhIjoiY2xrYXYwcXBuMDRtYjNmcGU5bnZmam10bSJ9.iMQEV6vuxQ1Y-H8XJyxKqQ')] bg-cover bg-center">
                {/* Fallback static map */}
              </div>
            )}
            {children}
          </div>
          
          {allowEditing && (
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 rounded-full shadow-lg"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 rounded-full shadow-lg"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
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
          )}
        </>
      )}
    </div>
  );
}
