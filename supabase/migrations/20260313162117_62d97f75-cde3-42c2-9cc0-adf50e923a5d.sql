-- Food & Drink full rebuild - Male restaurants
INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES
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
]'::jsonb);