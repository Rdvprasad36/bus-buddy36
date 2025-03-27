
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity as ActivityIcon, Bus, Search, Share2, Clock, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ActivityItem {
  id: string;
  type: "search" | "share" | "view";
  busNumber: string;
  timestamp: string;
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
    if (!loggedIn) {
      toast.error("Please log in to view your activity");
      navigate("/login");
      return;
    }
    
    setIsLoggedIn(loggedIn);
    setUserName(localStorage.getItem("userName") || "");
    
    // Load user activities from localStorage
    const storedActivities = JSON.parse(localStorage.getItem("userActivities") || "[]");
    setActivities(storedActivities);
    
    // If there are no activities, add some mock data for UI demonstration
    if (storedActivities.length === 0) {
      const mockActivities: ActivityItem[] = [
        {
          id: "1",
          type: "search",
          busNumber: "28C",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          location: "Siripuram Junction"
        },
        {
          id: "2",
          type: "share",
          busNumber: "1C",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          location: "Pendurthi"
        },
        {
          id: "3",
          type: "view",
          busNumber: "999",
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          location: "Simhachalam"
        }
      ];
      setActivities(mockActivities);
      
      // Save mock activities to localStorage for demonstration
      localStorage.setItem("userActivities", JSON.stringify(mockActivities));
    }
  }, [navigate]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Group activities by date
  const groupByDate = (activities: ActivityItem[]) => {
    const groups: { [key: string]: ActivityItem[] } = {};
    
    activities.forEach(activity => {
      const date = formatDate(activity.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });
    
    return groups;
  };
  
  const groupedActivities = groupByDate(activities);
  
  // Get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "search":
        return <Search className="h-4 w-4" />;
      case "share":
        return <Share2 className="h-4 w-4" />;
      case "view":
        return <ActivityIcon className="h-4 w-4" />;
      default:
        return <ActivityIcon className="h-4 w-4" />;
    }
  };
  
  // Get activity color based on type
  const getActivityColor = (type: string) => {
    switch (type) {
      case "search":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "share":
        return "bg-green-100 text-green-700 border-green-200";
      case "view":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  
  // Get activity description based on type
  const getActivityDescription = (activity: ActivityItem) => {
    switch (activity.type) {
      case "search":
        return `Searched for bus ${activity.busNumber}`;
      case "share":
        return `Shared location for bus ${activity.busNumber}`;
      case "view":
        return `Viewed bus ${activity.busNumber} location`;
      default:
        return `Activity with bus ${activity.busNumber}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Activity</h1>
          
          {Object.keys(groupedActivities).length > 0 ? (
            Object.entries(groupedActivities).map(([date, dateActivities]) => (
              <div key={date} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-medium">{date}</h2>
                </div>
                
                <Card>
                  <CardContent className="py-4">
                    {dateActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start gap-3 py-3 border-b last:border-0"
                      >
                        <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{getActivityDescription(activity)}</div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatTime(activity.timestamp)}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1">
                            <Bus className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {activity.location ? `Near ${activity.location}` : "Location not available"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">No Activity Yet</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Your bus search and sharing activity will appear here
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
