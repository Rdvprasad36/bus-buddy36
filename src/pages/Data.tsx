
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Bus } from "lucide-react";
import { DepotBusList } from "@/components/DepotBusList";

export default function Data() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepot, setSelectedDepot] = useState("all");

  // Visakhapatnam bus depots
  const depots = [
    "Simhachalam Depot",
    "Gajuwaka Depot",
    "Maddilapalem Depot",
    "Visakha Steel City Depot",
    "Waltair Depot",
    "Madhurawada Depot"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Visakhapatnam City Bus Routes</h1>
            <p className="text-muted-foreground">
              APSRTC operates city bus services from 5am to 11pm daily with City Ordinary, Metro Express, and Metro Luxury A/C buses.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bus routes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Tabs defaultValue="all" value={selectedDepot} onValueChange={setSelectedDepot} className="w-full md:w-[400px]">
                <TabsList className="grid grid-cols-3 md:grid-cols-3 h-auto">
                  <TabsTrigger value="all">All Depots</TabsTrigger>
                  <TabsTrigger value="list">Depot List</TabsTrigger>
                  <TabsTrigger value="route">By Route</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <Tabs value={selectedDepot} onValueChange={setSelectedDepot} className="mt-6">
            <TabsContent value="all" className="mt-0">
              <DepotBusList searchQuery={searchQuery} selectedDepot="all" />
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {depots.map((depot) => (
                  <div 
                    key={depot} 
                    className="bg-white dark:bg-gray-800 border rounded-lg p-6 hover:border-blue-500 cursor-pointer transition-all"
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
            </TabsContent>
            
            <TabsContent value="route" className="mt-0">
              <div className="bg-white dark:bg-gray-800 border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Search by Route Number</h3>
                <p className="mb-4 text-muted-foreground">
                  Enter a route number to find specific bus details
                </p>
                <DepotBusList searchQuery={searchQuery} selectedDepot="all" viewMode="route" />
              </div>
            </TabsContent>
            
            {depots.map((depot) => (
              <TabsContent key={depot} value={depot} className="mt-0">
                <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-4">{depot}</h2>
                  <DepotBusList searchQuery={searchQuery} selectedDepot={depot} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
