
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Bus, Search } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GetBus() {
  const navigate = useNavigate();
  const [busNumber, setBusNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  
  const popularBuses = [
    { number: "1C", route: "Pendurthi - RTC Complex" },
    { number: "28C", route: "Gajuwaka - Railway Station" },
    { number: "999", route: "Simhachalam - Beach Road" },
    { number: "400", route: "Madhurawada - Steel Plant" },
    { number: "37G", route: "Gopalapatnam - Rushikonda" },
    { number: "900", route: "Dwaraka Nagar - NAD Junction" },
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
      
      // Check if bus exists in popular buses
      const foundBus = popularBuses.find(bus => 
        bus.number.toLowerCase() === busNumber.toLowerCase()
      );
      
      if (foundBus) {
        toast.success(`Found bus ${foundBus.number}`);
        navigate("/home");
      } else {
        toast.error(`Bus ${busNumber} not found`);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Bus</h1>
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
        </div>
      </main>
    </div>
  );
}
