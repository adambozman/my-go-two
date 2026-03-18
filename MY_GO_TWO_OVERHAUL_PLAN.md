# My Go Two Overhaul Plan

This file is the dedicated overhaul roadmap for My Go Two.
It exists separately from the broader working plan because My Go Two is the core product engine and needs its own cleanup strategy.

## What My Go Two Is Supposed To Be

My Go Two is the structured memory system of the product.

Its job is to let a user save:
- what they like
- what they dislike
- favorite brands
- sizes and fit
- repeat orders
- personal care specifics
- gift clues
- home and lifestyle preferences
- practical recurring details

The product goal is not just "fill out cards."

The real goal is:
- save the details that cause everyday friction
- make them easy to retrieve
- make them easy to share intentionally
- make them useful for recommendations and targeted monetization later

## Current Problems

## 1. The category system is too specific too early

Current My Go Two data is heavily structured around highly specific products and subtype leaves.

Examples of the problem:
- category -> subcategory -> product -> field set
- many entries are effectively preset SKU-like memory templates
- this creates maintenance overhead and makes the system feel rigid

Why this is a problem:
- users think in memory buckets, not in exhaustive subtype trees
- it is expensive to finish for female and non-binary if every branch must be fully handcrafted
- it becomes hard to search, evolve, and monetize cleanly
- recommendation logic has to reverse-engineer meaning from overly specific templates

## 2. Male coverage is much more complete than female or non-binary

Current reality:
- male paths appear much farther along
- female and non-binary are not actually complete systems yet
- some routing in the broader app still effectively collapses to male behavior

Why this matters:
- the product promise is gender-aware, not male-first with placeholders
- incomplete parity makes the experience feel uneven and unreliable

## 3. My Go Two has drifted from the real product abstraction

The current implementation feels like it grew from:
- card ideas
- category banks
- image banks
- structured forms

But the actual product abstraction should probably be:
- category
- memory type
- entry
- structured signals
- optional images
- sharing classification

In other words:
- fewer hardcoded micro-types
- stronger reusable primitives
- better signal extraction

## 4. Category meaning is not clean enough for sharing and recommendations

If categories are too specific or inconsistent, then these downstream systems become messy:
- sharing permissions
- partner feed
- search
- recommendations
- future ad targeting

My Go Two should not just be a UI tree.
It should be the data foundation for the whole product.

## Target Direction

My Go Two should move toward a simpler, more scalable model:

1. Broad category families
- Style & Fit
- Food & Drink
- Personal Care
- Gifts & Wishlist
- Home & Living
- Lifestyle / Entertainment / Travel
- Everyday Essentials
- Important Dates / Signals

2. Reusable entry types inside each family
- favorite
- avoid
- size
- brand preference
- repeat order
- routine
- wishlist item
- gift idea
- memory note
- occasion note

3. Flexible fields, not hyper-fragmented banks
- a smaller set of reusable field patterns
- optional subtype-specific extensions only where truly useful

4. Gender-aware variation should happen mostly through:
- imagery
- suggested categories
- subtype suggestions
- option sets
- ordering and emphasis

Not through completely separate hardcoded universes whenever possible.

## Overhaul Goals

## Goal 1: Redefine the category architecture

We need to replace the current overly specific shape with a cleaner taxonomy.

Target outcome:
- fewer top-level categories
- less preset subtype clutter
- easier parity across male, female, and non-binary
- categories that map cleanly to recommendations and sharing

## Goal 2: Define the core entry model

We need a clear answer to:
"What is one saved thing in My Go Two?"

Target model should support:
- one-off cards
- repeated product/order preferences
- structured attributes
- optional image
- searchable text
- signal tags
- permission mapping

## Goal 3: Separate content model from presentation

Current My Go Two logic mixes:
- categories
- images
- subtype trees
- UI flow
- field behavior

We should move toward:
- data model first
- rendering layer second

That will make it much easier to finish all gender paths and keep future maintenance sane.

## Goal 4: Finish female and non-binary intentionally

Do not "port everything 1:1" from male.

Instead:
- decide which parts should be shared across all genders
- decide which parts should differ
- create parity at the category and system level first
- then fill in curated differences where they matter

## Goal 5: Make My Go Two the backbone of recommendations

Future `For You` recommendations should be able to read My Go Two naturally.

That means each saved entry should be understandable as a signal, for example:
- preferred brands
- fit clues
- specific restock items
- recurring food orders
- personal care preferences
- gift desires

## Proposed Execution Phases

## Phase A: Inventory And Pruning

Goal:
Understand what exists and identify what should be kept, merged, generalized, or removed.

Primary areas:
- `src/pages/dashboard/MyGoTwo.tsx`
- `src/hooks/useCategoryRegistry.ts`
- `src/data/categoryRegistrySeed.ts`
- `src/data/templateSubtypes.ts`
- category-related migrations and seed SQL

Tasks:
- inventory all current My Go Two categories and subtype trees
- identify duplicate concepts with different labels
- identify hyper-specific branches that should be generalized
- identify male-only branches that need redesign, not copy-paste

Definition of done:
- we have a keep/merge/remove map for the current category bank

## Phase B: New Taxonomy Design

Goal:
Design the replacement category architecture.

Tasks:
- define broad category families
- define reusable entry types within each family
- define which fields are universal vs optional
- define how sharing categories map to the new taxonomy
- define how recommendations will consume these signals

Definition of done:
- a written taxonomy spec exists before implementation starts

## Phase C: Data Model Refactor Plan

Goal:
Decide how the new taxonomy maps onto storage and UI.

Tasks:
- determine whether `card_entries` can support the new model directly
- define any schema additions needed
- define migration strategy from old category keys to new ones
- define search metadata and signal extraction rules

Definition of done:
- we know whether this is mostly a seed/bank refactor or requires schema changes

## Phase D: Male Cleanup First

Goal:
Use the male path as the first cleaned implementation, not as the permanent default.

Tasks:
- rebuild male banks under the new structure
- reduce over-specific subtype branches
- verify card creation, editing, saving, and navigation still feel good

Definition of done:
- one full gender path works cleanly under the new architecture

## Phase E: Female And Non-Binary Completion

Goal:
Bring female and non-binary to true system-level parity.

Tasks:
- build female category and subtype coverage under the same architecture
- build non-binary coverage intentionally
- review imagery, labels, and ordering
- remove silent fallback behavior where inappropriate

Definition of done:
- all three gender experiences are real, coherent, and supported

## Phase F: Recommendation And Sharing Integration

Goal:
Make My Go Two data usable everywhere else.

Tasks:
- define how My Go Two entries become recommendation signals
- define how they map to permission buckets
- ensure partner-visible data aligns with actual category meaning

Definition of done:
- My Go Two is no longer an isolated form system
- it becomes a usable input to the rest of the product

## Design Rules For The Overhaul

1. Do not design around edge-case subtype perfection first
- start broad and useful

2. Do not create a separate hardcoded world for every gender unless necessary
- shared structure first, tailored emphasis second

3. Optimize for memory capture, not taxonomy complexity
- if a user can save it quickly and retrieve it reliably, that wins

4. Every category should justify itself downstream
- sharing
- search
- recommendations
- monetization

5. My Go Two should feel like one coherent product surface
- not a pile of old category experiments

## Recommended Work Order

1. Inventory current My Go Two banks
2. Design the new taxonomy
3. Decide data-model implications
4. Rebuild male under the new structure
5. Add female and non-binary properly
6. Integrate with sharing and recommendations

## Immediate Next Step

Start with Phase A:
- inventory the current My Go Two category bank
- group categories into keep / merge / remove / redesign
- identify where specificity is useful versus where it is just legacy complexity

## Notes For Future Sessions

If work resumes after a crash:
- read `WORKING_PLAN.md`
- then read this file
- continue with My Go Two Phase A before making more ad hoc category edits
