import { useState } from "react";
import ProductEntryCard from "@/components/ui/ProductEntryCard";
import type { SubtypeItem } from "@/components/TemplateCoverFlow";

const sampleSubtype: SubtypeItem = {
  id: "preview-boots",
  name: "Boots",
  image: "",
  fields: [
    { label: "US Size", type: "text" as const, value: "" },
    { label: "Boot Height", type: "select" as const, options: ["Ankle", "Mid", "Knee"], value: "" },
    { label: "Preferred Brands", type: "text" as const, value: "" },
    { label: "Notes", type: "text" as const, value: "" },
  ],
};

const ProductEntryCardPreview = () => {
  const [entryName, setEntryName] = useState("");
  const [values, setValues] = useState<Record<string, string>>({
    "US Size": "",
    "Boot Height": "Ankle",
    "Preferred Brands": "",
    "Notes": "",
  });
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        background: "var(--surface-page)",
      }}
    >
      <div style={{ width: 460, height: 686 }}>
        <ProductEntryCard
          subtype={sampleSubtype}
          subcategoryName="Footwear"
          categoryName="Everyday"
          entryName={entryName}
          values={values}
          imageUrl={imageUrl}
          saving={false}
          isEditing={false}
          onEntryNameChange={setEntryName}
          onChange={(fieldLabel, value) => {
            setValues((prev) => ({ ...prev, [fieldLabel]: value }));
          }}
          onImageChange={setImageUrl}
          onSave={() => {}}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
};

export default ProductEntryCardPreview;
