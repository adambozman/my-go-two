DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'style-fit';

INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

('clothing-male', 'Clothing', 'style-fit', 'mygotwo', ARRAY['male'], 10, true, '[]'::jsonb,
'[
  {"id":"tops","name":"Tops","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Preferred Fit","type":"select","value":"","options":["Slim","Regular","Relaxed","Oversized"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bottoms","name":"Bottoms","image":"clothing-bottoms","fields":[
    {"label":"Waist Size","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Preferred Fit","type":"select","value":"","options":["Slim","Regular","Relaxed","Jogger"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outerwear","name":"Outerwear","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},
    {"label":"Type","type":"select","value":"","options":["Jacket","Coat","Parka","Blazer","Vest","Hoodie"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"activewear","name":"Activewear","image":"clothing-activewear","fields":[
    {"label":"Top Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},
    {"label":"Bottom Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('shoes-male', 'Shoes', 'style-fit', 'mygotwo', ARRAY['male'], 20, true, '[]'::jsonb,
'[
  {"id":"sneakers","name":"Sneakers","image":"shoe-sneakers","fields":[
    {"label":"Size (US)","type":"text","value":""},
    {"label":"Size (EU)","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"boots","name":"Boots","image":"shoe-boots","fields":[
    {"label":"Size (US)","type":"text","value":""},
    {"label":"Size (EU)","type":"text","value":""},
    {"label":"Boot Height","type":"select","value":"","options":["Ankle","Chelsea","Mid","Work Boot"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"sandals","name":"Sandals","image":"shoe-sandals","fields":[
    {"label":"Size (US)","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Slides","Sport Sandal","Flip-Flop","Birkenstock-style"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Fit Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grooming-male', 'Grooming', 'style-fit', 'mygotwo', ARRAY['male'], 30, true, '[]'::jsonb,
'[
  {"id":"hair-care","name":"Hair Care","image":"grooming-hair","products":[
    {"id":"shampoo","name":"Shampoo","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"conditioner","name":"Conditioner","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"styling","name":"Styling Product","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Type","type":"select","value":"","options":["Pomade","Gel","Clay","Wax","Cream","Spray"]},
      {"label":"Hold","type":"select","value":"","options":["Light","Medium","Strong","Extra Strong"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]},
  {"id":"skin-care","name":"Skin Care","image":"grooming-skin","products":[
    {"id":"cleanser","name":"Cleanser","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"moisturizer","name":"Moisturizer","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},
      {"label":"SPF","type":"select","value":"","options":["None","SPF 15","SPF 30","SPF 50+"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"eye-cream","name":"Eye Cream","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Concern","type":"select","value":"","options":["Dark Circles","Puffiness","Fine Lines","All"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]},
  {"id":"shaving","name":"Shaving","image":"grooming-shaving","products":[
    {"id":"razor","name":"Razor","image":"grooming-shaving","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Type","type":"select","value":"","options":["Cartridge","Safety Razor","Electric","Straight","Disposable"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"shave-cream","name":"Shave Cream","image":"grooming-shaving","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Type","type":"select","value":"","options":["Cream","Gel","Foam","Soap","Oil"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"aftershave","name":"Aftershave","image":"grooming-shaving","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Type","type":"select","value":"","options":["Balm","Splash","Lotion","Gel"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]}
]'::jsonb),

('scents-male', 'Scents', 'style-fit', 'mygotwo', ARRAY['male'], 40, true, '[]'::jsonb,
'[
  {"id":"cologne","name":"Cologne","image":"scent-cologne","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Concentration","type":"select","value":"","options":["Cologne","EDT","EDP"]},
    {"label":"Scent Family","type":"select","value":"","options":["Fresh","Woody","Spicy","Aquatic","Aromatic","Oriental"]},
    {"label":"Season","type":"select","value":"","options":["Spring/Summer","Fall/Winter","Year-Round"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"body-wash","name":"Body Wash","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},{"label":"Where to Buy","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"deodorant","name":"Deodorant","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Stick","Spray","Gel","Natural"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('measurements-male', 'Measurements', 'style-fit', 'mygotwo', ARRAY['male'], 50, true, '[]'::jsonb,
'[
  {"id":"body","name":"Body","image":"measure-body","fields":[
    {"label":"Chest","type":"text","value":""},{"label":"Waist","type":"text","value":""},
    {"label":"Hips","type":"text","value":""},{"label":"Inseam","type":"text","value":""},
    {"label":"Shoulder Width","type":"text","value":""},{"label":"Neck","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring","name":"Ring Size","image":"measure-ring","fields":[
    {"label":"Ring Size (US)","type":"text","value":""},{"label":"Ring Size (EU)","type":"text","value":""},
    {"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},
    {"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Titanium"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('jewelry-male', 'Jewelry', 'style-fit', 'mygotwo', ARRAY['male'], 60, true, '[]'::jsonb,
'[
  {"id":"watches","name":"Watch","image":"jewelry-watches","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Model","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Dress","Sport","Casual","Luxury","Smart Watch"]},
    {"label":"Band","type":"select","value":"","options":["Metal","Leather","Silicone","NATO","Rubber"]},
    {"label":"Case Size","type":"select","value":"","options":["38mm","40mm","42mm","44mm","46mm+"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bracelets","name":"Bracelet","image":"jewelry-bracelets","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Chain","Beaded","Leather","Cuff","Rope"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Leather","Mixed"]},
    {"label":"Wrist Size","type":"text","value":""},{"label":"Where to Buy","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"necklaces","name":"Necklace","image":"jewelry-necklaces","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Chain","Pendant","Dog Tag","Beaded"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Stainless Steel","Mixed"]},
    {"label":"Length","type":"select","value":"","options":["16\"","18\"","20\"","22\"","24\""]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('brand-preferences-male', 'Brand Preferences', 'style-fit', 'mygotwo', ARRAY['male'], 70, true, '[]'::jsonb,
'[
  {"id":"clothing-brands","name":"Clothing","image":"clothing-tops","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Streetwear","Casual","Classic","Minimalist","Workwear","Athletic"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-brands","name":"Shoes","image":"shoe-size","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Sneakers","Boots","Dress","Athletic","Casual"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"grooming-brands","name":"Grooming","image":"grooming","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Category","type":"select","value":"","options":["Skincare","Hair","Shaving","Fragrance","All"]},
    {"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Prestige","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('clothing-female', 'Clothing', 'style-fit', 'mygotwo', ARRAY['female'], 10, true, '[]'::jsonb,
'[
  {"id":"tops","name":"Tops","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Preferred Fit","type":"select","value":"","options":["Fitted","Regular","Relaxed","Oversized","Cropped"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bottoms","name":"Bottoms","image":"clothing-bottoms","fields":[
    {"label":"Waist Size","type":"text","value":""},
    {"label":"Length","type":"select","value":"","options":["Short","Regular","Long","Petite"]},
    {"label":"Preferred Fit","type":"select","value":"","options":["Skinny","Slim","Straight","Wide Leg","Flared"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dresses","name":"Dresses","image":"clothing-dresses","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Length","type":"select","value":"","options":["Mini","Midi","Maxi"]},
    {"label":"Style","type":"select","value":"","options":["Casual","Cocktail","Formal","Wrap","Slip","Bodycon","A-Line"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outerwear","name":"Outerwear","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Type","type":"select","value":"","options":["Jacket","Coat","Blazer","Trench","Puffer","Cardigan"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"activewear","name":"Activewear","image":"clothing-activewear","fields":[
    {"label":"Top Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL"]},
    {"label":"Bottom Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL"]},
    {"label":"Sports Bra Size","type":"text","value":""},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('shoes-female', 'Shoes', 'style-fit', 'mygotwo', ARRAY['female'], 20, true, '[]'::jsonb,
'[
  {"id":"heels","name":"Heels","image":"shoe-heels","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Heel Height","type":"select","value":"","options":["Kitten (1-2\")","Mid (2-3\")","High (3-4\")","Stiletto (4\"+)"]},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"sneakers","name":"Sneakers","image":"shoe-sneakers","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"boots","name":"Boots","image":"shoe-boots","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Height","type":"select","value":"","options":["Ankle","Mid-Calf","Knee-High","Over-the-Knee"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"sandals","name":"Sandals","image":"shoe-sandals","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Slides","Strappy","Wedge","Gladiator","Flip-Flop"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"flats","name":"Flats","image":"shoe-flats","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Ballet","Loafer","Mule","Pointed Toe"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grooming-female', 'Grooming', 'style-fit', 'mygotwo', ARRAY['female'], 30, true, '[]'::jsonb,
'[
  {"id":"hair-care","name":"Hair Care","image":"grooming-hair","products":[
    {"id":"shampoo","name":"Shampoo","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Color-Treated"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"conditioner","name":"Conditioner","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Color-Treated"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"treatment","name":"Hair Treatment","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Type","type":"select","value":"","options":["Hair Mask","Oil","Leave-In","Heat Protectant","Serum"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]},
  {"id":"skin-care","name":"Skin Care","image":"grooming-skin","products":[
    {"id":"cleanser","name":"Cleanser","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"moisturizer","name":"Moisturizer","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},
      {"label":"SPF","type":"select","value":"","options":["None","SPF 15","SPF 30","SPF 50+"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"serum","name":"Serum","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Concern","type":"select","value":"","options":["Brightening","Anti-Aging","Hydration","Acne","Pores","Vitamin C"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]},
  {"id":"makeup","name":"Makeup","image":"grooming-makeup","products":[
    {"id":"foundation","name":"Foundation","image":"grooming-makeup","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Shade","type":"text","value":""},
      {"label":"Finish","type":"select","value":"","options":["Matte","Dewy","Satin","Natural"]},
      {"label":"Coverage","type":"select","value":"","options":["Light","Medium","Full"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"mascara","name":"Mascara","image":"grooming-makeup","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Effect","type":"select","value":"","options":["Lengthening","Volumizing","Curling","Waterproof"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"lip","name":"Lip Product","image":"grooming-makeup","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Type","type":"select","value":"","options":["Lipstick","Lip Gloss","Lip Liner","Lip Stain","Lip Balm"]},
      {"label":"Shade","type":"text","value":""},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]}
]'::jsonb),

('scents-female', 'Scents', 'style-fit', 'mygotwo', ARRAY['female'], 40, true, '[]'::jsonb,
'[
  {"id":"perfume","name":"Perfume","image":"scent-perfume","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Concentration","type":"select","value":"","options":["EDT","EDP","Parfum","Mist"]},
    {"label":"Scent Family","type":"select","value":"","options":["Floral","Fruity","Fresh","Woody","Oriental","Gourmand","Musk"]},
    {"label":"Season","type":"select","value":"","options":["Spring/Summer","Fall/Winter","Year-Round"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"body-lotion","name":"Body Lotion","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Skin Type","type":"select","value":"","options":["Normal","Dry","Sensitive","All"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"candle","name":"Candle","image":"scent-candles","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Size","type":"select","value":"","options":["Travel","Small","Medium","Large"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('measurements-female', 'Measurements', 'style-fit', 'mygotwo', ARRAY['female'], 50, true, '[]'::jsonb,
'[
  {"id":"body","name":"Body","image":"measure-body","fields":[
    {"label":"Bust","type":"text","value":""},{"label":"Waist","type":"text","value":""},
    {"label":"Hips","type":"text","value":""},{"label":"Inseam","type":"text","value":""},
    {"label":"Shoulder Width","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bra","name":"Bra Size","image":"clothing-tops","fields":[
    {"label":"Band Size","type":"text","value":""},{"label":"Cup Size","type":"text","value":""},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring","name":"Ring Size","image":"measure-ring","fields":[
    {"label":"Ring Size (US)","type":"text","value":""},{"label":"Ring Size (EU)","type":"text","value":""},
    {"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},
    {"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('jewelry-female', 'Jewelry', 'style-fit', 'mygotwo', ARRAY['female'], 60, true, '[]'::jsonb,
'[
  {"id":"earrings","name":"Earrings","image":"jewelry-earrings","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Stud","Hoop","Drop","Huggie","Chandelier","Clip-On"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},
    {"label":"Sensitivity","type":"select","value":"","options":["None","Nickel-Free Only","Hypoallergenic Only"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"necklaces","name":"Necklace","image":"jewelry-necklaces","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Chain","Pendant","Choker","Layered","Statement","Pearl"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},
    {"label":"Length","type":"select","value":"","options":["Choker (14\")","Princess (18\")","Matinee (22\")","Opera (30\")"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bracelets","name":"Bracelet","image":"jewelry-bracelets","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Bangle","Chain","Cuff","Charm","Tennis","Beaded"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Mixed"]},
    {"label":"Wrist Size","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"watches","name":"Watch","image":"jewelry-watches","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Model","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Dress","Casual","Sport","Luxury","Smart Watch","Minimalist"]},
    {"label":"Band","type":"select","value":"","options":["Metal","Leather","Silicone","Fabric","Ceramic"]},
    {"label":"Case Size","type":"select","value":"","options":["28mm","32mm","36mm","38mm","40mm"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('brand-preferences-female', 'Brand Preferences', 'style-fit', 'mygotwo', ARRAY['female'], 70, true, '[]'::jsonb,
'[
  {"id":"clothing-brands","name":"Clothing","image":"clothing-tops","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Casual","Classic","Bohemian","Minimalist","Streetwear","Romantic","Edgy"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-brands","name":"Shoes","image":"shoe-size","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Heels","Sneakers","Boots","Flats","Sandals"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"beauty-brands","name":"Beauty","image":"grooming-makeup","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Category","type":"select","value":"","options":["Skincare","Makeup","Hair","Nails","All"]},
    {"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Prestige","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('clothing-nb', 'Clothing', 'style-fit', 'mygotwo', ARRAY['non-binary'], 10, true, '[]'::jsonb,
'[
  {"id":"tops","name":"Tops","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Preferred Fit","type":"select","value":"","options":["Fitted","Slim","Regular","Relaxed","Oversized","Cropped"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bottoms","name":"Bottoms","image":"clothing-bottoms","fields":[
    {"label":"Waist Size","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Preferred Fit","type":"select","value":"","options":["Skinny","Slim","Straight","Relaxed","Wide Leg"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outerwear","name":"Outerwear","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Type","type":"select","value":"","options":["Jacket","Coat","Blazer","Puffer","Hoodie","Windbreaker"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"activewear","name":"Activewear","image":"clothing-activewear","fields":[
    {"label":"Top Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Bottom Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('shoes-nb', 'Shoes', 'style-fit', 'mygotwo', ARRAY['non-binary'], 20, true, '[]'::jsonb,
'[
  {"id":"sneakers","name":"Sneakers","image":"shoe-sneakers","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"boots","name":"Boots","image":"shoe-boots","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Height","type":"select","value":"","options":["Ankle","Chelsea","Mid-Calf","Knee-High","Combat"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]},
  {"id":"sandals","name":"Sandals","image":"shoe-sandals","fields":[
    {"label":"Size (US)","type":"text","value":""},{"label":"Size (EU)","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Slides","Strappy","Sport","Flip-Flop","Platform"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Fit Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grooming-nb', 'Grooming', 'style-fit', 'mygotwo', ARRAY['non-binary'], 30, true, '[]'::jsonb,
'[
  {"id":"hair-care","name":"Hair Care","image":"grooming-hair","products":[
    {"id":"shampoo","name":"Shampoo","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Color-Treated"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"conditioner","name":"Conditioner","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Color-Treated"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"styling","name":"Styling Product","image":"grooming-hair","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Type","type":"select","value":"","options":["Pomade","Gel","Clay","Wax","Cream","Mousse","Spray"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]},
  {"id":"skin-care","name":"Skin Care","image":"grooming-skin","products":[
    {"id":"cleanser","name":"Cleanser","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"moisturizer","name":"Moisturizer","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Skin Type","type":"select","value":"","options":["Oily","Dry","Combination","Normal","Sensitive"]},
      {"label":"SPF","type":"select","value":"","options":["None","SPF 15","SPF 30","SPF 50+"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]},
    {"id":"serum","name":"Serum","image":"grooming-skin","fields":[
      {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
      {"label":"Concern","type":"select","value":"","options":["Brightening","Anti-Aging","Hydration","Acne","Pores"]},
      {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
    ]}
  ]}
]'::jsonb),

('scents-nb', 'Scents', 'style-fit', 'mygotwo', ARRAY['non-binary'], 40, true, '[]'::jsonb,
'[
  {"id":"fragrance","name":"Fragrance","image":"fragrances","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Concentration","type":"select","value":"","options":["Cologne","EDT","EDP","Parfum","Mist"]},
    {"label":"Scent Family","type":"select","value":"","options":["Fresh","Woody","Floral","Spicy","Aquatic","Oriental","Gourmand"]},
    {"label":"Season","type":"select","value":"","options":["Spring/Summer","Fall/Winter","Year-Round"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"body-wash","name":"Body Wash","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},{"label":"Where to Buy","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"candle","name":"Candle","image":"scent-candles","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Size","type":"select","value":"","options":["Travel","Small","Medium","Large"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('measurements-nb', 'Measurements', 'style-fit', 'mygotwo', ARRAY['non-binary'], 50, true, '[]'::jsonb,
'[
  {"id":"body","name":"Body","image":"measure-body","fields":[
    {"label":"Chest","type":"text","value":""},{"label":"Waist","type":"text","value":""},
    {"label":"Hips","type":"text","value":""},{"label":"Inseam","type":"text","value":""},
    {"label":"Shoulder Width","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring","name":"Ring Size","image":"measure-ring","fields":[
    {"label":"Ring Size (US)","type":"text","value":""},{"label":"Ring Size (EU)","type":"text","value":""},
    {"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},
    {"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Titanium"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('jewelry-nb', 'Jewelry', 'style-fit', 'mygotwo', ARRAY['non-binary'], 60, true, '[]'::jsonb,
'[
  {"id":"watches","name":"Watch","image":"jewelry-watches","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Model","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Dress","Sport","Casual","Luxury","Smart Watch","Minimalist"]},
    {"label":"Band","type":"select","value":"","options":["Metal","Leather","Silicone","NATO","Fabric"]},
    {"label":"Case Size","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"necklaces","name":"Necklace","image":"jewelry-necklaces","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Chain","Pendant","Choker","Layered","Statement","Beaded"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Stainless Steel","Mixed"]},
    {"label":"Length","type":"select","value":"","options":["16\"","18\"","20\"","22\"","24\""]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bracelets","name":"Bracelet","image":"jewelry-bracelets","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Chain","Beaded","Leather","Cuff","Bangle","Charm"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Mixed","Leather"]},
    {"label":"Wrist Size","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"earrings","name":"Earring","image":"jewelry-earrings","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Stud","Hoop","Huggie","Drop","Clip-On"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Stainless Steel","Mixed"]},
    {"label":"Sensitivity","type":"select","value":"","options":["None","Nickel-Free Only","Hypoallergenic Only"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('brand-preferences-nb', 'Brand Preferences', 'style-fit', 'mygotwo', ARRAY['non-binary'], 70, true, '[]'::jsonb,
'[
  {"id":"clothing-brands","name":"Clothing","image":"clothing-tops","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Streetwear","Casual","Minimalist","Gender-Fluid","Avant-Garde","Workwear","Athletic"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-brands","name":"Shoes","image":"shoe-size","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Sneakers","Boots","Sandals","Dress","Athletic"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"grooming-brands","name":"Grooming","image":"grooming","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Category","type":"select","value":"","options":["Skincare","Hair","Fragrance","All"]},
    {"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Prestige","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb);