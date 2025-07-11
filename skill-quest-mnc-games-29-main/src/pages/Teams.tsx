
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Plus, Trophy, Target, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Teams = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Marketing Mavericks",
      description: "Creative minds working together to boost brand awareness",
      members: 8,
      progress: 75,
      status: "Active",
      achievements: 12,
      avatar: "/placeholder.svg",
      membersList: [
        { name: "Sarah Johnson", avatar: "/placeholder.svg", role: "Team Lead" },
        { name: "Mike Chen", avatar: "/placeholder.svg", role: "Designer" },
        { name: "Emily Davis", avatar: "/placeholder.svg", role: "Content Writer" },
      ],
      currentProject: "Q4 Campaign Strategy",
      deadline: "Dec 15, 2024"
    },
    {
      id: 2,
      name: "Tech Innovators",
      description: "Building the future with cutting-edge technology solutions",
      members: 12,
      progress: 60,
      status: "Active",
      achievements: 18,
      avatar: "/placeholder.svg",
      membersList: [
        { name: "Alex Rodriguez", avatar: "/placeholder.svg", role: "Lead Developer" },
        { name: "Lisa Wang", avatar: "/placeholder.svg", role: "UX Designer" },
        { name: "James Wilson", avatar: "/placeholder.svg", role: "DevOps Engineer" },
      ],
      currentProject: "Mobile App Redesign",
      deadline: "Jan 20, 2025"
    },
    {
      id: 3,
      name: "Sales Champions",
      description: "Driving revenue growth through strategic partnerships",
      members: 6,
      progress: 90,
      status: "Leading",
      achievements: 25,
      avatar: "/placeholder.svg",
      membersList: [
        { name: "Robert Kim", avatar: "/placeholder.svg", role: "Sales Manager" },
        { name: "Jennifer Lopez", avatar: "/placeholder.svg", role: "Account Executive" },
        { name: "David Brown", avatar: "/placeholder.svg", role: "Business Analyst" },
      ],
      currentProject: "Enterprise Client Acquisition",
      deadline: "Nov 30, 2024"
    }
  ]);

  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isTeamChatOpen, setIsTeamChatOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [newTeam, setNewTeam] = useState({ name: "", description: "" });
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Sarah Johnson", message: "Great work on the campaign everyone!", time: "2:30 PM", avatar: "/placeholder.svg" },
    { id: 2, sender: "Mike Chen", message: "The new designs are looking fantastic", time: "2:45 PM", avatar: "/placeholder.svg" },
    { id: 3, sender: "Emily Davis", message: "Content is ready for review", time: "3:00 PM", avatar: "/placeholder.svg" }
  ]);
  const { toast } = useToast();

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeam.name && newTeam.description) {
      const team = {
        id: teams.length + 1,
        name: newTeam.name,
        description: newTeam.description,
        members: 1,
        progress: 0,
        status: "New",
        achievements: 0,
        avatar: "/placeholder.svg",
        membersList: [
          { name: "You", avatar: "/placeholder.svg", role: "Team Lead" }
        ],
        currentProject: "Getting Started",
        deadline: "TBD"
      };
      
      setTeams([...teams, team]);
      setNewTeam({ name: "", description: "" });
      setIsCreateTeamOpen(false);
      
      toast({
        title: "Team Created",
        description: `${team.name} has been successfully created!`,
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "/placeholder.svg"
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage("");
    }
  };

  const openTeamChat = (team: any) => {
    setSelectedTeam(team);
    setIsTeamChatOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Leading": return "bg-green-100 text-green-800";
      case "Active": return "bg-blue-100 text-blue-800";
      case "New": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Teams</h1>
            <p className="text-muted-foreground mt-1">Collaborate and achieve goals together</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isTeamChatOpen} onOpenChange={setIsTeamChatOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Team Chat
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-blue-600">
                    {selectedTeam?.name || "Team"} Chat
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto space-y-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className="flex gap-2">
                        <Avatar className="h-8 w-8 border-2 border-blue-200">
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {msg.sender[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-blue-800">{msg.sender}</span>
                            <span className="text-xs text-blue-600">{msg.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 bg-white p-2 rounded-lg border border-blue-100">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border-blue-300 focus:border-blue-500"
                    />
                    <Button 
                      type="submit" 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      value={newTeam.name}
                      onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter team name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-description">Description</Label>
                    <Textarea
                      id="team-description"
                      value={newTeam.description}
                      onChange={(e) => setNewTeam(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your team's purpose and goals"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Team
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={team.avatar} />
                      <AvatarFallback>
                        <Users className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <Badge className={getStatusColor(team.status)}>
                        {team.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {team.description}
                </CardDescription>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{team.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span>{team.achievements} achievements</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Progress
                    </span>
                    <span className="font-medium">{team.progress}%</span>
                  </div>
                  <Progress value={team.progress} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Current Project:</span>
                  </div>
                  <p className="text-muted-foreground ml-6">{team.currentProject}</p>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Deadline:</span>
                    <span className="text-muted-foreground">{team.deadline}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Team Members</h4>
                  <div className="flex -space-x-2">
                    {team.membersList.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {team.members > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{team.members - 3}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                    onClick={() => openTeamChat(team)}
                  >
                    Join Chat
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
