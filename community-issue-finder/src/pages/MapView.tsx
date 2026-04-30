import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Filter, Camera, Navigation, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const MapView = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const filters = [
    { id: "all", label: "All Issues", count: 45 },
    { id: "new", label: "New", count: 12 },
    { id: "progress", label: "In Progress", count: 18 },
    { id: "resolved", label: "Resolved", count: 15 },
  ];

  const nearbyIssues = [
    {
      id: "RP2024001",
      title: "Pothole on Main Street",
      status: "resolved" as const,
      distance: "0.2 km",
      category: "Road & Traffic",
      reports: 3,
    },
    {
      id: "RP2024002",
      title: "Broken streetlight",
      status: "progress" as const,
      distance: "0.5 km",
      category: "Street Lighting",
      reports: 1,
    },
    {
      id: "RP2024003",
      title: "Overflowing trash bin",
      status: "new" as const,
      distance: "0.8 km",
      category: "Waste Management",
      reports: 2,
    },
    {
      id: "RP2024004",
      title: "Damaged sidewalk",
      status: "new" as const,
      distance: "1.2 km",
      category: "Road & Traffic",
      reports: 1,
    },
  ];

  const getStatusBadge = (status: "new" | "progress" | "resolved") => {
    const statusConfig = {
      new: { label: "New", className: "status-new" },
      progress: { label: "In Progress", className: "status-progress" },
      resolved: { label: "Resolved", className: "status-resolved" },
    };
    
    const config = statusConfig[status];
    return <Badge className={`status-badge ${config.className}`}>{config.label}</Badge>;
  };

  const getStatusDot = (status: "new" | "progress" | "resolved") => {
    const colors = {
      new: "bg-status-new",
      progress: "bg-status-progress", 
      resolved: "bg-status-resolved",
    };
    return colors[status];
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
              <h1 className="ml-3 text-xl font-semibold">Map View</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Layers className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Map Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Map integration with Mappls SDK will display nearby civic issues with location markers
            </p>
          </div>
        </div>
        
        {/* Mock Map Markers */}
        <div className="absolute top-16 left-8">
          <div className={`w-4 h-4 rounded-full ${getStatusDot("resolved")} border-2 border-white shadow-lg animate-pulse`} />
        </div>
        <div className="absolute top-24 right-12">
          <div className={`w-4 h-4 rounded-full ${getStatusDot("progress")} border-2 border-white shadow-lg animate-pulse`} />
        </div>
        <div className="absolute bottom-16 left-16">
          <div className={`w-4 h-4 rounded-full ${getStatusDot("new")} border-2 border-white shadow-lg animate-pulse`} />
        </div>
        <div className="absolute bottom-20 right-8">
          <div className={`w-4 h-4 rounded-full ${getStatusDot("new")} border-2 border-white shadow-lg animate-pulse`} />
        </div>

        {/* Current Location Button */}
        <Button 
          className="absolute bottom-4 right-4 bg-white text-primary hover:bg-gray-50 shadow-lg"
          size="icon"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      <div className="civic-container py-6">
        {/* Filter Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="shrink-0"
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>

        {/* Nearby Issues Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Nearby Issues</h2>
          <Link to="/report">
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
              <Camera className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </Link>
        </div>

        {/* Issues List */}
        <div className="space-y-3">
          {nearbyIssues
            .filter(issue => selectedFilter === "all" || issue.status === selectedFilter)
            .map((issue) => (
            <Card 
              key={issue.id} 
              className={`civic-card civic-card-hover cursor-pointer ${
                selectedIssue === issue.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusDot(issue.status)}`} />
                      <h3 className="font-semibold text-sm">{issue.title}</h3>
                      {getStatusBadge(issue.status)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {issue.distance} away
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {issue.category}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {issue.reports} report{issue.reports !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedIssue === issue.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-sm space-y-2">
                      <p><strong>Status:</strong> {issue.status === 'new' ? 'Newly reported' : issue.status === 'progress' ? 'Being addressed' : 'Successfully resolved'}</p>
                      <p><strong>Category:</strong> {issue.category}</p>
                      <p><strong>Community Impact:</strong> {issue.reports} citizen{issue.reports !== 1 ? 's' : ''} reported this issue</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          +1 Report
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <Card className="civic-card mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-sm">Status Legend</h3>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusDot("new")}`} />
                <span>New Issue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusDot("progress")}`} />
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusDot("resolved")}`} />
                <span>Resolved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;