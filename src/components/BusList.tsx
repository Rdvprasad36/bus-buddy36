
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bus } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type BusCapacity = "empty" | "medium" | "full";

interface Bus {
  id: string;
  number: string;
  route: string;
  capacity: BusCapacity;
  arrivalTime?: string;
}

interface BusListProps {
  className?: string;
}

// Mock data for buses
const mockBuses: Bus[] = [
  { id: "1", number: "1C", route: "Pendurthi - RTC Complex", capacity: "medium", arrivalTime: "5 min" },
  { id: "2", number: "28C", route: "Gajuwaka - Railway Station", capacity: "full", arrivalTime: "10 min" },
  { id: "3", number: "999", route: "Simhachalam - Beach Road", capacity: "empty", arrivalTime: "15 min" },
  { id: "4", number: "400", route: "Madhurawada - Steel Plant", capacity: "medium", arrivalTime: "20 min" },
  { id: "5", number: "37G", route: "Gopalapatnam - Rushikonda", capacity: "full", arrivalTime: "25 min" },
  { id: "6", number: "900", route: "Dwaraka Nagar - NAD Junction", capacity: "empty", arrivalTime: "30 min" },
];

export function BusList({ className }: BusListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredBuses = mockBuses.filter(bus => 
    bus.number.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bus.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getCapacityColor = (capacity: BusCapacity) => {
    switch (capacity) {
      case "empty": return "bg-bus-empty border-gray-200 text-gray-700";
      case "medium": return "bg-bus-medium border-amber-300 text-amber-800";
      case "full": return "bg-bus-full border-red-500 text-white";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bus number or route..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          {filteredBuses.length} buses in Visakhapatnam
        </h3>
        
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-16" />
              </CardFooter>
            </Card>
          ))
        ) : filteredBuses.length > 0 ? (
          filteredBuses.map(bus => (
            <Card key={bus.id} className="bus-buddy-transition hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Bus className="h-4 w-4" />
                    {bus.number}
                  </CardTitle>
                  <Badge className={cn("border", getCapacityColor(bus.capacity))}>
                    {bus.capacity}
                  </Badge>
                </div>
                <CardDescription className="text-sm">{bus.route}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm">
                  Upcoming stops: MVP Colony, Siripuram, Beach Road
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {bus.arrivalTime && `Arrives in: ${bus.arrivalTime}`}
                </div>
                <Button variant="outline" size="sm">Details</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-muted-foreground">No buses found matching "{searchQuery}"</div>
          </div>
        )}
      </div>
    </div>
  );
}
