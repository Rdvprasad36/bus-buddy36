
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VisakhapatnamBusData() {
  const navigate = useNavigate();
  const [selectedDepot, setSelectedDepot] = useState("all");
  
  // Visakhapatnam bus depots for simplified display
  const depots = [
    "Simhachalam Depot",
    "Gajuwaka Depot",
    "Maddilapalem Depot"
  ];
  
  // Common routes in Visakhapatnam
  const routes = [
    "Pendurthi - RTC Complex",
    "Gajuwaka - Railway Station",
    "Simhachalam - Beach Road",
    "Madhurawada - Steel Plant",
    "Gopalapatnam - Rushikonda"
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Visakhapatnam Bus Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buses" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="buses">All Buses</TabsTrigger>
            <TabsTrigger value="routes">By Route</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buses" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {depots.map((depot) => (
                <div 
                  key={depot} 
                  className={`bg-white dark:bg-gray-800 border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all ${selectedDepot === depot ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
                  onClick={() => setSelectedDepot(depot)}
                >
                  <h3 className="font-medium">{depot}</h3>
                  <p className="text-sm text-muted-foreground">
                    View routes from this depot
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
            onClick={() => navigate("/data")}
            className="text-blue-600"
          >
            View Complete Bus Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
