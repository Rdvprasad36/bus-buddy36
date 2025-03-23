
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { ShareLocation } from "@/components/ShareLocation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Share() {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showStopButton, setShowStopButton] = useState(false);
  
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
    
    // Check if already sharing
    const alreadySharing = localStorage.getItem("isSharing") === "true";
    if (alreadySharing) {
      setIsSharing(true);
      setShowStopButton(true);
    }
  }, [navigate]);

  const handleShareComplete = () => {
    // Store sharing status
    localStorage.setItem("isSharing", "true");
    setIsSharing(true);
    setShowStopButton(true);
  };

  const handleStopSharing = () => {
    localStorage.removeItem("isSharing");
    setIsSharing(false);
    setShowStopButton(false);
    toast.success("Location sharing stopped");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        {!isSharing ? (
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
            <p className="text-muted-foreground mb-8">
              Thank you for helping other commuters! Your location is being shared in real-time.
            </p>
            
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
