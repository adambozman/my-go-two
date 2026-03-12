

## Photo Gallery Reorganization: Gender-First Hierarchy

### Current Problem
The gallery is organized by asset type (Stock, Styles, Categories, Templates, etc.). You want it organized by **gender first**, then by content categories within each gender tab.

### New Structure

Three top-level tabs: **Male**, **Female**, **Non-Binary**

Within each tab, the same consistent set of category sections:

```text
Tab: Male / Female / Non-Binary
├── Styles (minimal, classic, sporty, trendy, edgy, boho, luxury, laid-back)
├── Categories (shopping, style, food, gifts, lifestyle, fit)
├── Clothing (tops, bottoms, outerwear, activewear, sizes, [dresses - female only])
├── Shoes (size, sneakers, boots, sandals, [heels/flats - female only])
├── Grooming (hair, skin, [shaving], [makeup - female only])
├── Scents & Fragrances (perfume/cologne, bodycare, candles, oils, home)
├── Jewelry (necklaces, bracelets, watches, [earrings - female only])
├── Measurements (body, ring)
├── Stock Photos (dad/brother under Male, mom/sister under Female, partner/friend/coworker under Non-Binary)
├── Food & Dining (coffee, fast food, meals, groceries, restaurants, cuisines)
├── Date Ideas (indoor, outdoor, romantic)
├── Events (concerts, sports, theater)
├── Travel (beach, city, mountain)
├── Gifts & Occasions (anniversary, birthday, flowers, wish list)
├── Preferences & Lifestyle (love language, pet peeves, brand preferences, specific products)
└── Gift Style (practical, thoughtful, luxurious, experience, surprise)
```

- **Male tab**: Uses `styles/male/`, `categories/male/`, `templates/male/` images. Stock photos = Dad, Brother. Shared templates (food, dates, etc.) appear here too.
- **Female tab**: Uses `styles/female/`, `categories/female/`, `templates/` (root = female). Stock photos = Mom, Sister. Includes female-only items (dresses, heels, flats, makeup, earrings).
- **Non-Binary tab**: Uses `styles/` (neutral root), `templates/neutral/`. Stock photos = Partner, Friend, Coworker. Also includes all the neutral preference styles (polished, casual, budget, etc.) and shared templates.

### Additional sections (shown once, outside gender tabs or in a 4th "Shared" tab):
- **Dashboard** images (quick-gift-ideas, saved-items, etc.)
- **Background Textures** (previews/)
- **Occasions** stock (anniversaries, birthdays, holidays, etc.)

### Technical Approach
- Rewrite the `sections` data structure to be keyed by `male`, `female`, `nonbinary`, plus a `shared` tab for gender-neutral assets (dashboard, backgrounds, occasions).
- Update `tabLabels` to match: `Male`, `Female`, `Non-Binary`, `Shared`.
- All imports stay the same. Only the grouping/organization changes.
- Delete button, selection, expanded view all work exactly as before.

