import { motion } from "framer-motion";

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
            className="relative flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: isActive ? 600 : 400,
              background: isActive ? "var(--swatch-teal)" : "rgba(255,255,255,0.45)",
              color: isActive ? "#fff" : "var(--swatch-antique-coin)",
              border: isActive ? "none" : "1px solid rgba(var(--swatch-antique-coin-rgb), 0.2)",
            }}
          >
            {s.label}
            {s.count > 0 && (
              <span
                className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : "rgba(var(--swatch-teal-rgb), 0.15)",
                  color: isActive ? "#fff" : "var(--swatch-teal)",
                }}
              >
                {s.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default KnowMeSectionTabs;
