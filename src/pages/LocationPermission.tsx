
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationPermission } from "@/components/LocationPermission";
import { toast } from "@/components/ui/sonner";

export default function LocationPermissionPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay for the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAllowLocation = () => {
    // In a real app, we would store the permission status
    localStorage.setItem("locationPermission", "granted");
    
    toast.success("Location access granted");
    navigate("/home");
  };

  const handleDenyLocation = () => {
    // In a real app, we would store the permission status
    localStorage.setItem("locationPermission", "denied");
    
    toast.info("You can enable location access later from settings");
    navigate("/home");
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 p-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <LocationPermission 
        onAllow={handleAllowLocation}
        onDeny={handleDenyLocation}
      />
    </div>
  );
}
