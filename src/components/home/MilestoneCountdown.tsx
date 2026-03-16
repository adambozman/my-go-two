import { motion } from "framer-motion";
import { Gift, CalendarDays, Clock, ChevronRight } from "lucide-react";

export interface Milestone {
  id: string;
  label: string;
  person: string;
  date: Date;
  daysOut: number;
  type: "birthday" | "anniversary" | "custom";
}

function urgencyGradient(days: number) {
  if (days <= 7)
    return "linear-gradient(135deg, rgba(212,84,58,0.12) 0%, rgba(212,84,58,0.04) 100%)";
  if (days <= 14)
    return "linear-gradient(135deg, rgba(45,104,112,0.10) 0%, rgba(45,104,112,0.03) 100%)";
  return "rgba(255,255,255,0.65)";
}

function urgencyAccent(days: number) {
  if (days <= 7) return "var(--swatch-cedar-grove)";
  if (days <= 14) return "var(--swatch-teal)";
  return "var(--swatch-antique-coin)";
}

export function MilestoneBanner({ milestone, index }: { milestone: Milestone; index: number }) {
  const Icon = milestone.type === "birthday" ? Gift : CalendarDays;
  const accent = urgencyAccent(milestone.daysOut);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 30 }}
      className="flex items-center gap-3.5 px-4 py-4 rounded-2xl cursor-pointer active:scale-[0.98] transition-transform"
      style={{
        background: urgencyGradient(milestone.daysOut),
        border: "1px solid rgba(255,255,255,0.80)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent, color: "#fff", boxShadow: `0 4px 12px ${accent}30` }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[14px] font-semibold truncate leading-tight"
          style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
        >
          {milestone.person}'s {milestone.label}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "var(--swatch-antique-coin)" }}>
          {milestone.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{ background: `${accent}14` }}
        >
          <Clock className="w-3 h-3" style={{ color: accent }} />
          <span
            className="text-[13px] font-bold tabular-nums"
            style={{ color: accent, fontFamily: "'Jost', sans-serif" }}
          >
            {milestone.daysOut}d
          </span>
        </div>
        <ChevronRight className="w-4 h-4" style={{ color: "var(--swatch-text-light)" }} />
      </div>
    </motion.div>
  );
}

export function MilestoneList({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
        >
          Upcoming
        </h2>
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
        >
          {milestones.length} event{milestones.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="space-y-2">
        {milestones.map((m, i) => (
          <MilestoneBanner key={m.id} milestone={m} index={i} />
        ))}
      </div>
    </section>
  );
}
