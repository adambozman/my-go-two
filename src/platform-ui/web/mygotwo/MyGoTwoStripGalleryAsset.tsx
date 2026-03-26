import { useMemo, useState } from "react";

type StripItem = {
  id: string;
  image: string;
  align?: string;
};

const STRIP_IMAGES: StripItem[] = [
  {
    id: "01",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    align: "24%",
  },
  {
    id: "02",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    align: "42%",
  },
  {
    id: "03",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    align: "38%",
  },
  {
    id: "04",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    align: "54%",
  },
  {
    id: "05",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
    align: "62%",
  },
  {
    id: "06",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",
    align: "48%",
  },
  {
    id: "07",
    image:
      "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?auto=format&fit=crop&w=900&q=80",
    align: "46%",
  },
  {
    id: "08",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80",
    align: "58%",
  },
  {
    id: "09",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    align: "29%",
  },
  {
    id: "10",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    align: "61%",
  },
  {
    id: "11",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    align: "41%",
  },
  {
    id: "12",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80",
    align: "35%",
  },
  {
    id: "13",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80",
    align: "64%",
  },
  {
    id: "14",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    align: "52%",
  },
  {
    id: "15",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    align: "70%",
  },
  {
    id: "16",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80",
    align: "40%",
  },
  {
    id: "17",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    align: "44%",
  },
  {
    id: "18",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    align: "18%",
  },
];

export default function MyGoTwoStripGalleryAsset() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const strips = useMemo(() => STRIP_IMAGES, []);

  return (
    <section
      aria-label="Strip gallery asset"
      className="flex flex-1 items-stretch justify-center overflow-hidden"
    >
      <div className="h-full w-full">
        <div
          className="flex h-full w-full items-stretch gap-[6px] overflow-hidden"
          onMouseLeave={() => setHoveredId(null)}
        >
          {strips.map((strip) => {
            const isHovered = strip.id === hoveredId;

            return (
              <button
                key={strip.id}
                type="button"
                aria-label={`Open strip ${strip.id}`}
                onMouseEnter={() => setHoveredId(strip.id)}
                className="relative h-full shrink-0 overflow-hidden border-0 p-0 transition-[flex-grow,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  flexBasis: 0,
                  flexGrow: isHovered ? 1.8 : hoveredId ? 0.88 : 1,
                  minWidth: isHovered ? "48px" : "26px",
                  backgroundImage: `url(${strip.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: `${strip.align ?? "50%"} center`,
                  filter: isHovered ? "saturate(1.04) contrast(1.02)" : "saturate(0.96)",
                  transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[1px] bg-white/85"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 w-[1px] bg-white/85"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
