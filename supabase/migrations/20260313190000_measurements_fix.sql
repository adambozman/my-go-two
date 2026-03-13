-- ─────────────────────────────────────────────────────────────────────────────
-- Measurements fix — each measurement is its own Level 3 card
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'style-fit' AND key IN ('measurements-male', 'measurements-female', 'measurements-nb');

INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

-- MALE
('measurements-male', 'Measurements', 'style-fit', 'mygotwo', ARRAY['male'], 50, true,
'[
  {"id":"shirt","name":"Shirt","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jacket","name":"Jacket","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pants","name":"Pants","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"belt","name":"Belt","image":"clothing-bottoms","fields":[
    {"label":"Belt Size","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-size","name":"Shoe Size","image":"shoe-size","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"neck","name":"Neck","image":"clothing-tops","fields":[
    {"label":"Neck Size (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chest","name":"Chest","image":"clothing-tops","fields":[
    {"label":"Chest (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"waist","name":"Waist","image":"clothing-bottoms","fields":[
    {"label":"Waist (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"inseam","name":"Inseam","image":"clothing-bottoms","fields":[
    {"label":"Inseam (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring","name":"Ring Size","image":"measure-ring","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

-- FEMALE
('measurements-female', 'Measurements', 'style-fit', 'mygotwo', ARRAY['female'], 50, true,
'[
  {"id":"shirt","name":"Shirt / Top","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jacket","name":"Jacket","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pants","name":"Pants","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dress","name":"Dress","image":"clothing-dresses","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bra","name":"Bra","image":"clothing-tops","fields":[
    {"label":"Band Size","type":"text","value":""},
    {"label":"Cup Size","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"belt","name":"Belt","image":"clothing-bottoms","fields":[
    {"label":"Belt Size","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-size","name":"Shoe Size","image":"shoe-size","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chest","name":"Bust","image":"clothing-tops","fields":[
    {"label":"Bust (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"waist","name":"Waist","image":"clothing-bottoms","fields":[
    {"label":"Waist (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hips","name":"Hips","image":"clothing-bottoms","fields":[
    {"label":"Hips (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"inseam","name":"Inseam","image":"clothing-bottoms","fields":[
    {"label":"Inseam (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring","name":"Ring Size","image":"measure-ring","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

-- NON-BINARY
('measurements-nb', 'Measurements', 'style-fit', 'mygotwo', ARRAY['non-binary'], 50, true,
'[
  {"id":"shirt","name":"Shirt / Top","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jacket","name":"Jacket","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pants","name":"Pants","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"belt","name":"Belt","image":"clothing-bottoms","fields":[
    {"label":"Belt Size","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-size","name":"Shoe Size","image":"shoe-size","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chest","name":"Chest","image":"clothing-tops","fields":[
    {"label":"Chest (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"waist","name":"Waist","image":"clothing-bottoms","fields":[
    {"label":"Waist (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hips","name":"Hips","image":"clothing-bottoms","fields":[
    {"label":"Hips (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"inseam","name":"Inseam","image":"clothing-bottoms","fields":[
    {"label":"Inseam (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring","name":"Ring Size","image":"measure-ring","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb);
