INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

('clothing-female','Clothing','style-fit','mygotwo',ARRAY['female'],10,true,'[]'::jsonb,
'[
  {"id":"tshirt","name":"T-Shirt","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Preferred Fit","type":"select","value":"","options":["Fitted","Regular","Relaxed","Oversized","Cropped"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"blouse","name":"Blouse","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Button-Up","Wrap","Peplum","Off-Shoulder","Sleeveless"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sweater","name":"Sweater","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Crewneck","V-Neck","Turtleneck","Cardigan","Cropped"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jeans","name":"Jeans","image":"clothing-bottoms","fields":[
    {"label":"Waist","type":"text","value":""},
    {"label":"Length","type":"select","value":"","options":["Short","Regular","Long","Petite"]},
    {"label":"Fit","type":"select","value":"","options":["Skinny","Slim","Straight","Boyfriend","Flared","Wide Leg","Mom"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dress","name":"Dress","image":"clothing-dresses","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Length","type":"select","value":"","options":["Mini","Midi","Maxi"]},
    {"label":"Style","type":"select","value":"","options":["Casual","Cocktail","Formal","Wrap","Slip","Bodycon","A-Line","Sundress"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"skirt","name":"Skirt","image":"clothing-bottoms","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Length","type":"select","value":"","options":["Mini","Midi","Maxi"]},
    {"label":"Style","type":"select","value":"","options":["A-Line","Pencil","Pleated","Wrap","Denim"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"shorts","name":"Shorts","image":"clothing-bottoms","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Denim","Athletic","Biker","Linen","Bermuda"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"jacket","name":"Jacket","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Denim","Leather","Blazer","Bomber","Utility","Cropped"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"coat","name":"Coat","image":"clothing-outerwear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Wool","Trench","Puffer","Faux Fur","Peacoat","Overcoat"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"activewear-top","name":"Activewear Top","image":"clothing-activewear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Sports Bra","Tank","T-Shirt","Long Sleeve","Crop"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"activewear-bottom","name":"Activewear Bottom","image":"clothing-activewear","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Leggings","Shorts","Joggers","Bike Shorts","Flare"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hoodie","name":"Hoodie","image":"clothing-tops","fields":[
    {"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},
    {"label":"Style","type":"select","value":"","options":["Pullover","Zip-Up","Cropped","Oversized"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('shoes-female','Shoes','style-fit','mygotwo',ARRAY['female'],20,true,'[]'::jsonb,
'[
  {"id":"heels","name":"Heels","image":"shoe-heels","fields":[
    {"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},
    {"label":"Heel Height","type":"select","value":"","options":["Kitten (1-2\")","Mid (2-3\")","High (3-4\")","Stiletto (4\"+)"]},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sneakers","name":"Sneakers","image":"shoe-sneakers","fields":[
    {"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"boots","name":"Boots","image":"shoe-boots","fields":[
    {"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},
    {"label":"Height","type":"select","value":"","options":["Ankle","Mid-Calf","Knee-High","Over-the-Knee"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"flats","name":"Flats","image":"shoe-flats","fields":[
    {"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Ballet","Loafer","Mule","Pointed Toe","Espadrille"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sandals","name":"Sandals","image":"shoe-sandals","fields":[
    {"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Slides","Strappy","Wedge","Gladiator","Flip-Flop","Platform"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"running-shoes","name":"Running Shoes","image":"shoe-sneakers","fields":[
    {"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},
    {"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"slides","name":"Slides","image":"shoe-sandals","fields":[
    {"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},
    {"label":"Preferred Brands","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grooming-female','Grooming','style-fit','mygotwo',ARRAY['female'],30,true,'[]'::jsonb,
'[
  {"id":"shampoo","name":"Shampoo","image":"grooming-hair","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Color-Treated","Oily","Dry"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"conditioner","name":"Conditioner","image":"grooming-hair","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Hair Type","type":"select","value":"","options":["Fine","Normal","Thick","Curly","Coily","Color-Treated","Oily","Dry"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"hair-treatment","name":"Hair Treatment","image":"grooming-hair","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Hair Mask","Oil","Leave-In","Heat Protectant","Serum"]},
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
    {"label":"Concern","type":"select","value":"","options":["Brightening","Anti-Aging","Hydration","Acne","Pores","Vitamin C"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sunscreen","name":"Sunscreen","image":"grooming-skin","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"SPF","type":"select","value":"","options":["SPF 30","SPF 50","SPF 50+"]},
    {"label":"Finish","type":"select","value":"","options":["Matte","Dewy","Natural","Tinted"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"foundation","name":"Foundation","image":"grooming-makeup","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Shade","type":"text","value":""},
    {"label":"Finish","type":"select","value":"","options":["Matte","Dewy","Satin","Natural"]},
    {"label":"Coverage","type":"select","value":"","options":["Light","Medium","Full"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"concealer","name":"Concealer","image":"grooming-makeup","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Shade","type":"text","value":""},
    {"label":"Coverage","type":"select","value":"","options":["Light","Medium","Full"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mascara","name":"Mascara","image":"grooming-makeup","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Effect","type":"select","value":"","options":["Lengthening","Volumizing","Curling","Waterproof","All-in-One"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"blush","name":"Blush","image":"grooming-makeup","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Shade","type":"text","value":""},
    {"label":"Finish","type":"select","value":"","options":["Matte","Shimmer","Satin","Glowy"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lip","name":"Lip","image":"grooming-makeup","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Lipstick","Lip Gloss","Lip Liner","Lip Stain","Lip Balm","Lip Oil"]},
    {"label":"Shade","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('scents-female','Scents','style-fit','mygotwo',ARRAY['female'],40,true,'[]'::jsonb,
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
  {"id":"body-wash","name":"Body Wash","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Gel","Cream","Oil","Exfoliating"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"deodorant","name":"Deodorant","image":"scent-bodycare","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Stick","Spray","Gel","Natural","Antiperspirant"]},
    {"label":"Scent","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"candle","name":"Candle","image":"scent-candles","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Scent","type":"text","value":""},
    {"label":"Wax Type","type":"select","value":"","options":["Soy","Coconut","Beeswax","Paraffin","No Preference"]},
    {"label":"Size","type":"select","value":"","options":["Travel","Small","Medium","Large"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"essential-oils","name":"Essential Oils","image":"scent-oils","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Scent","type":"text","value":""},
    {"label":"Use","type":"select","value":"","options":["Diffuser","Topical","Bath","Aromatherapy"]},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]},
  {"id":"home-fragrance","name":"Home Fragrance","image":"scent-home","fields":[
    {"label":"Brand","type":"text","value":""},{"label":"Product Name","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Reed Diffuser","Room Spray","Wax Melt","Incense","Plug-In"]},
    {"label":"Scent","type":"text","value":""},
    {"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('measurements-female','Measurements','style-fit','mygotwo',ARRAY['female'],50,true,
'[
  {"id":"shirt","name":"Shirt / Top","image":"clothing-tops","fields":[{"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"jacket-size","name":"Jacket","image":"clothing-outerwear","fields":[{"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"pants-size","name":"Pants","image":"clothing-bottoms","fields":[{"label":"Waist","type":"text","value":""},{"label":"Inseam","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"dress-size","name":"Dress","image":"clothing-dresses","fields":[{"label":"Size","type":"select","value":"","options":["XXS","XS","S","M","L","XL","XXL"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"bra-size","name":"Bra","image":"clothing-tops","fields":[{"label":"Band Size","type":"text","value":""},{"label":"Cup Size","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"belt-size","name":"Belt","image":"clothing-bottoms","fields":[{"label":"Belt Size","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"shoe-size","name":"Shoe Size","image":"shoe-size","fields":[{"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},{"label":"Width","type":"select","value":"","options":["Narrow","Standard","Wide"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"bust-size","name":"Bust","image":"clothing-tops","fields":[{"label":"Bust (inches)","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"waist-size","name":"Waist","image":"clothing-bottoms","fields":[{"label":"Waist (inches)","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"hips-size","name":"Hips","image":"clothing-bottoms","fields":[{"label":"Hips (inches)","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"inseam-size","name":"Inseam","image":"clothing-bottoms","fields":[{"label":"Inseam (inches)","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"ring-size","name":"Ring Size","image":"measure-ring","fields":[{"label":"US Size","type":"text","value":""},{"label":"EU Size","type":"text","value":""},{"label":"Preferred Finger","type":"select","value":"","options":["Index","Middle","Ring","Pinky"]},{"label":"Notes","type":"text","value":""}]}
]'::jsonb,'[]'::jsonb),

('jewelry-female','Jewelry','style-fit','mygotwo',ARRAY['female'],60,true,'[]'::jsonb,
'[
  {"id":"earrings","name":"Earrings","image":"jewelry-earrings","fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Stud","Hoop","Drop","Huggie","Chandelier","Clip-On"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},{"label":"Sensitivity","type":"select","value":"","options":["None","Nickel-Free Only","Hypoallergenic Only"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"necklace","name":"Necklace","image":"jewelry-necklaces","fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Chain","Pendant","Choker","Layered","Statement","Pearl"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},{"label":"Length","type":"select","value":"","options":["Choker (14\")","Princess (18\")","Matinee (22\")","Opera (30\")"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"bracelet","name":"Bracelet","image":"jewelry-bracelets","fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Bangle","Chain","Cuff","Charm","Tennis","Beaded"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Mixed"]},{"label":"Wrist Size","type":"text","value":""},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"ring","name":"Ring","image":"measure-ring","fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Band","Solitaire","Stacking","Statement","Signet"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum"]},{"label":"Ring Size (US)","type":"text","value":""},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"watch","name":"Watch","image":"jewelry-watches","fields":[{"label":"Brand","type":"text","value":""},{"label":"Model","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Dress","Casual","Sport","Luxury","Smart Watch","Minimalist"]},{"label":"Band","type":"select","value":"","options":["Metal","Leather","Silicone","Fabric","Ceramic"]},{"label":"Case Size","type":"select","value":"","options":["28mm","32mm","36mm","38mm","40mm"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]},
  {"id":"anklet","name":"Anklet","image":"jewelry-bracelets","fields":[{"label":"Brand","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Chain","Beaded","Charm","Layered"]},{"label":"Metal","type":"select","value":"","options":["Gold","Silver","Rose Gold","Mixed"]},{"label":"Where to Buy","type":"text","value":""},{"label":"Notes","type":"text","value":""}]}
]'::jsonb),

('brand-preferences-female','Brand Preferences','style-fit','mygotwo',ARRAY['female'],70,true,'[]'::jsonb,
'[
  {"id":"clothing-brands","name":"Clothing Brands","image":"clothing-tops","fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Casual","Classic","Bohemian","Minimalist","Streetwear","Romantic","Edgy"]},{"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"shoe-brands","name":"Shoe Brands","image":"shoe-size","fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Style","type":"select","value":"","options":["Heels","Sneakers","Boots","Flats","Sandals"]},{"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"grooming-brands","name":"Grooming Brands","image":"grooming-skin","fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Category","type":"select","value":"","options":["Skincare","Hair","All"]},{"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Prestige","Luxury"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"beauty-brands","name":"Beauty Brands","image":"grooming-makeup","fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Category","type":"select","value":"","options":["Makeup","Nails","Brows","Lashes","All"]},{"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Prestige","Luxury"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"jewelry-brands","name":"Jewelry Brands","image":"jewelry","fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Metal Preference","type":"select","value":"","options":["Gold","Silver","Rose Gold","Platinum","Mixed"]},{"label":"Price Range","type":"select","value":"","options":["Budget","Mid-Range","Premium","Luxury"]},{"label":"Notes","type":"text","value":""}]},
  {"id":"fragrance-brands","name":"Fragrance Brands","image":"scent-perfume","fields":[{"label":"Favorite Brands","type":"text","value":""},{"label":"Price Range","type":"select","value":"","options":["Drugstore","Mid-Range","Designer","Niche/Luxury"]},{"label":"Notes","type":"text","value":""}]}
]'::jsonb);