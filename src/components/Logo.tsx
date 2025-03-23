
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  withTagline?: boolean;
}

export function Logo({ 
  className, 
  size = "md", 
  withText = true,
  withTagline = false
}: LogoProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizes[size])}>
        <div className="absolute inset-0 rounded-full border-2 border-brand animate-pulse-soft"></div>
        <svg 
          viewBox="0 0 100 100" 
          className={cn("text-brand", sizes[size])}
          aria-hidden="true"
        >
          <rect x="25" y="15" width="50" height="55" rx="5" fill="currentColor" />
          <rect x="32" y="25" width="12" height="12" rx="6" fill="white" />
          <rect x="56" y="25" width="12" height="12" rx="6" fill="white" />
          <rect x="15" y="35" width="10" height="25" rx="2" fill="currentColor" />
          <rect x="75" y="35" width="10" height="25" rx="2" fill="currentColor" />
          <rect x="35" y="45" width="30" height="5" rx="2" fill="white" />
          <rect x="20" y="70" width="60" height="15" rx="3" fill="currentColor" />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col">
          <h1 className={cn("font-bold tracking-tight leading-none text-brand", textSizes[size])}>
            BUS BUDDY
          </h1>
          {withTagline && (
            <p className="text-xs text-muted-foreground leading-tight">
              Track your bus. Easy to commute.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
