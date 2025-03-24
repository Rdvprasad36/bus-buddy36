
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react";

export default function About() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  const teamMembers = [
    {
      name: "Krishna Vamsi",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in React and geolocation services",
      image: "/lovable-uploads/6bda028b-614a-4804-8577-98da0f46e213.png"
    },
    {
      name: "Leela Priya",
      role: "UI/UX Designer",
      bio: "Designer focused on creating intuitive user experiences for transportation apps",
      image: "/lovable-uploads/6bda028b-614a-4804-8577-98da0f46e213.png"
    },
    {
      name: "Prakash Rao",
      role: "Backend Engineer",
      bio: "Specialized in real-time data systems and location tracking infrastructure",
      image: "/lovable-uploads/6bda028b-614a-4804-8577-98da0f46e213.png"
    },
    {
      name: "Sai Kumar",
      role: "Mobile Developer",
      bio: "Expert in cross-platform technologies and location-based services",
      image: "/lovable-uploads/6bda028b-614a-4804-8577-98da0f46e213.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/home")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Home</span>
            </Button>
          </div>

          <div className="text-center mb-12">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <img 
                src="/lovable-uploads/6bda028b-614a-4804-8577-98da0f46e213.png" 
                alt="Bus Buddy App" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold mb-4">About Bus Buddy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Bus Buddy is a real-time bus tracking and location-sharing application designed to help commuters in Visakhapatnam navigate the public transportation system efficiently. Our mission is to make public transportation more accessible, reliable, and user-friendly.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </Button>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-8">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate("/home")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Home</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
