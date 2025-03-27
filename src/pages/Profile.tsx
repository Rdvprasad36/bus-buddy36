
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Save, User, Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      toast.error("Please log in to view your profile");
      navigate("/login");
      return;
    }
    
    setIsLoggedIn(loggedIn);
    
    // Load user info from localStorage
    const storedUserName = localStorage.getItem("userName") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";
    const storedPhoneNumber = localStorage.getItem("userPhone") || "";
    const storedProfilePicture = localStorage.getItem("userProfilePicture") || null;
    
    setUserName(storedUserName);
    setEmail(storedEmail);
    setPhoneNumber(storedPhoneNumber);
    setProfilePicture(storedProfilePicture);
  }, [navigate]);
  
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    // Save user info to localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPhone", phoneNumber);
    if (profilePicture) {
      localStorage.setItem("userProfilePicture", profilePicture);
    }
    
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      
      <main className="flex-1 container mx-auto pt-24 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
          
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profilePicture || ""} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <label 
                      htmlFor="profile-picture" 
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      <input 
                        id="profile-picture" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                  )}
                </div>
              </div>
              
              <CardTitle>{userName}</CardTitle>
              <CardDescription>
                {email || phoneNumber ? (
                  <span>{email || phoneNumber}</span>
                ) : (
                  <span className="text-muted-foreground">No contact information</span>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Name
                </Label>
                <Input 
                  id="name" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <Input 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone Number
                </Label>
                <Input 
                  id="phone" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              {isEditing ? (
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)} 
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)} 
                  className="w-full"
                >
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
