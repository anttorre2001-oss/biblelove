import { useState, useEffect, useCallback } from "react";

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
    if (stored) return JSON.parse(stored);
  } catch {}
  return { enabled: false, hour: 8, minute: 0 };
}

export function useReminders() {
  const [settings, setSettings] = useState<ReminderSettings>(loadSettings);
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  useEffect(() => {
    localStorage.setItem(REMINDER_KEY, JSON.stringify(settings));
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
    localStorage.setItem(LAST_READ_KEY, new Date().toDateString());
  }, []);

  const hasReadToday = useCallback(() => {
    return localStorage.getItem(LAST_READ_KEY) === new Date().toDateString();
  }, []);

  // Check if we should show a gentle nudge
  const shouldShowNudge = !hasReadToday();

  // Schedule browser notification
  useEffect(() => {
    if (!settings.enabled || permission !== "granted") return;

    const checkAndNotify = () => {
      const now = new Date();
      if (
        now.getHours() === settings.hour &&
        now.getMinutes() === settings.minute &&
        !hasReadToday()
      ) {
        new Notification("📖 Daily Bible Reading", {
          body: "Your reading is waiting for you. Take a peaceful moment with God's Word today.",
          icon: "/favicon.ico",
        });
      }
    };

    const interval = setInterval(checkAndNotify, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [settings, permission, hasReadToday]);

  return {
    settings,
    permission,
    enableReminders,
    disableReminders,
    setReminderTime,
    markTodayAsRead,
    shouldShowNudge,
    hasReadToday: hasReadToday(),
  };
}
