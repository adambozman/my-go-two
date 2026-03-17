import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X, Gift, Heart, CalendarDays } from "lucide-react";
import type { Milestone } from "./MilestoneCountdown";

interface EventCalendarProps {
  milestones: Milestone[];
}

interface LocalEvent {
  id: string;
  date: string; // "YYYY-MM-DD"
  title: string;
  type: "personal" | "birthday" | "anniversary" | "reminder";
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

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

function pad(n: number) { return String(n).padStart(2, "0"); }
function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

const TYPE_COLORS: Record<string, string> = {
  birthday: "var(--swatch-cedar-grove)",
  anniversary: "var(--swatch-teal)",
  personal: "var(--swatch-viridian-odyssey)",
  reminder: "var(--swatch-antique-coin)",
};

export function EventCalendar({ milestones }: EventCalendarProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();

  const [visibleDate, setVisibleDate] = useState(() => new Date(currentYear, currentMonth, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [localEvents, setLocalEvents] = useState<LocalEvent[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventType, setNewEventType] = useState<LocalEvent["type"]>("personal");

  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const grid = getMonthGrid(year, month);

  // Merge milestones into a day map
  const dayEvents = useMemo(() => {
    const map = new Map<string, Array<{ title: string; type: string; color: string }>>();

    for (const m of milestones) {
      if (m.date.getMonth() === month && m.date.getFullYear() === year) {
        const key = dateKey(year, month, m.date.getDate());
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({
          title: `${m.person}'s ${m.label}`,
          type: m.type,
          color: m.type === "birthday" ? TYPE_COLORS.birthday : TYPE_COLORS.anniversary,
        });
      }
    }

    for (const e of localEvents) {
      const [ey, em, ed] = e.date.split("-").map(Number);
      if (ey === year && em - 1 === month) {
        const key = dateKey(year, month, ed);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({ title: e.title, type: e.type, color: TYPE_COLORS[e.type] });
      }
    }

    return map;
  }, [milestones, localEvents, month, year]);

  const selectedKey = selectedDay !== null ? dateKey(year, month, selectedDay) : null;
  const selectedEvents = selectedKey ? dayEvents.get(selectedKey) ?? [] : [];

  const changeMonth = (dir: number) => {
    setVisibleDate((d) => new Date(d.getFullYear(), d.getMonth() + dir, 1));
    setSelectedDay(null);
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || selectedDay === null) return;
    setLocalEvents((prev) => [...prev, {
      id: `${Date.now()}`,
      date: dateKey(year, month, selectedDay),
      title: newEventTitle.trim(),
      type: newEventType,
    }]);
    setNewEventTitle("");
    setShowAddForm(false);
  };

  // Upcoming events across all months (next 60 days)
  const upcoming = useMemo(() => {
    const all: Array<{ title: string; date: Date; color: string; type: string }> = [];
    const cutoff = new Date(now.getTime() + 60 * 86400000);

    for (const m of milestones) {
      if (m.date >= now && m.date <= cutoff) {
        all.push({ title: `${m.person}'s ${m.label}`, date: m.date, color: m.type === "birthday" ? TYPE_COLORS.birthday : TYPE_COLORS.anniversary, type: m.type });
      }
    }
    for (const e of localEvents) {
      const d = new Date(e.date);
      if (d >= now && d <= cutoff) {
        all.push({ title: e.title, date: d, color: TYPE_COLORS[e.type], type: e.type });
      }
    }
    return all.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 4);
  }, [milestones, localEvents]);

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Month header */}
      <div className="flex items-center justify-between">
        <p className="text-[26px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
          {MONTH_NAMES[month]} {year}
        </p>
        <div className="flex items-center gap-1.5">
          <button onClick={() => changeMonth(-1)} className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.5)", color: "var(--swatch-viridian-odyssey)" }}>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => changeMonth(1)} className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.5)", color: "var(--swatch-viridian-odyssey)" }}>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7">
        {DAY_NAMES.map((d, i) => (
          <div key={i} className="text-center text-[9px] uppercase tracking-[0.12em] pb-2" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1">
        {grid.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 mb-1">
            {week.map((day, di) => {
              const key = day ? dateKey(year, month, day) : null;
              const events = key ? dayEvents.get(key) : undefined;
              const hasEvents = Boolean(events?.length);
              const isToday = day === today && month === currentMonth && year === currentYear;
              const isSelected = day === selectedDay;
              const isPast = day !== null && year === currentYear && month === currentMonth && day < today;

              return (
                <div key={di} className="flex flex-col items-center py-0.5">
                  {day !== null ? (
                    <button
                      onClick={() => { setSelectedDay(day === selectedDay ? null : day); setShowAddForm(false); }}
                      className="relative flex flex-col items-center gap-0.5 w-full rounded-lg py-1 transition-all hover:bg-white/20"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[12px]"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: isToday || isSelected ? 700 : 400,
                          background: isToday
                            ? "var(--swatch-viridian-odyssey)"
                            : isSelected
                            ? "rgba(255,255,255,0.45)"
                            : "transparent",
                          color: isToday
                            ? "#fff"
                            : isSelected
                            ? "var(--swatch-viridian-odyssey)"
                            : isPast
                            ? "rgba(var(--swatch-antique-coin-rgb), 0.4)"
                            : "var(--swatch-viridian-odyssey)",
                          boxShadow: isSelected ? "0 2px 8px rgba(30,74,82,0.15)" : undefined,
                        }}
                      >
                        {day}
                      </div>
                      {/* Event dots */}
                      {hasEvents && (
                        <div className="flex gap-0.5 justify-center">
                          {events!.slice(0, 3).map((e, ei) => (
                            <div key={ei} className="w-1 h-1 rounded-full" style={{ background: e.color }} />
                          ))}
                        </div>
                      )}
                    </button>
                  ) : <div className="w-7 h-7" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Day popup */}
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-[20px] p-4 backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                {MONTH_NAMES[month]} {selectedDay}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] transition-all"
                  style={{ background: "rgba(var(--swatch-teal-rgb), 0.12)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)", color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
                <button onClick={() => setSelectedDay(null)} className="w-5 h-5 flex items-center justify-center rounded-full" style={{ color: "var(--swatch-antique-coin)" }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {selectedEvents.length > 0 ? (
              <div className="space-y-2 mb-3">
                {selectedEvents.map((e, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                    <p className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}>{e.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              !showAddForm && <p className="text-[11px] mb-3" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>No events. Add one.</p>
            )}

            <AnimatePresence>
              {showAddForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="space-y-2 pt-2 border-t border-white/30">
                    <input
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddEvent()}
                      placeholder="Event name..."
                      className="w-full rounded-xl px-3 py-2 text-[12px] outline-none"
                      style={{ background: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.5)", fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}
                    />
                    <div className="flex gap-1.5 flex-wrap">
                      {(["personal","birthday","anniversary","reminder"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setNewEventType(t)}
                          className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] transition-all"
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            background: newEventType === t ? TYPE_COLORS[t] : "rgba(255,255,255,0.3)",
                            color: newEventType === t ? "#fff" : "var(--swatch-antique-coin)",
                            border: `1px solid ${newEventType === t ? TYPE_COLORS[t] : "rgba(255,255,255,0.4)"}`,
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleAddEvent}
                      className="w-full rounded-xl py-2 text-[11px] uppercase tracking-[0.1em] transition-all"
                      style={{ background: "var(--swatch-viridian-odyssey)", color: "#fff", fontFamily: "'Jost', sans-serif" }}
                    >
                      Save event
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upcoming events */}
      {upcoming.length > 0 && (
        <div className="space-y-2">
          <p className="text-[9px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>Upcoming</p>
          {upcoming.map((e, i) => (
            <div key={i} className="flex items-center gap-3 rounded-[14px] px-3 py-2.5" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.38)" }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: e.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] truncate" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)", fontWeight: 500 }}>{e.title}</p>
                <p className="text-[10px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  {e.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              <p className="text-[11px] flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: e.color }}>
                {Math.ceil((e.date.getTime() - now.getTime()) / 86400000)}d
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
