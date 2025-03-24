
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function About() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  
  const teamMembers = [
    {
      name: "Ravi Kumar",
      role: "Project Lead",
      bio: "Transportation expert with over 8 years of experience in public transit solutions",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Priya Sharma",
      role: "UX Designer",
      bio: "Passionate about creating accessible interfaces for public services",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Arjun Reddy",
      role: "Mobile Developer",
      bio: "Specialized in location-based services and real-time tracking applications",
      image: "https://randomuser.me/api/portraits/men/66.jpg"
    },
    {
      name: "Meera Patel",
      role: "Data Scientist",
      bio: "Working with transportation data to optimize routes and predict arrival times",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 bg-blue-50 inline-block p-8 rounded-full">
              <Logo size="lg" withText withTagline variant="vertical" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">About Bus Buddy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Making public transportation in Visakhapatnam more accessible and convenient for everyone.
            </p>
          </div>
          
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
            <p className="mb-4">
              Bus Buddy was created to solve the everyday challenges faced by bus commuters in Visakhapatnam. Our mission is to provide accurate, real-time information about bus locations and schedules to make public transportation more reliable and accessible.
            </p>
            <p className="mb-4">
              We believe that better public transportation information leads to better cities - reducing traffic congestion, lowering pollution, and creating more connected communities.
            </p>
            <p>
              Through a collaborative community approach, we enable bus passengers to help each other by sharing real-time location data, creating a network effect that improves the experience for everyone.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button 
              onClick={() => navigate("/home")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
