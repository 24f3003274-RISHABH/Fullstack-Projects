import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Camera, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const MyReports = () => {
  const reports = [
    {
      id: "RP2024001",
      title: "Large pothole on Main Street",
      category: "Road & Traffic",
      status: "resolved" as const,
      date: "2024-01-15",
      location: "Main St & Oak Ave",
      description: "Deep pothole causing damage to vehicles",
      image: "/placeholder.svg",
      updates: [
        { date: "2024-01-15", status: "new", message: "Report received" },
        { date: "2024-01-16", status: "progress", message: "Assigned to road maintenance team" },
        { date: "2024-01-18", status: "resolved", message: "Pothole filled and road resurfaced" },
      ]
    },
    {
      id: "RP2024002",
      title: "Broken streetlight on Park Avenue",
      category: "Street Lighting",
      status: "progress" as const,
      date: "2024-01-18",
      location: "Park Ave, near bus stop",
      description: "Street light has been flickering for several days",
      image: "/placeholder.svg",
      updates: [
        { date: "2024-01-18", status: "new", message: "Report received" },
        { date: "2024-01-19", status: "progress", message: "Electrician scheduled for inspection" },
      ]
    },
    {
      id: "RP2024003",
      title: "Overflowing trash bin at Central Park",
      category: "Waste Management",
      status: "new" as const,
      date: "2024-01-20",
      location: "Central Park, main entrance",
      description: "Trash bin is overflowing, attracting pests",
      image: "/placeholder.svg",
      updates: [
        { date: "2024-01-20", status: "new", message: "Report received" },
      ]
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

  const getStatusColor = (status: "new" | "progress" | "resolved") => {
    switch (status) {
      case "new": return "text-status-new";
      case "progress": return "text-status-progress";
      case "resolved": return "text-status-resolved";
      default: return "text-muted-foreground";
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
              <h1 className="ml-3 text-xl font-semibold">My Reports</h1>
            </div>
            <Link to="/report">
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                New Report
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="civic-container py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="civic-card text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card className="civic-card text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-status-resolved">1</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card className="civic-card text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-status-progress">1</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="civic-card civic-card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {report.image && (
                    <div className="shrink-0">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-3">
                      {report.description}
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Status Updates:</div>
                      {report.updates.map((update, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className={`w-2 h-2 rounded-full ${
                            update.status === 'new' ? 'bg-status-new' :
                            update.status === 'progress' ? 'bg-status-progress' : 'bg-status-resolved'
                          }`} />
                          <div className="flex-1">
                            <span className="text-muted-foreground">{new Date(update.date).toLocaleDateString()}</span>
                            <span className="ml-2">{update.message}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Report ID: {report.id}
                  </div>
                  <Badge variant="outline">
                    {report.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {reports.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by reporting your first civic issue to help improve your community.
            </p>
            <Link to="/report">
              <Button className="bg-gradient-to-r from-primary to-accent">
                Create Your First Report
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;