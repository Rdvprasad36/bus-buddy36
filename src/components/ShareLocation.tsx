
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Share2, Users, Map, Plus, Bus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BusNumberSelector } from "@/components/BusNumberSelector";
import { BusCapacitySelector } from "@/components/BusCapacitySelector";
import { startLocationSharing } from "@/utils/locationSharing";
import { useNavigate } from "react-router-dom";

interface ShareLocationProps {
  className?: string;
  onShareComplete: () => void;
}

export function ShareLocation({ 
  className, 
  onShareComplete 
}: ShareLocationProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [busNumber, setBusNumber] = useState("");
  const [capacity, setCapacity] = useState("medium");
  const navigate = useNavigate();
  
  const userId = localStorage.getItem("userId") || `user_${Math.floor(Math.random() * 10000)}`;
  const userName = localStorage.getItem("userName") || "Anonymous";
  const gender = localStorage.getItem("gender") || "not-specified";
  const userType = localStorage.getItem("userType") || "passenger";
  
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!busNumber) {
      toast.error("Please select a bus number");
      return;
    }

    setIsSharing(true);
    
    startLocationSharing(
      userId,
      busNumber,
      capacity,
      userName,
      gender,
      () => {
        setIsSharing(false);
        toast.success(`You are now sharing your location for bus ${busNumber}`);
        onShareComplete();
      },
      (errorMessage) => {
        setIsSharing(false);
        toast.error(errorMessage);
      }
    );
  };

  const handleAddBus = () => {
    navigate("/add-bus");
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Share2 className="h-5 w-5" />
          <span>Share Your Location</span>
        </CardTitle>
        <CardDescription className="text-center">
          Help other commuters by sharing your current bus location and capacity
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <BusNumberSelector 
            busNumber={busNumber} 
            onBusNumberChange={setBusNumber} 
            disabled={isSharing}
          />
          
          {(userType === "driver" || userType === "conductor") && (
            <div className="text-center">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddBus}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                <Bus className="h-4 w-4" />
                <span>Can't find your bus? Add New Bus</span>
              </Button>
            </div>
          )}
          
          <BusCapacitySelector 
            capacity={capacity} 
            onCapacityChange={setCapacity} 
            disabled={isSharing}
          />
          
          <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-md">
            <Map className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">
              Your location will be shared until you leave the bus or manually stop sharing
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <ShareButton isSharing={isSharing} />
          <p className="text-xs text-center text-muted-foreground mt-1">
            By sharing your location, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

interface ShareButtonProps {
  isSharing: boolean;
}

function ShareButton({ isSharing }: ShareButtonProps) {
  return (
    <Button 
      type="submit" 
      className="w-full"
      disabled={isSharing}
    >
      {isSharing ? (
        <span className="flex items-center gap-1">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Sharing location...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Share My Location</span>
        </span>
      )}
    </Button>
  );
}
