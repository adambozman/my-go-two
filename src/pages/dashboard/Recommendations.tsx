import { usePersonalization } from "@/contexts/PersonalizationContext";
import { Sparkles } from "lucide-react";

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
        <Sparkles className="h-10 w-10 mx-auto" style={{ color: "var(--swatch-teal)" }} />
        <p className="text-muted-foreground">Complete your profile preferences to get personalized recommendations.</p>
      </div>
    );
  }

  const sections = [
    { title: "Your Styles", items: personalization.style_keywords || [] },
    { title: "Your Brands", items: personalization.recommended_brands || [] },
    { title: "Stores For You", items: personalization.recommended_stores || [] },
    { title: "Gift Ideas", items: personalization.gift_categories || [] },
  ];

  return (
    <div className="space-y-7 pb-6">
      {/* Persona card */}
      {personalization.persona_summary && (
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(45, 104, 112, 0.07)",
            border: "1px solid rgba(45, 104, 112, 0.12)",
          }}
        >
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 500 }}
          >
            "{personalization.persona_summary}"
          </p>
          {personalization.price_tier && (
            <span
              className="inline-block mt-4 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: "var(--swatch-teal)" }}
            >
              {personalization.price_tier} tier
            </span>
          )}
        </div>
      )}

      {/* Sections */}
      {sections.map((section) => {
        if (!section.items.length) return null;
        return (
          <div key={section.title} className="space-y-3">
            <h2
              className="text-[19px] font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}
            >
              {section.title}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {section.items.map((item, i) => (
                <span
                  key={i}
                  className="text-[13px] font-medium px-4 py-2 rounded-full capitalize"
                  style={{
                    background: "var(--swatch-sand-mid)",
                    border: "1px solid var(--chip-border)",
                    color: "var(--swatch-antique-coin)",
                  }}
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
