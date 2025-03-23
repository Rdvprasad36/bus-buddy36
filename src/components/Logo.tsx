
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  withTagline?: boolean;
  animated?: boolean;
}

export function Logo({ 
  className, 
  size = "md", 
  withText = true,
  withTagline = false,
  animated = false
}: LogoProps) {
  const [showLogo, setShowLogo] = useState(!animated);
  const [showText, setShowText] = useState(!animated);
  const [showTagline, setShowTagline] = useState(!animated);

  useEffect(() => {
    if (animated) {
      // Staggered animation sequence
      const logoTimer = setTimeout(() => setShowLogo(true), 300);
      const textTimer = setTimeout(() => setShowText(true), 1500);
      const taglineTimer = setTimeout(() => setShowTagline(true), 2800);
      
      return () => {
        clearTimeout(logoTimer);
        clearTimeout(textTimer);
        clearTimeout(taglineTimer);
      };
    }
  }, [animated]);

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
      <div 
        className={cn(
          "relative", 
          sizes[size],
          animated && "transition-all duration-700 transform",
          animated && (showLogo ? "opacity-100 scale-100" : "opacity-0 scale-90")
        )}
      >
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-brand",
          animated && showLogo && "animate-pulse-soft"
        )}></div>
        <svg 
          viewBox="0 0 100 100" 
          className={cn("text-brand", sizes[size])}
          aria-hidden="true"
        >
          <g transform="translate(30, 20)">
            <rect x="0" y="0" width="40" height="35" rx="5" fill="currentColor" />
            <rect x="8" y="8" width="8" height="8" rx="4" fill="white" />
            <rect x="24" y="8" width="8" height="8" rx="4" fill="white" />
            <rect x="-10" y="15" width="10" height="15" rx="2" fill="currentColor" />
            <rect x="40" y="15" width="10" height="15" rx="2" fill="currentColor" />
            <rect x="12" y="22" width="16" height="4" rx="2" fill="white" />
            <rect x="-5" y="35" width="50" height="10" rx="3" fill="currentColor" />
          </g>
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <h1 
              className={cn(
                "font-bold tracking-tight leading-none",
                textSizes[size],
                animated && "transition-all duration-700 transform",
                animated && (showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"),
                "text-brand font-mono uppercase"
              )}
            >
              <span className="mr-1">BUS</span>
              <span>BUDDY</span>
            </h1>
          </div>
          {withTagline && (
            <p className={cn(
              "text-xs text-muted-foreground leading-tight",
              animated && "transition-all duration-700 transform",
              animated && (showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2")
            )}>
              Track your bus. Easy to commute.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
