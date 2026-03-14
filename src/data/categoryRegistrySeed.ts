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
        "image": "restaurants-cuisines",
        "products": [
          {
            "id": "asian",
            "name": "Asian",
            "image": "restaurants-asian",
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
            "image": "restaurants-italian",
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
            "image": "restaurants-mexican",
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
            "image": "restaurants-american",
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
            "image": "restaurants-mediterranean",
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
            "image": "restaurants-sushi",
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
            "image": "restaurants-indian",
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
            "image": "restaurants-thai",
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
            "image": "restaurants-bbq",
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
            "image": "restaurants-greek",
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
            "image": "restaurants-middle-eastern",
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
            "image": "restaurants-french",
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
        "image": "coffee-orders",
        "products": [
          {
            "id": "hot-coffee",
            "name": "Hot Coffee",
            "image": "coffee-hot-coffee",
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
                  "Stevia"
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
            "image": "coffee-iced-coffee",
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
            "image": "coffee-cold-brew",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "latte",
            "name": "Latte",
            "image": "coffee-latte",
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
            "image": "coffee-matcha",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "juice-smoothie",
            "name": "Juice / Smoothie",
            "image": "coffee-juice-smoothie",
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
        "image": "grocery-categories",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bread-bakery",
            "name": "Bread & Bakery",
            "image": "grocery-bread-bakery",
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
        "image": "meals-meals",
        "products": [
          {
            "id": "breakfast",
            "name": "Breakfast",
            "image": "meals-breakfast",
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
            "image": "meals-brunch",
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
            "image": "meals-lunch",
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
            "image": "meals-dinner",
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
            "image": "meals-dessert",
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
            "image": "meals-late-night",
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
            "name": "Snack Time",
            "image": "meals-snack-time",
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
            "id": "comfort-food",
            "name": "Comfort Food",
            "image": "meals-comfort-food",
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
        "image": "dietary-preferences",
        "products": [
          {
            "id": "diet-type",
            "name": "Diet Type",
            "image": "dietary-diet-type",
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
            "image": "dietary-allergies",
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
            "image": "dietary-intolerances",
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
            "image": "dietary-foods-i-avoid",
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
            "image": "dietary-preferred-cuisines",
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
            "image": "dietary-cheat-meal",
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
            "image": "dietary-health-goals",
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
        "image": "fast-food-chains",
        "products": [
          {
            "id": "burgers",
            "name": "Burgers",
            "image": "fast-food-burgers",
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
            "image": "fast-food-chicken",
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
            "image": "fast-food-mexican",
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
            "image": "fast-food-pizza",
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
            "image": "fast-food-asian",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sandwiches",
            "name": "Sandwiches",
            "image": "fast-food-sandwiches",
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
            "image": "fast-food-my-usual",
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
        "image": "cooking-style",
        "products": [
          {
            "id": "skill-level",
            "name": "Skill Level",
            "image": "cooking-skill-level",
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
            "image": "cooking-favorite-meals",
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
            "image": "cooking-go-to-recipes",
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
            "image": "cooking-kitchen-tools",
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
            "image": "cooking-meal-prep",
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
            "image": "cooking-cuisines-i-cook",
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
            "image": "cooking-comfort-dishes",
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
        "image": "restaurants-cuisines",
        "products": [
          {
            "id": "asian",
            "name": "Asian",
            "image": "restaurants-asian",
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
            "image": "restaurants-italian",
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
            "image": "restaurants-mexican",
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
            "image": "restaurants-american",
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
            "image": "restaurants-mediterranean",
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
            "image": "restaurants-sushi",
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
            "image": "restaurants-indian",
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
            "image": "restaurants-thai",
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
            "image": "restaurants-bbq",
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
            "image": "restaurants-greek",
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
            "image": "restaurants-middle-eastern",
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
            "image": "restaurants-french",
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
        "image": "coffee-orders",
        "products": [
          {
            "id": "hot-coffee",
            "name": "Hot Coffee",
            "image": "coffee-hot-coffee",
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
                  "Stevia"
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
            "image": "coffee-iced-coffee",
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
            "image": "coffee-cold-brew",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "latte",
            "name": "Latte",
            "image": "coffee-latte",
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
            "image": "coffee-matcha",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "juice-smoothie",
            "name": "Juice / Smoothie",
            "image": "coffee-juice-smoothie",
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
        "image": "grocery-categories",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bread-bakery",
            "name": "Bread & Bakery",
            "image": "grocery-bread-bakery",
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
        "image": "meals-meals",
        "products": [
          {
            "id": "breakfast",
            "name": "Breakfast",
            "image": "meals-breakfast",
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
            "image": "meals-brunch",
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
            "image": "meals-lunch",
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
            "image": "meals-dinner",
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
            "image": "meals-dessert",
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
            "image": "meals-late-night",
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
            "name": "Snack Time",
            "image": "meals-snack-time",
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
            "id": "comfort-food",
            "name": "Comfort Food",
            "image": "meals-comfort-food",
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
        "image": "dietary-preferences",
        "products": [
          {
            "id": "diet-type",
            "name": "Diet Type",
            "image": "dietary-diet-type",
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
            "image": "dietary-allergies",
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
            "image": "dietary-intolerances",
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
            "image": "dietary-foods-i-avoid",
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
            "image": "dietary-preferred-cuisines",
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
            "image": "dietary-cheat-meal",
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
            "image": "dietary-health-goals",
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
        "image": "fast-food-chains",
        "products": [
          {
            "id": "burgers",
            "name": "Burgers",
            "image": "fast-food-burgers",
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
            "image": "fast-food-chicken",
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
            "image": "fast-food-mexican",
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
            "image": "fast-food-pizza",
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
            "image": "fast-food-asian",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sandwiches",
            "name": "Sandwiches",
            "image": "fast-food-sandwiches",
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
            "image": "fast-food-my-usual",
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
        "image": "cooking-style",
        "products": [
          {
            "id": "skill-level",
            "name": "Skill Level",
            "image": "cooking-skill-level",
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
            "image": "cooking-favorite-meals",
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
            "image": "cooking-go-to-recipes",
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
            "image": "cooking-kitchen-tools",
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
            "image": "cooking-meal-prep",
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
            "image": "cooking-cuisines-i-cook",
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
            "image": "cooking-comfort-dishes",
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
        "image": "restaurants-cuisines",
        "products": [
          {
            "id": "asian",
            "name": "Asian",
            "image": "restaurants-asian",
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
            "image": "restaurants-italian",
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
            "image": "restaurants-mexican",
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
            "image": "restaurants-american",
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
            "image": "restaurants-mediterranean",
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
            "image": "restaurants-sushi",
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
            "image": "restaurants-indian",
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
            "image": "restaurants-thai",
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
            "image": "restaurants-bbq",
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
            "image": "restaurants-greek",
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
            "image": "restaurants-middle-eastern",
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
            "image": "restaurants-french",
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
        "image": "coffee-orders",
        "products": [
          {
            "id": "hot-coffee",
            "name": "Hot Coffee",
            "image": "coffee-hot-coffee",
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
                  "Stevia"
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
            "image": "coffee-iced-coffee",
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
            "image": "coffee-cold-brew",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "latte",
            "name": "Latte",
            "image": "coffee-latte",
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
            "image": "coffee-matcha",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "juice-smoothie",
            "name": "Juice / Smoothie",
            "image": "coffee-juice-smoothie",
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
        "image": "grocery-categories",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "bread-bakery",
            "name": "Bread & Bakery",
            "image": "grocery-bread-bakery",
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
        "image": "meals-meals",
        "products": [
          {
            "id": "breakfast",
            "name": "Breakfast",
            "image": "meals-breakfast",
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
            "image": "meals-brunch",
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
            "image": "meals-lunch",
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
            "image": "meals-dinner",
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
            "image": "meals-dessert",
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
            "image": "meals-late-night",
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
            "name": "Snack Time",
            "image": "meals-snack-time",
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
            "id": "comfort-food",
            "name": "Comfort Food",
            "image": "meals-comfort-food",
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
        "image": "dietary-preferences",
        "products": [
          {
            "id": "diet-type",
            "name": "Diet Type",
            "image": "dietary-diet-type",
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
            "image": "dietary-allergies",
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
            "image": "dietary-intolerances",
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
            "image": "dietary-foods-i-avoid",
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
            "image": "dietary-preferred-cuisines",
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
            "image": "dietary-cheat-meal",
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
            "image": "dietary-health-goals",
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
        "image": "fast-food-chains",
        "products": [
          {
            "id": "burgers",
            "name": "Burgers",
            "image": "fast-food-burgers",
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
            "image": "fast-food-chicken",
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
            "image": "fast-food-mexican",
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
            "image": "fast-food-pizza",
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
            "image": "fast-food-asian",
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
                "label": "Notes",
                "type": "text",
                "value": ""
              }
            ]
          },
          {
            "id": "sandwiches",
            "name": "Sandwiches",
            "image": "fast-food-sandwiches",
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
            "image": "fast-food-my-usual",
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
        "image": "cooking-style",
        "products": [
          {
            "id": "skill-level",
            "name": "Skill Level",
            "image": "cooking-skill-level",
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
            "image": "cooking-favorite-meals",
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
            "image": "cooking-go-to-recipes",
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
            "image": "cooking-kitchen-tools",
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
            "image": "cooking-meal-prep",
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
            "image": "cooking-cuisines-i-cook",
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
            "image": "cooking-comfort-dishes",
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
  }
];
