
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin } from "lucide-react";

interface SharingUser {
  id: number;
  busNumber: string;
  gender: string;
  currentLocation: string;
  nextStop: string;
  userName: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
}

interface SharingUsersListProps {
  users: SharingUser[];
  onUserSelect: (userId: number) => void;
}

export function SharingUsersList({ users, onUserSelect }: SharingUsersListProps) {
  return (
    <div className="grid gap-3">
      {users.map((user) => (
        <Card 
          key={user.id} 
          className="hover:border-blue-500 cursor-pointer transition-all" 
          onClick={() => onUserSelect(user.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  user.gender === 'male' ? 'bg-blue-100' : 
                  user.gender === 'female' ? 'bg-pink-100' : 'bg-purple-100'
                }`}>
                  <User className={`h-5 w-5 ${
                    user.gender === 'male' ? 'text-blue-600' : 
                    user.gender === 'female' ? 'text-pink-600' : 'text-purple-600'
                  }`} />
                </div>
                <div>
                  <div className="font-medium">
                    {user.userName || (
                      user.gender === 'male' ? 'Male' : 
                      user.gender === 'female' ? 'Female' : 'Transgender'
                    )} Commuter
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 inline" />
                    {user.currentLocation}
                  </div>
                </div>
              </div>
              <Badge>Live</Badge>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">Next Stop:</span> {user.nextStop}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
