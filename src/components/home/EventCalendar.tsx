import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="card-design-overlay-teal relative overflow-hidden rounded-[30px] p-5"
      style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
    >
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p
              className="mb-2 text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "var(--swatch-cedar-grove)", fontFamily: "'Jost', sans-serif" }}
            >
              Calendar
            </p>
            <p
              className="text-[30px] leading-[0.96]"
              style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
            >
              Important dates, quietly framed.
            </p>
          </div>

          <div
            className="flex items-center gap-2 rounded-full px-2 py-1.5 backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}
          >
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="View previous month"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105"
              style={{ background: "rgba(255,255,255,0.78)", color: "var(--swatch-viridian-odyssey)" }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span
              className="min-w-[82px] text-center text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
            >
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="View next month"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105"
              style={{ background: "rgba(255,255,255,0.78)", color: "var(--swatch-viridian-odyssey)" }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className="rounded-[28px] p-4 backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.28)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)" }}
        >
          <div className="mb-3 grid grid-cols-7">
            {DAY_NAMES.map((dayName) => (
              <div
                key={dayName}
                className="py-1 text-center text-[10px] font-semibold uppercase"
                style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
              >
                {dayName}
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            {grid.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7">
                {week.map((day, dayIndex) => {
                  const hasEvent = day ? highlightedDays.has(day) : false;
                  const isToday = day === today && month === currentMonth && year === currentYear;
                  const isPast = day !== null && year === currentYear && month === currentMonth && day < today;

                  return (
                    <div key={dayIndex} className="flex items-center justify-center py-1.5">
                      {day !== null ? (
                        <div className="relative flex flex-col items-center justify-center">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] transition-transform"
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              background: isToday
                                ? "var(--swatch-viridian-odyssey)"
                                : hasEvent
                                  ? "var(--swatch-cedar-grove)"
                                  : "transparent",
                              color: isToday || hasEvent
                                ? "hsl(var(--primary-foreground))"
                                : isPast
                                  ? "var(--swatch-text-light)"
                                  : "var(--swatch-viridian-odyssey)",
                              fontWeight: isToday || hasEvent ? 700 : 400,
                              boxShadow: hasEvent && !isToday ? "0 12px 24px rgba(212,84,58,0.18)" : undefined,
                            }}
                          >
                            {day}
                          </div>
                          {hasEvent && !isToday && (
                            <div
                              className="mt-1 h-1.5 w-1.5 rounded-full"
                              style={{ background: "var(--swatch-cedar-grove)" }}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="h-10 w-10" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
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
