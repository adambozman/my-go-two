-- ─────────────────────────────────────────────────────────────────────────────
-- Home & Living — Gender-specific Level 2 cards, every item own card
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'home-living';

INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

-- ═════════════════════════════════════════════════════════════════════════════
-- MALE
-- ═════════════════════════════════════════════════════════════════════════════

('furniture-male','Furniture','home-living','mygotwo',ARRAY['male'],10,true,'[]'::jsonb,
'[
  {"id":"sofa","name":"Sofa","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Sectional","Mid-Century","Industrial","Minimalist","Other"]},
    {"label":"Material","type":"select","value":"","options":["Fabric","Leather","Velvet","Microfiber","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bed-frame","name":"Bed Frame","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Style","type":"select","value":"","options":["Platform","Upholstered","Metal","Wooden","Storage Bed"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dining-table","name":"Dining Table","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["2-4 Person","4-6 Person","6-8 Person","8+ Person"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Glass","Marble","Metal","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"desk","name":"Desk","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Standing Desk","L-Shaped","Simple Writing Desk","Corner Desk","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Metal","Glass","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bookshelf","name":"Bookshelf","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Floating Shelves","Freestanding","Built-In","Ladder","Cube"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coffee-table","name":"Coffee Table","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Industrial","Rustic","Minimalist","Ottoman","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Glass","Metal","Marble","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"accent-chair","name":"Accent Chair","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Lounge","Recliner","Barrel","Slipper","Egg Chair","Other"]},
    {"label":"Material","type":"select","value":"","options":["Fabric","Leather","Velvet","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dresser","name":"Dresser","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Tall","Wide","Double","Mid-Century","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","MDF","Metal","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('kitchen-cooking-male','Kitchen & Cooking','home-living','mygotwo',ARRAY['male'],20,true,'[]'::jsonb,
'[
  {"id":"cookware","name":"Cookware","image":"grocery-specifics","fields":[
    {"label":"Type","type":"select","value":"","options":["Non-Stick","Cast Iron","Stainless Steel","Carbon Steel","Ceramic"]},
    {"label":"Item","type":"select","value":"","options":["Skillet","Saucepan","Dutch Oven","Wok","Full Set","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"knives","name":"Knives","image":"grocery-specifics","fields":[
    {"label":"Type","type":"select","value":"","options":["Chef''s Knife","Santoku","Bread Knife","Paring Knife","Full Set"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"small-appliances","name":"Small Appliances","image":"grocery-specifics","fields":[
    {"label":"Item","type":"select","value":"","options":["Air Fryer","Instant Pot","Blender","Toaster Oven","Food Processor","Rice Cooker","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coffee-maker","name":"Coffee Maker","image":"coffee-hot","fields":[
    {"label":"Type","type":"select","value":"","options":["Drip","Espresso Machine","French Press","Pour Over","Pod Machine","Moka Pot"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"stand-mixer","name":"Stand Mixer","image":"grocery-specifics","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Color","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cutting-boards","name":"Cutting Boards","image":"grocery-specifics","fields":[
    {"label":"Material","type":"select","value":"","options":["Wood","Bamboo","Plastic","Marble","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"storage-organization","name":"Storage & Organization","image":"grocery-pantry","fields":[
    {"label":"Item","type":"select","value":"","options":["Pantry Containers","Spice Rack","Cabinet Organizer","Drawer Dividers","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bakeware","name":"Bakeware","image":"grocery-specifics","fields":[
    {"label":"Item","type":"select","value":"","options":["Sheet Pan","Muffin Tin","Loaf Pan","Cake Pan","Full Set","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('electronics-entertainment-male','Electronics & Entertainment','home-living','mygotwo',ARRAY['male'],30,true,'[]'::jsonb,
'[
  {"id":"tv","name":"TV","image":"specific-products","fields":[
    {"label":"Screen Size","type":"select","value":"","options":["Under 40\"","40-50\"","55\"","65\"","75\"","85\"+"]},
    {"label":"Type","type":"select","value":"","options":["OLED","QLED","LED","4K","8K"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $500","$500-$1000","$1000-$2000","$2000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sound-system","name":"Sound System","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Soundbar","Surround Sound","Bookshelf Speakers","Floor Speakers","Subwoofer","Full System"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $200","$200-$500","$500-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gaming-setup","name":"Gaming Setup","image":"specific-products","fields":[
    {"label":"Platform","type":"select","value":"","options":["PlayStation","Xbox","Nintendo","PC","Multi-Platform"]},
    {"label":"Item","type":"select","value":"","options":["Console","Monitor","Gaming Chair","Desk","Headset","Controller","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"smart-home-hub","name":"Smart Home Hub","image":"specific-products","fields":[
    {"label":"Ecosystem","type":"select","value":"","options":["Amazon Alexa","Google Home","Apple HomeKit","Samsung SmartThings","Other"]},
    {"label":"Item","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"projector","name":"Projector","image":"specific-products","fields":[
    {"label":"Use","type":"select","value":"","options":["Home Theater","Gaming","Outdoor Movies","Portable","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $300","$300-$700","$700-$1500","$1500+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"streaming-devices","name":"Streaming Devices","image":"specific-products","fields":[
    {"label":"Device","type":"select","value":"","options":["Apple TV","Roku","Fire Stick","Chromecast","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"turntable","name":"Turntable","image":"specific-products","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $150","$150-$300","$300-$600","$600+"]},
    {"label":"Favorite Genres / Artists","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('bedroom-male','Bedroom','home-living','mygotwo',ARRAY['male'],40,true,'[]'::jsonb,
'[
  {"id":"bedding","name":"Bedding","image":"wish-list","fields":[
    {"label":"Bed Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Material","type":"select","value":"","options":["Cotton","Linen","Bamboo","Microfiber","Flannel"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pillows","name":"Pillows","image":"wish-list","fields":[
    {"label":"Sleep Position","type":"select","value":"","options":["Side","Back","Stomach","Combo"]},
    {"label":"Fill","type":"select","value":"","options":["Down","Memory Foam","Latex","Buckwheat","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mattress","name":"Mattress","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Feel","type":"select","value":"","options":["Soft","Medium","Firm","Extra Firm"]},
    {"label":"Type","type":"select","value":"","options":["Memory Foam","Innerspring","Hybrid","Latex","Airbed"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"nightstand","name":"Nightstand","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Minimalist","Industrial","Floating","Mid-Century","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lighting","name":"Lighting","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Bedside Lamp","Floor Lamp","Overhead","LED Strip","Smart Bulbs","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"blackout-curtains","name":"Blackout Curtains","image":"wish-list","fields":[
    {"label":"Color","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"white-noise-machine","name":"White Noise Machine","image":"specific-products","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Sound Type","type":"select","value":"","options":["White Noise","Fan","Nature Sounds","Pink Noise","All"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('bathroom-male','Bathroom','home-living','mygotwo',ARRAY['male'],50,true,'[]'::jsonb,
'[
  {"id":"towels","name":"Towels","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Cotton","Turkish Cotton","Bamboo","Microfiber","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bath-mat","name":"Bath Mat","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Cotton","Memory Foam","Bamboo","Diatomite","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shower-curtain","name":"Shower Curtain","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Solid","Pattern","Fabric","Vinyl","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vanity-accessories","name":"Vanity Accessories","image":"grooming","fields":[
    {"label":"Item","type":"select","value":"","options":["Toothbrush Holder","Soap Dispenser","Cotton Jar","Tray","Mirror","All"]},
    {"label":"Finish","type":"select","value":"","options":["Chrome","Matte Black","Gold","Brushed Nickel","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mirror","name":"Mirror","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Vanity Mirror","Full Length","Medicine Cabinet","Magnifying","Other"]},
    {"label":"Frame","type":"select","value":"","options":["Frameless","Metal","Wood","LED","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"skincare-storage","name":"Skincare Storage","image":"grooming-skin","fields":[
    {"label":"Item","type":"select","value":"","options":["Acrylic Organizer","Drawer Insert","Shelf","Under-Sink Organizer","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"robe","name":"Robe","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["S","M","L","XL","XXL"]},
    {"label":"Material","type":"select","value":"","options":["Terry","Waffle","Silk","Fleece","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('garage-tools-male','Garage & Tools','home-living','mygotwo',ARRAY['male'],60,true,'[]'::jsonb,
'[
  {"id":"power-tools","name":"Power Tools","image":"specific-products","fields":[
    {"label":"Tool","type":"select","value":"","options":["Drill","Circular Saw","Jigsaw","Sander","Router","Impact Driver","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Battery Platform","type":"select","value":"","options":["DeWalt","Milwaukee","Makita","Ryobi","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hand-tools","name":"Hand Tools","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Hammer","Screwdriver Set","Wrench Set","Pliers","Level","Tool Set","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tool-storage","name":"Tool Storage","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Tool Chest","Cabinet","Wall Mount","Pegboard","Tool Bag","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"workbench","name":"Workbench","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Folding","Fixed","Adjustable Height","With Vice","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"car-care","name":"Car Care","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Vacuum","Pressure Washer","Polisher","Detail Kit","Jump Starter","Tire Inflator","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lawn-garden","name":"Lawn & Garden","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Lawn Mower","Leaf Blower","Trimmer","Edger","Sprinkler","Garden Tools","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Power","type":"select","value":"","options":["Battery","Gas","Electric","Manual"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"safety-gear","name":"Safety Gear","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Safety Glasses","Ear Protection","Gloves","Dust Mask","First Aid Kit","Fire Extinguisher","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('outdoor-patio-male','Outdoor & Patio','home-living','mygotwo',ARRAY['male'],70,true,'[]'::jsonb,
'[
  {"id":"patio-furniture","name":"Patio Furniture","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Dining Set","Lounge Set","Sectional","Chairs","Bench","Other"]},
    {"label":"Material","type":"select","value":"","options":["Aluminum","Teak","Wicker","Steel","Plastic","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"grill","name":"Grill","image":"food-chicken","fields":[
    {"label":"Type","type":"select","value":"","options":["Gas","Charcoal","Pellet","Electric","Kamado","Flat Top"]},
    {"label":"Size","type":"select","value":"","options":["Portable","Small","Medium","Large","Extra Large"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $200","$200-$500","$500-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"string-lights","name":"String Lights","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Globe","Edison","Fairy","Solar","LED","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"planters","name":"Planters","image":"flowers","fields":[
    {"label":"Material","type":"select","value":"","options":["Terracotta","Ceramic","Metal","Wood","Fiberglass","Other"]},
    {"label":"Size","type":"select","value":"","options":["Small","Medium","Large","Extra Large","Raised Bed"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outdoor-rug","name":"Outdoor Rug","image":"wish-list","fields":[
    {"label":"Size","type":"text","value":""},
    {"label":"Style","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fire-pit","name":"Fire Pit","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Wood Burning","Gas","Propane","Tabletop","Fire Bowl","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$300","$300-$700","$700+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hammock","name":"Hammock","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Rope","Fabric","Camping","Double","Chair Hammock","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('organization-male','Organization','home-living','mygotwo',ARRAY['male'],80,true,'[]'::jsonb,
'[
  {"id":"closet","name":"Closet","image":"clothing-tops","fields":[
    {"label":"Item","type":"select","value":"","options":["Closet System","Hangers","Shoe Rack","Drawer Organizer","Shelf Dividers","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"kitchen-drawers","name":"Kitchen Drawers","image":"grocery-pantry","fields":[
    {"label":"Item","type":"select","value":"","options":["Drawer Dividers","Utensil Tray","Cabinet Organizer","Lazy Susan","Spice Rack","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bathroom-org","name":"Bathroom","image":"grooming","fields":[
    {"label":"Item","type":"select","value":"","options":["Under-Sink Organizer","Shower Caddy","Medicine Cabinet","Drawer Insert","Over-Door","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"entryway","name":"Entryway","image":"wish-list","fields":[
    {"label":"Item","type":"select","value":"","options":["Shoe Rack","Key Hook","Entryway Bench","Coat Rack","Mail Organizer","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"home-office","name":"Home Office","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Cable Management","Desk Organizer","Monitor Stand","Drawer Unit","Filing Cabinet","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"garage-org","name":"Garage","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Wall Shelving","Ceiling Storage","Bike Mount","Sports Organizer","Bins & Totes","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"laundry","name":"Laundry","image":"wish-list","fields":[
    {"label":"Item","type":"select","value":"","options":["Laundry Basket","Drying Rack","Hamper","Folding Station","Shelf","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- FEMALE
-- ═════════════════════════════════════════════════════════════════════════════

('furniture-female','Furniture','home-living','mygotwo',ARRAY['female'],10,true,'[]'::jsonb,
'[
  {"id":"sofa","name":"Sofa","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Sectional","Mid-Century","Boho","Minimalist","Other"]},
    {"label":"Material","type":"select","value":"","options":["Fabric","Velvet","Linen","Leather","Boucle","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bed-frame","name":"Bed Frame","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Style","type":"select","value":"","options":["Upholstered","Platform","Canopy","Storage Bed","Wooden","Metal"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dining-table","name":"Dining Table","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["2-4 Person","4-6 Person","6-8 Person","8+ Person"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Marble","Glass","Rattan","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"desk","name":"Desk","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Vanity Desk","Standing Desk","Simple Writing Desk","L-Shaped","Other"]},
    {"label":"Style","type":"select","value":"","options":["Modern","Boho","Minimalist","Mid-Century","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bookshelf","name":"Bookshelf","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Floating Shelves","Freestanding","Ladder","Cube","Built-In"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coffee-table","name":"Coffee Table","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Boho","Marble Top","Glass","Ottoman","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Glass","Marble","Rattan","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"accent-chair","name":"Accent Chair","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Accent","Papasan","Barrel","Slipper","Egg Chair","Boucle","Other"]},
    {"label":"Material","type":"select","value":"","options":["Fabric","Velvet","Boucle","Rattan","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dresser","name":"Dresser","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Tall","Wide","Mid-Century","Rattan-Front","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","MDF","Rattan","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('kitchen-cooking-female','Kitchen & Cooking','home-living','mygotwo',ARRAY['female'],20,true,'[]'::jsonb,
'[
  {"id":"cookware","name":"Cookware","image":"grocery-specifics","fields":[
    {"label":"Type","type":"select","value":"","options":["Non-Stick","Cast Iron","Stainless Steel","Ceramic","Enameled"]},
    {"label":"Item","type":"select","value":"","options":["Skillet","Saucepan","Dutch Oven","Full Set","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"knives","name":"Knives","image":"grocery-specifics","fields":[
    {"label":"Type","type":"select","value":"","options":["Chef''s Knife","Santoku","Bread Knife","Paring Knife","Full Set"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"small-appliances","name":"Small Appliances","image":"grocery-specifics","fields":[
    {"label":"Item","type":"select","value":"","options":["Air Fryer","Instant Pot","Blender","Toaster Oven","Food Processor","Waffle Maker","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coffee-maker","name":"Coffee Maker","image":"coffee-hot","fields":[
    {"label":"Type","type":"select","value":"","options":["Drip","Espresso Machine","French Press","Pour Over","Pod Machine","Moka Pot"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"stand-mixer","name":"Stand Mixer","image":"grocery-specifics","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Color","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cutting-boards","name":"Cutting Boards","image":"grocery-specifics","fields":[
    {"label":"Material","type":"select","value":"","options":["Wood","Bamboo","Marble","Plastic","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"storage-organization","name":"Storage & Organization","image":"grocery-pantry","fields":[
    {"label":"Item","type":"select","value":"","options":["Pantry Containers","Spice Rack","Cabinet Organizer","Lazy Susan","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bakeware","name":"Bakeware","image":"grocery-specifics","fields":[
    {"label":"Item","type":"select","value":"","options":["Sheet Pan","Muffin Tin","Loaf Pan","Cake Pan","Full Set","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('bedroom-female','Bedroom','home-living','mygotwo',ARRAY['female'],30,true,'[]'::jsonb,
'[
  {"id":"bedding","name":"Bedding","image":"wish-list","fields":[
    {"label":"Bed Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Material","type":"select","value":"","options":["Cotton","Linen","Bamboo","Microfiber","Silk"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pillows","name":"Pillows","image":"wish-list","fields":[
    {"label":"Sleep Position","type":"select","value":"","options":["Side","Back","Stomach","Combo"]},
    {"label":"Fill","type":"select","value":"","options":["Down","Memory Foam","Latex","Buckwheat","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mattress","name":"Mattress","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Feel","type":"select","value":"","options":["Soft","Medium","Firm","Extra Firm"]},
    {"label":"Type","type":"select","value":"","options":["Memory Foam","Innerspring","Hybrid","Latex"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"nightstand","name":"Nightstand","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Boho","Minimalist","Floating","Rattan","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lighting","name":"Lighting","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Bedside Lamp","Floor Lamp","String Lights","LED Strip","Smart Bulbs","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"blackout-curtains","name":"Blackout Curtains","image":"wish-list","fields":[
    {"label":"Color","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"white-noise-machine","name":"White Noise Machine","image":"specific-products","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Sound Type","type":"select","value":"","options":["White Noise","Fan","Nature Sounds","Pink Noise","All"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('bathroom-female','Bathroom','home-living','mygotwo',ARRAY['female'],40,true,'[]'::jsonb,
'[
  {"id":"towels","name":"Towels","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Cotton","Turkish Cotton","Bamboo","Waffle Weave","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bath-mat","name":"Bath Mat","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Cotton","Memory Foam","Bamboo","Diatomite","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shower-curtain","name":"Shower Curtain","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Solid","Floral","Abstract","Waffle","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vanity-accessories","name":"Vanity Accessories","image":"grooming-skin","fields":[
    {"label":"Item","type":"select","value":"","options":["Toothbrush Holder","Soap Dispenser","Cotton Jar","Tray","Candle","All"]},
    {"label":"Finish","type":"select","value":"","options":["Gold","Rose Gold","Marble","Chrome","Matte Black","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mirror","name":"Mirror","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Vanity Mirror","Full Length","Hollywood Mirror","LED Mirror","Magnifying","Other"]},
    {"label":"Frame","type":"select","value":"","options":["Gold","Silver","Rose Gold","Frameless","Wood","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"skincare-storage","name":"Skincare Storage","image":"grooming-skin","fields":[
    {"label":"Item","type":"select","value":"","options":["Acrylic Organizer","Fridge for Skincare","Drawer Insert","Shelf","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"robe","name":"Robe","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL"]},
    {"label":"Material","type":"select","value":"","options":["Terry","Waffle","Silk","Satin","Fleece","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('decor-styling-female','Decor & Styling','home-living','mygotwo',ARRAY['female'],50,true,'[]'::jsonb,
'[
  {"id":"wall-art","name":"Wall Art","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Abstract","Botanical","Photography","Prints","Canvas","Gallery Wall","Other"]},
    {"label":"Color Palette","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"throw-pillows","name":"Throw Pillows","image":"wish-list","fields":[
    {"label":"Style","type":"text","value":""},
    {"label":"Material","type":"select","value":"","options":["Velvet","Linen","Cotton","Boucle","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"rugs","name":"Rugs","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["2x3","4x6","5x8","8x10","9x12","Runner","Other"]},
    {"label":"Style","type":"select","value":"","options":["Modern","Boho","Persian","Shag","Jute","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vases","name":"Vases","image":"flowers","fields":[
    {"label":"Style","type":"select","value":"","options":["Minimalist","Sculptural","Ceramic","Glass","Terracotta","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"photo-frames","name":"Photo Frames","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["4x6","5x7","8x10","11x14","Multiple","Gallery Wall Set"]},
    {"label":"Style","type":"select","value":"","options":["Modern","Wood","Gold","Silver","Black","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mirrors","name":"Mirrors","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Full Length","Arch","Round","Sunburst","Gallery","Other"]},
    {"label":"Frame","type":"select","value":"","options":["Gold","Silver","Wood","Rattan","Frameless","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"throw-blankets","name":"Throw Blankets","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Knit","Faux Fur","Cashmere","Fleece","Waffle","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('candles-fragrance-female','Candles & Fragrance','home-living','mygotwo',ARRAY['female'],60,true,'[]'::jsonb,
'[
  {"id":"candle","name":"Candle","image":"scent-candles","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Size","type":"select","value":"","options":["Travel / Votive","Small","Medium","Large","Candle Set"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"reed-diffuser","name":"Reed Diffuser","image":"scent-home","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"wax-melts","name":"Wax Melts","image":"scent-candles","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"room-spray","name":"Room Spray","image":"scent-home","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"incense","name":"Incense","image":"scent-oils","fields":[
    {"label":"Type","type":"select","value":"","options":["Sticks","Cones","Coils","Backflow","Other"]},
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"linen-spray","name":"Linen Spray","image":"scent-home","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"oil-diffuser","name":"Oil Diffuser","image":"scent-oils","fields":[
    {"label":"Type","type":"select","value":"","options":["Ultrasonic","Nebulizing","Heat","Evaporative"]},
    {"label":"Favorite Oils","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('outdoor-patio-female','Outdoor & Patio','home-living','mygotwo',ARRAY['female'],70,true,'[]'::jsonb,
'[
  {"id":"patio-furniture","name":"Patio Furniture","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Dining Set","Lounge Set","Bistro Set","Chairs","Bench","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wicker","Teak","Aluminum","Steel","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"string-lights","name":"String Lights","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Globe","Edison","Fairy","Solar","LED","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"planters","name":"Planters","image":"flowers","fields":[
    {"label":"Material","type":"select","value":"","options":["Terracotta","Ceramic","Metal","Wood","Fiberglass","Other"]},
    {"label":"Size","type":"select","value":"","options":["Small","Medium","Large","Extra Large","Raised Bed"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outdoor-rug","name":"Outdoor Rug","image":"wish-list","fields":[
    {"label":"Size","type":"text","value":""},
    {"label":"Style","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fire-pit","name":"Fire Pit","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Wood Burning","Gas","Propane","Tabletop","Fire Bowl"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hammock","name":"Hammock","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Rope","Fabric","Chair Hammock","Hanging Bed","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"garden","name":"Garden","image":"flowers","fields":[
    {"label":"Garden Type","type":"select","value":"","options":["Vegetable","Herb","Flower","Container","Raised Bed","Other"]},
    {"label":"Favorite Plants","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('organization-female','Organization','home-living','mygotwo',ARRAY['female'],80,true,'[]'::jsonb,
'[
  {"id":"closet","name":"Closet","image":"clothing-tops","fields":[
    {"label":"Item","type":"select","value":"","options":["Closet System","Hangers","Shoe Rack","Drawer Organizer","Shelf Dividers","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"kitchen-drawers","name":"Kitchen Drawers","image":"grocery-pantry","fields":[
    {"label":"Item","type":"select","value":"","options":["Drawer Dividers","Utensil Tray","Cabinet Organizer","Lazy Susan","Pantry Containers","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bathroom-org","name":"Bathroom","image":"grooming-skin","fields":[
    {"label":"Item","type":"select","value":"","options":["Under-Sink Organizer","Shower Caddy","Vanity Organizer","Drawer Insert","Over-Door","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"entryway","name":"Entryway","image":"wish-list","fields":[
    {"label":"Item","type":"select","value":"","options":["Shoe Rack","Key Hook","Entryway Bench","Coat Rack","Mail Organizer","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"home-office","name":"Home Office","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Desk Organizer","Cable Management","Monitor Stand","Filing System","Bulletin Board","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"laundry","name":"Laundry","image":"wish-list","fields":[
    {"label":"Item","type":"select","value":"","options":["Laundry Basket","Drying Rack","Hamper","Folding Station","Shelf","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"junk-drawer","name":"Junk Drawer","image":"grocery-pantry","fields":[
    {"label":"Item","type":"select","value":"","options":["Drawer Organizer","Small Bins","Label Maker","Dividers","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- NON-BINARY
-- ═════════════════════════════════════════════════════════════════════════════

('furniture-nb','Furniture','home-living','mygotwo',ARRAY['non-binary'],10,true,'[]'::jsonb,
'[
  {"id":"sofa","name":"Sofa","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Sectional","Mid-Century","Minimalist","Boho","Other"]},
    {"label":"Material","type":"select","value":"","options":["Fabric","Leather","Velvet","Linen","Boucle","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bed-frame","name":"Bed Frame","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Style","type":"select","value":"","options":["Platform","Upholstered","Metal","Wooden","Storage Bed","Canopy"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dining-table","name":"Dining Table","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["2-4 Person","4-6 Person","6-8 Person","8+ Person"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Glass","Marble","Metal","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"desk","name":"Desk","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Standing Desk","L-Shaped","Simple Writing Desk","Corner Desk","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Metal","Glass","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bookshelf","name":"Bookshelf","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Floating Shelves","Freestanding","Ladder","Cube","Built-In"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coffee-table","name":"Coffee Table","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Industrial","Minimalist","Boho","Ottoman","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","Glass","Metal","Marble","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"accent-chair","name":"Accent Chair","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Lounge","Egg Chair","Barrel","Papasan","Slipper","Other"]},
    {"label":"Material","type":"select","value":"","options":["Fabric","Velvet","Leather","Boucle","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dresser","name":"Dresser","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Tall","Wide","Mid-Century","Other"]},
    {"label":"Material","type":"select","value":"","options":["Wood","MDF","Metal","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('kitchen-cooking-nb','Kitchen & Cooking','home-living','mygotwo',ARRAY['non-binary'],20,true,'[]'::jsonb,
'[
  {"id":"cookware","name":"Cookware","image":"grocery-specifics","fields":[
    {"label":"Type","type":"select","value":"","options":["Non-Stick","Cast Iron","Stainless Steel","Carbon Steel","Ceramic"]},
    {"label":"Item","type":"select","value":"","options":["Skillet","Saucepan","Dutch Oven","Wok","Full Set","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"knives","name":"Knives","image":"grocery-specifics","fields":[
    {"label":"Type","type":"select","value":"","options":["Chef''s Knife","Santoku","Bread Knife","Paring Knife","Full Set"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"small-appliances","name":"Small Appliances","image":"grocery-specifics","fields":[
    {"label":"Item","type":"select","value":"","options":["Air Fryer","Instant Pot","Blender","Toaster Oven","Food Processor","Rice Cooker","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coffee-maker","name":"Coffee Maker","image":"coffee-hot","fields":[
    {"label":"Type","type":"select","value":"","options":["Drip","Espresso Machine","French Press","Pour Over","Pod Machine","Moka Pot"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"stand-mixer","name":"Stand Mixer","image":"grocery-specifics","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Color","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cutting-boards","name":"Cutting Boards","image":"grocery-specifics","fields":[
    {"label":"Material","type":"select","value":"","options":["Wood","Bamboo","Plastic","Marble","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"storage-organization","name":"Storage & Organization","image":"grocery-pantry","fields":[
    {"label":"Item","type":"select","value":"","options":["Pantry Containers","Spice Rack","Cabinet Organizer","Drawer Dividers","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bakeware","name":"Bakeware","image":"grocery-specifics","fields":[
    {"label":"Item","type":"select","value":"","options":["Sheet Pan","Muffin Tin","Loaf Pan","Cake Pan","Full Set","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('electronics-entertainment-nb','Electronics & Entertainment','home-living','mygotwo',ARRAY['non-binary'],30,true,'[]'::jsonb,
'[
  {"id":"tv","name":"TV","image":"specific-products","fields":[
    {"label":"Screen Size","type":"select","value":"","options":["Under 40\"","40-50\"","55\"","65\"","75\"","85\"+"]},
    {"label":"Type","type":"select","value":"","options":["OLED","QLED","LED","4K","8K"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $500","$500-$1000","$1000-$2000","$2000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sound-system","name":"Sound System","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Soundbar","Surround Sound","Bookshelf Speakers","Floor Speakers","Full System"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $200","$200-$500","$500-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gaming-setup","name":"Gaming Setup","image":"specific-products","fields":[
    {"label":"Platform","type":"select","value":"","options":["PlayStation","Xbox","Nintendo","PC","Multi-Platform"]},
    {"label":"Item","type":"select","value":"","options":["Console","Monitor","Gaming Chair","Desk","Headset","Controller","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"smart-home-hub","name":"Smart Home Hub","image":"specific-products","fields":[
    {"label":"Ecosystem","type":"select","value":"","options":["Amazon Alexa","Google Home","Apple HomeKit","Samsung SmartThings","Other"]},
    {"label":"Item","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"projector","name":"Projector","image":"specific-products","fields":[
    {"label":"Use","type":"select","value":"","options":["Home Theater","Gaming","Outdoor Movies","Portable","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $300","$300-$700","$700-$1500","$1500+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"streaming-devices","name":"Streaming Devices","image":"specific-products","fields":[
    {"label":"Device","type":"select","value":"","options":["Apple TV","Roku","Fire Stick","Chromecast","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"turntable","name":"Turntable","image":"specific-products","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $150","$150-$300","$300-$600","$600+"]},
    {"label":"Favorite Genres / Artists","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('bedroom-nb','Bedroom','home-living','mygotwo',ARRAY['non-binary'],40,true,'[]'::jsonb,
'[
  {"id":"bedding","name":"Bedding","image":"wish-list","fields":[
    {"label":"Bed Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Material","type":"select","value":"","options":["Cotton","Linen","Bamboo","Microfiber","Silk"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pillows","name":"Pillows","image":"wish-list","fields":[
    {"label":"Sleep Position","type":"select","value":"","options":["Side","Back","Stomach","Combo"]},
    {"label":"Fill","type":"select","value":"","options":["Down","Memory Foam","Latex","Buckwheat","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mattress","name":"Mattress","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["Twin","Full","Queen","King","Cal King"]},
    {"label":"Feel","type":"select","value":"","options":["Soft","Medium","Firm","Extra Firm"]},
    {"label":"Type","type":"select","value":"","options":["Memory Foam","Innerspring","Hybrid","Latex"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"nightstand","name":"Nightstand","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Modern","Minimalist","Industrial","Floating","Mid-Century","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lighting","name":"Lighting","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Bedside Lamp","Floor Lamp","LED Strip","String Lights","Smart Bulbs","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"blackout-curtains","name":"Blackout Curtains","image":"wish-list","fields":[
    {"label":"Color","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"white-noise-machine","name":"White Noise Machine","image":"specific-products","fields":[
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Sound Type","type":"select","value":"","options":["White Noise","Fan","Nature Sounds","Pink Noise","All"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('bathroom-nb','Bathroom','home-living','mygotwo',ARRAY['non-binary'],50,true,'[]'::jsonb,
'[
  {"id":"towels","name":"Towels","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Cotton","Turkish Cotton","Bamboo","Microfiber","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bath-mat","name":"Bath Mat","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Cotton","Memory Foam","Bamboo","Diatomite","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shower-curtain","name":"Shower Curtain","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Solid","Pattern","Fabric","Vinyl","Other"]},
    {"label":"Color Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vanity-accessories","name":"Vanity Accessories","image":"grooming","fields":[
    {"label":"Item","type":"select","value":"","options":["Toothbrush Holder","Soap Dispenser","Cotton Jar","Tray","Mirror","All"]},
    {"label":"Finish","type":"select","value":"","options":["Chrome","Matte Black","Gold","Brushed Nickel","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mirror","name":"Mirror","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Vanity Mirror","Full Length","Round","Arch","LED","Other"]},
    {"label":"Frame","type":"select","value":"","options":["Frameless","Metal","Wood","Gold","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"skincare-storage","name":"Skincare Storage","image":"grooming-skin","fields":[
    {"label":"Item","type":"select","value":"","options":["Acrylic Organizer","Drawer Insert","Shelf","Under-Sink Organizer","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"robe","name":"Robe","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},
    {"label":"Material","type":"select","value":"","options":["Terry","Waffle","Silk","Satin","Fleece","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('decor-styling-nb','Decor & Styling','home-living','mygotwo',ARRAY['non-binary'],60,true,'[]'::jsonb,
'[
  {"id":"wall-art","name":"Wall Art","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Abstract","Photography","Prints","Canvas","Posters","Gallery Wall","Other"]},
    {"label":"Color Palette","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"throw-pillows","name":"Throw Pillows","image":"wish-list","fields":[
    {"label":"Style","type":"text","value":""},
    {"label":"Material","type":"select","value":"","options":["Velvet","Linen","Cotton","Boucle","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"rugs","name":"Rugs","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["2x3","4x6","5x8","8x10","9x12","Runner","Other"]},
    {"label":"Style","type":"select","value":"","options":["Modern","Minimalist","Boho","Persian","Jute","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vases","name":"Vases","image":"flowers","fields":[
    {"label":"Style","type":"select","value":"","options":["Minimalist","Sculptural","Ceramic","Glass","Terracotta","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"photo-frames","name":"Photo Frames","image":"wish-list","fields":[
    {"label":"Size","type":"select","value":"","options":["4x6","5x7","8x10","11x14","Gallery Wall Set"]},
    {"label":"Style","type":"select","value":"","options":["Modern","Wood","Black","Metal","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mirrors","name":"Mirrors","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Full Length","Round","Arch","Sunburst","Other"]},
    {"label":"Frame","type":"select","value":"","options":["Gold","Silver","Wood","Frameless","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"throw-blankets","name":"Throw Blankets","image":"wish-list","fields":[
    {"label":"Material","type":"select","value":"","options":["Knit","Faux Fur","Cashmere","Fleece","Waffle","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('outdoor-patio-nb','Outdoor & Patio','home-living','mygotwo',ARRAY['non-binary'],70,true,'[]'::jsonb,
'[
  {"id":"patio-furniture","name":"Patio Furniture","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Dining Set","Lounge Set","Sectional","Chairs","Bench","Other"]},
    {"label":"Material","type":"select","value":"","options":["Aluminum","Teak","Wicker","Steel","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"string-lights","name":"String Lights","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Globe","Edison","Fairy","Solar","LED","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"planters","name":"Planters","image":"flowers","fields":[
    {"label":"Material","type":"select","value":"","options":["Terracotta","Ceramic","Metal","Wood","Fiberglass","Other"]},
    {"label":"Size","type":"select","value":"","options":["Small","Medium","Large","Extra Large","Raised Bed"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outdoor-rug","name":"Outdoor Rug","image":"wish-list","fields":[
    {"label":"Size","type":"text","value":""},
    {"label":"Style","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fire-pit","name":"Fire Pit","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Wood Burning","Gas","Propane","Tabletop","Fire Bowl"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hammock","name":"Hammock","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Rope","Fabric","Camping","Chair Hammock","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"garden","name":"Garden","image":"flowers","fields":[
    {"label":"Garden Type","type":"select","value":"","options":["Vegetable","Herb","Flower","Container","Raised Bed","Other"]},
    {"label":"Favorite Plants","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('organization-nb','Organization','home-living','mygotwo',ARRAY['non-binary'],80,true,'[]'::jsonb,
'[
  {"id":"closet","name":"Closet","image":"clothing-tops","fields":[
    {"label":"Item","type":"select","value":"","options":["Closet System","Hangers","Shoe Rack","Drawer Organizer","Shelf Dividers","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"kitchen-drawers","name":"Kitchen Drawers","image":"grocery-pantry","fields":[
    {"label":"Item","type":"select","value":"","options":["Drawer Dividers","Utensil Tray","Cabinet Organizer","Lazy Susan","Spice Rack","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bathroom-org","name":"Bathroom","image":"grooming","fields":[
    {"label":"Item","type":"select","value":"","options":["Under-Sink Organizer","Shower Caddy","Medicine Cabinet","Drawer Insert","Over-Door","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"entryway","name":"Entryway","image":"wish-list","fields":[
    {"label":"Item","type":"select","value":"","options":["Shoe Rack","Key Hook","Entryway Bench","Coat Rack","Mail Organizer","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"home-office","name":"Home Office","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Cable Management","Desk Organizer","Monitor Stand","Drawer Unit","Filing Cabinet","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"laundry","name":"Laundry","image":"wish-list","fields":[
    {"label":"Item","type":"select","value":"","options":["Laundry Basket","Drying Rack","Hamper","Folding Station","Shelf","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"garage-org","name":"Garage","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Wall Shelving","Ceiling Storage","Bike Mount","Sports Organizer","Bins & Totes","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb);
