
import { Button } from "@/components/ui/button";
import { Search, MapPin, User } from "lucide-react";
import { Map } from "@/components/Map";
import { SharingUsersList } from "@/components/SharingUsersList";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [viewType, setViewType] = useState<'route' | 'users'>('route');
  
  const selectedUserData = selectedUser 
    ? sharingUsers.find(user => user.id === selectedUser) 
    : null;
  
  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
    setViewType('users');
    onUserSelect(userId);
  };
  
  const handleBackToUsers = () => {
    setSelectedUser(null);
  };

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
        
        <Tabs defaultValue="route" className="mb-4" onValueChange={(value) => setViewType(value as 'route' | 'users')}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="route">Bus Route</TabsTrigger>
            <TabsTrigger value="users">User Locations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="route" className="mt-2">
            <Map 
              className="h-[300px] w-full rounded-lg overflow-hidden mb-4" 
              useGoogleMaps={true} 
              location={`bus ${busNumber} visakhapatnam`}
              showBusStopsOnly={true}
              busNumber={busNumber}
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
          </TabsContent>
          
          <TabsContent value="users" className="mt-2">
            {selectedUser ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleBackToUsers}
                  >
                    Back to all users
                  </Button>
                  
                  <Badge className="bg-blue-500">
                    {selectedUserData?.userName || 'User'}
                  </Badge>
                </div>
                
                <Map 
                  className="h-[300px] w-full rounded-lg overflow-hidden mb-4" 
                  useGoogleMaps={true} 
                  location={selectedUserData?.currentLocation || `bus ${busNumber} visakhapatnam`}
                  showBusStopsOnly={true}
                  busNumber={busNumber}
                />
                
                <div className="bg-muted p-3 rounded-lg">
                  <p><strong>Current Location:</strong> {selectedUserData?.currentLocation || 'Unknown'}</p>
                  <p><strong>Next Stop:</strong> {selectedUserData?.nextStop || 'Unknown'}</p>
                </div>
                
                <div className="mb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onViewStops}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>View Bus Stops</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">People Sharing This Bus</h3>
                <p className="text-sm text-muted-foreground">
                  Select a user to view their specific location
                </p>
                <SharingUsersList 
                  users={sharingUsers} 
                  onUserSelect={handleUserClick} 
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
