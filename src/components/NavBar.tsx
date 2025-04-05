
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, ArrowLeft, ArrowRight, Bus, Home, Database, Info, HelpCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigation } from "@/hooks/use-navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavBarProps {
  isLoggedIn?: boolean;
  userName?: string;
  className?: string;
}

export function NavBar({
  isLoggedIn = false,
  userName = "",
  className
}: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const {
    handleBackNavigation,
    handleForwardNavigation,
    handleLogout
  } = useNavigation();

  // Primary navigation items that should always be visible
  const primaryNavItems = [
    { path: "/home", label: "Home", icon: <Home className="h-4 w-4" /> },
    { path: "/data", label: "Bus Data", icon: <Bus className="h-4 w-4" /> }
  ];
  
  // Secondary navigation items that will go into dropdown menu on mobile
  const secondaryNavItems = [
    { path: "/how-to-use", label: "How to Use", icon: <HelpCircle className="h-4 w-4" /> },
    { path: "/about", label: "About", icon: <Info className="h-4 w-4" /> }
  ];
  
  // Close mobile menu when navigation happens
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={cn("sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="bus-buddy-transition hover:opacity-80 flex items-center" onClick={handleNavigation}>
            <Logo size="sm" withText withTagline={false} variant="horizontal" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            {primaryNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary",
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            
            {secondaryNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary",
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            
            {isLoggedIn ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="max-w-[100px] truncate">
                        {userName}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/activity" className="cursor-pointer w-full">
                        Activity
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer w-full flex items-center text-destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <li>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/login">Login</Link>
                </Button>
              </li>
            )}
          </ul>
        </nav>
        
        {/* Mobile navigation overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)} />
        )}
        
        {/* Mobile navigation menu */}
        <nav
          className={cn(
            "fixed top-16 left-0 right-0 bottom-0 z-50 grid grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden",
            isMenuOpen ? "slide-in-from-top-2" : "hidden"
          )}
        >
          <ul className="grid gap-3 text-lg">
            {/* Mobile: Always show Home and Bus Data first */}
            {primaryNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                    location.pathname === item.path ? "bg-accent" : ""
                  )}
                  onClick={handleNavigation}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            
            {/* Mobile: Show login button */}
            {!isLoggedIn && (
              <li>
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 p-2 rounded-md bg-blue-600 text-white"
                  onClick={handleNavigation}
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </li>
            )}
            
            {/* Mobile: Show all secondary items  */}
            <li className="mt-6 font-semibold text-sm text-muted-foreground">MENU</li>
            {isLoggedIn && (
              <>
                <li>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    onClick={handleNavigation}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/activity" 
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    onClick={handleNavigation}
                  >
                    <Database className="h-4 w-4" />
                    <span>Activity</span>
                  </Link>
                </li>
              </>
            )}
            
            {secondaryNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                  onClick={handleNavigation}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            
            {isLoggedIn && (
              <li>
                <button 
                  className="flex items-center gap-2 p-2 rounded-md text-destructive hover:bg-destructive/10 w-full text-left"
                  onClick={() => {
                    handleLogout();
                    handleNavigation();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      
      {/* Navigation arrows */}
      <div className="fixed bottom-6 z-40 flex justify-between w-full px-4 pointer-events-none">
        <Button variant="secondary" size="icon" onClick={handleBackNavigation} aria-label="Go back" className="h-12 w-12 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full pointer-events-auto">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Button variant="secondary" size="icon" onClick={handleForwardNavigation} aria-label="Go forward" className="h-12 w-12 rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 pointer-events-auto">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
