
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LocationPermission from "./pages/LocationPermission";
import Home from "./pages/Home";
import GetBus from "./pages/GetBus";
import Share from "./pages/Share";
import Data from "./pages/Data";
import About from "./pages/About";
import AddBus from "./pages/AddBus";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={isLoggedIn ? <Navigate to="/home" replace /> : <Index />} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/location-permission" element={<LocationPermission />} />
            <Route path="/home" element={<Home />} />
            <Route path="/get" element={<GetBus />} />
            <Route path="/share" element={<Share />} />
            <Route path="/data" element={<Data />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-bus" element={<AddBus />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
