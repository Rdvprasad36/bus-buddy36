
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageCircle, Clock, Route, Bus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

type BoochiMessage = {
  sender: "user" | "boochi";
  content: string;
  timestamp: Date;
};

type BoochiAIAgentProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export function BoochiAIAgent({ isOpen, onClose, className }: BoochiAIAgentProps) {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [messages, setMessages] = useState<BoochiMessage[]>([
    {
      sender: "boochi",
      content: "Hello! I'm Boochi, your bus buddy AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  
  const boochiResponses = {
    "bus": "I can help you find bus information. Which bus number are you looking for?",
    "route": "I can help you find route information. Where are you trying to go?",
    "schedule": "Bus schedules are updated in real-time. I can help you find the next bus arrival time.",
    "time": "I can predict arrival times based on current traffic conditions. Which bus are you waiting for?",
    "traffic": "Let me check the current traffic conditions for your route.",
    "stop": "I can help you find the nearest bus stop. What's your current location?",
    "hello": "Hello there! How can I assist you with your commute today?",
    "hi": "Hi! I'm Boochi, your bus buddy AI. How can I help you?",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: BoochiMessage = {
      sender: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Generate Boochi's response
    setTimeout(() => {
      let response = "I'm still learning about that. Could you ask about buses, routes, schedules, or traffic instead?";
      
      // Simple pattern matching for demo purposes
      const lowerInput = input.toLowerCase();
      for (const [key, value] of Object.entries(boochiResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }
      
      // Check for bus numbers (format: one or more digits, optionally followed by a letter)
      const busNumberMatch = lowerInput.match(/\b(\d+[a-z]?)\b/i);
      if (busNumberMatch) {
        response = `Bus ${busNumberMatch[0]} information: This bus runs every 15 minutes during peak hours. The next arrival is expected in about 7 minutes. Current traffic conditions are normal.`;
      }
      
      const boochiMessage: BoochiMessage = {
        sender: "boochi",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, boochiMessage]);
      
      // Show toast for AI prediction
      if (lowerInput.includes("predict") || lowerInput.includes("when") || lowerInput.includes("arrival")) {
        toast.info("Boochi is analyzing traffic patterns to predict arrival times", {
          description: "Using real-time traffic data and historical patterns",
        });
      }
    }, 700);
    
    setInput("");
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={`fixed bottom-20 right-4 w-[350px] sm:w-[400px] z-50 ${className}`}>
      <Card className="shadow-lg border-2 border-blue-200">
        <CardHeader className="bg-blue-50 dark:bg-blue-950 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-blue-300">
                <AvatarImage src="/lovable-uploads/c9c1e147-3efb-42c9-94c9-6b5fe15da20d.png" alt="Boochi" />
                <AvatarFallback className="bg-blue-100 text-blue-700">B</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-bold">
                Boochi <Badge variant="outline" className="ml-1 text-xs">AI</Badge>
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full rounded-none">
              <TabsTrigger value="chat" className="text-xs">
                <MessageCircle className="h-4 w-4 mr-1" /> Chat
              </TabsTrigger>
              <TabsTrigger value="predictions" className="text-xs">
                <Clock className="h-4 w-4 mr-1" /> Predictions
              </TabsTrigger>
              <TabsTrigger value="routes" className="text-xs">
                <Route className="h-4 w-4 mr-1" /> Routes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="m-0">
              <div className="px-3 py-2 h-[300px] overflow-y-auto flex flex-col gap-3">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="p-2 border-t flex">
                <Input
                  type="text"
                  placeholder="Ask me about buses, routes, or schedules..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" className="ml-2">
                  Send
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="predictions" className="m-0">
              <div className="p-4 space-y-4">
                <div className="text-center py-2">
                  <Brain className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <h3 className="font-medium">AI Arrival Predictions</h3>
                  <p className="text-sm text-muted-foreground">
                    Boochi uses traffic patterns to predict arrival times
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bus className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Bus 28C</span>
                      </div>
                      <Badge>High Confidence</Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">Predicted arrival: <span className="font-medium">7 mins</span></p>
                      <p className="text-xs text-muted-foreground">Traffic conditions: Normal</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bus className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Bus 400</span>
                      </div>
                      <Badge variant="outline">Medium Confidence</Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">Predicted arrival: <span className="font-medium">15 mins</span></p>
                      <p className="text-xs text-muted-foreground">Traffic conditions: Moderate delays</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="routes" className="m-0">
              <div className="p-4 space-y-4">
                <div className="text-center py-2">
                  <Route className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <h3 className="font-medium">Recommended Routes</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimal routes based on current traffic
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">MVP Colony to RTC Complex</span>
                      <Badge className="bg-green-500">Fastest</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Take Bus 999 → Change at Jagadamba</p>
                      <p className="text-xs text-muted-foreground mt-1">Est. travel time: 25 mins</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Gajuwaka to Beach Road</span>
                      <Badge variant="outline">Alternative</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Take Bus 28C → Direct route</p>
                      <p className="text-xs text-muted-foreground mt-1">Est. travel time: 40 mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
