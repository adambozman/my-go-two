import { usePersonalization } from "@/contexts/PersonalizationContext";
import { Sparkles, ShoppingBag, Palette, Tag, Heart } from "lucide-react";

const Recommendations = () => {
  const { personalization, loading } = usePersonalization();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!personalization) {
    return (
      <div className="space-y-4 text-center py-12">
        <Sparkles className="h-10 w-10 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">Complete your profile preferences to get personalized recommendations.</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Your Styles",
      icon: Palette,
      items: personalization.style_keywords || [],
      color: "var(--swatch-terracotta)",
    },
    {
      title: "Your Brands",
      icon: Tag,
      items: personalization.recommended_brands || [],
      color: "var(--swatch-teal)",
    },
    {
      title: "Stores For You",
      icon: ShoppingBag,
      items: personalization.recommended_stores || [],
      color: "var(--swatch-olive)",
    },
    {
      title: "Gift Ideas",
      icon: Heart,
      items: personalization.gift_categories || [],
      color: "var(--swatch-rose)",
    },
  ];

  return (
    <div className="space-y-6 pb-4">
      <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
        For You
      </h1>

      {personalization.persona_summary && (
        <div className="card-design-neumorph rounded-2xl p-5">
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            {personalization.persona_summary}
          </p>
          {personalization.price_tier && (
            <span
              className="inline-block mt-3 text-[11px] font-medium px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: "var(--swatch-teal)" }}
            >
              {personalization.price_tier} tier
            </span>
          )}
        </div>
      )}

      {sections.map((section) => {
        if (!section.items.length) return null;
        const Icon = section.icon;
        return (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" style={{ color: section.color }} />
              <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {section.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item, i) => (
                <span
                  key={i}
                  className="card-design-neumorph text-sm px-4 py-2 rounded-full text-foreground font-medium capitalize"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Recommendations;
