
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { ShareLocation } from "@/components/ShareLocation";
import { Button } from "@/components/ui/button";
import { X, ThumbsUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Map } from "@/components/Map";

export default function Share() {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showStopButton, setShowStopButton] = useState(false);
  const [previousPage, setPreviousPage] = useState<string>("/home");
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sharingBusNumber, setSharingBusNumber] = useState("");
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);
    
    // If not logged in, redirect to login
    if (!loggedIn) {
      toast.error("Please log in to share your location");
      navigate("/login");
    }
    
    // Store previous page for navigation
    const prevPage = localStorage.getItem("previousPage") || "/home";
    setPreviousPage(prevPage);
    
    // Check if already sharing
    const alreadySharing = localStorage.getItem("isSharing") === "true";
    const busNumber = localStorage.getItem("sharingBusNumber") || "";
    
    if (alreadySharing) {
      setIsSharing(true);
      setShowStopButton(true);
      setSharingBusNumber(busNumber);
      
      // Get current location for map
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      }
    }
  }, [navigate]);

  const handleShareComplete = () => {
    // Store sharing status
    setIsSharing(true);
    setShowStopButton(true);
    
    // Get the bus number that's being shared
    const busNumber = localStorage.getItem("sharingBusNumber") || "";
    setSharingBusNumber(busNumber);
    
    // Get current location for map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  };

  const handleStopSharing = () => {
    // Remove sharing data
    localStorage.removeItem("isSharing");
    localStorage.removeItem("sharingBusNumber");
    
    // Remove from sharing users list
    const userId = localStorage.getItem("userId");
    if (userId) {
      const sharingUsers = JSON.parse(localStorage.getItem("sharingUsers") || "[]");
      const updatedUsers = sharingUsers.filter(user => user.userId !== userId);
      localStorage.setItem("sharingUsers", JSON.stringify(updatedUsers));
    }
    
    // Clear location watch if it exists
    if (navigator.geolocation) {
      const watchId = parseInt(localStorage.getItem("locationWatchId") || "0");
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        localStorage.removeItem("locationWatchId");
      }
    }
    
    setIsSharing(false);
    setShowStopButton(false);
    setShowThankYou(true);
    
    // Navigate back after showing thank you message
    setTimeout(() => {
      toast.success("Thank you for helping other commuters!");
      setShowThankYou(false);
      navigate(previousPage);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        {showThankYou ? (
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <ThumbsUp className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
            <p className="text-muted-foreground mb-4">
              Your contribution helps make bus travel better for everyone.
            </p>
            <p className="text-sm text-muted-foreground animate-pulse">
              Redirecting you back...
            </p>
          </div>
        ) : !isSharing ? (
          <ShareLocation onShareComplete={handleShareComplete} />
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-pulse-soft">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">You're sharing your location</h1>
            <p className="text-muted-foreground mb-2">
              Bus Number: <span className="font-bold">{sharingBusNumber}</span>
            </p>
            <p className="text-muted-foreground mb-8">
              Thank you for helping other commuters! Your location is being shared in real-time.
            </p>
            
            <div className="mb-6">
              <Map 
                className="h-[300px] w-full rounded-lg overflow-hidden" 
                useGoogleMaps={true} 
                location="visakhapatnam" 
              />
            </div>
            
            <Button 
              variant="destructive"
              onClick={handleStopSharing}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              <span>Stop Sharing</span>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
