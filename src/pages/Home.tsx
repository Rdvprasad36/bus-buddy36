
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Map } from "@/components/Map";
import { BusMarker } from "@/components/BusMarker";
import { BusList } from "@/components/BusList";
import { BusDetails } from "@/components/BusDetails";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Map as MapIcon, ArrowLeft, Navigation } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusStops } from "@/components/BusStops";
import { DutyToggle } from "@/components/DutyToggle";
import { toast } from "@/hooks/use-toast";
import { VisakhapatnamBusData } from "@/components/VisakhapatnamBusData";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState<string>("passenger");
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showStops, setShowStops] = useState(false);
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    const storedUserType = localStorage.getItem("userType") || "passenger";
    const dutyStatus = localStorage.getItem("isOnDuty") === "true";
    
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);
    setUserType(storedUserType);
    setIsOnDuty(dutyStatus);
    
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleGetBusLocation = () => {
    localStorage.setItem("previousPage", "/home");
    navigate("/get");
  };

  const handleShareBusLocation = () => {
    if (userType === "driver" && !isOnDuty) {
      toast.error("You must be on duty to share bus location");
      return;
    }
    
    localStorage.setItem("previousPage", "/home");
    navigate("/share");
  };

  const handleShareMyLocation = () => {
    toast.info("Live location sharing will be available soon");
  };

  const handleDutyChange = (onDuty: boolean) => {
    setIsOnDuty(onDuty);
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
        {/* Welcome Message */}
        {isLoggedIn && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-center">
            <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">Welcome to Bus Buddy, {userName}!</h2>
            <p className="text-blue-600 dark:text-blue-400">Find and share bus locations in real-time</p>
          </div>
        )}
        
        {/* Bus Data Section */}
        <VisakhapatnamBusData />
        
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
            <div className="lg:col-span-3 space-y-4">
              <div className="relative">
                <Map className="aspect-[4/3] md:aspect-[16/9] w-full rounded-lg overflow-hidden shadow-lg"
                     useGoogleMaps={true}
                     location="visakhapatnam">
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
                      onShareLocation={handleShareBusLocation}
                      onShowStops={handleShowStops}
                    />
                  </div>
                )}
              </div>
              
              {userType === "driver" && (
                <div className="my-4">
                  <DutyToggle onDutyChange={handleDutyChange} className="mb-2" />
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGetBusLocation}
                  className="flex-1 h-14 text-base"
                >
                  <MapIcon className="mr-2 h-5 w-5" />
                  <span>Get The Bus Location</span>
                </Button>
                
                {(userType === "driver" && isOnDuty) && (
                  <Button 
                    variant="default"
                    onClick={handleShareBusLocation}
                    className="flex-1 h-14 text-base"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    <span>Share Bus Location</span>
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={handleShareMyLocation}
                  className="flex-1 h-14 text-base"
                >
                  <Navigation className="mr-2 h-5 w-5" />
                  <span>Share My Live Location</span>
                </Button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Bus Activity</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge variant="outline">Live</Badge>
                      Available Buses
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Buses currently being shared by other users
                    </p>
                    <div className="mt-3">
                      <Badge className="mr-1">28C</Badge>
                      <Badge className="mr-1">999</Badge>
                      <Badge className="mr-1">400</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                        Nearby
                      </Badge>
                      Nearby Buses
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Buses near your current location
                    </p>
                    <div className="mt-3">
                      <Badge className="mr-1">1C</Badge>
                      <Badge className="mr-1">28C</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
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
