
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bus, Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface BusSearchProps {
  onSearch: (busNumber: string) => void;
  isSearching: boolean;
  showAddBusOption?: boolean;
}

export function BusSearch({ 
  onSearch, 
  isSearching, 
  showAddBusOption = true
}: BusSearchProps) {
  const [busNumber, setBusNumber] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busNumber.trim()) {
      onSearch(busNumber.trim());
    }
  };
  
  const handleAddBus = () => {
    // Navigate to add bus page
    navigate("/add-bus");
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter bus number..."
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSearching || !busNumber.trim()}
          >
            {isSearching ? "Searching..." : "Find Bus"}
          </Button>
        </form>
      </CardContent>
      
      {showAddBusOption && (
        <CardFooter className="flex flex-col items-center text-center pb-6 pt-2">
          <p className="text-sm text-muted-foreground mb-2">
            Can't find your bus?
          </p>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddBus}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <Bus className="h-4 w-4" />
            <span>Add New Bus</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
