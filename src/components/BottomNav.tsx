import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Search, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReadingPlan } from "@/hooks/useReadingPlan";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/read", icon: BookOpen, label: "Read" },
  { path: "/search", icon: Search, label: "Search" },
  { path: "/collection", icon: Library, label: "Collection" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentDay } = useReadingPlan();

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => handleNav(tab.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("h-5 w-5", active && "fill-primary/20")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
