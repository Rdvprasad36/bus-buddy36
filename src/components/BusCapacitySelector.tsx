
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BusCapacitySelectorProps {
  capacity: string;
  onCapacityChange: (value: string) => void;
  disabled?: boolean;
}

export function BusCapacitySelector({ 
  capacity, 
  onCapacityChange, 
  disabled = false 
}: BusCapacitySelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Current Bus Capacity</Label>
      <RadioGroup 
        value={capacity} 
        onValueChange={onCapacityChange}
        className="flex gap-4"
        disabled={disabled}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="empty" id="empty" />
          <Label 
            htmlFor="empty" 
            className="flex items-center gap-1 text-sm font-normal cursor-pointer"
          >
            <span className="inline-block w-3 h-3 bg-bus-empty rounded-full border border-gray-300"></span>
            Empty
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label 
            htmlFor="medium" 
            className="flex items-center gap-1 text-sm font-normal cursor-pointer"
          >
            <span className="inline-block w-3 h-3 bg-bus-medium rounded-full border border-amber-300"></span>
            Medium
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="full" id="full" />
          <Label 
            htmlFor="full" 
            className="flex items-center gap-1 text-sm font-normal cursor-pointer"
          >
            <span className="inline-block w-3 h-3 bg-bus-full rounded-full border border-red-500"></span>
            Full
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
