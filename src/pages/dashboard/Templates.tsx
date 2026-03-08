import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Shirt, Heart, Gift, Salad, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import GoTwoText from "@/components/GoTwoText";

const iconMap: Record<string, any> = {
  coffee: Coffee,
  salad: Salad,
  shirt: Shirt,
  heart: Heart,
  gift: Gift,
  file: FileText,
};

const Templates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from("card_templates").select("*").then(({ data }) => {
      setTemplates(data ?? []);
    });
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-1">Templates</h1>
        <p className="text-muted-foreground">
          Quick-start with our ready-made <GoTwoText className="text-base" /> card templates.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {templates.map((t) => {
          const Icon = iconMap[t.icon] || FileText;
          const fieldCount = Array.isArray(t.default_fields) ? t.default_fields.length : 0;
          return (
            <div
              key={t.id}
              className="card-design-neumorph p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate("/dashboard/lists")}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(232,198,174,0.3)' }}>
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{t.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{t.category}</p>
              <p className="text-xs text-muted-foreground">{fieldCount} fields</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
