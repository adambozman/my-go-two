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

    for (const milestone of milestones) {
      if (milestone.date.getMonth() === month && milestone.date.getFullYear() === year) {
        const key = dateKey(year, month, milestone.date.getDate());
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({
          id: milestone.id,
          title: `${milestone.person}'s ${milestone.label}`,
          type: milestone.type === "birthday" ? "birthday" : "anniversary",
          color: milestone.type === "birthday" ? TYPE_META.birthday.color : TYPE_META.anniversary.color,
        });
      }
    }

    for (const event of localEvents) {
      const [ey, em, ed] = event.date.split("-").map(Number);
      if (ey === year && em - 1 === month) {
        const key = dateKey(year, month, ed);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({
          id: event.id,
          title: event.title,
          type: event.type,
          color: TYPE_META[event.type].color,
        });
      }
    }

    return map;
  }, [localEvents, milestones, month, year]);

  const selectedKey = selectedDay !== null ? dateKey(year, month, selectedDay) : null;
  const selectedEvents = selectedKey ? dayEvents.get(selectedKey) ?? [] : [];

  const upcoming = useMemo(() => {
    const all: Array<{ id: string; title: string; type: LocalEvent["type"]; color: string; date: Date; daysOut: number }> = [];
    const cutoff = new Date(now.getTime() + 45 * 86400000);

    for (const milestone of milestones) {
      if (milestone.date >= now && milestone.date <= cutoff) {
        const type = milestone.type === "birthday" ? "birthday" : "anniversary";
        all.push({
          id: milestone.id,
          title: `${milestone.person}'s ${milestone.label}`,
          type,
          color: TYPE_META[type].color,
          date: milestone.date,
          daysOut: Math.ceil((milestone.date.getTime() - now.getTime()) / 86400000),
        });
      }
    }

    for (const event of localEvents) {
      const date = new Date(`${event.date}T12:00:00`);
      if (date >= now && date <= cutoff) {
        all.push({
          id: event.id,
          title: event.title,
          type: event.type,
          color: TYPE_META[event.type].color,
          date,
          daysOut: Math.ceil((date.getTime() - now.getTime()) / 86400000),
        });
      }
    }

    return all.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3);
  }, [localEvents, milestones]);

  const highlightedDates = useMemo(
    () => new Set(upcoming.map((event) => dateKey(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()))),
    [upcoming],
  );

  const selectedDateLabel = selectedDay !== null
    ? new Date(year, month, selectedDay).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Select a day";

  const changeMonth = (dir: number) => {
    setVisibleDate((value) => new Date(value.getFullYear(), value.getMonth() + dir, 1));
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
      className="relative overflow-visible rounded-[34px] p-[1px]"
      style={{
        background: "linear-gradient(180deg, rgba(var(--swatch-teal-rgb), 0.44) 0%, rgba(var(--swatch-viridian-odyssey-rgb), 0.92) 100%)",
        boxShadow: "0 26px 56px rgba(30,74,82,0.22)",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[33px] px-4 py-4 md:px-5 md:py-5"
        style={{
          background: "linear-gradient(180deg, rgba(var(--swatch-teal-rgb), 0.94) 0%, rgba(var(--swatch-viridian-odyssey-rgb), 0.98) 100%)",
        }}
      >
        <div className="absolute -right-16 -top-12 h-40 w-40 rounded-full" style={{ background: "rgba(var(--swatch-paper-rgb), 0.08)" }} />
        <div className="absolute -bottom-20 -left-14 h-40 w-40 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.24)" }} />

        <div className="relative flex min-h-[620px] flex-col gap-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.68)" }}>
                  Calendar
                </p>
                <p className="mt-2 text-[28px] leading-[0.92]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-paper)" }}>
                  A clearer month.
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full px-1.5 py-1" style={{ background: "rgba(var(--swatch-paper-rgb), 0.08)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.12)" }}>
                <button onClick={() => changeMonth(-1)} className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-paper)" }}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => changeMonth(1)} className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-paper)" }}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-[24px] px-3 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.08)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.1)" }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[18px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-paper)" }}>
                    {MONTH_NAMES[month]} {year}
                  </p>
                  <p className="mt-1 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.68)" }}>
                    Upcoming days glow brighter.
                  </p>
                </div>
                {upcoming[0] && (
                  <div className="rounded-[18px] px-3 py-2 text-right" style={{ background: "rgba(var(--swatch-paper-rgb), 0.08)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.08)" }}>
                    <p className="text-[9px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.6)" }}>
                      Next up
                    </p>
                    <p className="text-[14px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-paper)" }}>
                      {upcoming[0].daysOut}d
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] px-3 py-3" style={{ background: "rgba(var(--swatch-viridian-odyssey-rgb), 0.22)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.1)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
            <div className="mb-2 grid grid-cols-7 gap-1">
              {DAY_NAMES.map((day) => (
                <div key={day} className="pb-1 text-center text-[9px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.54)" }}>
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
                    const accentColor = events[0]?.color ?? "var(--swatch-cedar-grove)";

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
                            ? "rgba(var(--swatch-paper-rgb), 0.18)"
                            : isUpcoming
                              ? "rgba(var(--swatch-cedar-grove-rgb), 0.28)"
                              : isToday
                                ? "rgba(var(--swatch-paper-rgb), 0.14)"
                                : "rgba(var(--swatch-paper-rgb), 0.05)",
                          border: isSelected
                            ? "1px solid rgba(var(--swatch-paper-rgb), 0.3)"
                            : isUpcoming
                              ? "1px solid rgba(var(--swatch-cedar-grove-rgb), 0.42)"
                              : "1px solid rgba(var(--swatch-paper-rgb), 0.08)",
                          boxShadow: isUpcoming ? `0 0 0 1px ${accentColor}22 inset` : "none",
                        }}
                      >
                        <span className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: isToday || isSelected ? 700 : 500, color: "var(--swatch-paper)" }}>
                          {day}
                        </span>
                        {hasEvents && <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {upcoming.map((event) => (
              <button
                key={event.id}
                onClick={() => {
                  setVisibleDate(new Date(event.date.getFullYear(), event.date.getMonth(), 1));
                  setSelectedDay(event.date.getDate());
                  setShowAddForm(false);
                }}
                className="flex items-center justify-between rounded-[20px] px-3 py-3 text-left"
                style={{ background: "rgba(var(--swatch-paper-rgb), 0.08)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.1)" }}
              >
                <div className="min-w-0">
                  <p className="truncate text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-paper)", fontWeight: 600 }}>
                    {event.title}
                  </p>
                  <p className="mt-1 text-[10px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.62)" }}>
                    {event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <div className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-paper)", background: event.color }}>
                  {event.daysOut}d
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedDay !== null && (
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-auto rounded-[28px] px-4 py-4"
                style={{ background: "rgba(var(--swatch-paper-rgb), 0.12)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.14)", backdropFilter: "blur(12px)" }}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.56)" }}>
                      Selected day
                    </p>
                    <p className="mt-1 text-[22px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-paper)" }}>
                      {selectedDateLabel}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddForm((value) => !value)}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]"
                      style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-paper)", background: "rgba(var(--swatch-paper-rgb), 0.1)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.14)" }}
                    >
                      <Plus className="h-3.5 w-3.5" /> Add
                    </button>
                    <button onClick={() => setSelectedDay(null)} className="flex h-8 w-8 items-center justify-center rounded-full" style={{ color: "rgba(var(--swatch-paper-rgb), 0.74)" }}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {selectedEvents.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {selectedEvents.map((event) => {
                      const Icon = TYPE_META[event.type].icon;
                      return (
                        <div key={event.id} className="flex items-center gap-3 rounded-[18px] px-3 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.08)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.08)" }}>
                          <div className="flex h-9 w-9 items-center justify-center rounded-[14px]" style={{ background: "rgba(var(--swatch-paper-rgb), 0.12)", color: event.color }}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <p className="min-w-0 flex-1 truncate text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-paper)", fontWeight: 600 }}>
                            {event.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!selectedEvents.length && !showAddForm && (
                  <div className="mb-3 rounded-[18px] px-3 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.06)", border: "1px dashed rgba(var(--swatch-paper-rgb), 0.16)" }}>
                    <p className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.62)" }}>
                      Nothing saved for this day yet.
                    </p>
                  </div>
                )}

                <AnimatePresence>
                  {showAddForm && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="space-y-3 border-t pt-3" style={{ borderColor: "rgba(var(--swatch-paper-rgb), 0.1)" }}>
                        <input
                          value={newEventTitle}
                          onChange={(e) => setNewEventTitle(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddEvent()}
                          placeholder="Event name"
                          className="w-full rounded-[18px] px-3 py-2.5 text-[12px] outline-none"
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.12)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.12)", color: "var(--swatch-paper)", fontFamily: "'Jost', sans-serif" }}
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
                                background: newEventType === type ? TYPE_META[type].color : "rgba(var(--swatch-paper-rgb), 0.08)",
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
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.16)", color: "var(--swatch-paper)", fontFamily: "'Jost', sans-serif", border: "1px solid rgba(var(--swatch-paper-rgb), 0.16)" }}
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
      </div>
    </motion.section>
  );
}
