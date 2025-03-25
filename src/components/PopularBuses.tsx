
import { Bus } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface BusInfo {
  number: string;
  route: string;
}

interface PopularBusesProps {
  buses: BusInfo[];
  onBusSelect: (busNumber: string) => void;
}

export function PopularBuses({ buses, onBusSelect }: PopularBusesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Popular Buses in Visakhapatnam</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {buses.map((bus) => (
          <Card 
            key={bus.number}
            className="bus-buddy-transition hover:shadow-md cursor-pointer"
            onClick={() => {
              onBusSelect(bus.number);
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
  );
}
