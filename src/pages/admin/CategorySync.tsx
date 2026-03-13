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
    setMessage("");
    try {
      const { error } = await supabase
        .from("category_registry")
        .upsert(CATEGORY_REGISTRY_SEED as any, { onConflict: "key,page" });
      if (error) throw error;
      setStatus("done");
      setMessage(`${CATEGORY_REGISTRY_SEED.length} rows pushed successfully.`);
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
          style={{ color: status === "done" ? "var(--swatch-teal)" : "var(--swatch-coral)" }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CategorySync;
