import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const REMINDER_KEY = "bible-reminder-settings";
const LAST_READ_KEY = "bible-last-read-date";

interface ReminderSettings {
  enabled: boolean;
  hour: number; // 0-23
  minute: number; // 0-59
}

function loadSettings(): ReminderSettings {
  try {
    const stored = localStorage.getItem(REMINDER_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<ReminderSettings>;
      return {
        enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : false,
        hour: typeof parsed.hour === "number" ? parsed.hour : 8,
        minute: typeof parsed.minute === "number" ? parsed.minute : 0,
      };
    }
  } catch {
    // fall through to default
  }
  return { enabled: false, hour: 8, minute: 0 };
}

function loadLastRead(): string {
  try {
    return localStorage.getItem(LAST_READ_KEY) ?? "";
  } catch {
    return "";
  }
}

export function useReminders() {
  const [settings, setSettings] = useState<ReminderSettings>(loadSettings);
  const [lastReadDate, setLastReadDate] = useState<string>(loadLastRead);
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  useEffect(() => {
    try {
      localStorage.setItem(REMINDER_KEY, JSON.stringify(settings));
    } catch {
      // ignore quota / privacy errors
    }
  }, [settings]);

  const requestPermission = useCallback(async () => {
    if (typeof Notification === "undefined") return "denied" as const;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const enableReminders = useCallback(async () => {
    const perm = await requestPermission();
    if (perm === "granted") {
      setSettings((prev) => ({ ...prev, enabled: true }));
    }
    return perm;
  }, [requestPermission]);

  const disableReminders = useCallback(() => {
    setSettings((prev) => ({ ...prev, enabled: false }));
  }, []);

  const setReminderTime = useCallback((hour: number, minute: number) => {
    setSettings((prev) => ({ ...prev, hour, minute }));
  }, []);

  const markTodayAsRead = useCallback(() => {
    const today = new Date().toDateString();
    try {
      localStorage.setItem(LAST_READ_KEY, today);
    } catch {
      // ignore
    }
    setLastReadDate(today);
  }, []);

  const hasReadToday = useMemo(
    () => lastReadDate === new Date().toDateString(),
    [lastReadDate]
  );

  const shouldShowNudge = !hasReadToday;

  // Use a ref so the notification interval can read the latest "read today"
  // status without re-subscribing on every change.
  const lastReadRef = useRef(lastReadDate);
  useEffect(() => {
    lastReadRef.current = lastReadDate;
  }, [lastReadDate]);

  // Schedule browser notification
  useEffect(() => {
    if (!settings.enabled || permission !== "granted") return;

    const checkAndNotify = () => {
      const now = new Date();
      if (
        now.getHours() === settings.hour &&
        now.getMinutes() === settings.minute &&
        lastReadRef.current !== now.toDateString()
      ) {
        new Notification("📖 Daily Bible Reading", {
          body: "Your reading is waiting for you. Take a peaceful moment with God's Word today.",
          icon: "/favicon.ico",
        });
      }
    };

    const interval = setInterval(checkAndNotify, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [settings, permission]);

  return {
    settings,
    permission,
    enableReminders,
    disableReminders,
    setReminderTime,
    markTodayAsRead,
    shouldShowNudge,
    hasReadToday,
  };
}
