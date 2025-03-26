
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, ArrowLeft, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigation } from "@/hooks/use-navigation";

interface NavBarProps {
  isLoggedIn?: boolean;
  userName?: string;
  className?: string;
}

export function NavBar({ isLoggedIn = false, userName = "", className }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { handleBackNavigation, handleForwardNavigation, handleLogout } = useNavigation();

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 px-4 py-3 glass border-b", 
      className
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="bus-buddy-transition hover:opacity-80 flex items-center">
            <Logo size="sm" withText withTagline={false} variant="horizontal" />
          </Link>
        </div>

        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className={cn(
          "absolute top-full left-0 w-full p-4 glass border-b transform transition-all duration-300 ease-in-out sm:static sm:block sm:w-auto sm:p-0 sm:border-0 sm:bg-transparent sm:transform-none",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none",
          "sm:translate-y-0 sm:opacity-100 sm:pointer-events-auto"
        )}>
          <ul className="flex flex-col sm:flex-row items-center gap-5">
            <li>
              <Link 
                to="/home" 
                className="text-sm font-medium hover:text-blue-600 bus-buddy-transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/data" 
                className="text-sm font-medium hover:text-blue-600 bus-buddy-transition"
              >
                Data
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="text-sm font-medium hover:text-blue-600 bus-buddy-transition"
              >
                About
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline-block max-w-[100px] truncate">
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
                    <DropdownMenuItem 
                      className="cursor-pointer w-full flex items-center text-destructive"
                      onClick={handleLogout}
                    >
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
      </div>
      
      {/* Navigation arrows moved to bottom of screen */}
      <div className="fixed bottom-6 z-50 flex justify-between w-full px-6">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleBackNavigation}
          aria-label="Go back"
          className="h-12 w-12 rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handleForwardNavigation}
          aria-label="Go forward"
          className="h-12 w-12 rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
