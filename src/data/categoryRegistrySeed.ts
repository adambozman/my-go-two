// AUTO-GENERATED from supabase/migrations — edit the migration SQL files, then re-run sync
// This is the single source of truth for all category_registry seed data

export interface CategoryRegistryRow {
  key: string;
  label: string;
  section: string;
  page: string;
  genders: string[];
  sort_order: number;
  is_active: boolean;
  fields: unknown[];
  subcategories: unknown[];
}

export const CATEGORY_REGISTRY_SEED: CategoryRegistryRow[] = 
[
  {
    "key": "restaurants-male",
    "label": "Restaurants",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "cuisines",
        "name": "Cuisines",
        "image": "food-restaurants",
        "products": [
          {
            "id": "asian",
            "name": "Asian",
            "image": "food-asian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "italian",
            "name": "Italian",
            "image": "food-italian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mexican",
            "name": "Mexican",
            "image": "food-mexican",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "american",
            "name": "American",
            "image": "food-american",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mediterranean",
            "name": "Mediterranean",
            "image": "food-mediterranean",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sushi",
            "name": "Sushi",
            "image": "food-sushi",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Roll",
                "type": "text",
                "value": ""
              },
              {
                "label": "Soy Sauce",
                "type": "select",
                "value": "",
                "options": [
                  "Regular",
                  "Low Sodium",
                  "None"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "indian",
            "name": "Indian",
            "image": "food-indian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "thai",
            "name": "Thai",
            "image": "food-thai",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bbq",
            "name": "BBQ",
            "image": "food-bbq",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Meat",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sauce",
                "type": "select",
                "value": "",
                "options": [
                  "Sweet",
                  "Spicy",
                  "Vinegar",
                  "Dry Rub",
                  "None"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "greek",
            "name": "Greek",
            "image": "food-greek",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "middle-eastern",
            "name": "Middle Eastern",
            "image": "food-middle-eastern",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "french",
            "name": "French",
            "image": "food-french",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "coffee-male",
    "label": "Coffee",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "orders",
        "name": "Orders",
        "image": "coffee-hot",
        "products": [
          {
            "id": "hot-coffee",
            "name": "Hot Coffee",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "None"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Honey",
                  "Stevia",
                  "Splenda"
                ]
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "iced-coffee",
            "name": "Iced Coffee",
            "image": "coffee-iced",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "None"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Honey",
                  "Stevia",
                  "Splenda"
                ]
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "espresso",
            "name": "Espresso",
            "image": "coffee-espresso",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cold-brew",
            "name": "Cold Brew",
            "image": "coffee-iced",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "With Milk",
                  "Sweetened",
                  "Nitro"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Vanilla",
                  "Caramel"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "latte",
            "name": "Latte",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim"
                ]
              },
              {
                "label": "Flavor",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tea",
            "name": "Tea",
            "image": "coffee-tea",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Green",
                  "Black",
                  "Herbal",
                  "Chai",
                  "Oolong",
                  "White"
                ]
              },
              {
                "label": "Temperature",
                "type": "select",
                "value": "",
                "options": [
                  "Hot",
                  "Iced"
                ]
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Whole",
                  "Oat",
                  "Almond"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Honey",
                  "Sugar",
                  "Stevia"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "matcha",
            "name": "Matcha",
            "image": "coffee-tea",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Hot",
                  "Iced",
                  "Latte"
                ]
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Oat",
                  "Almond",
                  "Whole",
                  "Skim"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Honey",
                  "Sugar",
                  "Vanilla"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "juice-smoothie",
            "name": "Juice / Smoothie",
            "image": "coffee-order",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Juice",
                  "Smoothie",
                  "Protein Shake"
                ]
              },
              {
                "label": "Favorite Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "grocery-male",
    "label": "Grocery",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "grocery-produce",
        "products": [
          {
            "id": "produce",
            "name": "Produce",
            "image": "grocery-produce",
            "fields": [
              {
                "label": "Favorite Fruits",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Vegetables",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dairy",
            "name": "Dairy",
            "image": "grocery-dairy",
            "fields": [
              {
                "label": "Milk Type",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "2%"
                ]
              },
              {
                "label": "Favorite Cheese",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Yogurt",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pantry",
            "name": "Pantry",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Favorite Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "proteins",
            "name": "Proteins",
            "image": "grocery-proteins",
            "fields": [
              {
                "label": "Preferred Protein",
                "type": "select",
                "value": "",
                "options": [
                  "Chicken",
                  "Beef",
                  "Fish",
                  "Pork",
                  "Plant-Based",
                  "Turkey"
                ]
              },
              {
                "label": "Favorite Cut",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "snacks",
            "name": "Snacks",
            "image": "grocery-snacks",
            "fields": [
              {
                "label": "Salty Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "beverages",
            "name": "Beverages",
            "image": "grocery-beverages",
            "fields": [
              {
                "label": "Favorite Drinks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sparkling or Still",
                "type": "select",
                "value": "",
                "options": [
                  "Still",
                  "Sparkling",
                  "Both"
                ]
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "frozen",
            "name": "Frozen",
            "image": "grocery-frozen",
            "fields": [
              {
                "label": "Favorite Frozen Meals",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bread-bakery",
            "name": "Bread & Bakery",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Bread Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Bakery Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "meals-male",
    "label": "Meal Preferences",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "meals",
        "name": "Meals",
        "image": "meal-breakfast",
        "products": [
          {
            "id": "breakfast",
            "name": "Breakfast",
            "image": "meal-breakfast",
            "fields": [
              {
                "label": "Go-To Breakfast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Coffee or Tea",
                "type": "select",
                "value": "",
                "options": [
                  "Coffee",
                  "Tea",
                  "Neither",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "brunch",
            "name": "Brunch",
            "image": "meal-breakfast",
            "fields": [
              {
                "label": "Go-To Brunch Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lunch",
            "name": "Lunch",
            "image": "meal-lunch",
            "fields": [
              {
                "label": "Go-To Lunch",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Prefer",
                "type": "select",
                "value": "",
                "options": [
                  "Eat Out",
                  "Cook at Home",
                  "Takeout",
                  "Meal Prep"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dinner",
            "name": "Dinner",
            "image": "meal-dinner",
            "fields": [
              {
                "label": "Go-To Dinner",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Prefer",
                "type": "select",
                "value": "",
                "options": [
                  "Eat Out",
                  "Cook at Home",
                  "Takeout"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dessert",
            "name": "Dessert",
            "image": "meal-dessert",
            "fields": [
              {
                "label": "Favorite Dessert",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet Tooth",
                "type": "select",
                "value": "",
                "options": [
                  "Low",
                  "Medium",
                  "High",
                  "Extreme"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "late-night",
            "name": "Late Night",
            "image": "meal-dinner",
            "fields": [
              {
                "label": "Go-To Late Night",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "snack-time",
            "name": "Snacks",
            "image": "grocery-snacks",
            "fields": [
              {
                "label": "Go-To Snack",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet or Salty",
                "type": "select",
                "value": "",
                "options": [
                  "Sweet",
                  "Salty",
                  "Both",
                  "Neither"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comfort-food",
            "name": "Comfort Food",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "All-Time Comfort Food",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Get It",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "dietary-male",
    "label": "Dietary",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "dietary-restrictions",
        "products": [
          {
            "id": "diet-type",
            "name": "Diet Type",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Diet",
                "type": "select",
                "value": "",
                "options": [
                  "No Restrictions",
                  "Vegetarian",
                  "Vegan",
                  "Keto",
                  "Paleo",
                  "Gluten-Free",
                  "Halal",
                  "Kosher",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "allergies",
            "name": "Allergies",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Allergies",
                "type": "text",
                "value": ""
              },
              {
                "label": "Severity",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Moderate",
                  "Severe / EpiPen"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "intolerances",
            "name": "Intolerances",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Intolerances",
                "type": "text",
                "value": ""
              },
              {
                "label": "Examples",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "foods-i-avoid",
            "name": "Foods I Avoid",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Foods I Avoid",
                "type": "text",
                "value": ""
              },
              {
                "label": "Reason",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "preferred-cuisines",
            "name": "Preferred Cuisines",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Top Cuisines",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cheat-meal",
            "name": "Cheat Meal",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Go-To Cheat Meal",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Get It",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "health-goals",
            "name": "Health Goals",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Goal",
                "type": "select",
                "value": "",
                "options": [
                  "Lose Weight",
                  "Gain Muscle",
                  "Maintain",
                  "Eat Cleaner",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "fast-food-male",
    "label": "Fast Food",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "chains",
        "name": "Chains",
        "image": "food-burgers",
        "products": [
          {
            "id": "burgers",
            "name": "Burgers",
            "image": "food-burgers",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "chicken",
            "name": "Chicken",
            "image": "food-chicken",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Fried",
                  "Grilled",
                  "Crispy",
                  "Spicy"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mexican-fast",
            "name": "Mexican",
            "image": "food-mexican",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pizza",
            "name": "Pizza",
            "image": "food-pizza",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Crust",
                "type": "select",
                "value": "",
                "options": [
                  "Thin",
                  "Thick",
                  "Stuffed",
                  "Cauliflower"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "asian-fast",
            "name": "Asian Fast Food",
            "image": "food-asian",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sandwiches",
            "name": "Sandwiches",
            "image": "food-burgers",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Bread",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "my-usual",
            "name": "My Usual Order",
            "image": "fast-food-order",
            "fields": [
              {
                "label": "Restaurant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Exact Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "cooking-male",
    "label": "Cooking",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "style",
        "name": "Style",
        "image": "favorite-meals",
        "products": [
          {
            "id": "skill-level",
            "name": "Skill Level",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Home Cook",
                  "Intermediate",
                  "Advanced",
                  "Chef Level"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-meals",
            "name": "Favorite Meals to Cook",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Comfort Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "go-to-recipes",
            "name": "Go-To Recipes",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Quick Weeknight Meal",
                "type": "text",
                "value": ""
              },
              {
                "label": "Impressive Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "kitchen-tools",
            "name": "Kitchen Tools",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Favorite Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Appliance",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "meal-prep",
            "name": "Meal Prep",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Do You Meal Prep",
                "type": "select",
                "value": "",
                "options": [
                  "Yes",
                  "No",
                  "Sometimes"
                ]
              },
              {
                "label": "Favorite Prep Meals",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cuisines-i-cook",
            "name": "Cuisines I Cook",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Cuisines to Cook",
                "type": "text",
                "value": ""
              },
              {
                "label": "Want to Learn",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comfort-dishes",
            "name": "Comfort Dishes",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Guilty Pleasure Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Family Recipe",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "restaurants-female",
    "label": "Restaurants",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "cuisines",
        "name": "Cuisines",
        "image": "food-restaurants",
        "products": [
          {
            "id": "asian",
            "name": "Asian",
            "image": "food-asian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "italian",
            "name": "Italian",
            "image": "food-italian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mexican",
            "name": "Mexican",
            "image": "food-mexican",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "american",
            "name": "American",
            "image": "food-american",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mediterranean",
            "name": "Mediterranean",
            "image": "food-mediterranean",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sushi",
            "name": "Sushi",
            "image": "food-sushi",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Roll",
                "type": "text",
                "value": ""
              },
              {
                "label": "Soy Sauce",
                "type": "select",
                "value": "",
                "options": [
                  "Regular",
                  "Low Sodium",
                  "None"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "indian",
            "name": "Indian",
            "image": "food-indian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "thai",
            "name": "Thai",
            "image": "food-thai",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bbq",
            "name": "BBQ",
            "image": "food-bbq",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Meat",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sauce",
                "type": "select",
                "value": "",
                "options": [
                  "Sweet",
                  "Spicy",
                  "Vinegar",
                  "Dry Rub",
                  "None"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "greek",
            "name": "Greek",
            "image": "food-greek",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "middle-eastern",
            "name": "Middle Eastern",
            "image": "food-middle-eastern",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "french",
            "name": "French",
            "image": "food-french",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "coffee-female",
    "label": "Coffee",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "orders",
        "name": "Orders",
        "image": "coffee-hot",
        "products": [
          {
            "id": "hot-coffee",
            "name": "Hot Coffee",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "None"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Honey",
                  "Stevia",
                  "Splenda"
                ]
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "iced-coffee",
            "name": "Iced Coffee",
            "image": "coffee-iced",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "None"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Honey",
                  "Stevia",
                  "Splenda"
                ]
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "espresso",
            "name": "Espresso",
            "image": "coffee-espresso",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cold-brew",
            "name": "Cold Brew",
            "image": "coffee-iced",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "With Milk",
                  "Sweetened",
                  "Nitro"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Vanilla",
                  "Caramel"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "latte",
            "name": "Latte",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim"
                ]
              },
              {
                "label": "Flavor",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tea",
            "name": "Tea",
            "image": "coffee-tea",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Green",
                  "Black",
                  "Herbal",
                  "Chai",
                  "Oolong",
                  "White"
                ]
              },
              {
                "label": "Temperature",
                "type": "select",
                "value": "",
                "options": [
                  "Hot",
                  "Iced"
                ]
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Whole",
                  "Oat",
                  "Almond"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Honey",
                  "Sugar",
                  "Stevia"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "matcha",
            "name": "Matcha",
            "image": "coffee-tea",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Hot",
                  "Iced",
                  "Latte"
                ]
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Oat",
                  "Almond",
                  "Whole",
                  "Skim"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Honey",
                  "Sugar",
                  "Vanilla"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "juice-smoothie",
            "name": "Juice / Smoothie",
            "image": "coffee-order",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Juice",
                  "Smoothie",
                  "Protein Shake"
                ]
              },
              {
                "label": "Favorite Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "grocery-female",
    "label": "Grocery",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "grocery-produce",
        "products": [
          {
            "id": "produce",
            "name": "Produce",
            "image": "grocery-produce",
            "fields": [
              {
                "label": "Favorite Fruits",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Vegetables",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dairy",
            "name": "Dairy",
            "image": "grocery-dairy",
            "fields": [
              {
                "label": "Milk Type",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "2%"
                ]
              },
              {
                "label": "Favorite Cheese",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Yogurt",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pantry",
            "name": "Pantry",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Favorite Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "proteins",
            "name": "Proteins",
            "image": "grocery-proteins",
            "fields": [
              {
                "label": "Preferred Protein",
                "type": "select",
                "value": "",
                "options": [
                  "Chicken",
                  "Beef",
                  "Fish",
                  "Pork",
                  "Plant-Based",
                  "Turkey"
                ]
              },
              {
                "label": "Favorite Cut",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "snacks",
            "name": "Snacks",
            "image": "grocery-snacks",
            "fields": [
              {
                "label": "Salty Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "beverages",
            "name": "Beverages",
            "image": "grocery-beverages",
            "fields": [
              {
                "label": "Favorite Drinks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sparkling or Still",
                "type": "select",
                "value": "",
                "options": [
                  "Still",
                  "Sparkling",
                  "Both"
                ]
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "frozen",
            "name": "Frozen",
            "image": "grocery-frozen",
            "fields": [
              {
                "label": "Favorite Frozen Meals",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bread-bakery",
            "name": "Bread & Bakery",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Bread Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Bakery Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "meals-female",
    "label": "Meal Preferences",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "meals",
        "name": "Meals",
        "image": "meal-breakfast",
        "products": [
          {
            "id": "breakfast",
            "name": "Breakfast",
            "image": "meal-breakfast",
            "fields": [
              {
                "label": "Go-To Breakfast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Coffee or Tea",
                "type": "select",
                "value": "",
                "options": [
                  "Coffee",
                  "Tea",
                  "Neither",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "brunch",
            "name": "Brunch",
            "image": "meal-breakfast",
            "fields": [
              {
                "label": "Go-To Brunch Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lunch",
            "name": "Lunch",
            "image": "meal-lunch",
            "fields": [
              {
                "label": "Go-To Lunch",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Prefer",
                "type": "select",
                "value": "",
                "options": [
                  "Eat Out",
                  "Cook at Home",
                  "Takeout",
                  "Meal Prep"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dinner",
            "name": "Dinner",
            "image": "meal-dinner",
            "fields": [
              {
                "label": "Go-To Dinner",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Prefer",
                "type": "select",
                "value": "",
                "options": [
                  "Eat Out",
                  "Cook at Home",
                  "Takeout"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dessert",
            "name": "Dessert",
            "image": "meal-dessert",
            "fields": [
              {
                "label": "Favorite Dessert",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet Tooth",
                "type": "select",
                "value": "",
                "options": [
                  "Low",
                  "Medium",
                  "High",
                  "Extreme"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "late-night",
            "name": "Late Night",
            "image": "meal-dinner",
            "fields": [
              {
                "label": "Go-To Late Night",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "snack-time",
            "name": "Snacks",
            "image": "grocery-snacks",
            "fields": [
              {
                "label": "Go-To Snack",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet or Salty",
                "type": "select",
                "value": "",
                "options": [
                  "Sweet",
                  "Salty",
                  "Both",
                  "Neither"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comfort-food",
            "name": "Comfort Food",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "All-Time Comfort Food",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Get It",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "dietary-female",
    "label": "Dietary",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "dietary-restrictions",
        "products": [
          {
            "id": "diet-type",
            "name": "Diet Type",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Diet",
                "type": "select",
                "value": "",
                "options": [
                  "No Restrictions",
                  "Vegetarian",
                  "Vegan",
                  "Keto",
                  "Paleo",
                  "Gluten-Free",
                  "Halal",
                  "Kosher",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "allergies",
            "name": "Allergies",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Allergies",
                "type": "text",
                "value": ""
              },
              {
                "label": "Severity",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Moderate",
                  "Severe / EpiPen"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "intolerances",
            "name": "Intolerances",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Intolerances",
                "type": "text",
                "value": ""
              },
              {
                "label": "Examples",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "foods-i-avoid",
            "name": "Foods I Avoid",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Foods I Avoid",
                "type": "text",
                "value": ""
              },
              {
                "label": "Reason",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "preferred-cuisines",
            "name": "Preferred Cuisines",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Top Cuisines",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cheat-meal",
            "name": "Cheat Meal",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Go-To Cheat Meal",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Get It",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "health-goals",
            "name": "Health Goals",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Goal",
                "type": "select",
                "value": "",
                "options": [
                  "Lose Weight",
                  "Gain Muscle",
                  "Maintain",
                  "Eat Cleaner",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "fast-food-female",
    "label": "Fast Food",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "chains",
        "name": "Chains",
        "image": "food-burgers",
        "products": [
          {
            "id": "burgers",
            "name": "Burgers",
            "image": "food-burgers",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "chicken",
            "name": "Chicken",
            "image": "food-chicken",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Fried",
                  "Grilled",
                  "Crispy",
                  "Spicy"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mexican-fast",
            "name": "Mexican",
            "image": "food-mexican",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pizza",
            "name": "Pizza",
            "image": "food-pizza",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Crust",
                "type": "select",
                "value": "",
                "options": [
                  "Thin",
                  "Thick",
                  "Stuffed",
                  "Cauliflower"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "asian-fast",
            "name": "Asian Fast Food",
            "image": "food-asian",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sandwiches",
            "name": "Sandwiches",
            "image": "food-burgers",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Bread",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "my-usual",
            "name": "My Usual Order",
            "image": "fast-food-order",
            "fields": [
              {
                "label": "Restaurant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Exact Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "cooking-female",
    "label": "Cooking",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "style",
        "name": "Style",
        "image": "favorite-meals",
        "products": [
          {
            "id": "skill-level",
            "name": "Skill Level",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Home Cook",
                  "Intermediate",
                  "Advanced",
                  "Chef Level"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-meals",
            "name": "Favorite Meals to Cook",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Comfort Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "go-to-recipes",
            "name": "Go-To Recipes",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Quick Weeknight Meal",
                "type": "text",
                "value": ""
              },
              {
                "label": "Impressive Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "kitchen-tools",
            "name": "Kitchen Tools",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Favorite Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Appliance",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "meal-prep",
            "name": "Meal Prep",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Do You Meal Prep",
                "type": "select",
                "value": "",
                "options": [
                  "Yes",
                  "No",
                  "Sometimes"
                ]
              },
              {
                "label": "Favorite Prep Meals",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cuisines-i-cook",
            "name": "Cuisines I Cook",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Cuisines to Cook",
                "type": "text",
                "value": ""
              },
              {
                "label": "Want to Learn",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comfort-dishes",
            "name": "Comfort Dishes",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Guilty Pleasure Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Family Recipe",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "restaurants-nb",
    "label": "Restaurants",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "cuisines",
        "name": "Cuisines",
        "image": "food-restaurants",
        "products": [
          {
            "id": "asian",
            "name": "Asian",
            "image": "food-asian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "italian",
            "name": "Italian",
            "image": "food-italian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mexican",
            "name": "Mexican",
            "image": "food-mexican",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "american",
            "name": "American",
            "image": "food-american",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mediterranean",
            "name": "Mediterranean",
            "image": "food-mediterranean",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sushi",
            "name": "Sushi",
            "image": "food-sushi",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Roll",
                "type": "text",
                "value": ""
              },
              {
                "label": "Soy Sauce",
                "type": "select",
                "value": "",
                "options": [
                  "Regular",
                  "Low Sodium",
                  "None"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "indian",
            "name": "Indian",
            "image": "food-indian",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "thai",
            "name": "Thai",
            "image": "food-thai",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Spice Level",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Medium",
                  "Hot",
                  "Extra Hot"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bbq",
            "name": "BBQ",
            "image": "food-bbq",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Meat",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sauce",
                "type": "select",
                "value": "",
                "options": [
                  "Sweet",
                  "Spicy",
                  "Vinegar",
                  "Dry Rub",
                  "None"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "greek",
            "name": "Greek",
            "image": "food-greek",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "middle-eastern",
            "name": "Middle Eastern",
            "image": "food-middle-eastern",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "french",
            "name": "French",
            "image": "food-french",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "coffee-nb",
    "label": "Coffee",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "orders",
        "name": "Orders",
        "image": "coffee-hot",
        "products": [
          {
            "id": "hot-coffee",
            "name": "Hot Coffee",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "None"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Honey",
                  "Stevia",
                  "Splenda"
                ]
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "iced-coffee",
            "name": "Iced Coffee",
            "image": "coffee-iced",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "None"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Honey",
                  "Stevia",
                  "Splenda"
                ]
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "espresso",
            "name": "Espresso",
            "image": "coffee-espresso",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Shots",
                "type": "select",
                "value": "",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cold-brew",
            "name": "Cold Brew",
            "image": "coffee-iced",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "With Milk",
                  "Sweetened",
                  "Nitro"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Sugar",
                  "Vanilla",
                  "Caramel"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "latte",
            "name": "Latte",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim"
                ]
              },
              {
                "label": "Flavor",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tea",
            "name": "Tea",
            "image": "coffee-tea",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Green",
                  "Black",
                  "Herbal",
                  "Chai",
                  "Oolong",
                  "White"
                ]
              },
              {
                "label": "Temperature",
                "type": "select",
                "value": "",
                "options": [
                  "Hot",
                  "Iced"
                ]
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Whole",
                  "Oat",
                  "Almond"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Honey",
                  "Sugar",
                  "Stevia"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "matcha",
            "name": "Matcha",
            "image": "coffee-tea",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Hot",
                  "Iced",
                  "Latte"
                ]
              },
              {
                "label": "Milk",
                "type": "select",
                "value": "",
                "options": [
                  "Oat",
                  "Almond",
                  "Whole",
                  "Skim"
                ]
              },
              {
                "label": "Sweetener",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Honey",
                  "Sugar",
                  "Vanilla"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "juice-smoothie",
            "name": "Juice / Smoothie",
            "image": "coffee-order",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Juice",
                  "Smoothie",
                  "Protein Shake"
                ]
              },
              {
                "label": "Favorite Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "grocery-nb",
    "label": "Grocery",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "grocery-produce",
        "products": [
          {
            "id": "produce",
            "name": "Produce",
            "image": "grocery-produce",
            "fields": [
              {
                "label": "Favorite Fruits",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Vegetables",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dairy",
            "name": "Dairy",
            "image": "grocery-dairy",
            "fields": [
              {
                "label": "Milk Type",
                "type": "select",
                "value": "",
                "options": [
                  "Whole",
                  "Oat",
                  "Almond",
                  "Skim",
                  "2%"
                ]
              },
              {
                "label": "Favorite Cheese",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Yogurt",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pantry",
            "name": "Pantry",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Favorite Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "proteins",
            "name": "Proteins",
            "image": "grocery-proteins",
            "fields": [
              {
                "label": "Preferred Protein",
                "type": "select",
                "value": "",
                "options": [
                  "Chicken",
                  "Beef",
                  "Fish",
                  "Pork",
                  "Plant-Based",
                  "Turkey"
                ]
              },
              {
                "label": "Favorite Cut",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "snacks",
            "name": "Snacks",
            "image": "grocery-snacks",
            "fields": [
              {
                "label": "Salty Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet Snacks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "beverages",
            "name": "Beverages",
            "image": "grocery-beverages",
            "fields": [
              {
                "label": "Favorite Drinks",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sparkling or Still",
                "type": "select",
                "value": "",
                "options": [
                  "Still",
                  "Sparkling",
                  "Both"
                ]
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "frozen",
            "name": "Frozen",
            "image": "grocery-frozen",
            "fields": [
              {
                "label": "Favorite Frozen Meals",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bread-bakery",
            "name": "Bread & Bakery",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Bread Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Bakery Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "meals-nb",
    "label": "Meal Preferences",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "meals",
        "name": "Meals",
        "image": "meal-breakfast",
        "products": [
          {
            "id": "breakfast",
            "name": "Breakfast",
            "image": "meal-breakfast",
            "fields": [
              {
                "label": "Go-To Breakfast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Coffee or Tea",
                "type": "select",
                "value": "",
                "options": [
                  "Coffee",
                  "Tea",
                  "Neither",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "brunch",
            "name": "Brunch",
            "image": "meal-breakfast",
            "fields": [
              {
                "label": "Go-To Brunch Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lunch",
            "name": "Lunch",
            "image": "meal-lunch",
            "fields": [
              {
                "label": "Go-To Lunch",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Prefer",
                "type": "select",
                "value": "",
                "options": [
                  "Eat Out",
                  "Cook at Home",
                  "Takeout",
                  "Meal Prep"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dinner",
            "name": "Dinner",
            "image": "meal-dinner",
            "fields": [
              {
                "label": "Go-To Dinner",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Prefer",
                "type": "select",
                "value": "",
                "options": [
                  "Eat Out",
                  "Cook at Home",
                  "Takeout"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dessert",
            "name": "Dessert",
            "image": "meal-dessert",
            "fields": [
              {
                "label": "Favorite Dessert",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet Tooth",
                "type": "select",
                "value": "",
                "options": [
                  "Low",
                  "Medium",
                  "High",
                  "Extreme"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "late-night",
            "name": "Late Night",
            "image": "meal-dinner",
            "fields": [
              {
                "label": "Go-To Late Night",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "snack-time",
            "name": "Snacks",
            "image": "grocery-snacks",
            "fields": [
              {
                "label": "Go-To Snack",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sweet or Salty",
                "type": "select",
                "value": "",
                "options": [
                  "Sweet",
                  "Salty",
                  "Both",
                  "Neither"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comfort-food",
            "name": "Comfort Food",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "All-Time Comfort Food",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Get It",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "dietary-nb",
    "label": "Dietary",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "dietary-restrictions",
        "products": [
          {
            "id": "diet-type",
            "name": "Diet Type",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Diet",
                "type": "select",
                "value": "",
                "options": [
                  "No Restrictions",
                  "Vegetarian",
                  "Vegan",
                  "Keto",
                  "Paleo",
                  "Gluten-Free",
                  "Halal",
                  "Kosher",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "allergies",
            "name": "Allergies",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Allergies",
                "type": "text",
                "value": ""
              },
              {
                "label": "Severity",
                "type": "select",
                "value": "",
                "options": [
                  "Mild",
                  "Moderate",
                  "Severe / EpiPen"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "intolerances",
            "name": "Intolerances",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Intolerances",
                "type": "text",
                "value": ""
              },
              {
                "label": "Examples",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "foods-i-avoid",
            "name": "Foods I Avoid",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Foods I Avoid",
                "type": "text",
                "value": ""
              },
              {
                "label": "Reason",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "preferred-cuisines",
            "name": "Preferred Cuisines",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Top Cuisines",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cheat-meal",
            "name": "Cheat Meal",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Go-To Cheat Meal",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Get It",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "health-goals",
            "name": "Health Goals",
            "image": "dietary-restrictions",
            "fields": [
              {
                "label": "Goal",
                "type": "select",
                "value": "",
                "options": [
                  "Lose Weight",
                  "Gain Muscle",
                  "Maintain",
                  "Eat Cleaner",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "fast-food-nb",
    "label": "Fast Food",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "chains",
        "name": "Chains",
        "image": "food-burgers",
        "products": [
          {
            "id": "burgers",
            "name": "Burgers",
            "image": "food-burgers",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "chicken",
            "name": "Chicken",
            "image": "food-chicken",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Fried",
                  "Grilled",
                  "Crispy",
                  "Spicy"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mexican-fast",
            "name": "Mexican",
            "image": "food-mexican",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pizza",
            "name": "Pizza",
            "image": "food-pizza",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Crust",
                "type": "select",
                "value": "",
                "options": [
                  "Thin",
                  "Thick",
                  "Stuffed",
                  "Cauliflower"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "asian-fast",
            "name": "Asian Fast Food",
            "image": "food-asian",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sandwiches",
            "name": "Sandwiches",
            "image": "food-burgers",
            "fields": [
              {
                "label": "Favorite Chain",
                "type": "text",
                "value": ""
              },
              {
                "label": "Go-To Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Bread",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "my-usual",
            "name": "My Usual Order",
            "image": "fast-food-order",
            "fields": [
              {
                "label": "Restaurant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Exact Order",
                "type": "text",
                "value": ""
              },
              {
                "label": "Customizations",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "cooking-nb",
    "label": "Cooking",
    "section": "food-drink",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "style",
        "name": "Style",
        "image": "favorite-meals",
        "products": [
          {
            "id": "skill-level",
            "name": "Skill Level",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Home Cook",
                  "Intermediate",
                  "Advanced",
                  "Chef Level"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-meals",
            "name": "Favorite Meals to Cook",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Comfort Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "go-to-recipes",
            "name": "Go-To Recipes",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Quick Weeknight Meal",
                "type": "text",
                "value": ""
              },
              {
                "label": "Impressive Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "kitchen-tools",
            "name": "Kitchen Tools",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Favorite Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Appliance",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "meal-prep",
            "name": "Meal Prep",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Do You Meal Prep",
                "type": "select",
                "value": "",
                "options": [
                  "Yes",
                  "No",
                  "Sometimes"
                ]
              },
              {
                "label": "Favorite Prep Meals",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cuisines-i-cook",
            "name": "Cuisines I Cook",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Cuisines to Cook",
                "type": "text",
                "value": ""
              },
              {
                "label": "Want to Learn",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comfort-dishes",
            "name": "Comfort Dishes",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Guilty Pleasure Dish",
                "type": "text",
                "value": ""
              },
              {
                "label": "Family Recipe",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "everyday-male",
    "label": "Everyday",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "everyday-tops",
        "products": [
          {
            "id": "classic-crew",
            "name": "Classic Crew-Neck",
            "image": "everyday-classic-crew",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "boxy-tee",
            "name": "Oversized Boxy Tee",
            "image": "everyday-boxy-tee",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "henley",
            "name": "Henley",
            "image": "everyday-henley",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Sleeve",
                "type": "select",
                "value": "",
                "options": [
                  "Short",
                  "Long"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "textured-tee",
            "name": "Textured T-Shirt",
            "image": "everyday-textured-tee",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Texture",
                "type": "select",
                "value": "",
                "options": [
                  "Waffle-Knit",
                  "Popcorn",
                  "Other"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tank-top",
            "name": "Tank Top",
            "image": "everyday-tank-top",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pocket-tee",
            "name": "Pocket Tee",
            "image": "everyday-pocket-tee",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "everyday-bottoms",
        "products": [
          {
            "id": "relaxed-chinos",
            "name": "Relaxed-Fit Chinos",
            "image": "everyday-relaxed-chinos",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "straight-denim",
            "name": "Straight-Leg Denim",
            "image": "everyday-straight-denim",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Wash",
                "type": "select",
                "value": "",
                "options": [
                  "Medium",
                  "Vintage",
                  "Raw",
                  "Light",
                  "Black"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "linen-trousers",
            "name": "Linen Trousers",
            "image": "everyday-linen-trousers",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "corduroy-pants",
            "name": "Corduroy Pants",
            "image": "everyday-corduroy-pants",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cargo-pants",
            "name": "Refined Cargo Pants",
            "image": "everyday-cargo-pants",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "knit-trousers",
            "name": "Knit Drawstring Trousers",
            "image": "everyday-knit-trousers",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "everyday-footwear",
        "products": [
          {
            "id": "leather-sneaker",
            "name": "Minimalist Leather Sneaker",
            "image": "everyday-leather-sneaker",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Width",
                "type": "select",
                "value": "",
                "options": [
                  "Narrow",
                  "Regular",
                  "Wide"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "suede-chukka",
            "name": "Suede Chukka Boot",
            "image": "everyday-suede-chukka",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "retro-runner",
            "name": "Retro Slim Runner",
            "image": "everyday-retro-runner",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "canvas-slip-on",
            "name": "Canvas Slip-On",
            "image": "everyday-canvas-slip-on",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "artisan-boot",
            "name": "Artisan Low Boot",
            "image": "everyday-artisan-boot",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "casual-chelsea",
            "name": "Casual Chelsea Boot",
            "image": "everyday-casual-chelsea",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "everyday-outerwear",
        "products": [
          {
            "id": "barn-coat",
            "name": "Barn Coat",
            "image": "everyday-barn-coat",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "harrington",
            "name": "Harrington Jacket",
            "image": "everyday-harrington",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "denim-trucker",
            "name": "Denim Trucker Jacket",
            "image": "everyday-denim-trucker",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Wash",
                "type": "select",
                "value": "",
                "options": [
                  "Vintage",
                  "Indigo",
                  "Washed",
                  "Raw"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "quilted-liner",
            "name": "Quilted Liner Jacket",
            "image": "everyday-quilted-liner",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sherpa-fleece",
            "name": "Sherpa-Lined Fleece",
            "image": "everyday-sherpa-fleece",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bomber",
            "name": "Bomber Jacket",
            "image": "everyday-bomber",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Nylon",
                  "Twill",
                  "Satin",
                  "Leather"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "everyday-accessories",
        "products": [
          {
            "id": "leather-watch",
            "name": "Leather Strap Watch",
            "image": "everyday-leather-watch",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "slim-wallet",
            "name": "Minimalist Slim Wallet",
            "image": "everyday-slim-wallet",
            "fields": [
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Metal",
                  "Carbon Fiber"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "wayfarer-shades",
            "name": "Classic Wayfarer Sunglasses",
            "image": "everyday-wayfarer-shades",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "beaded-bracelet",
            "name": "Beaded or Leather Bracelet",
            "image": "everyday-beaded-bracelet",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Beaded",
                  "Leather",
                  "Braided Cord",
                  "Lava Rock"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "canvas-weekender",
            "name": "Canvas Weekender Bag",
            "image": "everyday-canvas-weekender",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "casual-belt",
            "name": "Casual Leather Belt",
            "image": "everyday-casual-belt",
            "fields": [
              {
                "label": "Waist Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "everyday-underwear",
        "products": [
          {
            "id": "cotton-boxer-brief",
            "name": "Cotton-Stretch Boxer Brief",
            "image": "everyday-cotton-boxer-brief",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "micromodal-trunk",
            "name": "MicroModal Trunk",
            "image": "everyday-micromodal-trunk",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "woven-boxer",
            "name": "Woven Boxer Shorts",
            "image": "everyday-woven-boxer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "low-rise-brief",
            "name": "Low-Rise Brief",
            "image": "everyday-low-rise-brief",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "seamless-boxer-brief",
            "name": "Seamless Boxer Brief",
            "image": "everyday-seamless-boxer-brief",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bamboo-trunk",
            "name": "Bamboo Viscose Trunk",
            "image": "everyday-bamboo-trunk",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "dress-male",
    "label": "Dress",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "dress-tops",
        "products": [
          {
            "id": "ocbd",
            "name": "Oxford Button-Down (OCBD)",
            "image": "dress-ocbd",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Fit",
                "type": "select",
                "value": "",
                "options": [
                  "Slim",
                  "Regular",
                  "Relaxed"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "linen-shirt",
            "name": "Linen Shirt",
            "image": "dress-linen-shirt",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cuban-collar",
            "name": "Cuban Collar Shirt",
            "image": "dress-cuban-collar",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "poplin-dress-shirt",
            "name": "Poplin Dress Shirt",
            "image": "dress-poplin-dress-shirt",
            "fields": [
              {
                "label": "Neck Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sleeve Length",
                "type": "text",
                "value": ""
              },
              {
                "label": "Fit",
                "type": "select",
                "value": "",
                "options": [
                  "Slim",
                  "Regular",
                  "Relaxed"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "merino-sweater",
            "name": "Merino Wool Sweater",
            "image": "dress-merino-sweater",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Crewneck",
                  "V-Neck",
                  "Turtleneck"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "knitted-polo",
            "name": "Knitted Polo",
            "image": "dress-knitted-polo",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "dress-bottoms",
        "products": [
          {
            "id": "wool-trousers",
            "name": "Tailored Wool Trousers",
            "image": "dress-wool-trousers",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-chinos",
            "name": "Creased Smart Chinos",
            "image": "dress-smart-chinos",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "flannel-trousers",
            "name": "Flannel Trousers",
            "image": "dress-flannel-trousers",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pleated-pants",
            "name": "Pleated Dress Pants",
            "image": "dress-pleated-pants",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "linen-wool-trousers",
            "name": "Linen-Wool Blend Trousers",
            "image": "dress-linen-wool-trousers",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "velvet-trousers",
            "name": "Velvet Evening Trousers",
            "image": "dress-velvet-trousers",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "dress-footwear",
        "products": [
          {
            "id": "oxford-wingtip",
            "name": "Oxford Wingtip",
            "image": "dress-oxford-wingtip",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Width",
                "type": "select",
                "value": "",
                "options": [
                  "Narrow",
                  "Regular",
                  "Wide"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "penny-loafer",
            "name": "Penny Loafer",
            "image": "dress-penny-loafer",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Suede"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "plain-toe-derby",
            "name": "Plain-Toe Derby",
            "image": "dress-plain-toe-derby",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "monk-strap",
            "name": "Monk Strap Shoe",
            "image": "dress-monk-strap",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Single Monk",
                  "Double Monk"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hybrid-dress-sneaker",
            "name": "Hybrid Dress-Sneaker",
            "image": "dress-hybrid-dress-sneaker",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "polished-chelsea",
            "name": "Polished Chelsea Boot",
            "image": "dress-polished-chelsea",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "dress-outerwear",
        "products": [
          {
            "id": "wool-overcoat",
            "name": "Wool Overcoat",
            "image": "dress-wool-overcoat",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Color",
                "type": "select",
                "value": "",
                "options": [
                  "Camel",
                  "Charcoal",
                  "Navy",
                  "Black",
                  "Grey"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "trench-coat",
            "name": "Trench Coat",
            "image": "dress-trench-coat",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mac-coat",
            "name": "Mac Coat",
            "image": "dress-mac-coat",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "peacoat",
            "name": "Peacoat",
            "image": "dress-peacoat",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "chesterfield",
            "name": "Chesterfield Coat",
            "image": "dress-chesterfield",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "suede-racer",
            "name": "Suede Racer Jacket",
            "image": "dress-suede-racer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "dress-accessories",
        "products": [
          {
            "id": "dress-watch",
            "name": "Dress Watch",
            "image": "dress-watch",
            "fields": [
              {
                "label": "Strap",
                "type": "select",
                "value": "",
                "options": [
                  "Metal Link",
                  "Black Leather",
                  "Brown Leather"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "silk-tie",
            "name": "Silk or Knit Tie",
            "image": "dress-silk-tie",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Silk",
                  "Knit",
                  "Grenadine"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pocket-square",
            "name": "White Linen Pocket Square",
            "image": "dress-pocket-square",
            "fields": [
              {
                "label": "Fold Style",
                "type": "select",
                "value": "",
                "options": [
                  "Flat",
                  "Puff",
                  "One-Point",
                  "TV Fold"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cufflinks",
            "name": "Polished Cufflinks",
            "image": "dress-cufflinks",
            "fields": [
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Silver",
                  "Gold",
                  "Onyx",
                  "Rose Gold"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dress-belt",
            "name": "Slim Dress Belt",
            "image": "dress-belt",
            "fields": [
              {
                "label": "Waist Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tie-bar",
            "name": "Tie Bar",
            "image": "dress-tie-bar",
            "fields": [
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Silver",
                  "Gold",
                  "Matte Black"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "dress-underwear",
        "products": [
          {
            "id": "luxury-modal-brief",
            "name": "Luxury MicroModal Boxer Brief",
            "image": "dress-luxury-modal-brief",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "contour-trunk",
            "name": "Contour-Pouch Trunk",
            "image": "dress-contour-trunk",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "high-rise-brief",
            "name": "High-Rise Dress Brief",
            "image": "dress-high-rise-brief",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "silver-boxer-brief",
            "name": "Silver-Infused Boxer Brief",
            "image": "dress-silver-boxer-brief",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "air-mesh-brief",
            "name": "Ultra-Thin Air-Mesh Brief",
            "image": "dress-air-mesh-brief",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tapered-knit-boxer",
            "name": "Tapered Knit Boxer",
            "image": "dress-tapered-knit-boxer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "athletic-male",
    "label": "Athletic",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "athletic-tops",
        "products": [
          {
            "id": "performance-tee",
            "name": "Performance Tee",
            "image": "athletic-performance-tee",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pullover-hoodie",
            "name": "Pullover Hoodie",
            "image": "athletic-pullover-hoodie",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "crewneck-sweatshirt",
            "name": "Crewneck Sweatshirt",
            "image": "athletic-crewneck-sweatshirt",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "quarter-zip",
            "name": "Quarter-Zip Pullover",
            "image": "athletic-quarter-zip",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sleeveless-top",
            "name": "Sleeveless Training Top",
            "image": "athletic-sleeveless-top",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "compression-layer",
            "name": "Compression Base Layer",
            "image": "athletic-compression-layer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "athletic-bottoms",
        "products": [
          {
            "id": "performance-joggers",
            "name": "Performance Joggers",
            "image": "athletic-performance-joggers",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "running-shorts",
            "name": "7\" Running Shorts",
            "image": "athletic-running-shorts",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "track-pants",
            "name": "Tech-Fleece Track Pants",
            "image": "athletic-track-pants",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "training-pants",
            "name": "Stretch Woven Training Pants",
            "image": "athletic-training-pants",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fleece-shorts",
            "name": "Heavyweight Fleece Shorts",
            "image": "athletic-fleece-shorts",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hybrid-shorts",
            "name": "Hybrid Shorts",
            "image": "athletic-hybrid-shorts",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "athletic-footwear",
        "products": [
          {
            "id": "trail-runner",
            "name": "Technical Trail Runner",
            "image": "athletic-trail-runner",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Width",
                "type": "select",
                "value": "",
                "options": [
                  "Narrow",
                  "Regular",
                  "Wide"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "training-shoe",
            "name": "Performance Training Shoe",
            "image": "athletic-training-shoe",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tech-runner",
            "name": "Modern Tech-Runner",
            "image": "athletic-tech-runner",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "slip-in",
            "name": "Hands-Free Slip-In",
            "image": "athletic-slip-in",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tech-utility-boot",
            "name": "Tech-Utility Boot",
            "image": "athletic-tech-utility-boot",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "road-runner",
            "name": "High-Performance Road Runner",
            "image": "athletic-road-runner",
            "fields": [
              {
                "label": "US Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Arch Support",
                "type": "select",
                "value": "",
                "options": [
                  "Neutral",
                  "Stability",
                  "Motion Control"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "athletic-outerwear",
        "products": [
          {
            "id": "tech-shell",
            "name": "Technical Shell",
            "image": "athletic-tech-shell",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "down-puffer",
            "name": "Down Puffer Jacket",
            "image": "athletic-down-puffer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "softshell-windbreaker",
            "name": "Softshell Windbreaker",
            "image": "athletic-softshell-windbreaker",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "insulated-parka",
            "name": "Insulated Parka",
            "image": "athletic-insulated-parka",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "rain-anorak",
            "name": "Packable Rain Anorak",
            "image": "athletic-rain-anorak",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hybrid-trekking",
            "name": "Hybrid Trekking Jacket",
            "image": "athletic-hybrid-trekking",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                  "XXXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "athletic-accessories",
        "products": [
          {
            "id": "smartwatch",
            "name": "Smartwatch / Fitness Tracker",
            "image": "athletic-smartwatch",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "performance-cap",
            "name": "Performance Baseball Cap",
            "image": "athletic-performance-cap",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sport-sunglasses",
            "name": "Polarized Sport Sunglasses",
            "image": "athletic-sport-sunglasses",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gym-bag",
            "name": "Technical Gym Bag",
            "image": "athletic-gym-bag",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "water-bottle",
            "name": "Insulated Water Bottle",
            "image": "athletic-water-bottle",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "16oz",
                  "24oz",
                  "32oz",
                  "40oz"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sweatband",
            "name": "Smart Sweatband",
            "image": "athletic-sweatband",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "athletic-underwear",
        "products": [
          {
            "id": "compression-short",
            "name": "Performance Compression Short",
            "image": "athletic-compression-short",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hammock-boxer",
            "name": "Hammock-Pouch Boxer Brief",
            "image": "athletic-hammock-boxer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "long-leg-boxer",
            "name": "Long-Leg Tech Boxer Brief",
            "image": "athletic-long-leg-boxer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "merino-boxer",
            "name": "Active Merino Wool Boxer Brief",
            "image": "athletic-merino-boxer",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "jockstrap",
            "name": "Ventilated Mesh Jockstrap",
            "image": "athletic-jockstrap",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "microfiber-trunk",
            "name": "Quick-Dry Microfiber Trunk",
            "image": "athletic-microfiber-trunk",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "everyday-female",
    "label": "Everyday",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "style-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "style-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "style-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "style-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "style-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "style-underwear",
        "products": []
      }
    ]
  },
  {
    "key": "dress-female",
    "label": "Dress",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "style-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "style-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "style-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "style-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "style-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "style-underwear",
        "products": []
      }
    ]
  },
  {
    "key": "athletic-female",
    "label": "Athletic",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "style-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "style-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "style-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "style-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "style-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "style-underwear",
        "products": []
      }
    ]
  },
  {
    "key": "everyday-nb",
    "label": "Everyday",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "style-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "style-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "style-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "style-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "style-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "style-underwear",
        "products": []
      }
    ]
  },
  {
    "key": "dress-nb",
    "label": "Dress",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "style-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "style-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "style-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "style-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "style-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "style-underwear",
        "products": []
      }
    ]
  },
  {
    "key": "athletic-nb",
    "label": "Athletic",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "tops",
        "name": "Tops",
        "image": "style-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "style-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "style-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "style-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "style-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "style-underwear",
        "products": []
      }
    ]
  },
  {
    "key": "wishlist-male",
    "label": "Wishlist",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "wish-list",
        "products": [
          {
            "id": "amazon-list",
            "name": "Amazon List",
            "image": "wish-list",
            "fields": [
              {
                "label": "Amazon List URL",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "general-wishlist",
            "name": "General Wishlist",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item 1",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item 2",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item 3",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "splurge-items",
            "name": "Splurge Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Dream Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Price Range",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "practical-items",
            "name": "Practical Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Buy",
                "type": "text",
                "value": ""
              },
              {
                "label": "Price Range",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sentimental-items",
            "name": "Sentimental Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Why It Matters",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gift-cards",
            "name": "Gift Cards",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Stores",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Amount",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "subscriptions",
            "name": "Subscriptions",
            "image": "wish-list",
            "fields": [
              {
                "label": "Service",
                "type": "text",
                "value": ""
              },
              {
                "label": "Plan",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "experiences-male",
    "label": "Experiences",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "event-concerts",
        "products": [
          {
            "id": "concerts-shows",
            "name": "Concerts & Shows",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Artists",
                "type": "text",
                "value": ""
              },
              {
                "label": "Venue Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-events",
            "name": "Sports Events",
            "image": "event-sports",
            "fields": [
              {
                "label": "Favorite Teams",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Seat Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dining-out",
            "name": "Dining Out",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Restaurant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Cuisine",
                "type": "text",
                "value": ""
              },
              {
                "label": "Occasion",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "travel",
            "name": "Travel",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Dream Destination",
                "type": "text",
                "value": ""
              },
              {
                "label": "Travel Style",
                "type": "select",
                "value": "",
                "options": [
                  "Adventure",
                  "Relaxation",
                  "Cultural",
                  "Food-Focused"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "spa-wellness",
            "name": "Spa & Wellness",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Treatment",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "classes-workshops",
            "name": "Classes & Workshops",
            "image": "wish-list",
            "fields": [
              {
                "label": "Interested In",
                "type": "text",
                "value": ""
              },
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Intermediate",
                  "Advanced"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "adventure",
            "name": "Adventure Activities",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "tech-gadgets-male",
    "label": "Tech & Gadgets",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "specific-products",
        "products": [
          {
            "id": "phone-accessories",
            "name": "Phone Accessories",
            "image": "specific-products",
            "fields": [
              {
                "label": "Phone Model",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessory Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "headphones",
            "name": "Headphones",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Over-Ear",
                  "In-Ear",
                  "On-Ear",
                  "Earbuds"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Wireless or Wired",
                "type": "select",
                "value": "",
                "options": [
                  "Wireless",
                  "Wired",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-home",
            "name": "Smart Home",
            "image": "specific-products",
            "fields": [
              {
                "label": "Device Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "wearables",
            "name": "Wearables",
            "image": "jewelry-watches",
            "fields": [
              {
                "label": "Device",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gaming",
            "name": "Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation",
                  "Xbox",
                  "Nintendo",
                  "PC",
                  "Mobile"
                ]
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cameras",
            "name": "Cameras",
            "image": "specific-products",
            "fields": [
              {
                "label": "Camera Type",
                "type": "select",
                "value": "",
                "options": [
                  "DSLR",
                  "Mirrorless",
                  "Film",
                  "Action Cam",
                  "Drone"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "laptop-tablets",
            "name": "Laptop & Tablets",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Laptop",
                  "Tablet",
                  "Both"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Use Case",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "home-lifestyle-male",
    "label": "Home & Lifestyle",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "wish-list",
        "products": [
          {
            "id": "kitchen-items",
            "name": "Kitchen Items",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bar-entertaining",
            "name": "Bar & Entertaining",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "decor",
            "name": "Decor",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bedding-bath",
            "name": "Bedding & Bath",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "books",
            "name": "Books",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Reading",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "candles-scents",
            "name": "Candles & Scents",
            "image": "scent-candles",
            "fields": [
              {
                "label": "Favorite Scent",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "plants",
            "name": "Plants",
            "image": "flowers",
            "fields": [
              {
                "label": "Favorite Plant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Indoor or Outdoor",
                "type": "select",
                "value": "",
                "options": [
                  "Indoor",
                  "Outdoor",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "fashion-accessories-male",
    "label": "Fashion & Accessories",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "clothing-tops",
        "products": [
          {
            "id": "clothing",
            "name": "Clothing",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "shoes",
            "name": "Shoes",
            "image": "shoe-sneakers",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "jewelry",
            "name": "Jewelry",
            "image": "jewelry",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Gold",
                  "Silver",
                  "Rose Gold",
                  "Platinum"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bags-wallets",
            "name": "Bags & Wallets",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sunglasses",
            "name": "Sunglasses",
            "image": "accessory-sunglasses",
            "fields": [
              {
                "label": "Frame Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Lens Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hats",
            "name": "Hats",
            "image": "specific-products",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Baseball Cap",
                  "Beanie",
                  "Bucket Hat",
                  "Snapback",
                  "Dad Hat"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "watches",
            "name": "Watches",
            "image": "accessory-watches",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Dress",
                  "Sport",
                  "Smart",
                  "Casual"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Strap",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Metal",
                  "Rubber",
                  "NATO"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "sports-outdoors-male",
    "label": "Sports & Outdoors",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "event-sports",
        "products": [
          {
            "id": "gym-fitness",
            "name": "Gym & Fitness",
            "image": "clothing-activewear",
            "fields": [
              {
                "label": "Gym Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Workout Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Equipment Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "outdoor-gear",
            "name": "Outdoor Gear",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-gear",
            "name": "Sports Gear",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fan-gear",
            "name": "Fan Gear",
            "image": "event-sports",
            "fields": [
              {
                "label": "Team",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "golf",
            "name": "Golf",
            "image": "event-sports",
            "fields": [
              {
                "label": "Handicap",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Course",
                "type": "text",
                "value": ""
              },
              {
                "label": "Equipment Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cycling",
            "name": "Cycling",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Bike Type",
                "type": "select",
                "value": "",
                "options": [
                  "Road",
                  "Mountain",
                  "Hybrid",
                  "BMX",
                  "Electric"
                ]
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "water-sports",
            "name": "Water Sports",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "special-occasions-male",
    "label": "Special Occasions",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "occasions",
        "name": "Occasions",
        "image": "birthday-preferences",
        "products": [
          {
            "id": "birthday",
            "name": "Birthday",
            "image": "birthday-preferences",
            "fields": [
              {
                "label": "Birthday",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gift Style",
                "type": "select",
                "value": "",
                "options": [
                  "Experiences",
                  "Things",
                  "Both",
                  "Surprise Me"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "anniversary",
            "name": "Anniversary",
            "image": "anniversary-gifts",
            "fields": [
              {
                "label": "Anniversary Date",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "holidays",
            "name": "Holidays",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Holiday",
                "type": "text",
                "value": ""
              },
              {
                "label": "Traditions",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "valentines",
            "name": "Valentine's Day",
            "image": "anniversary-gifts",
            "fields": [
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "just-because",
            "name": "Just Because",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Surprise",
                "type": "text",
                "value": ""
              },
              {
                "label": "Love Language",
                "type": "select",
                "value": "",
                "options": [
                  "Words of Affirmation",
                  "Acts of Service",
                  "Receiving Gifts",
                  "Quality Time",
                  "Physical Touch"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "graduation",
            "name": "Graduation",
            "image": "wish-list",
            "fields": [
              {
                "label": "Program",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "housewarming",
            "name": "Housewarming",
            "image": "wish-list",
            "fields": [
              {
                "label": "New Place",
                "type": "text",
                "value": ""
              },
              {
                "label": "What They Need",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "donations-male",
    "label": "Donations & Causes",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "causes",
        "name": "Causes",
        "image": "wish-list",
        "products": [
          {
            "id": "favorite-charities",
            "name": "Favorite Charities",
            "image": "wish-list",
            "fields": [
              {
                "label": "Charity Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Website",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "causes",
            "name": "Causes I Care About",
            "image": "wish-list",
            "fields": [
              {
                "label": "Cause",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "preferred-orgs",
            "name": "Preferred Organizations",
            "image": "wish-list",
            "fields": [
              {
                "label": "Organization",
                "type": "text",
                "value": ""
              },
              {
                "label": "Website",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "local-causes",
            "name": "Local Causes",
            "image": "wish-list",
            "fields": [
              {
                "label": "Cause",
                "type": "text",
                "value": ""
              },
              {
                "label": "Organization",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "political",
            "name": "Political",
            "image": "wish-list",
            "fields": [
              {
                "label": "Party / Movement",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "religious",
            "name": "Religious",
            "image": "wish-list",
            "fields": [
              {
                "label": "Faith",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "wishlist-female",
    "label": "Wishlist",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "wish-list",
        "products": [
          {
            "id": "amazon-list",
            "name": "Amazon List",
            "image": "wish-list",
            "fields": [
              {
                "label": "Amazon List URL",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "general-wishlist",
            "name": "General Wishlist",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item 1",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item 2",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item 3",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "splurge-items",
            "name": "Splurge Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Dream Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Price Range",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "practical-items",
            "name": "Practical Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Buy",
                "type": "text",
                "value": ""
              },
              {
                "label": "Price Range",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sentimental-items",
            "name": "Sentimental Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Why It Matters",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gift-cards",
            "name": "Gift Cards",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Stores",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Amount",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "subscriptions",
            "name": "Subscriptions",
            "image": "wish-list",
            "fields": [
              {
                "label": "Service",
                "type": "text",
                "value": ""
              },
              {
                "label": "Plan",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "experiences-female",
    "label": "Experiences",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "event-concerts",
        "products": [
          {
            "id": "concerts-shows",
            "name": "Concerts & Shows",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Artists",
                "type": "text",
                "value": ""
              },
              {
                "label": "Venue Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-events",
            "name": "Sports Events",
            "image": "event-sports",
            "fields": [
              {
                "label": "Favorite Teams",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Seat Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dining-out",
            "name": "Dining Out",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Restaurant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Cuisine",
                "type": "text",
                "value": ""
              },
              {
                "label": "Occasion",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "travel",
            "name": "Travel",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Dream Destination",
                "type": "text",
                "value": ""
              },
              {
                "label": "Travel Style",
                "type": "select",
                "value": "",
                "options": [
                  "Adventure",
                  "Relaxation",
                  "Cultural",
                  "Food-Focused"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "spa-wellness",
            "name": "Spa & Wellness",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Treatment",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "classes-workshops",
            "name": "Classes & Workshops",
            "image": "wish-list",
            "fields": [
              {
                "label": "Interested In",
                "type": "text",
                "value": ""
              },
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Intermediate",
                  "Advanced"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "adventure",
            "name": "Adventure Activities",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "tech-gadgets-female",
    "label": "Tech & Gadgets",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "specific-products",
        "products": [
          {
            "id": "phone-accessories",
            "name": "Phone Accessories",
            "image": "specific-products",
            "fields": [
              {
                "label": "Phone Model",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessory Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "headphones",
            "name": "Headphones",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Over-Ear",
                  "In-Ear",
                  "On-Ear",
                  "Earbuds"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Wireless or Wired",
                "type": "select",
                "value": "",
                "options": [
                  "Wireless",
                  "Wired",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-home",
            "name": "Smart Home",
            "image": "specific-products",
            "fields": [
              {
                "label": "Device Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "wearables",
            "name": "Wearables",
            "image": "jewelry-watches",
            "fields": [
              {
                "label": "Device",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gaming",
            "name": "Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation",
                  "Xbox",
                  "Nintendo",
                  "PC",
                  "Mobile"
                ]
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cameras",
            "name": "Cameras",
            "image": "specific-products",
            "fields": [
              {
                "label": "Camera Type",
                "type": "select",
                "value": "",
                "options": [
                  "DSLR",
                  "Mirrorless",
                  "Film",
                  "Action Cam",
                  "Drone"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "laptop-tablets",
            "name": "Laptop & Tablets",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Laptop",
                  "Tablet",
                  "Both"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Use Case",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "home-lifestyle-female",
    "label": "Home & Lifestyle",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "wish-list",
        "products": [
          {
            "id": "kitchen-items",
            "name": "Kitchen Items",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bar-entertaining",
            "name": "Bar & Entertaining",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "decor",
            "name": "Decor",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bedding-bath",
            "name": "Bedding & Bath",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "books",
            "name": "Books",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Reading",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "candles-scents",
            "name": "Candles & Scents",
            "image": "scent-candles",
            "fields": [
              {
                "label": "Favorite Scent",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "plants",
            "name": "Plants",
            "image": "flowers",
            "fields": [
              {
                "label": "Favorite Plant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Indoor or Outdoor",
                "type": "select",
                "value": "",
                "options": [
                  "Indoor",
                  "Outdoor",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "fashion-accessories-female",
    "label": "Fashion & Accessories",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "clothing-tops",
        "products": [
          {
            "id": "clothing",
            "name": "Clothing",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "shoes",
            "name": "Shoes",
            "image": "shoe-sneakers",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "jewelry",
            "name": "Jewelry",
            "image": "jewelry",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Gold",
                  "Silver",
                  "Rose Gold",
                  "Platinum"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bags-wallets",
            "name": "Bags & Wallets",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sunglasses",
            "name": "Sunglasses",
            "image": "accessory-sunglasses",
            "fields": [
              {
                "label": "Frame Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Lens Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hats",
            "name": "Hats",
            "image": "specific-products",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Baseball Cap",
                  "Beanie",
                  "Bucket Hat",
                  "Snapback",
                  "Dad Hat"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "watches",
            "name": "Watches",
            "image": "accessory-watches",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Dress",
                  "Sport",
                  "Smart",
                  "Casual"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Strap",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Metal",
                  "Rubber",
                  "NATO"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "sports-outdoors-female",
    "label": "Sports & Outdoors",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "event-sports",
        "products": [
          {
            "id": "gym-fitness",
            "name": "Gym & Fitness",
            "image": "clothing-activewear",
            "fields": [
              {
                "label": "Gym Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Workout Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Equipment Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "outdoor-gear",
            "name": "Outdoor Gear",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-gear",
            "name": "Sports Gear",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fan-gear",
            "name": "Fan Gear",
            "image": "event-sports",
            "fields": [
              {
                "label": "Team",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "golf",
            "name": "Golf",
            "image": "event-sports",
            "fields": [
              {
                "label": "Handicap",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Course",
                "type": "text",
                "value": ""
              },
              {
                "label": "Equipment Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cycling",
            "name": "Cycling",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Bike Type",
                "type": "select",
                "value": "",
                "options": [
                  "Road",
                  "Mountain",
                  "Hybrid",
                  "BMX",
                  "Electric"
                ]
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "water-sports",
            "name": "Water Sports",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "special-occasions-female",
    "label": "Special Occasions",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "occasions",
        "name": "Occasions",
        "image": "birthday-preferences",
        "products": [
          {
            "id": "birthday",
            "name": "Birthday",
            "image": "birthday-preferences",
            "fields": [
              {
                "label": "Birthday",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gift Style",
                "type": "select",
                "value": "",
                "options": [
                  "Experiences",
                  "Things",
                  "Both",
                  "Surprise Me"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "anniversary",
            "name": "Anniversary",
            "image": "anniversary-gifts",
            "fields": [
              {
                "label": "Anniversary Date",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "holidays",
            "name": "Holidays",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Holiday",
                "type": "text",
                "value": ""
              },
              {
                "label": "Traditions",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "valentines",
            "name": "Valentine's Day",
            "image": "anniversary-gifts",
            "fields": [
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "just-because",
            "name": "Just Because",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Surprise",
                "type": "text",
                "value": ""
              },
              {
                "label": "Love Language",
                "type": "select",
                "value": "",
                "options": [
                  "Words of Affirmation",
                  "Acts of Service",
                  "Receiving Gifts",
                  "Quality Time",
                  "Physical Touch"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "graduation",
            "name": "Graduation",
            "image": "wish-list",
            "fields": [
              {
                "label": "Program",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "housewarming",
            "name": "Housewarming",
            "image": "wish-list",
            "fields": [
              {
                "label": "New Place",
                "type": "text",
                "value": ""
              },
              {
                "label": "What They Need",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "donations-female",
    "label": "Donations & Causes",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "causes",
        "name": "Causes",
        "image": "wish-list",
        "products": [
          {
            "id": "favorite-charities",
            "name": "Favorite Charities",
            "image": "wish-list",
            "fields": [
              {
                "label": "Charity Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Website",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "causes",
            "name": "Causes I Care About",
            "image": "wish-list",
            "fields": [
              {
                "label": "Cause",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "preferred-orgs",
            "name": "Preferred Organizations",
            "image": "wish-list",
            "fields": [
              {
                "label": "Organization",
                "type": "text",
                "value": ""
              },
              {
                "label": "Website",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "local-causes",
            "name": "Local Causes",
            "image": "wish-list",
            "fields": [
              {
                "label": "Cause",
                "type": "text",
                "value": ""
              },
              {
                "label": "Organization",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "political",
            "name": "Political",
            "image": "wish-list",
            "fields": [
              {
                "label": "Party / Movement",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "religious",
            "name": "Religious",
            "image": "wish-list",
            "fields": [
              {
                "label": "Faith",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "wishlist-nb",
    "label": "Wishlist",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "wish-list",
        "products": [
          {
            "id": "amazon-list",
            "name": "Amazon List",
            "image": "wish-list",
            "fields": [
              {
                "label": "Amazon List URL",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "general-wishlist",
            "name": "General Wishlist",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item 1",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item 2",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item 3",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "splurge-items",
            "name": "Splurge Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Dream Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Price Range",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "practical-items",
            "name": "Practical Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Where to Buy",
                "type": "text",
                "value": ""
              },
              {
                "label": "Price Range",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sentimental-items",
            "name": "Sentimental Items",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Why It Matters",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gift-cards",
            "name": "Gift Cards",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Stores",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Amount",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "subscriptions",
            "name": "Subscriptions",
            "image": "wish-list",
            "fields": [
              {
                "label": "Service",
                "type": "text",
                "value": ""
              },
              {
                "label": "Plan",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "experiences-nb",
    "label": "Experiences",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "event-concerts",
        "products": [
          {
            "id": "concerts-shows",
            "name": "Concerts & Shows",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Artists",
                "type": "text",
                "value": ""
              },
              {
                "label": "Venue Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-events",
            "name": "Sports Events",
            "image": "event-sports",
            "fields": [
              {
                "label": "Favorite Teams",
                "type": "text",
                "value": ""
              },
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Seat Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dining-out",
            "name": "Dining Out",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Restaurant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Cuisine",
                "type": "text",
                "value": ""
              },
              {
                "label": "Occasion",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "travel",
            "name": "Travel",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Dream Destination",
                "type": "text",
                "value": ""
              },
              {
                "label": "Travel Style",
                "type": "select",
                "value": "",
                "options": [
                  "Adventure",
                  "Relaxation",
                  "Cultural",
                  "Food-Focused"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "spa-wellness",
            "name": "Spa & Wellness",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Treatment",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "classes-workshops",
            "name": "Classes & Workshops",
            "image": "wish-list",
            "fields": [
              {
                "label": "Interested In",
                "type": "text",
                "value": ""
              },
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Intermediate",
                  "Advanced"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "adventure",
            "name": "Adventure Activities",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "tech-gadgets-nb",
    "label": "Tech & Gadgets",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "specific-products",
        "products": [
          {
            "id": "phone-accessories",
            "name": "Phone Accessories",
            "image": "specific-products",
            "fields": [
              {
                "label": "Phone Model",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessory Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "headphones",
            "name": "Headphones",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Over-Ear",
                  "In-Ear",
                  "On-Ear",
                  "Earbuds"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Wireless or Wired",
                "type": "select",
                "value": "",
                "options": [
                  "Wireless",
                  "Wired",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-home",
            "name": "Smart Home",
            "image": "specific-products",
            "fields": [
              {
                "label": "Device Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "wearables",
            "name": "Wearables",
            "image": "jewelry-watches",
            "fields": [
              {
                "label": "Device",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gaming",
            "name": "Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation",
                  "Xbox",
                  "Nintendo",
                  "PC",
                  "Mobile"
                ]
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cameras",
            "name": "Cameras",
            "image": "specific-products",
            "fields": [
              {
                "label": "Camera Type",
                "type": "select",
                "value": "",
                "options": [
                  "DSLR",
                  "Mirrorless",
                  "Film",
                  "Action Cam",
                  "Drone"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "laptop-tablets",
            "name": "Laptop & Tablets",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Laptop",
                  "Tablet",
                  "Both"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Use Case",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "home-lifestyle-nb",
    "label": "Home & Lifestyle",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "wish-list",
        "products": [
          {
            "id": "kitchen-items",
            "name": "Kitchen Items",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bar-entertaining",
            "name": "Bar & Entertaining",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "decor",
            "name": "Decor",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bedding-bath",
            "name": "Bedding & Bath",
            "image": "wish-list",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "books",
            "name": "Books",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Reading",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "candles-scents",
            "name": "Candles & Scents",
            "image": "scent-candles",
            "fields": [
              {
                "label": "Favorite Scent",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "plants",
            "name": "Plants",
            "image": "flowers",
            "fields": [
              {
                "label": "Favorite Plant",
                "type": "text",
                "value": ""
              },
              {
                "label": "Indoor or Outdoor",
                "type": "select",
                "value": "",
                "options": [
                  "Indoor",
                  "Outdoor",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "fashion-accessories-nb",
    "label": "Fashion & Accessories",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "clothing-tops",
        "products": [
          {
            "id": "clothing",
            "name": "Clothing",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "shoes",
            "name": "Shoes",
            "image": "shoe-sneakers",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "jewelry",
            "name": "Jewelry",
            "image": "jewelry",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Gold",
                  "Silver",
                  "Rose Gold",
                  "Platinum"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bags-wallets",
            "name": "Bags & Wallets",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sunglasses",
            "name": "Sunglasses",
            "image": "accessory-sunglasses",
            "fields": [
              {
                "label": "Frame Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Lens Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hats",
            "name": "Hats",
            "image": "specific-products",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Baseball Cap",
                  "Beanie",
                  "Bucket Hat",
                  "Snapback",
                  "Dad Hat"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "watches",
            "name": "Watches",
            "image": "accessory-watches",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Dress",
                  "Sport",
                  "Smart",
                  "Casual"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Strap",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Metal",
                  "Rubber",
                  "NATO"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "sports-outdoors-nb",
    "label": "Sports & Outdoors",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "categories",
        "name": "Categories",
        "image": "event-sports",
        "products": [
          {
            "id": "gym-fitness",
            "name": "Gym & Fitness",
            "image": "clothing-activewear",
            "fields": [
              {
                "label": "Gym Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Workout Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Equipment Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "outdoor-gear",
            "name": "Outdoor Gear",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-gear",
            "name": "Sports Gear",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fan-gear",
            "name": "Fan Gear",
            "image": "event-sports",
            "fields": [
              {
                "label": "Team",
                "type": "text",
                "value": ""
              },
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "golf",
            "name": "Golf",
            "image": "event-sports",
            "fields": [
              {
                "label": "Handicap",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Course",
                "type": "text",
                "value": ""
              },
              {
                "label": "Equipment Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cycling",
            "name": "Cycling",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Bike Type",
                "type": "select",
                "value": "",
                "options": [
                  "Road",
                  "Mountain",
                  "Hybrid",
                  "BMX",
                  "Electric"
                ]
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "water-sports",
            "name": "Water Sports",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gear Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "special-occasions-nb",
    "label": "Special Occasions",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "occasions",
        "name": "Occasions",
        "image": "birthday-preferences",
        "products": [
          {
            "id": "birthday",
            "name": "Birthday",
            "image": "birthday-preferences",
            "fields": [
              {
                "label": "Birthday",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gift Style",
                "type": "select",
                "value": "",
                "options": [
                  "Experiences",
                  "Things",
                  "Both",
                  "Surprise Me"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "anniversary",
            "name": "Anniversary",
            "image": "anniversary-gifts",
            "fields": [
              {
                "label": "Anniversary Date",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "holidays",
            "name": "Holidays",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Holiday",
                "type": "text",
                "value": ""
              },
              {
                "label": "Traditions",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "valentines",
            "name": "Valentine's Day",
            "image": "anniversary-gifts",
            "fields": [
              {
                "label": "Favorite Way to Celebrate",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "just-because",
            "name": "Just Because",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Surprise",
                "type": "text",
                "value": ""
              },
              {
                "label": "Love Language",
                "type": "select",
                "value": "",
                "options": [
                  "Words of Affirmation",
                  "Acts of Service",
                  "Receiving Gifts",
                  "Quality Time",
                  "Physical Touch"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "graduation",
            "name": "Graduation",
            "image": "wish-list",
            "fields": [
              {
                "label": "Program",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "housewarming",
            "name": "Housewarming",
            "image": "wish-list",
            "fields": [
              {
                "label": "New Place",
                "type": "text",
                "value": ""
              },
              {
                "label": "What They Need",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "donations-nb",
    "label": "Donations & Causes",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "causes",
        "name": "Causes",
        "image": "wish-list",
        "products": [
          {
            "id": "favorite-charities",
            "name": "Favorite Charities",
            "image": "wish-list",
            "fields": [
              {
                "label": "Charity Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Website",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "causes",
            "name": "Causes I Care About",
            "image": "wish-list",
            "fields": [
              {
                "label": "Cause",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "preferred-orgs",
            "name": "Preferred Organizations",
            "image": "wish-list",
            "fields": [
              {
                "label": "Organization",
                "type": "text",
                "value": ""
              },
              {
                "label": "Website",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "local-causes",
            "name": "Local Causes",
            "image": "wish-list",
            "fields": [
              {
                "label": "Cause",
                "type": "text",
                "value": ""
              },
              {
                "label": "Organization",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "political",
            "name": "Political",
            "image": "wish-list",
            "fields": [
              {
                "label": "Party / Movement",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "religious",
            "name": "Religious",
            "image": "wish-list",
            "fields": [
              {
                "label": "Faith",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "furniture-male",
    "label": "Furniture",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "pieces",
        "name": "Pieces",
        "image": "wish-list",
        "products": [
          {
            "id": "sofa",
            "name": "Sofa",
            "image": "home-sofa",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bed-frame",
            "name": "Bed Frame",
            "image": "home-bedding",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dining-table",
            "name": "Dining Table",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "desk",
            "name": "Desk",
            "image": "home-desk",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bookshelf",
            "name": "Bookshelf",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "coffee-table",
            "name": "Coffee Table",
            "image": "wish-list",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "accent-chair",
            "name": "Accent Chair",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dresser",
            "name": "Dresser",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "kitchen-cooking-male",
    "label": "Kitchen & Cooking",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "grocery-specifics",
        "products": [
          {
            "id": "cookware",
            "name": "Cookware",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cast Iron",
                  "Stainless Steel",
                  "Non-Stick",
                  "Carbon Steel"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "knives",
            "name": "Knives",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Handle Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "small-appliances",
            "name": "Small Appliances",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Appliance",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "coffee-maker",
            "name": "Coffee Maker",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Drip",
                  "Espresso",
                  "French Press",
                  "Pour Over",
                  "Pod"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "stand-mixer",
            "name": "Stand Mixer",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cutting-boards",
            "name": "Cutting Boards",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Wood",
                  "Bamboo",
                  "Plastic",
                  "Marble"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "storage-organization",
            "name": "Storage & Organization",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bakeware",
            "name": "Bakeware",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "electronics-entertainment-male",
    "label": "Electronics & Entertainment",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "devices",
        "name": "Devices",
        "image": "specific-products",
        "products": [
          {
            "id": "tv",
            "name": "TV",
            "image": "specific-products",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "OLED",
                  "QLED",
                  "LED",
                  "4K",
                  "8K"
                ]
              },
              {
                "label": "Mount or Stand",
                "type": "select",
                "value": "",
                "options": [
                  "Wall Mount",
                  "Stand"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sound-system",
            "name": "Sound System",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Soundbar",
                  "Surround Sound",
                  "Bookshelf Speakers",
                  "Subwoofer"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gaming-setup",
            "name": "Gaming Setup",
            "image": "specific-products",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation",
                  "Xbox",
                  "Nintendo",
                  "PC"
                ]
              },
              {
                "label": "Accessories",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-home-hub",
            "name": "Smart Home Hub",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "select",
                "value": "",
                "options": [
                  "Alexa",
                  "Google Home",
                  "Apple HomeKit",
                  "SmartThings"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "projector",
            "name": "Projector",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Home Theater",
                  "Portable",
                  "Short Throw"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "streaming-devices",
            "name": "Streaming Devices",
            "image": "specific-products",
            "fields": [
              {
                "label": "Device",
                "type": "select",
                "value": "",
                "options": [
                  "Apple TV",
                  "Roku",
                  "Fire Stick",
                  "Chromecast"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "turntable",
            "name": "Turntable",
            "image": "specific-products",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Budget",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "bedroom-male",
    "label": "Bedroom",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "wish-list",
        "products": [
          {
            "id": "bedding",
            "name": "Bedding",
            "image": "home-bedding",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Linen",
                  "Bamboo",
                  "Silk",
                  "Microfiber"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pillows",
            "name": "Pillows",
            "image": "home-pillows",
            "fields": [
              {
                "label": "Fill",
                "type": "select",
                "value": "",
                "options": [
                  "Down",
                  "Memory Foam",
                  "Latex",
                  "Synthetic"
                ]
              },
              {
                "label": "Firmness",
                "type": "select",
                "value": "",
                "options": [
                  "Soft",
                  "Medium",
                  "Firm"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mattress",
            "name": "Mattress",
            "image": "home-mattress",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Memory Foam",
                  "Innerspring",
                  "Hybrid",
                  "Latex"
                ]
              },
              {
                "label": "Firmness",
                "type": "select",
                "value": "",
                "options": [
                  "Soft",
                  "Medium-Soft",
                  "Medium",
                  "Medium-Firm",
                  "Firm"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "nightstand",
            "name": "Nightstand",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lighting",
            "name": "Lighting",
            "image": "home-lighting",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Lamp",
                  "Overhead",
                  "LED Strip",
                  "Smart Bulbs"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "blackout-curtains",
            "name": "Blackout Curtains",
            "image": "home-curtains",
            "fields": [
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "white-noise-machine",
            "name": "White Noise Machine",
            "image": "specific-products",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "bathroom-male",
    "label": "Bathroom",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "home-bathroom",
        "products": [
          {
            "id": "towels",
            "name": "Towels",
            "image": "home-towels",
            "fields": [
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Turkish Cotton",
                  "Bamboo",
                  "Microfiber"
                ]
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bath-mat",
            "name": "Bath Mat",
            "image": "wish-list",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "shower-curtain",
            "name": "Shower Curtain",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vanity-accessories",
            "name": "Vanity Accessories",
            "image": "grooming",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mirror",
            "name": "Mirror",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "skincare-storage",
            "name": "Skincare Storage",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "robe",
            "name": "Robe",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Turkish Cotton",
                  "Bamboo",
                  "Waffle Knit",
                  "Silk"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "garage-tools-male",
    "label": "Garage & Tools",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "specific-products",
        "products": [
          {
            "id": "power-tools",
            "name": "Power Tools",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Cordless or Corded",
                "type": "select",
                "value": "",
                "options": [
                  "Cordless",
                  "Corded",
                  "Either"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hand-tools",
            "name": "Hand Tools",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tool-storage",
            "name": "Tool Storage",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Toolbox",
                  "Cabinet",
                  "Wall Mount",
                  "Rolling Cart"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "workbench",
            "name": "Workbench",
            "image": "specific-products",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "car-care",
            "name": "Car Care",
            "image": "specific-products",
            "fields": [
              {
                "label": "Product",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lawn-garden",
            "name": "Lawn & Garden",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gas or Electric",
                "type": "select",
                "value": "",
                "options": [
                  "Gas",
                  "Electric",
                  "Battery"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "safety-gear",
            "name": "Safety Gear",
            "image": "specific-products",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "outdoor-patio-male",
    "label": "Outdoor & Patio",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "home-patio",
        "products": [
          {
            "id": "patio-furniture",
            "name": "Patio Furniture",
            "image": "home-patio",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Wicker",
                  "Aluminum",
                  "Teak",
                  "Steel"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "grill",
            "name": "Grill",
            "image": "food-chicken",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Gas",
                  "Charcoal",
                  "Pellet",
                  "Electric",
                  "Kamado"
                ]
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "BTUs",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "string-lights",
            "name": "String Lights",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "planters",
            "name": "Planters",
            "image": "flowers",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "outdoor-rug",
            "name": "Outdoor Rug",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fire-pit",
            "name": "Fire Pit",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Wood Burning",
                  "Gas",
                  "Propane"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hammock",
            "name": "Hammock",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Rope",
                  "Fabric",
                  "Camping"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "organization-male",
    "label": "Organization",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "areas",
        "name": "Areas",
        "image": "wish-list",
        "products": [
          {
            "id": "closet",
            "name": "Closet",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "kitchen-drawers",
            "name": "Kitchen Drawers",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bathroom-org",
            "name": "Bathroom",
            "image": "grooming",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "entryway",
            "name": "Entryway",
            "image": "wish-list",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "home-office",
            "name": "Home Office",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "garage-org",
            "name": "Garage",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "laundry",
            "name": "Laundry",
            "image": "wish-list",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "furniture-female",
    "label": "Furniture",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "pieces",
        "name": "Pieces",
        "image": "wish-list",
        "products": [
          {
            "id": "sofa",
            "name": "Sofa",
            "image": "home-sofa",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bed-frame",
            "name": "Bed Frame",
            "image": "home-bedding",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dining-table",
            "name": "Dining Table",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "desk",
            "name": "Desk",
            "image": "home-desk",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bookshelf",
            "name": "Bookshelf",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "coffee-table",
            "name": "Coffee Table",
            "image": "wish-list",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "accent-chair",
            "name": "Accent Chair",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dresser",
            "name": "Dresser",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "kitchen-cooking-female",
    "label": "Kitchen & Cooking",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "grocery-specifics",
        "products": [
          {
            "id": "cookware",
            "name": "Cookware",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cast Iron",
                  "Stainless Steel",
                  "Non-Stick",
                  "Carbon Steel"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "knives",
            "name": "Knives",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Handle Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "small-appliances",
            "name": "Small Appliances",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Appliance",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "coffee-maker",
            "name": "Coffee Maker",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Drip",
                  "Espresso",
                  "French Press",
                  "Pour Over",
                  "Pod"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "stand-mixer",
            "name": "Stand Mixer",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cutting-boards",
            "name": "Cutting Boards",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Wood",
                  "Bamboo",
                  "Plastic",
                  "Marble"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "storage-organization",
            "name": "Storage & Organization",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bakeware",
            "name": "Bakeware",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "electronics-entertainment-female",
    "label": "Electronics & Entertainment",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "devices",
        "name": "Devices",
        "image": "specific-products",
        "products": [
          {
            "id": "tv",
            "name": "TV",
            "image": "specific-products",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "OLED",
                  "QLED",
                  "LED",
                  "4K",
                  "8K"
                ]
              },
              {
                "label": "Mount or Stand",
                "type": "select",
                "value": "",
                "options": [
                  "Wall Mount",
                  "Stand"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sound-system",
            "name": "Sound System",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Soundbar",
                  "Surround Sound",
                  "Bookshelf Speakers",
                  "Subwoofer"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gaming-setup",
            "name": "Gaming Setup",
            "image": "specific-products",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation",
                  "Xbox",
                  "Nintendo",
                  "PC"
                ]
              },
              {
                "label": "Accessories",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-home-hub",
            "name": "Smart Home Hub",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "select",
                "value": "",
                "options": [
                  "Alexa",
                  "Google Home",
                  "Apple HomeKit",
                  "SmartThings"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "projector",
            "name": "Projector",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Home Theater",
                  "Portable",
                  "Short Throw"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "streaming-devices",
            "name": "Streaming Devices",
            "image": "specific-products",
            "fields": [
              {
                "label": "Device",
                "type": "select",
                "value": "",
                "options": [
                  "Apple TV",
                  "Roku",
                  "Fire Stick",
                  "Chromecast"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "turntable",
            "name": "Turntable",
            "image": "specific-products",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Budget",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "bedroom-female",
    "label": "Bedroom",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "wish-list",
        "products": [
          {
            "id": "bedding",
            "name": "Bedding",
            "image": "home-bedding",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Linen",
                  "Bamboo",
                  "Silk",
                  "Microfiber"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pillows",
            "name": "Pillows",
            "image": "home-pillows",
            "fields": [
              {
                "label": "Fill",
                "type": "select",
                "value": "",
                "options": [
                  "Down",
                  "Memory Foam",
                  "Latex",
                  "Synthetic"
                ]
              },
              {
                "label": "Firmness",
                "type": "select",
                "value": "",
                "options": [
                  "Soft",
                  "Medium",
                  "Firm"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mattress",
            "name": "Mattress",
            "image": "home-mattress",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Memory Foam",
                  "Innerspring",
                  "Hybrid",
                  "Latex"
                ]
              },
              {
                "label": "Firmness",
                "type": "select",
                "value": "",
                "options": [
                  "Soft",
                  "Medium-Soft",
                  "Medium",
                  "Medium-Firm",
                  "Firm"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "nightstand",
            "name": "Nightstand",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lighting",
            "name": "Lighting",
            "image": "home-lighting",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Lamp",
                  "Overhead",
                  "LED Strip",
                  "Smart Bulbs"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "blackout-curtains",
            "name": "Blackout Curtains",
            "image": "home-curtains",
            "fields": [
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "white-noise-machine",
            "name": "White Noise Machine",
            "image": "specific-products",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "bathroom-female",
    "label": "Bathroom",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "home-bathroom",
        "products": [
          {
            "id": "towels",
            "name": "Towels",
            "image": "home-towels",
            "fields": [
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Turkish Cotton",
                  "Bamboo",
                  "Microfiber"
                ]
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bath-mat",
            "name": "Bath Mat",
            "image": "wish-list",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "shower-curtain",
            "name": "Shower Curtain",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vanity-accessories",
            "name": "Vanity Accessories",
            "image": "grooming",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mirror",
            "name": "Mirror",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "skincare-storage",
            "name": "Skincare Storage",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "robe",
            "name": "Robe",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Turkish Cotton",
                  "Bamboo",
                  "Waffle Knit",
                  "Silk"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "garage-tools-female",
    "label": "Garage & Tools",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "specific-products",
        "products": [
          {
            "id": "power-tools",
            "name": "Power Tools",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Cordless or Corded",
                "type": "select",
                "value": "",
                "options": [
                  "Cordless",
                  "Corded",
                  "Either"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hand-tools",
            "name": "Hand Tools",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tool-storage",
            "name": "Tool Storage",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Toolbox",
                  "Cabinet",
                  "Wall Mount",
                  "Rolling Cart"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "workbench",
            "name": "Workbench",
            "image": "specific-products",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "car-care",
            "name": "Car Care",
            "image": "specific-products",
            "fields": [
              {
                "label": "Product",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lawn-garden",
            "name": "Lawn & Garden",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gas or Electric",
                "type": "select",
                "value": "",
                "options": [
                  "Gas",
                  "Electric",
                  "Battery"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "safety-gear",
            "name": "Safety Gear",
            "image": "specific-products",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "outdoor-patio-female",
    "label": "Outdoor & Patio",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "home-patio",
        "products": [
          {
            "id": "patio-furniture",
            "name": "Patio Furniture",
            "image": "home-patio",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Wicker",
                  "Aluminum",
                  "Teak",
                  "Steel"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "grill",
            "name": "Grill",
            "image": "food-chicken",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Gas",
                  "Charcoal",
                  "Pellet",
                  "Electric",
                  "Kamado"
                ]
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "BTUs",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "string-lights",
            "name": "String Lights",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "planters",
            "name": "Planters",
            "image": "flowers",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "outdoor-rug",
            "name": "Outdoor Rug",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fire-pit",
            "name": "Fire Pit",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Wood Burning",
                  "Gas",
                  "Propane"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hammock",
            "name": "Hammock",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Rope",
                  "Fabric",
                  "Camping"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "organization-female",
    "label": "Organization",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "areas",
        "name": "Areas",
        "image": "wish-list",
        "products": [
          {
            "id": "closet",
            "name": "Closet",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "kitchen-drawers",
            "name": "Kitchen Drawers",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bathroom-org",
            "name": "Bathroom",
            "image": "grooming",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "entryway",
            "name": "Entryway",
            "image": "wish-list",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "home-office",
            "name": "Home Office",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "garage-org",
            "name": "Garage",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "laundry",
            "name": "Laundry",
            "image": "wish-list",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "furniture-nb",
    "label": "Furniture",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "pieces",
        "name": "Pieces",
        "image": "wish-list",
        "products": [
          {
            "id": "sofa",
            "name": "Sofa",
            "image": "home-sofa",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bed-frame",
            "name": "Bed Frame",
            "image": "home-bedding",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dining-table",
            "name": "Dining Table",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "desk",
            "name": "Desk",
            "image": "home-desk",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bookshelf",
            "name": "Bookshelf",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "coffee-table",
            "name": "Coffee Table",
            "image": "wish-list",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "accent-chair",
            "name": "Accent Chair",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dresser",
            "name": "Dresser",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "kitchen-cooking-nb",
    "label": "Kitchen & Cooking",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "grocery-specifics",
        "products": [
          {
            "id": "cookware",
            "name": "Cookware",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cast Iron",
                  "Stainless Steel",
                  "Non-Stick",
                  "Carbon Steel"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "knives",
            "name": "Knives",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Handle Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "small-appliances",
            "name": "Small Appliances",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Appliance",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "coffee-maker",
            "name": "Coffee Maker",
            "image": "coffee-hot",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Drip",
                  "Espresso",
                  "French Press",
                  "Pour Over",
                  "Pod"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "stand-mixer",
            "name": "Stand Mixer",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cutting-boards",
            "name": "Cutting Boards",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Wood",
                  "Bamboo",
                  "Plastic",
                  "Marble"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "storage-organization",
            "name": "Storage & Organization",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bakeware",
            "name": "Bakeware",
            "image": "grocery-specifics",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "electronics-entertainment-nb",
    "label": "Electronics & Entertainment",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "devices",
        "name": "Devices",
        "image": "specific-products",
        "products": [
          {
            "id": "tv",
            "name": "TV",
            "image": "specific-products",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "OLED",
                  "QLED",
                  "LED",
                  "4K",
                  "8K"
                ]
              },
              {
                "label": "Mount or Stand",
                "type": "select",
                "value": "",
                "options": [
                  "Wall Mount",
                  "Stand"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sound-system",
            "name": "Sound System",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Soundbar",
                  "Surround Sound",
                  "Bookshelf Speakers",
                  "Subwoofer"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "gaming-setup",
            "name": "Gaming Setup",
            "image": "specific-products",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation",
                  "Xbox",
                  "Nintendo",
                  "PC"
                ]
              },
              {
                "label": "Accessories",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-home-hub",
            "name": "Smart Home Hub",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "select",
                "value": "",
                "options": [
                  "Alexa",
                  "Google Home",
                  "Apple HomeKit",
                  "SmartThings"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "projector",
            "name": "Projector",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Home Theater",
                  "Portable",
                  "Short Throw"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "streaming-devices",
            "name": "Streaming Devices",
            "image": "specific-products",
            "fields": [
              {
                "label": "Device",
                "type": "select",
                "value": "",
                "options": [
                  "Apple TV",
                  "Roku",
                  "Fire Stick",
                  "Chromecast"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "turntable",
            "name": "Turntable",
            "image": "specific-products",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Budget",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "bedroom-nb",
    "label": "Bedroom",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "wish-list",
        "products": [
          {
            "id": "bedding",
            "name": "Bedding",
            "image": "home-bedding",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Linen",
                  "Bamboo",
                  "Silk",
                  "Microfiber"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pillows",
            "name": "Pillows",
            "image": "home-pillows",
            "fields": [
              {
                "label": "Fill",
                "type": "select",
                "value": "",
                "options": [
                  "Down",
                  "Memory Foam",
                  "Latex",
                  "Synthetic"
                ]
              },
              {
                "label": "Firmness",
                "type": "select",
                "value": "",
                "options": [
                  "Soft",
                  "Medium",
                  "Firm"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mattress",
            "name": "Mattress",
            "image": "home-mattress",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Twin",
                  "Full",
                  "Queen",
                  "King",
                  "Cal King"
                ]
              },
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Memory Foam",
                  "Innerspring",
                  "Hybrid",
                  "Latex"
                ]
              },
              {
                "label": "Firmness",
                "type": "select",
                "value": "",
                "options": [
                  "Soft",
                  "Medium-Soft",
                  "Medium",
                  "Medium-Firm",
                  "Firm"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "nightstand",
            "name": "Nightstand",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lighting",
            "name": "Lighting",
            "image": "home-lighting",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Lamp",
                  "Overhead",
                  "LED Strip",
                  "Smart Bulbs"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "blackout-curtains",
            "name": "Blackout Curtains",
            "image": "home-curtains",
            "fields": [
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "white-noise-machine",
            "name": "White Noise Machine",
            "image": "specific-products",
            "fields": [
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "bathroom-nb",
    "label": "Bathroom",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "home-bathroom",
        "products": [
          {
            "id": "towels",
            "name": "Towels",
            "image": "home-towels",
            "fields": [
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Turkish Cotton",
                  "Bamboo",
                  "Microfiber"
                ]
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bath-mat",
            "name": "Bath Mat",
            "image": "wish-list",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Color",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "shower-curtain",
            "name": "Shower Curtain",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vanity-accessories",
            "name": "Vanity Accessories",
            "image": "grooming",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mirror",
            "name": "Mirror",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "skincare-storage",
            "name": "Skincare Storage",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "robe",
            "name": "Robe",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Turkish Cotton",
                  "Bamboo",
                  "Waffle Knit",
                  "Silk"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "garage-tools-nb",
    "label": "Garage & Tools",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "specific-products",
        "products": [
          {
            "id": "power-tools",
            "name": "Power Tools",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Cordless or Corded",
                "type": "select",
                "value": "",
                "options": [
                  "Cordless",
                  "Corded",
                  "Either"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hand-tools",
            "name": "Hand Tools",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tool-storage",
            "name": "Tool Storage",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Toolbox",
                  "Cabinet",
                  "Wall Mount",
                  "Rolling Cart"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "workbench",
            "name": "Workbench",
            "image": "specific-products",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "car-care",
            "name": "Car Care",
            "image": "specific-products",
            "fields": [
              {
                "label": "Product",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "lawn-garden",
            "name": "Lawn & Garden",
            "image": "specific-products",
            "fields": [
              {
                "label": "Tool",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gas or Electric",
                "type": "select",
                "value": "",
                "options": [
                  "Gas",
                  "Electric",
                  "Battery"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "safety-gear",
            "name": "Safety Gear",
            "image": "specific-products",
            "fields": [
              {
                "label": "Item",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "outdoor-patio-nb",
    "label": "Outdoor & Patio",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "items",
        "name": "Items",
        "image": "home-patio",
        "products": [
          {
            "id": "patio-furniture",
            "name": "Patio Furniture",
            "image": "home-patio",
            "fields": [
              {
                "label": "Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Wicker",
                  "Aluminum",
                  "Teak",
                  "Steel"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "grill",
            "name": "Grill",
            "image": "food-chicken",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Gas",
                  "Charcoal",
                  "Pellet",
                  "Electric",
                  "Kamado"
                ]
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "BTUs",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "string-lights",
            "name": "String Lights",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "planters",
            "name": "Planters",
            "image": "flowers",
            "fields": [
              {
                "label": "Material",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "outdoor-rug",
            "name": "Outdoor Rug",
            "image": "wish-list",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fire-pit",
            "name": "Fire Pit",
            "image": "specific-products",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Wood Burning",
                  "Gas",
                  "Propane"
                ]
              },
              {
                "label": "Preferred Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hammock",
            "name": "Hammock",
            "image": "wish-list",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Rope",
                  "Fabric",
                  "Camping"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "organization-nb",
    "label": "Organization",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "areas",
        "name": "Areas",
        "image": "wish-list",
        "products": [
          {
            "id": "closet",
            "name": "Closet",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "kitchen-drawers",
            "name": "Kitchen Drawers",
            "image": "grocery-pantry",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bathroom-org",
            "name": "Bathroom",
            "image": "grooming",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "entryway",
            "name": "Entryway",
            "image": "wish-list",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "home-office",
            "name": "Home Office",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "garage-org",
            "name": "Garage",
            "image": "specific-products",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "laundry",
            "name": "Laundry",
            "image": "wish-list",
            "fields": [
              {
                "label": "System",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "movies-tv-male",
    "label": "Movies & TV",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "genres",
        "name": "Genres",
        "image": "event-concerts",
        "products": [
          {
            "id": "action",
            "name": "Action",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comedy",
            "name": "Comedy",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "drama",
            "name": "Drama",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "horror",
            "name": "Horror",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sci-fi",
            "name": "Sci-Fi",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "documentary",
            "name": "Documentary",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Doc",
                "type": "text",
                "value": ""
              },
              {
                "label": "Topic",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "thriller",
            "name": "Thriller",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "anime",
            "name": "Anime",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Series",
                "type": "text",
                "value": ""
              },
              {
                "label": "Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "music-male",
    "label": "Music",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "event-concerts",
        "products": [
          {
            "id": "favorite-genres",
            "name": "Favorite Genres",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Top Genres",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-artists",
            "name": "Favorite Artists",
            "image": "event-concerts",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Listening To",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "concerts",
            "name": "Concerts",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Dream Concert",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "playlists",
            "name": "Playlists",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Playlist Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Spotify",
                  "Apple Music",
                  "YouTube",
                  "Tidal"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vinyl-collecting",
            "name": "Vinyl / Collecting",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Album on Vinyl",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "podcasts",
            "name": "Podcasts",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Podcast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Topic",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Spotify",
                  "Apple Podcasts",
                  "YouTube",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-music-venues",
            "name": "Live Music Venues",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "City",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "sports-male",
    "label": "Sports",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "event-sports",
        "products": [
          {
            "id": "favorite-teams",
            "name": "Favorite Teams",
            "image": "event-sports",
            "fields": [
              {
                "label": "Football",
                "type": "text",
                "value": ""
              },
              {
                "label": "Basketball",
                "type": "text",
                "value": ""
              },
              {
                "label": "Baseball",
                "type": "text",
                "value": ""
              },
              {
                "label": "Soccer",
                "type": "text",
                "value": ""
              },
              {
                "label": "Hockey",
                "type": "text",
                "value": ""
              },
              {
                "label": "Other",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fantasy-sports",
            "name": "Fantasy Sports",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-events",
            "name": "Live Events",
            "image": "event-sports",
            "fields": [
              {
                "label": "Favorite Sport to Watch Live",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Seat Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-to-play",
            "name": "Sports to Play",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                  "Competitive"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fitness",
            "name": "Fitness",
            "image": "clothing-activewear",
            "fields": [
              {
                "label": "Workout Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gym",
                "type": "text",
                "value": ""
              },
              {
                "label": "Frequency",
                "type": "select",
                "value": "",
                "options": [
                  "1-2x/week",
                  "3-4x/week",
                  "5+x/week",
                  "Daily"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "combat-sports",
            "name": "Combat Sports",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "select",
                "value": "",
                "options": [
                  "Boxing",
                  "MMA",
                  "Wrestling",
                  "BJJ",
                  "Muay Thai",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "extreme-sports",
            "name": "Extreme Sports",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "gaming-male",
    "label": "Gaming",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "platforms",
        "name": "Platforms",
        "image": "specific-products",
        "products": [
          {
            "id": "console",
            "name": "Console Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Console",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation 5",
                  "Xbox Series X",
                  "Nintendo Switch",
                  "Multiple"
                ]
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gamertag",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pc-gaming",
            "name": "PC Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Steam",
                  "Epic Games",
                  "Battle.net",
                  "Other"
                ]
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mobile-gaming",
            "name": "Mobile Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "board-games",
            "name": "Board Games",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "card-games",
            "name": "Card Games",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vr",
            "name": "VR Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Headset",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "retro-gaming",
            "name": "Retro Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Console",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "books-podcasts-male",
    "label": "Books & Podcasts",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "genres",
        "name": "Genres",
        "image": "wish-list",
        "products": [
          {
            "id": "fiction",
            "name": "Fiction",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Reading",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "non-fiction",
            "name": "Non-Fiction",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "self-help",
            "name": "Self-Help",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "business",
            "name": "Business",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "history",
            "name": "History",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Era of Interest",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "true-crime",
            "name": "True Crime",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Podcast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "audiobooks",
            "name": "Audiobooks",
            "image": "wish-list",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Audible",
                  "Spotify",
                  "Libby",
                  "Other"
                ]
              },
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "hobbies-male",
    "label": "Hobbies",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "travel-preferences",
        "products": [
          {
            "id": "outdoors",
            "name": "Outdoors",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "photography",
            "name": "Photography",
            "image": "specific-products",
            "fields": [
              {
                "label": "Camera Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cooking",
            "name": "Cooking",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Specialty",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "travel",
            "name": "Travel",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Dream Destination",
                "type": "text",
                "value": ""
              },
              {
                "label": "Travel Style",
                "type": "select",
                "value": "",
                "options": [
                  "Adventure",
                  "Relaxation",
                  "Cultural",
                  "Backpacking",
                  "Luxury"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "collecting",
            "name": "Collecting",
            "image": "specific-products",
            "fields": [
              {
                "label": "What I Collect",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "diy-crafts",
            "name": "DIY & Projects",
            "image": "specific-products",
            "fields": [
              {
                "label": "Current Project",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cars-motorsport",
            "name": "Cars & Motorsport",
            "image": "specific-products",
            "fields": [
              {
                "label": "Car",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Track / Race",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "nightlife-social-male",
    "label": "Nightlife & Social",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "activities",
        "name": "Activities",
        "image": "favorite-restaurants",
        "products": [
          {
            "id": "bar-scene",
            "name": "Bar Scene",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Bar",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink of Choice",
                "type": "text",
                "value": ""
              },
              {
                "label": "Vibe",
                "type": "select",
                "value": "",
                "options": [
                  "Dive Bar",
                  "Craft Beer",
                  "Cocktail Bar",
                  "Sports Bar",
                  "Wine Bar"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "clubs",
            "name": "Clubs",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Music Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-music",
            "name": "Live Music",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "karaoke",
            "name": "Karaoke",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Song to Sing",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "game-nights",
            "name": "Game Nights",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dinner-parties",
            "name": "Dinner Parties",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Hosting or Attending",
                "type": "select",
                "value": "",
                "options": [
                  "I Host",
                  "I Attend",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "rooftop-bars",
            "name": "Rooftop Bars",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "comedy-live-male",
    "label": "Comedy & Live Events",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "event-concerts",
        "products": [
          {
            "id": "stand-up",
            "name": "Stand-Up",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Comedian",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "improv",
            "name": "Improv",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Group",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-theater",
            "name": "Live Theater",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "open-mic",
            "name": "Open Mic",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Performing or Watching",
                "type": "select",
                "value": "",
                "options": [
                  "Watching",
                  "Performing",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comedy-clubs",
            "name": "Comedy Clubs",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Club",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-comedians",
            "name": "Favorite Comedians",
            "image": "event-concerts",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Watching",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "movies-tv-female",
    "label": "Movies & TV",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "genres",
        "name": "Genres",
        "image": "event-concerts",
        "products": [
          {
            "id": "action",
            "name": "Action",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comedy",
            "name": "Comedy",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "drama",
            "name": "Drama",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "horror",
            "name": "Horror",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sci-fi",
            "name": "Sci-Fi",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "documentary",
            "name": "Documentary",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Doc",
                "type": "text",
                "value": ""
              },
              {
                "label": "Topic",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "thriller",
            "name": "Thriller",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "anime",
            "name": "Anime",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Series",
                "type": "text",
                "value": ""
              },
              {
                "label": "Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "music-female",
    "label": "Music",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "event-concerts",
        "products": [
          {
            "id": "favorite-genres",
            "name": "Favorite Genres",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Top Genres",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-artists",
            "name": "Favorite Artists",
            "image": "event-concerts",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Listening To",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "concerts",
            "name": "Concerts",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Dream Concert",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "playlists",
            "name": "Playlists",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Playlist Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Spotify",
                  "Apple Music",
                  "YouTube",
                  "Tidal"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vinyl-collecting",
            "name": "Vinyl / Collecting",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Album on Vinyl",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "podcasts",
            "name": "Podcasts",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Podcast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Topic",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Spotify",
                  "Apple Podcasts",
                  "YouTube",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-music-venues",
            "name": "Live Music Venues",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "City",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "sports-female",
    "label": "Sports",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "event-sports",
        "products": [
          {
            "id": "favorite-teams",
            "name": "Favorite Teams",
            "image": "event-sports",
            "fields": [
              {
                "label": "Football",
                "type": "text",
                "value": ""
              },
              {
                "label": "Basketball",
                "type": "text",
                "value": ""
              },
              {
                "label": "Baseball",
                "type": "text",
                "value": ""
              },
              {
                "label": "Soccer",
                "type": "text",
                "value": ""
              },
              {
                "label": "Hockey",
                "type": "text",
                "value": ""
              },
              {
                "label": "Other",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fantasy-sports",
            "name": "Fantasy Sports",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-events",
            "name": "Live Events",
            "image": "event-sports",
            "fields": [
              {
                "label": "Favorite Sport to Watch Live",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Seat Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-to-play",
            "name": "Sports to Play",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                  "Competitive"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fitness",
            "name": "Fitness",
            "image": "clothing-activewear",
            "fields": [
              {
                "label": "Workout Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gym",
                "type": "text",
                "value": ""
              },
              {
                "label": "Frequency",
                "type": "select",
                "value": "",
                "options": [
                  "1-2x/week",
                  "3-4x/week",
                  "5+x/week",
                  "Daily"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "combat-sports",
            "name": "Combat Sports",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "select",
                "value": "",
                "options": [
                  "Boxing",
                  "MMA",
                  "Wrestling",
                  "BJJ",
                  "Muay Thai",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "extreme-sports",
            "name": "Extreme Sports",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "gaming-female",
    "label": "Gaming",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "platforms",
        "name": "Platforms",
        "image": "specific-products",
        "products": [
          {
            "id": "console",
            "name": "Console Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Console",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation 5",
                  "Xbox Series X",
                  "Nintendo Switch",
                  "Multiple"
                ]
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gamertag",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pc-gaming",
            "name": "PC Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Steam",
                  "Epic Games",
                  "Battle.net",
                  "Other"
                ]
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mobile-gaming",
            "name": "Mobile Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "board-games",
            "name": "Board Games",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "card-games",
            "name": "Card Games",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vr",
            "name": "VR Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Headset",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "retro-gaming",
            "name": "Retro Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Console",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "books-podcasts-female",
    "label": "Books & Podcasts",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "genres",
        "name": "Genres",
        "image": "wish-list",
        "products": [
          {
            "id": "fiction",
            "name": "Fiction",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Reading",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "non-fiction",
            "name": "Non-Fiction",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "self-help",
            "name": "Self-Help",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "business",
            "name": "Business",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "history",
            "name": "History",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Era of Interest",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "true-crime",
            "name": "True Crime",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Podcast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "audiobooks",
            "name": "Audiobooks",
            "image": "wish-list",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Audible",
                  "Spotify",
                  "Libby",
                  "Other"
                ]
              },
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "hobbies-female",
    "label": "Hobbies",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "travel-preferences",
        "products": [
          {
            "id": "outdoors",
            "name": "Outdoors",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "photography",
            "name": "Photography",
            "image": "specific-products",
            "fields": [
              {
                "label": "Camera Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cooking",
            "name": "Cooking",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Specialty",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "travel",
            "name": "Travel",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Dream Destination",
                "type": "text",
                "value": ""
              },
              {
                "label": "Travel Style",
                "type": "select",
                "value": "",
                "options": [
                  "Adventure",
                  "Relaxation",
                  "Cultural",
                  "Backpacking",
                  "Luxury"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "collecting",
            "name": "Collecting",
            "image": "specific-products",
            "fields": [
              {
                "label": "What I Collect",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "diy-crafts",
            "name": "DIY & Projects",
            "image": "specific-products",
            "fields": [
              {
                "label": "Current Project",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cars-motorsport",
            "name": "Cars & Motorsport",
            "image": "specific-products",
            "fields": [
              {
                "label": "Car",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Track / Race",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "nightlife-social-female",
    "label": "Nightlife & Social",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "activities",
        "name": "Activities",
        "image": "favorite-restaurants",
        "products": [
          {
            "id": "bar-scene",
            "name": "Bar Scene",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Bar",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink of Choice",
                "type": "text",
                "value": ""
              },
              {
                "label": "Vibe",
                "type": "select",
                "value": "",
                "options": [
                  "Dive Bar",
                  "Craft Beer",
                  "Cocktail Bar",
                  "Sports Bar",
                  "Wine Bar"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "clubs",
            "name": "Clubs",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Music Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-music",
            "name": "Live Music",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "karaoke",
            "name": "Karaoke",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Song to Sing",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "game-nights",
            "name": "Game Nights",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dinner-parties",
            "name": "Dinner Parties",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Hosting or Attending",
                "type": "select",
                "value": "",
                "options": [
                  "I Host",
                  "I Attend",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "rooftop-bars",
            "name": "Rooftop Bars",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "comedy-live-female",
    "label": "Comedy & Live Events",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "event-concerts",
        "products": [
          {
            "id": "stand-up",
            "name": "Stand-Up",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Comedian",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "improv",
            "name": "Improv",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Group",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-theater",
            "name": "Live Theater",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "open-mic",
            "name": "Open Mic",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Performing or Watching",
                "type": "select",
                "value": "",
                "options": [
                  "Watching",
                  "Performing",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comedy-clubs",
            "name": "Comedy Clubs",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Club",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-comedians",
            "name": "Favorite Comedians",
            "image": "event-concerts",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Watching",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "movies-tv-nb",
    "label": "Movies & TV",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "genres",
        "name": "Genres",
        "image": "event-concerts",
        "products": [
          {
            "id": "action",
            "name": "Action",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comedy",
            "name": "Comedy",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "drama",
            "name": "Drama",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "horror",
            "name": "Horror",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sci-fi",
            "name": "Sci-Fi",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "documentary",
            "name": "Documentary",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Doc",
                "type": "text",
                "value": ""
              },
              {
                "label": "Topic",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "thriller",
            "name": "Thriller",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Movie",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "anime",
            "name": "Anime",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Series",
                "type": "text",
                "value": ""
              },
              {
                "label": "Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Streaming Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "music-nb",
    "label": "Music",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "event-concerts",
        "products": [
          {
            "id": "favorite-genres",
            "name": "Favorite Genres",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Top Genres",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-artists",
            "name": "Favorite Artists",
            "image": "event-concerts",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Listening To",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "concerts",
            "name": "Concerts",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Dream Concert",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "playlists",
            "name": "Playlists",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Playlist Name",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Spotify",
                  "Apple Music",
                  "YouTube",
                  "Tidal"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vinyl-collecting",
            "name": "Vinyl / Collecting",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Album on Vinyl",
                "type": "text",
                "value": ""
              },
              {
                "label": "Preferred Store",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "podcasts",
            "name": "Podcasts",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Podcast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Topic",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Spotify",
                  "Apple Podcasts",
                  "YouTube",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-music-venues",
            "name": "Live Music Venues",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "City",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "sports-nb",
    "label": "Sports",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "preferences",
        "name": "Preferences",
        "image": "event-sports",
        "products": [
          {
            "id": "favorite-teams",
            "name": "Favorite Teams",
            "image": "event-sports",
            "fields": [
              {
                "label": "Football",
                "type": "text",
                "value": ""
              },
              {
                "label": "Basketball",
                "type": "text",
                "value": ""
              },
              {
                "label": "Baseball",
                "type": "text",
                "value": ""
              },
              {
                "label": "Soccer",
                "type": "text",
                "value": ""
              },
              {
                "label": "Hockey",
                "type": "text",
                "value": ""
              },
              {
                "label": "Other",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fantasy-sports",
            "name": "Fantasy Sports",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-events",
            "name": "Live Events",
            "image": "event-sports",
            "fields": [
              {
                "label": "Favorite Sport to Watch Live",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Seat Preference",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-to-play",
            "name": "Sports to Play",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Skill Level",
                "type": "select",
                "value": "",
                "options": [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                  "Competitive"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fitness",
            "name": "Fitness",
            "image": "clothing-activewear",
            "fields": [
              {
                "label": "Workout Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gym",
                "type": "text",
                "value": ""
              },
              {
                "label": "Frequency",
                "type": "select",
                "value": "",
                "options": [
                  "1-2x/week",
                  "3-4x/week",
                  "5+x/week",
                  "Daily"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "combat-sports",
            "name": "Combat Sports",
            "image": "event-sports",
            "fields": [
              {
                "label": "Sport",
                "type": "select",
                "value": "",
                "options": [
                  "Boxing",
                  "MMA",
                  "Wrestling",
                  "BJJ",
                  "Muay Thai",
                  "Other"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "extreme-sports",
            "name": "Extreme Sports",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Sport",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "gaming-nb",
    "label": "Gaming",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "platforms",
        "name": "Platforms",
        "image": "specific-products",
        "products": [
          {
            "id": "console",
            "name": "Console Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Console",
                "type": "select",
                "value": "",
                "options": [
                  "PlayStation 5",
                  "Xbox Series X",
                  "Nintendo Switch",
                  "Multiple"
                ]
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Gamertag",
                "type": "text",
                "value": ""
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pc-gaming",
            "name": "PC Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Steam",
                  "Epic Games",
                  "Battle.net",
                  "Other"
                ]
              },
              {
                "label": "Accessories Needed",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mobile-gaming",
            "name": "Mobile Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "board-games",
            "name": "Board Games",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "card-games",
            "name": "Card Games",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vr",
            "name": "VR Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Headset",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "retro-gaming",
            "name": "Retro Gaming",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Console",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "books-podcasts-nb",
    "label": "Books & Podcasts",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "genres",
        "name": "Genres",
        "image": "wish-list",
        "products": [
          {
            "id": "fiction",
            "name": "Fiction",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Reading",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "non-fiction",
            "name": "Non-Fiction",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "self-help",
            "name": "Self-Help",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "business",
            "name": "Business",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Author",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "history",
            "name": "History",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Era of Interest",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "true-crime",
            "name": "True Crime",
            "image": "wish-list",
            "fields": [
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Podcast",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "audiobooks",
            "name": "Audiobooks",
            "image": "wish-list",
            "fields": [
              {
                "label": "Platform",
                "type": "select",
                "value": "",
                "options": [
                  "Audible",
                  "Spotify",
                  "Libby",
                  "Other"
                ]
              },
              {
                "label": "Favorite Book",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "hobbies-nb",
    "label": "Hobbies",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "travel-preferences",
        "products": [
          {
            "id": "outdoors",
            "name": "Outdoors",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Activity",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "photography",
            "name": "Photography",
            "image": "specific-products",
            "fields": [
              {
                "label": "Camera Type",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cooking",
            "name": "Cooking",
            "image": "favorite-meals",
            "fields": [
              {
                "label": "Specialty",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "travel",
            "name": "Travel",
            "image": "travel-preferences",
            "fields": [
              {
                "label": "Dream Destination",
                "type": "text",
                "value": ""
              },
              {
                "label": "Travel Style",
                "type": "select",
                "value": "",
                "options": [
                  "Adventure",
                  "Relaxation",
                  "Cultural",
                  "Backpacking",
                  "Luxury"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "collecting",
            "name": "Collecting",
            "image": "specific-products",
            "fields": [
              {
                "label": "What I Collect",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "diy-crafts",
            "name": "DIY & Projects",
            "image": "specific-products",
            "fields": [
              {
                "label": "Current Project",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cars-motorsport",
            "name": "Cars & Motorsport",
            "image": "specific-products",
            "fields": [
              {
                "label": "Car",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Track / Race",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "nightlife-social-nb",
    "label": "Nightlife & Social",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "activities",
        "name": "Activities",
        "image": "favorite-restaurants",
        "products": [
          {
            "id": "bar-scene",
            "name": "Bar Scene",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Bar",
                "type": "text",
                "value": ""
              },
              {
                "label": "Drink of Choice",
                "type": "text",
                "value": ""
              },
              {
                "label": "Vibe",
                "type": "select",
                "value": "",
                "options": [
                  "Dive Bar",
                  "Craft Beer",
                  "Cocktail Bar",
                  "Sports Bar",
                  "Wine Bar"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "clubs",
            "name": "Clubs",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Music Style",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-music",
            "name": "Live Music",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Genre",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "karaoke",
            "name": "Karaoke",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Song to Sing",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "game-nights",
            "name": "Game Nights",
            "image": "specific-products",
            "fields": [
              {
                "label": "Favorite Games",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dinner-parties",
            "name": "Dinner Parties",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Hosting or Attending",
                "type": "select",
                "value": "",
                "options": [
                  "I Host",
                  "I Attend",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "rooftop-bars",
            "name": "Rooftop Bars",
            "image": "favorite-restaurants",
            "fields": [
              {
                "label": "Favorite Spot",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "comedy-live-nb",
    "label": "Comedy & Live Events",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 80,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "types",
        "name": "Types",
        "image": "event-concerts",
        "products": [
          {
            "id": "stand-up",
            "name": "Stand-Up",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Comedian",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "improv",
            "name": "Improv",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Group",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "live-theater",
            "name": "Live Theater",
            "image": "event-theater",
            "fields": [
              {
                "label": "Favorite Show",
                "type": "text",
                "value": ""
              },
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "open-mic",
            "name": "Open Mic",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Venue",
                "type": "text",
                "value": ""
              },
              {
                "label": "Performing or Watching",
                "type": "select",
                "value": "",
                "options": [
                  "Watching",
                  "Performing",
                  "Both"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "comedy-clubs",
            "name": "Comedy Clubs",
            "image": "event-concerts",
            "fields": [
              {
                "label": "Favorite Club",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "favorite-comedians",
            "name": "Favorite Comedians",
            "image": "event-concerts",
            "fields": [
              {
                "label": "All-Time Favorite",
                "type": "text",
                "value": ""
              },
              {
                "label": "Currently Watching",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          }
        ]
      }
    ]
  }
];


export const ROWS_BY_SECTION: Record<string, CategoryRegistryRow[]> = {
  'style-fit': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'style-fit'),
  'food-drink': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'food-drink'),
  'gifts-wishlist': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'gifts-wishlist'),
  'home-living': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'home-living'),
  'entertainment': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'entertainment'),
};