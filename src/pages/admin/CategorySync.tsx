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
    setMessage("Preparing seed data...");
    try {
      const seed = CATEGORY_REGISTRY_SEED;
      // Strip image field — column may not exist in schema
      const seedToInsert = (seed as any[]).map(({ image, ...rest }: any) => rest);
      setMessage(`Pushing ${seedToInsert.length} rows via backend function...`);

      const { data, error } = await supabase.functions.invoke("sync-category-registry", {
        body: { rows: seedToInsert },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setStatus("done");
      setMessage(`✓ ${data?.count ?? seedToInsert.length} rows synced successfully.`);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message ?? "Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center" style={{ gap: 20 }}>
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
