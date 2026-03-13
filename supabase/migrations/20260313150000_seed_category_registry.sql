-- Seed category_registry for MyGoTwo page
-- Keys match image filenames in src/assets/templates/
-- section values match sectionOrder in MyGoTwo.tsx

-- Wipe any existing mygotwo rows so this is idempotent
DELETE FROM public.category_registry WHERE page = 'mygotwo';

INSERT INTO public.category_registry
  (key, label, section, page, genders, sort_order, is_active, fields, subcategories)
VALUES

-- ── STYLE & FIT ───────────────────────────────────────────────────
('grooming',          'Grooming',         'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 10, true, '[]', NULL),
('scents',            'Scents',           'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 20, true, '[]', NULL),
('clothing-tops',     'Tops',             'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 30, true, '[]', NULL),
('clothing-bottoms',  'Bottoms',          'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 40, true, '[]', NULL),
('clothing-outerwear','Outerwear',        'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 50, true, '[]', NULL),
('clothing-activewear','Activewear',      'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 60, true, '[]', NULL),
('shoe-size',         'Shoe Size',        'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 70, true, '[]', NULL),
('measurements',      'Measurements',     'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 80, true, '[]', NULL),
('jewelry',           'Jewelry',          'style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 90, true, '[]', NULL),
('brand-preferences', 'Brand Preferences','style-fit', 'mygotwo', ARRAY['male','female','non-binary'], 100, true,'[]', NULL),

-- ── FOOD & DRINK ──────────────────────────────────────────────────
('coffee-order',         'Coffee Order',       'food-drink', 'mygotwo', ARRAY['male','female','non-binary'], 10, true, '[]', NULL),
('favorite-restaurants', 'Restaurants',        'food-drink', 'mygotwo', ARRAY['male','female','non-binary'], 20, true, '[]', NULL),
('favorite-meals',       'Favorite Meals',     'food-drink', 'mygotwo', ARRAY['male','female','non-binary'], 30, true, '[]', NULL),
('dietary-restrictions', 'Dietary',            'food-drink', 'mygotwo', ARRAY['male','female','non-binary'], 40, true, '[]', NULL),
('fast-food-order',      'Fast Food',          'food-drink', 'mygotwo', ARRAY['male','female','non-binary'], 50, true, '[]', NULL),

-- ── GIFTS & WISHLIST ──────────────────────────────────────────────
('wish-list',            'Wish List',          'gifts-wishlist', 'mygotwo', ARRAY['male','female','non-binary'], 10, true, '[]', NULL),
('flowers',              'Flowers',            'gifts-wishlist', 'mygotwo', ARRAY['male','female','non-binary'], 20, true, '[]', NULL),
('anniversary-gifts',    'Anniversary',        'gifts-wishlist', 'mygotwo', ARRAY['male','female','non-binary'], 30, true, '[]', NULL),
('birthday-preferences', 'Birthday',           'gifts-wishlist', 'mygotwo', ARRAY['male','female','non-binary'], 40, true, '[]', NULL),
('specific-products',    'Specific Products',  'gifts-wishlist', 'mygotwo', ARRAY['male','female','non-binary'], 50, true, '[]', NULL),

-- ── HOME & LIVING ─────────────────────────────────────────────────
('scent-candles',        'Candles',            'home-living', 'mygotwo', ARRAY['male','female','non-binary'], 10, true, '[]', NULL),
('scent-home',           'Home Scents',        'home-living', 'mygotwo', ARRAY['male','female','non-binary'], 20, true, '[]', NULL),
('grocery-produce',      'Groceries',          'home-living', 'mygotwo', ARRAY['male','female','non-binary'], 30, true, '[]', NULL),

-- ── ENTERTAINMENT & INTERESTS ─────────────────────────────────────
('events',               'Events',             'entertainment', 'mygotwo', ARRAY['male','female','non-binary'], 10, true, '[]', NULL),
('date-ideas',           'Date Ideas',         'entertainment', 'mygotwo', ARRAY['male','female','non-binary'], 20, true, '[]', NULL),
('love-language',        'Love Language',      'entertainment', 'mygotwo', ARRAY['male','female','non-binary'], 30, true, '[]', NULL),
('travel-preferences',   'Travel',             'entertainment', 'mygotwo', ARRAY['male','female','non-binary'], 40, true, '[]', NULL);

