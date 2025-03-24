
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Bus, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BusStopsProps {
  busNumber: string;
  onBackToMap: () => void;
}

export function BusStops({ busNumber, onBackToMap }: BusStopsProps) {
  // Mock data for bus stops
  const busStopsByRoute: Record<string, Array<{ name: string; time: string; status: "arrived" | "next" | "upcoming" }>> = {
    "1C": [
      { name: "RTC Complex", time: "5 mins ago", status: "arrived" },
      { name: "Jagadamba Junction", time: "2 mins ago", status: "arrived" },
      { name: "Siripuram", time: "Just now", status: "arrived" },
      { name: "Asilmetta", time: "2 mins", status: "next" },
      { name: "Maddilapalem", time: "7 mins", status: "upcoming" },
      { name: "Gurudwara", time: "12 mins", status: "upcoming" },
      { name: "NAD Junction", time: "20 mins", status: "upcoming" },
      { name: "Gopalapatnam", time: "25 mins", status: "upcoming" },
      { name: "Pendurthi", time: "35 mins", status: "upcoming" },
    ],
    "28C": [
      { name: "RK Beach", time: "15 mins ago", status: "arrived" },
      { name: "Vuda Park", time: "10 mins ago", status: "arrived" },
      { name: "Jagadamba", time: "5 mins ago", status: "arrived" },
      { name: "RTC Complex", time: "Just now", status: "arrived" },
      { name: "Railway Station", time: "3 mins", status: "next" },
      { name: "Kancharapalem", time: "8 mins", status: "upcoming" },
      { name: "NAD", time: "15 mins", status: "upcoming" },
      { name: "Gopalapatnam", time: "20 mins", status: "upcoming" },
      { name: "Vepagunta", time: "30 mins", status: "upcoming" },
      { name: "Chintalagraharama", time: "40 mins", status: "upcoming" },
    ],
    "999": [
      { name: "RTC Complex", time: "10 mins ago", status: "arrived" },
      { name: "Maddilapalem", time: "5 mins ago", status: "arrived" },
      { name: "Endada", time: "Just now", status: "arrived" },
      { name: "Madhurawada", time: "5 mins", status: "next" },
      { name: "Anandapuram", time: "12 mins", status: "upcoming" },
      { name: "Simhachalam", time: "20 mins", status: "upcoming" },
      { name: "Bhimili", time: "30 mins", status: "upcoming" },
    ],
    "400": [
      { name: "RTC Complex", time: "8 mins ago", status: "arrived" },
      { name: "Railway Station", time: "3 mins ago", status: "arrived" },
      { name: "Scindia", time: "Just now", status: "arrived" },
      { name: "Malkapuram", time: "4 mins", status: "next" },
      { name: "Gajuwaka", time: "10 mins", status: "upcoming" },
      { name: "Kurmannapalem", time: "15 mins", status: "upcoming" },
    ],
  };

  // Get stops for the selected bus number, or show default if not found
  const stops = busStopsByRoute[busNumber] || busStopsByRoute["1C"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Bus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">Bus {busNumber}</h2>
        </div>
        <p className="text-muted-foreground">
          Current stops and estimated arrival times
        </p>
      </div>
      
      <div className="relative">
        <div className="absolute left-4 top-[60px] bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
        
        <div className="space-y-4 relative z-10">
          {stops.map((stop, index) => (
            <Card 
              key={index} 
              className={`ml-6 bus-buddy-transition ${
                stop.status === "arrived" 
                  ? "opacity-70" 
                  : stop.status === "next" 
                    ? "border-blue-500 shadow-md" 
                    : ""
              }`}
            >
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20">
                <div 
                  className={`w-3 h-3 rounded-full ${
                    stop.status === "arrived" 
                      ? "bg-gray-400 dark:bg-gray-600" 
                      : stop.status === "next" 
                        ? "animate-ping-slow w-4 h-4 bg-blue-500" 
                        : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              </div>
              
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{stop.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {stop.time}
                  </div>
                </div>
                
                {stop.status === "next" && (
                  <Badge className="bg-blue-500">Next Stop</Badge>
                )}
                {stop.status === "arrived" && (
                  <Badge variant="outline">Passed</Badge>
                )}
                {stop.status === "upcoming" && (
                  <Badge variant="secondary">Upcoming</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="pt-4 text-center">
        <Button variant="outline" onClick={onBackToMap}>
          Return to Map View
        </Button>
      </div>
    </div>
  );
}
