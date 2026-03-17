
Plan

1. Replace the current This or That single-deck view with a new category dashboard
- Keep the existing This or That card on the main Know Me screen.
- Change its click behavior so it opens a dedicated This or That categories view instead of the current yes/no deck.
- Reuse the same editorial teal aesthetic already used in Know Me: asymmetrical grid, glassy teal cards, coral micro-labels, rounded corners, top-left back button.

2. Add a fixed This or That category model only
- Create a static config for exactly these 10 categories:
  - Style & Aesthetic
  - Brands & Shopping
  - Colors & Palette
  - Food & Dining
  - Travel & Trips
  - Date Ideas & Romance
  - Home & Living
  - Love Language & Relationships
  - Hobbies & Weekend
  - Gifting — what you actually want
- For now, each category will only contain metadata needed for the flow:
  - id
  - title
  - short description
  - intended gender bucket support
  - status = disabled / coming soon
- Do not add question banks yet.

3. Build the new This or That category dashboard UI
- Add a new view state for the category dashboard.
- Show all 10 categories in a mosaic/uneven layout that visually matches the existing Know Me dashboard.
- Each card should show:
  - category name
  - short explanation
  - “coming soon” / locked state
  - optional tiny progress placeholder at 0 answered
- Since you do not want questions built yet, cards will be visible but disabled.

4. Keep gender-based architecture ready without filling the banks
- Structure the new data so each category can later receive fixed banks for:
  - male
  - female
  - non-binary
- Important: this will be purely static configuration, not AI-generated.
- The future implementation will plug your provided questions into those predefined slots without changing the UI flow again.

5. Update copy so the product logic is accurate
- Adjust This or That copy to make clear:
  - the categories are fixed
  - the question banks are fixed by gender
  - the AI does not generate the questions
  - the AI only interprets answers to infer the user’s vibe
- Remove wording that implies the AI decides what This or That asks next.

6. Preserve current persistence and premium structure, but do not activate category play yet
- Do not build question answering logic for the new categories yet.
- Do not wire new answer saving yet beyond keeping the architecture ready.
- Keep the current premium model conceptually aligned with per-category limits, but only surface it visually on disabled cards for now.

Files to update
- `src/pages/dashboard/Questionnaires.tsx`
  - add new This or That categories view
  - redirect the This or That card into that new view
  - render disabled category cards in the same aesthetic
  - update explanatory copy
- likely `src/data/knowMeQuestions.ts` or a new nearby static config file
  - add the 10 This or That category definitions only
  - prepare placeholders for future gender-based banks without filling them

Implementation shape
```text
Know Me dashboard
  -> click "This or That"
    -> This or That categories dashboard
       -> 10 visible category cards
       -> all disabled for now
       -> ready for future male/female/non-binary banks
```

Outcome
- The full flow and screen architecture get built now.
- No questions are added yet.
- Later, when you give the bank content, it can be dropped into the prepared category structure without redesigning the flow again.
