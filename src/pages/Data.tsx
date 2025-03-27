
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Search, Bus, Plus, MapPin, Filter } from "lucide-react";
import { DepotBusList } from "@/components/DepotBusList";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Data() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepot, setSelectedDepot] = useState("all");
  const [viewMode, setViewMode] = useState<"byRoute" | "allBuses">("byRoute");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  // Visakhapatnam bus depots
  const depots = [
    "Simhachalam Depot",
    "Gajuwaka Depot",
    "Maddilapalem Depot",
    "Visakha Steel City Depot",
    "Waltair Depot",
    "Madhurawada Depot"
  ];

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
          
          {/* Modified to show All Buses and By Route side by side */}
          <div className="mb-6">
            <Tabs defaultValue="byRoute">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="byRoute">By Route</TabsTrigger>
                <TabsTrigger value="allBuses">All Buses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="byRoute">
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
              
              <TabsContent value="allBuses">
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
            </Tabs>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Select a Depot</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {depots.map((depot) => (
                <div 
                  key={depot} 
                  className={`bg-white dark:bg-gray-800 border rounded-lg p-6 hover:border-blue-500 cursor-pointer transition-all ${selectedDepot === depot ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
                  onClick={() => setSelectedDepot(depot)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Bus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium">{depot}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to view all routes operating from this depot
                  </p>
                </div>
              ))}
            </div>
            
            {selectedDepot !== "all" && (
              <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">{selectedDepot}</h2>
                <DepotBusList searchQuery={searchQuery} selectedDepot={selectedDepot} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
