
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BusSearchProps {
  onSearch: (busNumber: string) => void;
  isSearching: boolean;
}

export function BusSearch({ 
  onSearch, 
  isSearching
}: BusSearchProps) {
  const [busNumber, setBusNumber] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busNumber.trim()) {
      onSearch(busNumber.trim());
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 pb-6">
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
    </Card>
  );
}
