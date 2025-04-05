
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, ArrowLeft, ArrowRight, Bus, Home, Info, HelpCircle, Database } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

  return <header className="mx-[5px]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="bus-buddy-transition hover:opacity-80 flex items-center">
            <Logo size="sm" withText withTagline={false} variant="horizontal" />
          </Link>
        </div>

        {/* Always visible navigation items for desktop */}
        <nav className="hidden sm:block">
          <ul className="flex flex-row items-center gap-5">
            <li>
              <Link to="/home" className="text-sm font-medium hover:text-blue-600 bus-buddy-transition flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/data" className="text-sm font-medium hover:text-blue-600 bus-buddy-transition flex items-center gap-1">
                <Bus className="h-4 w-4" />
                <span>Bus Data</span>
              </Link>
            </li>
            <li>
              <Link to="/how-to-use" className="text-sm font-medium hover:text-blue-600 bus-buddy-transition flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                <span>How to Use</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm font-medium hover:text-blue-600 bus-buddy-transition flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
            </li>
            {isLoggedIn ? <li>
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
              </li> : <li>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/login">Login</Link>
                </Button>
              </li>}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link to="/home" className="text-sm font-medium hover:text-blue-600 bus-buddy-transition px-2">
            <Home className="h-5 w-5" />
          </Link>
          <Link to="/data" className="text-sm font-medium hover:text-blue-600 bus-buddy-transition px-2">
            <Database className="h-5 w-5" />
          </Link>
          {isLoggedIn ? (
            <Button variant="ghost" size="icon" asChild className="px-2">
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/login">Login</Link>
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="px-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] py-6">
              <div className="flex flex-col gap-6">
                <Logo size="sm" withText withTagline={true} variant="horizontal" />
                
                <nav className="flex flex-col gap-4">
                  <h3 className="font-medium text-sm text-gray-500">Navigation</h3>
                  <ul className="flex flex-col space-y-3">
                    <li>
                      <Link to="/home" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/data" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                        <Bus className="h-4 w-4" />
                        <span>Bus Data</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/how-to-use" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                        <HelpCircle className="h-4 w-4" />
                        <span>How to Use</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                        <Info className="h-4 w-4" />
                        <span>About</span>
                      </Link>
                    </li>
                  </ul>
                  
                  {isLoggedIn && (
                    <>
                      <h3 className="font-medium text-sm text-gray-500 mt-4">Account</h3>
                      <ul className="flex flex-col space-y-3">
                        <li>
                          <Link to="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/activity" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                            <Database className="h-4 w-4" />
                            <span>Activity</span>
                          </Link>
                        </li>
                        <li>
                          <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Log out</span>
                          </button>
                        </li>
                      </ul>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Navigation arrows at bottom of screen */}
      <div className="fixed bottom-6 z-50 flex justify-between w-full mx-0 px-4 rounded-sm py-0 my-[100px]">
        <Button variant="secondary" size="icon" onClick={handleBackNavigation} aria-label="Go back" className="h-12 w-12 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full my-0 py-0 text-justify text-sm px-0 mx-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Button variant="secondary" size="icon" onClick={handleForwardNavigation} aria-label="Go forward" className="h-12 w-12 rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </header>;
}
