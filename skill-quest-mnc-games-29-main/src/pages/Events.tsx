import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Clock, MapPin, Users, CheckCircle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";

const Events = () => {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [registrationData, setRegistrationData] = useState({ name: "", email: "" });
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const { toast } = useToast();

  // Get current date and format events with dynamic dates
  const today = new Date();
  const currentYear = today.getFullYear();
  
  const getEventDate = (daysFromToday: number) => {
    const eventDate = new Date(today);
    eventDate.setDate(today.getDate() + daysFromToday);
    return eventDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Leadership Summit 2024",
      date: getEventDate(15),
      time: "9:00 AM - 5:00 PM",
      location: "Conference Center, Building A",
      description: "Annual leadership summit featuring keynote speakers and workshops",
      attendees: 150,
      maxAttendees: 200,
      type: "Summit",
      tags: ["Leadership", "Networking"],
      isToday: false,
      hasActiveCalendar: true,
      schedule: [
        { time: "9:00 AM", activity: "Registration & Welcome Coffee" },
        { time: "10:00 AM", activity: "Keynote: Future of Leadership" },
        { time: "11:30 AM", activity: "Panel Discussion: Leading Through Change" },
        { time: "1:00 PM", activity: "Lunch & Networking" },
        { time: "2:30 PM", activity: "Workshop: Strategic Decision Making" },
        { time: "4:00 PM", activity: "Closing Remarks & Next Steps" }
      ]
    },
    {
      id: 2,
      title: "Innovation Workshop",
      date: getEventDate(0),
      time: "2:00 PM - 4:30 PM",
      location: "Innovation Lab, Floor 3",
      description: "Hands-on workshop exploring creative problem-solving techniques",
      attendees: 25,
      maxAttendees: 30,
      type: "Workshop",
      tags: ["Innovation", "Creativity"],
      isToday: true,
      hasActiveCalendar: false
    },
    {
      id: 3,
      title: "Year-End Networking Event",
      date: getEventDate(28),
      time: "6:00 PM - 9:00 PM",
      location: "Executive Lounge",
      description: "Celebrate achievements and connect with colleagues",
      attendees: 85,
      maxAttendees: 100,
      type: "Networking",
      tags: ["Networking", "Celebration"],
      isToday: false,
      hasActiveCalendar: true,
      schedule: [
        { time: "6:00 PM", activity: "Welcome Reception & Cocktails" },
        { time: "6:30 PM", activity: "Year in Review Presentation" },
        { time: "7:00 PM", activity: "Achievement Awards Ceremony" },
        { time: "7:30 PM", activity: "Dinner & Open Networking" },
        { time: "8:30 PM", activity: "DJ & Dancing" }
      ]
    },
    {
      id: 4,
      title: "Digital Transformation Seminar",
      date: getEventDate(8),
      time: "10:00 AM - 12:00 PM",
      location: "Virtual Event",
      description: "Learn about the latest trends in digital transformation",
      attendees: 120,
      maxAttendees: 200,
      type: "Seminar",
      tags: ["Technology", "Digital"],
      isToday: false,
      hasActiveCalendar: true,
      schedule: [
        { time: "10:00 AM", activity: "Welcome & Digital Trends Overview" },
        { time: "10:30 AM", activity: "Case Study: Successful Transformations" },
        { time: "11:00 AM", activity: "Interactive Demo: New Technologies" },
        { time: "11:30 AM", activity: "Q&A Session" },
        { time: "12:00 PM", activity: "Wrap-up & Resource Sharing" }
      ]
    }
  ];

  const handleRegister = (eventId: number) => {
    setCurrentEventId(eventId);
    setIsRegistrationOpen(true);
  };

  const handleScheduleEvent = (eventId: number) => {
    setCurrentEventId(eventId);
    setIsScheduleDialogOpen(true);
  };

  const handleScheduleSubmit = () => {
    if (currentEventId && selectedDate) {
      const eventTitle = upcomingEvents.find(e => e.id === currentEventId)?.title;
      toast({
        title: "Event Scheduled",
        description: `${eventTitle} has been added to your calendar for ${selectedDate.toLocaleDateString()}.`,
      });
      setIsScheduleDialogOpen(false);
      setCurrentEventId(null);
    }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEventId && registrationData.name && registrationData.email) {
      setRegisteredEvents(prev => [...prev, currentEventId]);
      const eventTitle = upcomingEvents.find(e => e.id === currentEventId)?.title;
      
      toast({
        title: "Registration Complete",
        description: `You have been successfully registered for ${eventTitle}.`,
      });
      
      setIsRegistrationOpen(false);
      setRegistrationData({ name: "", email: "" });
      setCurrentEventId(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-8 w-8 text-blue-600 animate-pulse" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Upcoming Events {currentYear}</h1>
                <p className="text-muted-foreground mt-1">Join professional development events and workshops</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-blue-600 font-medium">
                Today: {today.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map(event => (
            <Card key={event.id} className={`hover:shadow-lg transition-shadow ${event.isToday ? 'border-blue-500 bg-blue-50/50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      {event.title}
                      {event.isToday && <Badge className="bg-blue-600">Today</Badge>}
                    </CardTitle>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className={`h-5 w-5 ${
                      event.isToday 
                        ? 'text-blue-600 animate-bounce' 
                        : event.hasActiveCalendar 
                          ? 'text-green-600 animate-pulse' 
                          : 'text-muted-foreground'
                    }`} />
                    {event.hasActiveCalendar && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleScheduleEvent(event.id)}
                        className="p-2 h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {event.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className={`h-4 w-4 ${
                      event.isToday 
                        ? 'text-blue-600' 
                        : event.hasActiveCalendar 
                          ? 'text-green-600 animate-pulse' 
                          : 'text-muted-foreground'
                    }`} />
                    <span className={event.isToday ? 'font-semibold text-blue-600' : ''}>
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                </div>

                {event.schedule && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Schedule
                    </h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {event.schedule.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs bg-gray-50 p-2 rounded">
                          <Clock className="h-3 w-3 text-gray-500 flex-shrink-0" />
                          <span className="font-medium text-gray-700">{item.time}</span>
                          <span className="text-gray-600">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  className="w-full"
                  disabled={registeredEvents.includes(event.id)}
                  onClick={() => handleRegister(event.id)}
                >
                  {registeredEvents.includes(event.id) ? "Registered" : "Register"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Registration Dialog - keep existing code */}
        <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Event Registration</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Name</Label>
                <Input
                  id="reg-name"
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Complete Registration
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Schedule Dialog */}
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleScheduleSubmit} className="flex-1">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Events;
