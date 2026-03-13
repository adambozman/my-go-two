-- ─────────────────────────────────────────────────────────────────────────────
-- Food & Drink FULL REBUILD — 6+ Level 3 cards per Level 2, every item own card
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'food-drink';

INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

-- ═════════════════════════════════════════════════════════════════════════════
-- MALE
-- ═════════════════════════════════════════════════════════════════════════════

('restaurants-male','Restaurants','food-drink','mygotwo',ARRAY['male'],10,true,'[]'::jsonb,
'[
  {"id":"asian","name":"Asian","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"italian","name":"Italian","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"american","name":"American","image":"food-burgers","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mediterranean","name":"Mediterranean","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sushi","name":"Sushi","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Roll","type":"text","value":""},
    {"label":"Soy Sauce","type":"select","value":"","options":["Regular","Low Sodium","None"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"indian","name":"Indian","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"thai","name":"Thai","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bbq","name":"BBQ","image":"food-chicken","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Meat","type":"select","value":"","options":["Brisket","Ribs","Pulled Pork","Chicken","Sausage","All"]},
    {"label":"Sauce","type":"select","value":"","options":["Kansas City","Texas","Carolina","Memphis","No Sauce"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"greek","name":"Greek","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"middle-eastern","name":"Middle Eastern","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"french","name":"French","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('coffee-male','Coffee','food-drink','mygotwo',ARRAY['male'],20,true,'[]'::jsonb,
'[
  {"id":"hot-coffee","name":"Hot Coffee","image":"coffee-hot","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"text","value":""},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim","None","Black"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Simple Syrup"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"iced-coffee","name":"Iced Coffee","image":"coffee-iced","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"text","value":""},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim","None","Black"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Vanilla","Caramel"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"espresso","name":"Espresso","image":"coffee-espresso","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Espresso","Americano","Macchiato","Cortado","Ristretto"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cold-brew","name":"Cold Brew","image":"coffee-iced","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Black","With Milk","Nitro","Float","Sweet Cream"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Simple Syrup","Vanilla","Caramel"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"latte","name":"Latte","image":"coffee-hot","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Hot","Iced","Blended"]},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim"]},
    {"label":"Flavor","type":"select","value":"","options":["None","Vanilla","Caramel","Hazelnut","Lavender","Brown Sugar"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tea","name":"Tea","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Green","Black","Oolong","Herbal","Chai","White","Rooibos"]},
    {"label":"Temperature","type":"select","value":"","options":["Hot","Iced"]},
    {"label":"Milk","type":"select","value":"","options":["None","Whole","Oat","Almond","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Sugar","Stevia"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"matcha","name":"Matcha","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Hot","Iced","Latte","Ceremonial"]},
    {"label":"Milk","type":"select","value":"","options":["None","Oat","Almond","Whole","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Simple Syrup","Vanilla"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"juice-smoothie","name":"Juice / Smoothie","image":"coffee-order","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Fresh Juice","Smoothie","Protein Shake","Green Juice","Acai Bowl"]},
    {"label":"Favorite Order","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grocery-male','Grocery','food-drink','mygotwo',ARRAY['male'],30,true,'[]'::jsonb,
'[
  {"id":"produce","name":"Produce","image":"grocery-produce","fields":[
    {"label":"Favorite Fruits","type":"text","value":""},
    {"label":"Favorite Vegetables","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dairy","name":"Dairy","image":"grocery-dairy","fields":[
    {"label":"Milk Type","type":"select","value":"","options":["Whole","2%","Skim","Oat","Almond","Soy","Coconut"]},
    {"label":"Favorite Cheese","type":"text","value":""},
    {"label":"Favorite Yogurt","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pantry","name":"Pantry","image":"grocery-pantry","fields":[
    {"label":"Favorite Snacks","type":"text","value":""},
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"proteins","name":"Proteins","image":"food-chicken","fields":[
    {"label":"Preferred Protein","type":"select","value":"","options":["Chicken","Beef","Fish","Pork","Lamb","Turkey","Plant-Based","Eggs"]},
    {"label":"Favorite Cut","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"snacks","name":"Snacks","image":"grocery-specifics","fields":[
    {"label":"Salty Snacks","type":"text","value":""},
    {"label":"Sweet Snacks","type":"text","value":""},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"beverages","name":"Beverages","image":"coffee-order","fields":[
    {"label":"Favorite Drinks","type":"text","value":""},
    {"label":"Sparkling or Still","type":"select","value":"","options":["Still Water","Sparkling","Both","Neither"]},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"frozen","name":"Frozen","image":"grocery-pantry","fields":[
    {"label":"Favorite Frozen Meals","type":"text","value":""},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bread-bakery","name":"Bread & Bakery","image":"grocery-pantry","fields":[
    {"label":"Bread Type","type":"select","value":"","options":["White","Wheat","Sourdough","Multigrain","Gluten-Free","Rye"]},
    {"label":"Favorite Bakery Item","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('meals-male','Meal Preferences','food-drink','mygotwo',ARRAY['male'],40,true,'[]'::jsonb,
'[
  {"id":"breakfast","name":"Breakfast","image":"meal-breakfast","fields":[
    {"label":"Go-To Breakfast","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Coffee or Tea","type":"select","value":"","options":["Coffee","Tea","Both","Neither"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"brunch","name":"Brunch","image":"meal-breakfast","fields":[
    {"label":"Go-To Brunch Order","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Coffee","Mimosa","Bloody Mary","Juice","Water"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lunch","name":"Lunch","image":"meal-lunch","fields":[
    {"label":"Go-To Lunch","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Prefer","type":"select","value":"","options":["Eat Out","Cook","Meal Prep","Order In","Varies"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dinner","name":"Dinner","image":"meal-dinner","fields":[
    {"label":"Go-To Dinner","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Prefer","type":"select","value":"","options":["Eat Out","Cook","Order In","Varies"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dessert","name":"Dessert","image":"meal-dessert","fields":[
    {"label":"Favorite Dessert","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Sweet Tooth","type":"select","value":"","options":["Rarely","Sometimes","Often","Always"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"late-night","name":"Late Night","image":"meal-dinner","fields":[
    {"label":"Go-To Late Night","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"snack-time","name":"Snacks","image":"grocery-specifics","fields":[
    {"label":"Go-To Snack","type":"text","value":""},
    {"label":"Sweet or Salty","type":"select","value":"","options":["Sweet","Salty","Both","Depends"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comfort-food","name":"Comfort Food","image":"favorite-meals","fields":[
    {"label":"All-Time Comfort Food","type":"text","value":""},
    {"label":"Where to Get It","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('dietary-male','Dietary','food-drink','mygotwo',ARRAY['male'],50,true,'[]'::jsonb,
'[
  {"id":"diet-type","name":"Diet Type","image":"dietary-restrictions","fields":[
    {"label":"Diet","type":"select","value":"","options":["None","Vegan","Vegetarian","Pescatarian","Keto","Paleo","Gluten-Free","Halal","Kosher","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"allergies","name":"Allergies","image":"dietary-restrictions","fields":[
    {"label":"Allergies","type":"text","value":""},
    {"label":"Severity","type":"select","value":"","options":["Mild","Moderate","Severe / EpiPen"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"intolerances","name":"Intolerances","image":"dietary-restrictions","fields":[
    {"label":"Intolerances","type":"text","value":""},
    {"label":"Examples","type":"select","value":"","options":["Lactose","Gluten","Fructose","Histamine","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"foods-i-avoid","name":"Foods I Avoid","image":"dietary-restrictions","fields":[
    {"label":"Foods I Avoid","type":"text","value":""},
    {"label":"Reason","type":"select","value":"","options":["Dislike","Religious","Ethical","Health","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"preferred-cuisines","name":"Preferred Cuisines","image":"favorite-restaurants","fields":[
    {"label":"Top Cuisines","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cheat-meal","name":"Cheat Meal","image":"favorite-meals","fields":[
    {"label":"Go-To Cheat Meal","type":"text","value":""},
    {"label":"Where to Get It","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"health-goals","name":"Health Goals","image":"dietary-restrictions","fields":[
    {"label":"Goal","type":"select","value":"","options":["Weight Loss","Muscle Gain","Maintenance","Heart Health","Energy","General Wellness"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('fast-food-male','Fast Food','food-drink','mygotwo',ARRAY['male'],60,true,'[]'::jsonb,
'[
  {"id":"burgers","name":"Burgers","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Fried","Grilled","Spicy","Tenders","Sandwich","Wings"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican-fast","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Crust","type":"select","value":"","options":["Thin","Regular","Thick","Stuffed","Gluten-Free"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"asian-fast","name":"Asian Fast Food","image":"food-asian","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sandwiches","name":"Sandwiches","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Bread","type":"select","value":"","options":["White","Wheat","Sourdough","Wrap","Sub","Croissant"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"my-usual","name":"My Usual Order","image":"fast-food-order","fields":[
    {"label":"Restaurant","type":"text","value":""},
    {"label":"Exact Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('cooking-male','Cooking','food-drink','mygotwo',ARRAY['male'],70,true,'[]'::jsonb,
'[
  {"id":"skill-level","name":"Skill Level","image":"favorite-meals","fields":[
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-meals","name":"Favorite Meals to Cook","image":"favorite-meals","fields":[
    {"label":"All-Time Favorite","type":"text","value":""},
    {"label":"Comfort Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"go-to-recipes","name":"Go-To Recipes","image":"favorite-meals","fields":[
    {"label":"Quick Weeknight Meal","type":"text","value":""},
    {"label":"Impressive Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"kitchen-tools","name":"Kitchen Tools","image":"grocery-specifics","fields":[
    {"label":"Favorite Tool","type":"text","value":""},
    {"label":"Favorite Appliance","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"meal-prep","name":"Meal Prep","image":"grocery-pantry","fields":[
    {"label":"Do You Meal Prep","type":"select","value":"","options":["Yes - Weekly","Yes - Sometimes","No","Want to Start"]},
    {"label":"Favorite Prep Meals","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cuisines-i-cook","name":"Cuisines I Cook","image":"favorite-restaurants","fields":[
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Want to Learn","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comfort-dishes","name":"Comfort Dishes","image":"favorite-meals","fields":[
    {"label":"Guilty Pleasure Dish","type":"text","value":""},
    {"label":"Grandma Recipe","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- FEMALE
-- ═════════════════════════════════════════════════════════════════════════════

('restaurants-female','Restaurants','food-drink','mygotwo',ARRAY['female'],10,true,'[]'::jsonb,
'[
  {"id":"asian","name":"Asian","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"italian","name":"Italian","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"american","name":"American","image":"food-burgers","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mediterranean","name":"Mediterranean","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sushi","name":"Sushi","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Roll","type":"text","value":""},
    {"label":"Soy Sauce","type":"select","value":"","options":["Regular","Low Sodium","None"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"indian","name":"Indian","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"thai","name":"Thai","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bbq","name":"BBQ","image":"food-chicken","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Meat","type":"select","value":"","options":["Brisket","Ribs","Pulled Pork","Chicken","Sausage","All"]},
    {"label":"Sauce","type":"select","value":"","options":["Kansas City","Texas","Carolina","Memphis","No Sauce"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"greek","name":"Greek","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"middle-eastern","name":"Middle Eastern","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"french","name":"French","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('coffee-female','Coffee','food-drink','mygotwo',ARRAY['female'],20,true,'[]'::jsonb,
'[
  {"id":"hot-coffee","name":"Hot Coffee","image":"coffee-hot","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"text","value":""},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim","None","Black"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Simple Syrup","Vanilla","Caramel"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"iced-coffee","name":"Iced Coffee","image":"coffee-iced","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"text","value":""},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim","None","Black"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Vanilla","Caramel"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"espresso","name":"Espresso","image":"coffee-espresso","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Espresso","Americano","Macchiato","Cortado","Ristretto"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cold-brew","name":"Cold Brew","image":"coffee-iced","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Black","With Milk","Nitro","Sweet Cream","Float"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Simple Syrup","Vanilla","Caramel"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"latte","name":"Latte","image":"coffee-hot","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Hot","Iced","Blended"]},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim"]},
    {"label":"Flavor","type":"select","value":"","options":["None","Vanilla","Caramel","Hazelnut","Lavender","Brown Sugar","Pumpkin Spice"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tea","name":"Tea","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Green","Black","Oolong","Herbal","Chai","White","Rooibos"]},
    {"label":"Temperature","type":"select","value":"","options":["Hot","Iced"]},
    {"label":"Milk","type":"select","value":"","options":["None","Whole","Oat","Almond","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Sugar","Stevia"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"matcha","name":"Matcha","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Hot","Iced","Latte","Ceremonial"]},
    {"label":"Milk","type":"select","value":"","options":["None","Oat","Almond","Whole","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Simple Syrup","Vanilla"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"juice-smoothie","name":"Juice / Smoothie","image":"coffee-order","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Fresh Juice","Smoothie","Protein Shake","Green Juice","Acai Bowl"]},
    {"label":"Favorite Order","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grocery-female','Grocery','food-drink','mygotwo',ARRAY['female'],30,true,'[]'::jsonb,
'[
  {"id":"produce","name":"Produce","image":"grocery-produce","fields":[
    {"label":"Favorite Fruits","type":"text","value":""},
    {"label":"Favorite Vegetables","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dairy","name":"Dairy","image":"grocery-dairy","fields":[
    {"label":"Milk Type","type":"select","value":"","options":["Whole","2%","Skim","Oat","Almond","Soy","Coconut"]},
    {"label":"Favorite Cheese","type":"text","value":""},
    {"label":"Favorite Yogurt","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pantry","name":"Pantry","image":"grocery-pantry","fields":[
    {"label":"Favorite Snacks","type":"text","value":""},
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"proteins","name":"Proteins","image":"food-chicken","fields":[
    {"label":"Preferred Protein","type":"select","value":"","options":["Chicken","Beef","Fish","Pork","Lamb","Turkey","Plant-Based","Eggs"]},
    {"label":"Favorite Cut","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"snacks","name":"Snacks","image":"grocery-specifics","fields":[
    {"label":"Salty Snacks","type":"text","value":""},
    {"label":"Sweet Snacks","type":"text","value":""},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"beverages","name":"Beverages","image":"coffee-order","fields":[
    {"label":"Favorite Drinks","type":"text","value":""},
    {"label":"Sparkling or Still","type":"select","value":"","options":["Still Water","Sparkling","Both","Neither"]},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"frozen","name":"Frozen","image":"grocery-pantry","fields":[
    {"label":"Favorite Frozen Meals","type":"text","value":""},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bread-bakery","name":"Bread & Bakery","image":"grocery-pantry","fields":[
    {"label":"Bread Type","type":"select","value":"","options":["White","Wheat","Sourdough","Multigrain","Gluten-Free","Rye"]},
    {"label":"Favorite Bakery Item","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('meals-female','Meal Preferences','food-drink','mygotwo',ARRAY['female'],40,true,'[]'::jsonb,
'[
  {"id":"breakfast","name":"Breakfast","image":"meal-breakfast","fields":[
    {"label":"Go-To Breakfast","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Coffee or Tea","type":"select","value":"","options":["Coffee","Tea","Both","Neither"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"brunch","name":"Brunch","image":"meal-breakfast","fields":[
    {"label":"Go-To Brunch Order","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Coffee","Mimosa","Bloody Mary","Juice","Water"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lunch","name":"Lunch","image":"meal-lunch","fields":[
    {"label":"Go-To Lunch","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Prefer","type":"select","value":"","options":["Eat Out","Cook","Meal Prep","Order In","Varies"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dinner","name":"Dinner","image":"meal-dinner","fields":[
    {"label":"Go-To Dinner","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Prefer","type":"select","value":"","options":["Eat Out","Cook","Order In","Varies"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dessert","name":"Dessert","image":"meal-dessert","fields":[
    {"label":"Favorite Dessert","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Sweet Tooth","type":"select","value":"","options":["Rarely","Sometimes","Often","Always"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"late-night","name":"Late Night","image":"meal-dinner","fields":[
    {"label":"Go-To Late Night","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"snack-time","name":"Snacks","image":"grocery-specifics","fields":[
    {"label":"Go-To Snack","type":"text","value":""},
    {"label":"Sweet or Salty","type":"select","value":"","options":["Sweet","Salty","Both","Depends"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comfort-food","name":"Comfort Food","image":"favorite-meals","fields":[
    {"label":"All-Time Comfort Food","type":"text","value":""},
    {"label":"Where to Get It","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('dietary-female','Dietary','food-drink','mygotwo',ARRAY['female'],50,true,'[]'::jsonb,
'[
  {"id":"diet-type","name":"Diet Type","image":"dietary-restrictions","fields":[
    {"label":"Diet","type":"select","value":"","options":["None","Vegan","Vegetarian","Pescatarian","Keto","Paleo","Gluten-Free","Halal","Kosher","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"allergies","name":"Allergies","image":"dietary-restrictions","fields":[
    {"label":"Allergies","type":"text","value":""},
    {"label":"Severity","type":"select","value":"","options":["Mild","Moderate","Severe / EpiPen"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"intolerances","name":"Intolerances","image":"dietary-restrictions","fields":[
    {"label":"Intolerances","type":"text","value":""},
    {"label":"Examples","type":"select","value":"","options":["Lactose","Gluten","Fructose","Histamine","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"foods-i-avoid","name":"Foods I Avoid","image":"dietary-restrictions","fields":[
    {"label":"Foods I Avoid","type":"text","value":""},
    {"label":"Reason","type":"select","value":"","options":["Dislike","Religious","Ethical","Health","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"preferred-cuisines","name":"Preferred Cuisines","image":"favorite-restaurants","fields":[
    {"label":"Top Cuisines","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cheat-meal","name":"Cheat Meal","image":"favorite-meals","fields":[
    {"label":"Go-To Cheat Meal","type":"text","value":""},
    {"label":"Where to Get It","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"health-goals","name":"Health Goals","image":"dietary-restrictions","fields":[
    {"label":"Goal","type":"select","value":"","options":["Weight Loss","Muscle Gain","Maintenance","Heart Health","Energy","General Wellness"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('fast-food-female','Fast Food','food-drink','mygotwo',ARRAY['female'],60,true,'[]'::jsonb,
'[
  {"id":"burgers","name":"Burgers","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Fried","Grilled","Spicy","Tenders","Sandwich","Wings"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican-fast","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Crust","type":"select","value":"","options":["Thin","Regular","Thick","Stuffed","Gluten-Free"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"asian-fast","name":"Asian Fast Food","image":"food-asian","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sandwiches","name":"Sandwiches","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Bread","type":"select","value":"","options":["White","Wheat","Sourdough","Wrap","Sub","Croissant"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"my-usual","name":"My Usual Order","image":"fast-food-order","fields":[
    {"label":"Restaurant","type":"text","value":""},
    {"label":"Exact Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('cooking-female','Cooking','food-drink','mygotwo',ARRAY['female'],70,true,'[]'::jsonb,
'[
  {"id":"skill-level","name":"Skill Level","image":"favorite-meals","fields":[
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-meals","name":"Favorite Meals to Cook","image":"favorite-meals","fields":[
    {"label":"All-Time Favorite","type":"text","value":""},
    {"label":"Comfort Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"go-to-recipes","name":"Go-To Recipes","image":"favorite-meals","fields":[
    {"label":"Quick Weeknight Meal","type":"text","value":""},
    {"label":"Impressive Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"kitchen-tools","name":"Kitchen Tools","image":"grocery-specifics","fields":[
    {"label":"Favorite Tool","type":"text","value":""},
    {"label":"Favorite Appliance","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"meal-prep","name":"Meal Prep","image":"grocery-pantry","fields":[
    {"label":"Do You Meal Prep","type":"select","value":"","options":["Yes - Weekly","Yes - Sometimes","No","Want to Start"]},
    {"label":"Favorite Prep Meals","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cuisines-i-cook","name":"Cuisines I Cook","image":"favorite-restaurants","fields":[
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Want to Learn","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comfort-dishes","name":"Comfort Dishes","image":"favorite-meals","fields":[
    {"label":"Guilty Pleasure Dish","type":"text","value":""},
    {"label":"Family Recipe","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- NON-BINARY
-- ═════════════════════════════════════════════════════════════════════════════

('restaurants-nb','Restaurants','food-drink','mygotwo',ARRAY['non-binary'],10,true,'[]'::jsonb,
'[
  {"id":"asian","name":"Asian","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"italian","name":"Italian","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"american","name":"American","image":"food-burgers","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mediterranean","name":"Mediterranean","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sushi","name":"Sushi","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Roll","type":"text","value":""},
    {"label":"Soy Sauce","type":"select","value":"","options":["Regular","Low Sodium","None"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"indian","name":"Indian","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"thai","name":"Thai","image":"food-asian","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bbq","name":"BBQ","image":"food-chicken","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Meat","type":"select","value":"","options":["Brisket","Ribs","Pulled Pork","Chicken","Sausage","All"]},
    {"label":"Sauce","type":"select","value":"","options":["Kansas City","Texas","Carolina","Memphis","No Sauce"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"greek","name":"Greek","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"middle-eastern","name":"Middle Eastern","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"french","name":"French","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('coffee-nb','Coffee','food-drink','mygotwo',ARRAY['non-binary'],20,true,'[]'::jsonb,
'[
  {"id":"hot-coffee","name":"Hot Coffee","image":"coffee-hot","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"text","value":""},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim","None","Black"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Simple Syrup"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"iced-coffee","name":"Iced Coffee","image":"coffee-iced","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"text","value":""},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim","None","Black"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Vanilla","Caramel"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"espresso","name":"Espresso","image":"coffee-espresso","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Espresso","Americano","Macchiato","Cortado","Ristretto"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cold-brew","name":"Cold Brew","image":"coffee-iced","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Black","With Milk","Nitro","Sweet Cream","Float"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Simple Syrup","Vanilla","Caramel"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"latte","name":"Latte","image":"coffee-hot","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Hot","Iced","Blended"]},
    {"label":"Milk","type":"select","value":"","options":["Whole","Oat","Almond","Soy","Skim"]},
    {"label":"Flavor","type":"select","value":"","options":["None","Vanilla","Caramel","Hazelnut","Lavender","Brown Sugar"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tea","name":"Tea","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Green","Black","Oolong","Herbal","Chai","White","Rooibos"]},
    {"label":"Temperature","type":"select","value":"","options":["Hot","Iced"]},
    {"label":"Milk","type":"select","value":"","options":["None","Whole","Oat","Almond","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Sugar","Stevia"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"matcha","name":"Matcha","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Hot","Iced","Latte","Ceremonial"]},
    {"label":"Milk","type":"select","value":"","options":["None","Oat","Almond","Whole","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Simple Syrup","Vanilla"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"juice-smoothie","name":"Juice / Smoothie","image":"coffee-order","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Fresh Juice","Smoothie","Protein Shake","Green Juice","Acai Bowl"]},
    {"label":"Favorite Order","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grocery-nb','Grocery','food-drink','mygotwo',ARRAY['non-binary'],30,true,'[]'::jsonb,
'[
  {"id":"produce","name":"Produce","image":"grocery-produce","fields":[
    {"label":"Favorite Fruits","type":"text","value":""},
    {"label":"Favorite Vegetables","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dairy","name":"Dairy","image":"grocery-dairy","fields":[
    {"label":"Milk Type","type":"select","value":"","options":["Whole","2%","Skim","Oat","Almond","Soy","Coconut"]},
    {"label":"Favorite Cheese","type":"text","value":""},
    {"label":"Favorite Yogurt","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pantry","name":"Pantry","image":"grocery-pantry","fields":[
    {"label":"Favorite Snacks","type":"text","value":""},
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"proteins","name":"Proteins","image":"food-chicken","fields":[
    {"label":"Preferred Protein","type":"select","value":"","options":["Chicken","Beef","Fish","Pork","Lamb","Turkey","Plant-Based","Eggs"]},
    {"label":"Favorite Cut","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"snacks","name":"Snacks","image":"grocery-specifics","fields":[
    {"label":"Salty Snacks","type":"text","value":""},
    {"label":"Sweet Snacks","type":"text","value":""},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"beverages","name":"Beverages","image":"coffee-order","fields":[
    {"label":"Favorite Drinks","type":"text","value":""},
    {"label":"Sparkling or Still","type":"select","value":"","options":["Still Water","Sparkling","Both","Neither"]},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"frozen","name":"Frozen","image":"grocery-pantry","fields":[
    {"label":"Favorite Frozen Meals","type":"text","value":""},
    {"label":"Favorite Brand","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"bread-bakery","name":"Bread & Bakery","image":"grocery-pantry","fields":[
    {"label":"Bread Type","type":"select","value":"","options":["White","Wheat","Sourdough","Multigrain","Gluten-Free","Rye"]},
    {"label":"Favorite Bakery Item","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('meals-nb','Meal Preferences','food-drink','mygotwo',ARRAY['non-binary'],40,true,'[]'::jsonb,
'[
  {"id":"breakfast","name":"Breakfast","image":"meal-breakfast","fields":[
    {"label":"Go-To Breakfast","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Coffee or Tea","type":"select","value":"","options":["Coffee","Tea","Both","Neither"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"brunch","name":"Brunch","image":"meal-breakfast","fields":[
    {"label":"Go-To Brunch Order","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Coffee","Mimosa","Bloody Mary","Juice","Water"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"lunch","name":"Lunch","image":"meal-lunch","fields":[
    {"label":"Go-To Lunch","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Prefer","type":"select","value":"","options":["Eat Out","Cook","Meal Prep","Order In","Varies"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dinner","name":"Dinner","image":"meal-dinner","fields":[
    {"label":"Go-To Dinner","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Prefer","type":"select","value":"","options":["Eat Out","Cook","Order In","Varies"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dessert","name":"Dessert","image":"meal-dessert","fields":[
    {"label":"Favorite Dessert","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Sweet Tooth","type":"select","value":"","options":["Rarely","Sometimes","Often","Always"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"late-night","name":"Late Night","image":"meal-dinner","fields":[
    {"label":"Go-To Late Night","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"snack-time","name":"Snacks","image":"grocery-specifics","fields":[
    {"label":"Go-To Snack","type":"text","value":""},
    {"label":"Sweet or Salty","type":"select","value":"","options":["Sweet","Salty","Both","Depends"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comfort-food","name":"Comfort Food","image":"favorite-meals","fields":[
    {"label":"All-Time Comfort Food","type":"text","value":""},
    {"label":"Where to Get It","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('dietary-nb','Dietary','food-drink','mygotwo',ARRAY['non-binary'],50,true,'[]'::jsonb,
'[
  {"id":"diet-type","name":"Diet Type","image":"dietary-restrictions","fields":[
    {"label":"Diet","type":"select","value":"","options":["None","Vegan","Vegetarian","Pescatarian","Keto","Paleo","Gluten-Free","Halal","Kosher","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"allergies","name":"Allergies","image":"dietary-restrictions","fields":[
    {"label":"Allergies","type":"text","value":""},
    {"label":"Severity","type":"select","value":"","options":["Mild","Moderate","Severe / EpiPen"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"intolerances","name":"Intolerances","image":"dietary-restrictions","fields":[
    {"label":"Intolerances","type":"text","value":""},
    {"label":"Examples","type":"select","value":"","options":["Lactose","Gluten","Fructose","Histamine","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"foods-i-avoid","name":"Foods I Avoid","image":"dietary-restrictions","fields":[
    {"label":"Foods I Avoid","type":"text","value":""},
    {"label":"Reason","type":"select","value":"","options":["Dislike","Religious","Ethical","Health","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"preferred-cuisines","name":"Preferred Cuisines","image":"favorite-restaurants","fields":[
    {"label":"Top Cuisines","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cheat-meal","name":"Cheat Meal","image":"favorite-meals","fields":[
    {"label":"Go-To Cheat Meal","type":"text","value":""},
    {"label":"Where to Get It","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"health-goals","name":"Health Goals","image":"dietary-restrictions","fields":[
    {"label":"Goal","type":"select","value":"","options":["Weight Loss","Muscle Gain","Maintenance","Heart Health","Energy","General Wellness"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('fast-food-nb','Fast Food','food-drink','mygotwo',ARRAY['non-binary'],60,true,'[]'::jsonb,
'[
  {"id":"burgers","name":"Burgers","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Fried","Grilled","Spicy","Tenders","Sandwich","Wings"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican-fast","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Crust","type":"select","value":"","options":["Thin","Regular","Thick","Stuffed","Gluten-Free"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"asian-fast","name":"Asian Fast Food","image":"food-asian","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sandwiches","name":"Sandwiches","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Bread","type":"select","value":"","options":["White","Wheat","Sourdough","Wrap","Sub","Croissant"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"my-usual","name":"My Usual Order","image":"fast-food-order","fields":[
    {"label":"Restaurant","type":"text","value":""},
    {"label":"Exact Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('cooking-nb','Cooking','food-drink','mygotwo',ARRAY['non-binary'],70,true,'[]'::jsonb,
'[
  {"id":"skill-level","name":"Skill Level","image":"favorite-meals","fields":[
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-meals","name":"Favorite Meals to Cook","image":"favorite-meals","fields":[
    {"label":"All-Time Favorite","type":"text","value":""},
    {"label":"Comfort Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"go-to-recipes","name":"Go-To Recipes","image":"favorite-meals","fields":[
    {"label":"Quick Weeknight Meal","type":"text","value":""},
    {"label":"Impressive Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"kitchen-tools","name":"Kitchen Tools","image":"grocery-specifics","fields":[
    {"label":"Favorite Tool","type":"text","value":""},
    {"label":"Favorite Appliance","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"meal-prep","name":"Meal Prep","image":"grocery-pantry","fields":[
    {"label":"Do You Meal Prep","type":"select","value":"","options":["Yes - Weekly","Yes - Sometimes","No","Want to Start"]},
    {"label":"Favorite Prep Meals","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cuisines-i-cook","name":"Cuisines I Cook","image":"favorite-restaurants","fields":[
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Want to Learn","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comfort-dishes","name":"Comfort Dishes","image":"favorite-meals","fields":[
    {"label":"Guilty Pleasure Dish","type":"text","value":""},
    {"label":"Family Recipe","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb);
