
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface AuthFormProps {
  mode: "login" | "signup";
  className?: string;
  onSubmit: (data: any) => void;
}

export function AuthForm({ mode, className, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (mode === "signup" && !formData.username) {
      toast.error("Username is required");
      setIsLoading(false);
      return;
    }

    if (!formData.email) {
      toast.error("Email is required");
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit(formData);
    } catch (error) {
      toast.error(`Failed to ${mode === "login" ? "log in" : "sign up"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-6", className)}>
      <div className="text-center mb-8">
        <Logo size="lg" withText withTagline className="mx-auto" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login" 
              ? "Enter your credentials to access your account" 
              : "Enter your information to create an account"}
          </p>
        </div>

        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {mode === "login" && (
              <Link 
                to="/forgot-password" 
                className="text-xs text-primary hover:underline bus-buddy-transition"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Input 
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
        
        {mode === "login" && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => {
                setFormData(prev => ({
                  ...prev,
                  rememberMe: checked === true
                }));
              }}
              disabled={isLoading}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
        )}
        
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? (
            <span className="flex items-center gap-1">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>{mode === "login" ? "Logging in..." : "Signing up..."}</span>
            </span>
          ) : (
            <span>{mode === "login" ? "Log in" : "Sign up"}</span>
          )}
        </Button>
        
        <div className="text-center text-sm">
          {mode === "login" ? (
            <p>
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-primary font-medium hover:underline bus-buddy-transition"
              >
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-primary font-medium hover:underline bus-buddy-transition"
              >
                Log in
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
