
import { useState } from "react";
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
import { Navigation, MapPin, X } from "lucide-react";

interface LocationPermissionProps {
  className?: string;
  onAllow: () => void;
  onDeny: () => void;
}

export function LocationPermission({ 
  className, 
  onAllow, 
  onDeny 
}: LocationPermissionProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleAllowLocation = () => {
    setIsRequesting(true);
    
    // In a real app, we would use navigator.geolocation.getCurrentPosition
    setTimeout(() => {
      setIsRequesting(false);
      onAllow();
    }, 1500);
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-center">Location Access</CardTitle>
        <CardDescription className="text-center">
          Bus Buddy needs access to your location to show nearby buses and provide accurate tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-2">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-soft"></div>
          <div className="absolute inset-[12.5%] bg-primary/20 rounded-full animate-pulse-soft animation-delay-150"></div>
          <div className="relative bg-primary text-white p-5 rounded-full animate-bounce-soft">
            <MapPin className="h-10 w-10" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button 
          onClick={handleAllowLocation} 
          className="w-full"
          disabled={isRequesting}
        >
          {isRequesting ? (
            <span className="flex items-center gap-1">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Requesting...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              <span>Allow location access</span>
            </span>
          )}
        </Button>
        <Button 
          variant="outline" 
          onClick={onDeny}
          className="w-full"
          disabled={isRequesting}
        >
          <span className="flex items-center gap-2">
            <X className="h-4 w-4" />
            <span>Not now</span>
          </span>
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Your location data is only used while you are using the app and is never stored without your permission
        </p>
      </CardFooter>
    </Card>
  );
}
