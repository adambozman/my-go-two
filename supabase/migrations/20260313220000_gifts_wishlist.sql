-- ─────────────────────────────────────────────────────────────────────────────
-- Gifts & Wishlist — Gender-specific Level 2 cards, every item own card
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'gifts-wishlist';

INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

-- ═════════════════════════════════════════════════════════════════════════════
-- MALE
-- ═════════════════════════════════════════════════════════════════════════════

('wishlist-male','Wishlist','gifts-wishlist','mygotwo',ARRAY['male'],10,true,'[]'::jsonb,
'[
  {"id":"amazon-list","name":"Amazon List","image":"wish-list","fields":[
    {"label":"Amazon List URL","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"general-wishlist","name":"General Wishlist","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Price Range","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100-$250","$250+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"splurge-items","name":"Splurge Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"practical-items","name":"Practical Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Price Range","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sentimental-items","name":"Sentimental Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Meaning","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gift-cards","name":"Gift Cards","image":"wish-list","fields":[
    {"label":"Preferred Store / Brand","type":"text","value":""},
    {"label":"Amount","type":"select","value":"","options":["$25","$50","$100","$150","$200","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"subscriptions","name":"Subscriptions","image":"wish-list","fields":[
    {"label":"Service","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Streaming","Gaming","Food","Fitness","Music","News","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('experiences-male','Experiences','gifts-wishlist','mygotwo',ARRAY['male'],20,true,'[]'::jsonb,
'[
  {"id":"concerts-shows","name":"Concerts & Shows","image":"event-concerts","fields":[
    {"label":"Favorite Artists / Genres","type":"text","value":""},
    {"label":"Preferred Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sports-events","name":"Sports Events","image":"event-sports","fields":[
    {"label":"Favorite Sport","type":"text","value":""},
    {"label":"Favorite Team","type":"text","value":""},
    {"label":"Preferred Seat","type":"select","value":"","options":["Field / Floor","Lower Bowl","Upper Bowl","Suite","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dining-out","name":"Dining Out","image":"favorite-restaurants","fields":[
    {"label":"Favorite Restaurant","type":"text","value":""},
    {"label":"Cuisine","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Casual","Mid-Range","Fine Dining","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"travel","name":"Travel","image":"travel-preferences","fields":[
    {"label":"Dream Destination","type":"text","value":""},
    {"label":"Travel Style","type":"select","value":"","options":["Adventure","Relaxation","Cultural","Road Trip","City Break","Beach","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"spa-wellness","name":"Spa & Wellness","image":"wish-list","fields":[
    {"label":"Preferred Treatment","type":"select","value":"","options":["Massage","Facial","Float Tank","Sauna","Steam Room","Full Day Spa"]},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"classes-workshops","name":"Classes & Workshops","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Cooking","Fitness","Art","Music","Woodworking","Martial Arts","Other"]},
    {"label":"Specific Interest","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"adventure","name":"Adventure Activities","image":"travel-preferences","fields":[
    {"label":"Activity","type":"select","value":"","options":["Skydiving","Bungee Jumping","Surfing","Rock Climbing","Kayaking","Hiking","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('tech-gadgets-male','Tech & Gadgets','gifts-wishlist','mygotwo',ARRAY['male'],30,true,'[]'::jsonb,
'[
  {"id":"phone-accessories","name":"Phone Accessories","image":"specific-products","fields":[
    {"label":"Phone Model","type":"text","value":""},
    {"label":"Item","type":"select","value":"","options":["Case","Screen Protector","Charger","MagSafe","Pop Socket","Stand","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"headphones","name":"Headphones","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Over-Ear","On-Ear","In-Ear / Earbuds","True Wireless"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"smart-home","name":"Smart Home","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Smart Speaker","Smart Bulbs","Smart Plug","Security Camera","Thermostat","Doorbell","Robot Vacuum","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"wearables","name":"Wearables","image":"jewelry-watches","fields":[
    {"label":"Item","type":"select","value":"","options":["Smart Watch","Fitness Tracker","Ring","AR Glasses","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$250","$250-$500","$500+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gaming","name":"Gaming","image":"specific-products","fields":[
    {"label":"Platform","type":"select","value":"","options":["PlayStation","Xbox","Nintendo","PC","Mobile","All"]},
    {"label":"Favorite Games / Genres","type":"text","value":""},
    {"label":"Item","type":"select","value":"","options":["Game","Controller","Headset","Console","Gift Card","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cameras","name":"Cameras","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["DSLR","Mirrorless","Point & Shoot","Action Camera","Instant","Drone"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $200","$200-$500","$500-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"laptop-tablets","name":"Laptop & Tablets","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Laptop","Tablet","iPad","Chromebook","E-Reader"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $500","$500-$1000","$1000-$2000","$2000+"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('home-lifestyle-male','Home & Lifestyle','gifts-wishlist','mygotwo',ARRAY['male'],40,true,'[]'::jsonb,
'[
  {"id":"kitchen-items","name":"Kitchen Items","image":"grocery-specifics","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bar-entertaining","name":"Bar & Entertaining","image":"grocery-specifics","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Whiskey Glasses","Wine Glasses","Cocktail Kit","Decanter","Bar Tools","Beer Steins","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"decor","name":"Decor","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Modern","Industrial","Minimalist","Rustic","Eclectic","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bedding-bath","name":"Bedding & Bath","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"books","name":"Books","image":"wish-list","fields":[
    {"label":"Favorite Genres","type":"text","value":""},
    {"label":"Favorite Authors","type":"text","value":""},
    {"label":"Format","type":"select","value":"","options":["Hardcover","Paperback","E-Book","Audiobook"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"candles-scents","name":"Candles & Scents","image":"scent-candles","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"plants","name":"Plants","image":"wish-list","fields":[
    {"label":"Favorite Plant Type","type":"text","value":""},
    {"label":"Care Level","type":"select","value":"","options":["Low Maintenance","Medium","High Maintenance","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('fashion-accessories-male','Fashion & Accessories','gifts-wishlist','mygotwo',ARRAY['male'],50,true,'[]'::jsonb,
'[
  {"id":"clothing","name":"Clothing","image":"clothing-tops","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoes","name":"Shoes","image":"shoe-sneakers","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"US Size","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jewelry","name":"Jewelry","image":"jewelry","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Titanium","Mixed"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bags-wallets","name":"Bags & Wallets","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Wallet","Backpack","Duffel Bag","Tote","Crossbody","Briefcase","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sunglasses","name":"Sunglasses","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Wayfarer","Aviator","Round","Square","Sport","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hats","name":"Hats","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Baseball Cap","Beanie","Bucket Hat","Snapback","Dad Hat","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"watches","name":"Watches","image":"jewelry-watches","fields":[
    {"label":"Style","type":"select","value":"","options":["Dress","Sport","Casual","Luxury","Smart Watch"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$300","$300-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('sports-outdoors-male','Sports & Outdoors','gifts-wishlist','mygotwo',ARRAY['male'],60,true,'[]'::jsonb,
'[
  {"id":"gym-fitness","name":"Gym & Fitness","image":"clothing-activewear","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Equipment","Apparel","Supplements","Accessories","Gym Bag","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outdoor-gear","name":"Outdoor Gear","image":"travel-preferences","fields":[
    {"label":"Activity","type":"select","value":"","options":["Hiking","Camping","Fishing","Hunting","Cycling","Climbing","Water Sports","Other"]},
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sports-gear","name":"Sports Gear","image":"event-sports","fields":[
    {"label":"Sport","type":"text","value":""},
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fan-gear","name":"Fan Gear","image":"event-sports","fields":[
    {"label":"Team / League","type":"text","value":""},
    {"label":"Item","type":"select","value":"","options":["Jersey","Hat","T-Shirt","Hoodie","Flag","Signed Memorabilia","Other"]},
    {"label":"Player","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"golf","name":"Golf","image":"event-sports","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Handicap","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cycling","name":"Cycling","image":"travel-preferences","fields":[
    {"label":"Type","type":"select","value":"","options":["Road","Mountain","Gravel","BMX","E-Bike","Accessories"]},
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"water-sports","name":"Water Sports","image":"travel-preferences","fields":[
    {"label":"Activity","type":"select","value":"","options":["Surfing","Kayaking","Paddleboarding","Fishing","Swimming","Scuba","Other"]},
    {"label":"Item","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('special-occasions-male','Special Occasions','gifts-wishlist','mygotwo',ARRAY['male'],70,true,'[]'::jsonb,
'[
  {"id":"birthday","name":"Birthday","image":"birthday-preferences","fields":[
    {"label":"Birthday","type":"text","value":""},
    {"label":"Favorite Gift Type","type":"text","value":""},
    {"label":"Dream Birthday","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"anniversary","name":"Anniversary","image":"anniversary-gifts","fields":[
    {"label":"Anniversary Date","type":"text","value":""},
    {"label":"Preferred Gift Style","type":"select","value":"","options":["Experiences","Jewelry","Travel","Sentimental","Practical","Surprise Me"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"holidays","name":"Holidays","image":"wish-list","fields":[
    {"label":"Holiday","type":"select","value":"","options":["Christmas","Hanukkah","Kwanzaa","New Year","Easter","Other"]},
    {"label":"Favorite Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"valentines","name":"Valentine''s Day","image":"anniversary-gifts","fields":[
    {"label":"Preferred Gift Style","type":"select","value":"","options":["Experiences","Jewelry","Tech","Food & Drink","Sentimental","Surprise Me"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"just-because","name":"Just Because","image":"wish-list","fields":[
    {"label":"Favorite Spontaneous Gift","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"graduation","name":"Graduation","image":"wish-list","fields":[
    {"label":"Preferred Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"housewarming","name":"Housewarming","image":"wish-list","fields":[
    {"label":"Home Style","type":"select","value":"","options":["Modern","Industrial","Minimalist","Rustic","Eclectic","Other"]},
    {"label":"Preferred Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('donations-male','Donations & Causes','gifts-wishlist','mygotwo',ARRAY['male'],80,true,'[]'::jsonb,
'[
  {"id":"favorite-charities","name":"Favorite Charities","image":"wish-list","fields":[
    {"label":"Charity Name","type":"text","value":""},
    {"label":"Website","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"causes","name":"Causes I Care About","image":"wish-list","fields":[
    {"label":"Cause","type":"select","value":"","options":["Environment","Education","Health","Hunger","Animal Welfare","Social Justice","Veterans","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"preferred-orgs","name":"Preferred Organizations","image":"wish-list","fields":[
    {"label":"Organization","type":"text","value":""},
    {"label":"Category","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"local-causes","name":"Local Causes","image":"wish-list","fields":[
    {"label":"Local Organization","type":"text","value":""},
    {"label":"How to Donate","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"political","name":"Political","image":"wish-list","fields":[
    {"label":"Party / Affiliation","type":"text","value":""},
    {"label":"Candidate / Cause","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"religious","name":"Religious","image":"wish-list","fields":[
    {"label":"Organization","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- FEMALE
-- ═════════════════════════════════════════════════════════════════════════════

('wishlist-female','Wishlist','gifts-wishlist','mygotwo',ARRAY['female'],10,true,'[]'::jsonb,
'[
  {"id":"amazon-list","name":"Amazon List","image":"wish-list","fields":[
    {"label":"Amazon List URL","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"general-wishlist","name":"General Wishlist","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Price Range","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100-$250","$250+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"splurge-items","name":"Splurge Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"practical-items","name":"Practical Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Price Range","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sentimental-items","name":"Sentimental Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Meaning","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gift-cards","name":"Gift Cards","image":"wish-list","fields":[
    {"label":"Preferred Store / Brand","type":"text","value":""},
    {"label":"Amount","type":"select","value":"","options":["$25","$50","$100","$150","$200","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"subscriptions","name":"Subscriptions","image":"wish-list","fields":[
    {"label":"Service","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Streaming","Beauty Box","Food","Fitness","Books","Fashion","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('experiences-female','Experiences','gifts-wishlist','mygotwo',ARRAY['female'],20,true,'[]'::jsonb,
'[
  {"id":"concerts-shows","name":"Concerts & Shows","image":"event-concerts","fields":[
    {"label":"Favorite Artists / Genres","type":"text","value":""},
    {"label":"Preferred Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sports-events","name":"Sports Events","image":"event-sports","fields":[
    {"label":"Favorite Sport","type":"text","value":""},
    {"label":"Favorite Team","type":"text","value":""},
    {"label":"Preferred Seat","type":"select","value":"","options":["Field / Floor","Lower Bowl","Upper Bowl","Suite","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dining-out","name":"Dining Out","image":"favorite-restaurants","fields":[
    {"label":"Favorite Restaurant","type":"text","value":""},
    {"label":"Cuisine","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Casual","Mid-Range","Fine Dining","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"travel","name":"Travel","image":"travel-preferences","fields":[
    {"label":"Dream Destination","type":"text","value":""},
    {"label":"Travel Style","type":"select","value":"","options":["Adventure","Relaxation","Cultural","Road Trip","City Break","Beach","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"spa-wellness","name":"Spa & Wellness","image":"wish-list","fields":[
    {"label":"Preferred Treatment","type":"select","value":"","options":["Massage","Facial","Mani-Pedi","Float Tank","Sauna","Full Day Spa","Couples Spa"]},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"classes-workshops","name":"Classes & Workshops","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Cooking","Pottery","Painting","Yoga","Dance","Floral Design","Other"]},
    {"label":"Specific Interest","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"theater","name":"Theater & Arts","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Broadway","Ballet","Opera","Comedy Show","Film Festival","Art Exhibition","Other"]},
    {"label":"Favorite Shows / Artists","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('tech-gadgets-female','Tech & Gadgets','gifts-wishlist','mygotwo',ARRAY['female'],30,true,'[]'::jsonb,
'[
  {"id":"phone-accessories","name":"Phone Accessories","image":"specific-products","fields":[
    {"label":"Phone Model","type":"text","value":""},
    {"label":"Item","type":"select","value":"","options":["Case","Screen Protector","Charger","MagSafe","Pop Socket","Stand","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"headphones","name":"Headphones","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Over-Ear","On-Ear","In-Ear / Earbuds","True Wireless"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"smart-home","name":"Smart Home","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Smart Speaker","Smart Bulbs","Smart Plug","Security Camera","Thermostat","Doorbell","Robot Vacuum","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"wearables","name":"Wearables","image":"jewelry-watches","fields":[
    {"label":"Item","type":"select","value":"","options":["Smart Watch","Fitness Tracker","Ring","AR Glasses","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$250","$250-$500","$500+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"beauty-tech","name":"Beauty Tech","image":"grooming-skin","fields":[
    {"label":"Item","type":"select","value":"","options":["Hair Dryer","Curling Iron","Straightener","Gua Sha Tool","LED Mask","Microcurrent Device","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cameras","name":"Cameras","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["DSLR","Mirrorless","Point & Shoot","Action Camera","Instant","Drone"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $200","$200-$500","$500-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"laptop-tablets","name":"Laptop & Tablets","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Laptop","Tablet","iPad","Chromebook","E-Reader"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $500","$500-$1000","$1000-$2000","$2000+"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('home-lifestyle-female','Home & Lifestyle','gifts-wishlist','mygotwo',ARRAY['female'],40,true,'[]'::jsonb,
'[
  {"id":"kitchen-items","name":"Kitchen Items","image":"grocery-specifics","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"candles-scents","name":"Candles & Scents","image":"scent-candles","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Candle","Reed Diffuser","Wax Melt","Room Spray","Incense"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"decor","name":"Decor","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Modern","Boho","Minimalist","Coastal","Farmhouse","Eclectic","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bedding-bath","name":"Bedding & Bath","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"books","name":"Books","image":"wish-list","fields":[
    {"label":"Favorite Genres","type":"text","value":""},
    {"label":"Favorite Authors","type":"text","value":""},
    {"label":"Format","type":"select","value":"","options":["Hardcover","Paperback","E-Book","Audiobook"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bar-entertaining","name":"Bar & Entertaining","image":"grocery-specifics","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Wine Glasses","Cocktail Kit","Champagne Flutes","Serving Board","Bar Cart","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"plants","name":"Plants","image":"flowers","fields":[
    {"label":"Favorite Plant Type","type":"text","value":""},
    {"label":"Care Level","type":"select","value":"","options":["Low Maintenance","Medium","High Maintenance","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('fashion-accessories-female','Fashion & Accessories','gifts-wishlist','mygotwo',ARRAY['female'],50,true,'[]'::jsonb,
'[
  {"id":"clothing","name":"Clothing","image":"clothing-tops","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoes","name":"Shoes","image":"shoe-heels","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"US Size","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jewelry","name":"Jewelry","image":"jewelry","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Mixed"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bags","name":"Bags","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Handbag","Tote","Crossbody","Clutch","Backpack","Belt Bag","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$300","$300-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sunglasses","name":"Sunglasses","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Cat Eye","Round","Oversized","Aviator","Square","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hats","name":"Hats","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Baseball Cap","Beanie","Bucket Hat","Wide Brim","Beret","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"watches","name":"Watches","image":"jewelry-watches","fields":[
    {"label":"Style","type":"select","value":"","options":["Dress","Minimalist","Casual","Luxury","Smart Watch"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$300","$300-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('flowers-plants-female','Flowers & Plants','gifts-wishlist','mygotwo',ARRAY['female'],60,true,'[]'::jsonb,
'[
  {"id":"roses","name":"Roses","image":"flowers-roses","fields":[
    {"label":"Favorite Color","type":"select","value":"","options":["Red","Pink","White","Yellow","Orange","Purple","Mixed"]},
    {"label":"Preferred Quantity","type":"select","value":"","options":["Single Stem","6","12","24","36","50+"]},
    {"label":"Preferred Florist","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sunflowers","name":"Sunflowers","image":"flowers-sunflowers","fields":[
    {"label":"Preferred Quantity","type":"select","value":"","options":["Single Stem","6","12","24","Mixed Bouquet"]},
    {"label":"Preferred Florist","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tulips","name":"Tulips","image":"flowers-tulips","fields":[
    {"label":"Favorite Color","type":"select","value":"","options":["Red","Pink","White","Yellow","Purple","Mixed"]},
    {"label":"Preferred Quantity","type":"select","value":"","options":["6","12","24","Mixed Bouquet"]},
    {"label":"Preferred Florist","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lilies","name":"Lilies","image":"flowers-lilies","fields":[
    {"label":"Favorite Color","type":"select","value":"","options":["White","Pink","Orange","Yellow","Mixed"]},
    {"label":"Preferred Florist","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"orchids","name":"Orchids","image":"flowers","fields":[
    {"label":"Favorite Color","type":"select","value":"","options":["White","Pink","Purple","Yellow","Mixed"]},
    {"label":"Preferred Florist","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"custom-arrangement","name":"Custom Arrangement","image":"flowers","fields":[
    {"label":"Favorite Flowers","type":"text","value":""},
    {"label":"Color Palette","type":"text","value":""},
    {"label":"Preferred Florist","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$100","$100-$200","$200+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"plants","name":"Plants","image":"flowers","fields":[
    {"label":"Favorite Plant Type","type":"text","value":""},
    {"label":"Care Level","type":"select","value":"","options":["Low Maintenance","Medium","High Maintenance","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('special-occasions-female','Special Occasions','gifts-wishlist','mygotwo',ARRAY['female'],70,true,'[]'::jsonb,
'[
  {"id":"birthday","name":"Birthday","image":"birthday-preferences","fields":[
    {"label":"Birthday","type":"text","value":""},
    {"label":"Favorite Gift Type","type":"text","value":""},
    {"label":"Dream Birthday","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"anniversary","name":"Anniversary","image":"anniversary-gifts","fields":[
    {"label":"Anniversary Date","type":"text","value":""},
    {"label":"Preferred Gift Style","type":"select","value":"","options":["Experiences","Jewelry","Travel","Flowers","Sentimental","Surprise Me"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"holidays","name":"Holidays","image":"wish-list","fields":[
    {"label":"Holiday","type":"select","value":"","options":["Christmas","Hanukkah","Kwanzaa","New Year","Easter","Other"]},
    {"label":"Favorite Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"valentines","name":"Valentine''s Day","image":"anniversary-gifts","fields":[
    {"label":"Preferred Gift Style","type":"select","value":"","options":["Flowers","Jewelry","Experiences","Chocolate","Spa","Sentimental","Surprise Me"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"just-because","name":"Just Because","image":"wish-list","fields":[
    {"label":"Favorite Spontaneous Gift","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"graduation","name":"Graduation","image":"wish-list","fields":[
    {"label":"Preferred Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"housewarming","name":"Housewarming","image":"wish-list","fields":[
    {"label":"Home Style","type":"select","value":"","options":["Modern","Boho","Minimalist","Coastal","Farmhouse","Eclectic","Other"]},
    {"label":"Preferred Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('donations-female','Donations & Causes','gifts-wishlist','mygotwo',ARRAY['female'],80,true,'[]'::jsonb,
'[
  {"id":"favorite-charities","name":"Favorite Charities","image":"wish-list","fields":[
    {"label":"Charity Name","type":"text","value":""},
    {"label":"Website","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"causes","name":"Causes I Care About","image":"wish-list","fields":[
    {"label":"Cause","type":"select","value":"","options":["Environment","Education","Health","Hunger","Animal Welfare","Social Justice","Women''s Rights","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"preferred-orgs","name":"Preferred Organizations","image":"wish-list","fields":[
    {"label":"Organization","type":"text","value":""},
    {"label":"Category","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"local-causes","name":"Local Causes","image":"wish-list","fields":[
    {"label":"Local Organization","type":"text","value":""},
    {"label":"How to Donate","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"political","name":"Political","image":"wish-list","fields":[
    {"label":"Party / Affiliation","type":"text","value":""},
    {"label":"Candidate / Cause","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"religious","name":"Religious","image":"wish-list","fields":[
    {"label":"Organization","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- NON-BINARY
-- ═════════════════════════════════════════════════════════════════════════════

('wishlist-nb','Wishlist','gifts-wishlist','mygotwo',ARRAY['non-binary'],10,true,'[]'::jsonb,
'[
  {"id":"amazon-list","name":"Amazon List","image":"wish-list","fields":[
    {"label":"Amazon List URL","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"general-wishlist","name":"General Wishlist","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Price Range","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100-$250","$250+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"splurge-items","name":"Splurge Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"practical-items","name":"Practical Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},
    {"label":"Price Range","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sentimental-items","name":"Sentimental Items","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Meaning","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gift-cards","name":"Gift Cards","image":"wish-list","fields":[
    {"label":"Preferred Store / Brand","type":"text","value":""},
    {"label":"Amount","type":"select","value":"","options":["$25","$50","$100","$150","$200","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"subscriptions","name":"Subscriptions","image":"wish-list","fields":[
    {"label":"Service","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Streaming","Gaming","Food","Fitness","Music","Books","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('experiences-nb','Experiences','gifts-wishlist','mygotwo',ARRAY['non-binary'],20,true,'[]'::jsonb,
'[
  {"id":"concerts-shows","name":"Concerts & Shows","image":"event-concerts","fields":[
    {"label":"Favorite Artists / Genres","type":"text","value":""},
    {"label":"Preferred Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sports-events","name":"Sports Events","image":"event-sports","fields":[
    {"label":"Favorite Sport","type":"text","value":""},
    {"label":"Favorite Team","type":"text","value":""},
    {"label":"Preferred Seat","type":"select","value":"","options":["Field / Floor","Lower Bowl","Upper Bowl","Suite","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dining-out","name":"Dining Out","image":"favorite-restaurants","fields":[
    {"label":"Favorite Restaurant","type":"text","value":""},
    {"label":"Cuisine","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Casual","Mid-Range","Fine Dining","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"travel","name":"Travel","image":"travel-preferences","fields":[
    {"label":"Dream Destination","type":"text","value":""},
    {"label":"Travel Style","type":"select","value":"","options":["Adventure","Relaxation","Cultural","Road Trip","City Break","Beach","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"spa-wellness","name":"Spa & Wellness","image":"wish-list","fields":[
    {"label":"Preferred Treatment","type":"select","value":"","options":["Massage","Facial","Float Tank","Sauna","Steam Room","Full Day Spa","Couples Spa"]},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"classes-workshops","name":"Classes & Workshops","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Cooking","Pottery","Painting","Fitness","Music","Woodworking","Other"]},
    {"label":"Specific Interest","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"theater","name":"Theater & Arts","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Broadway","Ballet","Opera","Comedy Show","Film Festival","Art Exhibition","Other"]},
    {"label":"Favorite Shows / Artists","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('tech-gadgets-nb','Tech & Gadgets','gifts-wishlist','mygotwo',ARRAY['non-binary'],30,true,'[]'::jsonb,
'[
  {"id":"phone-accessories","name":"Phone Accessories","image":"specific-products","fields":[
    {"label":"Phone Model","type":"text","value":""},
    {"label":"Item","type":"select","value":"","options":["Case","Screen Protector","Charger","MagSafe","Pop Socket","Stand","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"headphones","name":"Headphones","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Over-Ear","On-Ear","In-Ear / Earbuds","True Wireless"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"smart-home","name":"Smart Home","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Smart Speaker","Smart Bulbs","Smart Plug","Security Camera","Thermostat","Doorbell","Robot Vacuum","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"wearables","name":"Wearables","image":"jewelry-watches","fields":[
    {"label":"Item","type":"select","value":"","options":["Smart Watch","Fitness Tracker","Ring","AR Glasses","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$250","$250-$500","$500+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gaming","name":"Gaming","image":"specific-products","fields":[
    {"label":"Platform","type":"select","value":"","options":["PlayStation","Xbox","Nintendo","PC","Mobile","All"]},
    {"label":"Favorite Games / Genres","type":"text","value":""},
    {"label":"Item","type":"select","value":"","options":["Game","Controller","Headset","Console","Gift Card","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cameras","name":"Cameras","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["DSLR","Mirrorless","Point & Shoot","Action Camera","Instant","Drone"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $200","$200-$500","$500-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"laptop-tablets","name":"Laptop & Tablets","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Laptop","Tablet","iPad","Chromebook","E-Reader"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $500","$500-$1000","$1000-$2000","$2000+"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('home-lifestyle-nb','Home & Lifestyle','gifts-wishlist','mygotwo',ARRAY['non-binary'],40,true,'[]'::jsonb,
'[
  {"id":"kitchen-items","name":"Kitchen Items","image":"grocery-specifics","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"candles-scents","name":"Candles & Scents","image":"scent-candles","fields":[
    {"label":"Favorite Scents","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Candle","Reed Diffuser","Wax Melt","Room Spray","Incense"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"decor","name":"Decor","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Modern","Minimalist","Industrial","Boho","Eclectic","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bedding-bath","name":"Bedding & Bath","image":"wish-list","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"books","name":"Books","image":"wish-list","fields":[
    {"label":"Favorite Genres","type":"text","value":""},
    {"label":"Favorite Authors","type":"text","value":""},
    {"label":"Format","type":"select","value":"","options":["Hardcover","Paperback","E-Book","Audiobook"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bar-entertaining","name":"Bar & Entertaining","image":"grocery-specifics","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Glasses","Cocktail Kit","Serving Board","Bar Cart","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"plants","name":"Plants","image":"wish-list","fields":[
    {"label":"Favorite Plant Type","type":"text","value":""},
    {"label":"Care Level","type":"select","value":"","options":["Low Maintenance","Medium","High Maintenance","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('fashion-accessories-nb','Fashion & Accessories','gifts-wishlist','mygotwo',ARRAY['non-binary'],50,true,'[]'::jsonb,
'[
  {"id":"clothing","name":"Clothing","image":"clothing-tops","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoes","name":"Shoes","image":"shoe-sneakers","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"US Size","type":"text","value":""},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jewelry","name":"Jewelry","image":"jewelry","fields":[
    {"label":"Item","type":"text","value":""},
    {"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Mixed"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bags-wallets","name":"Bags & Wallets","image":"specific-products","fields":[
    {"label":"Item","type":"select","value":"","options":["Wallet","Backpack","Tote","Crossbody","Duffel","Belt Bag","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$300","$300-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sunglasses","name":"Sunglasses","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Round","Square","Oversized","Aviator","Cat Eye","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $50","$50-$150","$150-$300","$300+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hats","name":"Hats","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Baseball Cap","Beanie","Bucket Hat","Beret","Wide Brim","Other"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"watches","name":"Watches","image":"jewelry-watches","fields":[
    {"label":"Style","type":"select","value":"","options":["Minimalist","Casual","Sport","Luxury","Smart Watch"]},
    {"label":"Brand Preference","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $100","$100-$300","$300-$1000","$1000+"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('special-occasions-nb','Special Occasions','gifts-wishlist','mygotwo',ARRAY['non-binary'],60,true,'[]'::jsonb,
'[
  {"id":"birthday","name":"Birthday","image":"birthday-preferences","fields":[
    {"label":"Birthday","type":"text","value":""},
    {"label":"Favorite Gift Type","type":"text","value":""},
    {"label":"Dream Birthday","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"anniversary","name":"Anniversary","image":"anniversary-gifts","fields":[
    {"label":"Anniversary Date","type":"text","value":""},
    {"label":"Preferred Gift Style","type":"select","value":"","options":["Experiences","Jewelry","Travel","Sentimental","Practical","Surprise Me"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"holidays","name":"Holidays","image":"wish-list","fields":[
    {"label":"Holiday","type":"select","value":"","options":["Christmas","Hanukkah","Kwanzaa","New Year","Easter","Other"]},
    {"label":"Favorite Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"valentines","name":"Valentine''s Day","image":"anniversary-gifts","fields":[
    {"label":"Preferred Gift Style","type":"select","value":"","options":["Experiences","Jewelry","Tech","Food & Drink","Sentimental","Surprise Me"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"just-because","name":"Just Because","image":"wish-list","fields":[
    {"label":"Favorite Spontaneous Gift","type":"text","value":""},
    {"label":"Budget","type":"select","value":"","options":["Under $25","$25-$50","$50-$100","$100+"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"graduation","name":"Graduation","image":"wish-list","fields":[
    {"label":"Preferred Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"housewarming","name":"Housewarming","image":"wish-list","fields":[
    {"label":"Home Style","type":"select","value":"","options":["Modern","Minimalist","Industrial","Boho","Eclectic","Other"]},
    {"label":"Preferred Gift Type","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('donations-nb','Donations & Causes','gifts-wishlist','mygotwo',ARRAY['non-binary'],70,true,'[]'::jsonb,
'[
  {"id":"favorite-charities","name":"Favorite Charities","image":"wish-list","fields":[
    {"label":"Charity Name","type":"text","value":""},
    {"label":"Website","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"causes","name":"Causes I Care About","image":"wish-list","fields":[
    {"label":"Cause","type":"select","value":"","options":["Environment","Education","Health","Hunger","Animal Welfare","Social Justice","LGBTQ+ Rights","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"preferred-orgs","name":"Preferred Organizations","image":"wish-list","fields":[
    {"label":"Organization","type":"text","value":""},
    {"label":"Category","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"local-causes","name":"Local Causes","image":"wish-list","fields":[
    {"label":"Local Organization","type":"text","value":""},
    {"label":"How to Donate","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"political","name":"Political","image":"wish-list","fields":[
    {"label":"Party / Affiliation","type":"text","value":""},
    {"label":"Candidate / Cause","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"religious","name":"Religious","image":"wish-list","fields":[
    {"label":"Organization","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb);
