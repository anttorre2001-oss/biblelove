import { useTheme, themeProfiles, type ThemeProfile } from "@/hooks/useTheme";
import { useTranslation, TRANSLATIONS } from "@/hooks/useTranslation";
import { useReadingPreferences } from "@/hooks/useReadingPreferences";
import { ReminderSettings } from "@/components/ReminderSettings";
import { useReminders } from "@/hooks/useReminders";
import { cn } from "@/lib/utils";
import { Settings, Palette, Globe, Type, Bell, RotateCcw, Sun, Moon } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme, isDark, toggleDark } = useTheme();
  const { translationId, setTranslationId } = useTranslation();
  const { prefs, updatePref, resetPrefs } = useReadingPreferences();
  const reminders = useReminders();

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Customize your reading experience</p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <section className="mb-8">
          <button
            onClick={toggleDark}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
              <div className="text-left">
                <p className="font-medium text-sm text-foreground">{isDark ? "Dark Mode" : "Light Mode"}</p>
                <p className="text-xs text-muted-foreground">Toggle between light and dark appearance</p>
              </div>
            </div>
            <div className={cn(
              "w-12 h-7 rounded-full relative transition-colors",
              isDark ? "bg-primary" : "bg-muted"
            )}>
              <div className={cn(
                "absolute top-0.5 h-6 w-6 rounded-full bg-card shadow-sm transition-transform",
                isDark ? "translate-x-5" : "translate-x-0.5"
              )} />
            </div>
          </button>
        </section>

        {/* Theme Profiles */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-primary" />
            <h2 className="font-serif text-lg font-semibold">Color Theme</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(themeProfiles) as ThemeProfile[]).map((key) => {
              const profile = themeProfiles[key];
              const active = theme === key;
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                    active
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/30 hover:bg-muted/50"
                  )}
                >
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-muted border border-border flex-shrink-0">
                    <span className="text-lg">{profile.emoji}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{profile.label}</p>
                    <p className="text-xs text-muted-foreground">{profile.description}</p>
                  </div>
                  {active && <span className="ml-auto text-primary text-sm font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* Translation / Language */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-primary" />
            <h2 className="font-serif text-lg font-semibold">Bible Translation</h2>
          </div>
          <div className="space-y-2">
            {TRANSLATIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTranslationId(t.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                  translationId === t.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-muted/50"
                )}
              >
                <span className="text-lg">{t.languageFlag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.language}</p>
                </div>
                {translationId === t.id && <span className="text-primary text-sm flex-shrink-0">✓</span>}
              </button>
            ))}
          </div>
        </section>

        {/* Reading Preferences */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-primary" />
              <h2 className="font-serif text-lg font-semibold">Reading Preferences</h2>
            </div>
            <button onClick={resetPrefs} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Font Size: {prefs.fontSize}px</label>
              <input type="range" min={14} max={28} step={1} value={prefs.fontSize} onChange={(e) => updatePref("fontSize", Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Small</span><span>Large</span></div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Line Spacing: {prefs.lineHeight.toFixed(1)}</label>
              <input type="range" min={1.4} max={2.6} step={0.1} value={prefs.lineHeight} onChange={(e) => updatePref("lineHeight", Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Compact</span><span>Spacious</span></div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Font Family</label>
              <div className="flex gap-2">
                {(["serif", "sans", "mono"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => updatePref("fontFamily", f)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                      prefs.fontFamily === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
                      f === "serif" && "font-serif",
                      f === "sans" && "font-sans",
                      f === "mono" && "font-mono"
                    )}
                  >
                    {f === "serif" ? "Serif" : f === "sans" ? "Sans" : "Mono"}
                  </button>
                ))}
              </div>
            </div>
            {/* Preview */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2">Preview</p>
              <p
                className={cn("text-foreground", prefs.fontFamily === "serif" ? "font-serif" : prefs.fontFamily === "sans" ? "font-sans" : "font-mono")}
                style={{ fontSize: `${prefs.fontSize}px`, lineHeight: prefs.lineHeight }}
              >
                For God so loved the world, that he gave his only begotten Son, that whoever believes in him should not perish, but have eternal life.
              </p>
            </div>
          </div>
        </section>

        {/* Reminders */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="font-serif text-lg font-semibold">Reminders</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <ReminderSettings />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;