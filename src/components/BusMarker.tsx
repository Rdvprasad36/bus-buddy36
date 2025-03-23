
import { cn } from "@/lib/utils";
import { Bus } from "lucide-react";

type BusCapacity = "empty" | "medium" | "full";

interface BusMarkerProps {
  className?: string;
  busNumber: string;
  capacity: BusCapacity;
  onClick?: () => void;
  isSelected?: boolean;
}

export function BusMarker({ 
  className, 
  busNumber, 
  capacity, 
  onClick,
  isSelected = false
}: BusMarkerProps) {
  const capacityColors = {
    empty: "bg-bus-empty text-gray-800",
    medium: "bg-bus-medium text-gray-800",
    full: "bg-bus-full text-white"
  };

  return (
    <div 
      className={cn(
        "relative group cursor-pointer transition-all",
        isSelected ? "scale-110 z-10" : "hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "flex items-center justify-center p-2 rounded-full shadow-lg",
        capacityColors[capacity],
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}>
        <Bus className="h-5 w-5" />
      </div>
      
      <div className={cn(
        "absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-xs font-semibold px-1.5 py-0.5 rounded shadow-sm",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        isSelected && "opacity-100"
      )}>
        {busNumber}
      </div>
    </div>
  );
}
