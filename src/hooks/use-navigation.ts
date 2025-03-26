
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export function useNavigation() {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleForwardNavigation = () => {
    navigate(1);
  };

  const handleLogout = () => {
    // Clear all login information from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userGender");
    localStorage.removeItem("sharingUsers");
    localStorage.removeItem("userType");
    localStorage.removeItem("isOnDuty");
    localStorage.removeItem("isSharing");
    localStorage.removeItem("sharingBusNumber");
    localStorage.removeItem("locationWatchId");
    
    // Clear location watch if it exists
    if (navigator.geolocation) {
      const watchId = parseInt(localStorage.getItem("locationWatchId") || "0");
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    }
    
    // Show toast notification
    toast.success("Logged out successfully");
    
    // Navigate to index page
    navigate("/");
  };

  return {
    handleBackNavigation,
    handleForwardNavigation,
    handleLogout
  };
}
