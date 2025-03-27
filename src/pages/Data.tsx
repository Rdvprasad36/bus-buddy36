
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bus, Plus, MapPin } from "lucide-react";
import { DepotBusList } from "@/components/DepotBusList";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Data() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"byRoute" | "allBuses">("allBuses");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  
  useEffect(() => {
    // Check URL parameters to set the initial tab
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    
    if (tab === "routes") {
      setViewMode("byRoute");
      const route = params.get("route");
      if (route) {
        const [from, to] = route.split(" - ");
        if (from) setFromLocation(from);
        if (to) setToLocation(to);
      }
    } else if (tab === "buses") {
      setViewMode("allBuses");
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for route:", fromLocation, "to", toLocation);
    // In a real app, this would filter buses based on from/to
    if (!fromLocation || !toLocation) {
      toast.error("Please enter both from and to locations");
      return;
    }
    
    toast.success(`Searching for buses from ${fromLocation} to ${toLocation}`);
  };

  const handleAddBus = () => {
    navigate("/add-bus");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Visakhapatnam City Bus Routes</h1>
              <p className="text-muted-foreground">
                APSRTC operates city bus services from 5am to 11pm daily with City Ordinary, Metro Express, and Metro Luxury A/C buses.
              </p>
            </div>
            <Button 
              onClick={handleAddBus} 
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Bus</span>
            </Button>
          </div>
          
          <Tabs defaultValue={viewMode === "byRoute" ? "byRoute" : "allBuses"} className="w-full" onValueChange={(value) => setViewMode(value as "byRoute" | "allBuses")}>
            <TabsList className="grid grid-cols-2 mb-6 w-full">
              <TabsTrigger value="allBuses">All Buses</TabsTrigger>
              <TabsTrigger value="byRoute">By Route</TabsTrigger>
            </TabsList>
            
            <TabsContent value="allBuses" className="mt-0">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">All Buses</h3>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bus routes..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DepotBusList searchQuery={searchQuery} selectedDepot="all" />
              </Card>
            </TabsContent>
            
            <TabsContent value="byRoute" className="mt-0">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Search by Route</h3>
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="From (e.g., RTC Complex)"
                        className="pl-10"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="To (e.g., Beach Road)"
                        className="pl-10"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>Search Routes</span>
                    </Button>
                  </div>
                </form>
                <DepotBusList searchQuery={searchQuery} selectedDepot="all" viewMode="route" />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
