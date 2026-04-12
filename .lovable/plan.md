

## Test Results Summary

**Working correctly:**
- Splash screen with "Begin Your Journey" button
- Dashboard with greeting, day counter, progress ring, weekly tracker, daily verse, calendar
- Dark mode toggle (persists across pages)
- Reading page loads Genesis 1-3 with chapter separators
- Context popup ("Creation & The Fall") appears
- Search page finds John 3:16 correctly
- Browse by Book with all 66 books
- Mobile responsive layout looks polished
- Page transitions animate smoothly
- Header icons for highlighter, bookmark, settings, notes panel all present

**Issues found:**
1. **Search page ignores dark mode** -- no ThemeToggle on SearchPage, and the page uses hardcoded light backgrounds instead of theme-aware CSS variables
2. **No service worker** -- manifest.json exists but no SW registered, so the PWA won't actually install or work offline
3. **No bottom navigation on mobile** -- users must use the back arrow to navigate; no persistent nav bar

---

## Proposed Upgrades

### 1. Fix Search Page Dark Mode
Add ThemeToggle to SearchPage header and ensure all backgrounds/text use CSS theme variables instead of hardcoded colors.

### 2. Add Service Worker for True PWA
Register a basic service worker in `main.tsx` using `vite-plugin-pwa` or a manual SW that caches the app shell, enabling offline access and "Add to Home Screen" install prompts.

### 3. Add Mobile Bottom Navigation Bar
A sticky bottom bar with 4 tabs: Home, Read, Search, Bookmarks -- visible on mobile viewports for easy one-thumb navigation.

### 4. Bookmarks Page
A dedicated `/bookmarks` route showing all saved bookmarks grouped by book, with tap-to-navigate back to the reading day.

### 5. Reading Progress Persistence Indicator
Show completed days on the mini calendar with green dots/checkmarks so users can visually see their journey through the year.

### 6. Share Verse Feature
A share button on search results and highlighted verses that copies a beautifully formatted verse to clipboard or opens the native share sheet on mobile.

### 7. Audio Bible Integration
Add a play button on the reading page that reads the current chapter aloud using the browser's built-in SpeechSynthesis API (no external service needed).

---

## Technical Details

| Change | Files affected |
|---|---|
| Search dark mode fix | `src/pages/SearchPage.tsx` |
| Service worker | `vite.config.ts`, `src/main.tsx`, new SW file |
| Bottom nav | New `src/components/BottomNav.tsx`, update `App.tsx` layout |
| Bookmarks page | New `src/pages/BookmarksPage.tsx`, update `App.tsx` routes |
| Calendar dots | `src/components/MiniCalendar.tsx` |
| Share verse | `src/pages/ReadingPage.tsx`, `src/pages/SearchPage.tsx` |
| Audio playback | `src/pages/ReadingPage.tsx` |

All changes use existing patterns (localStorage, hooks, Tailwind theme variables). No new dependencies needed except optionally `vite-plugin-pwa`.

