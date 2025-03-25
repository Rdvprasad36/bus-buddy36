
interface UserLocationInfo {
  userId: string;
  busNumber: string;
  latitude: number;
  longitude: number;
  capacity: string;
  userName: string;
  gender: string;
  timestamp: string;
  currentLocation: string;
  nextStop: string;
}

export const simulateFirebaseUpdate = (
  userId: string, 
  busNumber: string, 
  latitude: number, 
  longitude: number, 
  capacity: string, 
  userName: string, 
  gender: string
) => {
  console.log("Updating location in Firebase:", { userId, busNumber, latitude, longitude, capacity });
  
  const sharingUsers = JSON.parse(localStorage.getItem("sharingUsers") || "[]");
  
  const existingUserIndex = sharingUsers.findIndex((user: UserLocationInfo) => user.userId === userId);
  
  const userInfo: UserLocationInfo = {
    userId,
    busNumber,
    latitude,
    longitude,
    capacity,
    userName,
    gender,
    timestamp: new Date().toISOString(),
    currentLocation: "Current Location",
    nextStop: "Next Stop"
  };
  
  if (existingUserIndex >= 0) {
    sharingUsers[existingUserIndex] = userInfo;
  } else {
    sharingUsers.push(userInfo);
  }
  
  localStorage.setItem("sharingUsers", JSON.stringify(sharingUsers));
};

export const startLocationSharing = (
  userId: string,
  busNumber: string,
  capacity: string,
  userName: string,
  gender: string,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);
        
        simulateFirebaseUpdate(userId, busNumber, latitude, longitude, capacity, userName, gender);
        
        const watchId = navigator.geolocation.watchPosition(
          (newPosition) => {
            const { latitude, longitude } = newPosition.coords;
            simulateFirebaseUpdate(userId, busNumber, latitude, longitude, capacity, userName, gender);
          },
          (error) => {
            console.error("Error watching position:", error);
          },
          { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
        );
        
        localStorage.setItem("locationWatchId", watchId.toString());
        
        setTimeout(() => {
          localStorage.setItem("isSharing", "true");
          localStorage.setItem("sharingBusNumber", busNumber);
          
          onSuccess();
        }, 1500);
      },
      (error) => {
        console.error("Error getting location:", error);
        onError("Failed to get your location. Please check your location settings.");
      },
      { enableHighAccuracy: true }
    );
  } else {
    onError("Your browser doesn't support geolocation");
  }
};

export const stopLocationSharing = () => {
  localStorage.removeItem("isSharing");
  localStorage.removeItem("sharingBusNumber");
  
  const userId = localStorage.getItem("userId");
  if (userId) {
    const sharingUsers = JSON.parse(localStorage.getItem("sharingUsers") || "[]");
    const updatedUsers = sharingUsers.filter((user: UserLocationInfo) => user.userId !== userId);
    localStorage.setItem("sharingUsers", JSON.stringify(updatedUsers));
  }
  
  if (navigator.geolocation) {
    const watchId = parseInt(localStorage.getItem("locationWatchId") || "0");
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      localStorage.removeItem("locationWatchId");
    }
  }
};
