

## Move Search to Bottom Navigation Bar

### Changes

**1. `src/components/AppSidebar.tsx`** — Add a Search icon as a new nav item in the bottom bar. Instead of navigating to a route, tapping it opens a search drawer/sheet from the bottom. This requires adding state and rendering a `Drawer` with the search input inside.

The nav items become: Home, My Go Two, **Search** (center), Connections, Know Me, Settings. That's 7 items — to keep it clean, we can either remove Recommendations from the bar or keep all 7 compact. Given 7 is crowded, recommend removing Recommendations from the bottom nav (it can live inside the dashboard home or as a sub-page).

**2. `src/components/DashboardTopBar.tsx`** — Remove the search input. Keep only the logo and notification bell. The header becomes: `[GoTwo logo] ———— [Bell icon]` with the divider below.

**3. Search Drawer** — When tapping the Search icon in the bottom nav, a `Drawer` (vaul) slides up with the search input field and future search results area. This keeps the search experience full-featured without cluttering the header.

### Bottom Nav Order
`Home` · `My Go Two` · `Search` · `Know Me` · `Settings`

Dropping Connections and Recommendations from the bottom bar to keep it to 5 items. Those pages remain accessible from the dashboard home.

