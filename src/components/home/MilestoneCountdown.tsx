import { CalendarDays, Gift, Clock } from "lucide-react";

export interface Milestone {
  id: string;
  label: string;
  person: string;
  date: Date;
  daysOut: number;
  type: "birthday" | "anniversary" | "custom";
}

function urgencyColor(days: number) {
  if (days <= 7) return "var(--swatch-cedar-grove)";
  if (days <= 14) return "var(--swatch-teal)";
  return "var(--swatch-antique-coin)";
}

function urgencyBg(days: number) {
  if (days <= 7) return "rgba(212,84,58,0.10)";
  if (days <= 14) return "rgba(45,104,112,0.08)";
  return "rgba(74,96,104,0.06)";
}

export function MilestoneBanner({ milestone }: { milestone: Milestone }) {
  const Icon = milestone.type === "birthday" ? Gift : CalendarDays;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{
        background: urgencyBg(milestone.daysOut),
        border: `1px solid ${urgencyColor(milestone.daysOut)}20`,
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: urgencyColor(milestone.daysOut), color: "#fff" }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-semibold truncate"
          style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
        >
          {milestone.person}'s {milestone.label}
        </p>
        <p className="text-[11px]" style={{ color: "var(--swatch-antique-coin)" }}>
          {milestone.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Clock className="w-3 h-3" style={{ color: urgencyColor(milestone.daysOut) }} />
        <span
          className="text-[12px] font-bold tracking-wide"
          style={{ color: urgencyColor(milestone.daysOut), fontFamily: "'Jost', sans-serif" }}
        >
          {milestone.daysOut}d
        </span>
      </div>
    </div>
  );
}

export function MilestoneList({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <section className="space-y-2">
      <h2
        className="text-[11px] font-semibold uppercase tracking-[0.12em] px-1"
        style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
      >
        Upcoming Milestones
      </h2>
      <div className="space-y-1.5">
        {milestones.map((m) => (
          <MilestoneBanner key={m.id} milestone={m} />
        ))}
      </div>
    </section>
  );
}
