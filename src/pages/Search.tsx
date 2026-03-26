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
  const [entryResults, setEntryResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setTemplateResults([]);
      setEntryResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      const [templatesRes, entriesRes] = await Promise.all([
        supabase.from("card_templates").select("*").ilike("name", `%${query}%`).limit(10),
        user
          ? supabase
              .from("card_entries")
              .select("*")
              .eq("user_id", user.id)
              .or(`group_name.ilike.%${query}%,entry_name.ilike.%${query}%`)
              .limit(20)
          : Promise.resolve({ data: [] }),
      ]);

      setTemplateResults(templatesRes.data || []);
      setEntryResults((entriesRes as any).data || []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, user]);

  return (
    <div className="mx-auto min-h-full max-w-2xl px-3 py-6 sm:px-4 md:px-6">
      <h1
        className="mb-6 text-2xl font-bold"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "var(--swatch-teal)",
        }}
      >
        Search
      </h1>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates and entries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          style={{ borderColor: "var(--swatch-teal)", borderRadius: "1rem" }}
        />
      </div>

      {loading && <p className="text-sm text-muted-foreground">Searching...</p>}

      {!loading && query.trim() && (
        <div className="space-y-8">
          {entryResults.length > 0 && (
            <section>
              <h2
                className="mb-3 text-lg font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--swatch-teal)",
                }}
              >
                My Entries
              </h2>
              <div className="space-y-2">
                {entryResults.map((e: any) => (
                  <motion.button
                    key={e.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/dashboard/my-go-two")}
                    className="w-full rounded-xl px-4 py-3 text-left transition-colors hover:bg-accent/50"
                  >
                    <p className="font-medium" style={{ color: "var(--swatch-teal)" }}>
                      {e.entry_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {e.group_name} &middot; {e.card_key?.split("__").pop()}
                    </p>
                  </motion.button>
                ))}
              </div>
            </section>
          )}

          {templateResults.length > 0 && (
            <section>
              <h2
                className="mb-3 text-lg font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--swatch-teal)",
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
                    className="w-full rounded-xl px-4 py-3 text-left transition-colors hover:bg-accent/50"
                  >
                    <p className="font-medium" style={{ color: "var(--swatch-teal)" }}>
                      {t.name}
                    </p>
                    <p className="text-xs capitalize text-muted-foreground">{t.category}</p>
                  </motion.button>
                ))}
              </div>
            </section>
          )}

          {templateResults.length === 0 && entryResults.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">
              No results found for &quot;{query}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
