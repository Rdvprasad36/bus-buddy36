import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { toast } from "@/hooks/use-toast";
import { ViewBusStops } from "@/components/ViewBusStops";
import { BusSearch } from "@/components/BusSearch";
import { PopularBuses } from "@/components/PopularBuses";
import { BusSearchResult } from "@/components/BusSearchResult";

export default function GetBus() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showStops, setShowStops] = useState(false);
  
  useEffect(() => {
    // Check localStorage for sharing users on component mount
    const savedSharingUsers = JSON.parse(localStorage.getItem("sharingUsers") || "[]");
    console.log("Sharing users from localStorage:", savedSharingUsers);
  }, []);
  
  const popularBuses = [
    { number: "1C", route: "Pendurthi - RTC Complex" },
    { number: "28C", route: "Gajuwaka - Railway Station" },
    { number: "999", route: "Simhachalam - Beach Road" },
    { number: "400", route: "Madhurawada - Steel Plant" },
    { number: "37G", route: "Gopalapatnam - Rushikonda" },
    { number: "900", route: "Dwaraka Nagar - NAD Junction" },
  ];

  // Get real sharing users from localStorage if available, otherwise use mock data
  const getSharingUsers = () => {
    const savedSharingUsers = JSON.parse(localStorage.getItem("sharingUsers") || "[]");
    
    // Format saved sharing users to match the expected format
    const formattedSharingUsers = savedSharingUsers.map((user, index) => ({
      id: user.userId || index + 1,
      busNumber: user.busNumber,
      gender: user.gender || "male",
      currentLocation: user.currentLocation || "Unknown Location",
      nextStop: user.nextStop || "Next Stop",
      userName: user.userName || "Anonymous",
      latitude: user.latitude,
      longitude: user.longitude,
      timestamp: user.timestamp
    }));
    
    // If we have real sharing users, use them
    if (formattedSharingUsers.length > 0) {
      return formattedSharingUsers;
    }
    
    // Otherwise, use mock data
    return [
      { id: 1, busNumber: "28C", gender: "male", currentLocation: "Siripuram Junction", nextStop: "Jagadamba Center", userName: "User1" },
      { id: 2, busNumber: "28C", gender: "female", currentLocation: "NAD Junction", nextStop: "Gopalapatnam", userName: "User2" },
      { id: 3, busNumber: "999", gender: "male", currentLocation: "Beach Road", nextStop: "RK Beach", userName: "User3" },
    ];
  };

  const handleSearch = (busNumber: string) => {
    setIsSearching(true);
    
    // Get sharing users
    const sharingUsers = getSharingUsers();
    
    // Simulate search process
    setTimeout(() => {
      setIsSearching(false);
      
      // Find sharing users for this bus
      const users = sharingUsers.filter(user => 
        user.busNumber.toLowerCase() === busNumber.toLowerCase()
      );
      
      if (users.length > 0) {
        setSearchResult({
          busNumber,
          sharingUsers: users
        });
      } else {
        // Check if bus exists in popular buses
        const foundBus = popularBuses.find(bus => 
          bus.number.toLowerCase() === busNumber.toLowerCase()
        );
        
        if (foundBus) {
          toast.info(`Found bus ${foundBus.number}, but no one is currently sharing their location`);
        } else {
          toast.error(`Bus ${busNumber} not found`);
        }
      }
    }, 1500);
  };

  const handleViewBusDetails = (userId: number) => {
    const sharingUsers = getSharingUsers();
    const user = sharingUsers.find(u => u.id === userId);
    
    if (user) {
      toast.success(`Viewing real-time location for bus ${user.busNumber}`);
      // In a real app, this would show the live location on a map
      navigate("/home");
    }
  };

  const handleBusSelect = (busNumber: string) => {
    handleSearch(busNumber);
  };

  const handleBackToSearch = () => {
    setSearchResult(null);
    setShowStops(false);
  };

  const handleViewStops = () => {
    setShowStops(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-xl mx-auto">
          {showStops && searchResult ? (
            <ViewBusStops 
              busNumber={searchResult.busNumber} 
              onBack={() => setShowStops(false)} 
            />
          ) : searchResult ? (
            <BusSearchResult 
              busNumber={searchResult.busNumber}
              sharingUsers={searchResult.sharingUsers}
              onBack={handleBackToSearch}
              onViewStops={handleViewStops}
              onUserSelect={handleViewBusDetails}
            />
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Get Bus</h1>
                <p className="text-muted-foreground">
                  Enter a bus number to get real-time location and arrival information
                </p>
              </div>
              
              <BusSearch 
                onSearch={handleSearch}
                isSearching={isSearching}
              />
              
              <PopularBuses 
                buses={popularBuses}
                onBusSelect={handleBusSelect}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
