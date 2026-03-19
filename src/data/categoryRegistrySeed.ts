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
            "id": "wool-trousers",
            "name": "Dress Pants",
            "image": "dress-male-bottoms-wool-trousers",
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
          },
          {
            "id": "linen-wool-trousers",
            "name": "Trousers",
            "image": "dress-male-bottoms-linen-wool-trousers",
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
            "id": "velvet-trousers",
            "name": "Tuxedo Pants",
            "image": "dress-male-bottoms-velvet-trousers",
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
            "id": "plain-toe-derby",
            "name": "Derbies",
            "image": "dress-male-footwear-plain-toe-derby",
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
            "id": "monk-strap",
            "name": "Monk Strap Shoes",
            "image": "dress-male-footwear-monk-strap",
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
            "id": "trench-coat",
            "name": "Trench Coat",
            "image": "dress-male-outerwear-trench-coat",
            "fields": [
              {
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
            "id": "mac-coat",
            "name": "Car Coat",
            "image": "dress-male-outerwear-mac-coat",
            "fields": [
              {
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
            "id": "dress-pants",
            "name": "Dress Pants",
            "image": "dress-female-bottoms-dress-pants",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "formal-trousers",
            "name": "Formal Trousers",
            "image": "dress-female-bottoms-formal-trousers",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
              { "label": "Rise", "type": "select", "value": "", "options": ["Mid", "High"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
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
            "id": "tuxedo-pants",
            "name": "Tuxedo Pants",
            "image": "dress-female-bottoms-tuxedo-pants",
            "fields": [
              { "label": "Waist", "type": "text", "value": "" },
              { "label": "Inseam", "type": "text", "value": "" },
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
            "id": "trench-coat",
            "name": "Trench Coat",
            "image": "dress-female-outerwear-trench-coat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
              { "label": "Preferred Brands", "type": "text", "value": "" },
              { "label": "Notes", "type": "text", "value": "" }
            ]
          },
          {
            "id": "car-coat",
            "name": "Car Coat",
            "image": "dress-female-outerwear-car-coat",
            "fields": [
              { "label": "Size", "type": "select", "value": "", "options": ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
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
  }
];
