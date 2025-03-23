
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Share2, Clock, MapPin, Navigation, Users } from "lucide-react";

type BusCapacity = "empty" | "medium" | "full";

interface BusDetailsProps {
  className?: string;
  busNumber: string;
  route: string;
  capacity: BusCapacity;
  currentLocation: string;
  nextStop: string;
  arrivalTime?: string;
  onShareLocation?: () => void;
}

export function BusDetails({ 
  className, 
  busNumber, 
  route,
  capacity,
  currentLocation,
  nextStop,
  arrivalTime,
  onShareLocation
}: BusDetailsProps) {
  const getCapacityColor = (capacity: BusCapacity) => {
    switch (capacity) {
      case "empty": return "bg-bus-empty border-gray-200 text-gray-700";
      case "medium": return "bg-bus-medium border-amber-300 text-amber-800";
      case "full": return "bg-bus-full border-red-500 text-white";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getCapacityValue = (capacity: BusCapacity) => {
    switch (capacity) {
      case "empty": return 10;
      case "medium": return 50;
      case "full": return 90;
      default: return 0;
    }
  };

  return (
    <div className={cn("rounded-lg glass p-4 shadow-lg border animate-scale-in", className)}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-2xl font-bold">{busNumber}</h2>
          <p className="text-sm text-muted-foreground">{route}</p>
        </div>
        <Badge className={cn("border", getCapacityColor(capacity))}>
          {capacity}
        </Badge>
      </div>
      
      <div className="space-y-4 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-medium">Current location:</span> {currentLocation}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-medium">Next stop:</span> {nextStop}
          </span>
        </div>
        
        {arrivalTime && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-medium">Estimated arrival:</span> {arrivalTime}
            </span>
          </div>
        )}
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Bus capacity</span>
            <span className="text-xs">{getCapacityValue(capacity)}%</span>
          </div>
          <Progress value={getCapacityValue(capacity)} className="h-2" />
        </div>
      </div>
      
      <div className="flex justify-between gap-2">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Track</span>
        </Button>
        <Button onClick={onShareLocation} className="w-full flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share Location</span>
        </Button>
      </div>
    </div>
  );
}
