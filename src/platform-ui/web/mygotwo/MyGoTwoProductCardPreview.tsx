import type { CardEntry } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { slugMyGoTwoFieldLabel } from "@/platform-ui/web/mygotwo/MyGoTwoProductCard";

type MyGoTwoProductCardPreviewProps = {
  categoryLabel: string;
  subcategory: SubcategoryGroup;
  product: SubtypeItem;
  entry: CardEntry | null;
};

function getFieldValue(entry: CardEntry | null, label: string) {
  if (!entry) return "";
  return entry.field_values?.[slugMyGoTwoFieldLabel(label)] || "";
}

export default function MyGoTwoProductCardPreview({
  categoryLabel,
  subcategory,
  product,
  entry,
}: MyGoTwoProductCardPreviewProps) {
  const displayName = entry?.entry_name || product.name;
  const previewFields = (product.fields ?? []).slice(0, 4);

  return (
    <div
      className="flex h-full w-full flex-col border px-4 py-4"
      style={{
        background: "#f3eddc",
        borderColor: "rgba(190, 183, 171, 0.54)",
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#db623f]">
            {categoryLabel} · {subcategory.name}
          </p>
          <h3
            className="font-serif leading-[0.92] text-[#1b1a18]"
            style={{
              fontSize: "46px",
              letterSpacing: "-0.05em",
            }}
          >
            {displayName}
          </h3>
        </div>
        <div
          className="flex h-[112px] w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border"
          style={{
            background: "#d2cbc0",
            borderColor: "rgba(177, 169, 157, 0.46)",
          }}
        >
          {entry?.image_url ? (
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${entry.image_url})` }} />
          ) : (
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#857c70]">Photo</span>
          )}
        </div>
      </div>

      <div className="mb-4 h-px w-full bg-[rgba(182,174,163,0.54)]" />

      <div className="flex-1 space-y-3">
        {previewFields.map((field) => {
          const value = getFieldValue(entry, field.label);
          return (
            <div key={field.label} className="border-b border-[rgba(182,174,163,0.4)] pb-3">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#b0a691]">
                {field.label}
              </p>
              {field.type === "select" && field.options?.length ? (
                <div className="flex flex-wrap gap-2">
                  {field.options.slice(0, 6).map((option) => {
                    const active = option === value;
                    return (
                      <span
                        key={option}
                        className="rounded-full border px-2 py-1 text-[11px]"
                        style={{
                          borderColor: active ? "rgba(216, 88, 54, 0.85)" : "rgba(168, 160, 149, 0.52)",
                          background: active ? "rgba(220, 93, 57, 0.12)" : "transparent",
                          color: "#1f1d1a",
                        }}
                      >
                        {option}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="truncate text-[13px] text-[#6f665c]">
                  {value || (field.label.toLowerCase() === "notes" ? "Add a note..." : "+ add")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="mt-4 flex h-11 items-center justify-center rounded-full text-[14px] font-semibold text-white"
        style={{
          background: "linear-gradient(180deg, #dd5d38 0%, #d65334 100%)",
        }}
      >
        Save Card
      </div>
    </div>
  );
}
