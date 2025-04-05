
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export function VisakhapatnamBusData() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("buses");
  const isMobile = useIsMobile();
  
  // Common routes in Visakhapatnam
  const routes = [
    "Pendurthi - RTC Complex",
    "Gajuwaka - Railway Station",
    "Simhachalam - Beach Road",
    "Madhurawada - Steel Plant",
    "Gopalapatnam - Rushikonda"
  ];

  // All available buses
  const allBuses = ["1C", "28C", "999", "400", "37G", "900"];
  
  // Show fewer buses on mobile
  const displayBuses = isMobile ? allBuses.slice(0, 4) : allBuses;

  const handleViewCompleteData = () => {
    // Navigate to data page with the selected tab as a query parameter
    navigate(`/data?tab=${selectedTab}`);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Visakhapatnam Bus Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="buses">All Buses</TabsTrigger>
            <TabsTrigger value="routes">By Route</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buses" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {displayBuses.map((busNumber) => (
                <div 
                  key={busNumber} 
                  className="bg-white dark:bg-gray-800 border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all"
                  onClick={() => navigate(`/get?bus=${busNumber}`)}
                >
                  <h3 className="font-medium">{busNumber}</h3>
                  <p className="text-sm text-muted-foreground">
                    View bus details
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="routes" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {routes.map((route) => (
                <div 
                  key={route} 
                  className="bg-white dark:bg-gray-800 border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all"
                  onClick={() => navigate(`/data?tab=routes&route=${encodeURIComponent(route)}`)}
                >
                  <h3 className="font-medium">{route}</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple buses available
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
            
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewCompleteData}
            className="text-blue-600"
          >
            View Complete Bus Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
