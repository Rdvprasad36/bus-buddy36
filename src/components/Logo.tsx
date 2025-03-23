
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  withTagline?: boolean;
  animated?: boolean;
  variant?: "vertical" | "horizontal";
}

export function Logo({ 
  className, 
  size = "md", 
  withText = true,
  withTagline = false,
  animated = false,
  variant = "vertical"
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
    <div className={cn(
      "flex items-center", 
      variant === "vertical" ? "flex-col gap-1" : "flex-row gap-2",
      className
    )}>
      <div 
        className={cn(
          "relative", 
          sizes[size],
          animated && "transition-all duration-700 transform",
          animated && (showLogo ? "opacity-100 scale-100" : "opacity-0 scale-90")
        )}
      >
        <img 
          src="/lovable-uploads/6bda028b-614a-4804-8577-98da0f46e213.png" 
          alt="Bus Buddy Logo" 
          className={cn(sizes[size], "object-contain")} 
        />
      </div>
      
      {withText && (
        <div className={cn(
          "flex flex-col",
          variant === "horizontal" && "items-start"
        )}>
          <div className="flex items-center">
            <h1 
              className={cn(
                "font-bold tracking-tight leading-none",
                textSizes[size],
                animated && "transition-all duration-700 transform",
                animated && (showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"),
                variant === "horizontal" ? "text-blue-600 font-sans" : "text-brand font-mono uppercase"
              )}
            >
              {variant === "horizontal" ? (
                <>
                  <span className="text-blue-600 mr-1">Bus</span>
                  <span className="text-gray-600">Buddy</span>
                </>
              ) : (
                <>
                  <span className="mr-1">BUS</span>
                  <span>BUDDY</span>
                </>
              )}
            </h1>
          </div>
          {withTagline && (
            <p className={cn(
              "text-xs text-blue-500 leading-tight",
              animated && "transition-all duration-700 transform",
              animated && (showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2")
            )}>
              Track Your Bus, Ease Your Commute
            </p>
          )}
        </div>
      )}
    </div>
  );
}
