
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleAuthForm } from "@/components/SimpleAuthForm";
import { toast } from "@/hooks/use-toast";

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
    
    // Check if passwords match for signup
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Simulate successful registration
    toast.success("Account created successfully");
    
    // Store user type in localStorage
    localStorage.setItem("userType", data.userType);
    
    // Navigate to login page after successful signup
    navigate("/login");
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 p-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <SimpleAuthForm mode="signup" onSubmit={handleSignup} />
    </div>
  );
}
