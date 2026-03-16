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
  image?: string;
}

export const CATEGORY_REGISTRY_SEED: CategoryRegistryRow[] = 
[
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
        "image": "everyday-male-tops",
        "products": [
          {
            "id": "basic-tees",
            "name": "Basic Tees",
            "image": "everyday-male-tops-basic-tees",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hoodies",
            "name": "Hoodies",
            "image": "everyday-male-tops-hoodies",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "flannels",
            "name": "Flannels",
            "image": "everyday-male-tops-flannels",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "polos",
            "name": "Polos",
            "image": "everyday-male-tops-polos",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "henleys",
            "name": "Henleys",
            "image": "everyday-male-tops-henleys",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "denim-shirts",
            "name": "Denim Shirts",
            "image": "everyday-male-tops-denim-shirts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "everyday-male-bottoms",
        "products": [
          {
            "id": "jeans",
            "name": "Jeans",
            "image": "everyday-male-bottoms-jeans",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "name": "Chinos",
            "image": "everyday-male-bottoms-chinos",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "image": "everyday-male-bottoms-shorts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "name": "Cargo Pants",
            "image": "everyday-male-bottoms-cargo-pants",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "corduroys",
            "name": "Corduroys",
            "image": "everyday-male-bottoms-corduroys",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "joggers",
            "name": "Joggers",
            "image": "everyday-male-bottoms-joggers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "everyday-male-footwear",
        "products": [
          {
            "id": "casual-sneakers",
            "name": "Casual Sneakers",
            "image": "everyday-male-footwear-casual-sneakers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "leather-boots",
            "name": "Leather Boots",
            "image": "everyday-male-footwear-leather-boots",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "image": "everyday-male-footwear-slides",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "image": "everyday-male-footwear-loafers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "boat-shoes",
            "name": "Boat Shoes",
            "image": "everyday-male-footwear-boat-shoes",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "slippers",
            "name": "Slippers",
            "image": "everyday-male-footwear-slippers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "everyday-male-outerwear",
        "products": [
          {
            "id": "denim-jackets",
            "name": "Denim Jackets",
            "image": "everyday-male-outerwear-denim-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bomber-jackets",
            "name": "Bomber Jackets",
            "image": "everyday-male-outerwear-bomber-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "field-jackets",
            "name": "Field Jackets",
            "image": "everyday-male-outerwear-field-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "puffer-jackets",
            "name": "Puffer Jackets",
            "image": "everyday-male-outerwear-puffer-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "windbreakers",
            "name": "Windbreakers",
            "image": "everyday-male-outerwear-windbreakers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "cardigans",
            "name": "Cardigans",
            "image": "everyday-male-outerwear-cardigans",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "everyday-male-accessories",
        "products": [
          {
            "id": "baseball-hats",
            "name": "Baseball Hats",
            "image": "everyday-male-accessories-baseball-hats",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "image": "everyday-male-accessories-sunglasses",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "leather-belts",
            "name": "Leather Belts",
            "image": "everyday-male-accessories-leather-belts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "casual-watches",
            "name": "Casual Watches",
            "image": "everyday-male-accessories-casual-watches",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "backpacks",
            "name": "Backpacks",
            "image": "everyday-male-accessories-backpacks",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "beanies",
            "name": "Beanies",
            "image": "everyday-male-accessories-beanies",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
    ],
    "image": "everyday-male"
  },
  {
    "key": "dress-male",
    "label": "Formal",
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
        "image": "dress-male-tops",
        "products": [
          {
            "id": "button-downs",
            "name": "Button-Downs",
            "image": "dress-male-tops-button-downs",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "blazers",
            "name": "Blazers",
            "image": "dress-male-tops-blazers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "suit-jackets",
            "name": "Suit Jackets",
            "image": "dress-male-tops-suit-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dress-vests",
            "name": "Dress Vests",
            "image": "dress-male-tops-dress-vests",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "turtlenecks",
            "name": "Turtlenecks",
            "image": "dress-male-tops-turtlenecks",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tuxedo-shirts",
            "name": "Tuxedo Shirts",
            "image": "dress-male-tops-tuxedo-shirts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "dress-male-bottoms",
        "products": [
          {
            "id": "trousers",
            "name": "Trousers",
            "image": "dress-male-bottoms-trousers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "image": "dress-male-bottoms-dress-pants",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "suit-pants",
            "name": "Suit Pants",
            "image": "dress-male-bottoms-suit-pants",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "chinos-slim",
            "name": "Chinos (Slim)",
            "image": "dress-male-bottoms-chinos-slim",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "wool-slacks",
            "name": "Wool Slacks",
            "image": "dress-male-bottoms-wool-slacks",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tuxedo-pants",
            "name": "Tuxedo Pants",
            "image": "dress-male-bottoms-tuxedo-pants",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "dress-male-footwear",
        "products": [
          {
            "id": "oxford-shoes",
            "name": "Oxford Shoes",
            "image": "dress-male-footwear-oxford-shoes",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "derbies",
            "name": "Derbies",
            "image": "dress-male-footwear-derbies",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "monk-straps",
            "name": "Monk Straps",
            "image": "dress-male-footwear-monk-straps",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "chelsea-boots",
            "name": "Chelsea Boots",
            "image": "dress-male-footwear-chelsea-boots",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "loafers-dress",
            "name": "Loafers (Dress)",
            "image": "dress-male-footwear-loafers-dress",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "wingtips",
            "name": "Wingtips",
            "image": "dress-male-footwear-wingtips",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "dress-male-outerwear",
        "products": [
          {
            "id": "overcoats",
            "name": "Overcoats",
            "image": "dress-male-outerwear-overcoats",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "trench-coats",
            "name": "Trench Coats",
            "image": "dress-male-outerwear-trench-coats",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "peacoats",
            "name": "Peacoats",
            "image": "dress-male-outerwear-peacoats",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "topcoats",
            "name": "Topcoats",
            "image": "dress-male-outerwear-topcoats",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mac-coats",
            "name": "Mac Coats",
            "image": "dress-male-outerwear-mac-coats",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "harrington-jackets",
            "name": "Harrington Jackets",
            "image": "dress-male-outerwear-harrington-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "dress-male-accessories",
        "products": [
          {
            "id": "ties",
            "name": "Ties",
            "image": "dress-male-accessories-ties",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tie-clips",
            "name": "Tie Clips",
            "image": "dress-male-accessories-tie-clips",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "name": "Cufflinks",
            "image": "dress-male-accessories-cufflinks",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "pocket-squares",
            "name": "Pocket Squares",
            "image": "dress-male-accessories-pocket-squares",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "dress-watches",
            "name": "Dress Watches",
            "image": "dress-male-accessories-dress-watches",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "leather-dress-belts",
            "name": "Leather Dress Belts",
            "image": "dress-male-accessories-leather-dress-belts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
    ],
    "image": "dress-male"
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
        "image": "athletic-male-tops",
        "products": [
          {
            "id": "tanks",
            "name": "Tanks",
            "image": "athletic-male-tops-tanks",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "tech-tees",
            "name": "Tech Tees",
            "image": "athletic-male-tops-tech-tees",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "quarter-zips",
            "name": "Quarter-Zips",
            "image": "athletic-male-tops-quarter-zips",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "compression-shirts",
            "name": "Compression Shirts",
            "image": "athletic-male-tops-compression-shirts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "performance-hoodies",
            "name": "Performance Hoodies",
            "image": "athletic-male-tops-performance-hoodies",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "mesh-jerseys",
            "name": "Mesh Jerseys",
            "image": "athletic-male-tops-mesh-jerseys",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "athletic-male-bottoms",
        "products": [
          {
            "id": "gym-shorts",
            "name": "Gym Shorts",
            "image": "athletic-male-bottoms-gym-shorts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "performance-joggers",
            "name": "Performance Joggers",
            "image": "athletic-male-bottoms-performance-joggers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "compression-leggings",
            "name": "Compression Leggings",
            "image": "athletic-male-bottoms-compression-leggings",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "name": "Track Pants",
            "image": "athletic-male-bottoms-track-pants",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "basketball-shorts",
            "name": "Basketball Shorts",
            "image": "athletic-male-bottoms-basketball-shorts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bike-shorts",
            "name": "Bike Shorts",
            "image": "athletic-male-bottoms-bike-shorts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "athletic-male-footwear",
        "products": [
          {
            "id": "running-shoes",
            "name": "Running Shoes",
            "image": "athletic-male-footwear-running-shoes",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "image": "athletic-male-footwear-training-shoes",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
            "image": "athletic-male-footwear-basketball-shoes",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "hiking-boots",
            "name": "Hiking Boots",
            "image": "athletic-male-footwear-hiking-boots",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "recovery-slides",
            "name": "Recovery Slides",
            "image": "athletic-male-footwear-recovery-slides",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "soccer-cleats",
            "name": "Soccer Cleats",
            "image": "athletic-male-footwear-soccer-cleats",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "athletic-male-outerwear",
        "products": [
          {
            "id": "track-jackets",
            "name": "Track Jackets",
            "image": "athletic-male-outerwear-track-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "rain-shells",
            "name": "Rain Shells",
            "image": "athletic-male-outerwear-rain-shells",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "puffer-vests",
            "name": "Puffer Vests",
            "image": "athletic-male-outerwear-puffer-vests",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "fleece-jackets",
            "name": "Fleece Jackets",
            "image": "athletic-male-outerwear-fleece-jackets",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "windshirts",
            "name": "Windshirts",
            "image": "athletic-male-outerwear-windshirts",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "thermal-layers",
            "name": "Thermal Layers",
            "image": "athletic-male-outerwear-thermal-layers",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
        "image": "athletic-male-accessories",
        "products": [
          {
            "id": "gym-bags",
            "name": "Gym Bags",
            "image": "athletic-male-accessories-gym-bags",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sports-watches",
            "name": "Sports Watches",
            "image": "athletic-male-accessories-sports-watches",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sweatbands",
            "name": "Sweatbands",
            "image": "athletic-male-accessories-sweatbands",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "water-bottles",
            "name": "Water Bottles",
            "image": "athletic-male-accessories-water-bottles",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "training-gloves",
            "name": "Training Gloves",
            "image": "athletic-male-accessories-training-gloves",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
              },
              {
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "athletic-socks",
            "name": "Athletic Socks",
            "image": "athletic-male-accessories-athletic-socks",
            "fields": [
              {
                "label": "Brand",
                "type": "text",
                "value": ""
              },
              {
                "label": "Size",
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
                  "Oversized"
                ]
              },
              {
                "label": "Keywords",
                "type": "text",
                "value": ""
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
    ],
    "image": "athletic-male"
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
        "image": "everyday-female-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "everyday-female-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "everyday-female-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "everyday-female-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "everyday-female-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "everyday-female-underwear",
        "products": []
      }
    ],
    "image": "everyday-female"
  },
  {
    "key": "dress-female",
    "label": "Formal",
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
        "image": "dress-female-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "dress-female-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "dress-female-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "dress-female-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "dress-female-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "dress-female-underwear",
        "products": []
      }
    ],
    "image": "dress-female"
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
        "image": "athletic-female-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "athletic-female-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "athletic-female-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "athletic-female-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "athletic-female-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "athletic-female-underwear",
        "products": []
      }
    ],
    "image": "athletic-female"
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
        "image": "everyday-nb-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "everyday-nb-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "everyday-nb-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "everyday-nb-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "everyday-nb-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "everyday-nb-underwear",
        "products": []
      }
    ],
    "image": "everyday-nb"
  },
  {
    "key": "dress-nb",
    "label": "Formal",
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
        "image": "dress-nb-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "dress-nb-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "dress-nb-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "dress-nb-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "dress-nb-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "dress-nb-underwear",
        "products": []
      }
    ],
    "image": "dress-nb"
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
        "image": "athletic-nb-tops",
        "products": []
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "athletic-nb-bottoms",
        "products": []
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "athletic-nb-footwear",
        "products": []
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "athletic-nb-outerwear",
        "products": []
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "athletic-nb-accessories",
        "products": []
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "athletic-nb-underwear",
        "products": []
      }
    ],
    "image": "athletic-nb"
  },
  {
    "key": "dining-male",
    "label": "Dining & Ready-to-Eat",
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
        "id": "fast-food-quick",
        "name": "Fast Food & Quick Service",
        "image": "dining-male-fast-food-quick",
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
        "id": "casual-fine-dining",
        "name": "Casual & Fine Dining",
        "image": "dining-male-casual-fine-dining",
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
            "type": "select",
            "value": "",
            "options": [
              "Date Night",
              "Family",
              "Business",
              "Special Occasion",
              "Everyday"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "cafes-bakeries",
        "name": "Cafes & Bakeries",
        "image": "dining-male-cafes-bakeries",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Go-To Order",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "international-cuisines",
        "name": "International Cuisines",
        "image": "dining-male-international-cuisines",
        "fields": [
          {
            "label": "Favorite Cuisine",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Dish",
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
        "id": "deli-sandwiches",
        "name": "Deli & Sandwiches",
        "image": "dining-male-deli-sandwiches",
        "fields": [
          {
            "label": "Favorite Spot",
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
        "id": "specialty-popups",
        "name": "Specialty & Pop-ups",
        "image": "dining-male-specialty-popups",
        "fields": [
          {
            "label": "Favorite Food Truck",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Market",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      }
    ],
    "image": "dining-male"
  },
  {
    "key": "grocery-male",
    "label": "Grocery & Pantry",
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
        "id": "fresh-produce",
        "name": "Fresh Produce",
        "image": "grocery-male-fresh-produce",
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
        "id": "meat-poultry-seafood",
        "name": "Meat, Poultry & Seafood",
        "image": "grocery-male-meat-poultry-seafood",
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
              "Plant-Based"
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
        "id": "dairy-refrigerated",
        "name": "Dairy & Refrigerated",
        "image": "grocery-male-dairy-refrigerated",
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
              "2%",
              "Coconut"
            ]
          },
          {
            "label": "Favorite Cheese",
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
        "id": "grains-pasta-baking",
        "name": "Grains, Pasta & Baking",
        "image": "grocery-male-grains-pasta-baking",
        "fields": [
          {
            "label": "Favorite Grains",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Pasta",
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
        "id": "snacks-confectionery",
        "name": "Snacks & Confectionery",
        "image": "grocery-male-snacks-confectionery",
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "condiments-sauces",
        "name": "Condiments & Sauces",
        "image": "grocery-male-condiments-sauces",
        "fields": [
          {
            "label": "Favorite Condiments",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Hot Sauce",
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
    ],
    "image": "grocery-male"
  },
  {
    "key": "beverages-male",
    "label": "Beverages",
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
        "id": "coffee-tea",
        "name": "Coffee & Tea",
        "image": "beverages-male-coffee-tea",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Go-To Order",
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
        "id": "soft-drinks-sodas",
        "name": "Soft Drinks & Sodas",
        "image": "beverages-male-soft-drinks-sodas",
        "fields": [
          {
            "label": "Favorite Drink",
            "type": "text",
            "value": ""
          },
          {
            "label": "Regular or Diet",
            "type": "select",
            "value": "",
            "options": [
              "Regular",
              "Diet",
              "Zero Sugar"
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
        "id": "juices-smoothies",
        "name": "Juices & Smoothies",
        "image": "beverages-male-juices-smoothies",
        "fields": [
          {
            "label": "Favorite Juice",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Smoothie",
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
        "id": "beer-cider",
        "name": "Beer & Cider",
        "image": "beverages-male-beer-cider",
        "fields": [
          {
            "label": "Favorite Beer",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Lager",
              "IPA",
              "Stout",
              "Sour",
              "Wheat",
              "Cider"
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
        "id": "wine-sparkling",
        "name": "Wine & Sparkling",
        "image": "beverages-male-wine-sparkling",
        "fields": [
          {
            "label": "Preferred Type",
            "type": "select",
            "value": "",
            "options": [
              "Red",
              "White",
              "Rosé",
              "Champagne",
              "Prosecco",
              "Natural"
            ]
          },
          {
            "label": "Favorite Bottle",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Region",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "spirits-cocktails",
        "name": "Spirits & Cocktails",
        "image": "beverages-male-spirits-cocktails",
        "fields": [
          {
            "label": "Preferred Spirit",
            "type": "select",
            "value": "",
            "options": [
              "Vodka",
              "Whiskey",
              "Tequila",
              "Rum",
              "Gin",
              "Bourbon"
            ]
          },
          {
            "label": "Favorite Cocktail",
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
    ],
    "image": "beverages-male"
  },
  {
    "key": "dining-female",
    "label": "Dining & Ready-to-Eat",
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
        "id": "fast-food-quick",
        "name": "Fast Food & Quick Service",
        "image": "dining-female-fast-food-quick",
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
        "id": "casual-fine-dining",
        "name": "Casual & Fine Dining",
        "image": "dining-female-casual-fine-dining",
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
            "type": "select",
            "value": "",
            "options": [
              "Date Night",
              "Family",
              "Business",
              "Special Occasion",
              "Everyday"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "cafes-bakeries",
        "name": "Cafes & Bakeries",
        "image": "dining-female-cafes-bakeries",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Go-To Order",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "international-cuisines",
        "name": "International Cuisines",
        "image": "dining-female-international-cuisines",
        "fields": [
          {
            "label": "Favorite Cuisine",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Dish",
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
        "id": "deli-sandwiches",
        "name": "Deli & Sandwiches",
        "image": "dining-female-deli-sandwiches",
        "fields": [
          {
            "label": "Favorite Spot",
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
        "id": "specialty-popups",
        "name": "Specialty & Pop-ups",
        "image": "dining-female-specialty-popups",
        "fields": [
          {
            "label": "Favorite Food Truck",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Market",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      }
    ],
    "image": "dining-female"
  },
  {
    "key": "grocery-female",
    "label": "Grocery & Pantry",
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
        "id": "fresh-produce",
        "name": "Fresh Produce",
        "image": "grocery-female-fresh-produce",
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
        "id": "meat-poultry-seafood",
        "name": "Meat, Poultry & Seafood",
        "image": "grocery-female-meat-poultry-seafood",
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
              "Plant-Based"
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
        "id": "dairy-refrigerated",
        "name": "Dairy & Refrigerated",
        "image": "grocery-female-dairy-refrigerated",
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
              "2%",
              "Coconut"
            ]
          },
          {
            "label": "Favorite Cheese",
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
        "id": "grains-pasta-baking",
        "name": "Grains, Pasta & Baking",
        "image": "grocery-female-grains-pasta-baking",
        "fields": [
          {
            "label": "Favorite Grains",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Pasta",
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
        "id": "snacks-confectionery",
        "name": "Snacks & Confectionery",
        "image": "grocery-female-snacks-confectionery",
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "condiments-sauces",
        "name": "Condiments & Sauces",
        "image": "grocery-female-condiments-sauces",
        "fields": [
          {
            "label": "Favorite Condiments",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Hot Sauce",
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
    ],
    "image": "grocery-female"
  },
  {
    "key": "beverages-female",
    "label": "Beverages",
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
        "id": "coffee-tea",
        "name": "Coffee & Tea",
        "image": "beverages-female-coffee-tea",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Go-To Order",
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
        "id": "soft-drinks-sodas",
        "name": "Soft Drinks & Sodas",
        "image": "beverages-female-soft-drinks-sodas",
        "fields": [
          {
            "label": "Favorite Drink",
            "type": "text",
            "value": ""
          },
          {
            "label": "Regular or Diet",
            "type": "select",
            "value": "",
            "options": [
              "Regular",
              "Diet",
              "Zero Sugar"
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
        "id": "juices-smoothies",
        "name": "Juices & Smoothies",
        "image": "beverages-female-juices-smoothies",
        "fields": [
          {
            "label": "Favorite Juice",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Smoothie",
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
        "id": "beer-cider",
        "name": "Beer & Cider",
        "image": "beverages-female-beer-cider",
        "fields": [
          {
            "label": "Favorite Beer",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Lager",
              "IPA",
              "Stout",
              "Sour",
              "Wheat",
              "Cider"
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
        "id": "wine-sparkling",
        "name": "Wine & Sparkling",
        "image": "beverages-female-wine-sparkling",
        "fields": [
          {
            "label": "Preferred Type",
            "type": "select",
            "value": "",
            "options": [
              "Red",
              "White",
              "Rosé",
              "Champagne",
              "Prosecco",
              "Natural"
            ]
          },
          {
            "label": "Favorite Bottle",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Region",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "spirits-cocktails",
        "name": "Spirits & Cocktails",
        "image": "beverages-female-spirits-cocktails",
        "fields": [
          {
            "label": "Preferred Spirit",
            "type": "select",
            "value": "",
            "options": [
              "Vodka",
              "Whiskey",
              "Tequila",
              "Rum",
              "Gin",
              "Bourbon"
            ]
          },
          {
            "label": "Favorite Cocktail",
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
    ],
    "image": "beverages-female"
  },
  {
    "key": "dining-nb",
    "label": "Dining & Ready-to-Eat",
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
        "id": "fast-food-quick",
        "name": "Fast Food & Quick Service",
        "image": "dining-nb-fast-food-quick",
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
        "id": "casual-fine-dining",
        "name": "Casual & Fine Dining",
        "image": "dining-nb-casual-fine-dining",
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
            "type": "select",
            "value": "",
            "options": [
              "Date Night",
              "Family",
              "Business",
              "Special Occasion",
              "Everyday"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "cafes-bakeries",
        "name": "Cafes & Bakeries",
        "image": "dining-nb-cafes-bakeries",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Go-To Order",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "international-cuisines",
        "name": "International Cuisines",
        "image": "dining-nb-international-cuisines",
        "fields": [
          {
            "label": "Favorite Cuisine",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Dish",
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
        "id": "deli-sandwiches",
        "name": "Deli & Sandwiches",
        "image": "dining-nb-deli-sandwiches",
        "fields": [
          {
            "label": "Favorite Spot",
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
        "id": "specialty-popups",
        "name": "Specialty & Pop-ups",
        "image": "dining-nb-specialty-popups",
        "fields": [
          {
            "label": "Favorite Food Truck",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Market",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      }
    ],
    "image": "dining-nb"
  },
  {
    "key": "grocery-nb",
    "label": "Grocery & Pantry",
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
        "id": "fresh-produce",
        "name": "Fresh Produce",
        "image": "grocery-nb-fresh-produce",
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
        "id": "meat-poultry-seafood",
        "name": "Meat, Poultry & Seafood",
        "image": "grocery-nb-meat-poultry-seafood",
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
              "Plant-Based"
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
        "id": "dairy-refrigerated",
        "name": "Dairy & Refrigerated",
        "image": "grocery-nb-dairy-refrigerated",
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
              "2%",
              "Coconut"
            ]
          },
          {
            "label": "Favorite Cheese",
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
        "id": "grains-pasta-baking",
        "name": "Grains, Pasta & Baking",
        "image": "grocery-nb-grains-pasta-baking",
        "fields": [
          {
            "label": "Favorite Grains",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Pasta",
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
        "id": "snacks-confectionery",
        "name": "Snacks & Confectionery",
        "image": "grocery-nb-snacks-confectionery",
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
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "condiments-sauces",
        "name": "Condiments & Sauces",
        "image": "grocery-nb-condiments-sauces",
        "fields": [
          {
            "label": "Favorite Condiments",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Hot Sauce",
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
    ],
    "image": "grocery-nb"
  },
  {
    "key": "beverages-nb",
    "label": "Beverages",
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
        "id": "coffee-tea",
        "name": "Coffee & Tea",
        "image": "beverages-nb-coffee-tea",
        "fields": [
          {
            "label": "Favorite Spot",
            "type": "text",
            "value": ""
          },
          {
            "label": "Go-To Order",
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
        "id": "soft-drinks-sodas",
        "name": "Soft Drinks & Sodas",
        "image": "beverages-nb-soft-drinks-sodas",
        "fields": [
          {
            "label": "Favorite Drink",
            "type": "text",
            "value": ""
          },
          {
            "label": "Regular or Diet",
            "type": "select",
            "value": "",
            "options": [
              "Regular",
              "Diet",
              "Zero Sugar"
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
        "id": "juices-smoothies",
        "name": "Juices & Smoothies",
        "image": "beverages-nb-juices-smoothies",
        "fields": [
          {
            "label": "Favorite Juice",
            "type": "text",
            "value": ""
          },
          {
            "label": "Favorite Smoothie",
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
        "id": "beer-cider",
        "name": "Beer & Cider",
        "image": "beverages-nb-beer-cider",
        "fields": [
          {
            "label": "Favorite Beer",
            "type": "text",
            "value": ""
          },
          {
            "label": "Style",
            "type": "select",
            "value": "",
            "options": [
              "Lager",
              "IPA",
              "Stout",
              "Sour",
              "Wheat",
              "Cider"
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
        "id": "wine-sparkling",
        "name": "Wine & Sparkling",
        "image": "beverages-nb-wine-sparkling",
        "fields": [
          {
            "label": "Preferred Type",
            "type": "select",
            "value": "",
            "options": [
              "Red",
              "White",
              "Rosé",
              "Champagne",
              "Prosecco",
              "Natural"
            ]
          },
          {
            "label": "Favorite Bottle",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Region",
            "type": "text",
            "value": ""
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "spirits-cocktails",
        "name": "Spirits & Cocktails",
        "image": "beverages-nb-spirits-cocktails",
        "fields": [
          {
            "label": "Preferred Spirit",
            "type": "select",
            "value": "",
            "options": [
              "Vodka",
              "Whiskey",
              "Tequila",
              "Rum",
              "Gin",
              "Bourbon"
            ]
          },
          {
            "label": "Favorite Cocktail",
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
    ],
    "image": "beverages-nb"
  },
  {
    "key": "hygiene-male",
    "label": "Hygiene",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "hygiene-male",
    "subcategories": [
      {
        "id": "oral-care",
        "name": "Oral Care",
        "image": "hygiene-male-oral-care",
        "fields": [
          {
            "label": "Toothbrush",
            "type": "select",
            "value": "",
            "options": [
              "Manual",
              "Electric",
              "Sonic"
            ]
          },
          {
            "label": "Toothpaste",
            "type": "text",
            "value": ""
          },
          {
            "label": "Floss",
            "type": "select",
            "value": "",
            "options": [
              "String",
              "Picks",
              "Water Flosser",
              "None"
            ]
          },
          {
            "label": "Mouthwash",
            "type": "text",
            "value": ""
          },
          {
            "label": "Whitening",
            "type": "select",
            "value": "",
            "options": [
              "Yes",
              "No",
              "Sometimes"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "bath-shower",
        "name": "Bath & Shower",
        "image": "hygiene-male-bath-shower",
        "fields": [
          {
            "label": "Preference",
            "type": "select",
            "value": "",
            "options": [
              "Shower",
              "Bath",
              "Both"
            ]
          },
          {
            "label": "Temperature",
            "type": "select",
            "value": "",
            "options": [
              "Cold",
              "Warm",
              "Hot"
            ]
          },
          {
            "label": "Body Wash",
            "type": "text",
            "value": ""
          },
          {
            "label": "Shampoo",
            "type": "text",
            "value": ""
          },
          {
            "label": "Frequency",
            "type": "select",
            "value": "",
            "options": [
              "Once a Day",
              "Twice a Day",
              "Every Other Day"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "grooming",
        "name": "Grooming",
        "image": "hygiene-male-grooming",
        "fields": [
          {
            "label": "Shaving Style",
            "type": "select",
            "value": "",
            "options": [
              "Clean Shave",
              "Beard",
              "Stubble",
              "Mustache"
            ]
          },
          {
            "label": "Razor",
            "type": "select",
            "value": "",
            "options": [
              "Cartridge",
              "Safety Razor",
              "Electric",
              "Straight"
            ]
          },
          {
            "label": "Nail Care",
            "type": "select",
            "value": "",
            "options": [
              "Clip at Home",
              "Professional",
              "Rarely"
            ]
          },
          {
            "label": "Preferred Barber",
            "type": "text",
            "value": ""
          },
          {
            "label": "Haircut Frequency",
            "type": "select",
            "value": "",
            "options": [
              "Weekly",
              "Every 2 Weeks",
              "Monthly",
              "Less Often"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "repair-restore",
        "name": "Repair & Restore",
        "image": "hygiene-male-repair-restore",
        "fields": [
          {
            "label": "Anti-Chafe",
            "type": "text",
            "value": ""
          },
          {
            "label": "Muscle Relief",
            "type": "text",
            "value": ""
          },
          {
            "label": "Foot Care",
            "type": "text",
            "value": ""
          },
          {
            "label": "After Sport Routine",
            "type": "text",
            "value": ""
          },
          {
            "label": "Recovery Products",
            "type": "text",
            "value": ""
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
    "key": "skincare-male",
    "label": "Skincare",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "skincare-male",
    "subcategories": [
      {
        "id": "face-wash-cleanse",
        "name": "Face Wash & Cleanse",
        "image": "skincare-male-face-wash-cleanse",
        "fields": [
          {
            "label": "Cleanser",
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
            "label": "Frequency",
            "type": "select",
            "value": "",
            "options": [
              "Morning Only",
              "Night Only",
              "Morning & Night"
            ]
          },
          {
            "label": "Exfoliate",
            "type": "select",
            "value": "",
            "options": [
              "Yes",
              "No",
              "Sometimes"
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
        "id": "moisturize-protect",
        "name": "Moisturize & Protect",
        "image": "skincare-male-moisturize-protect",
        "fields": [
          {
            "label": "Moisturizer",
            "type": "text",
            "value": ""
          },
          {
            "label": "SPF",
            "type": "select",
            "value": "",
            "options": [
              "Yes Daily",
              "Sometimes",
              "No"
            ]
          },
          {
            "label": "SPF Product",
            "type": "text",
            "value": ""
          },
          {
            "label": "Texture Preference",
            "type": "select",
            "value": "",
            "options": [
              "Gel",
              "Cream",
              "Lotion",
              "Oil"
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
        "id": "beard-mustache",
        "name": "Beard & Mustache",
        "image": "skincare-male-beard-mustache",
        "fields": [
          {
            "label": "Beard Oil",
            "type": "text",
            "value": ""
          },
          {
            "label": "Beard Balm",
            "type": "text",
            "value": ""
          },
          {
            "label": "Beard Wash",
            "type": "text",
            "value": ""
          },
          {
            "label": "Mustache Wax",
            "type": "text",
            "value": ""
          },
          {
            "label": "Trimmer",
            "type": "text",
            "value": ""
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
    "key": "bodycare-male",
    "label": "Bodycare",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "bodycare-male",
    "subcategories": [
      {
        "id": "cologne-fragrance",
        "name": "Cologne & Fragrance",
        "image": "bodycare-male-cologne-fragrance",
        "fields": [
          {
            "label": "Daily Cologne",
            "type": "text",
            "value": ""
          },
          {
            "label": "Occasion Cologne",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Notes",
            "type": "select",
            "value": "",
            "options": [
              "Woody",
              "Fresh",
              "Spicy",
              "Citrus",
              "Aquatic",
              "Gourmand"
            ]
          },
          {
            "label": "Intensity",
            "type": "select",
            "value": "",
            "options": [
              "Light",
              "Medium",
              "Strong"
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
        "id": "muscle-sport",
        "name": "Muscle & Sport",
        "image": "bodycare-male-muscle-sport",
        "fields": [
          {
            "label": "Muscle Rub",
            "type": "text",
            "value": ""
          },
          {
            "label": "Recovery Method",
            "type": "select",
            "value": "",
            "options": [
              "Ice Bath",
              "Epsom Salt",
              "Foam Roll",
              "Massage",
              "Nothing"
            ]
          },
          {
            "label": "Cooling Gel",
            "type": "text",
            "value": ""
          },
          {
            "label": "Heating Patch",
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
        "id": "powders",
        "name": "Powders",
        "image": "bodycare-male-powders",
        "fields": [
          {
            "label": "Body Powder",
            "type": "text",
            "value": ""
          },
          {
            "label": "Foot Powder",
            "type": "text",
            "value": ""
          },
          {
            "label": "Preferred Brand",
            "type": "text",
            "value": ""
          },
          {
            "label": "Usage",
            "type": "select",
            "value": "",
            "options": [
              "Daily",
              "After Sport",
              "As Needed"
            ]
          },
          {
            "label": "Scented or Unscented",
            "type": "select",
            "value": "",
            "options": [
              "Scented",
              "Unscented"
            ]
          },
          {
            "label": "Notes",
            "type": "text",
            "value": ""
          }
        ]
      },
      {
        "id": "supplements",
        "name": "Supplements",
        "image": "bodycare-male-supplements",
        "fields": [
          {
            "label": "Daily Supplements",
            "type": "text",
            "value": ""
          },
          {
            "label": "Protein",
            "type": "text",
            "value": ""
          },
          {
            "label": "Pre-Workout",
            "type": "text",
            "value": ""
          },
          {
            "label": "Vitamins",
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
];
