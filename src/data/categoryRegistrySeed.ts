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
        "image": "dining-fast-food-quick",
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
        "image": "dining-casual-fine-dining",
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
        "image": "dining-cafes-bakeries",
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
        "image": "dining-international-cuisines",
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
        "image": "dining-deli-sandwiches",
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
        "image": "dining-specialty-popups",
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
    ]
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
        "image": "grocery-fresh-produce",
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
        "image": "grocery-meat-poultry-seafood",
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
        "image": "grocery-dairy-refrigerated",
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
        "image": "grocery-grains-pasta-baking",
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
        "image": "grocery-snacks-confectionery",
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
        "image": "grocery-condiments-sauces",
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
    ]
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
        "image": "beverages-coffee-tea",
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
        "image": "beverages-soft-drinks-sodas",
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
        "image": "beverages-juices-smoothies",
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
        "image": "beverages-beer-cider",
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
        "image": "beverages-wine-sparkling",
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
        "image": "beverages-spirits-cocktails",
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
    ]
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
        "image": "dining-fast-food-quick",
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
        "image": "dining-casual-fine-dining",
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
        "image": "dining-cafes-bakeries",
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
        "image": "dining-international-cuisines",
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
        "image": "dining-deli-sandwiches",
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
        "image": "dining-specialty-popups",
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
    ]
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
        "image": "grocery-fresh-produce",
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
        "image": "grocery-meat-poultry-seafood",
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
        "image": "grocery-dairy-refrigerated",
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
        "image": "grocery-grains-pasta-baking",
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
        "image": "grocery-snacks-confectionery",
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
        "image": "grocery-condiments-sauces",
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
    ]
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
        "image": "beverages-coffee-tea",
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
        "image": "beverages-soft-drinks-sodas",
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
        "image": "beverages-juices-smoothies",
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
        "image": "beverages-beer-cider",
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
        "image": "beverages-wine-sparkling",
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
        "image": "beverages-spirits-cocktails",
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
    ]
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
        "image": "dining-fast-food-quick",
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
        "image": "dining-casual-fine-dining",
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
        "image": "dining-cafes-bakeries",
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
        "image": "dining-international-cuisines",
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
        "image": "dining-deli-sandwiches",
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
        "image": "dining-specialty-popups",
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
    ]
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
        "image": "grocery-fresh-produce",
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
        "image": "grocery-meat-poultry-seafood",
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
        "image": "grocery-dairy-refrigerated",
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
        "image": "grocery-grains-pasta-baking",
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
        "image": "grocery-snacks-confectionery",
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
        "image": "grocery-condiments-sauces",
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
    ]
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
        "image": "beverages-coffee-tea",
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
        "image": "beverages-soft-drinks-sodas",
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
        "image": "beverages-juices-smoothies",
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
        "image": "beverages-beer-cider",
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
        "image": "beverages-wine-sparkling",
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
        "image": "beverages-spirits-cocktails",
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
    ]
  }
];
