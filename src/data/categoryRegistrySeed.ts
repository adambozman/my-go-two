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
    "key": "clothing-male",
    "label": "Clothing",
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
        "image": "clothing-tops",
        "products": [
          {
            "id": "tshirt",
            "name": "T-Shirt",
            "image": "clothing-tops",
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
                  "Relaxed",
                  "Oversized"
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
            "id": "button-up",
            "name": "Button-Up Shirt",
            "image": "clothing-tops",
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
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Casual",
                  "Flannel",
                  "Oxford",
                  "Linen",
                  "Dress"
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
            "id": "polo",
            "name": "Polo",
            "image": "clothing-tops",
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
            "id": "hoodie",
            "name": "Hoodie",
            "image": "clothing-tops",
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
                  "Pullover",
                  "Zip-Up",
                  "Oversized"
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
            "id": "sweatshirt",
            "name": "Sweatshirt",
            "image": "clothing-tops",
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
                  "Regular",
                  "Oversized"
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
            "id": "sweater",
            "name": "Sweater",
            "image": "clothing-tops",
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
                  "Turtleneck",
                  "Cardigan",
                  "Quarter-Zip"
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
        "image": "clothing-bottoms",
        "products": [
          {
            "id": "jeans",
            "name": "Jeans",
            "image": "clothing-bottoms",
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
                "label": "Fit",
                "type": "select",
                "value": "",
                "options": [
                  "Skinny",
                  "Slim",
                  "Straight",
                  "Relaxed",
                  "Baggy"
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
            "id": "chinos",
            "name": "Chinos / Pants",
            "image": "clothing-bottoms",
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
                "label": "Fit",
                "type": "select",
                "value": "",
                "options": [
                  "Slim",
                  "Regular",
                  "Relaxed",
                  "Tapered"
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
            "id": "shorts",
            "name": "Shorts",
            "image": "clothing-bottoms",
            "fields": [
              {
                "label": "Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Length",
                "type": "select",
                "value": "",
                "options": [
                  "5 inch",
                  "7 inch",
                  "9 inch",
                  "11 inch"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Chino",
                  "Athletic",
                  "Denim",
                  "Board",
                  "Cargo"
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
            "id": "sweatpants",
            "name": "Sweatpants / Joggers",
            "image": "clothing-bottoms",
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
                  "Relaxed",
                  "Oversized"
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
            "id": "dress-pants",
            "name": "Dress Pants",
            "image": "clothing-bottoms",
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
                "label": "Fit",
                "type": "select",
                "value": "",
                "options": [
                  "Slim",
                  "Regular",
                  "Pleated"
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
            "id": "activewear-bottoms",
            "name": "Activewear",
            "image": "clothing-activewear",
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
                  "Compression",
                  "Loose",
                  "Tapered Jogger",
                  "Shorts"
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
        "image": "clothing-outerwear",
        "products": [
          {
            "id": "jacket",
            "name": "Jacket",
            "image": "clothing-outerwear",
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
                  "Bomber",
                  "Denim",
                  "Leather",
                  "Moto",
                  "Harrington",
                  "Varsity"
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
            "id": "coat",
            "name": "Coat",
            "image": "clothing-outerwear",
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
                  "Overcoat",
                  "Trench",
                  "Peacoat",
                  "Parka",
                  "Wool"
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
            "id": "puffer",
            "name": "Puffer / Down",
            "image": "clothing-outerwear",
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
                "label": "Length",
                "type": "select",
                "value": "",
                "options": [
                  "Short",
                  "Mid",
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
            "id": "windbreaker",
            "name": "Windbreaker",
            "image": "clothing-outerwear",
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
            "id": "fleece",
            "name": "Fleece / Vest",
            "image": "clothing-outerwear",
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
                  "Full Zip",
                  "Quarter Zip",
                  "Vest",
                  "Pullover"
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
            "id": "rain-jacket",
            "name": "Rain Jacket",
            "image": "clothing-outerwear",
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
        "id": "basics",
        "name": "Basics",
        "image": "clothing-tops",
        "products": [
          {
            "id": "underwear",
            "name": "Underwear / Boxers",
            "image": "clothing-tops",
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
                  "Boxer Brief",
                  "Boxer",
                  "Brief",
                  "Trunk",
                  "No Preference"
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
            "id": "socks",
            "name": "Socks",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "No-Show",
                  "Ankle",
                  "Crew",
                  "Knee-High",
                  "Athletic",
                  "Dress"
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
            "id": "undershirt",
            "name": "Undershirt",
            "image": "clothing-tops",
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
                  "Crew",
                  "V-Neck",
                  "Tank"
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
            "id": "loungewear",
            "name": "Loungewear",
            "image": "clothing-tops",
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
            "id": "pajamas",
            "name": "Pajamas",
            "image": "clothing-tops",
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
                  "Set",
                  "Shorts Only",
                  "Pants Only",
                  "No Preference"
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
            "id": "athletic-shirt",
            "name": "Athletic Shirt",
            "image": "clothing-activewear",
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
                  "Compression",
                  "Loose",
                  "Tank",
                  "Long Sleeve"
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
        "id": "formal",
        "name": "Formal",
        "image": "clothing-tops",
        "products": [
          {
            "id": "suit",
            "name": "Suit",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "Jacket Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Pant Waist",
                "type": "text",
                "value": ""
              },
              {
                "label": "Pant Inseam",
                "type": "text",
                "value": ""
              },
              {
                "label": "Fit",
                "type": "select",
                "value": "",
                "options": [
                  "Slim",
                  "Modern",
                  "Classic"
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
            "id": "dress-shirt",
            "name": "Dress Shirt",
            "image": "clothing-tops",
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
            "id": "blazer",
            "name": "Blazer / Sport Coat",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "Jacket Size",
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
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Structured",
                  "Unstructured",
                  "Knit",
                  "Linen"
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
            "id": "tie",
            "name": "Tie",
            "image": "clothing-tops",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Necktie",
                  "Bow Tie",
                  "Skinny Tie",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dress-shoes-formal",
            "name": "Dress Shoes",
            "image": "clothing-tops",
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
                  "Wide",
                  "Extra Wide"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Oxford",
                  "Derby",
                  "Loafer",
                  "Chelsea Boot",
                  "Monk Strap"
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
            "name": "Pocket Square / Tie Bar",
            "image": "clothing-tops",
            "fields": [
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
    "key": "shoes-male",
    "label": "Shoes",
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
        "id": "sneakers-casual",
        "name": "Sneakers",
        "image": "shoe-sneakers",
        "products": [
          {
            "id": "low-top",
            "name": "Low Top",
            "image": "shoe-sneakers",
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
                  "Wide",
                  "Extra Wide"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Minimalist",
                  "Chunky",
                  "Retro",
                  "Court",
                  "Designer"
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
            "id": "high-top",
            "name": "High Top",
            "image": "shoe-sneakers",
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
                  "Wide",
                  "Extra Wide"
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
            "id": "slip-on",
            "name": "Slip-On",
            "image": "shoe-sneakers",
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
        "id": "athletic-shoes",
        "name": "Athletic",
        "image": "shoe-sneakers",
        "products": [
          {
            "id": "running-shoes",
            "name": "Running Shoes",
            "image": "shoe-sneakers",
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
                  "Wide",
                  "Extra Wide"
                ]
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
          },
          {
            "id": "training-shoes",
            "name": "Training Shoes",
            "image": "shoe-sneakers",
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
                  "Wide",
                  "Extra Wide"
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
            "id": "basketball-shoes",
            "name": "Basketball Shoes",
            "image": "shoe-sneakers",
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
        "id": "boots",
        "name": "Boots",
        "image": "shoe-boots",
        "products": [
          {
            "id": "chelsea-boots",
            "name": "Chelsea Boots",
            "image": "shoe-boots",
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
            "id": "work-boots",
            "name": "Work / Hiking Boots",
            "image": "shoe-boots",
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
                  "Wide",
                  "Extra Wide"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Work",
                  "Hiking",
                  "Logger",
                  "Moc Toe"
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
            "id": "chukka-boots",
            "name": "Chukka Boots",
            "image": "shoe-boots",
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
        "id": "casual-shoes",
        "name": "Casual",
        "image": "shoe-sneakers",
        "products": [
          {
            "id": "loafers-casual",
            "name": "Loafers",
            "image": "shoe-sneakers",
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
                  "Penny",
                  "Tassel",
                  "Horsebit",
                  "Driving"
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
            "id": "sandals-casual",
            "name": "Sandals",
            "image": "shoe-sandals",
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
                  "Slide",
                  "Flip Flop",
                  "Strap",
                  "Sport"
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
            "id": "moccasins",
            "name": "Moccasins / Boat Shoes",
            "image": "shoe-sneakers",
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
      }
    ]
  },
  {
    "key": "grooming-male",
    "label": "Grooming",
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
        "id": "hair",
        "name": "Hair",
        "image": "grooming-hair",
        "products": [
          {
            "id": "shampoo",
            "name": "Shampoo",
            "image": "grooming-hair",
            "fields": [
              {
                "label": "Hair Type",
                "type": "select",
                "value": "",
                "options": [
                  "Fine",
                  "Normal",
                  "Thick",
                  "Curly",
                  "Coily",
                  "Wavy"
                ]
              },
              {
                "label": "Concern",
                "type": "select",
                "value": "",
                "options": [
                  "Dandruff",
                  "Oily",
                  "Dry",
                  "Color-Treated",
                  "Thinning",
                  "No Concern"
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
            "id": "conditioner",
            "name": "Conditioner",
            "image": "grooming-hair",
            "fields": [
              {
                "label": "Hair Type",
                "type": "select",
                "value": "",
                "options": [
                  "Fine",
                  "Normal",
                  "Thick",
                  "Curly",
                  "Coily",
                  "Wavy"
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
            "id": "styling-product",
            "name": "Styling Product",
            "image": "grooming-hair",
            "fields": [
              {
                "label": "Product Type",
                "type": "select",
                "value": "",
                "options": [
                  "Pomade",
                  "Clay",
                  "Wax",
                  "Gel",
                  "Mousse",
                  "Paste",
                  "Cream",
                  "Spray",
                  "No Product"
                ]
              },
              {
                "label": "Hold",
                "type": "select",
                "value": "",
                "options": [
                  "Light",
                  "Medium",
                  "Strong",
                  "Extra Strong"
                ]
              },
              {
                "label": "Finish",
                "type": "select",
                "value": "",
                "options": [
                  "Matte",
                  "Low Sheen",
                  "Natural",
                  "High Shine"
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
            "id": "hair-tools",
            "name": "Hair Tools",
            "image": "grooming-hair",
            "fields": [
              {
                "label": "Tools Used",
                "type": "select",
                "value": "",
                "options": [
                  "Blow Dryer",
                  "Flat Iron",
                  "Curling Iron",
                  "Hair Clipper",
                  "None"
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
            "id": "hair-color",
            "name": "Hair Color / Treatment",
            "image": "grooming-hair",
            "fields": [
              {
                "label": "Treatment",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Color",
                  "Highlights",
                  "Toner",
                  "Keratin",
                  "Scalp Treatment"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hair-loss",
            "name": "Hair Loss / Thinning",
            "image": "grooming-hair",
            "fields": [
              {
                "label": "Concern",
                "type": "select",
                "value": "",
                "options": [
                  "None",
                  "Thinning",
                  "Receding",
                  "Use Products",
                  "No Preference"
                ]
              },
              {
                "label": "Products Used",
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
        "id": "skin",
        "name": "Skincare",
        "image": "grooming-skin",
        "products": [
          {
            "id": "face-wash",
            "name": "Face Wash",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "Skin Type",
                "type": "select",
                "value": "",
                "options": [
                  "Dry",
                  "Normal",
                  "Oily",
                  "Combination",
                  "Sensitive"
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
            "id": "moisturizer",
            "name": "Moisturizer",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "Skin Type",
                "type": "select",
                "value": "",
                "options": [
                  "Dry",
                  "Normal",
                  "Oily",
                  "Combination",
                  "Sensitive"
                ]
              },
              {
                "label": "SPF",
                "type": "select",
                "value": "",
                "options": [
                  "No SPF",
                  "SPF 15",
                  "SPF 30",
                  "SPF 50+"
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
            "id": "serum",
            "name": "Serum / Treatment",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "Concern",
                "type": "select",
                "value": "",
                "options": [
                  "Anti-Aging",
                  "Brightening",
                  "Acne",
                  "Hyperpigmentation",
                  "Hydration",
                  "None"
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
            "id": "eye-cream",
            "name": "Eye Cream",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "Concern",
                "type": "select",
                "value": "",
                "options": [
                  "Dark Circles",
                  "Puffiness",
                  "Wrinkles",
                  "None"
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
            "id": "sunscreen",
            "name": "Sunscreen",
            "image": "grooming-skin",
            "fields": [
              {
                "label": "SPF",
                "type": "select",
                "value": "",
                "options": [
                  "SPF 15",
                  "SPF 30",
                  "SPF 50",
                  "SPF 50+"
                ]
              },
              {
                "label": "Formula",
                "type": "select",
                "value": "",
                "options": [
                  "Mineral",
                  "Chemical",
                  "Hybrid",
                  "Tinted"
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
            "id": "lip-balm",
            "name": "Lip Balm",
            "image": "grooming-skin",
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
        "id": "beard-shaving",
        "name": "Beard & Shaving",
        "image": "grooming-shaving",
        "products": [
          {
            "id": "razor",
            "name": "Razor",
            "image": "grooming-shaving",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Cartridge",
                  "Safety Razor",
                  "Electric",
                  "Straight Razor",
                  "Disposable"
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
            "id": "shave-cream",
            "name": "Shave Cream / Gel",
            "image": "grooming-shaving",
            "fields": [
              {
                "label": "Format",
                "type": "select",
                "value": "",
                "options": [
                  "Cream",
                  "Gel",
                  "Foam",
                  "Oil",
                  "Soap",
                  "No Preference"
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
            "id": "beard-oil",
            "name": "Beard Oil / Balm",
            "image": "grooming-shaving",
            "fields": [
              {
                "label": "Beard Length",
                "type": "select",
                "value": "",
                "options": [
                  "Clean Shaven",
                  "Stubble",
                  "Short",
                  "Medium",
                  "Long",
                  "No Preference"
                ]
              },
              {
                "label": "Product",
                "type": "select",
                "value": "",
                "options": [
                  "Oil",
                  "Balm",
                  "Butter",
                  "Wax",
                  "None"
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
            "id": "aftershave",
            "name": "Aftershave",
            "image": "grooming-shaving",
            "fields": [
              {
                "label": "Format",
                "type": "select",
                "value": "",
                "options": [
                  "Balm",
                  "Lotion",
                  "Splash",
                  "None"
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
            "id": "beard-trimmer",
            "name": "Beard Trimmer",
            "image": "grooming-shaving",
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
            "id": "mustache-wax",
            "name": "Mustache Wax",
            "image": "grooming-shaving",
            "fields": [
              {
                "label": "Hold",
                "type": "select",
                "value": "",
                "options": [
                  "Light",
                  "Medium",
                  "Strong"
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
        "id": "fragrance",
        "name": "Fragrance",
        "image": "scent-cologne",
        "products": [
          {
            "id": "cologne",
            "name": "Cologne / Eau de Parfum",
            "image": "scent-cologne",
            "fields": [
              {
                "label": "Scent Family",
                "type": "select",
                "value": "",
                "options": [
                  "Woody",
                  "Fresh",
                  "Citrus",
                  "Spicy",
                  "Oriental",
                  "Aquatic",
                  "Earthy",
                  "Gourmand"
                ]
              },
              {
                "label": "Intensity",
                "type": "select",
                "value": "",
                "options": [
                  "Light (EDT)",
                  "Medium (EDP)",
                  "Strong (Parfum)",
                  "No Preference"
                ]
              },
              {
                "label": "Season",
                "type": "select",
                "value": "",
                "options": [
                  "Year-Round",
                  "Spring/Summer",
                  "Fall/Winter",
                  "No Preference"
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
            "id": "deodorant",
            "name": "Deodorant",
            "image": "scent-cologne",
            "fields": [
              {
                "label": "Format",
                "type": "select",
                "value": "",
                "options": [
                  "Stick",
                  "Spray",
                  "Roll-On",
                  "Natural",
                  "No Preference"
                ]
              },
              {
                "label": "Scent Preference",
                "type": "select",
                "value": "",
                "options": [
                  "Unscented",
                  "Light",
                  "Fresh",
                  "No Preference"
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
            "id": "body-wash",
            "name": "Body Wash",
            "image": "scent-bodycare",
            "fields": [
              {
                "label": "Scent",
                "type": "select",
                "value": "",
                "options": [
                  "Fresh",
                  "Citrus",
                  "Woody",
                  "Musky",
                  "Unscented",
                  "No Preference"
                ]
              },
              {
                "label": "Skin Type",
                "type": "select",
                "value": "",
                "options": [
                  "Normal",
                  "Dry",
                  "Sensitive",
                  "No Preference"
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
            "id": "lotion",
            "name": "Body Lotion",
            "image": "scent-bodycare",
            "fields": [
              {
                "label": "Scent",
                "type": "select",
                "value": "",
                "options": [
                  "Unscented",
                  "Light",
                  "Matching Cologne",
                  "No Preference"
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
            "id": "room-scent",
            "name": "Room / Home Scent",
            "image": "scent-cologne",
            "fields": [
              {
                "label": "Format",
                "type": "select",
                "value": "",
                "options": [
                  "Candle",
                  "Diffuser",
                  "Spray",
                  "Incense",
                  "No Preference"
                ]
              },
              {
                "label": "Scent Family",
                "type": "select",
                "value": "",
                "options": [
                  "Woody",
                  "Fresh",
                  "Citrus",
                  "Spicy",
                  "Floral",
                  "Earthy"
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
            "id": "bar-soap",
            "name": "Bar Soap",
            "image": "scent-bodycare",
            "fields": [
              {
                "label": "Scent",
                "type": "select",
                "value": "",
                "options": [
                  "Unscented",
                  "Fresh",
                  "Woodsy",
                  "Citrus",
                  "No Preference"
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
    "key": "vibe-male",
    "label": "Vibe",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "aesthetic",
        "name": "Aesthetic",
        "image": "brand-preferences",
        "products": [
          {
            "id": "streetwear",
            "name": "Streetwear",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Vibe",
                "type": "select",
                "value": "",
                "options": [
                  "Core Streetwear",
                  "Skate",
                  "Hypebeast",
                  "Underground",
                  "Graphic-Heavy",
                  "Minimal Street"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "smart-casual",
            "name": "Smart Casual",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Lean",
                "type": "select",
                "value": "",
                "options": [
                  "Casual-Forward",
                  "Business-Casual",
                  "Smart-Casual",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "heritage-workwear",
            "name": "Heritage / Workwear",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Americana",
                  "Western",
                  "Military",
                  "Rugged Workwear",
                  "Field & Stream",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "old-money",
            "name": "Old Money / Prep",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Classic Prep",
                  "Ivy League",
                  "Country Club",
                  "Coastal",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "minimalist",
            "name": "Minimalist",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Palette Lean",
                "type": "select",
                "value": "",
                "options": [
                  "Monochrome",
                  "Neutral Tones",
                  "Earth Tones",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "vintage-thrift",
            "name": "Vintage / Thrift",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Era",
                "type": "select",
                "value": "",
                "options": [
                  "70s",
                  "80s",
                  "90s",
                  "Y2K",
                  "Mixed Eras",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Spots",
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
        "id": "fit-personality",
        "name": "Fit Personality",
        "image": "brand-preferences",
        "products": [
          {
            "id": "techwear",
            "name": "Techwear / Utility",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Vibe",
                "type": "select",
                "value": "",
                "options": [
                  "Functional",
                  "Futuristic",
                  "Tactical",
                  "Outdoor Performance",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bohemian",
            "name": "Bohemian / Eclectic",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Free Spirit",
                  "Festival",
                  "Artsy",
                  "Hippie-Modern",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sporty-athleisure",
            "name": "Sporty / Athleisure",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Lean",
                "type": "select",
                "value": "",
                "options": [
                  "Pure Athletic",
                  "Athleisure",
                  "Streetwear-Sport",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "rocker-edgy",
            "name": "Rock / Edgy",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Classic Rock",
                  "Punk",
                  "Metal",
                  "Dark Minimalist",
                  "Grunge",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "coastal-outdoor",
            "name": "Coastal / Outdoor",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Surf",
                  "Fishing",
                  "Hunting",
                  "Hiking",
                  "Nautical",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "business-formal",
            "name": "Business / Formal",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Dress Code",
                "type": "select",
                "value": "",
                "options": [
                  "Business Casual",
                  "Business Professional",
                  "Black Tie",
                  "No Preference"
                ]
              },
              {
                "label": "Favorite Brands",
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
    "key": "accessory-male",
    "label": "Accessory",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "watches-jewelry",
        "name": "Watches & Jewelry",
        "image": "jewelry-watches",
        "products": [
          {
            "id": "watch",
            "name": "Watch",
            "image": "jewelry-watches",
            "fields": [
              {
                "label": "Case Size",
                "type": "select",
                "value": "",
                "options": [
                  "36mm",
                  "38mm",
                  "40mm",
                  "42mm",
                  "44mm",
                  "46mm+",
                  "No Preference"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Dress",
                  "Sport",
                  "Dive",
                  "Field",
                  "Chronograph",
                  "Smart",
                  "No Preference"
                ]
              },
              {
                "label": "Band Material",
                "type": "select",
                "value": "",
                "options": [
                  "Metal",
                  "Leather",
                  "Rubber",
                  "NATO",
                  "Fabric",
                  "No Preference"
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
            "id": "necklace",
            "name": "Necklace / Chain",
            "image": "jewelry-necklaces",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Chain",
                  "Pendant",
                  "Dog Tag",
                  "Beaded",
                  "No Preference"
                ]
              },
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Gold",
                  "Silver",
                  "Rose Gold",
                  "Stainless Steel",
                  "Mixed",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bracelet",
            "name": "Bracelet",
            "image": "jewelry-bracelets",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Chain",
                  "Beaded",
                  "Leather",
                  "Cuff",
                  "Rubber",
                  "No Preference"
                ]
              },
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Gold",
                  "Silver",
                  "Stainless Steel",
                  "Mixed",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "ring",
            "name": "Ring",
            "image": "measure-ring",
            "fields": [
              {
                "label": "Ring Size",
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
                  "Stainless Steel",
                  "Tungsten",
                  "No Preference"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Band",
                  "Signet",
                  "Statement",
                  "Minimalist",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "earring",
            "name": "Earring",
            "image": "jewelry-earrings",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Stud",
                  "Hoop",
                  "Drop",
                  "No Preference"
                ]
              },
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Gold",
                  "Silver",
                  "Stainless Steel",
                  "No Preference"
                ]
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
            "name": "Cufflinks / Tie Bar",
            "image": "jewelry-watches",
            "fields": [
              {
                "label": "Metal",
                "type": "select",
                "value": "",
                "options": [
                  "Gold",
                  "Silver",
                  "Rose Gold",
                  "No Preference"
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
        "id": "bags-carry",
        "name": "Bags & Carry",
        "image": "specific-products",
        "products": [
          {
            "id": "wallet",
            "name": "Wallet",
            "image": "specific-products",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Bifold",
                  "Trifold",
                  "Slim Card Holder",
                  "Money Clip",
                  "Phone Wallet",
                  "No Preference"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Canvas",
                  "Synthetic",
                  "Metal",
                  "No Preference"
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
            "id": "backpack",
            "name": "Backpack",
            "image": "specific-products",
            "fields": [
              {
                "label": "Use",
                "type": "select",
                "value": "",
                "options": [
                  "Everyday",
                  "Work/Laptop",
                  "Travel",
                  "Hiking",
                  "Gym",
                  "No Preference"
                ]
              },
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Small (under 20L)",
                  "Medium (20-30L)",
                  "Large (30L+)",
                  "No Preference"
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
            "id": "bag",
            "name": "Bag / Tote",
            "image": "specific-products",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Tote",
                  "Messenger",
                  "Duffel",
                  "Weekender",
                  "Crossbody",
                  "No Preference"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Canvas",
                  "Nylon",
                  "No Preference"
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
            "id": "gym-bag",
            "name": "Gym Bag / Duffle",
            "image": "specific-products",
            "fields": [
              {
                "label": "Size",
                "type": "select",
                "value": "",
                "options": [
                  "Small",
                  "Medium",
                  "Large",
                  "No Preference"
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
            "id": "laptop-bag",
            "name": "Laptop Bag / Briefcase",
            "image": "specific-products",
            "fields": [
              {
                "label": "Laptop Size",
                "type": "select",
                "value": "",
                "options": [
                  "13 inch",
                  "14 inch",
                  "15 inch",
                  "16 inch",
                  "No Preference"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Sleeve",
                  "Briefcase",
                  "Backpack",
                  "Messenger",
                  "No Preference"
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
            "id": "fanny-pack",
            "name": "Fanny Pack / Sling",
            "image": "specific-products",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Fanny Pack",
                  "Sling Bag",
                  "Chest Bag",
                  "No Preference"
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
        "id": "headwear-eyewear",
        "name": "Hats & Eyewear",
        "image": "brand-preferences",
        "products": [
          {
            "id": "baseball-cap",
            "name": "Baseball Cap",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Fit",
                "type": "select",
                "value": "",
                "options": [
                  "Snapback",
                  "Fitted",
                  "Flexfit",
                  "Dad Hat",
                  "No Preference"
                ]
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Flat Brim",
                  "Curved Brim",
                  "No Preference"
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
            "id": "beanie",
            "name": "Beanie",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Cuffed",
                  "Slouchy",
                  "No Cuff",
                  "Pom Pom",
                  "No Preference"
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
            "id": "hat",
            "name": "Hat",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Fedora",
                  "Bucket Hat",
                  "Cowboy",
                  "Panama",
                  "Flat Cap",
                  "Trucker",
                  "No Preference"
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
            "id": "sunglasses",
            "name": "Sunglasses",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Frame Shape",
                "type": "select",
                "value": "",
                "options": [
                  "Aviator",
                  "Wayfarer",
                  "Round",
                  "Square",
                  "Sport",
                  "Oversized",
                  "No Preference"
                ]
              },
              {
                "label": "Lens",
                "type": "select",
                "value": "",
                "options": [
                  "Dark",
                  "Mirrored",
                  "Gradient",
                  "Polarized",
                  "No Preference"
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
            "id": "glasses",
            "name": "Glasses / Frames",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Frame Shape",
                "type": "select",
                "value": "",
                "options": [
                  "Round",
                  "Square",
                  "Rectangle",
                  "Oval",
                  "No Preference"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Metal",
                  "Acetate",
                  "Titanium",
                  "Mixed",
                  "No Preference"
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
            "id": "belt",
            "name": "Belt",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Waist Size",
                "type": "text",
                "value": ""
              },
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Dress",
                  "Casual",
                  "Braided",
                  "Reversible",
                  "No Preference"
                ]
              },
              {
                "label": "Material",
                "type": "select",
                "value": "",
                "options": [
                  "Leather",
                  "Canvas",
                  "Fabric",
                  "No Preference"
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
    "key": "taste-male",
    "label": "Taste",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "colors",
        "name": "Colors",
        "image": "brand-preferences",
        "products": [
          {
            "id": "top-colors",
            "name": "Favorite Colors",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Top Color 1",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "White",
                  "Grey",
                  "Navy",
                  "Olive",
                  "Tan",
                  "Brown",
                  "Burgundy",
                  "Forest Green",
                  "Camel",
                  "Cream",
                  "Rust",
                  "Slate Blue",
                  "Charcoal",
                  "Other"
                ]
              },
              {
                "label": "Top Color 2",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "White",
                  "Grey",
                  "Navy",
                  "Olive",
                  "Tan",
                  "Brown",
                  "Burgundy",
                  "Forest Green",
                  "Camel",
                  "Cream",
                  "Rust",
                  "Slate Blue",
                  "Charcoal",
                  "Other"
                ]
              },
              {
                "label": "Top Color 3",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "White",
                  "Grey",
                  "Navy",
                  "Olive",
                  "Tan",
                  "Brown",
                  "Burgundy",
                  "Forest Green",
                  "Camel",
                  "Cream",
                  "Rust",
                  "Slate Blue",
                  "Charcoal",
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
            "id": "avoid-colors",
            "name": "Colors to Avoid",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Avoid Color 1",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "White",
                  "Grey",
                  "Navy",
                  "Olive",
                  "Tan",
                  "Brown",
                  "Burgundy",
                  "Forest Green",
                  "Camel",
                  "Cream",
                  "Rust",
                  "Slate Blue",
                  "Charcoal",
                  "Bright Colors",
                  "Pastels",
                  "Other"
                ]
              },
              {
                "label": "Avoid Color 2",
                "type": "select",
                "value": "",
                "options": [
                  "Black",
                  "White",
                  "Grey",
                  "Navy",
                  "Olive",
                  "Tan",
                  "Brown",
                  "Burgundy",
                  "Forest Green",
                  "Camel",
                  "Cream",
                  "Rust",
                  "Slate Blue",
                  "Charcoal",
                  "Bright Colors",
                  "Pastels",
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
            "id": "color-palette",
            "name": "Overall Palette",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Palette Lean",
                "type": "select",
                "value": "",
                "options": [
                  "Monochrome",
                  "Neutral Tones",
                  "Earth Tones",
                  "Muted Pastels",
                  "Bold & Bright",
                  "Dark & Moody",
                  "Mixed",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "seasonal-colors",
            "name": "Seasonal Colors",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Spring",
                "type": "text",
                "value": ""
              },
              {
                "label": "Summer",
                "type": "text",
                "value": ""
              },
              {
                "label": "Fall",
                "type": "text",
                "value": ""
              },
              {
                "label": "Winter",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "accent-colors",
            "name": "Accent Colors",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Goes-To Accent",
                "type": "select",
                "value": "",
                "options": [
                  "Red",
                  "Orange",
                  "Yellow",
                  "Pink",
                  "Purple",
                  "Teal",
                  "Cobalt",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "shoe-color",
            "name": "Shoe Color Preference",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Favorite Shoe Color",
                "type": "select",
                "value": "",
                "options": [
                  "White",
                  "Black",
                  "Brown",
                  "Tan",
                  "Grey",
                  "Navy",
                  "Colorful",
                  "No Preference"
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
        "id": "patterns",
        "name": "Patterns",
        "image": "brand-preferences",
        "products": [
          {
            "id": "fav-patterns",
            "name": "Favorite Patterns",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Pattern 1",
                "type": "select",
                "value": "",
                "options": [
                  "Solid",
                  "Stripes",
                  "Plaid",
                  "Check",
                  "Houndstooth",
                  "Camo",
                  "Floral",
                  "Geometric",
                  "Abstract",
                  "Graphic",
                  "No Pattern"
                ]
              },
              {
                "label": "Pattern 2",
                "type": "select",
                "value": "",
                "options": [
                  "Solid",
                  "Stripes",
                  "Plaid",
                  "Check",
                  "Houndstooth",
                  "Camo",
                  "Floral",
                  "Geometric",
                  "Abstract",
                  "Graphic",
                  "No Pattern"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "avoid-patterns",
            "name": "Patterns to Avoid",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Avoid Pattern",
                "type": "select",
                "value": "",
                "options": [
                  "Loud Prints",
                  "Floral",
                  "Camo",
                  "Stripes",
                  "Plaid",
                  "Animal Print",
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
            "id": "graphic-tees",
            "name": "Graphic Tees",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Style",
                "type": "select",
                "value": "",
                "options": [
                  "Vintage Bands",
                  "Sports",
                  "Branded Logo",
                  "Artistic",
                  "Plain Only",
                  "Funny",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "denim-wash",
            "name": "Denim Wash",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Preferred Wash",
                "type": "select",
                "value": "",
                "options": [
                  "Raw / Dark Indigo",
                  "Medium Wash",
                  "Light Wash",
                  "Black",
                  "Distressed",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "print-scale",
            "name": "Print Scale",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Preference",
                "type": "select",
                "value": "",
                "options": [
                  "Small / Subtle",
                  "Medium",
                  "Bold / Large",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "logo-preference",
            "name": "Logo Visibility",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Preference",
                "type": "select",
                "value": "",
                "options": [
                  "No Logos",
                  "Small / Subtle Logo",
                  "Medium Logo",
                  "Big / Statement Logo",
                  "No Preference"
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
        "id": "materials",
        "name": "Materials",
        "image": "brand-preferences",
        "products": [
          {
            "id": "fav-fabrics",
            "name": "Favorite Fabrics",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Fabric 1",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Linen",
                  "Wool",
                  "Cashmere",
                  "Denim",
                  "Leather",
                  "Fleece",
                  "Polyester Blend",
                  "Nylon",
                  "No Preference"
                ]
              },
              {
                "label": "Fabric 2",
                "type": "select",
                "value": "",
                "options": [
                  "Cotton",
                  "Linen",
                  "Wool",
                  "Cashmere",
                  "Denim",
                  "Leather",
                  "Fleece",
                  "Polyester Blend",
                  "Nylon",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "avoid-fabrics",
            "name": "Fabrics to Avoid",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Avoid Fabric",
                "type": "select",
                "value": "",
                "options": [
                  "Wool (Itchy)",
                  "Synthetic",
                  "Sheer",
                  "Stiff Materials",
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
            "id": "texture-preference",
            "name": "Texture Preference",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Preference",
                "type": "select",
                "value": "",
                "options": [
                  "Smooth",
                  "Textured",
                  "Soft / Plush",
                  "Structured",
                  "Woven",
                  "No Preference"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sustainability",
            "name": "Sustainability",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Matters To Me",
                "type": "select",
                "value": "",
                "options": [
                  "Very Important",
                  "Somewhat Important",
                  "Not a Factor"
                ]
              },
              {
                "label": "Preferred Certifications",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "leather-preference",
            "name": "Leather Preference",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Type",
                "type": "select",
                "value": "",
                "options": [
                  "Real Leather",
                  "Vegan Leather",
                  "Either",
                  "Avoid Leather"
                ]
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fit-feel",
            "name": "Fit & Feel",
            "image": "brand-preferences",
            "fields": [
              {
                "label": "Overall Fit Lean",
                "type": "select",
                "value": "",
                "options": [
                  "Always Slim",
                  "Mostly Slim",
                  "Balanced",
                  "Mostly Relaxed",
                  "Always Oversized",
                  "Depends on Piece"
                ]
              },
              {
                "label": "Comfort Priority",
                "type": "select",
                "value": "",
                "options": [
                  "Comfort First",
                  "Style First",
                  "Equal Balance"
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
    "key": "clothing-female",
    "label": "Clothing",
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
        "id": "tshirt",
        "name": "T-Shirt",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Preferred Fit",
            "type": "select",
            "value": "",
            "options": [
              "Fitted",
              "Regular",
              "Relaxed",
              "Oversized",
              "Cropped"
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
        "id": "blouse",
        "name": "Blouse",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Button-Up",
              "Wrap",
              "Peplum",
              "Off-Shoulder",
              "Sleeveless"
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
        "id": "sweater",
        "name": "Sweater",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Crewneck",
              "V-Neck",
              "Turtleneck",
              "Cardigan",
              "Cropped"
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
        "id": "jeans",
        "name": "Jeans",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Waist",
            "type": "text",
            "value": ""
          },
          {
            "label": "Length",
            "type": "select",
            "value": "",
            "options": [
              "Short",
              "Regular",
              "Long",
              "Petite"
            ]
          },
          {
            "label": "Fit",
            "type": "select",
            "value": "",
            "options": [
              "Skinny",
              "Slim",
              "Straight",
              "Boyfriend",
              "Flared",
              "Wide Leg",
              "Mom"
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
        "id": "dress",
        "name": "Dress",
        "image": "clothing-dresses",
        "fields": [
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
            "label": "Length",
            "type": "select",
            "value": "",
            "options": [
              "Mini",
              "Midi",
              "Maxi"
            ]
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Casual",
              "Cocktail",
              "Formal",
              "Wrap",
              "Slip",
              "Bodycon",
              "A-Line",
              "Sundress"
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
        "id": "skirt",
        "name": "Skirt",
        "image": "clothing-bottoms",
        "fields": [
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
            "label": "Length",
            "type": "select",
            "value": "",
            "options": [
              "Mini",
              "Midi",
              "Maxi"
            ]
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "A-Line",
              "Pencil",
              "Pleated",
              "Wrap",
              "Denim"
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
        "id": "shorts",
        "name": "Shorts",
        "image": "clothing-bottoms",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Denim",
              "Athletic",
              "Biker",
              "Linen",
              "Bermuda"
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
        "id": "jacket",
        "name": "Jacket",
        "image": "clothing-outerwear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Denim",
              "Leather",
              "Blazer",
              "Bomber",
              "Utility",
              "Cropped"
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
        "id": "coat",
        "name": "Coat",
        "image": "clothing-outerwear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Wool",
              "Trench",
              "Puffer",
              "Faux Fur",
              "Peacoat",
              "Overcoat"
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
        "id": "activewear-top",
        "name": "Activewear Top",
        "image": "clothing-activewear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Sports Bra",
              "Tank",
              "T-Shirt",
              "Long Sleeve",
              "Crop"
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
        "id": "activewear-bottom",
        "name": "Activewear Bottom",
        "image": "clothing-activewear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Leggings",
              "Shorts",
              "Joggers",
              "Bike Shorts",
              "Flare"
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
        "id": "hoodie",
        "name": "Hoodie",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Pullover",
              "Zip-Up",
              "Cropped",
              "Oversized"
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
    "key": "shoes-female",
    "label": "Shoes",
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
        "id": "heels",
        "name": "Heels",
        "image": "shoe-heels",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Heel Height",
            "type": "select",
            "value": "",
            "options": [
              "Kitten (1-2\")",
              "Mid (2-3\")",
              "High (3-4\")",
              "Stiletto (4\"+)"
            ]
          },
          {
            "label": "Width",
            "type": "select",
            "value": "",
            "options": [
              "Narrow",
              "Standard",
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
        "id": "sneakers",
        "name": "Sneakers",
        "image": "shoe-sneakers",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Width",
            "type": "select",
            "value": "",
            "options": [
              "Narrow",
              "Standard",
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
        "id": "boots",
        "name": "Boots",
        "image": "shoe-boots",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Height",
            "type": "select",
            "value": "",
            "options": [
              "Ankle",
              "Mid-Calf",
              "Knee-High",
              "Over-the-Knee"
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
        "id": "flats",
        "name": "Flats",
        "image": "shoe-flats",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Ballet",
              "Loafer",
              "Mule",
              "Pointed Toe",
              "Espadrille"
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
        "id": "sandals",
        "name": "Sandals",
        "image": "shoe-sandals",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Slides",
              "Strappy",
              "Wedge",
              "Gladiator",
              "Flip-Flop",
              "Platform"
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
        "id": "running-shoes",
        "name": "Running Shoes",
        "image": "shoe-sneakers",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Width",
            "type": "select",
            "value": "",
            "options": [
              "Narrow",
              "Standard",
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
        "id": "slides",
        "name": "Slides",
        "image": "shoe-sandals",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
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
    "key": "grooming-female",
    "label": "Grooming",
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
        "id": "shampoo",
        "name": "Shampoo",
        "image": "grooming-hair",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Hair Type",
            "type": "select",
            "value": "",
            "options": [
              "Fine",
              "Normal",
              "Thick",
              "Curly",
              "Coily",
              "Color-Treated",
              "Oily",
              "Dry"
            ]
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
        "id": "conditioner",
        "name": "Conditioner",
        "image": "grooming-hair",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Hair Type",
            "type": "select",
            "value": "",
            "options": [
              "Fine",
              "Normal",
              "Thick",
              "Curly",
              "Coily",
              "Color-Treated",
              "Oily",
              "Dry"
            ]
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
        "id": "hair-treatment",
        "name": "Hair Treatment",
        "image": "grooming-hair",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Hair Mask",
              "Oil",
              "Leave-In",
              "Heat Protectant",
              "Serum"
            ]
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
        "id": "face-wash",
        "name": "Face Wash",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Skin Type",
            "type": "select",
            "value": "",
            "options": [
              "Oily",
              "Dry",
              "Combination",
              "Normal",
              "Sensitive"
            ]
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
        "id": "moisturizer",
        "name": "Moisturizer",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Skin Type",
            "type": "select",
            "value": "",
            "options": [
              "Oily",
              "Dry",
              "Combination",
              "Normal",
              "Sensitive"
            ]
          },
          {
            "label": "SPF",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "SPF 15",
              "SPF 30",
              "SPF 50+"
            ]
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
        "id": "serum",
        "name": "Serum",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Concern",
            "type": "select",
            "value": "",
            "options": [
              "Brightening",
              "Anti-Aging",
              "Hydration",
              "Acne",
              "Pores",
              "Vitamin C"
            ]
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
        "id": "sunscreen",
        "name": "Sunscreen",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "SPF",
            "type": "select",
            "value": "",
            "options": [
              "SPF 30",
              "SPF 50",
              "SPF 50+"
            ]
          },
          {
            "label": "Finish",
            "type": "select",
            "value": "",
            "options": [
              "Matte",
              "Dewy",
              "Natural",
              "Tinted"
            ]
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
        "id": "foundation",
        "name": "Foundation",
        "image": "grooming-makeup",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Shade",
            "type": "text",
            "value": ""
          },
          {
            "label": "Finish",
            "type": "select",
            "value": "",
            "options": [
              "Matte",
              "Dewy",
              "Satin",
              "Natural"
            ]
          },
          {
            "label": "Coverage",
            "type": "select",
            "value": "",
            "options": [
              "Light",
              "Medium",
              "Full"
            ]
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
        "id": "concealer",
        "name": "Concealer",
        "image": "grooming-makeup",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Shade",
            "type": "text",
            "value": ""
          },
          {
            "label": "Coverage",
            "type": "select",
            "value": "",
            "options": [
              "Light",
              "Medium",
              "Full"
            ]
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
        "id": "mascara",
        "name": "Mascara",
        "image": "grooming-makeup",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Effect",
            "type": "select",
            "value": "",
            "options": [
              "Lengthening",
              "Volumizing",
              "Curling",
              "Waterproof",
              "All-in-One"
            ]
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
        "id": "blush",
        "name": "Blush",
        "image": "grooming-makeup",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Shade",
            "type": "text",
            "value": ""
          },
          {
            "label": "Finish",
            "type": "select",
            "value": "",
            "options": [
              "Matte",
              "Shimmer",
              "Satin",
              "Glowy"
            ]
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
        "id": "lip",
        "name": "Lip",
        "image": "grooming-makeup",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Lipstick",
              "Lip Gloss",
              "Lip Liner",
              "Lip Stain",
              "Lip Balm",
              "Lip Oil"
            ]
          },
          {
            "label": "Shade",
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
      }
    ]
  },
  {
    "key": "scents-female",
    "label": "Scents",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "perfume",
        "name": "Perfume",
        "image": "scent-perfume",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Concentration",
            "type": "select",
            "value": "",
            "options": [
              "EDT",
              "EDP",
              "Parfum",
              "Mist"
            ]
          },
          {
            "label": "Scent Family",
            "type": "select",
            "value": "",
            "options": [
              "Floral",
              "Fruity",
              "Fresh",
              "Woody",
              "Oriental",
              "Gourmand",
              "Musk"
            ]
          },
          {
            "label": "Season",
            "type": "select",
            "value": "",
            "options": [
              "Spring/Summer",
              "Fall/Winter",
              "Year-Round"
            ]
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
        "id": "body-lotion",
        "name": "Body Lotion",
        "image": "scent-bodycare",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
            "type": "text",
            "value": ""
          },
          {
            "label": "Skin Type",
            "type": "select",
            "value": "",
            "options": [
              "Normal",
              "Dry",
              "Sensitive",
              "All"
            ]
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
        "id": "body-wash",
        "name": "Body Wash",
        "image": "scent-bodycare",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Gel",
              "Cream",
              "Oil",
              "Exfoliating"
            ]
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
        "id": "deodorant",
        "name": "Deodorant",
        "image": "scent-bodycare",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Stick",
              "Spray",
              "Gel",
              "Natural",
              "Antiperspirant"
            ]
          },
          {
            "label": "Scent",
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
        "id": "candle",
        "name": "Candle",
        "image": "scent-candles",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
            "type": "text",
            "value": ""
          },
          {
            "label": "Wax Type",
            "type": "select",
            "value": "",
            "options": [
              "Soy",
              "Coconut",
              "Beeswax",
              "Paraffin",
              "No Preference"
            ]
          },
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "Travel",
              "Small",
              "Medium",
              "Large"
            ]
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
        "id": "essential-oils",
        "name": "Essential Oils",
        "image": "scent-oils",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
            "type": "text",
            "value": ""
          },
          {
            "label": "Use",
            "type": "select",
            "value": "",
            "options": [
              "Diffuser",
              "Topical",
              "Bath",
              "Aromatherapy"
            ]
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
        "id": "home-fragrance",
        "name": "Home Fragrance",
        "image": "scent-home",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Reed Diffuser",
              "Room Spray",
              "Wax Melt",
              "Incense",
              "Plug-In"
            ]
          },
          {
            "label": "Scent",
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
      }
    ]
  },
  {
    "key": "measurements-female",
    "label": "Measurements",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "shirt",
        "name": "Shirt / Top",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "jacket-size",
        "name": "Jacket",
        "image": "clothing-outerwear",
        "fields": [
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "pants-size",
        "name": "Pants",
        "image": "clothing-bottoms",
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "dress-size",
        "name": "Dress",
        "image": "clothing-dresses",
        "fields": [
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "bra-size",
        "name": "Bra",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Band Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Cup Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "belt-size",
        "name": "Belt",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Belt Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "shoe-size",
        "name": "Shoe Size",
        "image": "shoe-size",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Width",
            "type": "select",
            "value": "",
            "options": [
              "Narrow",
              "Standard",
              "Wide"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "bust-size",
        "name": "Bust",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Bust (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "waist-size",
        "name": "Waist",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Waist (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "hips-size",
        "name": "Hips",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Hips (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "inseam-size",
        "name": "Inseam",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Inseam (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "ring-size",
        "name": "Ring Size",
        "image": "measure-ring",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Finger",
            "type": "select",
            "value": "",
            "options": [
              "Index",
              "Middle",
              "Ring",
              "Pinky"
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
    "key": "jewelry-female",
    "label": "Jewelry",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "earrings",
        "name": "Earrings",
        "image": "jewelry-earrings",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Stud",
              "Hoop",
              "Drop",
              "Huggie",
              "Chandelier",
              "Clip-On"
            ]
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
            "label": "Sensitivity",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Nickel-Free Only",
              "Hypoallergenic Only"
            ]
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
        "id": "necklace",
        "name": "Necklace",
        "image": "jewelry-necklaces",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Chain",
              "Pendant",
              "Choker",
              "Layered",
              "Statement",
              "Pearl"
            ]
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
            "label": "Length",
            "type": "select",
            "value": "",
            "options": [
              "Choker (14\")",
              "Princess (18\")",
              "Matinee (22\")",
              "Opera (30\")"
            ]
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
        "id": "bracelet",
        "name": "Bracelet",
        "image": "jewelry-bracelets",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Bangle",
              "Chain",
              "Cuff",
              "Charm",
              "Tennis",
              "Beaded"
            ]
          },
          {
            "label": "Metal",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Mixed"
            ]
          },
          {
            "label": "Wrist Size",
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
        "id": "ring",
        "name": "Ring",
        "image": "measure-ring",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Band",
              "Solitaire",
              "Stacking",
              "Statement",
              "Signet"
            ]
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
            "label": "Ring Size (US)",
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
        "id": "watch",
        "name": "Watch",
        "image": "jewelry-watches",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Model",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Dress",
              "Casual",
              "Sport",
              "Luxury",
              "Smart Watch",
              "Minimalist"
            ]
          },
          {
            "label": "Band",
            "type": "select",
            "value": "",
            "options": [
              "Metal",
              "Leather",
              "Silicone",
              "Fabric",
              "Ceramic"
            ]
          },
          {
            "label": "Case Size",
            "type": "select",
            "value": "",
            "options": [
              "28mm",
              "32mm",
              "36mm",
              "38mm",
              "40mm"
            ]
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
        "id": "anklet",
        "name": "Anklet",
        "image": "jewelry-bracelets",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Chain",
              "Beaded",
              "Charm",
              "Layered"
            ]
          },
          {
            "label": "Metal",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Mixed"
            ]
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
      }
    ]
  },
  {
    "key": "brand-preferences-female",
    "label": "Brand Preferences",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "clothing-brands",
        "name": "Clothing Brands",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Casual",
              "Classic",
              "Bohemian",
              "Minimalist",
              "Streetwear",
              "Romantic",
              "Edgy"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Budget",
              "Mid-Range",
              "Premium",
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
        "id": "shoe-brands",
        "name": "Shoe Brands",
        "image": "shoe-size",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Heels",
              "Sneakers",
              "Boots",
              "Flats",
              "Sandals"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Budget",
              "Mid-Range",
              "Premium",
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
        "id": "grooming-brands",
        "name": "Grooming Brands",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Category",
            "type": "select",
            "value": "",
            "options": [
              "Skincare",
              "Hair",
              "All"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Drugstore",
              "Mid-Range",
              "Prestige",
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
        "id": "beauty-brands",
        "name": "Beauty Brands",
        "image": "grooming-makeup",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Category",
            "type": "select",
            "value": "",
            "options": [
              "Makeup",
              "Nails",
              "Brows",
              "Lashes",
              "All"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Drugstore",
              "Mid-Range",
              "Prestige",
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
        "id": "jewelry-brands",
        "name": "Jewelry Brands",
        "image": "jewelry",
        "fields": [
          {
            "label": "Favorite Brands",
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
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Budget",
              "Mid-Range",
              "Premium",
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
        "id": "fragrance-brands",
        "name": "Fragrance Brands",
        "image": "scent-perfume",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Drugstore",
              "Mid-Range",
              "Designer",
              "Niche/Luxury"
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
    "key": "clothing-nb",
    "label": "Clothing",
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
        "id": "tshirt",
        "name": "T-Shirt",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Preferred Fit",
            "type": "select",
            "value": "",
            "options": [
              "Fitted",
              "Slim",
              "Regular",
              "Relaxed",
              "Oversized",
              "Cropped"
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
        "id": "button-up",
        "name": "Button-Up",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Preferred Fit",
            "type": "select",
            "value": "",
            "options": [
              "Fitted",
              "Slim",
              "Regular",
              "Relaxed",
              "Oversized"
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
        "id": "sweater",
        "name": "Sweater",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Crewneck",
              "V-Neck",
              "Turtleneck",
              "Cardigan",
              "Cropped",
              "Zip-Up"
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
        "id": "hoodie",
        "name": "Hoodie",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Pullover",
              "Zip-Up",
              "Cropped",
              "Oversized"
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
        "id": "jeans",
        "name": "Jeans",
        "image": "clothing-bottoms",
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
            "label": "Fit",
            "type": "select",
            "value": "",
            "options": [
              "Skinny",
              "Slim",
              "Straight",
              "Relaxed",
              "Baggy",
              "Wide Leg",
              "Flared"
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
        "id": "shorts",
        "name": "Shorts",
        "image": "clothing-bottoms",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Denim",
              "Athletic",
              "Chino",
              "Biker",
              "Board",
              "Cargo"
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
        "id": "jacket",
        "name": "Jacket",
        "image": "clothing-outerwear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Denim",
              "Bomber",
              "Leather",
              "Utility",
              "Blazer",
              "Puffer",
              "Windbreaker"
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
        "id": "coat",
        "name": "Coat",
        "image": "clothing-outerwear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Wool",
              "Trench",
              "Parka",
              "Overcoat",
              "Puffer"
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
        "id": "activewear-top",
        "name": "Activewear Top",
        "image": "clothing-activewear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Tank",
              "T-Shirt",
              "Long Sleeve",
              "Compression",
              "Crop"
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
        "id": "activewear-bottom",
        "name": "Activewear Bottom",
        "image": "clothing-activewear",
        "fields": [
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
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Shorts",
              "Joggers",
              "Leggings",
              "Compression",
              "Bike Shorts"
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
        "id": "sweatpants",
        "name": "Sweatpants",
        "image": "clothing-bottoms",
        "fields": [
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
            "label": "Fit",
            "type": "select",
            "value": "",
            "options": [
              "Slim",
              "Regular",
              "Relaxed",
              "Oversized"
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
    "key": "shoes-nb",
    "label": "Shoes",
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
        "id": "sneakers",
        "name": "Sneakers",
        "image": "shoe-sneakers",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Width",
            "type": "select",
            "value": "",
            "options": [
              "Narrow",
              "Standard",
              "Wide",
              "Extra Wide"
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
        "id": "running-shoes",
        "name": "Running Shoes",
        "image": "shoe-sneakers",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Width",
            "type": "select",
            "value": "",
            "options": [
              "Narrow",
              "Standard",
              "Wide",
              "Extra Wide"
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
        "id": "boots",
        "name": "Boots",
        "image": "shoe-boots",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Height",
            "type": "select",
            "value": "",
            "options": [
              "Ankle",
              "Chelsea",
              "Mid-Calf",
              "Knee-High",
              "Combat"
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
        "id": "sandals",
        "name": "Sandals",
        "image": "shoe-sandals",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Slides",
              "Strappy",
              "Sport",
              "Flip-Flop",
              "Platform"
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
        "id": "loafers",
        "name": "Loafers",
        "image": "shoe-boots",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Penny",
              "Tassel",
              "Horsebit",
              "Platform"
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
        "id": "slides",
        "name": "Slides",
        "image": "shoe-sandals",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
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
        "id": "dress-shoes",
        "name": "Dress Shoes",
        "image": "shoe-boots",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Oxford",
              "Derby",
              "Loafer",
              "Monk Strap",
              "Mule"
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
    "key": "grooming-nb",
    "label": "Grooming",
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
        "id": "shampoo",
        "name": "Shampoo",
        "image": "grooming-hair",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Hair Type",
            "type": "select",
            "value": "",
            "options": [
              "Fine",
              "Normal",
              "Thick",
              "Curly",
              "Coily",
              "Color-Treated",
              "Oily",
              "Dry"
            ]
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
        "id": "conditioner",
        "name": "Conditioner",
        "image": "grooming-hair",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Hair Type",
            "type": "select",
            "value": "",
            "options": [
              "Fine",
              "Normal",
              "Thick",
              "Curly",
              "Coily",
              "Color-Treated",
              "Oily",
              "Dry"
            ]
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
        "id": "styling-product",
        "name": "Styling Product",
        "image": "grooming-hair",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Pomade",
              "Gel",
              "Clay",
              "Wax",
              "Cream",
              "Mousse",
              "Spray"
            ]
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
        "id": "face-wash",
        "name": "Face Wash",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Skin Type",
            "type": "select",
            "value": "",
            "options": [
              "Oily",
              "Dry",
              "Combination",
              "Normal",
              "Sensitive"
            ]
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
        "id": "moisturizer",
        "name": "Moisturizer",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Skin Type",
            "type": "select",
            "value": "",
            "options": [
              "Oily",
              "Dry",
              "Combination",
              "Normal",
              "Sensitive"
            ]
          },
          {
            "label": "SPF",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "SPF 15",
              "SPF 30",
              "SPF 50+"
            ]
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
        "id": "serum",
        "name": "Serum",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Concern",
            "type": "select",
            "value": "",
            "options": [
              "Brightening",
              "Anti-Aging",
              "Hydration",
              "Acne",
              "Pores"
            ]
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
        "id": "sunscreen",
        "name": "Sunscreen",
        "image": "grooming-skin",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "SPF",
            "type": "select",
            "value": "",
            "options": [
              "SPF 30",
              "SPF 50",
              "SPF 50+"
            ]
          },
          {
            "label": "Finish",
            "type": "select",
            "value": "",
            "options": [
              "Matte",
              "Natural",
              "Tinted",
              "Dewy"
            ]
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
        "id": "body-wash",
        "name": "Body Wash",
        "image": "scent-bodycare",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
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
      }
    ]
  },
  {
    "key": "scents-nb",
    "label": "Scents",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 40,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "fragrance",
        "name": "Fragrance",
        "image": "fragrances",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Concentration",
            "type": "select",
            "value": "",
            "options": [
              "Cologne",
              "EDT",
              "EDP",
              "Parfum",
              "Mist"
            ]
          },
          {
            "label": "Scent Family",
            "type": "select",
            "value": "",
            "options": [
              "Fresh",
              "Woody",
              "Floral",
              "Spicy",
              "Aquatic",
              "Oriental",
              "Gourmand"
            ]
          },
          {
            "label": "Season",
            "type": "select",
            "value": "",
            "options": [
              "Spring/Summer",
              "Fall/Winter",
              "Year-Round"
            ]
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
        "id": "body-wash",
        "name": "Body Wash",
        "image": "scent-bodycare",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
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
        "id": "deodorant",
        "name": "Deodorant",
        "image": "scent-bodycare",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Type",
            "type": "select",
            "value": "",
            "options": [
              "Stick",
              "Spray",
              "Gel",
              "Natural",
              "Antiperspirant"
            ]
          },
          {
            "label": "Scent",
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
        "id": "body-lotion",
        "name": "Body Lotion",
        "image": "scent-bodycare",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
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
        "id": "candle",
        "name": "Candle",
        "image": "scent-candles",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Product Name",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
            "type": "text",
            "value": ""
          },
          {
            "label": "Size",
            "type": "select",
            "value": "",
            "options": [
              "Travel",
              "Small",
              "Medium",
              "Large"
            ]
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
        "id": "essential-oils",
        "name": "Essential Oils",
        "image": "scent-oils",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Scent",
            "type": "text",
            "value": ""
          },
          {
            "label": "Use",
            "type": "select",
            "value": "",
            "options": [
              "Diffuser",
              "Topical",
              "Bath",
              "Aromatherapy"
            ]
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
      }
    ]
  },
  {
    "key": "measurements-nb",
    "label": "Measurements",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 50,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "shirt",
        "name": "Shirt / Top",
        "image": "clothing-tops",
        "fields": [
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "jacket-size",
        "name": "Jacket",
        "image": "clothing-outerwear",
        "fields": [
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "pants-size",
        "name": "Pants",
        "image": "clothing-bottoms",
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "belt-size",
        "name": "Belt",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Belt Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "shoe-size",
        "name": "Shoe Size",
        "image": "shoe-size",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Width",
            "type": "select",
            "value": "",
            "options": [
              "Narrow",
              "Standard",
              "Wide",
              "Extra Wide"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "chest-size",
        "name": "Chest",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Chest (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "waist-size",
        "name": "Waist",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Waist (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "hips-size",
        "name": "Hips",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Hips (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "inseam-size",
        "name": "Inseam",
        "image": "clothing-bottoms",
        "fields": [
          {
            "label": "Inseam (inches)",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "ring-size",
        "name": "Ring Size",
        "image": "measure-ring",
        "fields": [
          {
            "label": "US Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "EU Size",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Finger",
            "type": "select",
            "value": "",
            "options": [
              "Index",
              "Middle",
              "Ring",
              "Pinky"
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
    "key": "jewelry-nb",
    "label": "Jewelry",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 60,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "watch",
        "name": "Watch",
        "image": "jewelry-watches",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Model",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Dress",
              "Sport",
              "Casual",
              "Luxury",
              "Smart Watch",
              "Minimalist"
            ]
          },
          {
            "label": "Band",
            "type": "select",
            "value": "",
            "options": [
              "Metal",
              "Leather",
              "Silicone",
              "NATO",
              "Fabric"
            ]
          },
          {
            "label": "Case Size",
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
        "id": "necklace",
        "name": "Necklace",
        "image": "jewelry-necklaces",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Chain",
              "Pendant",
              "Choker",
              "Layered",
              "Statement",
              "Beaded"
            ]
          },
          {
            "label": "Metal",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Stainless Steel",
              "Mixed"
            ]
          },
          {
            "label": "Length",
            "type": "select",
            "value": "",
            "options": [
              "16\"",
              "18\"",
              "20\"",
              "22\"",
              "24\""
            ]
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
        "id": "bracelet",
        "name": "Bracelet",
        "image": "jewelry-bracelets",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Chain",
              "Beaded",
              "Leather",
              "Cuff",
              "Bangle",
              "Charm"
            ]
          },
          {
            "label": "Metal",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Mixed",
              "Leather"
            ]
          },
          {
            "label": "Wrist Size",
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
        "id": "ring",
        "name": "Ring",
        "image": "measure-ring",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Band",
              "Signet",
              "Stacking",
              "Statement"
            ]
          },
          {
            "label": "Metal",
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
            "label": "Ring Size (US)",
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
        "id": "earring",
        "name": "Earring",
        "image": "jewelry-earrings",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Stud",
              "Hoop",
              "Huggie",
              "Drop",
              "Clip-On"
            ]
          },
          {
            "label": "Metal",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Stainless Steel",
              "Mixed"
            ]
          },
          {
            "label": "Sensitivity",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Nickel-Free Only",
              "Hypoallergenic Only"
            ]
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
        "id": "anklet",
        "name": "Anklet",
        "image": "jewelry-bracelets",
        "fields": [
          {
            "label": "Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Chain",
              "Beaded",
              "Charm",
              "Layered"
            ]
          },
          {
            "label": "Metal",
            "type": "select",
            "value": "",
            "options": [
              "Gold",
              "Silver",
              "Rose Gold",
              "Mixed"
            ]
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
      }
    ]
  },
  {
    "key": "brand-preferences-nb",
    "label": "Brand Preferences",
    "section": "style-fit",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 70,
    "is_active": true,
    "fields": [],
    "subcategories": [
      {
        "id": "clothing-brands",
        "name": "Clothing Brands",
        "image": "clothing-tops",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Streetwear",
              "Casual",
              "Minimalist",
              "Gender-Fluid",
              "Avant-Garde",
              "Workwear",
              "Athletic"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Budget",
              "Mid-Range",
              "Premium",
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
        "id": "shoe-brands",
        "name": "Shoe Brands",
        "image": "shoe-size",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Sneakers",
              "Boots",
              "Sandals",
              "Dress",
              "Athletic"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Budget",
              "Mid-Range",
              "Premium",
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
        "id": "grooming-brands",
        "name": "Grooming Brands",
        "image": "grooming",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Category",
            "type": "select",
            "value": "",
            "options": [
              "Skincare",
              "Hair",
              "Fragrance",
              "All"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Drugstore",
              "Mid-Range",
              "Prestige",
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
        "id": "jewelry-brands",
        "name": "Jewelry Brands",
        "image": "jewelry",
        "fields": [
          {
            "label": "Favorite Brands",
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
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Budget",
              "Mid-Range",
              "Premium",
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
        "id": "accessory-brands",
        "name": "Accessory Brands",
        "image": "specific-products",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Category",
            "type": "select",
            "value": "",
            "options": [
              "Bags",
              "Belts",
              "Hats",
              "Sunglasses",
              "Wallets",
              "All"
            ]
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Budget",
              "Mid-Range",
              "Premium",
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
        "id": "fragrance-brands",
        "name": "Fragrance Brands",
        "image": "fragrances",
        "fields": [
          {
            "label": "Favorite Brands",
            "type": "text",
            "value": ""
          },
          {
            "label": "Price Range",
            "type": "select",
            "value": "",
            "options": [
              "Drugstore",
              "Mid-Range",
              "Designer",
              "Niche/Luxury"
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
        "image": "favorite-restaurants",
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
        "image": "food-burgers",
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
        "image": "favorite-restaurants",
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
        "image": "food-asian",
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
        "id": "thai",
        "name": "Thai",
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
        "id": "bbq",
        "name": "BBQ",
        "image": "food-chicken",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Meat",
            "type": "select",
            "value": "",
            "options": [
              "Brisket",
              "Ribs",
              "Pulled Pork",
              "Chicken",
              "Sausage",
              "All"
            ]
          },
          {
            "label": "Sauce",
            "type": "select",
            "value": "",
            "options": [
              "Kansas City",
              "Texas",
              "Carolina",
              "Memphis",
              "No Sauce"
            ]
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
        "image": "favorite-restaurants",
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
        "image": "favorite-restaurants",
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
        "image": "favorite-restaurants",
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
              "Soy",
              "Skim",
              "None",
              "Black"
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
              "Simple Syrup"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple",
              "Quad"
            ]
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
              "Soy",
              "Skim",
              "None",
              "Black"
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
              "Vanilla",
              "Caramel"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple",
              "Quad"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "Espresso",
              "Americano",
              "Macchiato",
              "Cortado",
              "Ristretto"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple"
            ]
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
              "Nitro",
              "Float",
              "Sweet Cream"
            ]
          },
          {
            "label": "Sweetener",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Simple Syrup",
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
            "type": "select",
            "value": "",
            "options": [
              "Hot",
              "Iced",
              "Blended"
            ]
          },
          {
            "label": "Milk",
            "type": "select",
            "value": "",
            "options": [
              "Whole",
              "Oat",
              "Almond",
              "Soy",
              "Skim"
            ]
          },
          {
            "label": "Flavor",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Vanilla",
              "Caramel",
              "Hazelnut",
              "Lavender",
              "Brown Sugar"
            ]
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
              "Oolong",
              "Herbal",
              "Chai",
              "White",
              "Rooibos"
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
              "Almond",
              "Soy"
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
              "Latte",
              "Ceremonial"
            ]
          },
          {
            "label": "Milk",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Oat",
              "Almond",
              "Whole",
              "Soy"
            ]
          },
          {
            "label": "Sweetener",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Honey",
              "Simple Syrup",
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
              "Fresh Juice",
              "Smoothie",
              "Protein Shake",
              "Green Juice",
              "Acai Bowl"
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
              "2%",
              "Skim",
              "Oat",
              "Almond",
              "Soy",
              "Coconut"
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
        "image": "food-chicken",
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
              "Lamb",
              "Turkey",
              "Plant-Based",
              "Eggs"
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
        "image": "grocery-specifics",
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
        "image": "coffee-order",
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
              "Still Water",
              "Sparkling",
              "Both",
              "Neither"
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
        "image": "grocery-pantry",
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
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Wheat",
              "Sourdough",
              "Multigrain",
              "Gluten-Free",
              "Rye"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "Coffee",
              "Mimosa",
              "Bloody Mary",
              "Juice",
              "Water"
            ]
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
              "Cook",
              "Meal Prep",
              "Order In",
              "Varies"
            ]
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
              "Cook",
              "Order In",
              "Varies"
            ]
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
              "Rarely",
              "Sometimes",
              "Often",
              "Always"
            ]
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
        "image": "grocery-specifics",
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
              "Depends"
            ]
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
        "id": "diet-type",
        "name": "Diet Type",
        "image": "dietary-restrictions",
        "fields": [
          {
            "label": "Diet",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Vegan",
              "Vegetarian",
              "Pescatarian",
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
            "type": "select",
            "value": "",
            "options": [
              "Lactose",
              "Gluten",
              "Fructose",
              "Histamine",
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
            "type": "select",
            "value": "",
            "options": [
              "Dislike",
              "Religious",
              "Ethical",
              "Health",
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
              "Weight Loss",
              "Muscle Gain",
              "Maintenance",
              "Heart Health",
              "Energy",
              "General Wellness"
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
              "Spicy",
              "Tenders",
              "Sandwich",
              "Wings"
            ]
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
              "Regular",
              "Thick",
              "Stuffed",
              "Gluten-Free"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Wheat",
              "Sourdough",
              "Wrap",
              "Sub",
              "Croissant"
            ]
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
              "Yes - Weekly",
              "Yes - Sometimes",
              "No",
              "Want to Start"
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
            "label": "Grandma Recipe",
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
        "image": "favorite-restaurants",
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
        "image": "food-burgers",
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
        "image": "favorite-restaurants",
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
        "image": "food-asian",
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
        "id": "thai",
        "name": "Thai",
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
        "id": "bbq",
        "name": "BBQ",
        "image": "food-chicken",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Meat",
            "type": "select",
            "value": "",
            "options": [
              "Brisket",
              "Ribs",
              "Pulled Pork",
              "Chicken",
              "Sausage",
              "All"
            ]
          },
          {
            "label": "Sauce",
            "type": "select",
            "value": "",
            "options": [
              "Kansas City",
              "Texas",
              "Carolina",
              "Memphis",
              "No Sauce"
            ]
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
        "image": "favorite-restaurants",
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
        "image": "favorite-restaurants",
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
        "image": "favorite-restaurants",
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
              "Soy",
              "Skim",
              "None",
              "Black"
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
              "Simple Syrup",
              "Vanilla",
              "Caramel"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple",
              "Quad"
            ]
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
              "Soy",
              "Skim",
              "None",
              "Black"
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
              "Vanilla",
              "Caramel"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple",
              "Quad"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "Espresso",
              "Americano",
              "Macchiato",
              "Cortado",
              "Ristretto"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple"
            ]
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
              "Nitro",
              "Sweet Cream",
              "Float"
            ]
          },
          {
            "label": "Sweetener",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Simple Syrup",
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
            "type": "select",
            "value": "",
            "options": [
              "Hot",
              "Iced",
              "Blended"
            ]
          },
          {
            "label": "Milk",
            "type": "select",
            "value": "",
            "options": [
              "Whole",
              "Oat",
              "Almond",
              "Soy",
              "Skim"
            ]
          },
          {
            "label": "Flavor",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Vanilla",
              "Caramel",
              "Hazelnut",
              "Lavender",
              "Brown Sugar",
              "Pumpkin Spice"
            ]
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
              "Oolong",
              "Herbal",
              "Chai",
              "White",
              "Rooibos"
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
              "Almond",
              "Soy"
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
              "Latte",
              "Ceremonial"
            ]
          },
          {
            "label": "Milk",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Oat",
              "Almond",
              "Whole",
              "Soy"
            ]
          },
          {
            "label": "Sweetener",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Honey",
              "Simple Syrup",
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
              "Fresh Juice",
              "Smoothie",
              "Protein Shake",
              "Green Juice",
              "Acai Bowl"
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
              "2%",
              "Skim",
              "Oat",
              "Almond",
              "Soy",
              "Coconut"
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
        "image": "food-chicken",
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
              "Lamb",
              "Turkey",
              "Plant-Based",
              "Eggs"
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
        "image": "grocery-specifics",
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
        "image": "coffee-order",
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
              "Still Water",
              "Sparkling",
              "Both",
              "Neither"
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
        "image": "grocery-pantry",
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
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Wheat",
              "Sourdough",
              "Multigrain",
              "Gluten-Free",
              "Rye"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "Coffee",
              "Mimosa",
              "Bloody Mary",
              "Juice",
              "Water"
            ]
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
              "Cook",
              "Meal Prep",
              "Order In",
              "Varies"
            ]
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
              "Cook",
              "Order In",
              "Varies"
            ]
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
              "Rarely",
              "Sometimes",
              "Often",
              "Always"
            ]
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
        "image": "grocery-specifics",
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
              "Depends"
            ]
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
        "id": "diet-type",
        "name": "Diet Type",
        "image": "dietary-restrictions",
        "fields": [
          {
            "label": "Diet",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Vegan",
              "Vegetarian",
              "Pescatarian",
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
            "type": "select",
            "value": "",
            "options": [
              "Lactose",
              "Gluten",
              "Fructose",
              "Histamine",
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
            "type": "select",
            "value": "",
            "options": [
              "Dislike",
              "Religious",
              "Ethical",
              "Health",
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
              "Weight Loss",
              "Muscle Gain",
              "Maintenance",
              "Heart Health",
              "Energy",
              "General Wellness"
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
              "Spicy",
              "Tenders",
              "Sandwich",
              "Wings"
            ]
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
              "Regular",
              "Thick",
              "Stuffed",
              "Gluten-Free"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Wheat",
              "Sourdough",
              "Wrap",
              "Sub",
              "Croissant"
            ]
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
              "Yes - Weekly",
              "Yes - Sometimes",
              "No",
              "Want to Start"
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
        "image": "favorite-restaurants",
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
        "image": "food-burgers",
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
        "image": "favorite-restaurants",
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
        "image": "food-asian",
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
        "id": "thai",
        "name": "Thai",
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
        "id": "bbq",
        "name": "BBQ",
        "image": "food-chicken",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Meat",
            "type": "select",
            "value": "",
            "options": [
              "Brisket",
              "Ribs",
              "Pulled Pork",
              "Chicken",
              "Sausage",
              "All"
            ]
          },
          {
            "label": "Sauce",
            "type": "select",
            "value": "",
            "options": [
              "Kansas City",
              "Texas",
              "Carolina",
              "Memphis",
              "No Sauce"
            ]
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
        "image": "favorite-restaurants",
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
        "image": "favorite-restaurants",
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
        "image": "favorite-restaurants",
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
              "Soy",
              "Skim",
              "None",
              "Black"
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
              "Simple Syrup"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple",
              "Quad"
            ]
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
              "Soy",
              "Skim",
              "None",
              "Black"
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
              "Vanilla",
              "Caramel"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple",
              "Quad"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "Espresso",
              "Americano",
              "Macchiato",
              "Cortado",
              "Ristretto"
            ]
          },
          {
            "label": "Shots",
            "type": "select",
            "value": "",
            "options": [
              "Single",
              "Double",
              "Triple"
            ]
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
              "Nitro",
              "Sweet Cream",
              "Float"
            ]
          },
          {
            "label": "Sweetener",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Simple Syrup",
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
            "type": "select",
            "value": "",
            "options": [
              "Hot",
              "Iced",
              "Blended"
            ]
          },
          {
            "label": "Milk",
            "type": "select",
            "value": "",
            "options": [
              "Whole",
              "Oat",
              "Almond",
              "Soy",
              "Skim"
            ]
          },
          {
            "label": "Flavor",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Vanilla",
              "Caramel",
              "Hazelnut",
              "Lavender",
              "Brown Sugar"
            ]
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
              "Oolong",
              "Herbal",
              "Chai",
              "White",
              "Rooibos"
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
              "Almond",
              "Soy"
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
              "Latte",
              "Ceremonial"
            ]
          },
          {
            "label": "Milk",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Oat",
              "Almond",
              "Whole",
              "Soy"
            ]
          },
          {
            "label": "Sweetener",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Honey",
              "Simple Syrup",
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
              "Fresh Juice",
              "Smoothie",
              "Protein Shake",
              "Green Juice",
              "Acai Bowl"
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
              "2%",
              "Skim",
              "Oat",
              "Almond",
              "Soy",
              "Coconut"
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
        "image": "food-chicken",
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
              "Lamb",
              "Turkey",
              "Plant-Based",
              "Eggs"
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
        "image": "grocery-specifics",
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
        "image": "coffee-order",
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
              "Still Water",
              "Sparkling",
              "Both",
              "Neither"
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
        "image": "grocery-pantry",
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
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Wheat",
              "Sourdough",
              "Multigrain",
              "Gluten-Free",
              "Rye"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "Coffee",
              "Mimosa",
              "Bloody Mary",
              "Juice",
              "Water"
            ]
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
              "Cook",
              "Meal Prep",
              "Order In",
              "Varies"
            ]
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
              "Cook",
              "Order In",
              "Varies"
            ]
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
              "Rarely",
              "Sometimes",
              "Often",
              "Always"
            ]
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
        "image": "grocery-specifics",
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
              "Depends"
            ]
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
        "id": "diet-type",
        "name": "Diet Type",
        "image": "dietary-restrictions",
        "fields": [
          {
            "label": "Diet",
            "type": "select",
            "value": "",
            "options": [
              "None",
              "Vegan",
              "Vegetarian",
              "Pescatarian",
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
            "type": "select",
            "value": "",
            "options": [
              "Lactose",
              "Gluten",
              "Fructose",
              "Histamine",
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
            "type": "select",
            "value": "",
            "options": [
              "Dislike",
              "Religious",
              "Ethical",
              "Health",
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
              "Weight Loss",
              "Muscle Gain",
              "Maintenance",
              "Heart Health",
              "Energy",
              "General Wellness"
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
              "Spicy",
              "Tenders",
              "Sandwich",
              "Wings"
            ]
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
              "Regular",
              "Thick",
              "Stuffed",
              "Gluten-Free"
            ]
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
            "type": "select",
            "value": "",
            "options": [
              "White",
              "Wheat",
              "Sourdough",
              "Wrap",
              "Sub",
              "Croissant"
            ]
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
              "Yes - Weekly",
              "Yes - Sometimes",
              "No",
              "Want to Start"
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
        "image": "specific-products",
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
        "image": "jewelry-watches",
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
        "image": "specific-products",
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
        "image": "jewelry-watches",
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
        "image": "specific-products",
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
        "image": "jewelry-watches",
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
        "image": "favorite-meals",
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
        "image": "favorite-meals",
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
        "image": "favorite-meals",
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