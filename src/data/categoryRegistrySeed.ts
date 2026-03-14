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
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100-$250",
              "$250+"
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
        "id": "splurge-items",
        "name": "Splurge Items",
        "image": "wish-list",
        "fields": [
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where to Buy",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100+"
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
            "label": "Meaning",
            "type": "text",
            "value": ""
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
            "label": "Preferred Store / Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Amount",
            "type": "select",
            "value": "",
            "options": [
              "$25",
              "$50",
              "$100",
              "$150",
              "$200",
              "Any"
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Streaming",
              "Gaming",
              "Food",
              "Fitness",
              "Music",
              "News",
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
        "id": "concerts-shows",
        "name": "Concerts & Shows",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Artists / Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Venue",
            "type": "text",
            "value": ""
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
            "label": "Favorite Sport",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Seat",
            "type": "select",
            "value": "",
            "options": [
              "Field / Floor",
              "Lower Bowl",
              "Upper Bowl",
              "Suite",
              "Any"
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
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Casual",
              "Mid-Range",
              "Fine Dining",
              "Any"
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
              "Road Trip",
              "City Break",
              "Beach",
              "All"
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
            "label": "Preferred Treatment",
            "type": "select",
            "value": "",
            "options": [
              "Massage",
              "Facial",
              "Float Tank",
              "Sauna",
              "Steam Room",
              "Full Day Spa"
            ]
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
        "id": "classes-workshops",
        "name": "Classes & Workshops",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Cooking",
              "Fitness",
              "Art",
              "Music",
              "Woodworking",
              "Martial Arts",
              "Other"
            ]
          },
          {
            "label": "Specific Interest",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Skydiving",
              "Bungee Jumping",
              "Surfing",
              "Rock Climbing",
              "Kayaking",
              "Hiking",
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Case",
              "Screen Protector",
              "Charger",
              "MagSafe",
              "Pop Socket",
              "Stand",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Over-Ear",
              "On-Ear",
              "In-Ear / Earbuds",
              "True Wireless"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Smart Speaker",
              "Smart Bulbs",
              "Smart Plug",
              "Security Camera",
              "Thermostat",
              "Doorbell",
              "Robot Vacuum",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Smart Watch",
              "Fitness Tracker",
              "Ring",
              "AR Glasses",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$250",
              "$250-$500",
              "$500+"
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
              "Mobile",
              "All"
            ]
          },
          {
            "label": "Favorite Games / Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Game",
              "Controller",
              "Headset",
              "Console",
              "Gift Card",
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
        "id": "cameras",
        "name": "Cameras",
        "image": "specific-products",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "DSLR",
              "Mirrorless",
              "Point & Shoot",
              "Action Camera",
              "Instant",
              "Drone"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $200",
              "$200-$500",
              "$500-$1000",
              "$1000+"
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
              "iPad",
              "Chromebook",
              "E-Reader"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $500",
              "$500-$1000",
              "$1000-$2000",
              "$2000+"
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Whiskey Glasses",
              "Wine Glasses",
              "Cocktail Kit",
              "Decanter",
              "Bar Tools",
              "Beer Steins",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Industrial",
              "Minimalist",
              "Rustic",
              "Eclectic",
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Authors",
            "type": "text",
            "value": ""
          },
          {
            "label": "Format",
            "type": "select",
            "value": "",
            "options": [
              "Hardcover",
              "Paperback",
              "E-Book",
              "Audiobook"
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
        "id": "candles-scents",
        "name": "Candles & Scents",
        "image": "scent-candles",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Plant Type",
            "type": "text",
            "value": ""
          },
          {
            "label": "Care Level",
            "type": "select",
            "value": "",
            "options": [
              "Low Maintenance",
              "Medium",
              "High Maintenance",
              "Any"
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Metal Preference",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Platinum",
              "Titanium",
              "Mixed"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Wallet",
              "Backpack",
              "Duffel Bag",
              "Tote",
              "Crossbody",
              "Briefcase",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "sunglasses",
        "name": "Sunglasses",
        "image": "accessory-sunglasses",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Wayfarer",
              "Aviator",
              "Round",
              "Square",
              "Sport",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
              "Dad Hat",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Casual",
              "Luxury",
              "Smart Watch"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$300",
              "$300-$1000",
              "$1000+"
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
        "id": "gym-fitness",
        "name": "Gym & Fitness",
        "image": "clothing-activewear",
        "fields": [
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Equipment",
              "Apparel",
              "Supplements",
              "Accessories",
              "Gym Bag",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Hiking",
              "Camping",
              "Fishing",
              "Hunting",
              "Cycling",
              "Climbing",
              "Water Sports",
              "Other"
            ]
          },
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Team / League",
            "type": "text",
            "value": ""
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Jersey",
              "Hat",
              "T-Shirt",
              "Hoodie",
              "Flag",
              "Signed Memorabilia",
              "Other"
            ]
          },
          {
            "label": "Player",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Handicap",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Road",
              "Mountain",
              "Gravel",
              "BMX",
              "E-Bike",
              "Accessories"
            ]
          },
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Surfing",
              "Kayaking",
              "Paddleboarding",
              "Fishing",
              "Swimming",
              "Scuba",
              "Other"
            ]
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
            "label": "Favorite Gift Type",
            "type": "text",
            "value": ""
          },
          {
            "label": "Dream Birthday",
            "type": "text",
            "value": ""
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
            "label": "Preferred Gift Style",
            "type": "select",
            "value": "",
            "options": [
              "Experiences",
              "Jewelry",
              "Travel",
              "Sentimental",
              "Practical",
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
        "id": "holidays",
        "name": "Holidays",
        "image": "wish-list",
        "fields": [
          {
            "label": "Holiday",
            "type": "select",
            "value": "",
            "options": [
              "Christmas",
              "Hanukkah",
              "Kwanzaa",
              "New Year",
              "Easter",
              "Other"
            ]
          },
          {
            "label": "Favorite Gift Type",
            "type": "text",
            "value": ""
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
        "name": "Valentine''s Day",
        "image": "anniversary-gifts",
        "fields": [
          {
            "label": "Preferred Gift Style",
            "type": "select",
            "value": "",
            "options": [
              "Experiences",
              "Jewelry",
              "Tech",
              "Food & Drink",
              "Sentimental",
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
        "id": "just-because",
        "name": "Just Because",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Spontaneous Gift",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100+"
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
            "label": "Preferred Gift Type",
            "type": "text",
            "value": ""
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
            "label": "Home Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Industrial",
              "Minimalist",
              "Rustic",
              "Eclectic",
              "Other"
            ]
          },
          {
            "label": "Preferred Gift Type",
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
            "type": "select",
            "value": "",
            "options": [
              "Environment",
              "Education",
              "Health",
              "Hunger",
              "Animal Welfare",
              "Social Justice",
              "Veterans",
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
            "label": "Category",
            "type": "text",
            "value": ""
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
            "label": "Local Organization",
            "type": "text",
            "value": ""
          },
          {
            "label": "How to Donate",
            "type": "text",
            "value": ""
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
            "label": "Party / Affiliation",
            "type": "text",
            "value": ""
          },
          {
            "label": "Candidate / Cause",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100-$250",
              "$250+"
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
        "id": "splurge-items",
        "name": "Splurge Items",
        "image": "wish-list",
        "fields": [
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where to Buy",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100+"
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
            "label": "Meaning",
            "type": "text",
            "value": ""
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
            "label": "Preferred Store / Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Amount",
            "type": "select",
            "value": "",
            "options": [
              "$25",
              "$50",
              "$100",
              "$150",
              "$200",
              "Any"
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Streaming",
              "Beauty Box",
              "Food",
              "Fitness",
              "Books",
              "Fashion",
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
        "id": "concerts-shows",
        "name": "Concerts & Shows",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Artists / Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Venue",
            "type": "text",
            "value": ""
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
            "label": "Favorite Sport",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Seat",
            "type": "select",
            "value": "",
            "options": [
              "Field / Floor",
              "Lower Bowl",
              "Upper Bowl",
              "Suite",
              "Any"
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
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Casual",
              "Mid-Range",
              "Fine Dining",
              "Any"
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
              "Road Trip",
              "City Break",
              "Beach",
              "All"
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
            "label": "Preferred Treatment",
            "type": "select",
            "value": "",
            "options": [
              "Massage",
              "Facial",
              "Mani-Pedi",
              "Float Tank",
              "Sauna",
              "Full Day Spa",
              "Couples Spa"
            ]
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
        "id": "classes-workshops",
        "name": "Classes & Workshops",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Cooking",
              "Pottery",
              "Painting",
              "Yoga",
              "Dance",
              "Floral Design",
              "Other"
            ]
          },
          {
            "label": "Specific Interest",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "theater",
        "name": "Theater & Arts",
        "image": "event-theater",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Broadway",
              "Ballet",
              "Opera",
              "Comedy Show",
              "Film Festival",
              "Art Exhibition",
              "Other"
            ]
          },
          {
            "label": "Favorite Shows / Artists",
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Case",
              "Screen Protector",
              "Charger",
              "MagSafe",
              "Pop Socket",
              "Stand",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Over-Ear",
              "On-Ear",
              "In-Ear / Earbuds",
              "True Wireless"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Smart Speaker",
              "Smart Bulbs",
              "Smart Plug",
              "Security Camera",
              "Thermostat",
              "Doorbell",
              "Robot Vacuum",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Smart Watch",
              "Fitness Tracker",
              "Ring",
              "AR Glasses",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$250",
              "$250-$500",
              "$500+"
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
        "id": "beauty-tech",
        "name": "Beauty Tech",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Hair Dryer",
              "Curling Iron",
              "Straightener",
              "Gua Sha Tool",
              "LED Mask",
              "Microcurrent Device",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "cameras",
        "name": "Cameras",
        "image": "specific-products",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "DSLR",
              "Mirrorless",
              "Point & Shoot",
              "Action Camera",
              "Instant",
              "Drone"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $200",
              "$200-$500",
              "$500-$1000",
              "$1000+"
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
              "iPad",
              "Chromebook",
              "E-Reader"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $500",
              "$500-$1000",
              "$1000-$2000",
              "$2000+"
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "candles-scents",
        "name": "Candles & Scents",
        "image": "scent-candles",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Candle",
              "Reed Diffuser",
              "Wax Melt",
              "Room Spray",
              "Incense"
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
        "id": "decor",
        "name": "Decor",
        "image": "wish-list",
        "fields": [
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Boho",
              "Minimalist",
              "Coastal",
              "Farmhouse",
              "Eclectic",
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Authors",
            "type": "text",
            "value": ""
          },
          {
            "label": "Format",
            "type": "select",
            "value": "",
            "options": [
              "Hardcover",
              "Paperback",
              "E-Book",
              "Audiobook"
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Wine Glasses",
              "Cocktail Kit",
              "Champagne Flutes",
              "Serving Board",
              "Bar Cart",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Favorite Plant Type",
            "type": "text",
            "value": ""
          },
          {
            "label": "Care Level",
            "type": "select",
            "value": "",
            "options": [
              "Low Maintenance",
              "Medium",
              "High Maintenance",
              "Any"
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
            "type": "select",
            "value": "",
            "options": [
              "XXS",
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "XXL"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "shoe-heels",
        "fields": [
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Metal Preference",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Platinum",
              "Mixed"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "bags",
        "name": "Bags",
        "image": "specific-products",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Handbag",
              "Tote",
              "Crossbody",
              "Clutch",
              "Backpack",
              "Belt Bag",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$300",
              "$300-$1000",
              "$1000+"
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
        "id": "sunglasses",
        "name": "Sunglasses",
        "image": "accessory-sunglasses",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Cat Eye",
              "Round",
              "Oversized",
              "Aviator",
              "Square",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
              "Wide Brim",
              "Beret",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Minimalist",
              "Casual",
              "Luxury",
              "Smart Watch"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$300",
              "$300-$1000",
              "$1000+"
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
    "key": "flowers-plants-female",
    "label": "Flowers & Plants",
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
        "id": "roses",
        "name": "Roses",
        "image": "flowers-roses",
        "fields": [
          {
            "label": "Favorite Color",
            "type": "select",
            "value": "",
            "options": [
              "Red",
              "Pink",
              "White",
              "Yellow",
              "Orange",
              "Purple",
              "Mixed"
            ]
          },
          {
            "label": "Preferred Quantity",
            "type": "select",
            "value": "",
            "options": [
              "Single Stem",
              "6",
              "12",
              "24",
              "36",
              "50+"
            ]
          },
          {
            "label": "Preferred Florist",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "sunflowers",
        "name": "Sunflowers",
        "image": "flowers-sunflowers",
        "fields": [
          {
            "label": "Preferred Quantity",
            "type": "select",
            "value": "",
            "options": [
              "Single Stem",
              "6",
              "12",
              "24",
              "Mixed Bouquet"
            ]
          },
          {
            "label": "Preferred Florist",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "tulips",
        "name": "Tulips",
        "image": "flowers-tulips",
        "fields": [
          {
            "label": "Favorite Color",
            "type": "select",
            "value": "",
            "options": [
              "Red",
              "Pink",
              "White",
              "Yellow",
              "Purple",
              "Mixed"
            ]
          },
          {
            "label": "Preferred Quantity",
            "type": "select",
            "value": "",
            "options": [
              "6",
              "12",
              "24",
              "Mixed Bouquet"
            ]
          },
          {
            "label": "Preferred Florist",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "lilies",
        "name": "Lilies",
        "image": "flowers-lilies",
        "fields": [
          {
            "label": "Favorite Color",
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Pink",
              "Orange",
              "Yellow",
              "Mixed"
            ]
          },
          {
            "label": "Preferred Florist",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "orchids",
        "name": "Orchids",
        "image": "flowers",
        "fields": [
          {
            "label": "Favorite Color",
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Pink",
              "Purple",
              "Yellow",
              "Mixed"
            ]
          },
          {
            "label": "Preferred Florist",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "custom-arrangement",
        "name": "Custom Arrangement",
        "image": "flowers",
        "fields": [
          {
            "label": "Favorite Flowers",
            "type": "text",
            "value": ""
          },
          {
            "label": "Color Palette",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Florist",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$100",
              "$100-$200",
              "$200+"
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
        "id": "plants",
        "name": "Plants",
        "image": "flowers",
        "fields": [
          {
            "label": "Favorite Plant Type",
            "type": "text",
            "value": ""
          },
          {
            "label": "Care Level",
            "type": "select",
            "value": "",
            "options": [
              "Low Maintenance",
              "Medium",
              "High Maintenance",
              "Any"
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
            "label": "Favorite Gift Type",
            "type": "text",
            "value": ""
          },
          {
            "label": "Dream Birthday",
            "type": "text",
            "value": ""
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
            "label": "Preferred Gift Style",
            "type": "select",
            "value": "",
            "options": [
              "Experiences",
              "Jewelry",
              "Travel",
              "Flowers",
              "Sentimental",
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
        "id": "holidays",
        "name": "Holidays",
        "image": "wish-list",
        "fields": [
          {
            "label": "Holiday",
            "type": "select",
            "value": "",
            "options": [
              "Christmas",
              "Hanukkah",
              "Kwanzaa",
              "New Year",
              "Easter",
              "Other"
            ]
          },
          {
            "label": "Favorite Gift Type",
            "type": "text",
            "value": ""
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
        "name": "Valentine''s Day",
        "image": "anniversary-gifts",
        "fields": [
          {
            "label": "Preferred Gift Style",
            "type": "select",
            "value": "",
            "options": [
              "Flowers",
              "Jewelry",
              "Experiences",
              "Chocolate",
              "Spa",
              "Sentimental",
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
        "id": "just-because",
        "name": "Just Because",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Spontaneous Gift",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100+"
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
            "label": "Preferred Gift Type",
            "type": "text",
            "value": ""
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
            "label": "Home Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Boho",
              "Minimalist",
              "Coastal",
              "Farmhouse",
              "Eclectic",
              "Other"
            ]
          },
          {
            "label": "Preferred Gift Type",
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
            "type": "select",
            "value": "",
            "options": [
              "Environment",
              "Education",
              "Health",
              "Hunger",
              "Animal Welfare",
              "Social Justice",
              "Women''s Rights",
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
            "label": "Category",
            "type": "text",
            "value": ""
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
            "label": "Local Organization",
            "type": "text",
            "value": ""
          },
          {
            "label": "How to Donate",
            "type": "text",
            "value": ""
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
            "label": "Party / Affiliation",
            "type": "text",
            "value": ""
          },
          {
            "label": "Candidate / Cause",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100-$250",
              "$250+"
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
        "id": "splurge-items",
        "name": "Splurge Items",
        "image": "wish-list",
        "fields": [
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where to Buy",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100+"
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
            "label": "Meaning",
            "type": "text",
            "value": ""
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
            "label": "Preferred Store / Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Amount",
            "type": "select",
            "value": "",
            "options": [
              "$25",
              "$50",
              "$100",
              "$150",
              "$200",
              "Any"
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Streaming",
              "Gaming",
              "Food",
              "Fitness",
              "Music",
              "Books",
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
        "id": "concerts-shows",
        "name": "Concerts & Shows",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Artists / Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Venue",
            "type": "text",
            "value": ""
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
            "label": "Favorite Sport",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Seat",
            "type": "select",
            "value": "",
            "options": [
              "Field / Floor",
              "Lower Bowl",
              "Upper Bowl",
              "Suite",
              "Any"
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
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Casual",
              "Mid-Range",
              "Fine Dining",
              "Any"
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
              "Road Trip",
              "City Break",
              "Beach",
              "All"
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
            "label": "Preferred Treatment",
            "type": "select",
            "value": "",
            "options": [
              "Massage",
              "Facial",
              "Float Tank",
              "Sauna",
              "Steam Room",
              "Full Day Spa",
              "Couples Spa"
            ]
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
        "id": "classes-workshops",
        "name": "Classes & Workshops",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Cooking",
              "Pottery",
              "Painting",
              "Fitness",
              "Music",
              "Woodworking",
              "Other"
            ]
          },
          {
            "label": "Specific Interest",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "theater",
        "name": "Theater & Arts",
        "image": "event-theater",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Broadway",
              "Ballet",
              "Opera",
              "Comedy Show",
              "Film Festival",
              "Art Exhibition",
              "Other"
            ]
          },
          {
            "label": "Favorite Shows / Artists",
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Case",
              "Screen Protector",
              "Charger",
              "MagSafe",
              "Pop Socket",
              "Stand",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Over-Ear",
              "On-Ear",
              "In-Ear / Earbuds",
              "True Wireless"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Smart Speaker",
              "Smart Bulbs",
              "Smart Plug",
              "Security Camera",
              "Thermostat",
              "Doorbell",
              "Robot Vacuum",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Smart Watch",
              "Fitness Tracker",
              "Ring",
              "AR Glasses",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$250",
              "$250-$500",
              "$500+"
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
              "Mobile",
              "All"
            ]
          },
          {
            "label": "Favorite Games / Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Game",
              "Controller",
              "Headset",
              "Console",
              "Gift Card",
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
        "id": "cameras",
        "name": "Cameras",
        "image": "specific-products",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "DSLR",
              "Mirrorless",
              "Point & Shoot",
              "Action Camera",
              "Instant",
              "Drone"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $200",
              "$200-$500",
              "$500-$1000",
              "$1000+"
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
              "iPad",
              "Chromebook",
              "E-Reader"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $500",
              "$500-$1000",
              "$1000-$2000",
              "$2000+"
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "candles-scents",
        "name": "Candles & Scents",
        "image": "scent-candles",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Candle",
              "Reed Diffuser",
              "Wax Melt",
              "Room Spray",
              "Incense"
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
        "id": "decor",
        "name": "Decor",
        "image": "wish-list",
        "fields": [
          {
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Minimalist",
              "Industrial",
              "Boho",
              "Eclectic",
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Authors",
            "type": "text",
            "value": ""
          },
          {
            "label": "Format",
            "type": "select",
            "value": "",
            "options": [
              "Hardcover",
              "Paperback",
              "E-Book",
              "Audiobook"
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Glasses",
              "Cocktail Kit",
              "Serving Board",
              "Bar Cart",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Plant Type",
            "type": "text",
            "value": ""
          },
          {
            "label": "Care Level",
            "type": "select",
            "value": "",
            "options": [
              "Low Maintenance",
              "Medium",
              "High Maintenance",
              "Any"
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
            "type": "select",
            "value": "",
            "options": [
              "XXS",
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Metal Preference",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Platinum",
              "Mixed"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Wallet",
              "Backpack",
              "Tote",
              "Crossbody",
              "Duffel",
              "Belt Bag",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$300",
              "$300-$1000",
              "$1000+"
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
        "id": "sunglasses",
        "name": "Sunglasses",
        "image": "accessory-sunglasses",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Round",
              "Square",
              "Oversized",
              "Aviator",
              "Cat Eye",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
              "Beret",
              "Wide Brim",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Minimalist",
              "Casual",
              "Sport",
              "Luxury",
              "Smart Watch"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$300",
              "$300-$1000",
              "$1000+"
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
    "key": "special-occasions-nb",
    "label": "Special Occasions",
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
            "label": "Favorite Gift Type",
            "type": "text",
            "value": ""
          },
          {
            "label": "Dream Birthday",
            "type": "text",
            "value": ""
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
            "label": "Preferred Gift Style",
            "type": "select",
            "value": "",
            "options": [
              "Experiences",
              "Jewelry",
              "Travel",
              "Sentimental",
              "Practical",
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
        "id": "holidays",
        "name": "Holidays",
        "image": "wish-list",
        "fields": [
          {
            "label": "Holiday",
            "type": "select",
            "value": "",
            "options": [
              "Christmas",
              "Hanukkah",
              "Kwanzaa",
              "New Year",
              "Easter",
              "Other"
            ]
          },
          {
            "label": "Favorite Gift Type",
            "type": "text",
            "value": ""
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
        "name": "Valentine''s Day",
        "image": "anniversary-gifts",
        "fields": [
          {
            "label": "Preferred Gift Style",
            "type": "select",
            "value": "",
            "options": [
              "Experiences",
              "Jewelry",
              "Tech",
              "Food & Drink",
              "Sentimental",
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
        "id": "just-because",
        "name": "Just Because",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Spontaneous Gift",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $25",
              "$25-$50",
              "$50-$100",
              "$100+"
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
            "label": "Preferred Gift Type",
            "type": "text",
            "value": ""
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
            "label": "Home Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Minimalist",
              "Industrial",
              "Boho",
              "Eclectic",
              "Other"
            ]
          },
          {
            "label": "Preferred Gift Type",
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
    "key": "donations-nb",
    "label": "Donations & Causes",
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
            "type": "select",
            "value": "",
            "options": [
              "Environment",
              "Education",
              "Health",
              "Hunger",
              "Animal Welfare",
              "Social Justice",
              "LGBTQ+ Rights",
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
            "label": "Category",
            "type": "text",
            "value": ""
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
            "label": "Local Organization",
            "type": "text",
            "value": ""
          },
          {
            "label": "How to Donate",
            "type": "text",
            "value": ""
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
            "label": "Party / Affiliation",
            "type": "text",
            "value": ""
          },
          {
            "label": "Candidate / Cause",
            "type": "text",
            "value": ""
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
        "id": "sofa",
        "name": "Sofa",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Sectional",
              "Mid-Century",
              "Industrial",
              "Minimalist",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Fabric",
              "Leather",
              "Velvet",
              "Microfiber",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
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
            "type": "select",
            "value": "",
            "options": [
              "Platform",
              "Upholstered",
              "Metal",
              "Wooden",
              "Storage Bed"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "2-4 Person",
              "4-6 Person",
              "6-8 Person",
              "8+ Person"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Glass",
              "Marble",
              "Metal",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Standing Desk",
              "L-Shaped",
              "Simple Writing Desk",
              "Corner Desk",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Metal",
              "Glass",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Floating Shelves",
              "Freestanding",
              "Built-In",
              "Ladder",
              "Cube"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Industrial",
              "Rustic",
              "Minimalist",
              "Ottoman",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Glass",
              "Metal",
              "Marble",
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
        "id": "accent-chair",
        "name": "Accent Chair",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Lounge",
              "Recliner",
              "Barrel",
              "Slipper",
              "Egg Chair",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Fabric",
              "Leather",
              "Velvet",
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
        "id": "dresser",
        "name": "Dresser",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Tall",
              "Wide",
              "Double",
              "Mid-Century",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "MDF",
              "Metal",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "cookware",
        "name": "Cookware",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Non-Stick",
              "Cast Iron",
              "Stainless Steel",
              "Carbon Steel",
              "Ceramic"
            ]
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Skillet",
              "Saucepan",
              "Dutch Oven",
              "Wok",
              "Full Set",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Chef''s Knife",
              "Santoku",
              "Bread Knife",
              "Paring Knife",
              "Full Set"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "small-appliances",
        "name": "Small Appliances",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Air Fryer",
              "Instant Pot",
              "Blender",
              "Toaster Oven",
              "Food Processor",
              "Rice Cooker",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Espresso Machine",
              "French Press",
              "Pour Over",
              "Pod Machine",
              "Moka Pot"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "stand-mixer",
        "name": "Stand Mixer",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Brand Preference",
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
              "Marble",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Pantry Containers",
              "Spice Rack",
              "Cabinet Organizer",
              "Drawer Dividers",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Sheet Pan",
              "Muffin Tin",
              "Loaf Pan",
              "Cake Pan",
              "Full Set",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "tv",
        "name": "TV",
        "image": "specific-products",
        "fields": [
          {
            "label": "Screen Size",
            "type": "select",
            "value": "",
            "options": [
              "Under 40\"",
              "40-50\"",
              "55\"",
              "65\"",
              "75\"",
              "85\"+"
            ]
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $500",
              "$500-$1000",
              "$1000-$2000",
              "$2000+"
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
              "Floor Speakers",
              "Subwoofer",
              "Full System"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $200",
              "$200-$500",
              "$500-$1000",
              "$1000+"
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
              "PC",
              "Multi-Platform"
            ]
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Console",
              "Monitor",
              "Gaming Chair",
              "Desk",
              "Headset",
              "Controller",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Ecosystem",
            "type": "select",
            "value": "",
            "options": [
              "Amazon Alexa",
              "Google Home",
              "Apple HomeKit",
              "Samsung SmartThings",
              "Other"
            ]
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
        "id": "projector",
        "name": "Projector",
        "image": "specific-products",
        "fields": [
          {
            "label": "Use",
            "type": "select",
            "value": "",
            "options": [
              "Home Theater",
              "Gaming",
              "Outdoor Movies",
              "Portable",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $300",
              "$300-$700",
              "$700-$1500",
              "$1500+"
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
              "Chromecast",
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
        "id": "turntable",
        "name": "Turntable",
        "image": "specific-products",
        "fields": [
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $150",
              "$150-$300",
              "$300-$600",
              "$600+"
            ]
          },
          {
            "label": "Favorite Genres / Artists",
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
        "id": "bedding",
        "name": "Bedding",
        "image": "wish-list",
        "fields": [
          {
            "label": "Bed Size",
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
              "Microfiber",
              "Flannel"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Sleep Position",
            "type": "select",
            "value": "",
            "options": [
              "Side",
              "Back",
              "Stomach",
              "Combo"
            ]
          },
          {
            "label": "Fill",
            "type": "select",
            "value": "",
            "options": [
              "Down",
              "Memory Foam",
              "Latex",
              "Buckwheat",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
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
            "label": "Feel",
            "type": "select",
            "value": "",
            "options": [
              "Soft",
              "Medium",
              "Firm",
              "Extra Firm"
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
              "Latex",
              "Airbed"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Minimalist",
              "Industrial",
              "Floating",
              "Mid-Century",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Bedside Lamp",
              "Floor Lamp",
              "Overhead",
              "LED Strip",
              "Smart Bulbs",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Color",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Sound Type",
            "type": "select",
            "value": "",
            "options": [
              "White Noise",
              "Fan",
              "Nature Sounds",
              "Pink Noise",
              "All"
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
        "id": "towels",
        "name": "Towels",
        "image": "wish-list",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Cotton",
              "Turkish Cotton",
              "Bamboo",
              "Microfiber",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Cotton",
              "Memory Foam",
              "Bamboo",
              "Diatomite",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Solid",
              "Pattern",
              "Fabric",
              "Vinyl",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Toothbrush Holder",
              "Soap Dispenser",
              "Cotton Jar",
              "Tray",
              "Mirror",
              "All"
            ]
          },
          {
            "label": "Finish",
            "type": "select",
            "value": "",
            "options": [
              "Chrome",
              "Matte Black",
              "Gold",
              "Brushed Nickel",
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
        "id": "mirror",
        "name": "Mirror",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Vanity Mirror",
              "Full Length",
              "Medicine Cabinet",
              "Magnifying",
              "Other"
            ]
          },
          {
            "label": "Frame",
            "type": "select",
            "value": "",
            "options": [
              "Frameless",
              "Metal",
              "Wood",
              "LED",
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
        "id": "skincare-storage",
        "name": "Skincare Storage",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Acrylic Organizer",
              "Drawer Insert",
              "Shelf",
              "Under-Sink Organizer",
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
        "id": "robe",
        "name": "Robe",
        "image": "wish-list",
        "fields": [
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
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
              "Terry",
              "Waffle",
              "Silk",
              "Fleece",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "power-tools",
        "name": "Power Tools",
        "image": "specific-products",
        "fields": [
          {
            "label": "Tool",
            "type": "select",
            "value": "",
            "options": [
              "Drill",
              "Circular Saw",
              "Jigsaw",
              "Sander",
              "Router",
              "Impact Driver",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Battery Platform",
            "type": "select",
            "value": "",
            "options": [
              "DeWalt",
              "Milwaukee",
              "Makita",
              "Ryobi",
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
        "id": "hand-tools",
        "name": "Hand Tools",
        "image": "specific-products",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Hammer",
              "Screwdriver Set",
              "Wrench Set",
              "Pliers",
              "Level",
              "Tool Set",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Tool Chest",
              "Cabinet",
              "Wall Mount",
              "Pegboard",
              "Tool Bag",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Folding",
              "Fixed",
              "Adjustable Height",
              "With Vice",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Vacuum",
              "Pressure Washer",
              "Polisher",
              "Detail Kit",
              "Jump Starter",
              "Tire Inflator",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Lawn Mower",
              "Leaf Blower",
              "Trimmer",
              "Edger",
              "Sprinkler",
              "Garden Tools",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Power",
            "type": "select",
            "value": "",
            "options": [
              "Battery",
              "Gas",
              "Electric",
              "Manual"
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
            "type": "select",
            "value": "",
            "options": [
              "Safety Glasses",
              "Ear Protection",
              "Gloves",
              "Dust Mask",
              "First Aid Kit",
              "Fire Extinguisher",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "patio-furniture",
        "name": "Patio Furniture",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Dining Set",
              "Lounge Set",
              "Sectional",
              "Chairs",
              "Bench",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Aluminum",
              "Teak",
              "Wicker",
              "Steel",
              "Plastic",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Kamado",
              "Flat Top"
            ]
          },
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "Portable",
              "Small",
              "Medium",
              "Large",
              "Extra Large"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $200",
              "$200-$500",
              "$500-$1000",
              "$1000+"
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
        "id": "string-lights",
        "name": "String Lights",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Globe",
              "Edison",
              "Fairy",
              "Solar",
              "LED",
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
        "id": "planters",
        "name": "Planters",
        "image": "flowers",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Terracotta",
              "Ceramic",
              "Metal",
              "Wood",
              "Fiberglass",
              "Other"
            ]
          },
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "Small",
              "Medium",
              "Large",
              "Extra Large",
              "Raised Bed"
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
              "Propane",
              "Tabletop",
              "Fire Bowl",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $100",
              "$100-$300",
              "$300-$700",
              "$700+"
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
        "id": "hammock",
        "name": "Hammock",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Rope",
              "Fabric",
              "Camping",
              "Double",
              "Chair Hammock",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "closet",
        "name": "Closet",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Closet System",
              "Hangers",
              "Shoe Rack",
              "Drawer Organizer",
              "Shelf Dividers",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Drawer Dividers",
              "Utensil Tray",
              "Cabinet Organizer",
              "Lazy Susan",
              "Spice Rack",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Under-Sink Organizer",
              "Shower Caddy",
              "Medicine Cabinet",
              "Drawer Insert",
              "Over-Door",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Shoe Rack",
              "Key Hook",
              "Entryway Bench",
              "Coat Rack",
              "Mail Organizer",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Cable Management",
              "Desk Organizer",
              "Monitor Stand",
              "Drawer Unit",
              "Filing Cabinet",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Wall Shelving",
              "Ceiling Storage",
              "Bike Mount",
              "Sports Organizer",
              "Bins & Totes",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Laundry Basket",
              "Drying Rack",
              "Hamper",
              "Folding Station",
              "Shelf",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "sofa",
        "name": "Sofa",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Sectional",
              "Mid-Century",
              "Boho",
              "Minimalist",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Fabric",
              "Velvet",
              "Linen",
              "Leather",
              "Boucle",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
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
            "type": "select",
            "value": "",
            "options": [
              "Upholstered",
              "Platform",
              "Canopy",
              "Storage Bed",
              "Wooden",
              "Metal"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "2-4 Person",
              "4-6 Person",
              "6-8 Person",
              "8+ Person"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Marble",
              "Glass",
              "Rattan",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Vanity Desk",
              "Standing Desk",
              "Simple Writing Desk",
              "L-Shaped",
              "Other"
            ]
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Boho",
              "Minimalist",
              "Mid-Century",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Floating Shelves",
              "Freestanding",
              "Ladder",
              "Cube",
              "Built-In"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Boho",
              "Marble Top",
              "Glass",
              "Ottoman",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Glass",
              "Marble",
              "Rattan",
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
        "id": "accent-chair",
        "name": "Accent Chair",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Accent",
              "Papasan",
              "Barrel",
              "Slipper",
              "Egg Chair",
              "Boucle",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Fabric",
              "Velvet",
              "Boucle",
              "Rattan",
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
        "id": "dresser",
        "name": "Dresser",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Tall",
              "Wide",
              "Mid-Century",
              "Rattan-Front",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "MDF",
              "Rattan",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "cookware",
        "name": "Cookware",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Non-Stick",
              "Cast Iron",
              "Stainless Steel",
              "Ceramic",
              "Enameled"
            ]
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Skillet",
              "Saucepan",
              "Dutch Oven",
              "Full Set",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Chef''s Knife",
              "Santoku",
              "Bread Knife",
              "Paring Knife",
              "Full Set"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "small-appliances",
        "name": "Small Appliances",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Air Fryer",
              "Instant Pot",
              "Blender",
              "Toaster Oven",
              "Food Processor",
              "Waffle Maker",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Espresso Machine",
              "French Press",
              "Pour Over",
              "Pod Machine",
              "Moka Pot"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "stand-mixer",
        "name": "Stand Mixer",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Brand Preference",
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
              "Marble",
              "Plastic",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Pantry Containers",
              "Spice Rack",
              "Cabinet Organizer",
              "Lazy Susan",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Sheet Pan",
              "Muffin Tin",
              "Loaf Pan",
              "Cake Pan",
              "Full Set",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
    "key": "bedroom-female",
    "label": "Bedroom",
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
        "id": "bedding",
        "name": "Bedding",
        "image": "wish-list",
        "fields": [
          {
            "label": "Bed Size",
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
              "Microfiber",
              "Silk"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Sleep Position",
            "type": "select",
            "value": "",
            "options": [
              "Side",
              "Back",
              "Stomach",
              "Combo"
            ]
          },
          {
            "label": "Fill",
            "type": "select",
            "value": "",
            "options": [
              "Down",
              "Memory Foam",
              "Latex",
              "Buckwheat",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
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
            "label": "Feel",
            "type": "select",
            "value": "",
            "options": [
              "Soft",
              "Medium",
              "Firm",
              "Extra Firm"
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Boho",
              "Minimalist",
              "Floating",
              "Rattan",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Bedside Lamp",
              "Floor Lamp",
              "String Lights",
              "LED Strip",
              "Smart Bulbs",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Color",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Sound Type",
            "type": "select",
            "value": "",
            "options": [
              "White Noise",
              "Fan",
              "Nature Sounds",
              "Pink Noise",
              "All"
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
    "key": "bathroom-female",
    "label": "Bathroom",
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
        "id": "towels",
        "name": "Towels",
        "image": "wish-list",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Cotton",
              "Turkish Cotton",
              "Bamboo",
              "Waffle Weave",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Cotton",
              "Memory Foam",
              "Bamboo",
              "Diatomite",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Solid",
              "Floral",
              "Abstract",
              "Waffle",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
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
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Toothbrush Holder",
              "Soap Dispenser",
              "Cotton Jar",
              "Tray",
              "Candle",
              "All"
            ]
          },
          {
            "label": "Finish",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Rose Gold",
              "Marble",
              "Chrome",
              "Matte Black",
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
        "id": "mirror",
        "name": "Mirror",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Vanity Mirror",
              "Full Length",
              "Hollywood Mirror",
              "LED Mirror",
              "Magnifying",
              "Other"
            ]
          },
          {
            "label": "Frame",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Frameless",
              "Wood",
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
        "id": "skincare-storage",
        "name": "Skincare Storage",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Acrylic Organizer",
              "Fridge for Skincare",
              "Drawer Insert",
              "Shelf",
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
              "XL"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Terry",
              "Waffle",
              "Silk",
              "Satin",
              "Fleece",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
    "key": "decor-styling-female",
    "label": "Decor & Styling",
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
        "id": "wall-art",
        "name": "Wall Art",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Abstract",
              "Botanical",
              "Photography",
              "Prints",
              "Canvas",
              "Gallery Wall",
              "Other"
            ]
          },
          {
            "label": "Color Palette",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "throw-pillows",
        "name": "Throw Pillows",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "text",
            "value": ""
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Velvet",
              "Linen",
              "Cotton",
              "Boucle",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "rugs",
        "name": "Rugs",
        "image": "wish-list",
        "fields": [
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "2x3",
              "4x6",
              "5x8",
              "8x10",
              "9x12",
              "Runner",
              "Other"
            ]
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Boho",
              "Persian",
              "Shag",
              "Jute",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "vases",
        "name": "Vases",
        "image": "flowers",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Minimalist",
              "Sculptural",
              "Ceramic",
              "Glass",
              "Terracotta",
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
        "id": "photo-frames",
        "name": "Photo Frames",
        "image": "wish-list",
        "fields": [
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "4x6",
              "5x7",
              "8x10",
              "11x14",
              "Multiple",
              "Gallery Wall Set"
            ]
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Wood",
              "Gold",
              "Silver",
              "Black",
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
        "id": "mirrors",
        "name": "Mirrors",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Full Length",
              "Arch",
              "Round",
              "Sunburst",
              "Gallery",
              "Other"
            ]
          },
          {
            "label": "Frame",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Wood",
              "Rattan",
              "Frameless",
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
        "id": "throw-blankets",
        "name": "Throw Blankets",
        "image": "wish-list",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Knit",
              "Faux Fur",
              "Cashmere",
              "Fleece",
              "Waffle",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
    "key": "candles-fragrance-female",
    "label": "Candles & Fragrance",
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
        "id": "candle",
        "name": "Candle",
        "image": "scent-candles",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "Travel / Votive",
              "Small",
              "Medium",
              "Large",
              "Candle Set"
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
        "id": "reed-diffuser",
        "name": "Reed Diffuser",
        "image": "scent-home",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "wax-melts",
        "name": "Wax Melts",
        "image": "scent-candles",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "room-spray",
        "name": "Room Spray",
        "image": "scent-home",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "incense",
        "name": "Incense",
        "image": "scent-oils",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Sticks",
              "Cones",
              "Coils",
              "Backflow",
              "Other"
            ]
          },
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "linen-spray",
        "name": "Linen Spray",
        "image": "scent-home",
        "fields": [
          {
            "label": "Favorite Scents",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "oil-diffuser",
        "name": "Oil Diffuser",
        "image": "scent-oils",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Ultrasonic",
              "Nebulizing",
              "Heat",
              "Evaporative"
            ]
          },
          {
            "label": "Favorite Oils",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
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
        "id": "patio-furniture",
        "name": "Patio Furniture",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Dining Set",
              "Lounge Set",
              "Bistro Set",
              "Chairs",
              "Bench",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wicker",
              "Teak",
              "Aluminum",
              "Steel",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Globe",
              "Edison",
              "Fairy",
              "Solar",
              "LED",
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
        "id": "planters",
        "name": "Planters",
        "image": "flowers",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Terracotta",
              "Ceramic",
              "Metal",
              "Wood",
              "Fiberglass",
              "Other"
            ]
          },
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "Small",
              "Medium",
              "Large",
              "Extra Large",
              "Raised Bed"
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
              "Propane",
              "Tabletop",
              "Fire Bowl"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Rope",
              "Fabric",
              "Chair Hammock",
              "Hanging Bed",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "garden",
        "name": "Garden",
        "image": "flowers",
        "fields": [
          {
            "label": "Garden Type",
            "type": "select",
            "value": "",
            "options": [
              "Vegetable",
              "Herb",
              "Flower",
              "Container",
              "Raised Bed",
              "Other"
            ]
          },
          {
            "label": "Favorite Plants",
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
        "id": "closet",
        "name": "Closet",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Closet System",
              "Hangers",
              "Shoe Rack",
              "Drawer Organizer",
              "Shelf Dividers",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Drawer Dividers",
              "Utensil Tray",
              "Cabinet Organizer",
              "Lazy Susan",
              "Pantry Containers",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Under-Sink Organizer",
              "Shower Caddy",
              "Vanity Organizer",
              "Drawer Insert",
              "Over-Door",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Shoe Rack",
              "Key Hook",
              "Entryway Bench",
              "Coat Rack",
              "Mail Organizer",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Desk Organizer",
              "Cable Management",
              "Monitor Stand",
              "Filing System",
              "Bulletin Board",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Laundry Basket",
              "Drying Rack",
              "Hamper",
              "Folding Station",
              "Shelf",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "junk-drawer",
        "name": "Junk Drawer",
        "image": "grocery-pantry",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Drawer Organizer",
              "Small Bins",
              "Label Maker",
              "Dividers",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "sofa",
        "name": "Sofa",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Sectional",
              "Mid-Century",
              "Minimalist",
              "Boho",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Fabric",
              "Leather",
              "Velvet",
              "Linen",
              "Boucle",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
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
            "type": "select",
            "value": "",
            "options": [
              "Platform",
              "Upholstered",
              "Metal",
              "Wooden",
              "Storage Bed",
              "Canopy"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "2-4 Person",
              "4-6 Person",
              "6-8 Person",
              "8+ Person"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Glass",
              "Marble",
              "Metal",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Standing Desk",
              "L-Shaped",
              "Simple Writing Desk",
              "Corner Desk",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Metal",
              "Glass",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Floating Shelves",
              "Freestanding",
              "Ladder",
              "Cube",
              "Built-In"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Industrial",
              "Minimalist",
              "Boho",
              "Ottoman",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "Glass",
              "Metal",
              "Marble",
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
        "id": "accent-chair",
        "name": "Accent Chair",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Lounge",
              "Egg Chair",
              "Barrel",
              "Papasan",
              "Slipper",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Fabric",
              "Velvet",
              "Leather",
              "Boucle",
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
        "id": "dresser",
        "name": "Dresser",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Tall",
              "Wide",
              "Mid-Century",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Wood",
              "MDF",
              "Metal",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "cookware",
        "name": "Cookware",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Non-Stick",
              "Cast Iron",
              "Stainless Steel",
              "Carbon Steel",
              "Ceramic"
            ]
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Skillet",
              "Saucepan",
              "Dutch Oven",
              "Wok",
              "Full Set",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Chef''s Knife",
              "Santoku",
              "Bread Knife",
              "Paring Knife",
              "Full Set"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "small-appliances",
        "name": "Small Appliances",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Air Fryer",
              "Instant Pot",
              "Blender",
              "Toaster Oven",
              "Food Processor",
              "Rice Cooker",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
              "Espresso Machine",
              "French Press",
              "Pour Over",
              "Pod Machine",
              "Moka Pot"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $50",
              "$50-$150",
              "$150-$300",
              "$300+"
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
        "id": "stand-mixer",
        "name": "Stand Mixer",
        "image": "grocery-specifics",
        "fields": [
          {
            "label": "Brand Preference",
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
              "Marble",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Pantry Containers",
              "Spice Rack",
              "Cabinet Organizer",
              "Drawer Dividers",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Sheet Pan",
              "Muffin Tin",
              "Loaf Pan",
              "Cake Pan",
              "Full Set",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "tv",
        "name": "TV",
        "image": "specific-products",
        "fields": [
          {
            "label": "Screen Size",
            "type": "select",
            "value": "",
            "options": [
              "Under 40\"",
              "40-50\"",
              "55\"",
              "65\"",
              "75\"",
              "85\"+"
            ]
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $500",
              "$500-$1000",
              "$1000-$2000",
              "$2000+"
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
              "Floor Speakers",
              "Full System"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $200",
              "$200-$500",
              "$500-$1000",
              "$1000+"
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
              "PC",
              "Multi-Platform"
            ]
          },
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Console",
              "Monitor",
              "Gaming Chair",
              "Desk",
              "Headset",
              "Controller",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Ecosystem",
            "type": "select",
            "value": "",
            "options": [
              "Amazon Alexa",
              "Google Home",
              "Apple HomeKit",
              "Samsung SmartThings",
              "Other"
            ]
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
        "id": "projector",
        "name": "Projector",
        "image": "specific-products",
        "fields": [
          {
            "label": "Use",
            "type": "select",
            "value": "",
            "options": [
              "Home Theater",
              "Gaming",
              "Outdoor Movies",
              "Portable",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $300",
              "$300-$700",
              "$700-$1500",
              "$1500+"
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
              "Chromecast",
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
        "id": "turntable",
        "name": "Turntable",
        "image": "specific-products",
        "fields": [
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Budget",
            "type": "select",
            "value": "",
            "options": [
              "Under $150",
              "$150-$300",
              "$300-$600",
              "$600+"
            ]
          },
          {
            "label": "Favorite Genres / Artists",
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
        "id": "bedding",
        "name": "Bedding",
        "image": "wish-list",
        "fields": [
          {
            "label": "Bed Size",
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
              "Microfiber",
              "Silk"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Sleep Position",
            "type": "select",
            "value": "",
            "options": [
              "Side",
              "Back",
              "Stomach",
              "Combo"
            ]
          },
          {
            "label": "Fill",
            "type": "select",
            "value": "",
            "options": [
              "Down",
              "Memory Foam",
              "Latex",
              "Buckwheat",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
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
            "label": "Feel",
            "type": "select",
            "value": "",
            "options": [
              "Soft",
              "Medium",
              "Firm",
              "Extra Firm"
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Minimalist",
              "Industrial",
              "Floating",
              "Mid-Century",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Bedside Lamp",
              "Floor Lamp",
              "LED Strip",
              "String Lights",
              "Smart Bulbs",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
        "image": "wish-list",
        "fields": [
          {
            "label": "Color",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Sound Type",
            "type": "select",
            "value": "",
            "options": [
              "White Noise",
              "Fan",
              "Nature Sounds",
              "Pink Noise",
              "All"
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
        "id": "towels",
        "name": "Towels",
        "image": "wish-list",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Cotton",
              "Turkish Cotton",
              "Bamboo",
              "Microfiber",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Cotton",
              "Memory Foam",
              "Bamboo",
              "Diatomite",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Solid",
              "Pattern",
              "Fabric",
              "Vinyl",
              "Other"
            ]
          },
          {
            "label": "Color Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Toothbrush Holder",
              "Soap Dispenser",
              "Cotton Jar",
              "Tray",
              "Mirror",
              "All"
            ]
          },
          {
            "label": "Finish",
            "type": "select",
            "value": "",
            "options": [
              "Chrome",
              "Matte Black",
              "Gold",
              "Brushed Nickel",
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
        "id": "mirror",
        "name": "Mirror",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Vanity Mirror",
              "Full Length",
              "Round",
              "Arch",
              "LED",
              "Other"
            ]
          },
          {
            "label": "Frame",
            "type": "select",
            "value": "",
            "options": [
              "Frameless",
              "Metal",
              "Wood",
              "Gold",
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
        "id": "skincare-storage",
        "name": "Skincare Storage",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Acrylic Organizer",
              "Drawer Insert",
              "Shelf",
              "Under-Sink Organizer",
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
              "Terry",
              "Waffle",
              "Silk",
              "Satin",
              "Fleece",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
    "key": "decor-styling-nb",
    "label": "Decor & Styling",
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
        "id": "wall-art",
        "name": "Wall Art",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Abstract",
              "Photography",
              "Prints",
              "Canvas",
              "Posters",
              "Gallery Wall",
              "Other"
            ]
          },
          {
            "label": "Color Palette",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "throw-pillows",
        "name": "Throw Pillows",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "text",
            "value": ""
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Velvet",
              "Linen",
              "Cotton",
              "Boucle",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "rugs",
        "name": "Rugs",
        "image": "wish-list",
        "fields": [
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "2x3",
              "4x6",
              "5x8",
              "8x10",
              "9x12",
              "Runner",
              "Other"
            ]
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Minimalist",
              "Boho",
              "Persian",
              "Jute",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "vases",
        "name": "Vases",
        "image": "flowers",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Minimalist",
              "Sculptural",
              "Ceramic",
              "Glass",
              "Terracotta",
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
        "id": "photo-frames",
        "name": "Photo Frames",
        "image": "wish-list",
        "fields": [
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "4x6",
              "5x7",
              "8x10",
              "11x14",
              "Gallery Wall Set"
            ]
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Modern",
              "Wood",
              "Black",
              "Metal",
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
        "id": "mirrors",
        "name": "Mirrors",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Full Length",
              "Round",
              "Arch",
              "Sunburst",
              "Other"
            ]
          },
          {
            "label": "Frame",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Wood",
              "Frameless",
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
        "id": "throw-blankets",
        "name": "Throw Blankets",
        "image": "wish-list",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Knit",
              "Faux Fur",
              "Cashmere",
              "Fleece",
              "Waffle",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "patio-furniture",
        "name": "Patio Furniture",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Dining Set",
              "Lounge Set",
              "Sectional",
              "Chairs",
              "Bench",
              "Other"
            ]
          },
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Aluminum",
              "Teak",
              "Wicker",
              "Steel",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "type": "select",
            "value": "",
            "options": [
              "Globe",
              "Edison",
              "Fairy",
              "Solar",
              "LED",
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
        "id": "planters",
        "name": "Planters",
        "image": "flowers",
        "fields": [
          {
            "label": "Material",
            "type": "select",
            "value": "",
            "options": [
              "Terracotta",
              "Ceramic",
              "Metal",
              "Wood",
              "Fiberglass",
              "Other"
            ]
          },
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "Small",
              "Medium",
              "Large",
              "Extra Large",
              "Raised Bed"
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
              "Propane",
              "Tabletop",
              "Fire Bowl"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Rope",
              "Fabric",
              "Camping",
              "Chair Hammock",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "garden",
        "name": "Garden",
        "image": "flowers",
        "fields": [
          {
            "label": "Garden Type",
            "type": "select",
            "value": "",
            "options": [
              "Vegetable",
              "Herb",
              "Flower",
              "Container",
              "Raised Bed",
              "Other"
            ]
          },
          {
            "label": "Favorite Plants",
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
        "id": "closet",
        "name": "Closet",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Closet System",
              "Hangers",
              "Shoe Rack",
              "Drawer Organizer",
              "Shelf Dividers",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Drawer Dividers",
              "Utensil Tray",
              "Cabinet Organizer",
              "Lazy Susan",
              "Spice Rack",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Under-Sink Organizer",
              "Shower Caddy",
              "Medicine Cabinet",
              "Drawer Insert",
              "Over-Door",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Shoe Rack",
              "Key Hook",
              "Entryway Bench",
              "Coat Rack",
              "Mail Organizer",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Cable Management",
              "Desk Organizer",
              "Monitor Stand",
              "Drawer Unit",
              "Filing Cabinet",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Laundry Basket",
              "Drying Rack",
              "Hamper",
              "Folding Station",
              "Shelf",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
            "type": "text",
            "value": ""
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
            "label": "Item",
            "type": "select",
            "value": "",
            "options": [
              "Wall Shelving",
              "Ceiling Storage",
              "Bike Mount",
              "Sports Organizer",
              "Bins & Totes",
              "Other"
            ]
          },
          {
            "label": "Brand Preference",
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
        "id": "action",
        "name": "Action",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "comedy",
        "name": "Comedy",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "drama",
        "name": "Drama",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "horror",
        "name": "Horror",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Subgenre",
            "type": "select",
            "value": "",
            "options": [
              "Slasher",
              "Psychological",
              "Supernatural",
              "Found Footage",
              "Comedy Horror",
              "All"
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
        "id": "sci-fi",
        "name": "Sci-Fi",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Favorite Docs",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "True Crime",
              "Sports",
              "Nature",
              "History",
              "Music",
              "Tech",
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
        "id": "thriller",
        "name": "Thriller",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "Shonen",
              "Shojo",
              "Seinen",
              "Isekai",
              "Mecha",
              "Slice of Life",
              "Other"
            ]
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Crunchyroll",
              "Netflix",
              "Funimation",
              "Hulu",
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
            "label": "All-Time Favorites",
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
            "label": "Preferred Venue Size",
            "type": "select",
            "value": "",
            "options": [
              "Small Club",
              "Mid-Size Venue",
              "Arena",
              "Festival",
              "Intimate / Acoustic",
              "Any"
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
        "id": "playlists",
        "name": "Playlists",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Playlist Link",
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
              "YouTube Music",
              "Tidal",
              "Amazon Music",
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
        "id": "vinyl-collecting",
        "name": "Vinyl / Collecting",
        "image": "specific-products",
        "fields": [
          {
            "label": "Do You Collect Vinyl",
            "type": "select",
            "value": "",
            "options": [
              "Yes",
              "No",
              "Want to Start"
            ]
          },
          {
            "label": "Favorite Records",
            "type": "text",
            "value": ""
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
            "label": "Favorite Podcasts",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "True Crime",
              "Comedy",
              "Sports",
              "Business",
              "Tech",
              "History",
              "Science",
              "Other"
            ]
          },
          {
            "label": "Platform",
            "type": "select",
            "value": "",
            "options": [
              "Spotify",
              "Apple Podcasts",
              "Google Podcasts",
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
            "label": "Favorite Local Venue",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite City for Music",
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
        "id": "favorite-teams",
        "name": "Favorite Teams",
        "image": "event-sports",
        "fields": [
          {
            "label": "NFL Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "NBA Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "MLB Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "NHL Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "Soccer Team",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
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
            "label": "Sports You Play Fantasy",
            "type": "text",
            "value": ""
          },
          {
            "label": "Platform",
            "type": "select",
            "value": "",
            "options": [
              "ESPN",
              "Yahoo",
              "DraftKings",
              "FanDuel",
              "Sleeper",
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
            "label": "Favorite Stadium / Arena",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Seat",
            "type": "select",
            "value": "",
            "options": [
              "Field / Floor",
              "Lower Bowl",
              "Upper Bowl",
              "Suite",
              "Any"
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
        "id": "sports-to-play",
        "name": "Sports to Play",
        "image": "event-sports",
        "fields": [
          {
            "label": "Sports You Play",
            "type": "text",
            "value": ""
          },
          {
            "label": "Skill Level",
            "type": "select",
            "value": "",
            "options": [
              "Beginner",
              "Recreational",
              "Competitive",
              "Elite"
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
            "type": "select",
            "value": "",
            "options": [
              "Weightlifting",
              "CrossFit",
              "Running",
              "Cycling",
              "Swimming",
              "HIIT",
              "Yoga",
              "Other"
            ]
          },
          {
            "label": "Gym or Home",
            "type": "select",
            "value": "",
            "options": [
              "Gym",
              "Home",
              "Both",
              "Outdoors"
            ]
          },
          {
            "label": "Favorite Gym",
            "type": "text",
            "value": ""
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
              "Kickboxing",
              "Other"
            ]
          },
          {
            "label": "Participant or Fan",
            "type": "select",
            "value": "",
            "options": [
              "Participant",
              "Fan",
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
        "id": "extreme-sports",
        "name": "Extreme Sports",
        "image": "travel-preferences",
        "fields": [
          {
            "label": "Sport",
            "type": "select",
            "value": "",
            "options": [
              "Snowboarding",
              "Surfing",
              "Skateboarding",
              "BMX",
              "Rock Climbing",
              "Skydiving",
              "Other"
            ]
          },
          {
            "label": "Skill Level",
            "type": "select",
            "value": "",
            "options": [
              "Beginner",
              "Intermediate",
              "Advanced",
              "Pro"
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
        "id": "console",
        "name": "Console Gaming",
        "image": "specific-products",
        "fields": [
          {
            "label": "Platform",
            "type": "select",
            "value": "",
            "options": [
              "PlayStation",
              "Xbox",
              "Nintendo Switch",
              "Multi-Platform"
            ]
          },
          {
            "label": "Favorite Games",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "FPS",
              "RPG",
              "Sports",
              "Fighting",
              "Racing",
              "Adventure",
              "Strategy",
              "Other"
            ]
          },
          {
            "label": "Gamertag",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "FPS",
              "RTS",
              "MOBA",
              "RPG",
              "Simulation",
              "Other"
            ]
          },
          {
            "label": "Steam / Epic Username",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "Puzzle",
              "Strategy",
              "Battle Royale",
              "RPG",
              "Casual",
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "Strategy",
              "Party",
              "Cooperative",
              "Word Games",
              "Card Games",
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Trading Card Games",
              "Poker",
              "UNO",
              "Magic: The Gathering",
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
        "id": "vr",
        "name": "VR Gaming",
        "image": "specific-products",
        "fields": [
          {
            "label": "Headset",
            "type": "select",
            "value": "",
            "options": [
              "Meta Quest",
              "PlayStation VR",
              "Valve Index",
              "None Yet",
              "Other"
            ]
          },
          {
            "label": "Favorite VR Games",
            "type": "text",
            "value": ""
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
            "label": "Favorite Era",
            "type": "select",
            "value": "",
            "options": [
              "NES / SNES",
              "N64",
              "PlayStation 1 & 2",
              "Sega Genesis",
              "Arcade",
              "Other"
            ]
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
        "id": "fiction",
        "name": "Fiction",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Authors",
            "type": "text",
            "value": ""
          },
          {
            "label": "Subgenre",
            "type": "select",
            "value": "",
            "options": [
              "Thriller",
              "Sci-Fi",
              "Fantasy",
              "Literary Fiction",
              "Historical Fiction",
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
        "id": "non-fiction",
        "name": "Non-Fiction",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "History",
              "Science",
              "Politics",
              "Sports",
              "True Crime",
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
        "id": "self-help",
        "name": "Self-Help",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Focus Area",
            "type": "select",
            "value": "",
            "options": [
              "Productivity",
              "Finance",
              "Mindset",
              "Health",
              "Relationships",
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
        "id": "business",
        "name": "Business",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Topics",
            "type": "select",
            "value": "",
            "options": [
              "Entrepreneurship",
              "Investing",
              "Leadership",
              "Marketing",
              "Finance",
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
        "id": "history",
        "name": "History",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Era / Topic",
            "type": "text",
            "value": ""
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
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Podcasts",
            "type": "text",
            "value": ""
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
              "Libro.fm",
              "Spotify",
              "Apple Books",
              "Other"
            ]
          },
          {
            "label": "Favorite Titles",
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
        "id": "outdoors",
        "name": "Outdoors",
        "image": "travel-preferences",
        "fields": [
          {
            "label": "Activities",
            "type": "select",
            "value": "",
            "options": [
              "Hiking",
              "Camping",
              "Fishing",
              "Hunting",
              "Kayaking",
              "Rock Climbing",
              "Other"
            ]
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
        "id": "photography",
        "name": "Photography",
        "image": "specific-products",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Portrait",
              "Landscape",
              "Street",
              "Sports",
              "Wildlife",
              "Film",
              "Other"
            ]
          },
          {
            "label": "Camera",
            "type": "text",
            "value": ""
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
        "image": "meal-dinner",
        "fields": [
          {
            "label": "Favorite Cuisines to Cook",
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
              "Chef-Level"
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
              "Road Trip",
              "Backpacking",
              "Luxury",
              "Cultural",
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
        "id": "collecting",
        "name": "Collecting",
        "image": "specific-products",
        "fields": [
          {
            "label": "What You Collect",
            "type": "text",
            "value": ""
          },
          {
            "label": "Most Prized Item",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Woodworking",
              "Home Improvement",
              "Electronics",
              "3D Printing",
              "Other"
            ]
          },
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Car Enthusiast",
              "Motorcycles",
              "Racing",
              "Detailing",
              "Off-Road",
              "Other"
            ]
          },
          {
            "label": "Dream Car",
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
        "id": "bar-scene",
        "name": "Bar Scene",
        "image": "favorite-restaurants",
        "fields": [
          {
            "label": "Favorite Bar Type",
            "type": "select",
            "value": "",
            "options": [
              "Sports Bar",
              "Craft Beer",
              "Cocktail Bar",
              "Dive Bar",
              "Wine Bar",
              "Rooftop",
              "Other"
            ]
          },
          {
            "label": "Favorite Drink",
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
        "id": "clubs",
        "name": "Clubs",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Music Preference",
            "type": "select",
            "value": "",
            "options": [
              "Hip-Hop",
              "House / EDM",
              "Latin",
              "Top 40",
              "R&B",
              "Other"
            ]
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
        "id": "live-music",
        "name": "Live Music",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Preferred Genre",
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
        "id": "karaoke",
        "name": "Karaoke",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Go-To Song",
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
            "label": "Format",
            "type": "select",
            "value": "",
            "options": [
              "Board Games",
              "Card Games",
              "Video Games",
              "Trivia",
              "All"
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
        "id": "dinner-parties",
        "name": "Dinner Parties",
        "image": "favorite-restaurants",
        "fields": [
          {
            "label": "Host or Guest",
            "type": "select",
            "value": "",
            "options": [
              "Love to Host",
              "Love to Attend",
              "Both"
            ]
          },
          {
            "label": "Favorite Cuisine to Serve",
            "type": "text",
            "value": ""
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
            "label": "Favorite Drink",
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
        "id": "stand-up",
        "name": "Stand-Up",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Comedians",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Observational",
              "Dark",
              "Political",
              "Self-Deprecating",
              "Storytelling",
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
        "id": "improv",
        "name": "Improv",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Shows / Groups",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Broadway",
              "Off-Broadway",
              "Local Theater",
              "Musical",
              "Drama",
              "Comedy",
              "Other"
            ]
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Participant or Audience",
            "type": "select",
            "value": "",
            "options": [
              "Participant",
              "Audience",
              "Both"
            ]
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
            "label": "All-Time Favorites",
            "type": "text",
            "value": ""
          },
          {
            "label": "Currently Following",
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
        "id": "romance",
        "name": "Romance",
        "image": "anniversary-gifts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "comedy",
        "name": "Comedy",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "drama",
        "name": "Drama",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "thriller",
        "name": "Thriller",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Favorite Docs",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "True Crime",
              "Nature",
              "Fashion",
              "History",
              "Social Justice",
              "Food",
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
        "id": "horror",
        "name": "Horror",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Subgenre",
            "type": "select",
            "value": "",
            "options": [
              "Psychological",
              "Supernatural",
              "Slasher",
              "Comedy Horror",
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
        "id": "sci-fi",
        "name": "Sci-Fi",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "reality-tv",
        "name": "Reality TV",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Genre",
            "type": "select",
            "value": "",
            "options": [
              "Dating",
              "Competition",
              "Lifestyle",
              "Travel",
              "True Crime",
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
            "label": "All-Time Favorites",
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
            "label": "Preferred Venue Size",
            "type": "select",
            "value": "",
            "options": [
              "Small Club",
              "Mid-Size Venue",
              "Arena",
              "Festival",
              "Intimate / Acoustic",
              "Any"
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
        "id": "playlists",
        "name": "Playlists",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Playlist Link",
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
              "YouTube Music",
              "Tidal",
              "Amazon Music",
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
        "id": "podcasts",
        "name": "Podcasts",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Podcasts",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "True Crime",
              "Pop Culture",
              "Self-Help",
              "Comedy",
              "Fashion",
              "Wellness",
              "Other"
            ]
          },
          {
            "label": "Platform",
            "type": "select",
            "value": "",
            "options": [
              "Spotify",
              "Apple Podcasts",
              "Google Podcasts",
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
        "id": "vinyl-collecting",
        "name": "Vinyl / Collecting",
        "image": "specific-products",
        "fields": [
          {
            "label": "Do You Collect Vinyl",
            "type": "select",
            "value": "",
            "options": [
              "Yes",
              "No",
              "Want to Start"
            ]
          },
          {
            "label": "Favorite Records",
            "type": "text",
            "value": ""
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
            "label": "Favorite Local Venue",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite City for Music",
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
    "key": "books-podcasts-female",
    "label": "Books & Podcasts",
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
        "id": "fiction",
        "name": "Fiction",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Authors",
            "type": "text",
            "value": ""
          },
          {
            "label": "Subgenre",
            "type": "select",
            "value": "",
            "options": [
              "Romance",
              "Thriller",
              "Fantasy",
              "Literary Fiction",
              "Historical Fiction",
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
        "id": "non-fiction",
        "name": "Non-Fiction",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "Memoir",
              "Self-Help",
              "Health",
              "True Crime",
              "Social Issues",
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
        "id": "self-help",
        "name": "Self-Help",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Focus Area",
            "type": "select",
            "value": "",
            "options": [
              "Confidence",
              "Finance",
              "Mindset",
              "Health",
              "Relationships",
              "Spirituality",
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
        "id": "true-crime",
        "name": "True Crime",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Podcasts",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "book-clubs",
        "name": "Book Clubs",
        "image": "wish-list",
        "fields": [
          {
            "label": "In a Book Club",
            "type": "select",
            "value": "",
            "options": [
              "Yes",
              "No",
              "Want to Join"
            ]
          },
          {
            "label": "Recent Reads",
            "type": "text",
            "value": ""
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
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Era / Topic",
            "type": "text",
            "value": ""
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
              "Libro.fm",
              "Spotify",
              "Apple Books",
              "Other"
            ]
          },
          {
            "label": "Favorite Titles",
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
    "key": "hobbies-female",
    "label": "Hobbies",
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
        "id": "art-painting",
        "name": "Art & Painting",
        "image": "event-theater",
        "fields": [
          {
            "label": "Medium",
            "type": "select",
            "value": "",
            "options": [
              "Watercolor",
              "Oil",
              "Acrylic",
              "Sketching",
              "Digital",
              "Mixed Media",
              "Other"
            ]
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
        "id": "photography",
        "name": "Photography",
        "image": "specific-products",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Portrait",
              "Travel",
              "Food",
              "Nature",
              "Film",
              "Street",
              "Other"
            ]
          },
          {
            "label": "Camera",
            "type": "text",
            "value": ""
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
        "image": "meal-dinner",
        "fields": [
          {
            "label": "Favorite Cuisines to Cook",
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
              "Chef-Level"
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
              "Beach",
              "Cultural",
              "City Break",
              "Luxury",
              "Backpacking",
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
        "id": "diy-crafts",
        "name": "DIY & Crafts",
        "image": "specific-products",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Candle Making",
              "Pottery",
              "Sewing",
              "Knitting",
              "Jewelry Making",
              "Scrapbooking",
              "Other"
            ]
          },
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
        "id": "collecting",
        "name": "Collecting",
        "image": "specific-products",
        "fields": [
          {
            "label": "What You Collect",
            "type": "text",
            "value": ""
          },
          {
            "label": "Most Prized Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "gardening",
        "name": "Gardening",
        "image": "flowers",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Flower Garden",
              "Herb Garden",
              "Vegetable Garden",
              "Indoor Plants",
              "Container Garden",
              "Other"
            ]
          },
          {
            "label": "Favorite Plants",
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
    "key": "nightlife-social-female",
    "label": "Nightlife & Social",
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
        "id": "bar-scene",
        "name": "Bar Scene",
        "image": "favorite-restaurants",
        "fields": [
          {
            "label": "Favorite Bar Type",
            "type": "select",
            "value": "",
            "options": [
              "Wine Bar",
              "Cocktail Bar",
              "Rooftop",
              "Speakeasy",
              "Sports Bar",
              "Dive Bar",
              "Other"
            ]
          },
          {
            "label": "Favorite Drink",
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
        "id": "clubs",
        "name": "Clubs",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Music Preference",
            "type": "select",
            "value": "",
            "options": [
              "Pop",
              "House / EDM",
              "Hip-Hop",
              "Latin",
              "R&B",
              "Other"
            ]
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
        "id": "live-music",
        "name": "Live Music",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Preferred Genre",
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
        "id": "karaoke",
        "name": "Karaoke",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Go-To Song",
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
            "label": "Format",
            "type": "select",
            "value": "",
            "options": [
              "Board Games",
              "Card Games",
              "Trivia",
              "Party Games",
              "All"
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
        "id": "dinner-parties",
        "name": "Dinner Parties",
        "image": "favorite-restaurants",
        "fields": [
          {
            "label": "Host or Guest",
            "type": "select",
            "value": "",
            "options": [
              "Love to Host",
              "Love to Attend",
              "Both"
            ]
          },
          {
            "label": "Favorite Cuisine to Serve",
            "type": "text",
            "value": ""
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
            "label": "Favorite Drink",
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
    "key": "comedy-live-female",
    "label": "Comedy & Live Events",
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
        "id": "stand-up",
        "name": "Stand-Up",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Comedians",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Observational",
              "Self-Deprecating",
              "Political",
              "Storytelling",
              "Dark",
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
        "id": "improv",
        "name": "Improv",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Shows / Groups",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Broadway",
              "Musical",
              "Drama",
              "Comedy",
              "Ballet",
              "Opera",
              "Other"
            ]
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Participant or Audience",
            "type": "select",
            "value": "",
            "options": [
              "Participant",
              "Audience",
              "Both"
            ]
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
            "label": "All-Time Favorites",
            "type": "text",
            "value": ""
          },
          {
            "label": "Currently Following",
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
    "key": "arts-culture-female",
    "label": "Arts & Culture",
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
        "id": "museums",
        "name": "Museums",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Type",
            "type": "select",
            "value": "",
            "options": [
              "Art Museum",
              "History Museum",
              "Science Museum",
              "Natural History",
              "Interactive",
              "Other"
            ]
          },
          {
            "label": "Favorite Museum",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "galleries",
        "name": "Galleries",
        "image": "event-theater",
        "fields": [
          {
            "label": "Art Style",
            "type": "select",
            "value": "",
            "options": [
              "Contemporary",
              "Classical",
              "Photography",
              "Abstract",
              "Street Art",
              "Other"
            ]
          },
          {
            "label": "Favorite Gallery",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "theater",
        "name": "Theater",
        "image": "event-theater",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Broadway",
              "Musical",
              "Drama",
              "Comedy",
              "Experimental",
              "Other"
            ]
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "film-festivals",
        "name": "Film Festivals",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Festival",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Genre",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "poetry",
        "name": "Poetry",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Poets",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Collections",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "dance",
        "name": "Dance",
        "image": "event-theater",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Ballet",
              "Contemporary",
              "Latin",
              "Hip-Hop",
              "Ballroom",
              "Other"
            ]
          },
          {
            "label": "Participant or Fan",
            "type": "select",
            "value": "",
            "options": [
              "Participant",
              "Fan",
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
        "id": "cultural-events",
        "name": "Cultural Events",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Events",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Festivals",
              "Food Events",
              "Cultural Fairs",
              "Art Walks",
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
  },
  {
    "key": "wellness-mindfulness-female",
    "label": "Wellness & Mindfulness",
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
        "id": "meditation",
        "name": "Meditation",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Guided",
              "Silent",
              "Transcendental",
              "Loving-Kindness",
              "Body Scan",
              "Other"
            ]
          },
          {
            "label": "App / Platform",
            "type": "select",
            "value": "",
            "options": [
              "Calm",
              "Headspace",
              "Insight Timer",
              "Ten Percent Happier",
              "Other"
            ]
          },
          {
            "label": "Frequency",
            "type": "select",
            "value": "",
            "options": [
              "Daily",
              "Few Times a Week",
              "Weekly",
              "Occasionally"
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
        "id": "yoga",
        "name": "Yoga",
        "image": "clothing-activewear",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Vinyasa",
              "Hatha",
              "Yin",
              "Hot Yoga",
              "Restorative",
              "Kundalini",
              "Other"
            ]
          },
          {
            "label": "Favorite Studio",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "journaling",
        "name": "Journaling",
        "image": "wish-list",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Gratitude",
              "Bullet Journal",
              "Stream of Consciousness",
              "Prompted",
              "Art Journal",
              "Other"
            ]
          },
          {
            "label": "Favorite Brand / Journal",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "reading",
        "name": "Reading",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Genres",
            "type": "text",
            "value": ""
          },
          {
            "label": "Reading Goal",
            "type": "select",
            "value": "",
            "options": [
              "1-10 books/year",
              "10-25 books/year",
              "25-50 books/year",
              "50+ books/year"
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
        "id": "self-care",
        "name": "Self-Care",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Routine",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorites",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "sound-baths",
        "name": "Sound Baths",
        "image": "wish-list",
        "fields": [
          {
            "label": "Experience Level",
            "type": "select",
            "value": "",
            "options": [
              "Never Tried",
              "Tried Once",
              "Regular",
              "At Home Practice"
            ]
          },
          {
            "label": "Favorite Studio",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "breathwork",
        "name": "Breathwork",
        "image": "wish-list",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Wim Hof",
              "Box Breathing",
              "4-7-8",
              "Holotropic",
              "Other"
            ]
          },
          {
            "label": "App / Platform",
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
        "id": "action",
        "name": "Action",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "comedy",
        "name": "Comedy",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "drama",
        "name": "Drama",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Netflix",
              "HBO Max",
              "Disney+",
              "Hulu",
              "Prime",
              "Theater",
              "All"
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
        "id": "thriller",
        "name": "Thriller",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Favorite Docs",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "True Crime",
              "Nature",
              "History",
              "Social Justice",
              "Science",
              "Music",
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
        "id": "horror",
        "name": "Horror",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Movies",
            "type": "text",
            "value": ""
          },
          {
            "label": "Subgenre",
            "type": "select",
            "value": "",
            "options": [
              "Psychological",
              "Supernatural",
              "Slasher",
              "Comedy Horror",
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "Shonen",
              "Shojo",
              "Seinen",
              "Isekai",
              "Slice of Life",
              "Other"
            ]
          },
          {
            "label": "Where You Watch",
            "type": "select",
            "value": "",
            "options": [
              "Crunchyroll",
              "Netflix",
              "Funimation",
              "Hulu",
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
            "label": "All-Time Favorites",
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
            "label": "Preferred Venue Size",
            "type": "select",
            "value": "",
            "options": [
              "Small Club",
              "Mid-Size Venue",
              "Arena",
              "Festival",
              "Intimate / Acoustic",
              "Any"
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
        "id": "playlists",
        "name": "Playlists",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Playlist Link",
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
              "YouTube Music",
              "Tidal",
              "Amazon Music",
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
        "id": "podcasts",
        "name": "Podcasts",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Podcasts",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "True Crime",
              "Comedy",
              "Culture",
              "Self-Help",
              "Tech",
              "History",
              "Other"
            ]
          },
          {
            "label": "Platform",
            "type": "select",
            "value": "",
            "options": [
              "Spotify",
              "Apple Podcasts",
              "Google Podcasts",
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
        "id": "vinyl-collecting",
        "name": "Vinyl / Collecting",
        "image": "specific-products",
        "fields": [
          {
            "label": "Do You Collect Vinyl",
            "type": "select",
            "value": "",
            "options": [
              "Yes",
              "No",
              "Want to Start"
            ]
          },
          {
            "label": "Favorite Records",
            "type": "text",
            "value": ""
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
            "label": "Favorite Local Venue",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite City for Music",
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
    "key": "books-podcasts-nb",
    "label": "Books & Podcasts",
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
        "id": "fiction",
        "name": "Fiction",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Authors",
            "type": "text",
            "value": ""
          },
          {
            "label": "Subgenre",
            "type": "select",
            "value": "",
            "options": [
              "Sci-Fi",
              "Fantasy",
              "Thriller",
              "Literary Fiction",
              "Historical Fiction",
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
        "id": "non-fiction",
        "name": "Non-Fiction",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Topics",
            "type": "select",
            "value": "",
            "options": [
              "History",
              "Science",
              "Politics",
              "Memoir",
              "Social Issues",
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
        "id": "self-help",
        "name": "Self-Help",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Focus Area",
            "type": "select",
            "value": "",
            "options": [
              "Productivity",
              "Finance",
              "Mindset",
              "Health",
              "Relationships",
              "Identity",
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
        "id": "true-crime",
        "name": "True Crime",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Podcasts",
            "type": "text",
            "value": ""
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
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Era / Topic",
            "type": "text",
            "value": ""
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
            "label": "Favorite Books",
            "type": "text",
            "value": ""
          },
          {
            "label": "Topics",
            "type": "select",
            "value": "",
            "options": [
              "Entrepreneurship",
              "Investing",
              "Leadership",
              "Marketing",
              "Finance",
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
              "Libro.fm",
              "Spotify",
              "Apple Books",
              "Other"
            ]
          },
          {
            "label": "Favorite Titles",
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
        "id": "console",
        "name": "Console Gaming",
        "image": "specific-products",
        "fields": [
          {
            "label": "Platform",
            "type": "select",
            "value": "",
            "options": [
              "PlayStation",
              "Xbox",
              "Nintendo Switch",
              "Multi-Platform"
            ]
          },
          {
            "label": "Favorite Games",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "RPG",
              "Adventure",
              "Indie",
              "FPS",
              "Strategy",
              "Other"
            ]
          },
          {
            "label": "Gamertag",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "RPG",
              "Simulation",
              "Indie",
              "Strategy",
              "Other"
            ]
          },
          {
            "label": "Steam / Epic Username",
            "type": "text",
            "value": ""
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "Puzzle",
              "Strategy",
              "RPG",
              "Casual",
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
            "label": "Favorite Genres",
            "type": "select",
            "value": "",
            "options": [
              "Strategy",
              "Cooperative",
              "Party",
              "Word Games",
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Trading Card Games",
              "Poker",
              "UNO",
              "Magic: The Gathering",
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
        "id": "vr",
        "name": "VR Gaming",
        "image": "specific-products",
        "fields": [
          {
            "label": "Headset",
            "type": "select",
            "value": "",
            "options": [
              "Meta Quest",
              "PlayStation VR",
              "Valve Index",
              "None Yet",
              "Other"
            ]
          },
          {
            "label": "Favorite VR Games",
            "type": "text",
            "value": ""
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
            "label": "Favorite Era",
            "type": "select",
            "value": "",
            "options": [
              "NES / SNES",
              "N64",
              "PlayStation 1 & 2",
              "Sega Genesis",
              "Arcade",
              "Other"
            ]
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
  },
  {
    "key": "hobbies-nb",
    "label": "Hobbies",
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
        "id": "art-painting",
        "name": "Art & Painting",
        "image": "event-theater",
        "fields": [
          {
            "label": "Medium",
            "type": "select",
            "value": "",
            "options": [
              "Watercolor",
              "Oil",
              "Acrylic",
              "Sketching",
              "Digital",
              "Mixed Media",
              "Other"
            ]
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
        "id": "photography",
        "name": "Photography",
        "image": "specific-products",
        "fields": [
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Portrait",
              "Landscape",
              "Street",
              "Film",
              "Nature",
              "Other"
            ]
          },
          {
            "label": "Camera",
            "type": "text",
            "value": ""
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
        "image": "meal-dinner",
        "fields": [
          {
            "label": "Favorite Cuisines to Cook",
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
              "Chef-Level"
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
              "Cultural",
              "City Break",
              "Beach",
              "Backpacking",
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
        "id": "diy-crafts",
        "name": "DIY & Crafts",
        "image": "specific-products",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Woodworking",
              "Pottery",
              "Sewing",
              "3D Printing",
              "Electronics",
              "Other"
            ]
          },
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
        "id": "collecting",
        "name": "Collecting",
        "image": "specific-products",
        "fields": [
          {
            "label": "What You Collect",
            "type": "text",
            "value": ""
          },
          {
            "label": "Most Prized Item",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "outdoors",
        "name": "Outdoors",
        "image": "travel-preferences",
        "fields": [
          {
            "label": "Activities",
            "type": "select",
            "value": "",
            "options": [
              "Hiking",
              "Camping",
              "Kayaking",
              "Rock Climbing",
              "Cycling",
              "Other"
            ]
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
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "bar-scene",
        "name": "Bar Scene",
        "image": "favorite-restaurants",
        "fields": [
          {
            "label": "Favorite Bar Type",
            "type": "select",
            "value": "",
            "options": [
              "Cocktail Bar",
              "Wine Bar",
              "Craft Beer",
              "Rooftop",
              "Dive Bar",
              "Speakeasy",
              "Other"
            ]
          },
          {
            "label": "Favorite Drink",
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
        "id": "clubs",
        "name": "Clubs",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Music Preference",
            "type": "select",
            "value": "",
            "options": [
              "House / EDM",
              "Hip-Hop",
              "Pop",
              "Latin",
              "R&B",
              "Other"
            ]
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
        "id": "live-music",
        "name": "Live Music",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Preferred Genre",
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
        "id": "karaoke",
        "name": "Karaoke",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Go-To Song",
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
            "label": "Format",
            "type": "select",
            "value": "",
            "options": [
              "Board Games",
              "Card Games",
              "Video Games",
              "Trivia",
              "Party Games",
              "All"
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
        "id": "dinner-parties",
        "name": "Dinner Parties",
        "image": "favorite-restaurants",
        "fields": [
          {
            "label": "Host or Guest",
            "type": "select",
            "value": "",
            "options": [
              "Love to Host",
              "Love to Attend",
              "Both"
            ]
          },
          {
            "label": "Favorite Cuisine to Serve",
            "type": "text",
            "value": ""
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
            "label": "Favorite Drink",
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
    "key": "arts-culture-nb",
    "label": "Arts & Culture",
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
        "id": "museums",
        "name": "Museums",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Type",
            "type": "select",
            "value": "",
            "options": [
              "Art Museum",
              "History Museum",
              "Science Museum",
              "Natural History",
              "Interactive",
              "Other"
            ]
          },
          {
            "label": "Favorite Museum",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "galleries",
        "name": "Galleries",
        "image": "event-theater",
        "fields": [
          {
            "label": "Art Style",
            "type": "select",
            "value": "",
            "options": [
              "Contemporary",
              "Abstract",
              "Photography",
              "Street Art",
              "Classical",
              "Other"
            ]
          },
          {
            "label": "Favorite Gallery",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "theater",
        "name": "Theater",
        "image": "event-theater",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Broadway",
              "Musical",
              "Drama",
              "Comedy",
              "Experimental",
              "Other"
            ]
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "film-festivals",
        "name": "Film Festivals",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Festival",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Genre",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "poetry",
        "name": "Poetry",
        "image": "wish-list",
        "fields": [
          {
            "label": "Favorite Poets",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Collections",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "dance",
        "name": "Dance",
        "image": "event-theater",
        "fields": [
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Contemporary",
              "Hip-Hop",
              "Ballet",
              "Latin",
              "Ballroom",
              "Other"
            ]
          },
          {
            "label": "Participant or Fan",
            "type": "select",
            "value": "",
            "options": [
              "Participant",
              "Fan",
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
        "id": "cultural-events",
        "name": "Cultural Events",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Events",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Festivals",
              "Food Events",
              "Cultural Fairs",
              "Art Walks",
              "Pride Events",
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
        "id": "stand-up",
        "name": "Stand-Up",
        "image": "event-concerts",
        "fields": [
          {
            "label": "Favorite Comedians",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Observational",
              "Dark",
              "Political",
              "Self-Deprecating",
              "Storytelling",
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
        "id": "improv",
        "name": "Improv",
        "image": "event-theater",
        "fields": [
          {
            "label": "Favorite Shows / Groups",
            "type": "text",
            "value": ""
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
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Broadway",
              "Musical",
              "Drama",
              "Comedy",
              "Experimental",
              "Other"
            ]
          },
          {
            "label": "Favorite Shows",
            "type": "text",
            "value": ""
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
            "label": "Participant or Audience",
            "type": "select",
            "value": "",
            "options": [
              "Participant",
              "Audience",
              "Both"
            ]
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
            "label": "All-Time Favorites",
            "type": "text",
            "value": ""
          },
          {
            "label": "Currently Following",
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
];


export const ROWS_BY_SECTION: Record<string, CategoryRegistryRow[]> = {
  'style-fit': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'style-fit'),
  'food-drink': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'food-drink'),
  'gifts-wishlist': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'gifts-wishlist'),
  'home-living': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'home-living'),
  'entertainment': CATEGORY_REGISTRY_SEED.filter(r => r.section === 'entertainment'),
};