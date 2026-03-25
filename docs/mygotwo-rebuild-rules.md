# MyGoTwo Rebuild Rules

Read this file before doing any work on `MyGoTwo`.

## Goal

Rebuild `MyGoTwo` so web is a richer, purpose-built experience instead of a dumbed-down mobile adaptation.

## Non-Negotiables

- Do not delete saved data fields.
- Do not delete backend logic that stores data.
- Do not remove persistence, storage, or retrieval logic unless explicitly instructed.
- Do not rebuild by patching old overlapping UI architectures back together.
- Do not make web a responsive copy of mobile.

## Core Principle

Separate behavior from presentation.

Build:

1. One non-UI feature core for `MyGoTwo`
2. One web experience on top of that core
3. One mobile experience on top of that core

## Feature Core Responsibilities

The feature core owns:

- data loading
- saved card CRUD
- image upload and image resolution
- selected page, category, and card identifiers
- navigation state as plain serializable state

The feature core must not own:

- JSX
- layout decisions
- animation behavior
- web-specific or mobile-specific display assumptions

## Presentation Split

### Web

`MyGoTwoWebExperience` should be a desktop-first product experience.

Web can include:

- richer motion
- larger stage composition
- hover behavior
- keyboard and wheel support
- layered transitions
- deeper editorial layout

### Mobile

`MyGoTwoMobileExperience` should be touch-first and simpler.

Mobile can include:

- reduced simultaneous elements
- touch-first navigation
- simpler transitions
- smaller layout scope

## Shared vs Separate

Share only true primitives:

- buttons
- fields
- image upload helpers
- data contracts

Do not share full page experiences like:

- coverflow systems
- page shells
- quote systems
- desktop/mobile view composition

## Rebuild Order

1. Rebuild the root web page shell under the existing header.
2. Rebuild the level-one web browse experience.
3. Rebuild the level-two category transition.
4. Rebuild the product card editor/view.
5. Add motion polish and sequencing after structure is stable.
6. Rebuild mobile separately after web is stable.

## Animation Rules

- Keep animation logic inside web presentation files.
- Define explicit page states such as `root`, `category`, and `card`.
- Animate transitions between states, not isolated elements with unrelated timing.
- Use one consistent motion system for the web experience.

## Visual Constraints

- Do not introduce invisible boxes.
- Do not add placeholder containers that affect layout without visible purpose.
- Layers must be independent and must not accidentally push, offset, or resize other layers.
- The quote layer must not affect coverflow positioning.
- The coverflow stage must keep its own geometry regardless of quote presence.
- Do not add footers unless explicitly requested.
- Do not add empty layout layers.
- Do not use spacer wrappers as a layout crutch.
- Every rendered layer must have a clear visual purpose.
- Decorative layers must not interfere with interaction layers.
- Overlay elements should overlay; they should not consume document-flow space unless intentionally designed to do so.

## Anti-Patterns

Do not:

- restore overlapping architectures
- create competing web stacks for the same feature
- fork state ownership across multiple controllers
- let layout, quote, coverflow, and card flows come from different sources of truth
- solve web by shrinking mobile patterns
- use invisible structural boxes to fake alignment
- let one presentation layer determine another layer's position by accident
- add dead space, empty rails, or empty footer regions

## Working Rule

Before making `MyGoTwo` changes:

1. Read this file.
2. Confirm whether the change belongs to feature core, web presentation, or mobile presentation.
3. Avoid crossing those boundaries unless explicitly intended.
