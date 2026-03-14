import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORY_REGISTRY_SEED } from "@/data/categoryRegistrySeed";
import { Button } from "@/components/ui/button";

type Status = "idle" | "running" | "done" | "error";

const CategorySync = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handlePush = async () => {
    setStatus("running");
    setMessage("Fetching latest registry from GitHub...");
    try {
      // Fetch latest seed directly from GitHub to bypass stale Lovable builds
      const res = await fetch(
        "https://raw.githubusercontent.com/adambozman/my-go-two/main/src/data/categoryRegistrySeed.ts",
        { cache: "no-store" }
      );
      const text = await res.text();
      const match = text.match(/CATEGORY_REGISTRY_SEED: CategoryRegistryRow\[\] = \s*(\[[\s\S]*?\n\];)/);

      let seed;
      if (match) {
        seed = JSON.parse(match[1].replace(/\n\];$/, "]"));
        setMessage(`Fetched ${seed.length} rows from GitHub. Syncing to Supabase...`);
      } else {
        // Fallback to bundled seed
        seed = CATEGORY_REGISTRY_SEED;
        setMessage(`Using bundled seed (${seed.length} rows). Syncing...`);
      }

      const { error: delError } = await supabase
        .from("category_registry")
        .delete()
        .neq("key", "");
      if (delError) throw delError;

      const { error: insError } = await supabase
        .from("category_registry")
        .insert(seed as any);
      if (insError) throw insError;

      setStatus("done");
      setMessage(`✓ ${seed.length} rows pushed from GitHub.`);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message ?? "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center" style={{ minHeight: "60vh", gap: 20 }}>
      <Button
        onClick={handlePush}
        disabled={status === "running"}
        className="rounded-full px-10 py-6 text-base"
      >
        {status === "running" ? "Pushing..." : "Push Updates"}
      </Button>
      {message && (
        <p
          className="text-sm"
          style={{ color: status === "done" ? "var(--swatch-teal)" : status === "error" ? "var(--swatch-coral)" : "var(--color-text-secondary)" }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CategorySync;
