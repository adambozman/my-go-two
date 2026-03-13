-- ─────────────────────────────────────────────────────────────────────────────
-- Food & Drink — Same data for all three genders, gender-specific image banks
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'food-drink';

-- ═════════════════════════════════════════════════════════════════════════════
-- MALE
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

('restaurants-male', 'Restaurants', 'food-drink', 'mygotwo', ARRAY['male'], 10, true, '[]'::jsonb,
'[
  {"id":"asian","name":"Asian","image":"food-asian","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"italian","name":"Italian","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"american","name":"American","image":"food-burgers","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mediterranean","name":"Mediterranean","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Order","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Toppings","type":"text","value":""},
    {"label":"Crust","type":"select","value":"","options":["Thin","Regular","Thick","Stuffed","Gluten-Free"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('coffee-male', 'Coffee', 'food-drink', 'mygotwo', ARRAY['male'], 20, true, '[]'::jsonb,
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
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Simple Syrup","Vanilla","Caramel"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"espresso","name":"Espresso","image":"coffee-espresso","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Espresso","Americano","Macchiato","Cortado","Ristretto"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tea","name":"Tea","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Green","Black","Oolong","Herbal","Matcha","Chai","White"]},
    {"label":"Temperature","type":"select","value":"","options":["Hot","Iced"]},
    {"label":"Milk","type":"select","value":"","options":["None","Whole","Oat","Almond","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Sugar","Stevia"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grocery-male', 'Grocery', 'food-drink', 'mygotwo', ARRAY['male'], 30, true, '[]'::jsonb,
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
    {"label":"Favorite Cereals","type":"text","value":""},
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"proteins","name":"Proteins","image":"food-chicken","fields":[
    {"label":"Preferred Proteins","type":"select","value":"","options":["Chicken","Beef","Fish","Pork","Lamb","Turkey","Plant-Based","Eggs"]},
    {"label":"Favorite Cut","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"grocery-specifics","name":"Specific Items","image":"grocery-specifics","fields":[
    {"label":"Must-Have Items","type":"text","value":""},
    {"label":"Brands I Always Buy","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('meals-male', 'Meal Preferences', 'food-drink', 'mygotwo', ARRAY['male'], 40, true, '[]'::jsonb,
'[
  {"id":"breakfast","name":"Breakfast","image":"meal-breakfast","fields":[
    {"label":"Go-To Breakfast","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Coffee or Tea","type":"select","value":"","options":["Coffee","Tea","Both","Neither"]},
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
  ]}
]'::jsonb),

('dietary-male', 'Dietary', 'food-drink', 'mygotwo', ARRAY['male'], 50, true,
'[
  {"id":"diet-type","name":"Diet Type","image":"dietary-restrictions","fields":[
    {"label":"Diet","type":"select","value":"","options":["None","Vegan","Vegetarian","Pescatarian","Keto","Paleo","Gluten-Free","Halal","Kosher","Other"]},
    {"label":"Allergies","type":"text","value":""},
    {"label":"Foods I Avoid","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

('fast-food-male', 'Fast Food', 'food-drink', 'mygotwo', ARRAY['male'], 60, true,
'[
  {"id":"burger-chains","name":"Burgers","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken-chains","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican-chains","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza-chains","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fast-food-order","name":"My Usual","image":"fast-food-order","fields":[
    {"label":"Restaurant","type":"text","value":""},
    {"label":"Exact Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

('cooking-male', 'Cooking', 'food-drink', 'mygotwo', ARRAY['male'], 70, true,
'[
  {"id":"cooking-skill","name":"Skill Level","image":"favorite-meals","fields":[
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Go-To Meals","type":"text","value":""},
    {"label":"Favorite Kitchen Tool","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-meals","name":"Favorite Meals","image":"favorite-meals","fields":[
    {"label":"All-Time Favorite Meal","type":"text","value":""},
    {"label":"Comfort Food","type":"text","value":""},
    {"label":"Guilty Pleasure","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- FEMALE
-- ═════════════════════════════════════════════════════════════════════════════

('restaurants-female', 'Restaurants', 'food-drink', 'mygotwo', ARRAY['female'], 10, true, '[]'::jsonb,
'[
  {"id":"asian","name":"Asian","image":"food-asian","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"italian","name":"Italian","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"american","name":"American","image":"food-burgers","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mediterranean","name":"Mediterranean","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Order","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Toppings","type":"text","value":""},
    {"label":"Crust","type":"select","value":"","options":["Thin","Regular","Thick","Stuffed","Gluten-Free"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('coffee-female', 'Coffee', 'food-drink', 'mygotwo', ARRAY['female'], 20, true, '[]'::jsonb,
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
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Simple Syrup","Vanilla","Caramel"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"espresso","name":"Espresso","image":"coffee-espresso","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Espresso","Americano","Macchiato","Cortado","Ristretto"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tea","name":"Tea","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Green","Black","Oolong","Herbal","Matcha","Chai","White"]},
    {"label":"Temperature","type":"select","value":"","options":["Hot","Iced"]},
    {"label":"Milk","type":"select","value":"","options":["None","Whole","Oat","Almond","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Sugar","Stevia"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grocery-female', 'Grocery', 'food-drink', 'mygotwo', ARRAY['female'], 30, true, '[]'::jsonb,
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
    {"label":"Favorite Cereals","type":"text","value":""},
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"proteins","name":"Proteins","image":"food-chicken","fields":[
    {"label":"Preferred Proteins","type":"select","value":"","options":["Chicken","Beef","Fish","Pork","Lamb","Turkey","Plant-Based","Eggs"]},
    {"label":"Favorite Cut","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"grocery-specifics","name":"Specific Items","image":"grocery-specifics","fields":[
    {"label":"Must-Have Items","type":"text","value":""},
    {"label":"Brands I Always Buy","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('meals-female', 'Meal Preferences', 'food-drink', 'mygotwo', ARRAY['female'], 40, true, '[]'::jsonb,
'[
  {"id":"breakfast","name":"Breakfast","image":"meal-breakfast","fields":[
    {"label":"Go-To Breakfast","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Coffee or Tea","type":"select","value":"","options":["Coffee","Tea","Both","Neither"]},
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
  ]}
]'::jsonb),

('dietary-female', 'Dietary', 'food-drink', 'mygotwo', ARRAY['female'], 50, true,
'[
  {"id":"diet-type","name":"Diet Type","image":"dietary-restrictions","fields":[
    {"label":"Diet","type":"select","value":"","options":["None","Vegan","Vegetarian","Pescatarian","Keto","Paleo","Gluten-Free","Halal","Kosher","Other"]},
    {"label":"Allergies","type":"text","value":""},
    {"label":"Foods I Avoid","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

('fast-food-female', 'Fast Food', 'food-drink', 'mygotwo', ARRAY['female'], 60, true,
'[
  {"id":"burger-chains","name":"Burgers","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken-chains","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican-chains","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza-chains","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fast-food-order","name":"My Usual","image":"fast-food-order","fields":[
    {"label":"Restaurant","type":"text","value":""},
    {"label":"Exact Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

('cooking-female', 'Cooking', 'food-drink', 'mygotwo', ARRAY['female'], 70, true,
'[
  {"id":"cooking-skill","name":"Skill Level","image":"favorite-meals","fields":[
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Go-To Meals","type":"text","value":""},
    {"label":"Favorite Kitchen Tool","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-meals","name":"Favorite Meals","image":"favorite-meals","fields":[
    {"label":"All-Time Favorite Meal","type":"text","value":""},
    {"label":"Comfort Food","type":"text","value":""},
    {"label":"Guilty Pleasure","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- NON-BINARY
-- ═════════════════════════════════════════════════════════════════════════════

('restaurants-nb', 'Restaurants', 'food-drink', 'mygotwo', ARRAY['non-binary'], 10, true, '[]'::jsonb,
'[
  {"id":"asian","name":"Asian","image":"food-asian","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"italian","name":"Italian","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Spice Level","type":"select","value":"","options":["Mild","Medium","Hot","Extra Hot"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"american","name":"American","image":"food-burgers","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mediterranean","name":"Mediterranean","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Dish","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Order","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Spots","type":"text","value":""},
    {"label":"Favorite Toppings","type":"text","value":""},
    {"label":"Crust","type":"select","value":"","options":["Thin","Regular","Thick","Stuffed","Gluten-Free"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('coffee-nb', 'Coffee', 'food-drink', 'mygotwo', ARRAY['non-binary'], 20, true, '[]'::jsonb,
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
    {"label":"Sweetener","type":"select","value":"","options":["None","Sugar","Honey","Stevia","Simple Syrup","Vanilla","Caramel"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple","Quad"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"espresso","name":"Espresso","image":"coffee-espresso","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Drink","type":"select","value":"","options":["Espresso","Americano","Macchiato","Cortado","Ristretto"]},
    {"label":"Shots","type":"select","value":"","options":["Single","Double","Triple"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"tea","name":"Tea","image":"coffee-tea","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Green","Black","Oolong","Herbal","Matcha","Chai","White"]},
    {"label":"Temperature","type":"select","value":"","options":["Hot","Iced"]},
    {"label":"Milk","type":"select","value":"","options":["None","Whole","Oat","Almond","Soy"]},
    {"label":"Sweetener","type":"select","value":"","options":["None","Honey","Sugar","Stevia"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('grocery-nb', 'Grocery', 'food-drink', 'mygotwo', ARRAY['non-binary'], 30, true, '[]'::jsonb,
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
    {"label":"Favorite Cereals","type":"text","value":""},
    {"label":"Favorite Brands","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"proteins","name":"Proteins","image":"food-chicken","fields":[
    {"label":"Preferred Proteins","type":"select","value":"","options":["Chicken","Beef","Fish","Pork","Lamb","Turkey","Plant-Based","Eggs"]},
    {"label":"Favorite Cut","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"grocery-specifics","name":"Specific Items","image":"grocery-specifics","fields":[
    {"label":"Must-Have Items","type":"text","value":""},
    {"label":"Brands I Always Buy","type":"text","value":""},
    {"label":"Preferred Store","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('meals-nb', 'Meal Preferences', 'food-drink', 'mygotwo', ARRAY['non-binary'], 40, true, '[]'::jsonb,
'[
  {"id":"breakfast","name":"Breakfast","image":"meal-breakfast","fields":[
    {"label":"Go-To Breakfast","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Coffee or Tea","type":"select","value":"","options":["Coffee","Tea","Both","Neither"]},
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
  ]}
]'::jsonb),

('dietary-nb', 'Dietary', 'food-drink', 'mygotwo', ARRAY['non-binary'], 50, true,
'[
  {"id":"diet-type","name":"Diet Type","image":"dietary-restrictions","fields":[
    {"label":"Diet","type":"select","value":"","options":["None","Vegan","Vegetarian","Pescatarian","Keto","Paleo","Gluten-Free","Halal","Kosher","Other"]},
    {"label":"Allergies","type":"text","value":""},
    {"label":"Foods I Avoid","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

('fast-food-nb', 'Fast Food', 'food-drink', 'mygotwo', ARRAY['non-binary'], 60, true,
'[
  {"id":"burger-chains","name":"Burgers","image":"food-burgers","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"chicken-chains","name":"Chicken","image":"food-chicken","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mexican-chains","name":"Mexican","image":"food-mexican","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pizza-chains","name":"Pizza","image":"food-pizza","fields":[
    {"label":"Favorite Chain","type":"text","value":""},
    {"label":"Go-To Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fast-food-order","name":"My Usual","image":"fast-food-order","fields":[
    {"label":"Restaurant","type":"text","value":""},
    {"label":"Exact Order","type":"text","value":""},
    {"label":"Customizations","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb),

('cooking-nb', 'Cooking', 'food-drink', 'mygotwo', ARRAY['non-binary'], 70, true,
'[
  {"id":"cooking-skill","name":"Skill Level","image":"favorite-meals","fields":[
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Go-To Meals","type":"text","value":""},
    {"label":"Favorite Kitchen Tool","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-meals","name":"Favorite Meals","image":"favorite-meals","fields":[
    {"label":"All-Time Favorite Meal","type":"text","value":""},
    {"label":"Comfort Food","type":"text","value":""},
    {"label":"Guilty Pleasure","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb, '[]'::jsonb);
