import { useEffect, useState } from "react";
import {
  MYGOTWO_STAGE_DIAGNOSTIC_EVENT,
  type MyGoTwoStageDiagnosticDetail,
} from "@/lib/devRuntimeEvents";

type RuntimeDiagnostic = {
  kind: "error" | "rejection" | "notice";
  title: string;
  message: string;
};

const getDiagnosticMessage = (value: unknown) => {
  if (value instanceof Error) {
    return value.stack ?? value.message;
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return "Unknown runtime failure";
  }
};

export function DevRuntimeDiagnostics() {
  const [diagnostic, setDiagnostic] = useState<RuntimeDiagnostic | null>(null);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleError = (event: ErrorEvent) => {
      const message = getDiagnosticMessage(event.error ?? event.message);
      console.error("Unhandled runtime error:", event.error ?? event.message);
      setDiagnostic({ kind: "error", title: "Runtime Diagnostic", message });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = getDiagnosticMessage(event.reason);
      console.error("Unhandled promise rejection:", event.reason);
      setDiagnostic({ kind: "rejection", title: "Runtime Diagnostic", message });
    };

    const handleMyGoTwoDiagnostic = (
      event: Event,
    ) => {
      const detail = (event as CustomEvent<MyGoTwoStageDiagnosticDetail>).detail;
      if (!detail || detail.kind !== "mygotwo-stage-fallback") return;

      const failedLabels = detail.failedStrips
        .map((strip) => strip.label || `Strip ${strip.id}`)
        .join(", ");

      setDiagnostic({
        kind: "notice",
        title: "My Go Two Fallback",
        message: `Full strip transforms failed for: ${failedLabels}. The preview stage stayed in place so the page did not blank out.`,
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener(MYGOTWO_STAGE_DIAGNOSTIC_EVENT, handleMyGoTwoDiagnostic);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener(MYGOTWO_STAGE_DIAGNOSTIC_EVENT, handleMyGoTwoDiagnostic);
    };
  }, []);

  if (!import.meta.env.DEV || !diagnostic) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-[min(28rem,calc(100vw-2rem))] rounded-2xl border border-destructive/20 bg-background/95 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-destructive">
            {diagnostic.title}
          </p>
          <p className="text-sm text-foreground">
            {diagnostic.kind === "notice"
              ? "Captured a non-fatal development notice."
              : `Captured an unhandled ${diagnostic.kind === "rejection" ? "promise rejection" : "runtime error"}.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDiagnostic(null)}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:text-foreground"
        >
          Dismiss
        </button>
      </div>
      <pre className="mt-3 max-h-48 overflow-auto rounded-xl bg-black/5 p-3 text-xs text-muted-foreground">
        {diagnostic.message}
      </pre>
    </div>
  );
}

// Codebase classification: development runtime diagnostics overlay.
