
import { ReactNode, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Award, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Gamepad, 
  User,
  LayoutDashboard, 
  Settings, 
  Trophy,
  BookText, 
  BriefcaseBusiness, 
  FileText, 
  MessageSquare, 
  Users,
  Video,
  Calendar,
  Pencil,
  Grid3X3
} from "lucide-react";

type NavLinkProps = {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
};

const NavLink = ({ to, children, icon, onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Scroll to active item when it becomes active
  useEffect(() => {
    if (isActive && linkRef.current) {
      linkRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [isActive]);

  return (
    <Link
      ref={linkRef}
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors w-full",
        isActive
          ? "bg-blue-700/70 text-white"
          : "text-blue-100 hover:bg-blue-700/40 hover:text-white"
      )}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-blue-600 text-white flex flex-col transition-all duration-300 ease-in-out fixed md:relative z-10 h-screen",
          sidebarCollapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        {/* Sidebar Header */}
        <div className="border-b border-blue-500/50 h-16 flex items-center px-4 justify-between flex-shrink-0">
          <Link to="/" className={cn("flex items-center gap-2 font-bold", sidebarCollapsed && "hidden")}>
            <Gamepad className="h-6 w-6 text-white" />
            <span className="text-sm md:text-base">MNC Training</span>
          </Link>
          {sidebarCollapsed && (
            <Link to="/" className="mx-auto">
              <Gamepad className="h-6 w-6 text-white" />
            </Link>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md hover:bg-blue-700/50 focus:outline-none"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation with ScrollArea */}
        <ScrollArea className="flex-1">
          <div className="p-3 flex flex-col gap-1">
            <NavLink to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />}>
              Dashboard
            </NavLink>
            
            <div className={cn("mt-6 mb-2 px-3 text-xs font-semibold uppercase text-blue-300", sidebarCollapsed && "hidden")}>
              Live & Community
            </div>
            <NavLink to="/live-sessions" icon={<Video className="h-5 w-5" />}>
              {!sidebarCollapsed && "Live Sessions"}
            </NavLink>
            <NavLink to="/teams" icon={<Users className="h-5 w-5" />}>
              {!sidebarCollapsed && "Teams"}
            </NavLink>
            <NavLink to="/community" icon={<MessageSquare className="h-5 w-5" />}>
              {!sidebarCollapsed && "Community Rooms"}
            </NavLink>
            <NavLink to="/events" icon={<Calendar className="h-5 w-5" />}>
              {!sidebarCollapsed && "Upcoming Events"}
            </NavLink>
            
            <div className={cn("mt-6 mb-2 px-3 text-xs font-semibold uppercase text-blue-300", sidebarCollapsed && "hidden")}>
              Training Games
            </div>
            <NavLink to="/games/business-simulation" icon={<BriefcaseBusiness className="h-5 w-5" />}>
              {!sidebarCollapsed && "Business Simulation"}
            </NavLink>
            <NavLink to="/games/crisis-management" icon={<FileText className="h-5 w-5" />}>
              {!sidebarCollapsed && "Crisis Management"}
            </NavLink>
            <NavLink to="/games/negotiation" icon={<MessageSquare className="h-5 w-5" />}>
              {!sidebarCollapsed && "Sales & Negotiation"}
            </NavLink>
            <NavLink to="/games/leadership" icon={<Users className="h-5 w-5" />}>
              {!sidebarCollapsed && "Leadership"}
            </NavLink>
            <NavLink to="/games/ai-learning" icon={<BookOpen className="h-5 w-5" />}>
              {!sidebarCollapsed && "AI Learning"}
            </NavLink>
            <NavLink to="/games/scribble" icon={<Pencil className="h-5 w-5" />}>
              {!sidebarCollapsed && "Scribble Fun"}
            </NavLink>
            <NavLink to="/games/bingo" icon={<Grid3X3 className="h-5 w-5" />}>
              {!sidebarCollapsed && "Bingo Challenge"}
            </NavLink>
            <NavLink to="/games/team-sudoku" icon={<Trophy className="h-5 w-5" />}>
              {!sidebarCollapsed && "Team Sudoku"}
            </NavLink>
            
            <div className={cn("mt-6 mb-2 px-3 text-xs font-semibold uppercase text-blue-300", sidebarCollapsed && "hidden")}>
              Account
            </div>
            <NavLink to="/profile" icon={<User className="h-5 w-5" />}>
              {!sidebarCollapsed && "Profile"}
            </NavLink>
            <NavLink to="/achievements" icon={<Trophy className="h-5 w-5" />}>
              {!sidebarCollapsed && "Achievements"}
            </NavLink>
            <NavLink to="/settings" icon={<Settings className="h-5 w-5" />}>
              {!sidebarCollapsed && "Settings"}
            </NavLink>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "md:ml-[70px]" : "md:ml-[240px]"
      )}>
        <header className="border-b bg-card h-16 sticky top-0 z-10 flex items-center px-4 md:px-6">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium">MNC Training Games</h2>
            
            {/* Mobile menu button - visible only on small screens */}
            <button className="block md:hidden p-2 rounded-md hover:bg-secondary">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 container py-6 md:py-8 px-4 md:px-6">
          {children}
        </main>

        <footer className="border-t bg-card py-4 px-4 md:px-6">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MNC Training Games. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};
