
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Clock, 
  Users, 
  Calendar,
  TrendingUp,
  BookOpen,
  Target,
  Star,
  Award,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get first name from full name
  const firstName = user?.name.split(' ')[0] || 'User';

  const recentActivities = [
    { game: "Business Simulation", score: 85, date: "2 hours ago", status: "completed" },
    { game: "Crisis Management", score: 92, date: "1 day ago", status: "completed" },
    { game: "Leadership Game", score: 78, date: "3 days ago", status: "completed" }
  ];

  const upcomingEvents = [
    { title: "Team Building Workshop", date: "Tomorrow 2:00 PM", type: "workshop" },
    { title: "Quarterly Review", date: "Dec 15, 10:00 AM", type: "meeting" },
    { title: "Skills Assessment", date: "Dec 20, 3:00 PM", type: "assessment" }
  ];

  const skillProgress = [
    { skill: "Leadership", progress: 75, change: "+5%" },
    { skill: "Problem Solving", progress: 68, change: "+12%" },
    { skill: "Communication", progress: 82, change: "+3%" },
    { skill: "Teamwork", progress: 90, change: "+8%" }
  ];

  const overallProgress = 45;

  // Course data for pie chart visualization matching the attached images
  const courseData = [
    { name: "Business Simulation", progress: 75, color: "bg-blue-500", module: "Module 3 of 5" },
    { name: "Crisis Management", progress: 45, color: "bg-red-500", module: "Module 2 of 4" },
    { name: "Negotiation", progress: 60, color: "bg-green-500", module: "Module 3 of 5" },
    { name: "Leadership", progress: 30, color: "bg-yellow-500", module: "Module 1 of 3" },
    { name: "AI Learning", progress: 15, color: "bg-purple-500", module: "Module 1 of 6" }
  ];

  // Weekly training hours data matching the attached chart
  const weeklyData = [
    { day: "Mon", hours: 1.5 },
    { day: "Tue", hours: 2.2 },
    { day: "Wed", hours: 0.5 },
    { day: "Thu", hours: 3.1 },
    { day: "Fri", hours: 1.0 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  // Recent achievements with icons and dates
  const recentAchievements = [
    { 
      name: "First Simulation", 
      description: "Business Simulation", 
      icon: "🏆", 
      date: "Today" 
    },
    { 
      name: "Negotiation Expert", 
      description: "Sales & Negotiation", 
      icon: "🥇", 
      date: "Yesterday" 
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header with Personalized Message */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">MNC Training Games</h1>
          
          {/* Personalized Welcome Message */}
          <div className="bg-blue-700/50 rounded-lg p-4 mb-4">
            <h2 className="text-2xl font-bold mb-2">Welcome, {firstName}!</h2>
            <p className="text-blue-100 text-lg">
              Ready to continue your learning journey? Let's make today productive!
            </p>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Overall Progress</span>
              <span className="text-lg font-bold">{overallProgress}%</span>
            </div>
            <div className="w-full bg-blue-700 rounded-full h-4">
              <div 
                className="bg-yellow-500 h-4 rounded-full transition-all duration-300" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Combined Learning & Course Progress Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning & Course Progress
                </CardTitle>
                <CardDescription>Your current courses and overall learning progress</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Courses Progress */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg mb-4">Current Courses</h3>
                
                {/* Top 2 Active Courses */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">Business Simulation</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Module 3 of 5</span>
                        <span className="font-medium">75% complete</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-red-500 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
                      </div>
                      <span className="font-semibold">Crisis Management</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Module 2 of 4</span>
                        <span className="font-medium">45% complete</span>
                      </div>
                      <Progress value={45} className="h-3" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link to="/achievements">
                    <Button variant="link" className="text-blue-600">
                      View all courses
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Course Progress Visualization */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg mb-4">All Courses Overview</h3>
                
                {/* Circular Progress Visualization */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6"/>
                      
                      {/* Progress segments */}
                      <circle 
                        cx="50" cy="50" r="35" fill="none" 
                        stroke="#3b82f6" strokeWidth="6"
                        strokeDasharray={`${75 * 2.2} 220`}
                        strokeDashoffset="0"
                        className="transition-all duration-300"
                      />
                      <circle 
                        cx="50" cy="50" r="35" fill="none" 
                        stroke="#ef4444" strokeWidth="6"
                        strokeDasharray={`${45 * 2.2} 220`}
                        strokeDashoffset={`-${75 * 2.2}`}
                        className="transition-all duration-300"
                      />
                      <circle 
                        cx="50" cy="50" r="35" fill="none" 
                        stroke="#10b981" strokeWidth="6"
                        strokeDasharray={`${60 * 2.2} 220`}
                        strokeDashoffset={`-${(75 + 45) * 2.2}`}
                        className="transition-all duration-300"
                      />
                      <circle 
                        cx="50" cy="50" r="35" fill="none" 
                        stroke="#f59e0b" strokeWidth="6"
                        strokeDasharray={`${30 * 2.2} 220`}
                        strokeDashoffset={`-${(75 + 45 + 60) * 2.2}`}
                        className="transition-all duration-300"
                      />
                      <circle 
                        cx="50" cy="50" r="35" fill="none" 
                        stroke="#8b5cf6" strokeWidth="6"
                        strokeDasharray={`${15 * 2.2} 220`}
                        strokeDashoffset={`-${(75 + 45 + 60 + 30) * 2.2}`}
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  {courseData.map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${course.color.replace('bg-', 'bg-')}`}></div>
                        <span className="text-sm font-medium">{course.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Training Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Weekly Training Hours
            </CardTitle>
            <CardDescription>Your daily training activity this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-64 gap-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full flex justify-center">
                    <div 
                      className="bg-blue-500 rounded-t-md transition-all duration-300 hover:opacity-80 w-12"
                      style={{ height: `${(day.hours / maxHours) * 200}px` }}
                    />
                  </div>
                  <div className="text-sm font-medium mt-2 text-gray-600">
                    {day.hours}h
                  </div>
                  <div className="text-sm font-medium mt-1 text-gray-500">
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.date}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/achievements">
                <Button variant="outline" className="w-full">
                  View All Achievements
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Games Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Events</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Participated</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+7% improvement</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
