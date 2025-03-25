
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BusSearchProps {
  onSearch: (busNumber: string) => void;
  isSearching: boolean;
}

export function BusSearch({ onSearch, isSearching }: BusSearchProps) {
  const [busNumber, setBusNumber] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!busNumber) {
      toast.error("Please enter a bus number");
      return;
    }
    
    onSearch(busNumber);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Enter bus number (e.g., 1C, 28C)"
            className="pl-10 h-12"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            disabled={isSearching}
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          disabled={isSearching}
          className="min-w-[100px]"
        >
          {isSearching ? (
            <span className="flex items-center gap-1">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Searching...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
