import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, FileText, Users, AlertCircle, Camera, MapPin, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Support",
      description: "24/7 helpline for urgent issues",
      action: "Call 1-800-CIVIC",
      href: "tel:1-800-28242",
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Get help via email within 24 hours",
      action: "Send Email",
      href: "mailto:support@civicconnect.gov",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      href: "#",
    },
  ];

  const quickGuides = [
    {
      icon: Camera,
      title: "How to Report an Issue",
      description: "Step-by-step guide to submit your first report",
    },
    {
      icon: FileText,
      title: "Tracking Your Reports",
      description: "Learn how to monitor progress and updates",
    },
    {
      icon: MapPin,
      title: "Using Map View",
      description: "Find and view issues in your neighborhood",
    },
    {
      icon: Bell,
      title: "Managing Notifications",
      description: "Control how and when you receive updates",
    },
  ];

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer: "Most reports are acknowledged within 24-48 hours. Response times may vary based on issue severity and department workload. Emergency issues are prioritized and addressed immediately."
    },
    {
      question: "Can I report issues anonymously?",
      answer: "Yes, you can submit anonymous reports. However, providing contact information helps us follow up with you for additional details and send status updates."
    },
    {
      question: "What types of issues can I report?",
      answer: "You can report various civic issues including potholes, broken streetlights, waste management problems, damaged sidewalks, traffic signal issues, and more. If you're unsure, feel free to submit your report."
    },
    {
      question: "Why do I need to provide a photo?",
      answer: "Photos help authorities quickly understand the issue and assess its severity. They also serve as evidence and can speed up the resolution process. Photos are not mandatory but highly recommended."
    },
    {
      question: "How accurate is the location tracking?",
      answer: "Our GPS location tracking is accurate to within a few meters. You can also manually adjust the location or provide additional location details in the description field."
    },
    {
      question: "Can I edit or cancel a report after submission?",
      answer: "Once submitted, reports cannot be edited or cancelled to maintain data integrity. If you need to provide additional information, you can contact support or submit a follow-up report."
    },
    {
      question: "What happens after I submit a report?",
      answer: "Your report is automatically routed to the appropriate department. You'll receive a confirmation with a tracking ID. You can monitor progress through your dashboard and receive notifications at each status change."
    },
    {
      question: "Why is my report taking longer than expected?",
      answer: "Resolution times vary based on issue complexity, weather conditions, budget availability, and department resources. Non-emergency issues may take longer during peak periods or adverse weather."
    },
  ];

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
              <h1 className="ml-3 text-xl font-semibold">Help & Support</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="civic-container py-6">
        {/* Emergency Notice */}
        <Card className="civic-card mb-6 border-l-4 border-l-status-new">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-status-new shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Emergency Situations</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  For life-threatening emergencies, call 911 immediately. Do not use this app for emergency situations.
                </p>
                <Button size="sm" variant="outline" className="text-status-new border-status-new">
                  Emergency Guidelines
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
          <div className="grid gap-4">
            {contactMethods.map((method) => (
              <Card key={method.title} className="civic-card civic-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={method.href}>{method.action}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Guides */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Guides</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickGuides.map((guide) => (
              <Card key={guide.title} className="civic-card civic-card-hover cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <guide.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{guide.title}</h3>
                  <p className="text-xs text-muted-foreground">{guide.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <Card className="civic-card">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="px-4 py-3 text-left text-sm hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Additional Resources</h2>
          <div className="space-y-3">
            <Card className="civic-card cursor-pointer hover:bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm">User Manual</h3>
                    <p className="text-xs text-muted-foreground">Complete guide to using CivicConnect</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="civic-card cursor-pointer hover:bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm">Community Forum</h3>
                    <p className="text-xs text-muted-foreground">Connect with other citizens and share experiences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="civic-card cursor-pointer hover:bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm">Video Tutorials</h3>
                    <p className="text-xs text-muted-foreground">Step-by-step video guides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">
            CivicConnect v2.1.0 • Built with ❤️ for our community
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            <a href="#" className="text-primary hover:underline">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;