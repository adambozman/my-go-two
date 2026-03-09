import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Coffee, Shirt, Heart, Gift, Salad, FileText, 
  Footprints, Sparkles, Scissors, Ruler,
  UtensilsCrossed, Apple, ShoppingBasket,
  Flower2, Gem, ListChecks, CalendarHeart, Cake,
  Plane, Store, Calendar,
  ThumbsDown, HeartHandshake, Tag, Package
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import GoTwoText from "@/components/GoTwoText";

const iconMap: Record<string, any> = {
  coffee: Coffee,
  salad: Salad,
  shirt: Shirt,
  heart: Heart,
  gift: Gift,
  file: FileText,
  footprints: Footprints,
  sparkles: Sparkles,
  scissors: Scissors,
  ruler: Ruler,
  utensils: UtensilsCrossed,
  apple: Apple,
  "shopping-basket": ShoppingBasket,
  "flower-2": Flower2,
  gem: Gem,
  "list-checks": ListChecks,
  "calendar-heart": CalendarHeart,
  cake: Cake,
  plane: Plane,
  store: Store,
  calendar: Calendar,
  "thumbs-down": ThumbsDown,
  "heart-handshake": HeartHandshake,
  tag: Tag,
  package: Package,
};

const categoryLabels: Record<string, string> = {
  personal: "Personal",
  "food-drink": "Food & Drink",
  "gifts-occasions": "Gifts & Occasions",
  experiences: "Experiences",
  preferences: "Preferences",
};

const categoryOrder = ["personal", "food-drink", "gifts-occasions", "experiences", "preferences"];

const Templates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from("card_templates").select("*").then(({ data }) => {
      setTemplates(data ?? []);
    });
  }, []);

  const grouped = categoryOrder
    .map((cat) => ({
      key: cat,
      label: categoryLabels[cat] ?? cat,
      items: templates.filter((t) => t.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-1">Templates</h1>
        <p className="text-muted-foreground">
          Quick-start with our ready-made <GoTwoText className="text-base" /> card templates.
        </p>
      </div>

      {grouped.map((group) => (
        <div key={group.key} className="mb-10">
          <h2 className="text-lg font-semibold text-primary mb-4">{group.label}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((t) => {
              const Icon = iconMap[t.icon] || FileText;
              const fieldCount = Array.isArray(t.default_fields) ? t.default_fields.length : 0;
              return (
                <div
                  key={t.id}
                  className="card-design-neumorph p-5 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate("/dashboard/lists")}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.3)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--swatch-cedar-grove)' }} />
                  </div>
                  <h3 className="text-base font-bold text-primary mb-1">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{fieldCount} fields</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Templates;
