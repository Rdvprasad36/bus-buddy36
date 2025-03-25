
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowLeft, ArrowRight, Bus, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Map } from "@/components/Map";

interface ViewBusStopsProps {
  busNumber: string;
  onBack: () => void;
}

export function ViewBusStops({ busNumber, onBack }: ViewBusStopsProps) {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  
  // This would come from a database in a real app
  const busStops = {
    "1C": [
      { name: "Pendurthi Bus Station", time: "6:00 AM", distance: "0 km", passed: true },
      { name: "Vepagunta", time: "6:10 AM", distance: "3.2 km", passed: true },
      { name: "Gopalapatnam", time: "6:25 AM", distance: "7.5 km", passed: true },
      { name: "NAD Junction", time: "6:35 AM", distance: "10.1 km", passed: false, next: true },
      { name: "Kancharapalem", time: "6:50 AM", distance: "13.4 km", passed: false },
      { name: "Dwaraka Bus Station", time: "7:05 AM", distance: "16.8 km", passed: false },
      { name: "Jagadamba Junction", time: "7:15 AM", distance: "18.2 km", passed: false },
      { name: "RTC Complex", time: "7:30 AM", distance: "21.5 km", passed: false },
    ],
    "28C": [
      { name: "Gajuwaka Bus Station", time: "6:30 AM", distance: "0 km", passed: true },
      { name: "Scindia", time: "6:40 AM", distance: "2.8 km", passed: true },
      { name: "BHPV", time: "6:50 AM", distance: "5.1 km", passed: false, next: true },
      { name: "NAD Junction", time: "7:05 AM", distance: "8.7 km", passed: false },
      { name: "Kancharapalem", time: "7:20 AM", distance: "12.0 km", passed: false },
      { name: "Dwaraka Bus Station", time: "7:35 AM", distance: "15.4 km", passed: false },
      { name: "Jagadamba Junction", time: "7:45 AM", distance: "16.8 km", passed: false },
      { name: "Railway Station", time: "8:00 AM", distance: "19.3 km", passed: false },
    ],
    "999": [
      { name: "Simhachalam", time: "7:00 AM", distance: "0 km", passed: true },
      { name: "Adavivaram", time: "7:15 AM", distance: "3.5 km", passed: false, next: true },
      { name: "Asilmetta", time: "7:30 AM", distance: "7.8 km", passed: false },
      { name: "Jagadamba Junction", time: "7:40 AM", distance: "9.2 km", passed: false },
      { name: "RTC Complex", time: "7:55 AM", distance: "12.5 km", passed: false },
      { name: "MVP Colony", time: "8:10 AM", distance: "16.1 km", passed: false },
      { name: "Beach Road", time: "8:25 AM", distance: "19.4 km", passed: false },
    ],
    "400": [
      { name: "Madhurawada", time: "6:15 AM", distance: "0 km", passed: true },
      { name: "Rushikonda", time: "6:30 AM", distance: "4.2 km", passed: true },
      { name: "MVP Colony", time: "6:45 AM", distance: "8.9 km", passed: false, next: true },
      { name: "Jagadamba Junction", time: "7:00 AM", distance: "12.3 km", passed: false },
      { name: "RTC Complex", time: "7:15 AM", distance: "15.6 km", passed: false },
      { name: "Steel Plant", time: "7:45 AM", distance: "25.8 km", passed: false },
    ],
    "37G": [
      { name: "Gopalapatnam", time: "6:45 AM", distance: "0 km", passed: true },
      { name: "NAD Junction", time: "7:00 AM", distance: "4.3 km", passed: true },
      { name: "Kancharapalem", time: "7:15 AM", distance: "7.6 km", passed: false, next: true },
      { name: "Dwaraka Bus Station", time: "7:30 AM", distance: "11.0 km", passed: false },
      { name: "Jagadamba Junction", time: "7:40 AM", distance: "12.4 km", passed: false },
      { name: "RTC Complex", time: "7:55 AM", distance: "15.7 km", passed: false },
      { name: "Rushikonda", time: "8:25 AM", distance: "24.6 km", passed: false },
    ]
  };
  
  // Default stops if the bus number is not found
  const defaultStops = [
    { name: "Terminal", time: "Start", distance: "0 km", passed: true },
    { name: "Stop 1", time: "~10 min", distance: "~3 km", passed: true },
    { name: "Stop 2", time: "~20 min", distance: "~7 km", passed: false, next: true },
    { name: "Stop 3", time: "~30 min", distance: "~12 km", passed: false },
    { name: "Final Stop", time: "End", distance: "~15 km", passed: false },
  ];
  
  const stops = busStops[busNumber] || defaultStops;
  
  const handleNextStop = () => {
    if (currentStopIndex < stops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
    }
  };
  
  const handlePreviousStop = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex(currentStopIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Bus</span>
        </Button>
        
        <Badge variant="outline" className="text-base px-4 py-1">
          Bus {busNumber}
        </Badge>
      </div>
      
      <Map 
        className="h-[200px] w-full rounded-lg overflow-hidden mb-4" 
        useGoogleMaps={true} 
        busNumber={busNumber}
        showBusStops={true}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Bus Stops Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Stop timeline */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />
            
            {/* Current stop indicator */}
            <div className="relative z-10">
              {stops.map((stop, index) => (
                <div 
                  key={index} 
                  className={`flex items-start mb-6 ${index === currentStopIndex ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center 
                    ${stop.passed ? 'bg-gray-100 text-gray-500' : 
                     stop.next ? 'bg-blue-100 text-blue-600 animate-pulse' : 
                     'bg-green-100 text-green-500'}`}
                  >
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-semibold
                      ${stop.passed ? 'text-gray-500' : 
                       stop.next ? 'text-blue-600' : 
                       'text-green-600'}`}
                    >
                      {stop.name}
                    </h3>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>Time: {stop.time}</span>
                      <span>Distance: {stop.distance}</span>
                    </div>
                    <div className="mt-2">
                      {stop.passed && (
                        <Badge variant="outline" className="bg-gray-100">
                          Passed
                        </Badge>
                      )}
                      {stop.next && (
                        <Badge className="bg-blue-500">
                          Next Stop
                        </Badge>
                      )}
                      {!stop.passed && !stop.next && (
                        <Badge variant="outline" className="bg-green-50">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between pt-4">
        <Button 
          onClick={handlePreviousStop} 
          disabled={currentStopIndex === 0}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Previous Stop
        </Button>
        <Button 
          onClick={handleNextStop} 
          disabled={currentStopIndex === stops.length - 1}
          variant="outline"
        >
          Next Stop <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
