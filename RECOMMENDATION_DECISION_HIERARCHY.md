## Recommendation Decision Hierarchy

This recommendation system must run in one ordered pipeline.

No later stage is allowed to override or invent truth that belongs to an earlier stage.

### Stage 1: Collect User Evidence
- Source only real user-backed evidence.
- Inputs:
  - profile facts
  - onboarding answers
  - Know Me answers
  - This or That v2 answers
  - saved product card keywords
  - explicit likes
  - explicit dislikes
- Output:
  - `primary_user_evidence`

Rules:
- No brand-bank or fallback defaults are allowed here.
- Legacy This or That heuristics should not compete with structured v2 answers.

### Stage 2: Normalize Signals
- Turn user evidence into normalized recommendation signals.
- Output:
  - positive keywords
  - negative keywords
  - supported brands
  - supported categories
  - location keys
  - category depth

Rules:
- Keep user evidence separate from derived support.
- Derived support may assist later stages, but it must never inflate user certainty.

### Stage 3: Score Input Strength
- Decide how much recommendation work the system is allowed to do.
- Output:
  - `input_strength_score`
  - `input_strength_level`
  - `target_recommendation_count`

Rules:
- Thin profiles must produce fewer recommendations.
- The engine must never force a full set just because the page expects it.
- Derived banks cannot create false confidence.

### Stage 4: Decide Eligible Categories
- Choose which categories are actually supported by the user’s evidence.
- Output:
  - ordered eligible categories
  - category allocation targets

Rules:
- Unsupported categories get zero recommendations.
- Category balancing is allowed only inside supported categories.
- Fallback defaults cannot create fake category support.

### Stage 5: Generate Recommendation Intents
- AI creates recommendation intents only after the system knows:
  - how many recommendations are allowed
  - which categories are eligible
  - which brands/keywords are actually supported
- Output:
  - recommendation intents

Rules:
- AI creates the idea, not the final product truth.
- AI must not invent unsupported brands for thin profiles.
- Negative signals must block intent creation.

### Stage 6: Reuse Shared Product Bank
- For each intent:
  - match exact `primary_keyword`
  - then match brand fit
  - then match descriptor fit
- Output:
  - reusable exact product row or no match

Rules:
- Only verified rows are reusable.
- Resolver rows and fallback catalog rows are not reusable product truth.

### Stage 7: Resolve Exact Product
- If no bank match exists, search and scrape for the exact product.
- Output:
  - PDP link
  - product image
  - price
  - title
  - description

Rules:
- Exact product confidence is separate from recommendation fit confidence.
- A page URL is not an image.
- A broken image is not a valid exact-product result.

### Stage 8: Verify Product Truth
- Confirm the candidate is safe to present as a real product card.
- Output:
  - `exact_verified`
  - `catalog_verified`
  - `search_only`
  - `rejected`

Rules:
- The card must not display stronger truth than the verifier earned.
- If image/link/price are not all trustworthy, do not present an exact product card.

### Stage 9: Assemble Response
- Build the response only from the final verified stage result.
- Output:
  - page-facing recommendation DTO

Rules:
- The UI must not infer truth from fallback fields.
- Match labels must come from verification stage, not from convenience flags.

### Stage 10: Persist Outputs
- Persist three separate things:
  - normalized user signals
  - verified shared product rows
  - user weekly recommendation output

Rules:
- Do not mix shared product truth with user cache truth.
- Dirty or partial product rows must never be promoted to the verified shared bank.

## Immediate Refactor Rules

1. User evidence and derived support must be scored separately.
2. Category eligibility must happen before intent planning.
3. Intent planning must happen before any bank lookup.
4. Bank lookup must happen before Firecrawl.
5. Exact verification must happen before card assembly.
6. Card assembly must happen before weekly cache write.
7. No stage may silently override a stronger earlier stage with weaker fallback data.
