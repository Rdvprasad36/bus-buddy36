
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Share2, MapPin, Clock, LocateFixed } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ActivityItem {
  id: string;
  type: "search" | "share" | "view";
  busNumber: string;
  timestamp: number;
  location?: string;
}

export default function Activity() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);
    
    // If not logged in, redirect to login
    if (!loggedIn) {
      toast.error("Please log in to view your activity");
      navigate("/login");
      return;
    }
    
    // Get activities from localStorage
    const storedActivities = JSON.parse(localStorage.getItem("userActivities") || "[]");
    
    // If no activities, create some mock data
    if (storedActivities.length === 0) {
      const mockActivities: ActivityItem[] = [
        {
          id: "1",
          type: "search",
          busNumber: "28C",
          timestamp: Date.now() - 3600000, // 1 hour ago
        },
        {
          id: "2",
          type: "view",
          busNumber: "28C",
          timestamp: Date.now() - 3000000, // 50 minutes ago
          location: "Siripuram Junction"
        },
        {
          id: "3",
          type: "search",
          busNumber: "999",
          timestamp: Date.now() - 86400000, // 1 day ago
        },
        {
          id: "4",
          type: "share",
          busNumber: "400",
          timestamp: Date.now() - 172800000, // 2 days ago
          location: "RTC Complex"
        },
      ];
      
      setActivities(mockActivities);
      // Save mock activities to localStorage for future use
      localStorage.setItem("userActivities", JSON.stringify(mockActivities));
    } else {
      setActivities(storedActivities);
    }
  }, [navigate]);
  
  // Function to format timestamp to readable date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  
  // Function to get relative time (e.g., "2 hours ago")
  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Activity History</h1>
          <p className="text-muted-foreground mb-6">
            Your recent bus tracking and sharing activities
          </p>
          
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.sort((a, b) => b.timestamp - a.timestamp).map((activity) => (
                <Card key={activity.id} className="overflow-hidden">
                  <div className={`h-2 ${
                    activity.type === 'search' ? 'bg-blue-500' : 
                    activity.type === 'view' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {activity.type === 'search' ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Bus className="h-3 w-3 mr-1" />
                            Search
                          </Badge>
                        ) : activity.type === 'view' ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <LocateFixed className="h-3 w-3 mr-1" />
                            View
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Badge>
                        )}
                        <p className="font-medium">Bus {activity.busNumber}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span title={formatDate(activity.timestamp)}>{getRelativeTime(activity.timestamp)}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm">
                      {activity.type === 'search' 
                        ? `You searched for Bus ${activity.busNumber}`
                        : activity.type === 'view'
                        ? `You viewed Bus ${activity.busNumber}'s location`
                        : `You shared Bus ${activity.busNumber}'s location`
                      }
                    </p>
                    
                    {activity.location && (
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{activity.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">No activity history found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
