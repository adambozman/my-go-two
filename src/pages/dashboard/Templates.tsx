import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Shirt, Heart, Gift, Salad, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
        <p className="text-muted-foreground">Quick-start with our ready-made GoTwo card templates.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => {
          const Icon = iconMap[t.icon] || FileText;
          const fieldCount = Array.isArray(t.default_fields) ? t.default_fields.length : 0;
          return (
            <Card key={t.id} className="border-border/50 hover:shadow-md transition-shadow cursor-pointer group" onClick={() => navigate("/dashboard/lists")}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">{t.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{t.category}</p>
                <p className="text-xs text-muted-foreground">{fieldCount} fields</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
