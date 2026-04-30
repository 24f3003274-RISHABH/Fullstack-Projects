import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, FileText, Bell, HelpCircle, Camera, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import civicHeroImage from "@/assets/civic-hero.jpg";

const Index = () => {
  const quickActions = [
    {
      icon: Camera,
      title: "Report Issue",
      description: "Take a photo and report a problem",
      href: "/report",
      color: "bg-primary text-primary-foreground",
    },
    {
      icon: FileText,
      title: "My Reports",
      description: "Track your submitted issues",
      href: "/reports",
      color: "bg-accent text-accent-foreground",
    },
    {
      icon: MapPin,
      title: "Map View",
      description: "See issues in your area",
      href: "/map",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Stay updated on progress",
      href: "/notifications",
      color: "bg-muted text-muted-foreground",
    },
  ];

  const stats = [
    { label: "Issues Reported", value: "12,847", trend: "+8% this month" },
    { label: "Issues Resolved", value: "9,234", trend: "72% resolution rate" },
    { label: "Average Response", value: "3.2 days", trend: "Improving" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img 
            src={civicHeroImage} 
            alt="Civic Setu community engagement" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="civic-container py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Civic Setu</h1>
              <p className="text-sm opacity-90">Your voice in the community</p>
            </div>
            <Link to="/help">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="civic-container py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Report. Track. Improve.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help make your community better by reporting civic issues directly to local authorities. 
            From potholes to broken streetlights - every report counts.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="text-center mb-12">
          <Link to="/report">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-button)] transform transition-all duration-300 hover:scale-105"
            >
              <Camera className="mr-2 h-5 w-5" />
              Report an Issue Now
            </Button>
          </Link>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href} className="group">
              <Card className="civic-card civic-card-hover h-full">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${action.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-center mb-6">Community Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-accent">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">1</div>
              <h4 className="font-medium mb-2">Report</h4>
              <p className="text-sm text-muted-foreground">Take a photo and describe the issue</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">2</div>
              <h4 className="font-medium mb-2">Track</h4>
              <p className="text-sm text-muted-foreground">Monitor progress through your dashboard</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold mb-4">3</div>
              <h4 className="font-medium mb-2">Resolved</h4>
              <p className="text-sm text-muted-foreground">Get notified when it's fixed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Link Bar */}
      <div className="sticky bottom-0 bg-card border-t border-border p-4">
        <div className="civic-container">
          <div className="flex justify-center">
            <Link to="/report">
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-button)]">
                <Navigation className="mr-2 h-4 w-4" />
                Quick Report
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;