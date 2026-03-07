

# Go Two — Full MVP Plan

## 1. Landing Page
- Warm beige/blush color palette matching your design screenshots
- "Go Two" logo/branding with the scripted "Go" in coral and serif "Two" in dark teal
- Hero section: "The Shortcut to Thoughtful. Never forget again." with video placeholder
- Tagline copy: "Create personal Go Two lists for the details that matter — coffee orders, clothing sizes, date ideas and much more."
- Two CTAs: "Get Started Free" (filled) and "See How It Works" (outlined)
- "How It Works" section explaining the flow

## 2. Authentication (Supabase/Lovable Cloud)
- Sign up / Log in pages with email + password
- User profiles table to store display name and avatar
- Password reset flow

## 3. Dashboard (Logged-in experience)
- Left sidebar navigation (Home, My Lists, Shared, Templates, Settings) matching your screenshot design
- "My Lists" hero banner: "My lists, organized and ready to use."
- "Create New List" button + active collaborations count
- Grid/list of existing GoTwo cards

## 4. GoTwo Cards — Create & Manage
- **Preset templates**: Coffee Order, Food/Salad Preferences, Clothing Sizes, Date Ideas, Gift Ideas
- **Custom cards**: Users can create any category with custom fields (text, sizes, multiple choice)
- Card editor with title, category, and dynamic fields
- Edit and delete functionality

## 5. Partner Sharing & Collaboration
- Invite partner via email — creates a "couple" link in the database
- Shared view: Partner can browse your GoTwo cards (read-only by default)
- Notifications when cards are updated
- "Active collaborations" badge on dashboard

## 6. Database Schema
- **profiles**: user info (name, avatar)
- **couples**: links two users together (inviter, invitee, status)
- **lists**: user's lists/categories
- **cards**: individual GoTwo cards with JSON fields for flexible data
- **card_templates**: preset templates with default fields
- Row-level security so only you and your linked partner can see your cards

## 7. Design System
- Warm beige/blush background palette
- Teal/dark green accents for buttons and text
- Coral accent for branding
- Soft rounded cards with subtle shadows
- Clean, elegant typography

