import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, ArrowLeft, Upload, Mic, MicOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: "",
    image: null as File | null,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = [
    "Road & Traffic",
    "Street Lighting",
    "Waste Management",
    "Water & Drainage",
    "Parks & Recreation",
    "Public Safety",
    "Building & Construction",
    "Other"
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setFormData(prev => ({ ...prev, location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
          toast({
            title: "Location captured",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      toast({
        title: "Image uploaded",
        description: `${file.name} has been added to your report.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please select a category and describe the issue.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report submitted!",
        description: "Your issue #RP2024001 has been created and sent to authorities.",
      });
      navigate("/reports");
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak clearly to describe your issue.",
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Voice description has been added to your report.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="civic-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="ml-3 text-xl font-semibold">Report Issue</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="civic-container py-6">
        <Card className="civic-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="mr-2 h-5 w-5 text-primary" />
              Report a Civic Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Issue Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Photo Evidence</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      {formData.image ? (
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-green-600">{formData.image.name}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">Take a photo or upload from gallery</p>
                          <p className="text-xs text-muted-foreground">Tap to open camera</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Enter location or use GPS"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetLocation}
                    className="shrink-0"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={toggleRecording}
                    className={isRecording ? "bg-red-50 text-red-600" : ""}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail. What happened? When did you notice it? Any additional context..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px]"
                />
                {isRecording && (
                  <p className="text-sm text-red-600 animate-pulse">🔴 Recording in progress...</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-button)]"
                  size="lg"
                >
                  Submit Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Reports are sent directly to relevant authorities. You'll receive updates via notifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;