
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Bus, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function AddBusForm() {
  const navigate = useNavigate();
  const [busNumber, setBusNumber] = useState("");
  const [depot, setDepot] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [currentStop, setCurrentStop] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const depots = [
    "Simhachalam Depot",
    "Gajuwaka Depot",
    "Maddilapalem Depot",
    "Visakha Steel City Depot",
    "Waltair Depot",
    "Madhurawada Depot"
  ];

  const handleAddStop = () => {
    if (currentStop.trim()) {
      setStops([...stops, currentStop.trim()]);
      setCurrentStop("");
    }
  };

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddStop();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!busNumber) {
      toast.error("Please enter a bus number");
      return;
    }
    
    if (!depot) {
      toast.error("Please select a depot");
      return;
    }
    
    if (!from || !to) {
      toast.error("Please enter from and to locations");
      return;
    }
    
    if (stops.length < 2) {
      toast.error("Please add at least two stops");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to save the bus
    setTimeout(() => {
      // Get existing buses from local storage or create empty array
      const existingBuses = JSON.parse(localStorage.getItem("busList") || "[]");
      
      // Add the new bus
      const newBus = {
        number: busNumber,
        depot,
        route: `${from} - ${to}`,
        via: stops.join(", "),
        stops
      };
      
      existingBuses.push(newBus);
      
      // Save to local storage
      localStorage.setItem("busList", JSON.stringify(existingBuses));
      
      setIsSubmitting(false);
      toast.success("Bus added successfully");
      navigate("/data");
    }, 1000);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/data")}
            className="p-0 h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Bus className="h-5 w-5 text-blue-600" />
            <span>Add New Bus</span>
          </CardTitle>
          <div className="w-8"></div>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="busNumber">Bus Number</Label>
              <Input 
                id="busNumber" 
                placeholder="e.g., 28C, 999" 
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="depot">Depot</Label>
              <Select 
                value={depot} 
                onValueChange={setDepot}
              >
                <SelectTrigger id="depot">
                  <SelectValue placeholder="Select a depot" />
                </SelectTrigger>
                <SelectContent>
                  {depots.map((depot) => (
                    <SelectItem key={depot} value={depot}>
                      {depot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input 
                id="from" 
                placeholder="Starting point" 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input 
                id="to" 
                placeholder="Destination" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Stops/Via</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Add a stop"
                value={currentStop}
                onChange={(e) => setCurrentStop(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                type="button"
                onClick={handleAddStop}
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {stops.length > 0 && (
              <div className="mt-2">
                <div className="text-sm font-medium mb-2">Stops ({stops.length}):</div>
                <div className="flex flex-wrap gap-2">
                  {stops.map((stop, index) => (
                    <div 
                      key={index} 
                      className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <span className="text-sm">{stop}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveStop(index)}
                        className="text-slate-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                <span>Adding bus...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <Bus className="h-4 w-4" />
                <span>Add Bus</span>
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
