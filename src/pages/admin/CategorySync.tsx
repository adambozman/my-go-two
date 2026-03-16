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
      // Extract JSON array from TypeScript file
      const startIdx = text.indexOf("CATEGORY_REGISTRY_SEED: CategoryRegistryRow[] = ");
      let seed;
      if (startIdx !== -1) {
        const arrayStart = text.indexOf("[", startIdx);
        const arrayText = text.slice(arrayStart);
        // Find the closing ]; by walking the string
        let depth = 0, endIdx = 0;
        for (let i = 0; i < arrayText.length; i++) {
          if (arrayText[i] === "[") depth++;
          else if (arrayText[i] === "]") { depth--; if (depth === 0) { endIdx = i + 1; break; } }
        }
        seed = JSON.parse(arrayText.slice(0, endIdx));
        setMessage(`Fetched ${seed.length} rows from GitHub. Syncing to Supabase...`);
      } else {
        seed = CATEGORY_REGISTRY_SEED;
        setMessage(`Using bundled seed (${seed.length} rows). Syncing...`);
      }

      const { error: delError } = await supabase
        .from("category_registry")
        .delete()
        .neq("key", "");
      if (delError) throw delError;

      // Strip image field — column may not exist in schema yet
      const seedToInsert = (seed as any[]).map(({ image, ...rest }: any) => rest);
      const { error: insError } = await supabase
        .from("category_registry")
        .insert(seedToInsert as any);
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
