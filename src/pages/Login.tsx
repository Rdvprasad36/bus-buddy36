
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleAuthForm } from "@/components/SimpleAuthForm";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay for the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (data: any) => {
    // In a real app, we would call an API to authenticate
    console.log("Login data:", data);
    
    // Store user type in localStorage
    localStorage.setItem("userType", data.userType);
    
    // Simulate successful login
    toast.success("Login successful");
    
    // In a real app, we would store the user session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", data.username || data.rtcId || "User");
    localStorage.setItem("userGender", data.gender || "not-specified");
    
    // Navigate to location permission page
    navigate("/location-permission");
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 p-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <SimpleAuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
}
