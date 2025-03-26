
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation, Copy, ArrowLeft, Share2, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareMyLiveLocationProps {
  onBack: () => void;
}

export function ShareMyLiveLocation({ onBack }: ShareMyLiveLocationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    generateShareLink();
  }, []);
  
  const generateShareLink = () => {
    setIsGenerating(true);
    
    // Simulate generating a share link
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 10);
      const link = `https://busbuddy.app/live/${randomId}`;
      setShareLink(link);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink)
        .then(() => {
          setIsCopied(true);
          toast.success("Link copied to clipboard");
          
          // Reset the copied state after 3 seconds
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        })
        .catch(() => {
          toast.error("Failed to copy link");
        });
    }
  };
  
  const handleShareToWhatsApp = () => {
    if (shareLink) {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Track my bus journey in real-time: ${shareLink}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Share My Live Location
            </CardTitle>
            <CardDescription>
              Generate a link to share your real-time location with others
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="share-link" className="text-sm font-medium">
            Your shareable link
          </label>
          <div className="flex gap-2">
            <Input 
              id="share-link"
              value={shareLink}
              readOnly
              placeholder="Generating link..."
              className="flex-1"
              disabled={isGenerating}
            />
            <Button
              variant="outline"
              size="icon"
              disabled={!shareLink || isGenerating}
              onClick={handleCopyLink}
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This link will be active for 24 hours
          </p>
        </div>
        
        <div className="bg-primary/10 p-3 rounded-md">
          <p className="text-sm flex items-start gap-2">
            <Navigation className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>
              Sharing your live location helps others know exactly where you are. 
              It will update automatically as you move.
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button 
          className="w-full"
          disabled={!shareLink || isGenerating}
          onClick={handleShareToWhatsApp}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
          onClick={onBack}
        >
          Back to Home
        </Button>
      </CardFooter>
    </Card>
  );
}
