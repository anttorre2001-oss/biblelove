import { Home, BookOpen, Search, Library, GraduationCap, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReadingPlan } from "@/hooks/useReadingPlan";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/read", icon: BookOpen, label: "Read" },
  { path: "/search", icon: Search, label: "Search" },
  { path: "/collection", icon: Library, label: "Collection" },
  { path: "/theology", icon: GraduationCap, label: "Theology" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { currentDay } = useReadingPlan();
  const { isDark, toggleDark } = useTheme();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => {
    if (path === "/read") {
      navigate(`/read/${currentDay}`);
    } else {
      navigate(path);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-4 flex flex-col h-full">
        {!collapsed && (
          <div className="px-4 pb-4 border-b border-border mb-2">
            <h1 className="font-serif text-lg font-bold text-foreground">📖 Bible in a Year</h1>
          </div>
        )}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      onClick={() => handleNav(item.path)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                        active
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 flex-shrink-0", active && "text-primary")} />
                      {!collapsed && <span className="text-sm">{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Dark mode toggle at bottom */}
        <div className="p-3 border-t border-border">
          <button
            onClick={toggleDark}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isDark ? <Moon className="h-5 w-5 flex-shrink-0" /> : <Sun className="h-5 w-5 flex-shrink-0" />}
            {!collapsed && <span className="text-sm">{isDark ? "Dark Mode" : "Light Mode"}</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
