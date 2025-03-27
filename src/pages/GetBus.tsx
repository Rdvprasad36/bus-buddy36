import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { toast } from "@/hooks/use-toast";
import { ViewBusStops } from "@/components/ViewBusStops";
import { BusSearch } from "@/components/BusSearch";
import { PopularBuses } from "@/components/PopularBuses";
import { SharingUsersList } from "@/components/SharingUsersList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bus, ArrowLeft } from "lucide-react";

export default function GetBus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearching, setIsSearching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [userType, setUserType] = useState(localStorage.getItem("userType") || "passenger");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  useEffect(() => {
    // Check localStorage for sharing users on component mount
    const savedSharingUsers = JSON.parse(localStorage.getItem("sharingUsers") || "[]");
    console.log("Sharing users from localStorage:", savedSharingUsers);
    
    // Check URL parameters for direct bus search
    const params = new URLSearchParams(location.search);
    const busNumber = params.get("bus");
    if (busNumber) {
      handleSearch(busNumber);
    }
  }, [location]);
  
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
      timestamp: user.timestamp,
      userType: user.userType || "passenger"
    }));
    
    // If we have real sharing users, use them
    if (formattedSharingUsers.length > 0) {
      return formattedSharingUsers;
    }
    
    // Otherwise, use mock data
    return [
      { id: 1, busNumber: "28C", gender: "male", currentLocation: "Siripuram Junction", nextStop: "Jagadamba Center", userName: "User1", userType: "driver" },
      { id: 2, busNumber: "28C", gender: "female", currentLocation: "NAD Junction", nextStop: "Gopalapatnam", userName: "User2", userType: "passenger" },
      { id: 3, busNumber: "999", gender: "male", currentLocation: "Beach Road", nextStop: "RK Beach", userName: "User3", userType: "conductor" },
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
        setShowResults(true);
      } else {
        // Check if bus exists in popular buses
        const foundBus = popularBuses.find(bus => 
          bus.number.toLowerCase() === busNumber.toLowerCase()
        );
        
        if (foundBus) {
          // Show bus stops directly even if no one is sharing
          setSearchResult({
            busNumber,
            sharingUsers: []
          });
          setShowResults(true);
          toast.info(`Found bus ${foundBus.number}, but no one is currently sharing their location`);
        } else {
          toast.error(`Bus ${busNumber} not found`);
        }
      }
    }, 1500);
  };

  const handleUserSelect = (userId: number) => {
    const sharingUsers = getSharingUsers();
    const user = sharingUsers.find(u => u.id === userId);
    
    if (user) {
      setSelectedUser(user);
    }
  };

  const handleBusSelect = (busNumber: string) => {
    handleSearch(busNumber);
  };

  const handleBackToSearch = () => {
    setSearchResult(null);
    setShowResults(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        {!showResults ? (
          <div className="max-w-xl mx-auto">
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
          </div>
        ) : selectedUser ? (
          <div className="max-w-xl mx-auto">
            <div className="mb-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedUser(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Bus Search Results</span>
              </Button>
            </div>
            
            <Card className="mb-4">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bus className="h-5 w-5" />
                  Bus {selectedUser.busNumber}
                </CardTitle>
                <Badge variant="outline">{selectedUser.userType}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-sm mb-1">
                  <span className="text-muted-foreground">Shared by:</span> {selectedUser.userName}
                </div>
                <div className="text-sm mb-1">
                  <span className="text-muted-foreground">Current location:</span> {selectedUser.currentLocation}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Next stop:</span> {selectedUser.nextStop}
                </div>
              </CardContent>
            </Card>
            
            <ViewBusStops 
              busNumber={selectedUser.busNumber} 
              onBack={() => setSelectedUser(null)} 
            />
          </div>
        ) : searchResult && (
          <div className="max-w-xl mx-auto">
            <div className="mb-4">
              <Button 
                variant="ghost" 
                onClick={handleBackToSearch}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Bus Search</span>
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Bus className="h-6 w-6" />
              Bus {searchResult.busNumber} Information
            </h2>
            
            {searchResult.sharingUsers.length > 0 ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Currently Sharing ({searchResult.sharingUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <SharingUsersList 
                    users={searchResult.sharingUsers} 
                    onUserSelect={handleUserSelect}
                  />
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground mb-6">
                No one is currently sharing their location for this bus.
              </p>
            )}
            
            <ViewBusStops 
              busNumber={searchResult.busNumber} 
              onBack={handleBackToSearch} 
            />
          </div>
        )}
      </main>
    </div>
  );
}
