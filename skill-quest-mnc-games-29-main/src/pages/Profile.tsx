
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Calendar, Edit, Save, Upload, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@company.com",
    department: "Development",
    joinDate: "May 2025"
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profileData');
    const savedImage = localStorage.getItem('profileImage');
    
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
    }
    
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profile));
  }, [profile]);

  // Save profile image to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('profileImage', profileImage);
  }, [profileImage]);

  const achievements = [
    { name: "First Draw", description: "Completed first drawing in Scribble Fun", icon: "🎨" },
    { name: "Team Player", description: "Participated in 10 team games", icon: "👥" },
    { name: "Quick Guesser", description: "Guessed 5 drawings correctly in under 30 seconds", icon: "⚡" },
    { name: "Creative Mind", description: "Had drawings guessed correctly 20 times", icon: "💡" }
  ];

  const gameStats = [
    { game: "Scribble Fun", played: 15, won: 8, accuracy: "87%" },
    { game: "Team Sudoku", played: 8, won: 6, accuracy: "75%" },
    { game: "Bingo Challenge", played: 12, won: 9, accuracy: "92%" },
    { game: "Business Simulation", played: 5, won: 3, accuracy: "68%" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        toast({
          title: "Profile Image Updated",
          description: "Your profile image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("/placeholder.svg");
    toast({
      title: "Profile Image Removed",
      description: "Your profile image has been removed.",
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account and view your progress</p>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </header>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Game Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profileImage} />
                      <AvatarFallback className="text-lg">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute -bottom-2 -right-2 flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={triggerFileInput}
                          title="Upload Image"
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                        {profileImage !== "/placeholder.svg" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={handleRemoveImage}
                            title="Remove Image"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Badge variant="secondary">{profile.department}</Badge>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {profile.joinDate}
                    </p>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    {/* <label className="text-sm font-medium">Department</label> */}
                    {/* <Input
                      value={profile.department}
                      onChange={(e) => setProfile(prev => ({ ...prev, department: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    /> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Game Statistics</CardTitle>
                <CardDescription>Your performance across different training games</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gameStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{stat.game}</h4>
                        <p className="text-sm text-muted-foreground">
                          {stat.played} games played • {stat.won} won
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{stat.accuracy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
