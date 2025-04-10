
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Map } from "@/components/Map";
import { NavBar } from "@/components/NavBar";
import { Bus, Map as MapIcon, Share2, ArrowRight, User } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);

    // If already logged in, redirect to home page after splash screen
    // Hide intro after animation completes - 4 seconds splash screen
    const timer = setTimeout(() => {
      setShowIntro(false);
      setAnimationComplete(true);
      
      if (loggedIn) {
        navigate("/home");
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGetBusClick = () => {
    if (isLoggedIn) {
      navigate("/get");
    } else {
      navigate("/login");
    }
  };

  const handleShareLocationClick = () => {
    if (isLoggedIn) {
      navigate("/share");
    } else {
      navigate("/login");
    }
  };

  if (showIntro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900">
        <div className="text-center">
          <Logo size="lg" withText={false} animated variant="vertical" />
          <h1 className="mt-6 text-3xl font-bold animate-slideInLeft text-blue-600">
            <span>BUS</span> <span className="text-gray-600 animate-slideInRight">BUDDY</span>
          </h1>
          <p className="mt-2 text-sm text-blue-500 animate-fade-in delay-500">
            Track Your Bus, Ease Your Commute
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-20 pb-6 px-4">
        <div className="flex flex-col gap-6">
          {/* Hero Section */}
          <section className="text-center py-12 mb-4">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Bus Buddy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your companion for hassle-free bus travel across Andhra Pradesh
            </p>
          </section>
          
          {/* Visakhapatnam Map */}
          <section className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Visakhapatnam Bus Network</h2>
              <Map 
                className="h-[400px] w-full mb-2" 
                useGoogleMaps={true} 
                allowEditing={false}
                location="visakhapatnam" 
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Interactive map of Visakhapatnam bus routes
              </p>
            </div>
          </section>
          
          {/* Features */}
          <section className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="mb-4 bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-fit">
                <Bus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Get The Bus Location</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Find real-time updates on bus locations, routes, and schedules.</p>
              <Button 
                onClick={handleGetBusClick}
                className="w-full"
              >
                <MapIcon className="mr-2 h-5 w-5" />
                <span>Get The Bus Location</span>
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="mb-4 bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-fit">
                <Share2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Share Bus Location</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Help others by sharing your bus location and journey details.</p>
              <Button 
                variant="outline"
                onClick={handleShareLocationClick}
                className="w-full"
              >
                <Share2 className="mr-2 h-5 w-5" />
                <span>Share Bus Location</span>
              </Button>
            </div>
          </section>
          
          {/* Get Started - changing Continue as Guest to black */}
          <section className="text-center mb-8">
            <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6">Create an account to access all features or explore as a guest</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="text-purple-700 bg-white hover:bg-purple-50"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-black border-white hover:bg-white/20"
                  onClick={() => navigate("/home")}
                >
                  Continue as Guest <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
