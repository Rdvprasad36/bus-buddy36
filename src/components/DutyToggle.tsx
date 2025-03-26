
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Power } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DutyToggleProps {
  onDutyChange: (isOnDuty: boolean) => void;
  className?: string;
}

export function DutyToggle({ onDutyChange, className }: DutyToggleProps) {
  const [isOnDuty, setIsOnDuty] = useState(false);
  
  useEffect(() => {
    // Get initial duty status from localStorage
    const dutyStatus = localStorage.getItem("isOnDuty") === "true";
    setIsOnDuty(dutyStatus);
  }, []);
  
  const handleToggleDuty = (checked: boolean) => {
    setIsOnDuty(checked);
    localStorage.setItem("isOnDuty", checked.toString());
    
    // Show toast notification
    if (checked) {
      toast.success("You are now on duty");
    } else {
      toast.info("You are now off duty");
    }
    
    // Call the callback
    onDutyChange(checked);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch
        id="duty-mode"
        checked={isOnDuty}
        onCheckedChange={handleToggleDuty}
      />
      <Label htmlFor="duty-mode" className="flex items-center cursor-pointer">
        <Power className={`h-4 w-4 mr-2 ${isOnDuty ? 'text-green-500' : 'text-gray-400'}`} />
        <span>{isOnDuty ? 'On Duty' : 'Off Duty'}</span>
      </Label>
    </div>
  );
}
