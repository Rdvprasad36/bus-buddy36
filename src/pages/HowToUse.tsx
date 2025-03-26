
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, PlayCircle } from "lucide-react";

export default function HowToUse() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  // Video tutorial links
  const tutorialVideos = {
    passenger: "https://www.youtube.com/watch?v=example-passenger",
    driver: "https://www.youtube.com/watch?v=example-driver"
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">How to Use Bus Buddy</h1>
            <p className="text-muted-foreground">
              Learn how to make the most of our app with these helpful guides
            </p>
          </div>
          
          <Tabs defaultValue="passenger" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="passenger">For Passengers</TabsTrigger>
              <TabsTrigger value="driver">For Drivers/Conductors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="passenger">
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Guide</CardTitle>
                  <CardDescription>
                    Learn how to find and track buses in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-blue-500 mb-2" />
                    <p className="text-muted-foreground">Video Tutorial</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href={tutorialVideos.passenger} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        <span>Watch on YouTube</span>
                      </a>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Getting Started</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Create an account or log in to access all features</li>
                      <li>On the home page, tap "Get The Bus Location" to find a bus</li>
                      <li>Enter a bus number to see real-time locations shared by other users</li>
                      <li>Select a bus from the results to view its current location and stops</li>
                    </ol>
                    
                    <h3 className="text-lg font-semibold mt-6">Sharing Your Location</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Tap "Share My Live Location" to generate a shareable link</li>
                      <li>Share this link with friends or family via messaging apps</li>
                      <li>Recipients can track your location in real-time</li>
                      <li>Stop sharing at any time by returning to the app and tapping "Stop"</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="driver">
              <Card>
                <CardHeader>
                  <CardTitle>Driver/Conductor Guide</CardTitle>
                  <CardDescription>
                    Learn how to share your bus location with passengers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-blue-500 mb-2" />
                    <p className="text-muted-foreground">Video Tutorial</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href={tutorialVideos.driver} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        <span>Watch on YouTube</span>
                      </a>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Getting Started</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Log in with your RTC ID and password</li>
                      <li>Toggle "On Duty" when you begin your shift</li>
                      <li>Tap "Share Bus Location" to start sharing your location</li>
                      <li>Select your bus number from the list or add a new bus if needed</li>
                      <li>Allow location access when prompted</li>
                    </ol>
                    
                    <h3 className="text-lg font-semibold mt-6">Managing Your Bus</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>If your bus isn't listed, tap "Add Bus" to register a new bus</li>
                      <li>Update your bus capacity as needed during your journey</li>
                      <li>Toggle "Off Duty" when you complete your shift</li>
                      <li>You can view all bus data in the system for reference</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need more help?</h3>
            <p className="text-muted-foreground mb-4">
              Contact our support team or visit our website for additional resources
            </p>
            <Button asChild variant="outline">
              <a href="mailto:support@busbuddy.com">Contact Support</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
