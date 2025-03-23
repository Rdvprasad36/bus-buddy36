
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Share2, Users, Map } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!busNumber) {
      toast.error("Please select a bus number");
      return;
    }

    setIsSharing(true);
    
    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false);
      toast.success(`You are now sharing your location for bus ${busNumber}`);
      onShareComplete();
    }, 2000);
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
          <div className="space-y-2">
            <Label htmlFor="busNumber">Bus Number</Label>
            <Select 
              value={busNumber} 
              onValueChange={setBusNumber}
              disabled={isSharing}
            >
              <SelectTrigger id="busNumber">
                <SelectValue placeholder="Select bus number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1C">1C - Pendurthi - RTC Complex</SelectItem>
                <SelectItem value="28C">28C - Gajuwaka - Railway Station</SelectItem>
                <SelectItem value="999">999 - Simhachalam - Beach Road</SelectItem>
                <SelectItem value="400">400 - Madhurawada - Steel Plant</SelectItem>
                <SelectItem value="37G">37G - Gopalapatnam - Rushikonda</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Current Bus Capacity</Label>
            <RadioGroup 
              value={capacity} 
              onValueChange={setCapacity}
              className="flex gap-4"
              disabled={isSharing}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="empty" id="empty" />
                <Label 
                  htmlFor="empty" 
                  className="flex items-center gap-1 text-sm font-normal cursor-pointer"
                >
                  <span className="inline-block w-3 h-3 bg-bus-empty rounded-full border border-gray-300"></span>
                  Empty
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label 
                  htmlFor="medium" 
                  className="flex items-center gap-1 text-sm font-normal cursor-pointer"
                >
                  <span className="inline-block w-3 h-3 bg-bus-medium rounded-full border border-amber-300"></span>
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label 
                  htmlFor="full" 
                  className="flex items-center gap-1 text-sm font-normal cursor-pointer"
                >
                  <span className="inline-block w-3 h-3 bg-bus-full rounded-full border border-red-500"></span>
                  Full
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-md">
            <Map className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">
              Your location will be shared until you leave the bus or manually stop sharing
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
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
          <p className="text-xs text-center text-muted-foreground mt-1">
            By sharing your location, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
