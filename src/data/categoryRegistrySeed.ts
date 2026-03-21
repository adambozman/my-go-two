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
            "id": "classic-crew",
            "name": "T-Shirt",
            "image": "everyday-male-tops-classic-crew",
            "fields": [
              {
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
            "id": "boxy-tee",
            "name": "Long Sleeve Tee",
            "image": "everyday-male-tops-boxy-tee",
            "fields": [
              {
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
            "id": "henley",
            "name": "Henley",
            "image": "everyday-male-tops-henley",
            "fields": [
              {
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
            "id": "textured-tee",
            "name": "Hoodie",
            "image": "everyday-male-tops-textured-tee",
            "fields": [
              {
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
            "id": "tank-top",
            "name": "Tank Top",
            "image": "everyday-male-tops-tank-top",
            "fields": [
              {
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
            "id": "pocket-tee",
            "name": "Button-Up Shirt",
            "image": "everyday-male-tops-pocket-tee",
            "fields": [
              {
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
            "id": "relaxed-chinos",
            "name": "Chinos",
            "image": "everyday-male-bottoms-relaxed-chinos",
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
            "id": "straight-denim",
            "name": "Jeans",
            "image": "everyday-male-bottoms-straight-denim",
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
            "id": "linen-trousers",
            "name": "Casual Trousers",
            "image": "everyday-male-bottoms-linen-trousers",
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
            "id": "corduroy-pants",
            "name": "Shorts",
            "image": "everyday-male-bottoms-corduroy-pants",
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
            "id": "knit-trousers",
            "name": "Joggers",
            "image": "everyday-male-bottoms-knit-trousers",
            "fields": [
              {
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
            "id": "leather-sneaker",
            "name": "Sneakers",
            "image": "everyday-male-footwear-leather-sneaker",
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
            "id": "suede-chukka",
            "name": "Boots",
            "image": "everyday-male-footwear-suede-chukka",
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
            "id": "retro-runner",
            "name": "Running Shoes",
            "image": "everyday-male-footwear-retro-runner",
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
            "id": "canvas-slip-on",
            "name": "Slip-Ons",
            "image": "everyday-male-footwear-canvas-slip-on",
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
            "id": "artisan-boot",
            "name": "Loafers",
            "image": "everyday-male-footwear-artisan-boot",
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
            "id": "casual-chelsea",
            "name": "Sandals",
            "image": "everyday-male-footwear-casual-chelsea",
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
            "id": "barn-coat",
            "name": "Coat",
            "image": "everyday-male-outerwear-barn-coat",
            "fields": [
              {
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
            "id": "harrington",
            "name": "Jacket",
            "image": "everyday-male-outerwear-harrington",
            "fields": [
              {
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
            "id": "denim-trucker",
            "name": "Overshirt",
            "image": "everyday-male-outerwear-denim-trucker",
            "fields": [
              {
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
            "id": "quilted-liner",
            "name": "Rain Jacket",
            "image": "everyday-male-outerwear-quilted-liner",
            "fields": [
              {
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
            "id": "sherpa-fleece",
            "name": "Fleece",
            "image": "everyday-male-outerwear-sherpa-fleece",
            "fields": [
              {
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
            "id": "bomber",
            "name": "Bomber Jacket",
            "image": "everyday-male-outerwear-bomber",
            "fields": [
              {
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
            "id": "leather-watch",
            "name": "Watch",
            "image": "everyday-male-accessories-leather-watch",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
            "id": "slim-wallet",
            "name": "Wallet",
            "image": "everyday-male-accessories-slim-wallet",
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
            "id": "wayfarer-shades",
            "name": "Sunglasses",
            "image": "everyday-male-accessories-wayfarer-shades",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
            "id": "beaded-bracelet",
            "name": "Bracelet",
            "image": "everyday-male-accessories-beaded-bracelet",
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
            "id": "canvas-weekender",
            "name": "Bag",
            "image": "everyday-male-accessories-canvas-weekender",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
            "id": "casual-belt",
            "name": "Belt",
            "image": "everyday-male-accessories-casual-belt",
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
        "id": "underwear",
        "name": "Underwear",
        "image": "everyday-male-underwear",
        "products": [
          {
            "id": "cotton-boxer-brief",
            "name": "Boxer Briefs",
            "image": "everyday-male-underwear-cotton-boxer-brief",
            "fields": [
              {
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
            "id": "micromodal-trunk",
            "name": "Trunks",
            "image": "everyday-male-underwear-micromodal-trunk",
            "fields": [
              {
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
            "id": "woven-boxer",
            "name": "Boxers",
            "image": "everyday-male-underwear-woven-boxer",
            "fields": [
              {
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
            "id": "low-rise-brief",
            "name": "Briefs",
            "image": "everyday-male-underwear-low-rise-brief",
            "fields": [
              {
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
            "id": "seamless-boxer-brief",
            "name": "Undershirt",
            "image": "everyday-male-underwear-seamless-boxer-brief",
            "fields": [
              {
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
            "id": "bamboo-trunk",
            "name": "Socks",
            "image": "everyday-male-underwear-bamboo-trunk",
            "fields": [
              {
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
            "id": "button-up",
            "name": "Oxford Shirt",
            "image": "dress-male-tops-button-up",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Slim", "Regular", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "dress-shirt",
            "name": "Collared Dress Shirt",
            "image": "dress-male-tops-dress-shirt",
            "fields": [
              { "label": "Neck Size", "type": "text", "value": "" },
              { "label": "Sleeve Length", "type": "text", "value": "" },
              { "label": "Fit", "type": "select", "value": "", "options": ["Slim", "Regular", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "undershirt",
            "name": "Undershirt",
            "image": "dress-male-tops-undershirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Style", "type": "select", "value": "", "options": ["Crew Neck", "V-Neck", "Tank"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sweater",
            "name": "Formal Sweater",
            "image": "dress-male-tops-sweater",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Style", "type": "select", "value": "", "options": ["Crewneck", "V-Neck", "Turtleneck", "Quarter-Zip"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "polo",
            "name": "Formal Polo",
            "image": "dress-male-tops-polo",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
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
            "id": "smart-chinos",
            "name": "Formal Chinos",
            "image": "dress-male-bottoms-smart-chinos",
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
            "id": "flannel-trousers",
            "name": "Suit Pants",
            "image": "dress-male-bottoms-flannel-trousers",
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
            "id": "pleated-pants",
            "name": "Pleated Pants",
            "image": "dress-male-bottoms-pleated-pants",
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
            "id": "oxford-wingtip",
            "name": "Oxfords",
            "image": "dress-male-footwear-oxford-wingtip",
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
            "id": "penny-loafer",
            "name": "Loafers",
            "image": "dress-male-footwear-penny-loafer",
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
            "id": "hybrid-dress-sneaker",
            "name": "Dress Sneakers",
            "image": "dress-male-footwear-hybrid-dress-sneaker",
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
            "id": "polished-chelsea",
            "name": "Formal Boots",
            "image": "dress-male-footwear-polished-chelsea",
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
            "id": "wool-overcoat",
            "name": "Overcoat",
            "image": "dress-male-outerwear-wool-overcoat",
            "fields": [
              {
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
            "id": "peacoat",
            "name": "Peacoat",
            "image": "dress-male-outerwear-peacoat",
            "fields": [
              {
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
            "id": "chesterfield",
            "name": "Chesterfield Coat",
            "image": "dress-male-outerwear-chesterfield",
            "fields": [
              {
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
            "id": "suede-racer",
            "name": "Sport Jacket",
            "image": "dress-male-outerwear-suede-racer",
            "fields": [
              {
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
            "id": "dress-watch",
            "name": "Watch",
            "image": "dress-male-accessories-dress-watch",
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
            "id": "silk-tie",
            "name": "Tie",
            "image": "dress-male-accessories-silk-tie",
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
            "id": "pocket-square",
            "name": "Pocket Square",
            "image": "dress-male-accessories-pocket-square",
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
            "id": "dress-belt",
            "name": "Belt",
            "image": "dress-male-accessories-dress-belt",
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
            "id": "tie-bar",
            "name": "Tie Bar",
            "image": "dress-male-accessories-tie-bar",
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
        "id": "underwear",
        "name": "Underwear",
        "image": "dress-male-underwear",
        "products": [
          {
            "id": "luxury-modal-brief",
            "name": "Boxer Briefs",
            "image": "dress-male-underwear-luxury-modal-brief",
            "fields": [
              {
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
            "id": "contour-trunk",
            "name": "Trunks",
            "image": "dress-male-underwear-contour-trunk",
            "fields": [
              {
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
            "id": "high-rise-brief",
            "name": "Briefs",
            "image": "dress-male-underwear-high-rise-brief",
            "fields": [
              {
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
            "id": "silver-boxer-brief",
            "name": "Long Boxer Briefs",
            "image": "dress-male-underwear-silver-boxer-brief",
            "fields": [
              {
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
            "id": "air-mesh-brief",
            "name": "Performance Briefs",
            "image": "dress-male-underwear-air-mesh-brief",
            "fields": [
              {
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
            "id": "tapered-knit-boxer",
            "name": "Boxers",
            "image": "dress-male-underwear-tapered-knit-boxer",
            "fields": [
              {
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
            "id": "performance-tee",
            "name": "Workout Shirt",
            "image": "athletic-male-tops-performance-tee",
            "fields": [
              {
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
            "id": "pullover-hoodie",
            "name": "Performance Hoodie",
            "image": "athletic-male-tops-pullover-hoodie",
            "fields": [
              {
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
            "id": "crewneck-sweatshirt",
            "name": "Training Sweatshirt",
            "image": "athletic-male-tops-crewneck-sweatshirt",
            "fields": [
              {
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
            "id": "quarter-zip",
            "name": "Quarter-Zip",
            "image": "athletic-male-tops-quarter-zip",
            "fields": [
              {
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
            "id": "sleeveless-top",
            "name": "Performance Tank",
            "image": "athletic-male-tops-sleeveless-top",
            "fields": [
              {
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
            "id": "compression-layer",
            "name": "Compression Top",
            "image": "athletic-male-tops-compression-layer",
            "fields": [
              {
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
            "id": "performance-joggers",
            "name": "Joggers",
            "image": "athletic-male-bottoms-performance-joggers",
            "fields": [
              {
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
            "id": "running-shorts",
            "name": "Running Shorts",
            "image": "athletic-male-bottoms-running-shorts",
            "fields": [
              {
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
            "id": "training-pants",
            "name": "Training Pants",
            "image": "athletic-male-bottoms-training-pants",
            "fields": [
              {
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
            "id": "fleece-shorts",
            "name": "Training Shorts",
            "image": "athletic-male-bottoms-fleece-shorts",
            "fields": [
              {
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
            "id": "hybrid-shorts",
            "name": "Cross-Training Shorts",
            "image": "athletic-male-bottoms-hybrid-shorts",
            "fields": [
              {
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
            "id": "trail-runner",
            "name": "Trail Shoes",
            "image": "athletic-male-footwear-trail-runner",
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
            "id": "training-shoe",
            "name": "Training Shoes",
            "image": "athletic-male-footwear-training-shoe",
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
            "id": "tech-runner",
            "name": "Gym Shoes",
            "image": "athletic-male-footwear-tech-runner",
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
            "id": "slip-in",
            "name": "Recovery Shoes",
            "image": "athletic-male-footwear-slip-in",
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
            "id": "tech-utility-boot",
            "name": "Hiking Boots",
            "image": "athletic-male-footwear-tech-utility-boot",
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
            "id": "road-runner",
            "name": "Running Shoes",
            "image": "athletic-male-footwear-road-runner",
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
            "id": "tech-shell",
            "name": "Training Jacket",
            "image": "athletic-male-outerwear-tech-shell",
            "fields": [
              {
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
            "id": "down-puffer",
            "name": "Puffer Jacket",
            "image": "athletic-male-outerwear-down-puffer",
            "fields": [
              {
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
            "id": "softshell-windbreaker",
            "name": "Windbreaker",
            "image": "athletic-male-outerwear-softshell-windbreaker",
            "fields": [
              {
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
            "id": "insulated-parka",
            "name": "Parka",
            "image": "athletic-male-outerwear-insulated-parka",
            "fields": [
              {
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
            "id": "rain-anorak",
            "name": "Rain Jacket",
            "image": "athletic-male-outerwear-rain-anorak",
            "fields": [
              {
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
            "id": "hybrid-trekking",
            "name": "Hiking Jacket",
            "image": "athletic-male-outerwear-hybrid-trekking",
            "fields": [
              {
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
            "id": "smartwatch",
            "name": "Fitness Watch",
            "image": "athletic-male-accessories-smartwatch",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
            "id": "performance-cap",
            "name": "Hat",
            "image": "athletic-male-accessories-performance-cap",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
            "id": "sport-sunglasses",
            "name": "Sport Sunglasses",
            "image": "athletic-male-accessories-sport-sunglasses",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
            "id": "gym-bag",
            "name": "Gym Bag",
            "image": "athletic-male-accessories-gym-bag",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
            "id": "water-bottle",
            "name": "Water Bottle",
            "image": "athletic-male-accessories-water-bottle",
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
            "id": "sweatband",
            "name": "Headband",
            "image": "athletic-male-accessories-sweatband",
            "fields": [
              {
                "label": "Preferred Brands",
                "type": "text",
                "value": ""
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
        "id": "underwear",
        "name": "Underwear",
        "image": "athletic-male-underwear",
        "products": [
          {
            "id": "compression-short",
            "name": "Compression Shorts",
            "image": "athletic-male-underwear-compression-short",
            "fields": [
              {
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
            "id": "hammock-boxer",
            "name": "Boxer Briefs",
            "image": "athletic-male-underwear-hammock-boxer",
            "fields": [
              {
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
            "id": "long-leg-boxer",
            "name": "Long Boxer Briefs",
            "image": "athletic-male-underwear-long-leg-boxer",
            "fields": [
              {
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
            "id": "merino-boxer",
            "name": "Performance Briefs",
            "image": "athletic-male-underwear-merino-boxer",
            "fields": [
              {
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
            "id": "jockstrap",
            "name": "Jockstrap",
            "image": "athletic-male-underwear-jockstrap",
            "fields": [
              {
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
            "id": "microfiber-trunk",
            "name": "Trunks",
            "image": "athletic-male-underwear-microfiber-trunk",
            "fields": [
              {
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
        "products": [
          {
            "id": "t-shirt",
            "name": "T-Shirt",
            "image": "everyday-female-tops-t-shirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "long-sleeve-top",
            "name": "Long Sleeve Top",
            "image": "everyday-female-tops-long-sleeve-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "blouse",
            "name": "Blouse",
            "image": "everyday-female-tops-blouse",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Fitted", "Regular", "Relaxed", "Oversized"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "tank-top",
            "name": "Tank Top",
            "image": "everyday-female-tops-tank-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sweater",
            "name": "Sweater",
            "image": "everyday-female-tops-sweater",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Weight", "type": "select", "value": "", "options": ["Lightweight", "Midweight", "Heavyweight"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "cardigan",
            "name": "Cardigan",
            "image": "everyday-female-tops-cardigan",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Cropped", "Regular", "Long"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "everyday-female-bottoms",
        "products": [
          {
            "id": "jeans",
            "name": "Jeans",
            "image": "everyday-female-bottoms-jeans",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Fit", "type": "select", "value": "", "options": ["Skinny", "Slim", "Straight", "Wide Leg", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "trousers",
            "name": "Trousers",
            "image": "everyday-female-bottoms-trousers",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Rise", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "skirt",
            "name": "Skirt",
            "image": "everyday-female-bottoms-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mini", "Midi", "Maxi"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "shorts",
            "name": "Shorts",
            "image": "everyday-female-bottoms-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Rise", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "leggings",
            "name": "Leggings",
            "image": "everyday-female-bottoms-leggings",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["7/8", "Full Length", "Capri"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "joggers",
            "name": "Joggers",
            "image": "everyday-female-bottoms-joggers",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Slim", "Regular", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "everyday-female-footwear",
        "products": [
          {
            "id": "sneakers",
            "name": "Sneakers",
            "image": "everyday-female-footwear-sneakers",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Width", "type": "select", "value": "", "options": ["Narrow", "Standard", "Wide"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "boots",
            "name": "Boots",
            "image": "everyday-female-footwear-boots",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Boot Height", "type": "select", "value": "", "options": ["Ankle", "Mid", "Knee"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "running-shoes",
            "name": "Running Shoes",
            "image": "everyday-female-footwear-running-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Neutral", "Stability", "Max Cushion"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "flats",
            "name": "Flats",
            "image": "everyday-female-footwear-flats",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Toe Shape", "type": "select", "value": "", "options": ["Round", "Pointed", "Square"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "loafers",
            "name": "Loafers",
            "image": "everyday-female-footwear-loafers",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sandals",
            "name": "Sandals",
            "image": "everyday-female-footwear-sandals",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Slides", "Flat Sandals", "Sport Sandals", "Strappy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "everyday-female-outerwear",
        "products": [
          {
            "id": "coat",
            "name": "Coat",
            "image": "everyday-female-outerwear-coat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Short", "Mid", "Long"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "jacket",
            "name": "Jacket",
            "image": "everyday-female-outerwear-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Fitted", "Regular", "Oversized"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "overshirt",
            "name": "Overshirt",
            "image": "everyday-female-outerwear-overshirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "rain-jacket",
            "name": "Rain Jacket",
            "image": "everyday-female-outerwear-rain-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Waterproof Level", "type": "select", "value": "", "options": ["Light", "Medium", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "fleece",
            "name": "Fleece",
            "image": "everyday-female-outerwear-fleece",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Weight", "type": "select", "value": "", "options": ["Lightweight", "Midweight", "Heavyweight"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bomber-jacket",
            "name": "Bomber Jacket",
            "image": "everyday-female-outerwear-bomber-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "everyday-female-accessories",
        "products": [
          {
            "id": "watch",
            "name": "Watch",
            "image": "everyday-female-accessories-watch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "wallet",
            "name": "Wallet",
            "image": "everyday-female-accessories-wallet",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Material", "type": "select", "value": "", "options": ["Leather", "Canvas", "Synthetic"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sunglasses",
            "name": "Sunglasses",
            "image": "everyday-female-accessories-sunglasses",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Frame Shape", "type": "select", "value": "", "options": ["Cat Eye", "Round", "Square", "Aviator"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "necklace",
            "name": "Necklace",
            "image": "everyday-female-accessories-necklace",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bag",
            "name": "Bag",
            "image": "everyday-female-accessories-bag",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Tote", "Crossbody", "Shoulder", "Backpack"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "belt",
            "name": "Belt",
            "image": "everyday-female-accessories-belt",
            "fields": [
              { "label": "Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "everyday-female-underwear",
        "products": [
          {
            "id": "bra",
            "name": "Bra",
            "image": "everyday-female-underwear-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bralette",
            "name": "Bralette",
            "image": "everyday-female-underwear-bralette",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "underwear",
            "name": "Underwear",
            "image": "everyday-female-underwear-underwear",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Cut", "type": "select", "value": "", "options": ["Brief", "Bikini", "Hipster", "Thong"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "briefs",
            "name": "Briefs",
            "image": "everyday-female-underwear-briefs",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Rise", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "cami",
            "name": "Cami",
            "image": "everyday-female-underwear-cami",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "socks",
            "name": "Socks",
            "image": "everyday-female-underwear-socks",
            "fields": [
              { "label": "Sock Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
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
        "products": [
          {
            "id": "blouse",
            "name": "Blouse",
            "image": "dress-female-tops-blouse",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "collared-dress-shirt",
            "name": "Collared Dress Shirt",
            "image": "dress-female-tops-collared-dress-shirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "camisole",
            "name": "Camisole",
            "image": "dress-female-tops-camisole",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "formal-sweater",
            "name": "Formal Sweater",
            "image": "dress-female-tops-formal-sweater",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "dressy-top",
            "name": "Dressy Top",
            "image": "dress-female-tops-dressy-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Style", "type": "select", "value": "", "options": ["Structured", "Soft", "Statement"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bodysuit",
            "name": "Bodysuit",
            "image": "dress-female-tops-bodysuit",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "dress-female-bottoms",
        "products": [
          {
            "id": "skirt",
            "name": "Skirt",
            "image": "dress-female-bottoms-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mini", "Midi", "Maxi"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "suit-skirt",
            "name": "Suit Skirt",
            "image": "dress-female-bottoms-suit-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Above Knee", "Knee", "Midi"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "wide-leg-pants",
            "name": "Wide-Leg Pants",
            "image": "dress-female-bottoms-wide-leg-pants",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "dress-female-footwear",
        "products": [
          {
            "id": "heels",
            "name": "Heels",
            "image": "dress-female-footwear-heels",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Heel Height", "type": "select", "value": "", "options": ["Kitten", "Mid", "High", "Stiletto"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "loafers",
            "name": "Loafers",
            "image": "dress-female-footwear-loafers",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "pumps",
            "name": "Pumps",
            "image": "dress-female-footwear-pumps",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Heel Height", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "slingbacks",
            "name": "Slingbacks",
            "image": "dress-female-footwear-slingbacks",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "dress-sandals",
            "name": "Dress Sandals",
            "image": "dress-female-footwear-dress-sandals",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Heel Height", "type": "select", "value": "", "options": ["Flat", "Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "formal-boots",
            "name": "Formal Boots",
            "image": "dress-female-footwear-formal-boots",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Boot Height", "type": "select", "value": "", "options": ["Ankle", "Mid", "Knee"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "dress-female-outerwear",
        "products": [
          {
            "id": "overcoat",
            "name": "Overcoat",
            "image": "dress-female-outerwear-overcoat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mid", "Long"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "peacoat",
            "name": "Peacoat",
            "image": "dress-female-outerwear-peacoat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "wrap-coat",
            "name": "Wrap Coat",
            "image": "dress-female-outerwear-wrap-coat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "blazer",
            "name": "Blazer",
            "image": "dress-female-outerwear-blazer",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Tailored", "Regular", "Oversized"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "dress-female-accessories",
        "products": [
          {
            "id": "watch",
            "name": "Watch",
            "image": "dress-female-accessories-watch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "clutch",
            "name": "Clutch",
            "image": "dress-female-accessories-clutch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Material", "type": "select", "value": "", "options": ["Leather", "Satin", "Beaded", "Metallic"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "earrings",
            "name": "Earrings",
            "image": "dress-female-accessories-earrings",
            "fields": [
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Style", "type": "select", "value": "", "options": ["Stud", "Hoop", "Drop", "Statement"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "necklace",
            "name": "Necklace",
            "image": "dress-female-accessories-necklace",
            "fields": [
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Choker", "Short", "Mid", "Long"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "belt",
            "name": "Belt",
            "image": "dress-female-accessories-belt",
            "fields": [
              { "label": "Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "scarf",
            "name": "Scarf",
            "image": "dress-female-accessories-scarf",
            "fields": [
              { "label": "Material", "type": "select", "value": "", "options": ["Silk", "Cashmere", "Wool", "Blend"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "dress-female-underwear",
        "products": [
          {
            "id": "bra",
            "name": "Bra",
            "image": "dress-female-underwear-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "strapless-bra",
            "name": "Strapless Bra",
            "image": "dress-female-underwear-strapless-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "shapewear",
            "name": "Shapewear",
            "image": "dress-female-underwear-shapewear",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Coverage", "type": "select", "value": "", "options": ["Light", "Medium", "Firm"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "slip",
            "name": "Slip",
            "image": "dress-female-underwear-slip",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mini", "Midi", "Maxi"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "tights",
            "name": "Tights",
            "image": "dress-female-underwear-tights",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XS/S", "M/L", "XL/XXL"] },
              { "label": "Opacity", "type": "select", "value": "", "options": ["Sheer", "Semi-Opaque", "Opaque"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hosiery",
            "name": "Hosiery",
            "image": "dress-female-underwear-hosiery",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XS/S", "M/L", "XL/XXL"] },
              { "label": "Style", "type": "select", "value": "", "options": ["Sheer", "Patterned", "Control Top"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
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
        "products": [
          {
            "id": "sports-bra",
            "name": "Sports Bra",
            "image": "athletic-female-tops-sports-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Low", "Medium", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-tee",
            "name": "Performance Tee",
            "image": "athletic-female-tops-performance-tee",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "quarter-zip",
            "name": "Quarter-Zip",
            "image": "athletic-female-tops-quarter-zip",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-tank",
            "name": "Performance Tank",
            "image": "athletic-female-tops-performance-tank",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-hoodie",
            "name": "Performance Hoodie",
            "image": "athletic-female-tops-performance-hoodie",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Weight", "type": "select", "value": "", "options": ["Lightweight", "Midweight", "Heavyweight"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "long-sleeve-performance-top",
            "name": "Long Sleeve Performance Top",
            "image": "athletic-female-tops-long-sleeve-performance-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "athletic-female-bottoms",
        "products": [
          {
            "id": "leggings",
            "name": "Leggings",
            "image": "athletic-female-bottoms-leggings",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["7/8", "Full Length", "Capri"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "running-shorts",
            "name": "Running Shorts",
            "image": "athletic-female-bottoms-running-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["2 in", "3 in", "5 in", "7 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "track-pants",
            "name": "Track Pants",
            "image": "athletic-female-bottoms-track-pants",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bike-shorts",
            "name": "Bike Shorts",
            "image": "athletic-female-bottoms-bike-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["5 in", "7 in", "9 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "joggers",
            "name": "Joggers",
            "image": "athletic-female-bottoms-joggers",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Slim", "Regular", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "tennis-skirt",
            "name": "Tennis Skirt",
            "image": "athletic-female-bottoms-tennis-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Short", "Regular"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "athletic-female-footwear",
        "products": [
          {
            "id": "training-shoes",
            "name": "Training Shoes",
            "image": "athletic-female-footwear-training-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Neutral", "Stability", "Cross-Training"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "running-shoes",
            "name": "Running Shoes",
            "image": "athletic-female-footwear-running-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Neutral", "Stability", "Max Cushion"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "walking-shoes",
            "name": "Walking Shoes",
            "image": "athletic-female-footwear-walking-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "recovery-slides",
            "name": "Recovery Slides",
            "image": "athletic-female-footwear-recovery-slides",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hiking-boots",
            "name": "Hiking Boots",
            "image": "athletic-female-footwear-hiking-boots",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Boot Height", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "court-shoes",
            "name": "Court Shoes",
            "image": "athletic-female-footwear-court-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Sport", "type": "select", "value": "", "options": ["Tennis", "Pickleball", "Padel"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "athletic-female-outerwear",
        "products": [
          {
            "id": "training-jacket",
            "name": "Training Jacket",
            "image": "athletic-female-outerwear-training-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "puffer-jacket",
            "name": "Puffer Jacket",
            "image": "athletic-female-outerwear-puffer-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Warmth", "type": "select", "value": "", "options": ["Light", "Mid", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "windbreaker",
            "name": "Windbreaker",
            "image": "athletic-female-outerwear-windbreaker",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "parka",
            "name": "Parka",
            "image": "athletic-female-outerwear-parka",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Warmth", "type": "select", "value": "", "options": ["Mid", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "rain-jacket",
            "name": "Rain Jacket",
            "image": "athletic-female-outerwear-rain-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Waterproof Level", "type": "select", "value": "", "options": ["Light", "Medium", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hiking-jacket",
            "name": "Hiking Jacket",
            "image": "athletic-female-outerwear-hiking-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "athletic-female-accessories",
        "products": [
          {
            "id": "fitness-watch",
            "name": "Fitness Watch",
            "image": "athletic-female-accessories-fitness-watch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hat",
            "name": "Hat",
            "image": "athletic-female-accessories-hat",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Cap", "Visor", "Beanie"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sport-sunglasses",
            "name": "Sport Sunglasses",
            "image": "athletic-female-accessories-sport-sunglasses",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "gym-bag",
            "name": "Gym Bag",
            "image": "athletic-female-accessories-gym-bag",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Duffel", "Tote", "Backpack"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "water-bottle",
            "name": "Water Bottle",
            "image": "athletic-female-accessories-water-bottle",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Size", "type": "select", "value": "", "options": ["16 oz", "24 oz", "32 oz", "40 oz"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "headband",
            "name": "Headband",
            "image": "athletic-female-accessories-headband",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "athletic-female-underwear",
        "products": [
          {
            "id": "sports-bra",
            "name": "Sports Bra",
            "image": "athletic-female-underwear-sports-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Low", "Medium", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "compression-shorts",
            "name": "Compression Shorts",
            "image": "athletic-female-underwear-compression-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["3 in", "5 in", "7 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-underwear",
            "name": "Performance Underwear",
            "image": "athletic-female-underwear-performance-underwear",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Cut", "type": "select", "value": "", "options": ["Brief", "Bikini", "Hipster", "Thong"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "longline-sports-bra",
            "name": "Longline Sports Bra",
            "image": "athletic-female-underwear-longline-sports-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Low", "Medium", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bike-shorts",
            "name": "Bike Shorts",
            "image": "athletic-female-underwear-bike-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["5 in", "7 in", "9 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "socks",
            "name": "Socks",
            "image": "athletic-female-underwear-socks",
            "fields": [
              { "label": "Sock Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
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
        "products": [
          {
            "id": "t-shirt",
            "name": "T-Shirt",
            "image": "everyday-nb-tops-t-shirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "long-sleeve-top",
            "name": "Long Sleeve Top",
            "image": "everyday-nb-tops-long-sleeve-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "button-up-shirt",
            "name": "Button-Up Shirt",
            "image": "everyday-nb-tops-button-up-shirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Fitted", "Regular", "Relaxed", "Oversized"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "tank-top",
            "name": "Tank Top",
            "image": "everyday-nb-tops-tank-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sweater",
            "name": "Sweater",
            "image": "everyday-nb-tops-sweater",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Weight", "type": "select", "value": "", "options": ["Lightweight", "Midweight", "Heavyweight"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hoodie",
            "name": "Hoodie",
            "image": "everyday-nb-tops-hoodie",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Weight", "type": "select", "value": "", "options": ["Lightweight", "Midweight", "Heavyweight"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "everyday-nb-bottoms",
        "products": [
          {
            "id": "jeans",
            "name": "Jeans",
            "image": "everyday-nb-bottoms-jeans",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Fit", "type": "select", "value": "", "options": ["Skinny", "Slim", "Straight", "Wide Leg", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "trousers",
            "name": "Trousers",
            "image": "everyday-nb-bottoms-trousers",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Rise", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "skirt",
            "name": "Skirt",
            "image": "everyday-nb-bottoms-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mini", "Midi", "Maxi"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "shorts",
            "name": "Shorts",
            "image": "everyday-nb-bottoms-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Rise", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "leggings",
            "name": "Leggings",
            "image": "everyday-nb-bottoms-leggings",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["7/8", "Full Length", "Capri"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "joggers",
            "name": "Joggers",
            "image": "everyday-nb-bottoms-joggers",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Slim", "Regular", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "everyday-nb-footwear",
        "products": [
          {
            "id": "sneakers",
            "name": "Sneakers",
            "image": "everyday-nb-footwear-sneakers",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Width", "type": "select", "value": "", "options": ["Narrow", "Standard", "Wide"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "boots",
            "name": "Boots",
            "image": "everyday-nb-footwear-boots",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Boot Height", "type": "select", "value": "", "options": ["Ankle", "Mid", "Knee"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "running-shoes",
            "name": "Running Shoes",
            "image": "everyday-nb-footwear-running-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Neutral", "Stability", "Max Cushion"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "loafers",
            "name": "Loafers",
            "image": "everyday-nb-footwear-loafers",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sandals",
            "name": "Sandals",
            "image": "everyday-nb-footwear-sandals",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Slides", "Flat Sandals", "Sport Sandals", "Strappy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "slip-ons",
            "name": "Slip-Ons",
            "image": "everyday-nb-footwear-slip-ons",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "everyday-nb-outerwear",
        "products": [
          {
            "id": "coat",
            "name": "Coat",
            "image": "everyday-nb-outerwear-coat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Short", "Mid", "Long"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "jacket",
            "name": "Jacket",
            "image": "everyday-nb-outerwear-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Fitted", "Regular", "Oversized"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "overshirt",
            "name": "Overshirt",
            "image": "everyday-nb-outerwear-overshirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "rain-jacket",
            "name": "Rain Jacket",
            "image": "everyday-nb-outerwear-rain-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Waterproof Level", "type": "select", "value": "", "options": ["Light", "Medium", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "fleece",
            "name": "Fleece",
            "image": "everyday-nb-outerwear-fleece",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Weight", "type": "select", "value": "", "options": ["Lightweight", "Midweight", "Heavyweight"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bomber-jacket",
            "name": "Bomber Jacket",
            "image": "everyday-nb-outerwear-bomber-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "everyday-nb-accessories",
        "products": [
          {
            "id": "watch",
            "name": "Watch",
            "image": "everyday-nb-accessories-watch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "wallet",
            "name": "Wallet",
            "image": "everyday-nb-accessories-wallet",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Material", "type": "select", "value": "", "options": ["Leather", "Canvas", "Synthetic"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sunglasses",
            "name": "Sunglasses",
            "image": "everyday-nb-accessories-sunglasses",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Frame Shape", "type": "select", "value": "", "options": ["Cat Eye", "Round", "Square", "Aviator"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "necklace",
            "name": "Necklace",
            "image": "everyday-nb-accessories-necklace",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bag",
            "name": "Bag",
            "image": "everyday-nb-accessories-bag",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Tote", "Crossbody", "Shoulder", "Backpack"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "belt",
            "name": "Belt",
            "image": "everyday-nb-accessories-belt",
            "fields": [
              { "label": "Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "everyday-nb-underwear",
        "products": [
          {
            "id": "bra",
            "name": "Bra",
            "image": "everyday-nb-underwear-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bralette",
            "name": "Bralette",
            "image": "everyday-nb-underwear-bralette",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "underwear",
            "name": "Underwear",
            "image": "everyday-nb-underwear-underwear",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Cut", "type": "select", "value": "", "options": ["Brief", "Bikini", "Hipster", "Thong", "Boxer"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "briefs",
            "name": "Briefs",
            "image": "everyday-nb-underwear-briefs",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Rise", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "boxers",
            "name": "Boxers",
            "image": "everyday-nb-underwear-boxers",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "socks",
            "name": "Socks",
            "image": "everyday-nb-underwear-socks",
            "fields": [
              { "label": "Sock Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
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
        "products": [
          {
            "id": "dress-shirt",
            "name": "Dress Shirt",
            "image": "dress-nb-tops-dress-shirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "collared-dress-shirt",
            "name": "Collared Dress Shirt",
            "image": "dress-nb-tops-collared-dress-shirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "formal-sweater",
            "name": "Formal Sweater",
            "image": "dress-nb-tops-formal-sweater",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "formal-polo",
            "name": "Formal Polo",
            "image": "dress-nb-tops-formal-polo",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "dressy-top",
            "name": "Dressy Top",
            "image": "dress-nb-tops-dressy-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Style", "type": "select", "value": "", "options": ["Structured", "Soft", "Statement"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bodysuit",
            "name": "Bodysuit",
            "image": "dress-nb-tops-bodysuit",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "dress-nb-bottoms",
        "products": [
          {
            "id": "skirt",
            "name": "Skirt",
            "image": "dress-nb-bottoms-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mini", "Midi", "Maxi"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "suit-skirt",
            "name": "Suit Skirt",
            "image": "dress-nb-bottoms-suit-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Above Knee", "Knee", "Midi"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "wide-leg-pants",
            "name": "Wide-Leg Pants",
            "image": "dress-nb-bottoms-wide-leg-pants",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "dress-nb-footwear",
        "products": [
          {
            "id": "dress-shoes",
            "name": "Dress Shoes",
            "image": "dress-nb-footwear-dress-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "loafers",
            "name": "Loafers",
            "image": "dress-nb-footwear-loafers",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "pumps",
            "name": "Pumps",
            "image": "dress-nb-footwear-pumps",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Heel Height", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "slingbacks",
            "name": "Slingbacks",
            "image": "dress-nb-footwear-slingbacks",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "dress-sandals",
            "name": "Dress Sandals",
            "image": "dress-nb-footwear-dress-sandals",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Heel Height", "type": "select", "value": "", "options": ["Flat", "Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "formal-boots",
            "name": "Formal Boots",
            "image": "dress-nb-footwear-formal-boots",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Boot Height", "type": "select", "value": "", "options": ["Ankle", "Mid", "Knee"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "dress-nb-outerwear",
        "products": [
          {
            "id": "overcoat",
            "name": "Overcoat",
            "image": "dress-nb-outerwear-overcoat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mid", "Long"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "peacoat",
            "name": "Peacoat",
            "image": "dress-nb-outerwear-peacoat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "wrap-coat",
            "name": "Wrap Coat",
            "image": "dress-nb-outerwear-wrap-coat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "blazer",
            "name": "Blazer",
            "image": "dress-nb-outerwear-blazer",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Tailored", "Regular", "Oversized"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "dress-nb-accessories",
        "products": [
          {
            "id": "watch",
            "name": "Watch",
            "image": "dress-nb-accessories-watch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "clutch",
            "name": "Clutch",
            "image": "dress-nb-accessories-clutch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Material", "type": "select", "value": "", "options": ["Leather", "Satin", "Beaded", "Metallic"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "earrings",
            "name": "Earrings",
            "image": "dress-nb-accessories-earrings",
            "fields": [
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Style", "type": "select", "value": "", "options": ["Stud", "Hoop", "Drop", "Statement"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "necklace",
            "name": "Necklace",
            "image": "dress-nb-accessories-necklace",
            "fields": [
              { "label": "Metal Tone", "type": "select", "value": "", "options": ["Gold", "Silver", "Rose Gold", "Mixed"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Choker", "Short", "Mid", "Long"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "belt",
            "name": "Belt",
            "image": "dress-nb-accessories-belt",
            "fields": [
              { "label": "Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "scarf",
            "name": "Scarf",
            "image": "dress-nb-accessories-scarf",
            "fields": [
              { "label": "Material", "type": "select", "value": "", "options": ["Silk", "Cashmere", "Wool", "Blend"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "dress-nb-underwear",
        "products": [
          {
            "id": "bra",
            "name": "Bra",
            "image": "dress-nb-underwear-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "strapless-bra",
            "name": "Strapless Bra",
            "image": "dress-nb-underwear-strapless-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "shapewear",
            "name": "Shapewear",
            "image": "dress-nb-underwear-shapewear",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Coverage", "type": "select", "value": "", "options": ["Light", "Medium", "Firm"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "slip",
            "name": "Slip",
            "image": "dress-nb-underwear-slip",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Mini", "Midi", "Maxi"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "tights",
            "name": "Tights",
            "image": "dress-nb-underwear-tights",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XS/S", "M/L", "XL/XXL"] },
              { "label": "Opacity", "type": "select", "value": "", "options": ["Sheer", "Semi-Opaque", "Opaque"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "boxers",
            "name": "Boxers",
            "image": "dress-nb-underwear-boxers",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
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
        "products": [
          {
            "id": "sports-bra",
            "name": "Sports Bra",
            "image": "athletic-nb-tops-sports-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Low", "Medium", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-tee",
            "name": "Performance Tee",
            "image": "athletic-nb-tops-performance-tee",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "quarter-zip",
            "name": "Quarter-Zip",
            "image": "athletic-nb-tops-quarter-zip",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-tank",
            "name": "Performance Tank",
            "image": "athletic-nb-tops-performance-tank",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-hoodie",
            "name": "Performance Hoodie",
            "image": "athletic-nb-tops-performance-hoodie",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Weight", "type": "select", "value": "", "options": ["Lightweight", "Midweight", "Heavyweight"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "long-sleeve-performance-top",
            "name": "Long Sleeve Performance Top",
            "image": "athletic-nb-tops-long-sleeve-performance-top",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "bottoms",
        "name": "Bottoms",
        "image": "athletic-nb-bottoms",
        "products": [
          {
            "id": "leggings",
            "name": "Leggings",
            "image": "athletic-nb-bottoms-leggings",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["7/8", "Full Length", "Capri"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "running-shorts",
            "name": "Running Shorts",
            "image": "athletic-nb-bottoms-running-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["2 in", "3 in", "5 in", "7 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "track-pants",
            "name": "Track Pants",
            "image": "athletic-nb-bottoms-track-pants",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Keywords", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bike-shorts",
            "name": "Bike Shorts",
            "image": "athletic-nb-bottoms-bike-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["5 in", "7 in", "9 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "joggers",
            "name": "Joggers",
            "image": "athletic-nb-bottoms-joggers",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Fit", "type": "select", "value": "", "options": ["Slim", "Regular", "Relaxed"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "tennis-skirt",
            "name": "Tennis Skirt",
            "image": "athletic-nb-bottoms-tennis-skirt",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Length", "type": "select", "value": "", "options": ["Short", "Regular"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "footwear",
        "name": "Footwear",
        "image": "athletic-nb-footwear",
        "products": [
          {
            "id": "training-shoes",
            "name": "Training Shoes",
            "image": "athletic-nb-footwear-training-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Neutral", "Stability", "Cross-Training"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "running-shoes",
            "name": "Running Shoes",
            "image": "athletic-nb-footwear-running-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Neutral", "Stability", "Max Cushion"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "walking-shoes",
            "name": "Walking Shoes",
            "image": "athletic-nb-footwear-walking-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "recovery-slides",
            "name": "Recovery Slides",
            "image": "athletic-nb-footwear-recovery-slides",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hiking-boots",
            "name": "Hiking Boots",
            "image": "athletic-nb-footwear-hiking-boots",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Boot Height", "type": "select", "value": "", "options": ["Low", "Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "court-shoes",
            "name": "Court Shoes",
            "image": "athletic-nb-footwear-court-shoes",
            "fields": [
              { "label": "US Size", "type": "text", "value": "" },
              { "label": "Sport", "type": "select", "value": "", "options": ["Tennis", "Pickleball", "Padel"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "outerwear",
        "name": "Outerwear",
        "image": "athletic-nb-outerwear",
        "products": [
          {
            "id": "training-jacket",
            "name": "Training Jacket",
            "image": "athletic-nb-outerwear-training-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "puffer-jacket",
            "name": "Puffer Jacket",
            "image": "athletic-nb-outerwear-puffer-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Warmth", "type": "select", "value": "", "options": ["Light", "Mid", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "windbreaker",
            "name": "Windbreaker",
            "image": "athletic-nb-outerwear-windbreaker",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "parka",
            "name": "Parka",
            "image": "athletic-nb-outerwear-parka",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Warmth", "type": "select", "value": "", "options": ["Mid", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "rain-jacket",
            "name": "Rain Jacket",
            "image": "athletic-nb-outerwear-rain-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Waterproof Level", "type": "select", "value": "", "options": ["Light", "Medium", "Heavy"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hiking-jacket",
            "name": "Hiking Jacket",
            "image": "athletic-nb-outerwear-hiking-jacket",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "image": "athletic-nb-accessories",
        "products": [
          {
            "id": "fitness-watch",
            "name": "Fitness Watch",
            "image": "athletic-nb-accessories-fitness-watch",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "hat",
            "name": "Hat",
            "image": "athletic-nb-accessories-hat",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Cap", "Visor", "Beanie"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "sport-sunglasses",
            "name": "Sport Sunglasses",
            "image": "athletic-nb-accessories-sport-sunglasses",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "gym-bag",
            "name": "Gym Bag",
            "image": "athletic-nb-accessories-gym-bag",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Style", "type": "select", "value": "", "options": ["Duffel", "Tote", "Backpack"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "water-bottle",
            "name": "Water Bottle",
            "image": "athletic-nb-accessories-water-bottle",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Size", "type": "select", "value": "", "options": ["16 oz", "24 oz", "32 oz", "40 oz"] },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "headband",
            "name": "Headband",
            "image": "athletic-nb-accessories-headband",
            "fields": [
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
      },
      {
        "id": "underwear",
        "name": "Underwear",
        "image": "athletic-nb-underwear",
        "products": [
          {
            "id": "sports-bra",
            "name": "Sports Bra",
            "image": "athletic-nb-underwear-sports-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Low", "Medium", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "compression-shorts",
            "name": "Compression Shorts",
            "image": "athletic-nb-underwear-compression-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["3 in", "5 in", "7 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "performance-underwear",
            "name": "Performance Underwear",
            "image": "athletic-nb-underwear-performance-underwear",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Cut", "type": "select", "value": "", "options": ["Brief", "Bikini", "Hipster", "Thong", "Boxer"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "longline-sports-bra",
            "name": "Longline Sports Bra",
            "image": "athletic-nb-underwear-longline-sports-bra",
            "fields": [
              { "label": "Band Size", "type": "text", "value": "" },
              { "label": "Cup Size", "type": "text", "value": "" },
              { "label": "Support", "type": "select", "value": "", "options": ["Low", "Medium", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "bike-shorts",
            "name": "Bike Shorts",
            "image": "athletic-nb-underwear-bike-shorts",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
              { "label": "Inseam", "type": "select", "value": "", "options": ["5 in", "7 in", "9 in"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "socks",
            "name": "Socks",
            "image": "athletic-nb-underwear-socks",
            "fields": [
              { "label": "Sock Size", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          }
        ]
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
        "name": "Daily Care",
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
        "name": "Recovery",
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
        "name": "Body Essentials",
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
        "name": "Wellness",
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
  },
  {
    "key": "hygiene-female",
    "label": "Hygiene",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "hygiene-female",
    "subcategories": [
      {
        "id": "oral-care",
        "name": "Oral Care",
        "image": "hygiene-female-oral-care",
        "fields": [
          { "label": "Toothbrush", "type": "select", "value": "", "options": ["Manual", "Electric", "Sonic"] },
          { "label": "Toothpaste", "type": "text", "value": "" },
          { "label": "Floss", "type": "select", "value": "", "options": ["String", "Picks", "Water Flosser", "None"] },
          { "label": "Mouthwash", "type": "text", "value": "" },
          { "label": "Whitening", "type": "select", "value": "", "options": ["Yes", "No", "Sometimes"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "bath-shower",
        "name": "Bath & Shower",
        "image": "hygiene-female-bath-shower",
        "fields": [
          { "label": "Preference", "type": "select", "value": "", "options": ["Shower", "Bath", "Both"] },
          { "label": "Temperature", "type": "select", "value": "", "options": ["Cold", "Warm", "Hot"] },
          { "label": "Body Wash", "type": "text", "value": "" },
          { "label": "Shampoo", "type": "text", "value": "" },
          { "label": "Frequency", "type": "select", "value": "", "options": ["Once a Day", "Twice a Day", "Every Other Day"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "grooming",
        "name": "Grooming",
        "image": "hygiene-female-grooming",
        "fields": [
          { "label": "Hair Removal Style", "type": "select", "value": "", "options": ["Minimal", "Regular", "Occasional", "Professional", "Mixed"] },
          { "label": "Tool Preference", "type": "select", "value": "", "options": ["Razor", "Electric", "Wax", "Laser", "Mixed"] },
          { "label": "Nail Care", "type": "select", "value": "", "options": ["At Home", "Professional", "Both", "Rarely"] },
          { "label": "Preferred Salon or Spa", "type": "text", "value": "" },
          { "label": "Hair Appointment Frequency", "type": "select", "value": "", "options": ["Weekly", "Every 2 Weeks", "Monthly", "Every Few Months", "As Needed"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "repair-restore",
        "name": "Daily Care",
        "image": "hygiene-female-repair-restore",
        "fields": [
          { "label": "Anti-Chafe", "type": "text", "value": "" },
          { "label": "Muscle Relief", "type": "text", "value": "" },
          { "label": "Foot Care", "type": "text", "value": "" },
          { "label": "After Sport Routine", "type": "text", "value": "" },
          { "label": "Recovery Products", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "skincare-female",
    "label": "Skincare",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "skincare-female",
    "subcategories": [
      {
        "id": "face-wash-cleanse",
        "name": "Face Wash & Cleanse",
        "image": "skincare-female-face-wash-cleanse",
        "fields": [
          { "label": "Cleanser", "type": "text", "value": "" },
          { "label": "Skin Type", "type": "select", "value": "", "options": ["Oily", "Dry", "Combination", "Normal", "Sensitive"] },
          { "label": "Frequency", "type": "select", "value": "", "options": ["Morning Only", "Night Only", "Morning & Night"] },
          { "label": "Exfoliate", "type": "select", "value": "", "options": ["Yes", "No", "Sometimes"] },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "moisturize-protect",
        "name": "Moisturize & Protect",
        "image": "skincare-female-moisturize-protect",
        "fields": [
          { "label": "Moisturizer", "type": "text", "value": "" },
          { "label": "SPF", "type": "select", "value": "", "options": ["Yes Daily", "Sometimes", "No"] },
          { "label": "SPF Product", "type": "text", "value": "" },
          { "label": "Texture Preference", "type": "select", "value": "", "options": ["Gel", "Cream", "Lotion", "Oil"] },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "makeup-detail-care",
        "name": "Makeup & Detail Care",
        "image": "skincare-female-makeup-detail-care",
        "fields": [
          { "label": "Favorite Makeup Basics", "type": "text", "value": "" },
          { "label": "Brow Care", "type": "text", "value": "" },
          { "label": "Lip Care", "type": "text", "value": "" },
          { "label": "Makeup Remover", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "bodycare-female",
    "label": "Bodycare",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "bodycare-female",
    "subcategories": [
      {
        "id": "perfume-fragrance",
        "name": "Perfume & Fragrance",
        "image": "bodycare-female-perfume-fragrance",
        "fields": [
          { "label": "Daily Fragrance", "type": "text", "value": "" },
          { "label": "Occasion Fragrance", "type": "text", "value": "" },
          { "label": "Preferred Notes", "type": "select", "value": "", "options": ["Floral", "Fresh", "Citrus", "Woody", "Gourmand", "Clean"] },
          { "label": "Intensity", "type": "select", "value": "", "options": ["Light", "Medium", "Strong"] },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "muscle-sport",
        "name": "Recovery",
        "image": "bodycare-female-muscle-sport",
        "fields": [
          { "label": "Muscle Rub", "type": "text", "value": "" },
          { "label": "Recovery Method", "type": "select", "value": "", "options": ["Ice Bath", "Epsom Salt", "Foam Roll", "Massage", "Nothing"] },
          { "label": "Cooling Gel", "type": "text", "value": "" },
          { "label": "Heating Patch", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "powders",
        "name": "Body Essentials",
        "image": "bodycare-female-powders",
        "fields": [
          { "label": "Body Lotion", "type": "text", "value": "" },
          { "label": "Deodorant", "type": "text", "value": "" },
          { "label": "Body Powder", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Scented or Unscented", "type": "select", "value": "", "options": ["Scented", "Unscented"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "supplements",
        "name": "Wellness",
        "image": "bodycare-female-supplements",
        "fields": [
          { "label": "Daily Supplements", "type": "text", "value": "" },
          { "label": "Protein", "type": "text", "value": "" },
          { "label": "Pre-Workout", "type": "text", "value": "" },
          { "label": "Vitamins", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "hygiene-nb",
    "label": "Hygiene",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "hygiene-nb",
    "subcategories": [
      {
        "id": "oral-care",
        "name": "Oral Care",
        "image": "hygiene-nb-oral-care",
        "fields": [
          { "label": "Toothbrush", "type": "select", "value": "", "options": ["Manual", "Electric", "Sonic"] },
          { "label": "Toothpaste", "type": "text", "value": "" },
          { "label": "Floss", "type": "select", "value": "", "options": ["String", "Picks", "Water Flosser", "None"] },
          { "label": "Mouthwash", "type": "text", "value": "" },
          { "label": "Whitening", "type": "select", "value": "", "options": ["Yes", "No", "Sometimes"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "bath-shower",
        "name": "Bath & Shower",
        "image": "hygiene-nb-bath-shower",
        "fields": [
          { "label": "Preference", "type": "select", "value": "", "options": ["Shower", "Bath", "Both"] },
          { "label": "Temperature", "type": "select", "value": "", "options": ["Cold", "Warm", "Hot"] },
          { "label": "Body Wash", "type": "text", "value": "" },
          { "label": "Shampoo", "type": "text", "value": "" },
          { "label": "Frequency", "type": "select", "value": "", "options": ["Once a Day", "Twice a Day", "Every Other Day"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "grooming",
        "name": "Grooming",
        "image": "hygiene-nb-grooming",
        "fields": [
          { "label": "Grooming Style", "type": "select", "value": "", "options": ["Clean Shave", "Facial Hair", "Minimal", "Mixed"] },
          { "label": "Razor or Trimmer", "type": "select", "value": "", "options": ["Cartridge", "Safety Razor", "Electric", "Straight", "Trimmer"] },
          { "label": "Nail Care", "type": "select", "value": "", "options": ["Clip at Home", "Professional", "Rarely"] },
          { "label": "Preferred Barber or Salon", "type": "text", "value": "" },
          { "label": "Haircut Frequency", "type": "select", "value": "", "options": ["Weekly", "Every 2 Weeks", "Monthly", "Less Often"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "repair-restore",
        "name": "Daily Care",
        "image": "hygiene-nb-repair-restore",
        "fields": [
          { "label": "Anti-Chafe", "type": "text", "value": "" },
          { "label": "Muscle Relief", "type": "text", "value": "" },
          { "label": "Foot Care", "type": "text", "value": "" },
          { "label": "After Sport Routine", "type": "text", "value": "" },
          { "label": "Recovery Products", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "skincare-nb",
    "label": "Skincare",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "skincare-nb",
    "subcategories": [
      {
        "id": "face-wash-cleanse",
        "name": "Face Wash & Cleanse",
        "image": "skincare-nb-face-wash-cleanse",
        "fields": [
          { "label": "Cleanser", "type": "text", "value": "" },
          { "label": "Skin Type", "type": "select", "value": "", "options": ["Oily", "Dry", "Combination", "Normal", "Sensitive"] },
          { "label": "Frequency", "type": "select", "value": "", "options": ["Morning Only", "Night Only", "Morning & Night"] },
          { "label": "Exfoliate", "type": "select", "value": "", "options": ["Yes", "No", "Sometimes"] },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "moisturize-protect",
        "name": "Moisturize & Protect",
        "image": "skincare-nb-moisturize-protect",
        "fields": [
          { "label": "Moisturizer", "type": "text", "value": "" },
          { "label": "SPF", "type": "select", "value": "", "options": ["Yes Daily", "Sometimes", "No"] },
          { "label": "SPF Product", "type": "text", "value": "" },
          { "label": "Texture Preference", "type": "select", "value": "", "options": ["Gel", "Cream", "Lotion", "Oil"] },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "facial-hair",
        "name": "Facial Hair & Detail Care",
        "image": "skincare-nb-facial-hair",
        "fields": [
          { "label": "Facial Hair Product", "type": "text", "value": "" },
          { "label": "Detail Trimmer", "type": "text", "value": "" },
          { "label": "Brow Care", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "bodycare-nb",
    "label": "Bodycare",
    "section": "personal",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "bodycare-nb",
    "subcategories": [
      {
        "id": "cologne-fragrance",
        "name": "Cologne & Fragrance",
        "image": "bodycare-nb-cologne-fragrance",
        "fields": [
          { "label": "Daily Fragrance", "type": "text", "value": "" },
          { "label": "Occasion Fragrance", "type": "text", "value": "" },
          { "label": "Preferred Notes", "type": "select", "value": "", "options": ["Woody", "Fresh", "Spicy", "Citrus", "Aquatic", "Gourmand", "Floral"] },
          { "label": "Intensity", "type": "select", "value": "", "options": ["Light", "Medium", "Strong"] },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "muscle-sport",
        "name": "Recovery",
        "image": "bodycare-nb-muscle-sport",
        "fields": [
          { "label": "Muscle Rub", "type": "text", "value": "" },
          { "label": "Recovery Method", "type": "select", "value": "", "options": ["Ice Bath", "Epsom Salt", "Foam Roll", "Massage", "Nothing"] },
          { "label": "Cooling Gel", "type": "text", "value": "" },
          { "label": "Heating Patch", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "powders",
        "name": "Body Essentials",
        "image": "bodycare-nb-powders",
        "fields": [
          { "label": "Body Powder", "type": "text", "value": "" },
          { "label": "Foot Powder", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Usage", "type": "select", "value": "", "options": ["Daily", "After Sport", "As Needed"] },
          { "label": "Scented or Unscented", "type": "select", "value": "", "options": ["Scented", "Unscented"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "supplements",
        "name": "Wellness",
        "image": "bodycare-nb-supplements",
        "fields": [
          { "label": "Daily Supplements", "type": "text", "value": "" },
          { "label": "Protein", "type": "text", "value": "" },
          { "label": "Pre-Workout", "type": "text", "value": "" },
          { "label": "Vitamins", "type": "text", "value": "" },
          { "label": "Preferred Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "gift-preferences-male",
    "label": "Gift Preferences",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "gift-preferences-male",
    "subcategories": [
      {
        "id": "gift-types",
        "name": "Gift Types",
        "image": "gift-preferences-male-gift-types",
        "fields": [
          { "label": "Favorite Gift Types", "type": "multi-select", "value": [], "options": ["Experiences", "Practical Items", "Small Luxuries", "Handmade / Personal", "Tech & Gadgets", "Gift Cards"] },
          { "label": "Love Language", "type": "select", "value": "", "options": ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"] },
          { "label": "Preferred Gift Category", "type": "select", "value": "", "options": ["Wear", "Eat / Drink", "Do / Experience", "Keep / Display"] },
          { "label": "Best Gift You Remember", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "surprise-style",
        "name": "Surprise Style",
        "image": "gift-preferences-male-surprise-style",
        "fields": [
          { "label": "Surprise Gifts", "type": "select", "value": "", "options": ["Love Them", "Depends on the Person", "I'd Rather Choose", "A Little Anxious", "Just Give Me Cash"] },
          { "label": "Gift Cards", "type": "select", "value": "", "options": ["Love Them", "Totally Fine", "Last Resort", "Feels Impersonal"] },
          { "label": "Bad Gift Fit", "type": "multi-select", "value": [], "options": ["Generic / Impersonal", "Wrong Style", "Clutter", "Obviously Re-Gifted", "Nothing Really"] },
          { "label": "When I Don't Like a Gift", "type": "select", "value": "", "options": ["Gracious", "Gently Honest", "Return It Quietly", "Keep It, Never Use It"] },
          { "label": "Personal Gift Marker", "type": "select", "value": "", "options": ["Inside Joke", "Shows They Listened", "Handwritten Note", "Time & Effort", "Matches My Taste"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "price-and-scale",
        "name": "Price & Scale",
        "image": "gift-preferences-male-price-scale",
        "fields": [
          { "label": "Nice Gift Budget", "type": "select", "value": "", "options": ["Under $50", "$50 - $100", "$100 - $250", "$250 - $500", "Over $500", "Thought Matters Most"] },
          { "label": "One Big or Several Small", "type": "select", "value": "", "options": ["One Big, Meaningful Gift", "Several Small Things", "A Mix of Both", "No Preference"] },
          { "label": "Gift Wrapping Matters", "type": "select", "value": "", "options": ["Love Beautiful Wrapping", "Nice Touch", "Don't Care", "Prefer Eco-Friendly"] },
          { "label": "Birthday Planning Window", "type": "select", "value": "", "options": ["Months in Advance", "A Few Weeks", "Last Minute Is Fine", "I Don't Celebrate"] },
          { "label": "Notes", "type": "text", "value": "" }
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
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "wishlist-male",
    "subcategories": [
      {
        "id": "current-wishlist",
        "name": "Current Wishlist",
        "image": "wishlist-male-current",
        "fields": [
          { "label": "Keep a Wishlist", "type": "select", "value": "", "options": ["Always Updated", "Mental List Only", "Sometimes Around Holidays", "Never - Surprise Me"] },
          { "label": "Most Wanted Right Now", "type": "text", "value": "" },
          { "label": "Favorite Store or Site", "type": "text", "value": "" },
          { "label": "Wishlist Link", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "tech-and-gear",
        "name": "Tech & Gear",
        "image": "wishlist-male-tech-gear",
        "fields": [
          { "label": "Most Wanted Tech Gift", "type": "select", "value": "", "options": ["Wireless Headphones", "Smart Watch", "Tablet", "Smart Home Device", "I'm Not a Tech Person"] },
          { "label": "Favorite Tech Brand", "type": "text", "value": "" },
          { "label": "Gaming or Tech Hobby", "type": "text", "value": "" },
          { "label": "Upgrade I Keep Mentioning", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "books-and-subscriptions",
        "name": "Books & Subscriptions",
        "image": "wishlist-male-books-subscriptions",
        "fields": [
          { "label": "Book Genre I'd Want", "type": "select", "value": "", "options": ["Fiction / Novels", "Self-Help", "Biography", "Cookbooks", "Art / Design", "Not a Book Person"] },
          { "label": "Subscription I'd Love", "type": "select", "value": "", "options": ["Streaming Service", "Book Box", "Food / Snack Box", "Grooming Box", "Wine / Spirits", "Fitness / Wellness"] },
          { "label": "Favorite Author, Creator, or Series", "type": "text", "value": "" },
          { "label": "Magazine or Membership", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
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
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "special-occasions-male",
    "subcategories": [
      {
        "id": "birthday-and-holidays",
        "name": "Birthday & Holidays",
        "image": "special-occasions-male-birthday-holidays",
        "fields": [
          { "label": "Birthday Matters To Me", "type": "select", "value": "", "options": ["A Lot", "Somewhat", "Keep It Low-Key", "I'd Skip It"] },
          { "label": "Holiday Gift Style", "type": "select", "value": "", "options": ["Tradition Matters", "Practical Wins", "Something Surprising", "Keep It Simple"] },
          { "label": "Best Holiday Gift Category", "type": "select", "value": "", "options": ["Tech / Gadget", "Jewelry / Watch", "Experience / Trip", "Clothing Item", "Sentimental / Homemade", "Cash / Gift Card"] },
          { "label": "Stocking Stuffer or Small Gift Ideas", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "experience-gifts",
        "name": "Experience Gifts",
        "image": "special-occasions-male-experience-gifts",
        "fields": [
          { "label": "Experience Gift I'd Love", "type": "select", "value": "", "options": ["Concert / Show", "Adventure Activity", "Cooking Class", "Surprise Trip", "Fancy Dinner", "Wellness Day"] },
          { "label": "Favorite Kind of Night Out", "type": "text", "value": "" },
          { "label": "Trip or Event Destination", "type": "text", "value": "" },
          { "label": "Hard No Experience", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "meaningful-gestures",
        "name": "Meaningful Gestures",
        "image": "special-occasions-male-meaningful-gestures",
        "fields": [
          { "label": "Flowers or Plants", "type": "select", "value": "", "options": ["Flowers", "Occasionally Nice", "Prefer a Plant", "Not My Thing", "Allergic"] },
          { "label": "Charity Cause", "type": "select", "value": "", "options": ["Animal Welfare", "Environment", "Education", "Health / Medical", "Social Justice", "Prefer Physical Gifts"] },
          { "label": "Favorite Sentimental Gesture", "type": "text", "value": "" },
          { "label": "Keepsake I Would Actually Keep", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "gift-preferences-female",
    "label": "Gift Preferences",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "gift-preferences-female",
    "subcategories": [
      {
        "id": "gift-types",
        "name": "Gift Types",
        "image": "gift-preferences-female-gift-types",
        "fields": [
          { "label": "Favorite Gift Types", "type": "multi-select", "value": [], "options": ["Experiences", "Practical Items", "Small Luxuries", "Handmade / Personal", "Beauty & Wellness", "Gift Cards"] },
          { "label": "Love Language", "type": "select", "value": "", "options": ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"] },
          { "label": "Preferred Gift Category", "type": "select", "value": "", "options": ["Wear", "Eat / Drink", "Do / Experience", "Keep / Display"] },
          { "label": "Best Gift You Remember", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "surprise-style",
        "name": "Surprise Style",
        "image": "gift-preferences-female-surprise-style",
        "fields": [
          { "label": "Surprise Gifts", "type": "select", "value": "", "options": ["Love Them", "Depends on the Person", "I'd Rather Choose", "A Little Anxious", "Just Give Me Cash"] },
          { "label": "Gift Cards", "type": "select", "value": "", "options": ["Love Them", "Totally Fine", "Last Resort", "Feels Impersonal"] },
          { "label": "Bad Gift Fit", "type": "multi-select", "value": [], "options": ["Generic / Impersonal", "Wrong Style", "Clutter", "Obviously Re-Gifted", "Nothing Really"] },
          { "label": "When I Don't Like a Gift", "type": "select", "value": "", "options": ["Gracious", "Gently Honest", "Return It Quietly", "Keep It, Never Use It"] },
          { "label": "Personal Gift Marker", "type": "select", "value": "", "options": ["Inside Joke", "Shows They Listened", "Handwritten Note", "Time & Effort", "Matches My Taste"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "price-and-scale",
        "name": "Price & Scale",
        "image": "gift-preferences-female-price-scale",
        "fields": [
          { "label": "Nice Gift Budget", "type": "select", "value": "", "options": ["Under $50", "$50 - $100", "$100 - $250", "$250 - $500", "Over $500", "Thought Matters Most"] },
          { "label": "One Big or Several Small", "type": "select", "value": "", "options": ["One Big, Meaningful Gift", "Several Small Things", "A Mix of Both", "No Preference"] },
          { "label": "Gift Wrapping Matters", "type": "select", "value": "", "options": ["Love Beautiful Wrapping", "Nice Touch", "Don't Care", "Prefer Eco-Friendly"] },
          { "label": "Birthday Planning Window", "type": "select", "value": "", "options": ["Months in Advance", "A Few Weeks", "Last Minute Is Fine", "I Don't Celebrate"] },
          { "label": "Notes", "type": "text", "value": "" }
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
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "wishlist-female",
    "subcategories": [
      {
        "id": "current-wishlist",
        "name": "Current Wishlist",
        "image": "wishlist-female-current",
        "fields": [
          { "label": "Keep a Wishlist", "type": "select", "value": "", "options": ["Always Updated", "Mental List Only", "Sometimes Around Holidays", "Never - Surprise Me"] },
          { "label": "Most Wanted Right Now", "type": "text", "value": "" },
          { "label": "Favorite Store or Site", "type": "text", "value": "" },
          { "label": "Wishlist Link", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "beauty-and-style",
        "name": "Beauty & Style",
        "image": "wishlist-female-beauty-style",
        "fields": [
          { "label": "Most Wanted Beauty or Style Gift", "type": "text", "value": "" },
          { "label": "Favorite Beauty or Fashion Brand", "type": "text", "value": "" },
          { "label": "Jewelry or Accessory Wish", "type": "text", "value": "" },
          { "label": "Upgrade I Keep Mentioning", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "books-and-subscriptions",
        "name": "Books & Subscriptions",
        "image": "wishlist-female-books-subscriptions",
        "fields": [
          { "label": "Book Genre I'd Want", "type": "select", "value": "", "options": ["Fiction / Novels", "Self-Help", "Biography", "Cookbooks", "Art / Design", "Not a Book Person"] },
          { "label": "Subscription I'd Love", "type": "select", "value": "", "options": ["Streaming Service", "Book Box", "Food / Snack Box", "Beauty Box", "Wine / Spirits", "Fitness / Wellness"] },
          { "label": "Favorite Author, Creator, or Series", "type": "text", "value": "" },
          { "label": "Magazine or Membership", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
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
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "special-occasions-female",
    "subcategories": [
      {
        "id": "birthday-and-holidays",
        "name": "Birthday & Holidays",
        "image": "special-occasions-female-birthday-holidays",
        "fields": [
          { "label": "Birthday Matters To Me", "type": "select", "value": "", "options": ["A Lot", "Somewhat", "Keep It Low-Key", "I'd Skip It"] },
          { "label": "Holiday Gift Style", "type": "select", "value": "", "options": ["Tradition Matters", "Practical Wins", "Something Surprising", "Keep It Simple"] },
          { "label": "Best Holiday Gift Category", "type": "select", "value": "", "options": ["Beauty / Wellness", "Jewelry / Accessory", "Experience / Trip", "Clothing Item", "Sentimental / Homemade", "Cash / Gift Card"] },
          { "label": "Stocking Stuffer or Small Gift Ideas", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "experience-gifts",
        "name": "Experience Gifts",
        "image": "special-occasions-female-experience-gifts",
        "fields": [
          { "label": "Experience Gift I'd Love", "type": "select", "value": "", "options": ["Spa / Wellness Day", "Concert / Show", "Cooking Class", "Adventure Activity", "Surprise Trip", "Fancy Dinner"] },
          { "label": "Favorite Kind of Night Out", "type": "text", "value": "" },
          { "label": "Trip or Event Destination", "type": "text", "value": "" },
          { "label": "Hard No Experience", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "meaningful-gestures",
        "name": "Meaningful Gestures",
        "image": "special-occasions-female-meaningful-gestures",
        "fields": [
          { "label": "Flowers or Plants", "type": "select", "value": "", "options": ["Love Flowers", "Occasionally Nice", "Prefer a Plant", "Not My Thing", "Allergic"] },
          { "label": "Charity Cause", "type": "select", "value": "", "options": ["Animal Welfare", "Environment", "Education", "Health / Medical", "Social Justice", "Prefer Physical Gifts"] },
          { "label": "Favorite Sentimental Gesture", "type": "text", "value": "" },
          { "label": "Keepsake I Would Actually Keep", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "gift-preferences-nb",
    "label": "Gift Preferences",
    "section": "gifts-wishlist",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "gift-preferences-nb",
    "subcategories": [
      {
        "id": "gift-types",
        "name": "Gift Types",
        "image": "gift-preferences-nb-gift-types",
        "fields": [
          { "label": "Favorite Gift Types", "type": "multi-select", "value": [], "options": ["Experiences", "Practical Items", "Small Luxuries", "Handmade / Personal", "Tech & Style", "Gift Cards"] },
          { "label": "Love Language", "type": "select", "value": "", "options": ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"] },
          { "label": "Preferred Gift Category", "type": "select", "value": "", "options": ["Wear", "Eat / Drink", "Do / Experience", "Keep / Display"] },
          { "label": "Best Gift You Remember", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "surprise-style",
        "name": "Surprise Style",
        "image": "gift-preferences-nb-surprise-style",
        "fields": [
          { "label": "Surprise Gifts", "type": "select", "value": "", "options": ["Love Them", "Depends on the Person", "I'd Rather Choose", "A Little Anxious", "Just Give Me Cash"] },
          { "label": "Gift Cards", "type": "select", "value": "", "options": ["Love Them", "Totally Fine", "Last Resort", "Feels Impersonal"] },
          { "label": "Bad Gift Fit", "type": "multi-select", "value": [], "options": ["Generic / Impersonal", "Wrong Style", "Clutter", "Obviously Re-Gifted", "Nothing Really"] },
          { "label": "When I Don't Like a Gift", "type": "select", "value": "", "options": ["Gracious", "Gently Honest", "Return It Quietly", "Keep It, Never Use It"] },
          { "label": "Personal Gift Marker", "type": "select", "value": "", "options": ["Inside Joke", "Shows They Listened", "Handwritten Note", "Time & Effort", "Matches My Taste"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "price-and-scale",
        "name": "Price & Scale",
        "image": "gift-preferences-nb-price-scale",
        "fields": [
          { "label": "Nice Gift Budget", "type": "select", "value": "", "options": ["Under $50", "$50 - $100", "$100 - $250", "$250 - $500", "Over $500", "Thought Matters Most"] },
          { "label": "One Big or Several Small", "type": "select", "value": "", "options": ["One Big, Meaningful Gift", "Several Small Things", "A Mix of Both", "No Preference"] },
          { "label": "Gift Wrapping Matters", "type": "select", "value": "", "options": ["Love Beautiful Wrapping", "Nice Touch", "Don't Care", "Prefer Eco-Friendly"] },
          { "label": "Birthday Planning Window", "type": "select", "value": "", "options": ["Months in Advance", "A Few Weeks", "Last Minute Is Fine", "I Don't Celebrate"] },
          { "label": "Notes", "type": "text", "value": "" }
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
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "wishlist-nb",
    "subcategories": [
      {
        "id": "current-wishlist",
        "name": "Current Wishlist",
        "image": "wishlist-nb-current",
        "fields": [
          { "label": "Keep a Wishlist", "type": "select", "value": "", "options": ["Always Updated", "Mental List Only", "Sometimes Around Holidays", "Never - Surprise Me"] },
          { "label": "Most Wanted Right Now", "type": "text", "value": "" },
          { "label": "Favorite Store or Site", "type": "text", "value": "" },
          { "label": "Wishlist Link", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "style-tech-and-beauty",
        "name": "Style, Tech & Beauty",
        "image": "wishlist-nb-style-tech-beauty",
        "fields": [
          { "label": "Most Wanted Style, Tech, or Beauty Gift", "type": "text", "value": "" },
          { "label": "Favorite Brand", "type": "text", "value": "" },
          { "label": "Accessory or Gear Wish", "type": "text", "value": "" },
          { "label": "Upgrade I Keep Mentioning", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "books-and-subscriptions",
        "name": "Books & Subscriptions",
        "image": "wishlist-nb-books-subscriptions",
        "fields": [
          { "label": "Book Genre I'd Want", "type": "select", "value": "", "options": ["Fiction / Novels", "Self-Help", "Biography", "Cookbooks", "Art / Design", "Not a Book Person"] },
          { "label": "Subscription I'd Love", "type": "select", "value": "", "options": ["Streaming Service", "Book Box", "Food / Snack Box", "Beauty / Grooming Box", "Wine / Spirits", "Fitness / Wellness"] },
          { "label": "Favorite Author, Creator, or Series", "type": "text", "value": "" },
          { "label": "Magazine or Membership", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
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
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "special-occasions-nb",
    "subcategories": [
      {
        "id": "birthday-and-holidays",
        "name": "Birthday & Holidays",
        "image": "special-occasions-nb-birthday-holidays",
        "fields": [
          { "label": "Birthday Matters To Me", "type": "select", "value": "", "options": ["A Lot", "Somewhat", "Keep It Low-Key", "I'd Skip It"] },
          { "label": "Holiday Gift Style", "type": "select", "value": "", "options": ["Tradition Matters", "Practical Wins", "Something Surprising", "Keep It Simple"] },
          { "label": "Best Holiday Gift Category", "type": "select", "value": "", "options": ["Tech / Gadget", "Beauty / Wellness", "Experience / Trip", "Clothing Item", "Sentimental / Homemade", "Cash / Gift Card"] },
          { "label": "Stocking Stuffer or Small Gift Ideas", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "experience-gifts",
        "name": "Experience Gifts",
        "image": "special-occasions-nb-experience-gifts",
        "fields": [
          { "label": "Experience Gift I'd Love", "type": "select", "value": "", "options": ["Concert / Show", "Spa / Wellness Day", "Cooking Class", "Adventure Activity", "Surprise Trip", "Fancy Dinner"] },
          { "label": "Favorite Kind of Night Out", "type": "text", "value": "" },
          { "label": "Trip or Event Destination", "type": "text", "value": "" },
          { "label": "Hard No Experience", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "meaningful-gestures",
        "name": "Meaningful Gestures",
        "image": "special-occasions-nb-meaningful-gestures",
        "fields": [
          { "label": "Flowers or Plants", "type": "select", "value": "", "options": ["Flowers", "Occasionally Nice", "Prefer a Plant", "Not My Thing", "Allergic"] },
          { "label": "Charity Cause", "type": "select", "value": "", "options": ["Animal Welfare", "Environment", "Education", "Health / Medical", "Social Justice", "Prefer Physical Gifts"] },
          { "label": "Favorite Sentimental Gesture", "type": "text", "value": "" },
          { "label": "Keepsake I Would Actually Keep", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "home-aesthetic-male",
    "label": "Home Aesthetic",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "home-aesthetic-male",
    "subcategories": [
      {
        "id": "overall-style",
        "name": "Overall Style",
        "image": "home-aesthetic-male-overall-style",
        "fields": [
          { "label": "Home Aesthetic", "type": "select", "value": "", "options": ["Modern Minimal", "Cozy & Warm", "Mid-Century", "Bohemian", "Industrial", "Traditional / Classic"] },
          { "label": "Living Room Vibe", "type": "select", "value": "", "options": ["Clean & Airy", "Layered & Textured", "Dark & Moody", "Bright & Colorful", "Earthy & Natural", "Eclectic Mix"] },
          { "label": "Color Palette", "type": "select", "value": "", "options": ["Neutrals / Beige / White", "Earth Tones / Terracotta", "Cool Grays / Blues", "Bold & Saturated", "Black & White", "Soft Pastels"] },
          { "label": "Most Used Room", "type": "select", "value": "", "options": ["Living Room", "Bedroom", "Kitchen", "Home Office", "Patio / Balcony", "Bathroom"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "decor-and-atmosphere",
        "name": "Decor & Atmosphere",
        "image": "home-aesthetic-male-decor-atmosphere",
        "fields": [
          { "label": "Candles", "type": "select", "value": "", "options": ["Obsessed", "Enjoy Them", "Occasionally", "Not Really", "Sensitive to Scents"] },
          { "label": "Preferred Room Scent", "type": "select", "value": "", "options": ["Vanilla / Sweet", "Woodsy / Cedar", "Fresh Linen", "Floral", "Citrus", "Unscented"] },
          { "label": "Plants at Home", "type": "select", "value": "", "options": ["The More the Better", "A Few Easy Ones", "I Kill Every Plant", "Fake Plants Are Fine", "Not My Thing"] },
          { "label": "Wall Art Style", "type": "select", "value": "", "options": ["Abstract", "Photography", "Prints / Posters", "Classical Paintings", "Minimal / Blank Walls", "Gallery Wall Mix"] },
          { "label": "Favorite Decor Store or Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "bed-and-bath",
        "name": "Bed & Bath",
        "image": "home-aesthetic-male-bed-bath",
        "fields": [
          { "label": "Ideal Bed Setup", "type": "select", "value": "", "options": ["Cloud-Soft, Tons of Pillows", "Firm & Minimal", "Linen / Natural Fabrics", "Luxury Hotel Style", "Weighted Blanket Always"] },
          { "label": "Bathroom Luxury", "type": "select", "value": "", "options": ["Rain Shower Head", "Heated Floors", "Deep Soaking Tub", "Premium Towels", "High-End Skincare", "Keep It Basic"] },
          { "label": "Favorite Bedding Brand", "type": "text", "value": "" },
          { "label": "Towel Preference", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "daily-living-male",
    "label": "Daily Living",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "daily-living-male",
    "subcategories": [
      {
        "id": "kitchen-and-coffee",
        "name": "Kitchen & Coffee",
        "image": "daily-living-male-kitchen-coffee",
        "fields": [
          { "label": "Can't-Live-Without Appliance", "type": "select", "value": "", "options": ["Coffee Machine", "Air Fryer", "Blender", "Instant Pot", "Stand Mixer", "Just a Stove & Pan"] },
          { "label": "Coffee Setup", "type": "text", "value": "" },
          { "label": "Favorite Mug or Glassware", "type": "text", "value": "" },
          { "label": "Kitchen Upgrade Wish", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "routine-and-comfort",
        "name": "Routine & Comfort",
        "image": "daily-living-male-routine-comfort",
        "fields": [
          { "label": "Morning Routine Length", "type": "select", "value": "", "options": ["Under 15 Min", "15-30 Min", "30-60 Min", "Over an Hour", "What Routine?"] },
          { "label": "Wake-Up Style", "type": "select", "value": "", "options": ["Naturally - No Alarm", "One Alarm, Right Up", "Snooze 3+ Times", "Sunrise Light", "Someone Wakes Me"] },
          { "label": "Ideal Home Temperature", "type": "select", "value": "", "options": ["Cool - Windows Open", "Warm & Cozy", "AC Always Running", "Varies by Season", "No Preference"] },
          { "label": "Reading Spot", "type": "select", "value": "", "options": ["The Couch", "In Bed", "At a Desk", "Outdoors", "I Don't Read Much", "Audiobooks Anywhere"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "home-management",
        "name": "Home Management",
        "image": "daily-living-male-home-management",
        "fields": [
          { "label": "Tidy Level", "type": "select", "value": "", "options": ["Spotless - Always", "Pretty Tidy", "Organized Chaos", "Messy but I Know Where Things Are", "Actively Trying to Improve"] },
          { "label": "Laundry Frequency", "type": "select", "value": "", "options": ["Daily", "Every Few Days", "Weekly", "When the Basket Overflows", "Laundry Service"] },
          { "label": "Smart Home Tech", "type": "select", "value": "", "options": ["Fully Automated Home", "Some Devices", "Curious but Haven't Started", "Prefer Manual / Analog", "Privacy Concerns"] },
          { "label": "Home Essential I Restock", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "hosting-spaces-male",
    "label": "Hosting & Spaces",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "hosting-spaces-male",
    "subcategories": [
      {
        "id": "hosting-style",
        "name": "Hosting Style",
        "image": "hosting-spaces-male-hosting-style",
        "fields": [
          { "label": "Hosting at Home", "type": "select", "value": "", "options": ["I Host All the Time", "Occasionally", "Small Gatherings Only", "Rarely", "My Space Is Private"] },
          { "label": "Ideal Gathering", "type": "text", "value": "" },
          { "label": "Go-To Hosting Drink or Snack", "type": "text", "value": "" },
          { "label": "Tabletop or Serving Preference", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "outdoor-space",
        "name": "Outdoor Space",
        "image": "hosting-spaces-male-outdoor-space",
        "fields": [
          { "label": "Dream Outdoor Space", "type": "select", "value": "", "options": ["Lush Garden", "Rooftop Terrace", "Pool / Hot Tub", "Fire Pit Area", "Simple Balcony", "Indoor Person"] },
          { "label": "Outdoor Setup Priority", "type": "text", "value": "" },
          { "label": "Favorite Outdoor Season", "type": "text", "value": "" },
          { "label": "Outdoor Entertaining Style", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "workspace-and-zones",
        "name": "Workspace & Zones",
        "image": "hosting-spaces-male-workspace-zones",
        "fields": [
          { "label": "Favorite Home Zone", "type": "select", "value": "", "options": ["Living Room", "Bedroom", "Kitchen", "Home Office", "Patio / Balcony", "Bathroom"] },
          { "label": "Desk or Workspace Setup", "type": "text", "value": "" },
          { "label": "Lighting Preference", "type": "text", "value": "" },
          { "label": "Must-Have Home Zone Item", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "home-aesthetic-female",
    "label": "Home Aesthetic",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "home-aesthetic-female",
    "subcategories": [
      {
        "id": "overall-style",
        "name": "Overall Style",
        "image": "home-aesthetic-female-overall-style",
        "fields": [
          { "label": "Home Aesthetic", "type": "select", "value": "", "options": ["Modern Minimal", "Cozy & Warm", "Mid-Century", "Bohemian", "Industrial", "Traditional / Classic"] },
          { "label": "Living Room Vibe", "type": "select", "value": "", "options": ["Clean & Airy", "Layered & Textured", "Dark & Moody", "Bright & Colorful", "Earthy & Natural", "Eclectic Mix"] },
          { "label": "Color Palette", "type": "select", "value": "", "options": ["Neutrals / Beige / White", "Earth Tones / Terracotta", "Cool Grays / Blues", "Bold & Saturated", "Black & White", "Soft Pastels"] },
          { "label": "Most Used Room", "type": "select", "value": "", "options": ["Living Room", "Bedroom", "Kitchen", "Home Office", "Patio / Balcony", "Bathroom"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "decor-and-atmosphere",
        "name": "Decor & Atmosphere",
        "image": "home-aesthetic-female-decor-atmosphere",
        "fields": [
          { "label": "Candles", "type": "select", "value": "", "options": ["Obsessed", "Enjoy Them", "Occasionally", "Not Really", "Sensitive to Scents"] },
          { "label": "Preferred Room Scent", "type": "select", "value": "", "options": ["Vanilla / Sweet", "Woodsy / Cedar", "Fresh Linen", "Floral", "Citrus", "Unscented"] },
          { "label": "Plants at Home", "type": "select", "value": "", "options": ["The More the Better", "A Few Easy Ones", "I Kill Every Plant", "Fake Plants Are Fine", "Not My Thing"] },
          { "label": "Wall Art Style", "type": "select", "value": "", "options": ["Abstract", "Photography", "Prints / Posters", "Classical Paintings", "Minimal / Blank Walls", "Gallery Wall Mix"] },
          { "label": "Favorite Decor Store or Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "bed-and-bath",
        "name": "Bed & Bath",
        "image": "home-aesthetic-female-bed-bath",
        "fields": [
          { "label": "Ideal Bed Setup", "type": "select", "value": "", "options": ["Cloud-Soft, Tons of Pillows", "Firm & Minimal", "Linen / Natural Fabrics", "Luxury Hotel Style", "Weighted Blanket Always"] },
          { "label": "Bathroom Luxury", "type": "select", "value": "", "options": ["Rain Shower Head", "Heated Floors", "Deep Soaking Tub", "Premium Towels", "High-End Skincare", "Keep It Basic"] },
          { "label": "Favorite Bedding Brand", "type": "text", "value": "" },
          { "label": "Towel Preference", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "daily-living-female",
    "label": "Daily Living",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "daily-living-female",
    "subcategories": [
      {
        "id": "kitchen-and-coffee",
        "name": "Kitchen & Coffee",
        "image": "daily-living-female-kitchen-coffee",
        "fields": [
          { "label": "Can't-Live-Without Appliance", "type": "select", "value": "", "options": ["Coffee Machine", "Air Fryer", "Blender", "Instant Pot", "Stand Mixer", "Just a Stove & Pan"] },
          { "label": "Coffee or Tea Setup", "type": "text", "value": "" },
          { "label": "Favorite Mug or Glassware", "type": "text", "value": "" },
          { "label": "Kitchen Upgrade Wish", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "routine-and-comfort",
        "name": "Routine & Comfort",
        "image": "daily-living-female-routine-comfort",
        "fields": [
          { "label": "Morning Routine Length", "type": "select", "value": "", "options": ["Under 15 Min", "15-30 Min", "30-60 Min", "Over an Hour", "What Routine?"] },
          { "label": "Wake-Up Style", "type": "select", "value": "", "options": ["Naturally - No Alarm", "One Alarm, Right Up", "Snooze 3+ Times", "Sunrise Light", "Someone Wakes Me"] },
          { "label": "Ideal Home Temperature", "type": "select", "value": "", "options": ["Cool - Windows Open", "Warm & Cozy", "AC Always Running", "Varies by Season", "No Preference"] },
          { "label": "Reading Spot", "type": "select", "value": "", "options": ["The Couch", "In Bed", "At a Desk", "Outdoors", "I Don't Read Much", "Audiobooks Anywhere"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "home-management",
        "name": "Home Management",
        "image": "daily-living-female-home-management",
        "fields": [
          { "label": "Tidy Level", "type": "select", "value": "", "options": ["Spotless - Always", "Pretty Tidy", "Organized Chaos", "Messy but I Know Where Things Are", "Actively Trying to Improve"] },
          { "label": "Laundry Frequency", "type": "select", "value": "", "options": ["Daily", "Every Few Days", "Weekly", "When the Basket Overflows", "Laundry Service"] },
          { "label": "Smart Home Tech", "type": "select", "value": "", "options": ["Fully Automated Home", "Some Devices", "Curious but Haven't Started", "Prefer Manual / Analog", "Privacy Concerns"] },
          { "label": "Home Essential I Restock", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "hosting-spaces-female",
    "label": "Hosting & Spaces",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "hosting-spaces-female",
    "subcategories": [
      {
        "id": "hosting-style",
        "name": "Hosting Style",
        "image": "hosting-spaces-female-hosting-style",
        "fields": [
          { "label": "Hosting at Home", "type": "select", "value": "", "options": ["I Host All the Time", "Occasionally", "Small Gatherings Only", "Rarely", "My Space Is Private"] },
          { "label": "Ideal Gathering", "type": "text", "value": "" },
          { "label": "Go-To Hosting Drink or Snack", "type": "text", "value": "" },
          { "label": "Tabletop or Serving Preference", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "outdoor-space",
        "name": "Outdoor Space",
        "image": "hosting-spaces-female-outdoor-space",
        "fields": [
          { "label": "Dream Outdoor Space", "type": "select", "value": "", "options": ["Lush Garden", "Rooftop Terrace", "Pool / Hot Tub", "Fire Pit Area", "Simple Balcony", "Indoor Person"] },
          { "label": "Outdoor Setup Priority", "type": "text", "value": "" },
          { "label": "Favorite Outdoor Season", "type": "text", "value": "" },
          { "label": "Outdoor Entertaining Style", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "workspace-and-zones",
        "name": "Workspace & Zones",
        "image": "hosting-spaces-female-workspace-zones",
        "fields": [
          { "label": "Favorite Home Zone", "type": "select", "value": "", "options": ["Living Room", "Bedroom", "Kitchen", "Home Office", "Patio / Balcony", "Bathroom"] },
          { "label": "Desk or Workspace Setup", "type": "text", "value": "" },
          { "label": "Lighting Preference", "type": "text", "value": "" },
          { "label": "Must-Have Home Zone Item", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "home-aesthetic-nb",
    "label": "Home Aesthetic",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "home-aesthetic-nb",
    "subcategories": [
      {
        "id": "overall-style",
        "name": "Overall Style",
        "image": "home-aesthetic-nb-overall-style",
        "fields": [
          { "label": "Home Aesthetic", "type": "select", "value": "", "options": ["Modern Minimal", "Cozy & Warm", "Mid-Century", "Bohemian", "Industrial", "Traditional / Classic"] },
          { "label": "Living Room Vibe", "type": "select", "value": "", "options": ["Clean & Airy", "Layered & Textured", "Dark & Moody", "Bright & Colorful", "Earthy & Natural", "Eclectic Mix"] },
          { "label": "Color Palette", "type": "select", "value": "", "options": ["Neutrals / Beige / White", "Earth Tones / Terracotta", "Cool Grays / Blues", "Bold & Saturated", "Black & White", "Soft Pastels"] },
          { "label": "Most Used Room", "type": "select", "value": "", "options": ["Living Room", "Bedroom", "Kitchen", "Home Office", "Patio / Balcony", "Bathroom"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "decor-and-atmosphere",
        "name": "Decor & Atmosphere",
        "image": "home-aesthetic-nb-decor-atmosphere",
        "fields": [
          { "label": "Candles", "type": "select", "value": "", "options": ["Obsessed", "Enjoy Them", "Occasionally", "Not Really", "Sensitive to Scents"] },
          { "label": "Preferred Room Scent", "type": "select", "value": "", "options": ["Vanilla / Sweet", "Woodsy / Cedar", "Fresh Linen", "Floral", "Citrus", "Unscented"] },
          { "label": "Plants at Home", "type": "select", "value": "", "options": ["The More the Better", "A Few Easy Ones", "I Kill Every Plant", "Fake Plants Are Fine", "Not My Thing"] },
          { "label": "Wall Art Style", "type": "select", "value": "", "options": ["Abstract", "Photography", "Prints / Posters", "Classical Paintings", "Minimal / Blank Walls", "Gallery Wall Mix"] },
          { "label": "Favorite Decor Store or Brand", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "bed-and-bath",
        "name": "Bed & Bath",
        "image": "home-aesthetic-nb-bed-bath",
        "fields": [
          { "label": "Ideal Bed Setup", "type": "select", "value": "", "options": ["Cloud-Soft, Tons of Pillows", "Firm & Minimal", "Linen / Natural Fabrics", "Luxury Hotel Style", "Weighted Blanket Always"] },
          { "label": "Bathroom Luxury", "type": "select", "value": "", "options": ["Rain Shower Head", "Heated Floors", "Deep Soaking Tub", "Premium Towels", "High-End Skincare", "Keep It Basic"] },
          { "label": "Favorite Bedding Brand", "type": "text", "value": "" },
          { "label": "Towel Preference", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "daily-living-nb",
    "label": "Daily Living",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "daily-living-nb",
    "subcategories": [
      {
        "id": "kitchen-and-coffee",
        "name": "Kitchen & Coffee",
        "image": "daily-living-nb-kitchen-coffee",
        "fields": [
          { "label": "Can't-Live-Without Appliance", "type": "select", "value": "", "options": ["Coffee Machine", "Air Fryer", "Blender", "Instant Pot", "Stand Mixer", "Just a Stove & Pan"] },
          { "label": "Coffee or Tea Setup", "type": "text", "value": "" },
          { "label": "Favorite Mug or Glassware", "type": "text", "value": "" },
          { "label": "Kitchen Upgrade Wish", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "routine-and-comfort",
        "name": "Routine & Comfort",
        "image": "daily-living-nb-routine-comfort",
        "fields": [
          { "label": "Morning Routine Length", "type": "select", "value": "", "options": ["Under 15 Min", "15-30 Min", "30-60 Min", "Over an Hour", "What Routine?"] },
          { "label": "Wake-Up Style", "type": "select", "value": "", "options": ["Naturally - No Alarm", "One Alarm, Right Up", "Snooze 3+ Times", "Sunrise Light", "Someone Wakes Me"] },
          { "label": "Ideal Home Temperature", "type": "select", "value": "", "options": ["Cool - Windows Open", "Warm & Cozy", "AC Always Running", "Varies by Season", "No Preference"] },
          { "label": "Reading Spot", "type": "select", "value": "", "options": ["The Couch", "In Bed", "At a Desk", "Outdoors", "I Don't Read Much", "Audiobooks Anywhere"] },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "home-management",
        "name": "Home Management",
        "image": "daily-living-nb-home-management",
        "fields": [
          { "label": "Tidy Level", "type": "select", "value": "", "options": ["Spotless - Always", "Pretty Tidy", "Organized Chaos", "Messy but I Know Where Things Are", "Actively Trying to Improve"] },
          { "label": "Laundry Frequency", "type": "select", "value": "", "options": ["Daily", "Every Few Days", "Weekly", "When the Basket Overflows", "Laundry Service"] },
          { "label": "Smart Home Tech", "type": "select", "value": "", "options": ["Fully Automated Home", "Some Devices", "Curious but Haven't Started", "Prefer Manual / Analog", "Privacy Concerns"] },
          { "label": "Home Essential I Restock", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "hosting-spaces-nb",
    "label": "Hosting & Spaces",
    "section": "home-living",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "hosting-spaces-nb",
    "subcategories": [
      {
        "id": "hosting-style",
        "name": "Hosting Style",
        "image": "hosting-spaces-nb-hosting-style",
        "fields": [
          { "label": "Hosting at Home", "type": "select", "value": "", "options": ["I Host All the Time", "Occasionally", "Small Gatherings Only", "Rarely", "My Space Is Private"] },
          { "label": "Ideal Gathering", "type": "text", "value": "" },
          { "label": "Go-To Hosting Drink or Snack", "type": "text", "value": "" },
          { "label": "Tabletop or Serving Preference", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "outdoor-space",
        "name": "Outdoor Space",
        "image": "hosting-spaces-nb-outdoor-space",
        "fields": [
          { "label": "Dream Outdoor Space", "type": "select", "value": "", "options": ["Lush Garden", "Rooftop Terrace", "Pool / Hot Tub", "Fire Pit Area", "Simple Balcony", "Indoor Person"] },
          { "label": "Outdoor Setup Priority", "type": "text", "value": "" },
          { "label": "Favorite Outdoor Season", "type": "text", "value": "" },
          { "label": "Outdoor Entertaining Style", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "workspace-and-zones",
        "name": "Workspace & Zones",
        "image": "hosting-spaces-nb-workspace-zones",
        "fields": [
          { "label": "Favorite Home Zone", "type": "select", "value": "", "options": ["Living Room", "Bedroom", "Kitchen", "Home Office", "Patio / Balcony", "Bathroom"] },
          { "label": "Desk or Workspace Setup", "type": "text", "value": "" },
          { "label": "Lighting Preference", "type": "text", "value": "" },
          { "label": "Must-Have Home Zone Item", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "media-content-male",
    "label": "Media & Content",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "media-content-male",
    "subcategories": [
      {
        "id": "movies-and-shows",
        "name": "Movies & Shows",
        "image": "media-content-male-movies-shows",
        "fields": [
          { "label": "Go-To Way to Unwind", "type": "select", "value": "", "options": ["TV / Movies", "Reading", "Gaming", "Music", "Exercise", "Socializing"] },
          { "label": "Favorite Movie Genres", "type": "multi-select", "value": [], "options": ["Action / Thriller", "Comedy", "Drama", "Romance", "Sci-Fi / Fantasy", "Documentary", "Horror", "Indie / Art House"] },
          { "label": "Binge-Watch Style", "type": "select", "value": "", "options": ["Whole Season in a Day", "A Few Episodes at a Time", "One per Day", "I Don't Binge-Watch"] },
          { "label": "Favorite Streaming Service", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "music-and-audio",
        "name": "Music & Audio",
        "image": "media-content-male-music-audio",
        "fields": [
          { "label": "Music Taste", "type": "multi-select", "value": [], "options": ["Pop", "Rock / Alternative", "Hip-Hop / R&B", "Electronic", "Classical / Jazz", "Country", "Indie", "Latin / Reggaeton"] },
          { "label": "Favorite Type of Podcast", "type": "select", "value": "", "options": ["True Crime", "Comedy / Chat", "Business / Self-Dev", "News / Politics", "Storytelling", "Don't Listen to Podcasts"] },
          { "label": "How I Consume Content", "type": "select", "value": "", "options": ["Streaming", "Podcasts", "Social Media", "Books / Kindle", "YouTube", "A Bit of Everything"] },
          { "label": "Favorite Artist, Show, or Podcast", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "gaming-and-reading",
        "name": "Gaming & Reading",
        "image": "media-content-male-gaming-reading",
        "fields": [
          { "label": "Gamer Type", "type": "select", "value": "", "options": ["Hardcore Gamer", "Casual Gamer", "Mobile Games Only", "Board / Card Games", "Not a Gamer"] },
          { "label": "Books per Year", "type": "select", "value": "", "options": ["Zero", "1-5", "5-15", "15-30", "30+", "Audiobooks Count"] },
          { "label": "Favorite Game, Book, or Series", "type": "text", "value": "" },
          { "label": "Platform or Reading Format", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "social-events-male",
    "label": "Social & Events",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "social-events-male",
    "subcategories": [
      {
        "id": "weekends-and-date-nights",
        "name": "Weekends & Date Nights",
        "image": "social-events-male-weekends-date-nights",
        "fields": [
          { "label": "Ideal Weekend Activity", "type": "select", "value": "", "options": ["Brunch with Friends", "Outdoor Adventure", "Museum / Gallery", "Binge-Watch", "Play / Watch Sports", "Absolutely Nothing"] },
          { "label": "Ideal Date Night", "type": "select", "value": "", "options": ["Dinner Out", "Movie Night In", "Activity / Adventure", "Live Event", "Cook Together", "Surprise Me"] },
          { "label": "Free Afternoon Choice", "type": "select", "value": "", "options": ["Nap", "Explore Somewhere New", "Create Something", "See Friends / Family", "Self-Care Ritual", "Learn Something New"] },
          { "label": "Favorite Going-Out Plan", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "live-events-and-social",
        "name": "Live Events & Social",
        "image": "social-events-male-live-events-social",
        "fields": [
          { "label": "Live Events", "type": "select", "value": "", "options": ["Love Concerts & Shows", "Enjoy Occasionally", "Prefer Intimate Venues", "Not My Thing", "Festival Lover"] },
          { "label": "Favorite Event Type", "type": "text", "value": "" },
          { "label": "Social Media Style", "type": "select", "value": "", "options": ["Love It - Always Online", "Use It, Not Obsessed", "Lurker - Rarely Post", "Minimal Usage", "Off Grid"] },
          { "label": "Favorite Way to Socialize", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "sports-and-hobbies",
        "name": "Sports & Hobbies",
        "image": "social-events-male-sports-hobbies",
        "fields": [
          { "label": "Watch Sports", "type": "select", "value": "", "options": ["Live at the Stadium", "At a Bar with Friends", "Home on the Couch", "I Don't Watch Sports"] },
          { "label": "Hobby I Want to Try", "type": "select", "value": "", "options": ["Pottery / Ceramics", "Painting", "Surfing", "Photography", "Musical Instrument", "Martial Arts"] },
          { "label": "Favorite Team or Hobby", "type": "text", "value": "" },
          { "label": "Board Game or Group Activity", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "travel-activity-male",
    "label": "Travel & Activity",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "male"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "travel-activity-male",
    "subcategories": [
      {
        "id": "travel-style",
        "name": "Travel Style",
        "image": "travel-activity-male-travel-style",
        "fields": [
          { "label": "Ideal Vacation", "type": "select", "value": "", "options": ["Beach / Resort", "City Exploration", "Adventure / Outdoors", "Cultural / Historical", "Road Trip", "Staycation"] },
          { "label": "Travel Feel", "type": "select", "value": "", "options": ["Passport Always Ready", "A Few Trips a Year", "Prefer Being Home", "Local Exploration", "Working Through a Bucket List"] },
          { "label": "Dream Destination", "type": "text", "value": "" },
          { "label": "Best Kind of Trip Partner", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "fitness-and-exercise",
        "name": "Fitness & Exercise",
        "image": "travel-activity-male-fitness-exercise",
        "fields": [
          { "label": "Activity Level", "type": "select", "value": "", "options": ["Daily Workout", "3-4 Times a Week", "Casually Active", "Trying to Be More Active", "Not Very Active"] },
          { "label": "Preferred Exercise", "type": "multi-select", "value": [], "options": ["Gym / Weights", "Running / Cardio", "Yoga / Pilates", "Team Sports", "Swimming", "Hiking / Walking", "Cycling", "Dance"] },
          { "label": "Workout Time Preference", "type": "text", "value": "" },
          { "label": "Favorite Gear or Gym", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "pace-and-rhythm",
        "name": "Pace & Rhythm",
        "image": "travel-activity-male-pace-rhythm",
        "fields": [
          { "label": "Night Owl or Early Bird", "type": "select", "value": "", "options": ["Early Bird", "Night Owl", "Depends on the Day", "Mid-Day Person"] },
          { "label": "Weekend Energy", "type": "text", "value": "" },
          { "label": "Recovery Day Routine", "type": "text", "value": "" },
          { "label": "Perfect Balance of Busy vs Quiet", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "media-content-female",
    "label": "Media & Content",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "media-content-female",
    "subcategories": [
      {
        "id": "movies-and-shows",
        "name": "Movies & Shows",
        "image": "media-content-female-movies-shows",
        "fields": [
          { "label": "Go-To Way to Unwind", "type": "select", "value": "", "options": ["TV / Movies", "Reading", "Gaming", "Music", "Exercise", "Socializing"] },
          { "label": "Favorite Movie Genres", "type": "multi-select", "value": [], "options": ["Action / Thriller", "Comedy", "Drama", "Romance", "Sci-Fi / Fantasy", "Documentary", "Horror", "Indie / Art House"] },
          { "label": "Binge-Watch Style", "type": "select", "value": "", "options": ["Whole Season in a Day", "A Few Episodes at a Time", "One per Day", "I Don't Binge-Watch"] },
          { "label": "Favorite Streaming Service", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "music-and-audio",
        "name": "Music & Audio",
        "image": "media-content-female-music-audio",
        "fields": [
          { "label": "Music Taste", "type": "multi-select", "value": [], "options": ["Pop", "Rock / Alternative", "Hip-Hop / R&B", "Electronic", "Classical / Jazz", "Country", "Indie", "Latin / Reggaeton"] },
          { "label": "Favorite Type of Podcast", "type": "select", "value": "", "options": ["True Crime", "Comedy / Chat", "Business / Self-Dev", "News / Politics", "Storytelling", "Don't Listen to Podcasts"] },
          { "label": "How I Consume Content", "type": "select", "value": "", "options": ["Streaming", "Podcasts", "Social Media", "Books / Kindle", "YouTube", "A Bit of Everything"] },
          { "label": "Favorite Artist, Show, or Podcast", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "gaming-and-reading",
        "name": "Gaming & Reading",
        "image": "media-content-female-gaming-reading",
        "fields": [
          { "label": "Gamer Type", "type": "select", "value": "", "options": ["Hardcore Gamer", "Casual Gamer", "Mobile Games Only", "Board / Card Games", "Not a Gamer"] },
          { "label": "Books per Year", "type": "select", "value": "", "options": ["Zero", "1-5", "5-15", "15-30", "30+", "Audiobooks Count"] },
          { "label": "Favorite Game, Book, or Series", "type": "text", "value": "" },
          { "label": "Platform or Reading Format", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "social-events-female",
    "label": "Social & Events",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "social-events-female",
    "subcategories": [
      {
        "id": "weekends-and-date-nights",
        "name": "Weekends & Date Nights",
        "image": "social-events-female-weekends-date-nights",
        "fields": [
          { "label": "Ideal Weekend Activity", "type": "select", "value": "", "options": ["Brunch with Friends", "Outdoor Adventure", "Museum / Gallery", "Binge-Watch", "Play / Watch Sports", "Absolutely Nothing"] },
          { "label": "Ideal Date Night", "type": "select", "value": "", "options": ["Dinner Out", "Movie Night In", "Activity / Adventure", "Live Event", "Cook Together", "Surprise Me"] },
          { "label": "Free Afternoon Choice", "type": "select", "value": "", "options": ["Nap", "Explore Somewhere New", "Create Something", "See Friends / Family", "Self-Care Ritual", "Learn Something New"] },
          { "label": "Favorite Going-Out Plan", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "live-events-and-social",
        "name": "Live Events & Social",
        "image": "social-events-female-live-events-social",
        "fields": [
          { "label": "Live Events", "type": "select", "value": "", "options": ["Love Concerts & Shows", "Enjoy Occasionally", "Prefer Intimate Venues", "Not My Thing", "Festival Lover"] },
          { "label": "Favorite Event Type", "type": "text", "value": "" },
          { "label": "Social Media Style", "type": "select", "value": "", "options": ["Love It - Always Online", "Use It, Not Obsessed", "Lurker - Rarely Post", "Minimal Usage", "Off Grid"] },
          { "label": "Favorite Way to Socialize", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "sports-and-hobbies",
        "name": "Sports & Hobbies",
        "image": "social-events-female-sports-hobbies",
        "fields": [
          { "label": "Watch Sports", "type": "select", "value": "", "options": ["Live at the Stadium", "At a Bar with Friends", "Home on the Couch", "I Don't Watch Sports"] },
          { "label": "Hobby I Want to Try", "type": "select", "value": "", "options": ["Pottery / Ceramics", "Painting", "Surfing", "Photography", "Musical Instrument", "Martial Arts"] },
          { "label": "Favorite Team or Hobby", "type": "text", "value": "" },
          { "label": "Board Game or Group Activity", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "travel-activity-female",
    "label": "Travel & Activity",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "female"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "travel-activity-female",
    "subcategories": [
      {
        "id": "travel-style",
        "name": "Travel Style",
        "image": "travel-activity-female-travel-style",
        "fields": [
          { "label": "Ideal Vacation", "type": "select", "value": "", "options": ["Beach / Resort", "City Exploration", "Adventure / Outdoors", "Cultural / Historical", "Road Trip", "Staycation"] },
          { "label": "Travel Feel", "type": "select", "value": "", "options": ["Passport Always Ready", "A Few Trips a Year", "Prefer Being Home", "Local Exploration", "Working Through a Bucket List"] },
          { "label": "Dream Destination", "type": "text", "value": "" },
          { "label": "Best Kind of Trip Partner", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "fitness-and-exercise",
        "name": "Fitness & Exercise",
        "image": "travel-activity-female-fitness-exercise",
        "fields": [
          { "label": "Activity Level", "type": "select", "value": "", "options": ["Daily Workout", "3-4 Times a Week", "Casually Active", "Trying to Be More Active", "Not Very Active"] },
          { "label": "Preferred Exercise", "type": "multi-select", "value": [], "options": ["Gym / Weights", "Running / Cardio", "Yoga / Pilates", "Team Sports", "Swimming", "Hiking / Walking", "Cycling", "Dance"] },
          { "label": "Workout Time Preference", "type": "text", "value": "" },
          { "label": "Favorite Gear or Studio", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "pace-and-rhythm",
        "name": "Pace & Rhythm",
        "image": "travel-activity-female-pace-rhythm",
        "fields": [
          { "label": "Night Owl or Early Bird", "type": "select", "value": "", "options": ["Early Bird", "Night Owl", "Depends on the Day", "Mid-Day Person"] },
          { "label": "Weekend Energy", "type": "text", "value": "" },
          { "label": "Recovery Day Routine", "type": "text", "value": "" },
          { "label": "Perfect Balance of Busy vs Quiet", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "media-content-nb",
    "label": "Media & Content",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 10,
    "is_active": true,
    "fields": [],
    "image": "media-content-nb",
    "subcategories": [
      {
        "id": "movies-and-shows",
        "name": "Movies & Shows",
        "image": "media-content-nb-movies-shows",
        "fields": [
          { "label": "Go-To Way to Unwind", "type": "select", "value": "", "options": ["TV / Movies", "Reading", "Gaming", "Music", "Exercise", "Socializing"] },
          { "label": "Favorite Movie Genres", "type": "multi-select", "value": [], "options": ["Action / Thriller", "Comedy", "Drama", "Romance", "Sci-Fi / Fantasy", "Documentary", "Horror", "Indie / Art House"] },
          { "label": "Binge-Watch Style", "type": "select", "value": "", "options": ["Whole Season in a Day", "A Few Episodes at a Time", "One per Day", "I Don't Binge-Watch"] },
          { "label": "Favorite Streaming Service", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "music-and-audio",
        "name": "Music & Audio",
        "image": "media-content-nb-music-audio",
        "fields": [
          { "label": "Music Taste", "type": "multi-select", "value": [], "options": ["Pop", "Rock / Alternative", "Hip-Hop / R&B", "Electronic", "Classical / Jazz", "Country", "Indie", "Latin / Reggaeton"] },
          { "label": "Favorite Type of Podcast", "type": "select", "value": "", "options": ["True Crime", "Comedy / Chat", "Business / Self-Dev", "News / Politics", "Storytelling", "Don't Listen to Podcasts"] },
          { "label": "How I Consume Content", "type": "select", "value": "", "options": ["Streaming", "Podcasts", "Social Media", "Books / Kindle", "YouTube", "A Bit of Everything"] },
          { "label": "Favorite Artist, Show, or Podcast", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "gaming-and-reading",
        "name": "Gaming & Reading",
        "image": "media-content-nb-gaming-reading",
        "fields": [
          { "label": "Gamer Type", "type": "select", "value": "", "options": ["Hardcore Gamer", "Casual Gamer", "Mobile Games Only", "Board / Card Games", "Not a Gamer"] },
          { "label": "Books per Year", "type": "select", "value": "", "options": ["Zero", "1-5", "5-15", "15-30", "30+", "Audiobooks Count"] },
          { "label": "Favorite Game, Book, or Series", "type": "text", "value": "" },
          { "label": "Platform or Reading Format", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "social-events-nb",
    "label": "Social & Events",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 20,
    "is_active": true,
    "fields": [],
    "image": "social-events-nb",
    "subcategories": [
      {
        "id": "weekends-and-date-nights",
        "name": "Weekends & Date Nights",
        "image": "social-events-nb-weekends-date-nights",
        "fields": [
          { "label": "Ideal Weekend Activity", "type": "select", "value": "", "options": ["Brunch with Friends", "Outdoor Adventure", "Museum / Gallery", "Binge-Watch", "Play / Watch Sports", "Absolutely Nothing"] },
          { "label": "Ideal Date Night", "type": "select", "value": "", "options": ["Dinner Out", "Movie Night In", "Activity / Adventure", "Live Event", "Cook Together", "Surprise Me"] },
          { "label": "Free Afternoon Choice", "type": "select", "value": "", "options": ["Nap", "Explore Somewhere New", "Create Something", "See Friends / Family", "Self-Care Ritual", "Learn Something New"] },
          { "label": "Favorite Going-Out Plan", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "live-events-and-social",
        "name": "Live Events & Social",
        "image": "social-events-nb-live-events-social",
        "fields": [
          { "label": "Live Events", "type": "select", "value": "", "options": ["Love Concerts & Shows", "Enjoy Occasionally", "Prefer Intimate Venues", "Not My Thing", "Festival Lover"] },
          { "label": "Favorite Event Type", "type": "text", "value": "" },
          { "label": "Social Media Style", "type": "select", "value": "", "options": ["Love It - Always Online", "Use It, Not Obsessed", "Lurker - Rarely Post", "Minimal Usage", "Off Grid"] },
          { "label": "Favorite Way to Socialize", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "sports-and-hobbies",
        "name": "Sports & Hobbies",
        "image": "social-events-nb-sports-hobbies",
        "fields": [
          { "label": "Watch Sports", "type": "select", "value": "", "options": ["Live at the Stadium", "At a Bar with Friends", "Home on the Couch", "I Don't Watch Sports"] },
          { "label": "Hobby I Want to Try", "type": "select", "value": "", "options": ["Pottery / Ceramics", "Painting", "Surfing", "Photography", "Musical Instrument", "Martial Arts"] },
          { "label": "Favorite Team or Hobby", "type": "text", "value": "" },
          { "label": "Board Game or Group Activity", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  },
  {
    "key": "travel-activity-nb",
    "label": "Travel & Activity",
    "section": "entertainment",
    "page": "mygotwo",
    "genders": [
      "non-binary"
    ],
    "sort_order": 30,
    "is_active": true,
    "fields": [],
    "image": "travel-activity-nb",
    "subcategories": [
      {
        "id": "travel-style",
        "name": "Travel Style",
        "image": "travel-activity-nb-travel-style",
        "fields": [
          { "label": "Ideal Vacation", "type": "select", "value": "", "options": ["Beach / Resort", "City Exploration", "Adventure / Outdoors", "Cultural / Historical", "Road Trip", "Staycation"] },
          { "label": "Travel Feel", "type": "select", "value": "", "options": ["Passport Always Ready", "A Few Trips a Year", "Prefer Being Home", "Local Exploration", "Working Through a Bucket List"] },
          { "label": "Dream Destination", "type": "text", "value": "" },
          { "label": "Best Kind of Trip Partner", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "fitness-and-exercise",
        "name": "Fitness & Exercise",
        "image": "travel-activity-nb-fitness-exercise",
        "fields": [
          { "label": "Activity Level", "type": "select", "value": "", "options": ["Daily Workout", "3-4 Times a Week", "Casually Active", "Trying to Be More Active", "Not Very Active"] },
          { "label": "Preferred Exercise", "type": "multi-select", "value": [], "options": ["Gym / Weights", "Running / Cardio", "Yoga / Pilates", "Team Sports", "Swimming", "Hiking / Walking", "Cycling", "Dance"] },
          { "label": "Workout Time Preference", "type": "text", "value": "" },
          { "label": "Favorite Gear or Studio", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      },
      {
        "id": "pace-and-rhythm",
        "name": "Pace & Rhythm",
        "image": "travel-activity-nb-pace-rhythm",
        "fields": [
          { "label": "Night Owl or Early Bird", "type": "select", "value": "", "options": ["Early Bird", "Night Owl", "Depends on the Day", "Mid-Day Person"] },
          { "label": "Weekend Energy", "type": "text", "value": "" },
          { "label": "Recovery Day Routine", "type": "text", "value": "" },
          { "label": "Perfect Balance of Busy vs Quiet", "type": "text", "value": "" },
          { "label": "Notes", "type": "text", "value": "" }
        ]
      }
    ]
  }
];
