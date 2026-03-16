import { motion } from "framer-motion";
import { Gift, CalendarDays, Heart } from "lucide-react";
import type { Milestone } from "./MilestoneCountdown";

interface EventCalendarProps {
  milestones: Milestone[];
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows: (number | null)[][] = [];
  let row: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    row.push(d);
    if (row.length === 7) {
      rows.push(row);
      row = [];
    }
  }
  if (row.length) {
    while (row.length < 7) row.push(null);
    rows.push(row);
  }
  return rows;
}

function milestoneIcon(type: string) {
  if (type === "birthday") return Gift;
  if (type === "anniversary") return Heart;
  return CalendarDays;
}

export function EventCalendar({ milestones }: EventCalendarProps) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const grid = getMonthGrid(year, month);

  // Map day -> milestones for current month
  const dayEvents = new Map<number, Milestone[]>();
  for (const m of milestones) {
    if (m.date.getMonth() === month && m.date.getFullYear() === year) {
      const d = m.date.getDate();
      if (!dayEvents.has(d)) dayEvents.set(d, []);
      dayEvents.get(d)!.push(m);
    }
  }

  // Upcoming list (all milestones, not just this month)
  const upcoming = milestones.slice(0, 4);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between px-1">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
        >
          Calendar
        </h2>
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
        >
          {MONTH_NAMES[month]} {year}
        </span>
      </div>

      {/* Calendar grid */}
      <div
        className="rounded-2xl px-3 py-3"
        style={{
          background: "rgba(255,255,255,0.70)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_NAMES.map((d, i) => (
            <div
              key={i}
              className="text-center text-[9px] font-semibold uppercase py-1"
              style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {grid.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => {
              const events = day ? dayEvents.get(day) : undefined;
              const isToday = day === today;
              const isPast = day !== null && day < today;

              return (
                <div
                  key={di}
                  className="relative flex flex-col items-center justify-center py-1.5"
                >
                  {day !== null ? (
                    <>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          background: isToday
                            ? "var(--swatch-viridian-odyssey)"
                            : events?.length
                            ? "rgba(212,84,58,0.12)"
                            : "transparent",
                          color: isToday
                            ? "#fff"
                            : events?.length
                            ? "var(--swatch-cedar-grove)"
                            : isPast
                            ? "var(--swatch-text-light)"
                            : "var(--swatch-viridian-odyssey)",
                          fontWeight: events?.length || isToday ? 700 : 400,
                        }}
                      >
                        {day}
                      </div>
                      {events && events.length > 0 && !isToday && (
                        <div
                          className="w-1 h-1 rounded-full mt-0.5"
                          style={{ background: "var(--swatch-cedar-grove)" }}
                        />
                      )}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Upcoming events list below calendar */}
      {upcoming.length > 0 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.85)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {upcoming.map((m, i) => {
            const Icon = milestoneIcon(m.type);
            const urgent = m.daysOut <= 7;
            const accent = urgent ? "var(--swatch-cedar-grove)" : "var(--swatch-teal)";

            return (
              <div
                key={m.id}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderTop: i > 0 ? "1px solid rgba(0,0,0,0.04)" : undefined }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] font-semibold truncate leading-tight"
                    style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                  >
                    {m.person}'s {m.label}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--swatch-antique-coin)" }}>
                    {m.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </p>
                </div>
                <span
                  className="text-[12px] font-bold tabular-nums shrink-0 px-2 py-0.5 rounded-full"
                  style={{
                    color: accent,
                    background: `${accent}10`,
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  {m.daysOut}d
                </span>
              </div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}
