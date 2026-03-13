-- Style & Fit — full category_registry rebuild with gender-specific rows
-- Wipe existing style-fit rows for mygotwo
DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'style-fit';

-- ─────────────────────────────────────────────────────────────────────────────
-- CLOTHING TOPS
-- Male: Tops, Outerwear, Activewear (no Dresses)
-- Female: Tops, Dresses, Outerwear, Activewear
-- Non-binary: same as male
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES
(
  'clothing-tops-male', 'Tops', 'style-fit', 'mygotwo',
  ARRAY['male','non-binary'], 10, true,
  '[]'::jsonb,
  '[
    {"id":"tops","name":"Tops","image":"clothing-tops",
     "fields":[{"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},{"label":"Preferred Fit","type":"select","value":"","options":["Slim","Regular","Relaxed","Oversized"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"outerwear","name":"Outerwear","image":"clothing-outerwear",
     "fields":[{"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},{"label":"Type","type":"select","value":"","options":["Jacket","Coat","Parka","Blazer","Vest"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"activewear","name":"Activewear","image":"clothing-activewear",
     "fields":[{"label":"Top Size","type":"select","value":"","options":["XS","S","M","L","XL"]},{"label":"Bottom Size","type":"select","value":"","options":["XS","S","M","L","XL"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
  ]'::jsonb
),
(
  'clothing-tops-female', 'Tops', 'style-fit', 'mygotwo',
  ARRAY['female'], 10, true,
  '[]'::jsonb,
  '[
    {"id":"tops","name":"Tops","image":"clothing-tops",
     "fields":[{"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},{"label":"Preferred Fit","type":"select","value":"","options":["Slim","Regular","Relaxed","Oversized"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"dresses","name":"Dresses","image":"clothing-dresses",
     "fields":[{"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},{"label":"Length","type":"select","value":"","options":["Mini","Midi","Maxi"]},{"label":"Preferred Style","type":"select","value":"","options":["A-Line","Bodycon","Wrap","Shift","Maxi"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"outerwear","name":"Outerwear","image":"clothing-outerwear",
     "fields":[{"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},{"label":"Type","type":"select","value":"","options":["Jacket","Coat","Parka","Blazer","Vest"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"activewear","name":"Activewear","image":"clothing-activewear",
     "fields":[{"label":"Top Size","type":"select","value":"","options":["XS","S","M","L","XL"]},{"label":"Bottom Size","type":"select","value":"","options":["XS","S","M","L","XL"]},{"label":"Sports Bra Size","type":"text","value":""},{"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
  ]'::jsonb
),

-- ─────────────────────────────────────────────────────────────────────────────
-- BOTTOMS (all genders)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'clothing-bottoms', 'Bottoms', 'style-fit', 'mygotwo',
  ARRAY['male','female','non-binary'], 20, true,
  '[
    {"label":"Waist Size","type":"text","value":""},
    {"label":"Length / Inseam","type":"text","value":""},
    {"label":"Preferred Fit","type":"select","value":"","options":["Skinny","Slim","Regular","Relaxed","Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]'::jsonb,
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- SHOE SIZE — gender-specific subtypes
-- ─────────────────────────────────────────────────────────────────────────────
(
  'shoe-size-male', 'Shoe Size', 'style-fit', 'mygotwo',
  ARRAY['male','non-binary'], 30, true,
  '[]'::jsonb,
  '[
    {"id":"sneakers","name":"Sneakers","image":"shoe-sneakers",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Preferred Brands","type":"text","value":""},{"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},{"label":"Style","type":"select","value":"","options":["Low-top","Mid-top","High-top","Slip-on"]},{"label":"Fit Notes","type":"text","value":""}]},
    {"id":"boots","name":"Boots","image":"shoe-boots",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Boot Height","type":"select","value":"","options":["Ankle","Mid-Calf","Knee-High"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},{"label":"Fit Notes","type":"text","value":""}]},
    {"id":"sandals","name":"Sandals","image":"shoe-sandals",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Slides","Strappy","Flip-Flop"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}]}
  ]'::jsonb
),
(
  'shoe-size-female', 'Shoe Size', 'style-fit', 'mygotwo',
  ARRAY['female'], 30, true,
  '[]'::jsonb,
  '[
    {"id":"heels","name":"Heels","image":"shoe-heels",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Heel Height","type":"select","value":"","options":["Kitten (1-2\")","Mid (2-3\")","High (3-4\")","Stiletto (4\"+)"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},{"label":"Fit Notes","type":"text","value":""}]},
    {"id":"sneakers","name":"Sneakers","image":"shoe-sneakers",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Preferred Brands","type":"text","value":""},{"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},{"label":"Fit Notes","type":"text","value":""}]},
    {"id":"boots","name":"Boots","image":"shoe-boots",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Boot Height","type":"select","value":"","options":["Ankle","Mid-Calf","Knee-High","Over-the-Knee"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}]},
    {"id":"sandals","name":"Sandals","image":"shoe-sandals",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Slides","Strappy","Wedge","Gladiator","Flip-Flop"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}]},
    {"id":"flats","name":"Flats","image":"shoe-flats",
     "fields":[{"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Ballet","Loafer","Mule","Espadrille"]},{"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}]}
  ]'::jsonb
),

-- ─────────────────────────────────────────────────────────────────────────────
-- GROOMING — subcategories with gender gating on Makeup
-- ─────────────────────────────────────────────────────────────────────────────
(
  'grooming', 'Grooming', 'style-fit', 'mygotwo',
  ARRAY['male','female','non-binary'], 40, true,
  '[]'::jsonb,
  '[
    {"id":"hair-care","name":"Hair Care","image":"grooming-hair",
     "products":[
       {"id":"shampoo","name":"Shampoo","image":"grooming-hair","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Hair Type","type":"select","value":"","options":["Straight","Wavy","Curly","Coily","All Types"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"conditioner","name":"Conditioner","image":"grooming-hair","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Hair Type","type":"select","value":"","options":["Straight","Wavy","Curly","Coily","All Types"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"hair-styling","name":"Hair Styling","image":"grooming-hair","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Gel","Pomade","Mousse","Spray","Cream","Oil"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
     ]},
    {"id":"skin-care","name":"Skin Care","image":"grooming-skin",
     "products":[
       {"id":"moisturizer","name":"Moisturizer","image":"grooming-skin","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"cleanser","name":"Cleanser","image":"grooming-skin","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"sunscreen","name":"Sunscreen","image":"grooming-skin","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"SPF","type":"select","value":"","options":["SPF 15","SPF 30","SPF 50","SPF 50+"]},{"label":"Finish","type":"select","value":"","options":["Matte","Dewy","Natural"]},{"label":"Notes","type":"text","value":""}]}
     ]},
    {"id":"shaving","name":"Shaving","image":"grooming-shaving","gender":["male","non-binary"],
     "products":[
       {"id":"razor","name":"Razor","image":"grooming-shaving","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Cartridge","Safety","Electric","Straight","Disposable"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"shaving-cream","name":"Shaving Cream","image":"grooming-shaving","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Cream","Gel","Foam","Soap","Oil"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"aftershave","name":"Aftershave","image":"grooming-shaving","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Balm","Splash","Lotion","Gel"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
     ]},
    {"id":"makeup","name":"Makeup","image":"grooming-makeup","gender":["female"],
     "products":[
       {"id":"foundation","name":"Foundation","image":"grooming-makeup","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Shade","type":"text","value":""},{"label":"Finish","type":"select","value":"","options":["Matte","Dewy","Satin","Natural"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"mascara","name":"Mascara","image":"grooming-makeup","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Effect","type":"select","value":"","options":["Lengthening","Volumizing","Curling","Waterproof"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
       {"id":"lip-product","name":"Lip Product","image":"grooming-makeup","fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Lipstick","Lip Gloss","Lip Liner","Lip Balm","Lip Stain"]},{"label":"Shade","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
     ]}
  ]'::jsonb
),

-- ─────────────────────────────────────────────────────────────────────────────
-- SCENTS — gender-specific subtypes
-- ─────────────────────────────────────────────────────────────────────────────
(
  'scents-male', 'Scents', 'style-fit', 'mygotwo',
  ARRAY['male','non-binary'], 50, true,
  '[]'::jsonb,
  '[
    {"id":"cologne","name":"Cologne","image":"scent-cologne",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Concentration","type":"select","value":"","options":["EDT","EDP","Cologne"]},{"label":"Scent Family","type":"select","value":"","options":["Fresh","Woody","Spicy","Aquatic","Aromatic"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"body-wash","name":"Body Wash","image":"scent-bodycare",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Gel","Cream","Oil","Bar"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"body-lotion","name":"Body Lotion","image":"scent-bodycare",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Skin Type","type":"select","value":"","options":["Normal","Dry","Sensitive","All"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
  ]'::jsonb
),
(
  'scents-female', 'Scents', 'style-fit', 'mygotwo',
  ARRAY['female'], 50, true,
  '[]'::jsonb,
  '[
    {"id":"perfume","name":"Perfume","image":"scent-perfume",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Concentration","type":"select","value":"","options":["EDT","EDP","Parfum"]},{"label":"Scent Family","type":"select","value":"","options":["Floral","Woody","Fresh","Oriental","Gourmand"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"body-lotion","name":"Body Lotion","image":"scent-bodycare",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Skin Type","type":"select","value":"","options":["Normal","Dry","Sensitive","All"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"body-wash","name":"Body Wash","image":"scent-bodycare",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Gel","Cream","Oil","Bar"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"essential-oil","name":"Essential Oil","image":"scent-oils",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},{"label":"Use","type":"select","value":"","options":["Aromatherapy","Topical","Diffuser","Bath"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
  ]'::jsonb
),

-- ─────────────────────────────────────────────────────────────────────────────
-- MEASUREMENTS (all genders)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'measurements', 'Measurements', 'style-fit', 'mygotwo',
  ARRAY['male','female','non-binary'], 60, true,
  '[]'::jsonb,
  '[
    {"id":"body","name":"Body","image":"measure-body",
     "fields":[{"label":"Chest / Bust","type":"text","value":""},{"label":"Waist","type":"text","value":""},{"label":"Hips","type":"text","value":""},{"label":"Inseam","type":"text","value":""},{"label":"Shoulder Width","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"ring","name":"Ring Size","image":"measure-ring",
     "fields":[{"label":"Ring Size (US)","type":"text","value":""},{"label":"Ring Size (EU)","type":"text","value":""},{"label":"Preferred Finger","type":"text","value":""},{"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},{"label":"Notes","type":"text","value":""}]}
  ]'::jsonb
),

-- ─────────────────────────────────────────────────────────────────────────────
-- JEWELRY — all genders
-- ─────────────────────────────────────────────────────────────────────────────
(
  'jewelry', 'Jewelry', 'style-fit', 'mygotwo',
  ARRAY['male','female','non-binary'], 70, true,
  '[]'::jsonb,
  '[
    {"id":"necklaces","name":"Necklace","image":"jewelry-necklaces",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Chain","Pendant","Choker","Layered"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},{"label":"Length","type":"select","value":"","options":["Choker (14\")","Princess (18\")","Matinee (22\")","Opera (30\")"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"bracelets","name":"Bracelet","image":"jewelry-bracelets",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Bangle","Chain","Cuff","Charm","Beaded"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Leather"]},{"label":"Wrist Size","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"watches","name":"Watch","image":"jewelry-watches",
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Type","type":"select","value":"","options":["Analog","Digital","Smart Watch"]},{"label":"Style","type":"select","value":"","options":["Casual","Dress","Sport","Luxury"]},{"label":"Band","type":"select","value":"","options":["Metal","Leather","Silicone","NATO"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
    {"id":"earrings","name":"Earrings","image":"jewelry-earrings","gender":["female"],
     "fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Stud","Hoop","Drop","Huggie","Clip-On"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},{"label":"Sensitivity","type":"select","value":"","options":["None","Nickel-Free Only","Hypoallergenic Only"]},{"label":"Notes","type":"text","value":""}]}
  ]'::jsonb
),

-- ─────────────────────────────────────────────────────────────────────────────
-- BRAND PREFERENCES (all genders)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'brand-preferences', 'Brand Preferences', 'style-fit', 'mygotwo',
  ARRAY['male','female','non-binary'], 80, true,
  '[]'::jsonb,
  '[
    {"id":"clothing","name":"Clothing","image":"clothing-tops",
     "fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Casual","Streetwear","Classic","Minimalist","Bohemian"]},{"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},{"label":"Notes","type":"text","value":""}]},
    {"id":"beauty","name":"Beauty","image":"grooming-skin",
     "fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Category","type":"select","value":"","options":["Skincare","Makeup","Hair","Fragrance"]},{"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Prestige","Luxury"]},{"label":"Notes","type":"text","value":""}]},
    {"id":"tech","name":"Tech","image":"specific-products",
     "fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Category","type":"select","value":"","options":["Phone","Laptop","Audio","Smart Home","Wearables"]},{"label":"Ecosystem","type":"select","value":"","options":["Apple","Android/Google","Samsung","Mixed"]},{"label":"Notes","type":"text","value":""}]}
  ]'::jsonb
);
