DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'style-fit';

INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

('clothing-male','Clothing','style-fit','mygotwo',ARRAY['male'],10,true,'[]'::jsonb,
'[
  {"id":"tshirt","name":"T-Shirt","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Preferred Fit","type":"select","value":"","options":["Slim","Regular","Relaxed","Oversized"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"button-up","name":"Button-Up","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Preferred Fit","type":"select","value":"","options":["Slim","Regular","Relaxed"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sweater","name":"Sweater","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Style","type":"select","value":"","options":["Crewneck","V-Neck","Turtleneck","Cardigan","Zip-Up"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hoodie","name":"Hoodie","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Style","type":"select","value":"","options":["Pullover","Zip-Up","Oversized"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jeans","name":"Jeans","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Fit","type":"select","value":"","options":["Skinny","Slim","Straight","Relaxed","Baggy"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chinos","name":"Chinos","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Fit","type":"select","value":"","options":["Slim","Regular","Relaxed"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shorts","name":"Shorts","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Length","type":"select","value":"","options":["5 inch","7 inch","9 inch","11 inch"]},
    {"label":"Style","type":"select","value":"","options":["Chino","Athletic","Denim","Board","Cargo"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sweatpants","name":"Sweatpants","image":"clothing-bottoms","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Fit","type":"select","value":"","options":["Slim","Regular","Relaxed","Oversized"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jacket","name":"Jacket","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Style","type":"select","value":"","options":["Bomber","Denim","Leather","Windbreaker","Fleece","Puffer"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coat","name":"Coat","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Style","type":"select","value":"","options":["Wool","Trench","Parka","Overcoat","Peacoat"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"activewear-top","name":"Activewear Top","image":"clothing-activewear","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Style","type":"select","value":"","options":["T-Shirt","Tank","Long Sleeve","Compression"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"activewear-bottom","name":"Activewear Bottom","image":"clothing-activewear","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Style","type":"select","value":"","options":["Shorts","Joggers","Leggings","Compression"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('shoes-male','Shoes','style-fit','mygotwo',ARRAY['male'],20,true,'[]'::jsonb,
'[
  {"id":"sneakers","name":"Sneakers","image":"shoe-sneakers","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"running-shoes","name":"Running Shoes","image":"shoe-sneakers","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"boots","name":"Boots","image":"shoe-boots","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Chelsea","Work Boot","Combat","Chukka","Hiking"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dress-shoes","name":"Dress Shoes","image":"shoe-boots","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Oxford","Derby","Loafer","Monk Strap","Brogue"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"loafers","name":"Loafers","image":"shoe-boots","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Penny","Tassel","Horsebit","Driving"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sandals","name":"Sandals","image":"shoe-sandals","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Slides","Sport","Flip-Flop","Birkenstock-Style"]},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"slides","name":"Slides","image":"shoe-sandals","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Preferred Brands","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grooming-male','Grooming','style-fit','mygotwo',ARRAY['male'],30,true,'[]'::jsonb,
'[
  {"id":"shampoo","name":"Shampoo","image":"grooming-hair","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Oily","Dry"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"conditioner","name":"Conditioner","image":"grooming-hair","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Oily","Dry"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"styling-product","name":"Styling Product","image":"grooming-hair","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Pomade","Gel","Clay","Wax","Cream","Paste","Spray"]},
    {"label":"Hold","type":"select","value":"","options":["Light","Medium","Strong","Extra Strong"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"face-wash","name":"Face Wash","image":"grooming-skin","fields":[
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
  ]},
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
  ]},
  {"id":"sunscreen","name":"Sunscreen","image":"grooming-skin","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"SPF","type":"select","value":"","options":["SPF 30","SPF 50","SPF 50+"]},
    {"label":"Finish","type":"select","value":"","options":["Matte","Natural","Tinted"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"eye-cream","name":"Eye Cream","image":"grooming-skin","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Concern","type":"select","value":"","options":["Dark Circles","Puffiness","Fine Lines","All"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"body-wash-grooming","name":"Body Wash","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('scents-male','Scents','style-fit','mygotwo',ARRAY['male'],40,true,'[]'::jsonb,
'[
  {"id":"cologne","name":"Cologne","image":"scent-cologne","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Concentration","type":"select","value":"","options":["Cologne","EDT","EDP"]},
    {"label":"Scent Family","type":"select","value":"","options":["Fresh","Woody","Spicy","Aquatic","Aromatic","Oriental"]},
    {"label":"Season","type":"select","value":"","options":["Spring/Summer","Fall/Winter","Year-Round"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"body-spray","name":"Body Spray","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"deodorant","name":"Deodorant","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Stick","Spray","Gel","Natural","Antiperspirant"]},
    {"label":"Scent","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"body-wash-scent","name":"Body Wash","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"candle","name":"Candle","image":"scent-candles","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Size","type":"select","value":"","options":["Travel","Small","Medium","Large"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"essential-oils","name":"Essential Oils","image":"scent-oils","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Use","type":"select","value":"","options":["Diffuser","Topical","Bath","Aromatherapy"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('measurements-male','Measurements','style-fit','mygotwo',ARRAY['male'],50,true,
'[
  {"id":"shirt","name":"Shirt","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jacket-size","name":"Jacket","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XS","S","M","L","XL","XXL","XXXL"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pants-size","name":"Pants","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Inseam","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"belt-size","name":"Belt","image":"clothing-bottoms","fields":[
    {"label":"Belt Size","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-size","name":"Shoe Size","image":"shoe-size","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide","Extra Wide"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"neck-size","name":"Neck","image":"clothing-tops","fields":[
    {"label":"Neck (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chest-size","name":"Chest","image":"clothing-tops","fields":[
    {"label":"Chest (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"waist-size","name":"Waist","image":"clothing-bottoms","fields":[
    {"label":"Waist (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"inseam-size","name":"Inseam","image":"clothing-bottoms","fields":[
    {"label":"Inseam (inches)","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring-size","name":"Ring Size","image":"measure-ring","fields":[
    {"label":"US Size","type":"text","value":""},
    {"label":"EU Size","type":"text","value":""},
    {"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb,'[]'::jsonb),

('jewelry-male','Jewelry','style-fit','mygotwo',ARRAY['male'],60,true,'[]'::jsonb,
'[
  {"id":"watch","name":"Watch","image":"jewelry-watches","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Model","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Dress","Sport","Casual","Luxury","Smart Watch"]},
    {"label":"Band","type":"select","value":"","options":["Metal","Leather","Silicone","NATO","Rubber"]},
    {"label":"Case Size","type":"select","value":"","options":["38mm","40mm","42mm","44mm","46mm+"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"necklace","name":"Necklace","image":"jewelry-necklaces","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Chain","Pendant","Dog Tag","Beaded"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Stainless Steel","Mixed"]},
    {"label":"Length","type":"select","value":"","options":["16\"","18\"","20\"","22\"","24\""]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bracelet","name":"Bracelet","image":"jewelry-bracelets","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Chain","Beaded","Leather","Cuff","Rope"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Leather","Mixed"]},
    {"label":"Wrist Size","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"ring","name":"Ring","image":"measure-ring","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Band","Signet","Statement","Stacking"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Titanium"]},
    {"label":"Ring Size (US)","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"earring","name":"Earring","image":"jewelry-earrings","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Stud","Hoop","Huggie","Drop"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Stainless Steel","Mixed"]},
    {"label":"Sensitivity","type":"select","value":"","options":["None","Nickel-Free Only","Hypoallergenic Only"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"anklet","name":"Anklet","image":"jewelry-bracelets","fields":[
    {"label":"Brand","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Chain","Beaded","Charm","Leather"]},
    {"label":"Metal","type":"select","value":"","options":["Gold","Silver","Stainless Steel","Mixed"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('brand-preferences-male','Brand Preferences','style-fit','mygotwo',ARRAY['male'],70,true,'[]'::jsonb,
'[
  {"id":"clothing-brands","name":"Clothing Brands","image":"clothing-tops","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Streetwear","Casual","Classic","Minimalist","Workwear","Athletic"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shoe-brands","name":"Shoe Brands","image":"shoe-size","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Sneakers","Boots","Dress","Athletic","Casual"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"grooming-brands","name":"Grooming Brands","image":"grooming","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Category","type":"select","value":"","options":["Skincare","Hair","Shaving","All"]},
    {"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Prestige","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jewelry-brands","name":"Jewelry Brands","image":"jewelry","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Mixed"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"accessory-brands","name":"Accessory Brands","image":"specific-products","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Category","type":"select","value":"","options":["Bags","Belts","Hats","Sunglasses","Wallets","All"]},
    {"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fragrance-brands","name":"Fragrance Brands","image":"fragrances","fields":[
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Designer","Niche/Luxury"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb);