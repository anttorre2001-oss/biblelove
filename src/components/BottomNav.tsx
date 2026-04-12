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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-around lg:justify-center lg:gap-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:pb-2 lg:py-1.5">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => handleNav(tab.path)}
              className={cn(
                "flex flex-col lg:flex-row items-center gap-0.5 lg:gap-1.5 px-3 lg:px-4 py-1 lg:py-2 rounded-lg transition-colors",
                active ? "text-primary lg:bg-primary/10" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("h-5 w-5", active && "fill-primary/20")} />
              <span className="text-[10px] lg:text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
