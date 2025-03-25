
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
  useGoogleMaps?: boolean;
  location?: string;
  busNumber?: string;
  showBusStops?: boolean;
}

// Andhra Pradesh coordinates
const AP_COORDINATES: [number, number] = [80.7143, 16.4543];
// Visakhapatnam coordinates
const VIZAG_COORDINATES: [number, number] = [83.2184, 17.6868];

export function Map({ 
  className, 
  center = VIZAG_COORDINATES, 
  zoom = 12,
  children,
  allowEditing = true,
  useGoogleMaps = false,
  location = "visakhapatnam",
  busNumber,
  showBusStops = false
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(zoom);

  // Bus routes data
  const busRoutes = {
    "1C": [
      { name: "Pendurthi", coordinates: [83.1585, 17.7993], status: "passed" },
      { name: "Vepagunta", coordinates: [83.1785, 17.7753], status: "passed" },
      { name: "Gopalapatnam", coordinates: [83.1935, 17.7593], status: "passed" },
      { name: "NAD Junction", coordinates: [83.2057, 17.7431], status: "next" },
      { name: "Kancharapalem", coordinates: [83.2198, 17.7231], status: "upcoming" },
      { name: "Dwaraka Bus Station", coordinates: [83.2251, 17.7131], status: "upcoming" },
      { name: "Jagadamba Junction", coordinates: [83.3041, 17.7131], status: "upcoming" },
      { name: "RTC Complex", coordinates: [83.3141, 17.7031], status: "upcoming" },
    ],
    "28C": [
      { name: "Gajuwaka", coordinates: [83.1814, 17.6782], status: "passed" },
      { name: "Scindia", coordinates: [83.1884, 17.6932], status: "passed" },
      { name: "BHPV", coordinates: [83.1944, 17.7042], status: "next" },
      { name: "NAD Junction", coordinates: [83.2057, 17.7431], status: "upcoming" },
      { name: "Kancharapalem", coordinates: [83.2198, 17.7231], status: "upcoming" },
      { name: "Dwaraka Bus Station", coordinates: [83.2251, 17.7131], status: "upcoming" },
      { name: "Jagadamba Junction", coordinates: [83.3041, 17.7131], status: "upcoming" },
      { name: "Railway Station", coordinates: [83.3121, 17.6991], status: "upcoming" },
    ],
    "999": [
      { name: "Simhachalam", coordinates: [83.2506, 17.7513], status: "passed" },
      { name: "Adavivaram", coordinates: [83.2416, 17.7353], status: "next" },
      { name: "Asilmetta", coordinates: [83.3196, 17.7273], status: "upcoming" },
      { name: "Jagadamba Junction", coordinates: [83.3041, 17.7131], status: "upcoming" },
      { name: "RTC Complex", coordinates: [83.3141, 17.7031], status: "upcoming" },
      { name: "MVP Colony", coordinates: [83.3346, 17.7443], status: "upcoming" },
      { name: "Beach Road", coordinates: [83.3556, 17.7111], status: "upcoming" },
    ],
  };

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
        
        // Add bus routes and stops if bus number is provided
        if (busNumber && mapInstance.current && busRoutes[busNumber]) {
          addBusRouteAndStops(busNumber);
        }
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
  }, [center, zoom, allowEditing, useGoogleMaps, busNumber]);

  // Add bus route and stops to the map
  const addBusRouteAndStops = (busNumber: string) => {
    if (!mapInstance.current || !busRoutes[busNumber]) return;
    
    const stops = busRoutes[busNumber];
    const coordinates = stops.map(stop => stop.coordinates);
    
    // Add route line
    mapInstance.current.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates
        }
      }
    });
    
    mapInstance.current.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#0070f3',
        'line-width': 4
      }
    });
    
    // Add bus stops as markers
    stops.forEach((stop, index) => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'bus-stop-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      
      // Style marker based on status
      if (stop.status === 'passed') {
        el.style.backgroundColor = '#6b7280'; // gray
      } else if (stop.status === 'next') {
        el.style.backgroundColor = '#3b82f6'; // blue
        el.style.animation = 'pulse 1.5s infinite';
      } else {
        el.style.backgroundColor = '#10b981'; // green
      }
      
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      
      // Add tooltip on hover
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${stop.name} (${stop.status})`
      );
      
      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(stop.coordinates)
        .setPopup(popup)
        .addTo(mapInstance.current);
    });
    
    // Fit the map to show the entire route
    const bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    
    mapInstance.current.fitBounds(bounds, {
      padding: 50
    });
  };

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

  // Create Google Maps URL with bus route
  const getGoogleMapsUrl = () => {
    let baseUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao`;
    
    if (busNumber && busRoutes[busNumber] && showBusStops) {
      // Create directions URL for the bus route
      const stops = busRoutes[busNumber];
      const origin = stops[0].name;
      const destination = stops[stops.length - 1].name;
      const waypoints = stops.slice(1, -1).map(stop => stop.name).join('|');
      
      return `${baseUrl}&origin=${encodeURIComponent(origin + " visakhapatnam")}&destination=${encodeURIComponent(destination + " visakhapatnam")}&waypoints=${encodeURIComponent(waypoints)}&mode=driving&maptype=roadmap`;
    } else {
      // Default map centered on location
      const locationQuery = busNumber ? `bus ${busNumber} route visakhapatnam` : location;
      return `${baseUrl}&q=${encodeURIComponent(locationQuery)}&zoom=14&maptype=roadmap`;
    }
  };

  if (useGoogleMaps) {
    return (
      <div className={cn("relative rounded-lg overflow-hidden", className)}>
        {!isLoaded ? (
          <Skeleton className="w-full h-full absolute inset-0" />
        ) : (
          <iframe 
            width="100%" 
            height="100%" 
            src={getGoogleMapsUrl()}
            style={{ border: 0 }} 
            loading="lazy" 
            allowFullScreen
            title="Google Map"
          />
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
