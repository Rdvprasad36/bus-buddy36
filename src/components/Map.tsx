
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Navigation, ZoomIn, ZoomOut, Bus, Route, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  children?: React.ReactNode;
  allowEditing?: boolean;
  useGoogleMaps?: boolean;
  location?: string;
  showBusStopsOnly?: boolean;
  showTraffic?: boolean;
  showDepots?: boolean;
  busNumber?: string;
}

// Andhra Pradesh coordinates
const AP_COORDINATES: [number, number] = [80.7143, 16.4543];

export function Map({ 
  className, 
  center = AP_COORDINATES, 
  zoom = 6.5,
  children,
  allowEditing = true,
  useGoogleMaps = false,
  location = "visakhapatnam",
  showBusStopsOnly = false,
  showTraffic = false,
  showDepots = false,
  busNumber
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [mapType, setMapType] = useState("roadmap");

  // Initialize map
  useEffect(() => {
    // If using Google Maps, we don't need to initialize Mapbox
    if (useGoogleMaps) {
      setIsLoaded(true);
      return;
    }
    
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
  }, [center, zoom, allowEditing, useGoogleMaps]);

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
  
  const changeMapType = (type: string) => {
    setMapType(type);
  };

  if (useGoogleMaps) {
    // Build the Google Maps URL with appropriate parameters
    let googleMapsSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=${encodeURIComponent(location)}`;
    
    // Add bus number to search if provided
    if (busNumber) {
      googleMapsSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=bus%20${encodeURIComponent(busNumber)}%20route%20${encodeURIComponent(location)}`;
    }
    
    // If we want to show only bus stops
    if (showBusStopsOnly) {
      googleMapsSrc = `https://www.google.com/maps/embed/v1/search?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=bus%20stops%20in%20${encodeURIComponent(location)}`;
      
      if (busNumber) {
        googleMapsSrc = `https://www.google.com/maps/embed/v1/search?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=bus%20${encodeURIComponent(busNumber)}%20stops%20in%20${encodeURIComponent(location)}`;
      }
    }
    
    // If we want to show depots
    if (showDepots) {
      googleMapsSrc = `https://www.google.com/maps/embed/v1/search?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=bus%20depot%20in%20${encodeURIComponent(location)}`;
    }
    
    // If showing traffic
    if (showTraffic) {
      googleMapsSrc += "&maptype=roadmap";
      // Add the traffic layer parameter
      googleMapsSrc += "&traffic=1"; // This adds the traffic layer
    } else {
      googleMapsSrc += `&maptype=${mapType}`;
    }
    
    googleMapsSrc += "&zoom=14";
    
    return (
      <div className={cn("relative rounded-lg overflow-hidden", className)}>
        {!isLoaded ? (
          <Skeleton className="w-full h-full absolute inset-0" />
        ) : (
          <>
            <iframe 
              width="100%" 
              height="100%" 
              src={googleMapsSrc} 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen
              title="Google Map"
            />
            
            {/* Map type selector for Google Maps */}
            <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 rounded-md shadow-md p-1 flex gap-1">
              <Button 
                size="sm" 
                variant={mapType === "roadmap" ? "default" : "ghost"} 
                className="h-7 text-xs px-2"
                onClick={() => changeMapType("roadmap")}
              >
                <MapPin className="h-3 w-3 mr-1" /> Map
              </Button>
              <Button 
                size="sm" 
                variant={mapType === "satellite" ? "default" : "ghost"} 
                className="h-7 text-xs px-2"
                onClick={() => changeMapType("satellite")}
              >
                <Route className="h-3 w-3 mr-1" /> Satellite
              </Button>
            </div>
            
            {/* Legend for the map */}
            <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-md shadow-md p-2 text-xs">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Bus className="h-3 w-3 text-blue-500" /> 
                  <span>Bus Route</span>
                </div>
                {showBusStopsOnly && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" /> 
                    <span>Bus Stops</span>
                  </div>
                )}
                {showDepots && (
                  <div className="flex items-center gap-1">
                    <Landmark className="h-3 w-3 text-green-500" /> 
                    <span>Bus Depots</span>
                  </div>
                )}
                {showTraffic && (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Light Traffic</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Moderate Traffic</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Heavy Traffic</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

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
