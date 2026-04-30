import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, CheckCircle, Clock, AlertCircle, Settings, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const notifications = [
    {
      id: "1",
      type: "status_update",
      title: "Pothole Report Resolved",
      message: "Your report #RP2024001 on Main Street has been resolved. The pothole has been filled and the road resurfaced.",
      timestamp: "2 hours ago",
      isRead: false,
      reportId: "RP2024001",
      status: "resolved" as const,
    },
    {
      id: "2", 
      type: "status_update",
      title: "Report Acknowledged",
      message: "Your streetlight report #RP2024002 has been assigned to the electrical maintenance team.",
      timestamp: "1 day ago",
      isRead: false,
      reportId: "RP2024002",
      status: "progress" as const,
    },
    {
      id: "3",
      type: "reminder",
      title: "Follow-up Available",
      message: "You can now provide feedback on the resolution of report #RP2024001.",
      timestamp: "2 days ago",
      isRead: true,
      reportId: "RP2024001",
    },
    {
      id: "4",
      type: "system",
      title: "New Feature Available",
      message: "Try our new voice description feature when reporting issues!",
      timestamp: "3 days ago",
      isRead: true,
    },
    {
      id: "5",
      type: "status_update",
      title: "Report Received",
      message: "Thank you for reporting the trash bin issue #RP2024003. We'll review it within 24 hours.",
      timestamp: "4 days ago",
      isRead: true,
      reportId: "RP2024003",
      status: "new" as const,
    },
  ];

  const getNotificationIcon = (type: string, status?: string) => {
    if (status === "resolved") return <CheckCircle className="h-5 w-5 text-status-resolved" />;
    if (status === "progress") return <Clock className="h-5 w-5 text-status-progress" />;
    if (status === "new") return <AlertCircle className="h-5 w-5 text-status-new" />;
    if (type === "system") return <Bell className="h-5 w-5 text-primary" />;
    return <Bell className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusBadge = (status?: "new" | "progress" | "resolved") => {
    if (!status) return null;
    const statusConfig = {
      new: { label: "New", className: "status-new" },
      progress: { label: "In Progress", className: "status-progress" },
      resolved: { label: "Resolved", className: "status-resolved" },
    };
    
    const config = statusConfig[status];
    return <Badge className={`status-badge ${config.className} text-xs`}>{config.label}</Badge>;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
              <div className="ml-3">
                <h1 className="text-xl font-semibold">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm">
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="civic-container py-6">
        {/* Quick Actions */}
        {unreadCount > 0 && (
          <Card className="civic-card mb-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm mb-1">You have {unreadCount} new updates</h3>
                  <p className="text-xs text-muted-foreground">Stay informed about your civic reports</p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`civic-card civic-card-hover cursor-pointer ${
                !notification.isRead ? 'border-l-4 border-l-primary bg-primary/2' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type, notification.status)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`text-sm font-semibold ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {notification.status && getStatusBadge(notification.status)}
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{notification.timestamp}</span>
                        {notification.reportId && (
                          <Badge variant="outline" className="text-xs">
                            {notification.reportId}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {notification.reportId && (
                          <Link to="/reports">
                            <Button variant="ghost" size="sm" className="text-xs h-7">
                              View Report
                            </Button>
                          </Link>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground mb-6">
              You'll receive updates here when there are changes to your reports or important announcements.
            </p>
            <Link to="/report">
              <Button className="bg-gradient-to-r from-primary to-accent">
                Create Your First Report
              </Button>
            </Link>
          </div>
        )}

        {/* Notification Settings */}
        <Card className="civic-card mt-8">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Notification Preferences</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Status updates for my reports</span>
                <Button variant="outline" size="sm">On</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Community announcements</span>
                <Button variant="outline" size="sm">On</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Nearby issue alerts</span>
                <Button variant="outline" size="sm">Off</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Weekly summary emails</span>
                <Button variant="outline" size="sm">On</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;