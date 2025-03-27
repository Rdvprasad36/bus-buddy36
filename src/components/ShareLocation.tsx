
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { BusCapacitySelector } from "@/components/BusCapacitySelector";
import { Bus, Search, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareLocationProps {
  onShareComplete: (busNumber: string, busFound: boolean) => void;
}

export function ShareLocation({ onShareComplete }: ShareLocationProps) {
  const [busNumber, setBusNumber] = useState("");
  const [capacity, setCapacity] = useState<"empty" | "medium" | "full">("medium");
  const [isSharing, setIsSharing] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  // In a real app, this would come from a database
  const knownBusNumbers = ["1C", "28C", "999", "400", "37G", "900", "500", "555", "10K", "60R", "6", "10A"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!busNumber.trim()) {
      toast.error("Please enter a bus number");
      return;
    }
    
    const busNumberTrimmed = busNumber.trim().toUpperCase();
    
    // Check if the bus number exists in our database
    const busExists = knownBusNumbers.includes(busNumberTrimmed);

    startSharing(busNumberTrimmed, busExists);
  };

  const startSharing = (busNumber: string, busExists: boolean) => {
    setIsSharing(true);
    
    if (navigator.geolocation) {
      const userId = localStorage.getItem("userId") || `user_${Math.floor(Math.random() * 10000)}`;
      const userName = localStorage.getItem("userName") || "Anonymous";
      const userType = localStorage.getItem("userType") || "driver";
      const gender = localStorage.getItem("gender") || "male";
      
      // Save user ID if not already saved
      if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", userId);
      }
      
      // Store sharing status
      localStorage.setItem("isSharing", "true");
      localStorage.setItem("sharingBusNumber", busNumber);
      
      // Start watching position
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          console.log("User location:", latitude, longitude);
          
          // Add to sharing users in localStorage (simplified example)
          const sharingData = {
            userId,
            userName,
            userType,
            gender,
            busNumber,
            latitude,
            longitude,
            capacity,
            timestamp: new Date().toISOString(),
            currentLocation: "Near Jagadamba Junction", // In a real app, this would be reverse geocoded
            nextStop: "RTC Complex" // In a real app, this would come from a route planning system
          };
          
          // Update Firebase or other backend (mock)
          console.log("Updating location in Firebase:", sharingData);
          
          // Store in localStorage for demo purposes
          let sharingUsers = JSON.parse(localStorage.getItem("sharingUsers") || "[]");
          const existingUserIndex = sharingUsers.findIndex((user: any) => user.userId === userId);
          
          if (existingUserIndex >= 0) {
            sharingUsers[existingUserIndex] = sharingData;
          } else {
            sharingUsers.push(sharingData);
          }
          
          localStorage.setItem("sharingUsers", JSON.stringify(sharingUsers));
          localStorage.setItem("locationWatchId", id.toString());
          
          onShareComplete(busNumber, busExists);
        },
        (error) => {
          console.error("Error getting user location:", error);
          toast.error("Could not access your location. Please check your location permissions.");
          setIsSharing(false);
        },
        { 
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000
        }
      );
      
      setWatchId(id);
    } else {
      toast.error("Geolocation is not supported by your browser");
      setIsSharing(false);
    }
  };

  // Handle capacity change
  const handleCapacityChange = (value: "empty" | "medium" | "full") => {
    setCapacity(value);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          Share Bus Location
        </CardTitle>
        <CardDescription>
          Help other commuters by sharing the real-time location of your bus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="bus-number" className="text-sm font-medium">
              Bus Number
            </label>
            <div className="relative">
              <Bus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="bus-number"
                placeholder="Enter bus number (e.g., 28C)"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="pl-9"
                disabled={isSharing}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Bus Capacity
            </label>
            <BusCapacitySelector 
              capacity={capacity} 
              onCapacityChange={handleCapacityChange}
              disabled={isSharing}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSharing || !busNumber.trim()}
          >
            {isSharing ? "Starting Location Sharing..." : "Start Sharing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
