
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { User, Bus } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserType = "passenger" | "driver";

interface UserTypeSelectorProps {
  selectedType: UserType;
  onTypeChange: (type: UserType) => void;
  disabled?: boolean;
}

export function UserTypeSelector({ 
  selectedType, 
  onTypeChange, 
  disabled = false 
}: UserTypeSelectorProps) {
  
  const handleSelectType = (type: UserType) => {
    if (!disabled) {
      onTypeChange(type);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Select User Type</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className={cn(
            "relative cursor-pointer transition-all overflow-hidden hover:border-primary/50",
            selectedType === "driver" ? "border-2 border-primary" : "border border-border",
            disabled && "opacity-60 cursor-not-allowed"
          )}
          onClick={() => handleSelectType("driver")}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Bus className="h-10 w-10 mb-2 text-primary" />
            <h3 className="font-medium text-sm">Driver/Conductor</h3>
            <p className="text-xs text-muted-foreground">RTC Staff</p>
          </CardContent>
        </Card>
        
        <Card 
          className={cn(
            "relative cursor-pointer transition-all overflow-hidden hover:border-primary/50",
            selectedType === "passenger" ? "border-2 border-primary" : "border border-border",
            disabled && "opacity-60 cursor-not-allowed"
          )}
          onClick={() => handleSelectType("passenger")}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <User className="h-10 w-10 mb-2 text-primary" />
            <h3 className="font-medium text-sm">Passenger</h3>
            <p className="text-xs text-muted-foreground">Regular user</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
