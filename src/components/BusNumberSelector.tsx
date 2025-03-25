
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusNumberSelectorProps {
  busNumber: string;
  onBusNumberChange: (value: string) => void;
  disabled?: boolean;
}

export function BusNumberSelector({ 
  busNumber, 
  onBusNumberChange, 
  disabled = false 
}: BusNumberSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="busNumber">Bus Number</Label>
      <Select 
        value={busNumber} 
        onValueChange={onBusNumberChange}
        disabled={disabled}
      >
        <SelectTrigger id="busNumber">
          <SelectValue placeholder="Select bus number" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1C">1C - Pendurthi - RTC Complex</SelectItem>
          <SelectItem value="28C">28C - Gajuwaka - Railway Station</SelectItem>
          <SelectItem value="999">999 - Simhachalam - Beach Road</SelectItem>
          <SelectItem value="400">400 - Madhurawada - Steel Plant</SelectItem>
          <SelectItem value="37G">37G - Gopalapatnam - Rushikonda</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
