-- ─────────────────────────────────────────────────────────────
-- Style & Fit — MALE complete rebuild
-- 6 cards: Clothing, Shoes, Grooming, Vibe, Accessory, Taste
-- Architecture: Level2(card) → Level3(subcategory coverflow) → Level4(item fill card)
-- ─────────────────────────────────────────────────────────────

DELETE FROM category_registry
WHERE section = 'style-fit'
  AND page = 'mygotwo'
  AND 'male' = ANY(genders)
  AND NOT ('female' = ANY(genders))
  AND NOT ('non-binary' = ANY(genders));

-- ─── 1. CLOTHING ────────────────────────────────────────────
INSERT INTO category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories)
VALUES (
  'clothing-male', 'Clothing', 'style-fit', 'mygotwo', ARRAY['male'], 10, true, '[]'::jsonb,
  '[
    {
      "id": "tops",
      "name": "Tops",
      "image": "clothing-tops",
      "products": [
        {
          "id": "tshirt", "name": "T-Shirt", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Relaxed","Oversized"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "button-up", "name": "Button-Up Shirt", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Relaxed"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Casual","Flannel","Oxford","Linen","Dress"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "polo", "name": "Polo", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Relaxed"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "hoodie", "name": "Hoodie", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Pullover","Zip-Up","Oversized"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sweatshirt", "name": "Sweatshirt", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Fit", "type": "select", "value": "", "options": ["Regular","Oversized"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sweater", "name": "Sweater", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Crewneck","V-Neck","Turtleneck","Cardigan","Quarter-Zip"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "bottoms",
      "name": "Bottoms",
      "image": "clothing-bottoms",
      "products": [
        {
          "id": "jeans", "name": "Jeans", "image": "clothing-bottoms",
          "fields": [
            {"label": "Waist", "type": "text", "value": ""},
            {"label": "Inseam", "type": "text", "value": ""},
            {"label": "Fit", "type": "select", "value": "", "options": ["Skinny","Slim","Straight","Relaxed","Baggy"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "chinos", "name": "Chinos / Pants", "image": "clothing-bottoms",
          "fields": [
            {"label": "Waist", "type": "text", "value": ""},
            {"label": "Inseam", "type": "text", "value": ""},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Relaxed","Tapered"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "shorts", "name": "Shorts", "image": "clothing-bottoms",
          "fields": [
            {"label": "Waist", "type": "text", "value": ""},
            {"label": "Length", "type": "select", "value": "", "options": ["5 inch","7 inch","9 inch","11 inch"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Chino","Athletic","Denim","Board","Cargo"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sweatpants", "name": "Sweatpants / Joggers", "image": "clothing-bottoms",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Relaxed","Oversized"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "dress-pants", "name": "Dress Pants", "image": "clothing-bottoms",
          "fields": [
            {"label": "Waist", "type": "text", "value": ""},
            {"label": "Inseam", "type": "text", "value": ""},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Pleated"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "activewear-bottoms", "name": "Activewear", "image": "clothing-activewear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Compression","Loose","Tapered Jogger","Shorts"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "outerwear",
      "name": "Outerwear",
      "image": "clothing-outerwear",
      "products": [
        {
          "id": "jacket", "name": "Jacket", "image": "clothing-outerwear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Bomber","Denim","Leather","Moto","Harrington","Varsity"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "coat", "name": "Coat", "image": "clothing-outerwear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Overcoat","Trench","Peacoat","Parka","Wool"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "puffer", "name": "Puffer / Down", "image": "clothing-outerwear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Length", "type": "select", "value": "", "options": ["Short","Mid","Long"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "windbreaker", "name": "Windbreaker", "image": "clothing-outerwear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "fleece", "name": "Fleece / Vest", "image": "clothing-outerwear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Full Zip","Quarter Zip","Vest","Pullover"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "rain-jacket", "name": "Rain Jacket", "image": "clothing-outerwear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "basics",
      "name": "Basics",
      "image": "clothing-tops",
      "products": [
        {
          "id": "underwear", "name": "Underwear / Boxers", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Boxer Brief","Boxer","Brief","Trunk","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "socks", "name": "Socks", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "text", "value": ""},
            {"label": "Style", "type": "select", "value": "", "options": ["No-Show","Ankle","Crew","Knee-High","Athletic","Dress"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "undershirt", "name": "Undershirt", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Crew","V-Neck","Tank"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "loungewear", "name": "Loungewear", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "pajamas", "name": "Pajamas", "image": "clothing-tops",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Set","Shorts Only","Pants Only","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "athletic-shirt", "name": "Athletic Shirt", "image": "clothing-activewear",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["XS","S","M","L","XL","XXL","XXXL"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Compression","Loose","Tank","Long Sleeve"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "formal",
      "name": "Formal",
      "image": "clothing-tops",
      "products": [
        {
          "id": "suit", "name": "Suit", "image": "clothing-tops",
          "fields": [
            {"label": "Jacket Size", "type": "text", "value": ""},
            {"label": "Pant Waist", "type": "text", "value": ""},
            {"label": "Pant Inseam", "type": "text", "value": ""},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Modern","Classic"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "dress-shirt", "name": "Dress Shirt", "image": "clothing-tops",
          "fields": [
            {"label": "Neck Size", "type": "text", "value": ""},
            {"label": "Sleeve Length", "type": "text", "value": ""},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Relaxed"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "blazer", "name": "Blazer / Sport Coat", "image": "clothing-tops",
          "fields": [
            {"label": "Jacket Size", "type": "text", "value": ""},
            {"label": "Fit", "type": "select", "value": "", "options": ["Slim","Regular","Relaxed"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Structured","Unstructured","Knit","Linen"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "tie", "name": "Tie", "image": "clothing-tops",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Necktie","Bow Tie","Skinny Tie","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "dress-shoes-formal", "name": "Dress Shoes", "image": "clothing-tops",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Width", "type": "select", "value": "", "options": ["Narrow","Regular","Wide","Extra Wide"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Oxford","Derby","Loafer","Chelsea Boot","Monk Strap"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "pocket-square", "name": "Pocket Square / Tie Bar", "image": "clothing-tops",
          "fields": [
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    }
  ]'::jsonb
);

-- ─── 2. SHOES ───────────────────────────────────────────────
INSERT INTO category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories)
VALUES (
  'shoes-male', 'Footwear', 'style-fit', 'mygotwo', ARRAY['male'], 20, true, '[]'::jsonb,
  '[
    {
      "id": "sneakers-casual",
      "name": "Sneakers",
      "image": "shoe-sneakers",
      "products": [
        {
          "id": "low-top", "name": "Low Top", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Width", "type": "select", "value": "", "options": ["Narrow","Regular","Wide","Extra Wide"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Minimalist","Chunky","Retro","Court","Designer"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "high-top", "name": "High Top", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Width", "type": "select", "value": "", "options": ["Narrow","Regular","Wide","Extra Wide"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "slip-on", "name": "Slip-On", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "athletic-shoes",
      "name": "Athletic",
      "image": "shoe-sneakers",
      "products": [
        {
          "id": "running-shoes", "name": "Running Shoes", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Width", "type": "select", "value": "", "options": ["Narrow","Regular","Wide","Extra Wide"]},
            {"label": "Arch Support", "type": "select", "value": "", "options": ["Neutral","Stability","Motion Control"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "training-shoes", "name": "Training Shoes", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Width", "type": "select", "value": "", "options": ["Narrow","Regular","Wide","Extra Wide"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "basketball-shoes", "name": "Basketball Shoes", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "boots",
      "name": "Boots",
      "image": "shoe-boots",
      "products": [
        {
          "id": "chelsea-boots", "name": "Chelsea Boots", "image": "shoe-boots",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Width", "type": "select", "value": "", "options": ["Narrow","Regular","Wide"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "work-boots", "name": "Work / Hiking Boots", "image": "shoe-boots",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Width", "type": "select", "value": "", "options": ["Narrow","Regular","Wide","Extra Wide"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Work","Hiking","Logger","Moc Toe"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "chukka-boots", "name": "Chukka Boots", "image": "shoe-boots",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "casual-shoes",
      "name": "Casual",
      "image": "shoe-sneakers",
      "products": [
        {
          "id": "loafers-casual", "name": "Loafers", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Style", "type": "select", "value": "", "options": ["Penny","Tassel","Horsebit","Driving"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sandals-casual", "name": "Sandals", "image": "shoe-sandals",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Style", "type": "select", "value": "", "options": ["Slide","Flip Flop","Strap","Sport"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "moccasins", "name": "Moccasins / Boat Shoes", "image": "shoe-sneakers",
          "fields": [
            {"label": "US Size", "type": "text", "value": ""},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    }
  ]'::jsonb
);

-- ─── 3. GROOMING ────────────────────────────────────────────
INSERT INTO category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories)
VALUES (
  'grooming-male', 'Grooming', 'style-fit', 'mygotwo', ARRAY['male'], 30, true, '[]'::jsonb,
  '[
    {
      "id": "hair",
      "name": "Hair",
      "image": "grooming-hair",
      "products": [
        {
          "id": "shampoo", "name": "Shampoo", "image": "grooming-hair",
          "fields": [
            {"label": "Hair Type", "type": "select", "value": "", "options": ["Fine","Normal","Thick","Curly","Coily","Wavy"]},
            {"label": "Concern", "type": "select", "value": "", "options": ["Dandruff","Oily","Dry","Color-Treated","Thinning","No Concern"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "conditioner", "name": "Conditioner", "image": "grooming-hair",
          "fields": [
            {"label": "Hair Type", "type": "select", "value": "", "options": ["Fine","Normal","Thick","Curly","Coily","Wavy"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "styling-product", "name": "Styling Product", "image": "grooming-hair",
          "fields": [
            {"label": "Product Type", "type": "select", "value": "", "options": ["Pomade","Clay","Wax","Gel","Mousse","Paste","Cream","Spray","No Product"]},
            {"label": "Hold", "type": "select", "value": "", "options": ["Light","Medium","Strong","Extra Strong"]},
            {"label": "Finish", "type": "select", "value": "", "options": ["Matte","Low Sheen","Natural","High Shine"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "hair-tools", "name": "Hair Tools", "image": "grooming-hair",
          "fields": [
            {"label": "Tools Used", "type": "select", "value": "", "options": ["Blow Dryer","Flat Iron","Curling Iron","Hair Clipper","None"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "hair-color", "name": "Hair Color / Treatment", "image": "grooming-hair",
          "fields": [
            {"label": "Treatment", "type": "select", "value": "", "options": ["None","Color","Highlights","Toner","Keratin","Scalp Treatment"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "hair-loss", "name": "Hair Loss / Thinning", "image": "grooming-hair",
          "fields": [
            {"label": "Concern", "type": "select", "value": "", "options": ["None","Thinning","Receding","Use Products","No Preference"]},
            {"label": "Products Used", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "skin",
      "name": "Skincare",
      "image": "grooming-skin",
      "products": [
        {
          "id": "face-wash", "name": "Face Wash", "image": "grooming-skin",
          "fields": [
            {"label": "Skin Type", "type": "select", "value": "", "options": ["Dry","Normal","Oily","Combination","Sensitive"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "moisturizer", "name": "Moisturizer", "image": "grooming-skin",
          "fields": [
            {"label": "Skin Type", "type": "select", "value": "", "options": ["Dry","Normal","Oily","Combination","Sensitive"]},
            {"label": "SPF", "type": "select", "value": "", "options": ["No SPF","SPF 15","SPF 30","SPF 50+"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "serum", "name": "Serum / Treatment", "image": "grooming-skin",
          "fields": [
            {"label": "Concern", "type": "select", "value": "", "options": ["Anti-Aging","Brightening","Acne","Hyperpigmentation","Hydration","None"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "eye-cream", "name": "Eye Cream", "image": "grooming-skin",
          "fields": [
            {"label": "Concern", "type": "select", "value": "", "options": ["Dark Circles","Puffiness","Wrinkles","None"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sunscreen", "name": "Sunscreen", "image": "grooming-skin",
          "fields": [
            {"label": "SPF", "type": "select", "value": "", "options": ["SPF 15","SPF 30","SPF 50","SPF 50+"]},
            {"label": "Formula", "type": "select", "value": "", "options": ["Mineral","Chemical","Hybrid","Tinted"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "lip-balm", "name": "Lip Balm", "image": "grooming-skin",
          "fields": [
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "beard-shaving",
      "name": "Beard & Shaving",
      "image": "grooming-shaving",
      "products": [
        {
          "id": "razor", "name": "Razor", "image": "grooming-shaving",
          "fields": [
            {"label": "Type", "type": "select", "value": "", "options": ["Cartridge","Safety Razor","Electric","Straight Razor","Disposable"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "shave-cream", "name": "Shave Cream / Gel", "image": "grooming-shaving",
          "fields": [
            {"label": "Format", "type": "select", "value": "", "options": ["Cream","Gel","Foam","Oil","Soap","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "beard-oil", "name": "Beard Oil / Balm", "image": "grooming-shaving",
          "fields": [
            {"label": "Beard Length", "type": "select", "value": "", "options": ["Clean Shaven","Stubble","Short","Medium","Long","No Preference"]},
            {"label": "Product", "type": "select", "value": "", "options": ["Oil","Balm","Butter","Wax","None"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "aftershave", "name": "Aftershave", "image": "grooming-shaving",
          "fields": [
            {"label": "Format", "type": "select", "value": "", "options": ["Balm","Lotion","Splash","None"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "beard-trimmer", "name": "Beard Trimmer", "image": "grooming-shaving",
          "fields": [
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "mustache-wax", "name": "Mustache Wax", "image": "grooming-shaving",
          "fields": [
            {"label": "Hold", "type": "select", "value": "", "options": ["Light","Medium","Strong"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "fragrance",
      "name": "Fragrance",
      "image": "scent-cologne",
      "products": [
        {
          "id": "cologne", "name": "Cologne / Eau de Parfum", "image": "scent-cologne",
          "fields": [
            {"label": "Scent Family", "type": "select", "value": "", "options": ["Woody","Fresh","Citrus","Spicy","Oriental","Aquatic","Earthy","Gourmand"]},
            {"label": "Intensity", "type": "select", "value": "", "options": ["Light (EDT)","Medium (EDP)","Strong (Parfum)","No Preference"]},
            {"label": "Season", "type": "select", "value": "", "options": ["Year-Round","Spring/Summer","Fall/Winter","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "deodorant", "name": "Deodorant", "image": "scent-cologne",
          "fields": [
            {"label": "Format", "type": "select", "value": "", "options": ["Stick","Spray","Roll-On","Natural","No Preference"]},
            {"label": "Scent Preference", "type": "select", "value": "", "options": ["Unscented","Light","Fresh","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "body-wash", "name": "Body Wash", "image": "scent-bodycare",
          "fields": [
            {"label": "Scent", "type": "select", "value": "", "options": ["Fresh","Citrus","Woody","Musky","Unscented","No Preference"]},
            {"label": "Skin Type", "type": "select", "value": "", "options": ["Normal","Dry","Sensitive","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "lotion", "name": "Body Lotion", "image": "scent-bodycare",
          "fields": [
            {"label": "Scent", "type": "select", "value": "", "options": ["Unscented","Light","Matching Cologne","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "room-scent", "name": "Room / Home Scent", "image": "scent-cologne",
          "fields": [
            {"label": "Format", "type": "select", "value": "", "options": ["Candle","Diffuser","Spray","Incense","No Preference"]},
            {"label": "Scent Family", "type": "select", "value": "", "options": ["Woody","Fresh","Citrus","Spicy","Floral","Earthy"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "bar-soap", "name": "Bar Soap", "image": "scent-bodycare",
          "fields": [
            {"label": "Scent", "type": "select", "value": "", "options": ["Unscented","Fresh","Woodsy","Citrus","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    }
  ]'::jsonb
);

-- ─── 4. VIBE ────────────────────────────────────────────────
INSERT INTO category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories)
VALUES (
  'vibe-male', 'Vibe', 'style-fit', 'mygotwo', ARRAY['male'], 40, true, '[]'::jsonb,
  '[
    {
      "id": "aesthetic",
      "name": "Aesthetic",
      "image": "brand-preferences",
      "products": [
        {
          "id": "streetwear", "name": "Streetwear", "image": "brand-preferences",
          "fields": [
            {"label": "Vibe", "type": "select", "value": "", "options": ["Core Streetwear","Skate","Hypebeast","Underground","Graphic-Heavy","Minimal Street"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "smart-casual", "name": "Smart Casual", "image": "brand-preferences",
          "fields": [
            {"label": "Lean", "type": "select", "value": "", "options": ["Casual-Forward","Business-Casual","Smart-Casual","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "heritage-workwear", "name": "Heritage / Workwear", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Americana","Western","Military","Rugged Workwear","Field & Stream","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "old-money", "name": "Old Money / Prep", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Classic Prep","Ivy League","Country Club","Coastal","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "minimalist", "name": "Minimalist", "image": "brand-preferences",
          "fields": [
            {"label": "Palette Lean", "type": "select", "value": "", "options": ["Monochrome","Neutral Tones","Earth Tones","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "vintage-thrift", "name": "Vintage / Thrift", "image": "brand-preferences",
          "fields": [
            {"label": "Era", "type": "select", "value": "", "options": ["70s","80s","90s","Y2K","Mixed Eras","No Preference"]},
            {"label": "Favorite Spots", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "fit-personality",
      "name": "Fit Personality",
      "image": "brand-preferences",
      "products": [
        {
          "id": "techwear", "name": "Techwear / Utility", "image": "brand-preferences",
          "fields": [
            {"label": "Vibe", "type": "select", "value": "", "options": ["Functional","Futuristic","Tactical","Outdoor Performance","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "bohemian", "name": "Bohemian / Eclectic", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Free Spirit","Festival","Artsy","Hippie-Modern","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sporty-athleisure", "name": "Sporty / Athleisure", "image": "brand-preferences",
          "fields": [
            {"label": "Lean", "type": "select", "value": "", "options": ["Pure Athletic","Athleisure","Streetwear-Sport","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "rocker-edgy", "name": "Rock / Edgy", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Classic Rock","Punk","Metal","Dark Minimalist","Grunge","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "coastal-outdoor", "name": "Coastal / Outdoor", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Surf","Fishing","Hunting","Hiking","Nautical","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "business-formal", "name": "Business / Formal", "image": "brand-preferences",
          "fields": [
            {"label": "Dress Code", "type": "select", "value": "", "options": ["Business Casual","Business Professional","Black Tie","No Preference"]},
            {"label": "Favorite Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    }
  ]'::jsonb
);

-- ─── 5. ACCESSORY ───────────────────────────────────────────
INSERT INTO category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories)
VALUES (
  'accessory-male', 'Accessory', 'style-fit', 'mygotwo', ARRAY['male'], 50, true, '[]'::jsonb,
  '[
    {
      "id": "watches-jewelry",
      "name": "Watches & Jewelry",
      "image": "jewelry-watches",
      "products": [
        {
          "id": "watch", "name": "Watch", "image": "jewelry-watches",
          "fields": [
            {"label": "Case Size", "type": "select", "value": "", "options": ["36mm","38mm","40mm","42mm","44mm","46mm+","No Preference"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Dress","Sport","Dive","Field","Chronograph","Smart","No Preference"]},
            {"label": "Band Material", "type": "select", "value": "", "options": ["Metal","Leather","Rubber","NATO","Fabric","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "necklace", "name": "Necklace / Chain", "image": "jewelry-necklaces",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Chain","Pendant","Dog Tag","Beaded","No Preference"]},
            {"label": "Metal", "type": "select", "value": "", "options": ["Gold","Silver","Rose Gold","Stainless Steel","Mixed","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "bracelet", "name": "Bracelet", "image": "jewelry-bracelets",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Chain","Beaded","Leather","Cuff","Rubber","No Preference"]},
            {"label": "Metal", "type": "select", "value": "", "options": ["Gold","Silver","Stainless Steel","Mixed","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "ring", "name": "Ring", "image": "measure-ring",
          "fields": [
            {"label": "Ring Size", "type": "text", "value": ""},
            {"label": "Metal", "type": "select", "value": "", "options": ["Gold","Silver","Rose Gold","Stainless Steel","Tungsten","No Preference"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Band","Signet","Statement","Minimalist","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "earring", "name": "Earring", "image": "jewelry-earrings",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Stud","Hoop","Drop","No Preference"]},
            {"label": "Metal", "type": "select", "value": "", "options": ["Gold","Silver","Stainless Steel","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "cufflinks", "name": "Cufflinks / Tie Bar", "image": "jewelry-watches",
          "fields": [
            {"label": "Metal", "type": "select", "value": "", "options": ["Gold","Silver","Rose Gold","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "bags-carry",
      "name": "Bags & Carry",
      "image": "specific-products",
      "products": [
        {
          "id": "wallet", "name": "Wallet", "image": "specific-products",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Bifold","Trifold","Slim Card Holder","Money Clip","Phone Wallet","No Preference"]},
            {"label": "Material", "type": "select", "value": "", "options": ["Leather","Canvas","Synthetic","Metal","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "backpack", "name": "Backpack", "image": "specific-products",
          "fields": [
            {"label": "Use", "type": "select", "value": "", "options": ["Everyday","Work/Laptop","Travel","Hiking","Gym","No Preference"]},
            {"label": "Size", "type": "select", "value": "", "options": ["Small (under 20L)","Medium (20-30L)","Large (30L+)","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "bag", "name": "Bag / Tote", "image": "specific-products",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Tote","Messenger","Duffel","Weekender","Crossbody","No Preference"]},
            {"label": "Material", "type": "select", "value": "", "options": ["Leather","Canvas","Nylon","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "gym-bag", "name": "Gym Bag / Duffle", "image": "specific-products",
          "fields": [
            {"label": "Size", "type": "select", "value": "", "options": ["Small","Medium","Large","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "laptop-bag", "name": "Laptop Bag / Briefcase", "image": "specific-products",
          "fields": [
            {"label": "Laptop Size", "type": "select", "value": "", "options": ["13 inch","14 inch","15 inch","16 inch","No Preference"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Sleeve","Briefcase","Backpack","Messenger","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "fanny-pack", "name": "Fanny Pack / Sling", "image": "specific-products",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Fanny Pack","Sling Bag","Chest Bag","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "headwear-eyewear",
      "name": "Hats & Eyewear",
      "image": "brand-preferences",
      "products": [
        {
          "id": "baseball-cap", "name": "Baseball Cap", "image": "brand-preferences",
          "fields": [
            {"label": "Fit", "type": "select", "value": "", "options": ["Snapback","Fitted","Flexfit","Dad Hat","No Preference"]},
            {"label": "Style", "type": "select", "value": "", "options": ["Flat Brim","Curved Brim","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "beanie", "name": "Beanie", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Cuffed","Slouchy","No Cuff","Pom Pom","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "hat", "name": "Hat", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Fedora","Bucket Hat","Cowboy","Panama","Flat Cap","Trucker","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sunglasses", "name": "Sunglasses", "image": "brand-preferences",
          "fields": [
            {"label": "Frame Shape", "type": "select", "value": "", "options": ["Aviator","Wayfarer","Round","Square","Sport","Oversized","No Preference"]},
            {"label": "Lens", "type": "select", "value": "", "options": ["Dark","Mirrored","Gradient","Polarized","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "glasses", "name": "Glasses / Frames", "image": "brand-preferences",
          "fields": [
            {"label": "Frame Shape", "type": "select", "value": "", "options": ["Round","Square","Rectangle","Oval","No Preference"]},
            {"label": "Material", "type": "select", "value": "", "options": ["Metal","Acetate","Titanium","Mixed","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "belt", "name": "Belt", "image": "brand-preferences",
          "fields": [
            {"label": "Waist Size", "type": "text", "value": ""},
            {"label": "Style", "type": "select", "value": "", "options": ["Dress","Casual","Braided","Reversible","No Preference"]},
            {"label": "Material", "type": "select", "value": "", "options": ["Leather","Canvas","Fabric","No Preference"]},
            {"label": "Preferred Brands", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    }
  ]'::jsonb
);

-- ─── 6. TASTE ───────────────────────────────────────────────
INSERT INTO category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories)
VALUES (
  'taste-male', 'Taste', 'style-fit', 'mygotwo', ARRAY['male'], 60, true, '[]'::jsonb,
  '[
    {
      "id": "colors",
      "name": "Colors",
      "image": "brand-preferences",
      "products": [
        {
          "id": "top-colors", "name": "Favorite Colors", "image": "brand-preferences",
          "fields": [
            {"label": "Top Color 1", "type": "select", "value": "", "options": ["Black","White","Grey","Navy","Olive","Tan","Brown","Burgundy","Forest Green","Camel","Cream","Rust","Slate Blue","Charcoal","Other"]},
            {"label": "Top Color 2", "type": "select", "value": "", "options": ["Black","White","Grey","Navy","Olive","Tan","Brown","Burgundy","Forest Green","Camel","Cream","Rust","Slate Blue","Charcoal","Other"]},
            {"label": "Top Color 3", "type": "select", "value": "", "options": ["Black","White","Grey","Navy","Olive","Tan","Brown","Burgundy","Forest Green","Camel","Cream","Rust","Slate Blue","Charcoal","Other"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "avoid-colors", "name": "Colors to Avoid", "image": "brand-preferences",
          "fields": [
            {"label": "Avoid Color 1", "type": "select", "value": "", "options": ["Black","White","Grey","Navy","Olive","Tan","Brown","Burgundy","Forest Green","Camel","Cream","Rust","Slate Blue","Charcoal","Bright Colors","Pastels","Other"]},
            {"label": "Avoid Color 2", "type": "select", "value": "", "options": ["Black","White","Grey","Navy","Olive","Tan","Brown","Burgundy","Forest Green","Camel","Cream","Rust","Slate Blue","Charcoal","Bright Colors","Pastels","Other"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "color-palette", "name": "Overall Palette", "image": "brand-preferences",
          "fields": [
            {"label": "Palette Lean", "type": "select", "value": "", "options": ["Monochrome","Neutral Tones","Earth Tones","Muted Pastels","Bold & Bright","Dark & Moody","Mixed","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "seasonal-colors", "name": "Seasonal Colors", "image": "brand-preferences",
          "fields": [
            {"label": "Spring", "type": "text", "value": ""},
            {"label": "Summer", "type": "text", "value": ""},
            {"label": "Fall", "type": "text", "value": ""},
            {"label": "Winter", "type": "text", "value": ""}
          ]
        },
        {
          "id": "accent-colors", "name": "Accent Colors", "image": "brand-preferences",
          "fields": [
            {"label": "Goes-To Accent", "type": "select", "value": "", "options": ["Red","Orange","Yellow","Pink","Purple","Teal","Cobalt","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "shoe-color", "name": "Shoe Color Preference", "image": "brand-preferences",
          "fields": [
            {"label": "Favorite Shoe Color", "type": "select", "value": "", "options": ["White","Black","Brown","Tan","Grey","Navy","Colorful","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "patterns",
      "name": "Patterns",
      "image": "brand-preferences",
      "products": [
        {
          "id": "fav-patterns", "name": "Favorite Patterns", "image": "brand-preferences",
          "fields": [
            {"label": "Pattern 1", "type": "select", "value": "", "options": ["Solid","Stripes","Plaid","Check","Houndstooth","Camo","Floral","Geometric","Abstract","Graphic","No Pattern"]},
            {"label": "Pattern 2", "type": "select", "value": "", "options": ["Solid","Stripes","Plaid","Check","Houndstooth","Camo","Floral","Geometric","Abstract","Graphic","No Pattern"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "avoid-patterns", "name": "Patterns to Avoid", "image": "brand-preferences",
          "fields": [
            {"label": "Avoid Pattern", "type": "select", "value": "", "options": ["Loud Prints","Floral","Camo","Stripes","Plaid","Animal Print","None"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "graphic-tees", "name": "Graphic Tees", "image": "brand-preferences",
          "fields": [
            {"label": "Style", "type": "select", "value": "", "options": ["Vintage Bands","Sports","Branded Logo","Artistic","Plain Only","Funny","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "denim-wash", "name": "Denim Wash", "image": "brand-preferences",
          "fields": [
            {"label": "Preferred Wash", "type": "select", "value": "", "options": ["Raw / Dark Indigo","Medium Wash","Light Wash","Black","Distressed","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "print-scale", "name": "Print Scale", "image": "brand-preferences",
          "fields": [
            {"label": "Preference", "type": "select", "value": "", "options": ["Small / Subtle","Medium","Bold / Large","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "logo-preference", "name": "Logo Visibility", "image": "brand-preferences",
          "fields": [
            {"label": "Preference", "type": "select", "value": "", "options": ["No Logos","Small / Subtle Logo","Medium Logo","Big / Statement Logo","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    },
    {
      "id": "materials",
      "name": "Materials",
      "image": "brand-preferences",
      "products": [
        {
          "id": "fav-fabrics", "name": "Favorite Fabrics", "image": "brand-preferences",
          "fields": [
            {"label": "Fabric 1", "type": "select", "value": "", "options": ["Cotton","Linen","Wool","Cashmere","Denim","Leather","Fleece","Polyester Blend","Nylon","No Preference"]},
            {"label": "Fabric 2", "type": "select", "value": "", "options": ["Cotton","Linen","Wool","Cashmere","Denim","Leather","Fleece","Polyester Blend","Nylon","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "avoid-fabrics", "name": "Fabrics to Avoid", "image": "brand-preferences",
          "fields": [
            {"label": "Avoid Fabric", "type": "select", "value": "", "options": ["Wool (Itchy)","Synthetic","Sheer","Stiff Materials","None"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "texture-preference", "name": "Texture Preference", "image": "brand-preferences",
          "fields": [
            {"label": "Preference", "type": "select", "value": "", "options": ["Smooth","Textured","Soft / Plush","Structured","Woven","No Preference"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "sustainability", "name": "Sustainability", "image": "brand-preferences",
          "fields": [
            {"label": "Matters To Me", "type": "select", "value": "", "options": ["Very Important","Somewhat Important","Not a Factor"]},
            {"label": "Preferred Certifications", "type": "text", "value": ""},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "leather-preference", "name": "Leather Preference", "image": "brand-preferences",
          "fields": [
            {"label": "Type", "type": "select", "value": "", "options": ["Real Leather","Vegan Leather","Either","Avoid Leather"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        },
        {
          "id": "fit-feel", "name": "Fit & Feel", "image": "brand-preferences",
          "fields": [
            {"label": "Overall Fit Lean", "type": "select", "value": "", "options": ["Always Slim","Mostly Slim","Balanced","Mostly Relaxed","Always Oversized","Depends on Piece"]},
            {"label": "Comfort Priority", "type": "select", "value": "", "options": ["Comfort First","Style First","Equal Balance"]},
            {"label": "Notes", "type": "text", "value": ""}
          ]
        }
      ]
    }
  ]'::jsonb
);
