
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Map } from "@/components/Map";
import { BusMarker } from "@/components/BusMarker";
import { BusList } from "@/components/BusList";
import { BusDetails } from "@/components/BusDetails";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Share2, Map as MapIcon, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusStops } from "@/components/BusStops";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showStops, setShowStops] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);
    
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock bus data
  const buses = [
    { id: "1", number: "1C", position: [20, 20], capacity: "medium" as const },
    { id: "2", number: "28C", position: [40, 30], capacity: "full" as const },
    { id: "3", number: "999", position: [60, 60], capacity: "empty" as const },
    { id: "4", number: "400", position: [30, 70], capacity: "medium" as const },
  ];

  const selectedBusData = buses.find(bus => bus.id === selectedBus);

  const handleBusClick = (busId: string) => {
    setSelectedBus(busId === selectedBus ? null : busId);
    setShowStops(false);
  };

  const handleShareLocation = () => {
    // Store current page before navigating
    localStorage.setItem("previousPage", "/home");
    navigate("/share");
  };

  const handleShowStops = () => {
    setShowStops(true);
  };

  const handleBackToSearch = () => {
    setShowStops(false);
    navigate("/get");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-20 pb-6 px-4">
        {showStops && selectedBusData ? (
          <div className="max-w-2xl mx-auto">
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
            
            <BusStops 
              busNumber={selectedBusData.number} 
              onBackToMap={() => setShowStops(false)} 
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Main content - Map and bus details */}
            <div className="lg:col-span-3 space-y-4">
              <div className="relative">
                <Map className="aspect-[4/3] md:aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg">
                  {isMapLoaded && buses.map(bus => (
                    <div 
                      key={bus.id}
                      style={{
                        position: "absolute",
                        left: `${bus.position[0]}%`,
                        top: `${bus.position[1]}%`,
                        transform: "translate(-50%, -50%)"
                      }}
                    >
                      <BusMarker 
                        busNumber={bus.number}
                        capacity={bus.capacity}
                        onClick={() => handleBusClick(bus.id)}
                        isSelected={bus.id === selectedBus}
                      />
                    </div>
                  ))}
                </Map>
                
                {selectedBusData && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-5/6 max-w-md">
                    <BusDetails 
                      busNumber={selectedBusData.number}
                      route="Pendurthi - RTC Complex"
                      capacity={selectedBusData.capacity}
                      currentLocation="Siripuram Junction"
                      nextStop="Jagadamba Center"
                      arrivalTime="5 minutes"
                      onShareLocation={handleShareLocation}
                      onShowStops={handleShowStops}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate("/get")}
                  className="flex-1 h-14 text-base"
                >
                  <MapIcon className="mr-2 h-5 w-5" />
                  <span>Get Bus</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleShareLocation}
                  className="flex-1 h-14 text-base"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  <span>Share Location</span>
                </Button>
              </div>
            </div>
            
            {/* Sidebar - Bus search and list */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="buses">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="buses">All Buses</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                </TabsList>
                
                <TabsContent value="buses" className="space-y-4">
                  <BusList />
                </TabsContent>
                
                <TabsContent value="nearby" className="space-y-4">
                  <div className="text-center py-12">
                    <Badge className="mb-2">Coming Soon</Badge>
                    <h3 className="text-lg font-semibold mb-2">Nearby Buses</h3>
                    <p className="text-muted-foreground">
                      We're working on showing buses near your current location
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
