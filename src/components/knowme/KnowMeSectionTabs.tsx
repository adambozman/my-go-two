import { Pill } from "@/components/ui/pill";

interface KnowMeSectionTabsProps {
  sections: { id: string; label: string; count: number }[];
  activeSection: string;
  onSelect: (id: string) => void;
}

const KnowMeSectionTabs = ({ sections, activeSection, onSelect }: KnowMeSectionTabsProps) => {
  return (
    <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
      {sections.map((s) => {
        const isActive = s.id === activeSection;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            type="button"
            className="relative flex-shrink-0 whitespace-nowrap"
          >
            <Pill variant={isActive ? "active" : "default"} className="gap-1.5 normal-case tracking-normal text-sm">
              <span>{s.label}</span>
              {s.count > 0 && (
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.25)" : "rgba(var(--swatch-teal-rgb), 0.15)",
                    color: isActive ? "#fff" : "var(--swatch-teal)",
                  }}
                >
                  {s.count}
                </span>
              )}
            </Pill>
          </button>
        );
      })}
    </div>
  );
};

export default KnowMeSectionTabs;
