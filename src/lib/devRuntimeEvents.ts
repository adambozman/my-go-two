export const MYGOTWO_STAGE_DIAGNOSTIC_EVENT = "gotwo_mygotwo_stage_diagnostic";

export type MyGoTwoStageDiagnosticDetail = {
  kind: "mygotwo-stage-fallback";
  failedStrips: Array<{
    id: string;
    label: string | null;
    image: string;
  }>;
};
