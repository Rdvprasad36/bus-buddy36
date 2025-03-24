import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Bus, Search, MapPin, User } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map } from "@/components/Map";
import { BusStops } from "@/components/BusStops";

export default function GetBus() {
  const navigate = useNavigate();
  const [busNumber, setBusNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showStops, setShowStops] = useState(false);
  
  const popularBuses = [
    { number: "1C", route: "Pendurthi - RTC Complex" },
    { number: "28C", route: "Gajuwaka - Railway Station" },
    { number: "999", route: "Simhachalam - Beach Road" },
    { number: "400", route: "Madhurawada - Steel Plant" },
    { number: "37G", route: "Gopalapatnam - Rushikonda" },
    { number: "900", route: "Dwaraka Nagar - NAD Junction" },
  ];

  // Mock sharing users
  const sharingUsers = [
    { id: 1, busNumber: "28C", gender: "male", currentLocation: "Siripuram Junction", nextStop: "Jagadamba Center" },
    { id: 2, busNumber: "28C", gender: "female", currentLocation: "NAD Junction", nextStop: "Gopalapatnam" },
    { id: 3, busNumber: "999", gender: "male", currentLocation: "Beach Road", nextStop: "RK Beach" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!busNumber) {
      toast.error("Please enter a bus number");
      return;
    }
    
    setIsSearching(true);
    
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
    const user = sharingUsers.find(u => u.id === userId);
    if (user) {
      toast.success(`Viewing real-time location for bus ${user.busNumber}`);
      navigate("/home");
    }
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
            <div>
              <div className="mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowStops(false)}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Back to Bus Details</span>
                </Button>
              </div>
              
              <BusStops 
                busNumber={searchResult.busNumber} 
                onBackToMap={() => setShowStops(false)} 
              />
            </div>
          ) : searchResult ? (
            <div>
              <div className="mb-4">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToSearch}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Back to Search</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">Bus {searchResult.busNumber}</h2>
                  <p className="text-muted-foreground">
                    {searchResult.sharingUsers.length} users currently sharing location
                  </p>
                </div>
                
                <Map 
                  className="h-[300px] w-full rounded-lg overflow-hidden mb-4" 
                  useGoogleMaps={true} 
                  location="visakhapatnam" 
                />
                
                <div className="mb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleViewStops}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>View Bus Stops</span>
                  </Button>
                </div>
                
                <h3 className="text-lg font-medium mb-2">People Sharing This Bus</h3>
                
                <div className="grid gap-3">
                  {searchResult.sharingUsers.map((user: any) => (
                    <Card key={user.id} className="hover:border-blue-500 cursor-pointer transition-all" onClick={() => handleViewBusDetails(user.id)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${user.gender === 'male' ? 'bg-blue-100' : user.gender === 'female' ? 'bg-pink-100' : 'bg-purple-100'}`}>
                              <User className={`h-5 w-5 ${user.gender === 'male' ? 'text-blue-600' : user.gender === 'female' ? 'text-pink-600' : 'text-purple-600'}`} />
                            </div>
                            <div>
                              <div className="font-medium">{user.gender === 'male' ? 'Male' : user.gender === 'female' ? 'Female' : 'Transgender'} Commuter</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3 inline" />
                                {user.currentLocation}
                              </div>
                            </div>
                          </div>
                          <Badge>Live</Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Next Stop:</span> {user.nextStop}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Get Bus</h1>
                <p className="text-muted-foreground">
                  Enter a bus number to get real-time location and arrival information
                </p>
              </div>
              
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter bus number (e.g., 1C, 28C)"
                      className="pl-10 h-12"
                      value={busNumber}
                      onChange={(e) => setBusNumber(e.target.value)}
                      disabled={isSearching}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSearching}
                    className="min-w-[100px]"
                  >
                    {isSearching ? (
                      <span className="flex items-center gap-1">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Searching...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                      </span>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Popular Buses in Visakhapatnam</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {popularBuses.map((bus) => (
                    <Card 
                      key={bus.number}
                      className="bus-buddy-transition hover:shadow-md cursor-pointer"
                      onClick={() => {
                        setBusNumber(bus.number);
                        toast.info(`Selected bus ${bus.number}`);
                      }}
                    >
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <Bus className="h-4 w-4" />
                          {bus.number}
                        </CardTitle>
                        <CardDescription className="text-sm truncate">
                          {bus.route}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Track now</Badge>
                          <span className="text-xs text-muted-foreground">Tap to select</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
