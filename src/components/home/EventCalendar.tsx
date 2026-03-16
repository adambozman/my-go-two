import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, CalendarDays, Heart, ChevronDown } from "lucide-react";
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

  const dayEvents = useMemo(() => {
    const mapped = new Map<number, Milestone[]>();
    for (const milestone of milestones) {
      if (milestone.date.getMonth() === month && milestone.date.getFullYear() === year) {
        const day = milestone.date.getDate();
        if (!mapped.has(day)) mapped.set(day, []);
        mapped.get(day)!.push(milestone);
      }
    }
    return mapped;
  }, [milestones, month, year]);

  const firstEventDay = useMemo(() => {
    const days = Array.from(dayEvents.keys()).sort((a, b) => a - b);
    return days[0] ?? null;
  }, [dayEvents]);

  const [expandedDay, setExpandedDay] = useState<number | null>(firstEventDay);

  const selectedEvents = expandedDay ? dayEvents.get(expandedDay) ?? [] : [];
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

      <div
        className="rounded-2xl px-3 py-3"
        style={{
          background: "rgba(255,255,255,0.70)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
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

        {grid.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => {
              const events = day ? dayEvents.get(day) : undefined;
              const hasEvents = Boolean(events?.length);
              const isToday = day === today;
              const isPast = day !== null && day < today;
              const isExpanded = day !== null && day === expandedDay;

              return (
                <div key={di} className="relative flex flex-col items-center justify-center py-1.5">
                  {day !== null ? (
                    <button
                      type="button"
                      disabled={!hasEvents}
                      onClick={() => {
                        if (!hasEvents) return;
                        setExpandedDay((current) => (current === day ? null : day));
                      }}
                      className="flex flex-col items-center disabled:cursor-default"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium transition-transform"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          transform: isExpanded ? "scale(1.08)" : undefined,
                          background: isToday
                            ? "var(--swatch-viridian-odyssey)"
                            : hasEvents
                            ? isExpanded
                              ? "var(--swatch-cedar-grove)"
                              : "rgba(212,84,58,0.12)"
                            : "transparent",
                          color: isToday
                            ? "#fff"
                            : hasEvents
                            ? isExpanded
                              ? "#fff"
                              : "var(--swatch-cedar-grove)"
                            : isPast
                            ? "var(--swatch-text-light)"
                            : "var(--swatch-viridian-odyssey)",
                          fontWeight: hasEvents || isToday ? 700 : 400,
                        }}
                      >
                        {day}
                      </div>
                      {hasEvents && !isToday && (
                        <div
                          className="w-1 h-1 rounded-full mt-0.5"
                          style={{ background: isExpanded ? "var(--swatch-teal)" : "var(--swatch-cedar-grove)" }}
                        />
                      )}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}

        <AnimatePresence initial={false}>
          {expandedDay !== null && selectedEvents.length > 0 && (
            <motion.div
              key={expandedDay}
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div
                className="rounded-2xl px-3 py-3"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
                  >
                    {MONTH_NAMES[month]} {expandedDay}
                  </p>
                  <div
                    className="flex items-center gap-1 text-[10px]"
                    style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
                  >
                    <span>Tap day to close</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>

                <div className="space-y-2">
                  {selectedEvents.map((milestone) => {
                    const Icon = milestoneIcon(milestone.type);
                    const urgent = milestone.daysOut <= 7;
                    const accent = urgent ? "var(--swatch-cedar-grove)" : "var(--swatch-teal)";

                    return (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-3 rounded-xl px-3 py-2"
                        style={{ background: `${accent}10` }}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${accent}18`, color: accent }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-[13px] font-semibold truncate leading-tight"
                            style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                          >
                            {milestone.person}'s {milestone.label}
                          </p>
                          <p className="text-[10px] mt-0.5" style={{ color: "var(--swatch-antique-coin)" }}>
                            {milestone.date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <span
                          className="text-[11px] font-bold tabular-nums shrink-0 px-2 py-0.5 rounded-full"
                          style={{ color: accent, background: `${accent}12`, fontFamily: "'Jost', sans-serif" }}
                        >
                          {milestone.daysOut}d
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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