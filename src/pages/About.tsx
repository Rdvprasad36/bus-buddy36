
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Linkedin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function About() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  
  const teamMembers = [
    {
      name: "R.D.V. Prasad",
      role: "Project Lead",
      bio: "Transportation expert with a passion for public transit solutions",
      image: "/lovable-uploads/aefb4811-696a-48c8-9485-8b8072aa402d.png",
      linkedin: "https://www.linkedin.com/in/durga-venkata-prasad-rapeti-b154022b7/"
    },
    {
      name: "S. Vamsi Naidu",
      role: "UX Designer",
      bio: "Passionate about creating accessible interfaces for public services",
      image: "/lovable-uploads/18291f74-c685-45c8-b092-82afc275afae.png",
      linkedin: "https://www.linkedin.com/in/sanapathi-vamsi-naidu-471538297/"
    },
    {
      name: "V. Venkata Danush",
      role: "Mobile Developer",
      bio: "Specialized in location-based services and real-time tracking applications",
      image: "/lovable-uploads/5d782fa0-5ac8-4363-bb19-388a7c567d55.png",
      linkedin: "https://www.linkedin.com/in/venkatadanush/"
    },
    {
      name: "V. Akshata Chandra",
      role: "Data Scientist",
      bio: "Working with transportation data to optimize routes and predict arrival times",
      image: "/lovable-uploads/b53bbed1-c878-4f74-bf91-d612c338a84f.png",
      linkedin: "https://www.linkedin.com/in/akshatachandraveesam/"
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
          
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden flex items-center justify-center p-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage 
                      src={member.image} 
                      alt={member.name}
                      className="object-cover"
                    />
                  </Avatar>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            ))}
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
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">About Our Team</h2>
            <p className="mb-4">
              We are all freshers from the Department of AI & Data Science in Vignan's Institute of Information and Technology. Bus Buddy represents our combined passion for using technology to solve real-world problems that affect our community.
            </p>
            <p>
              Our diverse skills in UX design, mobile development, and data science have come together to create an application that we hope will make a positive impact on daily commuters in Visakhapatnam.
            </p>
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
