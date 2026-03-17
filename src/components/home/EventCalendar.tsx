import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Milestone } from "./MilestoneCountdown";

interface EventCalendarProps {
  milestones: Milestone[];
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows: (number | null)[][] = [];
  let row: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    row.push(d);
    if (row.length === 7) { rows.push(row); row = []; }
  }
  if (row.length) {
    while (row.length < 7) row.push(null);
    rows.push(row);
  }
  return rows;
}

export function EventCalendar({ milestones }: EventCalendarProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();
  const [visibleDate, setVisibleDate] = useState(() => new Date(currentYear, currentMonth, 1));

  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const grid = getMonthGrid(year, month);

  const highlightedDays = useMemo(() => {
    const mapped = new Map<number, Milestone[]>();
    for (const milestone of milestones) {
      if (milestone.date.getMonth() === month && milestone.date.getFullYear() === year) {
        const day = milestone.date.getDate();
        if (!mapped.has(day)) mapped.set(day, []);
        mapped.get(day)?.push(milestone);
      }
    }
    return mapped;
  }, [milestones, month, year]);

  const changeMonth = (direction: number) => {
    setVisibleDate((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
          {MONTH_NAMES[month]} {year}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{ background: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.45)", color: "var(--swatch-viridian-odyssey)" }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{ background: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.45)", color: "var(--swatch-viridian-odyssey)" }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d, i) => (
          <div key={i} className="text-center text-[10px] uppercase tracking-[0.1em] py-1" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      {grid.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((day, di) => {
            const hasEvent = Boolean(day && highlightedDays.has(day));
            const isToday = day === today && month === currentMonth && year === currentYear;
            const isPast = day !== null && year === currentYear && month === currentMonth && day < today;

            return (
              <div key={di} className="flex flex-col items-center justify-center py-1.5">
                {day !== null ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] relative"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: isToday || hasEvent ? 700 : 400,
                      background: isToday
                        ? "var(--swatch-viridian-odyssey)"
                        : hasEvent
                        ? "rgba(var(--swatch-cedar-grove-rgb), 0.15)"
                        : "transparent",
                      color: isToday
                        ? "#fff"
                        : hasEvent
                        ? "var(--swatch-cedar-grove)"
                        : isPast
                        ? "rgba(var(--swatch-antique-coin-rgb), 0.4)"
                        : "var(--swatch-viridian-odyssey)",
                    }}
                  >
                    {day}
                    {hasEvent && !isToday && (
                      <div className="absolute bottom-0 w-1 h-1 rounded-full" style={{ background: "var(--swatch-cedar-grove)" }} />
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}
