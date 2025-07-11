
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Users, Plus, Search, Hash, Lock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [joinedRooms, setJoinedRooms] = useState<number[]>([1, 3]);
  const { toast } = useToast();

  const communityRooms = [
    {
      id: 1,
      name: "General Discussion",
      description: "Open discussion for all company topics",
      members: 145,
      type: "public" as const,
      isActive: true,
      category: "General",
      lastMessage: "Great session today!",
      lastMessageTime: "2 min ago"
    },
    {
      id: 2,
      name: "Business Strategy",
      description: "Strategic planning and business discussions",
      members: 67,
      type: "private" as const,
      isActive: false,
      category: "Business",
      lastMessage: "Q4 planning meeting notes",
      lastMessageTime: "1 hour ago"
    },
    {
      id: 3,
      name: "Tech Innovation",
      description: "Latest technology trends and innovations",
      members: 89,
      type: "public" as const,
      isActive: true,
      category: "Technology",
      lastMessage: "AI implementation ideas",
      lastMessageTime: "15 min ago"
    },
    {
      id: 4,
      name: "Training & Development",
      description: "Share learning resources and training updates",
      members: 112,
      type: "public" as const,
      isActive: false,
      category: "Learning",
      lastMessage: "New course recommendations",
      lastMessageTime: "3 hours ago"
    },
    {
      id: 5,
      name: "Leadership Circle",
      description: "Executive and management discussions",
      members: 23,
      type: "private" as const,
      isActive: false,
      category: "Leadership",
      lastMessage: "Team restructuring plans",
      lastMessageTime: "1 day ago"
    },
    {
      id: 6,
      name: "Project Collaboration",
      description: "Cross-team project coordination",
      members: 78,
      type: "public" as const,
      isActive: true,
      category: "Projects",
      lastMessage: "Sprint review completed",
      lastMessageTime: "30 min ago"
    }
  ];

  const filteredRooms = communityRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinRoom = (roomId: number) => {
    if (joinedRooms.includes(roomId)) {
      setJoinedRooms(prev => prev.filter(id => id !== roomId));
      toast({
        title: "Left Room",
        description: "You have left the community room.",
      });
    } else {
      setJoinedRooms(prev => [...prev, roomId]);
      toast({
        title: "Joined Room",
        description: "Welcome to the community room!",
      });
    }
  };

  const getRoomIcon = (type: "public" | "private") => {
    return type === "private" ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "General": "bg-blue-100 text-blue-800",
      "Business": "bg-green-100 text-green-800",
      "Technology": "bg-purple-100 text-purple-800",
      "Learning": "bg-orange-100 text-orange-800",
      "Leadership": "bg-red-100 text-red-800",
      "Projects": "bg-indigo-100 text-indigo-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Community Rooms</h1>
            <p className="text-muted-foreground mt-1">Connect and collaborate with your colleagues</p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(room => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Hash className="h-5 w-5 text-muted-foreground" />
                      {room.name}
                      {getRoomIcon(room.type)}
                    </CardTitle>
                    <Badge className={getCategoryColor(room.category)}>
                      {room.category}
                    </Badge>
                  </div>
                  {room.isActive && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {room.description}
                </CardDescription>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{room.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{room.type}</span>
                  </div>
                </div>

                {/* Last Message Preview */}
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {room.lastMessage}
                  </p>
                  <p className="text-xs text-gray-500">
                    {room.lastMessageTime}
                  </p>
                </div>

                <Button 
                  className="w-full"
                  variant={joinedRooms.includes(room.id) ? "secondary" : "default"}
                  onClick={() => handleJoinRoom(room.id)}
                >
                  {joinedRooms.includes(room.id) ? "Leave Room" : "Join Room"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or create a new room.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Active Conversations */}
        {joinedRooms.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Your Active Rooms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communityRooms
                  .filter(room => joinedRooms.includes(room.id))
                  .map(room => (
                    <div key={room.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Hash className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{room.name}</h4>
                          <p className="text-sm text-muted-foreground">{room.lastMessage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {room.members}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{room.lastMessageTime}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Community;
