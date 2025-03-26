
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { ShareMyLiveLocation } from "@/components/ShareMyLiveLocation";

export default function ShareLiveLocation() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);
    
    // If not logged in, redirect to login
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <ShareMyLiveLocation onBack={handleBack} />
      </main>
    </div>
  );
}
