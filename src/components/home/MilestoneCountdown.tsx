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

export function MilestoneBanner({ milestone }: { milestone: Milestone }) {
  const Icon = milestone.type === "birthday" ? Gift : CalendarDays;
  const urgent = milestone.daysOut <= 7;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all"
      style={{
        background: urgent
          ? "linear-gradient(135deg, rgba(212,84,58,0.10) 0%, rgba(212,84,58,0.04) 100%)"
          : "rgba(255,255,255,0.60)",
        border: `1px solid ${urgent ? "rgba(212,84,58,0.20)" : "rgba(255,255,255,0.85)"}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: urgencyColor(milestone.daysOut), color: "#fff" }}
      >
        <Icon className="w-4.5 h-4.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[14px] font-semibold truncate"
          style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
        >
          {milestone.person}'s {milestone.label}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "var(--swatch-antique-coin)" }}>
          {milestone.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </p>
      </div>
      <div
        className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg"
        style={{ background: `${urgencyColor(milestone.daysOut)}12` }}
      >
        <Clock className="w-3 h-3" style={{ color: urgencyColor(milestone.daysOut) }} />
        <span
          className="text-[13px] font-bold tabular-nums"
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
    <section className="space-y-2.5">
      <h2
        className="text-[11px] font-semibold uppercase tracking-[0.14em] px-1"
        style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
      >
        Upcoming
      </h2>
      <div className="space-y-2">
        {milestones.map((m) => (
          <MilestoneBanner key={m.id} milestone={m} />
        ))}
      </div>
    </section>
  );
}
