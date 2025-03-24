
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Clock, MapPin, Bus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BusDetailsProps {
  busNumber: string;
  route: string;
  capacity: "empty" | "medium" | "full";
  currentLocation: string;
  nextStop: string;
  arrivalTime: string;
  className?: string;
  onShareLocation?: () => void;
  onShowStops?: () => void;
}

export function BusDetails({
  busNumber,
  route,
  capacity,
  currentLocation,
  nextStop,
  arrivalTime,
  className,
  onShareLocation,
  onShowStops
}: BusDetailsProps) {
  const getCapacityColor = () => {
    switch (capacity) {
      case "empty": return "bg-green-100 text-green-700 border-green-200";
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "full": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className={cn("bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-lg">{busNumber}</h3>
              <p className="text-xs text-muted-foreground">{route}</p>
            </div>
          </div>
          <Badge className={cn("border", getCapacityColor())}>
            {capacity}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">Current Location</div>
              <div className="text-xs text-muted-foreground">{currentLocation}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">Next Stop: {nextStop}</div>
              <div className="text-xs text-muted-foreground">Arriving in {arrivalTime}</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {onShowStops && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1" 
              onClick={onShowStops}
            >
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>View Stops</span>
            </Button>
          )}
          
          {onShareLocation && (
            <Button 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={onShareLocation}
            >
              <Share2 className="h-3.5 w-3.5 mr-1" />
              <span>Share Location</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
