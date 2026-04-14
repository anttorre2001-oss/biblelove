import { Bell, BellOff } from "lucide-react";
import { useReminders } from "@/hooks/useReminders";
import { cn } from "@/lib/utils";

export function ReminderSettings() {
  const {
    settings,
    permission,
    enableReminders,
    disableReminders,
    setReminderTime,
  } = useReminders();

  const handleToggle = async () => {
    if (settings.enabled) {
      disableReminders();
    } else {
      const result = await enableReminders();
      if (result === "denied") {
        alert("Please enable notifications in your browser settings to receive reminders.");
      }
    }
  };

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-warm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              settings.enabled ? "bg-primary/10" : "bg-muted"
            )}
          >
            {settings.enabled ? (
              <Bell className="h-4 w-4 text-primary" />
            ) : (
              <BellOff className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-serif text-sm font-semibold">Daily Reminder</h3>
            <p className="text-xs text-muted-foreground">
              {settings.enabled
                ? `Set for ${formatTime(settings.hour, settings.minute)}`
                : "Get a gentle nudge to read"}
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
            settings.enabled ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-card shadow-sm transition-transform duration-200",
              settings.enabled ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>

      {settings.enabled && (
        <div className="mt-4 flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Time:</label>
          <input
            type="time"
            value={`${settings.hour.toString().padStart(2, "0")}:${settings.minute
              .toString()
              .padStart(2, "0")}`}
            onChange={(e) => {
              const [h, m] = e.target.value.split(":").map(Number);
              setReminderTime(h, m);
            }}
            className="rounded-md border border-border bg-background px-2 py-1 text-sm"
          />
        </div>
      )}

      {permission === "denied" && (
        <p className="mt-2 text-xs text-destructive">
          Notifications are blocked. Please enable them in your browser settings.
        </p>
      )}
    </div>
  );
}
