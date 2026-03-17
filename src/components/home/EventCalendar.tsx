import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X, CalendarDays, Gift, Heart, Bell } from "lucide-react";
import type { Milestone } from "./MilestoneCountdown";

interface EventCalendarProps {
  milestones: Milestone[];
}

interface LocalEvent {
  id: string;
  date: string;
  title: string;
  type: "personal" | "birthday" | "anniversary" | "reminder";
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

const TYPE_META = {
  birthday: { color: "var(--swatch-cedar-grove)", icon: Gift },
  anniversary: { color: "var(--swatch-teal)", icon: Heart },
  personal: { color: "var(--swatch-viridian-odyssey)", icon: CalendarDays },
  reminder: { color: "var(--swatch-antique-coin)", icon: Bell },
} satisfies Record<LocalEvent["type"], { color: string; icon: typeof CalendarDays }>;

export function EventCalendar({ milestones }: EventCalendarProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();

  const [visibleDate, setVisibleDate] = useState(() => new Date(currentYear, currentMonth, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(today);
  const [localEvents, setLocalEvents] = useState<LocalEvent[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventType, setNewEventType] = useState<LocalEvent["type"]>("personal");

  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const grid = getMonthGrid(year, month);

  const dayEvents = useMemo(() => {
    const map = new Map<string, Array<{ id: string; title: string; type: LocalEvent["type"]; color: string }>>();

    for (const m of milestones) {
      if (m.date.getMonth() === month && m.date.getFullYear() === year) {
        const key = dateKey(year, month, m.date.getDate());
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({
          id: m.id,
          title: `${m.person}'s ${m.label}`,
          type: m.type === "birthday" ? "birthday" : "anniversary",
          color: m.type === "birthday" ? TYPE_META.birthday.color : TYPE_META.anniversary.color,
        });
      }
    }

    for (const e of localEvents) {
      const [ey, em, ed] = e.date.split("-").map(Number);
      if (ey === year && em - 1 === month) {
        const key = dateKey(year, month, ed);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({ id: e.id, title: e.title, type: e.type, color: TYPE_META[e.type].color });
      }
    }

    return map;
  }, [localEvents, milestones, month, year]);

  const selectedKey = selectedDay !== null ? dateKey(year, month, selectedDay) : null;
  const selectedEvents = selectedKey ? dayEvents.get(selectedKey) ?? [] : [];

  const upcoming = useMemo(() => {
    const all: Array<{ id: string; title: string; type: LocalEvent["type"]; color: string; date: Date; daysOut: number }> = [];
    const cutoff = new Date(now.getTime() + 45 * 86400000);

    for (const m of milestones) {
      if (m.date >= now && m.date <= cutoff) {
        const type = m.type === "birthday" ? "birthday" : "anniversary";
        all.push({
          id: m.id,
          title: `${m.person}'s ${m.label}`,
          type,
          color: TYPE_META[type].color,
          date: m.date,
          daysOut: Math.ceil((m.date.getTime() - now.getTime()) / 86400000),
        });
      }
    }

    for (const e of localEvents) {
      const date = new Date(`${e.date}T12:00:00`);
      if (date >= now && date <= cutoff) {
        all.push({
          id: e.id,
          title: e.title,
          type: e.type,
          color: TYPE_META[e.type].color,
          date,
          daysOut: Math.ceil((date.getTime() - now.getTime()) / 86400000),
        });
      }
    }

    return all.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3);
  }, [localEvents, milestones, now]);

  const highlightedDates = useMemo(() => new Set(upcoming.map((event) => dateKey(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()))), [upcoming]);

  const selectedDateLabel = selectedDay !== null
    ? new Date(year, month, selectedDay).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Select a day";

  const changeMonth = (dir: number) => {
    setVisibleDate((d) => new Date(d.getFullYear(), d.getMonth() + dir, 1));
    setSelectedDay(null);
    setShowAddForm(false);
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || selectedDay === null) return;

    setLocalEvents((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        date: dateKey(year, month, selectedDay),
        title: newEventTitle.trim(),
        type: newEventType,
      },
    ]);

    setNewEventTitle("");
    setShowAddForm(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-design-overlay-teal relative overflow-visible rounded-[30px] p-5"
      style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.16)" }} />
      <div className="relative flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
            Calendar
          </p>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[28px] leading-[0.95]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                Your month at a glance.
              </p>
              <p className="mt-2 text-[12px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                Upcoming dates are softly highlighted so the next thing to handle stands out fast.
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full px-1.5 py-1 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)" }}>
              <button onClick={() => changeMonth(-1)} className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => changeMonth(1)} className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] px-4 py-4 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.24)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.16)" }}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[18px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
              {MONTH_NAMES[month]} {year}
            </p>
            {upcoming[0] && (
              <div className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: upcoming[0].color, background: "rgba(255,255,255,0.42)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}>
                Next in {upcoming[0].daysOut}d
              </div>
            )}
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {DAY_NAMES.map((day) => (
              <div key={day} className="pb-1 text-center text-[9px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            {grid.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1.5">
                {week.map((day, dayIndex) => {
                  if (day === null) {
                    return <div key={`${weekIndex}-${dayIndex}`} className="h-11 rounded-[16px]" />;
                  }

                  const key = dateKey(year, month, day);
                  const events = dayEvents.get(key) ?? [];
                  const hasEvents = events.length > 0;
                  const isToday = day === today && month === currentMonth && year === currentYear;
                  const isSelected = day === selectedDay;
                  const isUpcoming = highlightedDates.has(key);
                  const accentColor = events[0]?.color ?? "var(--swatch-teal)";

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedDay(day);
                        setShowAddForm(false);
                      }}
                      className="relative flex h-11 flex-col items-center justify-center rounded-[16px] transition-all duration-200"
                      style={{
                        background: isSelected
                          ? "rgba(var(--swatch-teal-rgb), 0.16)"
                          : isToday
                            ? "rgba(var(--swatch-viridian-odyssey-rgb), 0.12)"
                            : isUpcoming
                              ? "rgba(var(--swatch-cedar-grove-rgb), 0.14)"
                              : "rgba(255,255,255,0.2)",
                        border: isSelected
                          ? "1px solid rgba(var(--swatch-teal-rgb), 0.3)"
                          : isUpcoming
                            ? "1px solid rgba(var(--swatch-cedar-grove-rgb), 0.28)"
                            : "1px solid rgba(255,255,255,0.2)",
                        boxShadow: isSelected ? "0 10px 24px rgba(30,74,82,0.12)" : "none",
                      }}
                    >
                      <span className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: isSelected || isToday ? 700 : 500, color: "var(--swatch-viridian-odyssey)" }}>
                        {day}
                      </span>
                      {hasEvents && (
                        <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedDay !== null && (
            <motion.div
              key={selectedKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-[26px] p-4 backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.26)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.52)" }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    Selected day
                  </p>
                  <p className="mt-1 text-[22px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                    {selectedDateLabel}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddForm((value) => !value)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(var(--swatch-teal-rgb), 0.12)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.22)" }}
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                  <button onClick={() => setSelectedDay(null)} className="flex h-8 w-8 items-center justify-center rounded-full" style={{ color: "var(--swatch-antique-coin)" }}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {selectedEvents.length > 0 && (
                <div className="mb-3 space-y-2">
                  {selectedEvents.map((event) => {
                    const Icon = TYPE_META[event.type].icon;
                    return (
                      <div key={event.id} className="flex items-center gap-3 rounded-[18px] px-3 py-3" style={{ background: "rgba(255,255,255,0.32)", border: "1px solid rgba(255,255,255,0.24)" }}>
                        <div className="flex h-9 w-9 items-center justify-center rounded-[14px]" style={{ background: "rgba(255,255,255,0.5)", color: event.color }}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)", fontWeight: 600 }}>
                            {event.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {!selectedEvents.length && !showAddForm && (
                <div className="mb-3 rounded-[18px] px-3 py-3" style={{ background: "rgba(255,255,255,0.18)", border: "1px dashed rgba(var(--swatch-teal-rgb), 0.18)" }}>
                  <p className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    No events yet for this day. Use the add button to place something important here.
                  </p>
                </div>
              )}

              <AnimatePresence>
                {showAddForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="space-y-3 border-t border-white/30 pt-3">
                      <input
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddEvent()}
                        placeholder="Event name"
                        className="w-full rounded-[18px] px-3 py-2.5 text-[12px] outline-none"
                        style={{ background: "rgba(255,255,255,0.36)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)", fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}
                      />
                      <div className="flex flex-wrap gap-2">
                        {(["personal", "birthday", "anniversary", "reminder"] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setNewEventType(type)}
                            className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]"
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              color: newEventType === type ? "var(--swatch-paper)" : TYPE_META[type].color,
                              background: newEventType === type ? TYPE_META[type].color : "rgba(255,255,255,0.32)",
                              border: `1px solid ${TYPE_META[type].color}`,
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handleAddEvent}
                        className="w-full rounded-[18px] py-2.5 text-[11px] uppercase tracking-[0.14em]"
                        style={{ background: "var(--swatch-viridian-odyssey)", color: "var(--swatch-paper)", fontFamily: "'Jost', sans-serif" }}
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
      </div>
    </motion.section>
  );
}
