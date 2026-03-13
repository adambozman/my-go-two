import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Search = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [templateResults, setTemplateResults] = useState<any[]>([]);
  const [listResults, setListResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setTemplateResults([]);
      setListResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      const [templatesRes, listsRes] = await Promise.all([
        supabase
          .from("card_templates")
          .select("*")
          .ilike("name", `%${query}%`)
          .limit(10),
        user
          ? supabase
              .from("lists")
              .select("*")
              .eq("user_id", user.id)
              .ilike("title", `%${query}%`)
              .limit(10)
          : Promise.resolve({ data: [] }),
      ]);

      setTemplateResults(templatesRes.data || []);
      setListResults((listsRes as any).data || []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, user]);

  return (
    <div className="min-h-full p-6 max-w-2xl mx-auto">
      <h1
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "var(--swatch-viridian-odyssey)",
        }}
      >
        Search
      </h1>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates and lists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          style={{ borderColor: "var(--swatch-teal)", borderRadius: "1rem" }}
        />
      </div>

      {loading && (
        <p className="text-muted-foreground text-sm">Searching...</p>
      )}

      {!loading && query.trim() && (
        <div className="space-y-8">
          {templateResults.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--swatch-viridian-odyssey)",
                }}
              >
                Templates
              </h2>
              <div className="space-y-2">
                {templateResults.map((t) => (
                  <motion.button
                    key={t.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/dashboard/my-go-two")}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors"
                  >
                    <p
                      className="font-medium"
                      style={{ color: "var(--swatch-viridian-odyssey)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {t.category}
                    </p>
                  </motion.button>
                ))}
              </div>
            </section>
          )}

          {listResults.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--swatch-viridian-odyssey)",
                }}
              >
                My Lists
              </h2>
              <div className="space-y-2">
                {listResults.map((l: any) => (
                  <motion.button
                    key={l.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/dashboard/lists/${l.id}`)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors"
                  >
                    <p
                      className="font-medium"
                      style={{ color: "var(--swatch-viridian-odyssey)" }}
                    >
                      {l.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {l.description || "No description"}
                    </p>
                  </motion.button>
                ))}
              </div>
            </section>
          )}

          {templateResults.length === 0 && listResults.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No results found for &quot;{query}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
