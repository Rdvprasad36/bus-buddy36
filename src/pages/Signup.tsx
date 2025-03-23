
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/AuthForm";
import { toast } from "@/components/ui/sonner";

export default function Signup() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay for the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (data: any) => {
    // In a real app, we would call an API to register
    console.log("Signup data:", data);
    
    // Simulate successful registration
    toast.success("Account created successfully");
    
    // In a real app, we would store the user session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", data.username || data.email.split("@")[0]);
    
    // Navigate to location permission page
    navigate("/location-permission");
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 p-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <AuthForm mode="signup" onSubmit={handleSignup} />
    </div>
  );
}
