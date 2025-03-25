
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { Map } from "@/components/Map";
import { SharingUsersList } from "@/components/SharingUsersList";

interface BusSearchResultProps {
  busNumber: string;
  sharingUsers: any[];
  onBack: () => void;
  onViewStops: () => void;
  onUserSelect: (userId: number) => void;
}

export function BusSearchResult({ 
  busNumber, 
  sharingUsers, 
  onBack, 
  onViewStops, 
  onUserSelect 
}: BusSearchResultProps) {
  return (
    <div>
      <div className="mb-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          <span>Back to Search</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Bus {busNumber}</h2>
          <p className="text-muted-foreground">
            {sharingUsers.length} users currently sharing location
          </p>
        </div>
        
        <Map 
          className="h-[300px] w-full rounded-lg overflow-hidden mb-4" 
          useGoogleMaps={true} 
          location={`bus ${busNumber} visakhapatnam`}
          busNumber={busNumber}
          showBusStops={true}
        />
        
        <div className="mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewStops}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            <span>View All Bus Stops</span>
          </Button>
        </div>
        
        <h3 className="text-lg font-medium mb-2">People Sharing This Bus</h3>
        
        <SharingUsersList 
          users={sharingUsers} 
          onUserSelect={onUserSelect} 
        />
      </div>
    </div>
  );
}
