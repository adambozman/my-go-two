import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, CalendarDays, Gift, Heart, Bell, Sparkles, CalendarPlus, Trash2 } from "lucide-react";
import type { Milestone } from "./MilestoneCountdown";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface EventCalendarProps {
  milestones: Milestone[];
  connections: Array<{ id: string; name: string }>;
}

type CalendarEventType = "personal" | "birthday" | "anniversary" | "reminder" | "custom";
type CalendarEventSource = "self" | "connection";

interface PersistedCalendarEvent {
  connection_user_id: string | null;
  created_at: string;
  date: string;
  description: string | null;
  event_type: CalendarEventType;
  id: string;
  source_type: CalendarEventSource;
  title: string;
}

interface CalendarItem {
  id: string;
  title: string;
  description?: string | null;
  type: CalendarEventType;
  sourceType: CalendarEventSource;
  personName: string;
  date: Date;
  dateKey: string;
  color: string;
  isReadOnly: boolean;
  connectionUserId?: string | null;
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
  custom: { color: "var(--swatch-sandstone, #c58b61)", icon: Sparkles },
} satisfies Record<CalendarEventType, { color: string; icon: typeof CalendarDays }>;

function toDateInput(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatFriendlyDate(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function buildOccurrenceDate(milestone: Milestone, year: number) {
  return new Date(year, milestone.month, milestone.day, 12, 0, 0);
}

function buildNextOccurrence(milestone: Milestone, now: Date) {
  const next = buildOccurrenceDate(milestone, now.getFullYear());
  if (startOfLocalDay(next) < startOfLocalDay(now)) {
    next.setFullYear(next.getFullYear() + 1);
  }
  return next;
}

export function EventCalendar({ milestones, connections }: EventCalendarProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const todayKey = toDateInput(now);

  const [visibleDate, setVisibleDate] = useState(() => new Date(currentYear, currentMonth, 1));
  const [selectedDate, setSelectedDate] = useState(() => new Date(currentYear, currentMonth, now.getDate()));
  const [persistedEvents, setPersistedEvents] = useState<PersistedCalendarEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [savingEvent, setSavingEvent] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventType, setNewEventType] = useState<CalendarEventType>("personal");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventConnectionId, setNewEventConnectionId] = useState("");

  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const grid = getMonthGrid(year, month);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setPersistedEvents([]);
      setLoadingEvents(false);
      return;
    }

    setLoadingEvents(true);

    supabase
      .from("calendar_events")
      .select("id, title, description, date, event_type, source_type, connection_user_id, created_at")
      .eq("user_id", user.id)
      .order("date", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          toast({
            title: "Could not load calendar events",
            description: "Your relationship dates are still visible, but saved events could not be loaded.",
          });
          setPersistedEvents([]);
        } else {
          setPersistedEvents((data ?? []) as PersistedCalendarEvent[]);
        }
        setLoadingEvents(false);
      });

    return () => {
      cancelled = true;
    };
  }, [toast, user]);

  useEffect(() => {
    if (
      selectedDate.getFullYear() !== year ||
      selectedDate.getMonth() !== month
    ) {
      setSelectedDate(new Date(year, month, 1));
    }
  }, [month, selectedDate, year]);

  const milestoneItems = useMemo(() => {
    return milestones.map((milestone) => {
      const occurrenceDate = buildOccurrenceDate(milestone, year);
      const key = dateKey(year, occurrenceDate.getMonth(), occurrenceDate.getDate());
      const type = milestone.type === "custom" ? "custom" : milestone.type;
      const personLabel = milestone.source === "self" ? "You" : milestone.person;

      return {
        id: `milestone-${milestone.id}-${year}`,
        title: milestone.source === "self" ? `Your ${milestone.label}` : `${milestone.person}'s ${milestone.label}`,
        description: milestone.source === "self" ? "Saved from your profile." : "Pulled from your connection profile.",
        type,
        sourceType: milestone.source,
        personName: personLabel,
        date: occurrenceDate,
        dateKey: key,
        color: TYPE_META[type].color,
        isReadOnly: true,
        connectionUserId: milestone.personId ?? null,
      } satisfies CalendarItem;
    });
  }, [milestones, year]);

  const savedItems = useMemo(() => {
    return persistedEvents.map((event) => {
      const [eventYear, eventMonth, eventDay] = event.date.split("-").map(Number);
      const eventDate = new Date(eventYear, eventMonth - 1, eventDay, 12, 0, 0);
      const connectionName = connections.find((connection) => connection.id === event.connection_user_id)?.name;

      return {
        id: event.id,
        title: event.title,
        description: event.description,
        type: event.event_type,
        sourceType: event.source_type,
        personName: connectionName ?? "You",
        date: eventDate,
        dateKey: event.date,
        color: TYPE_META[event.event_type].color,
        isReadOnly: false,
        connectionUserId: event.connection_user_id,
      } satisfies CalendarItem;
    });
  }, [connections, persistedEvents]);

  const monthItems = useMemo(() => {
    return [...milestoneItems, ...savedItems].filter((item) => item.date.getFullYear() === year && item.date.getMonth() === month);
  }, [milestoneItems, month, savedItems, year]);

  const dayEvents = useMemo(() => {
    const map = new Map<string, CalendarItem[]>();

    for (const item of monthItems) {
      if (!map.has(item.dateKey)) map.set(item.dateKey, []);
      map.get(item.dateKey)!.push(item);
    }

    for (const [, items] of map) {
      items.sort((a, b) => {
        if (a.sourceType !== b.sourceType) {
          return a.sourceType === "connection" ? -1 : 1;
        }
        return a.title.localeCompare(b.title);
      });
    }

    return map;
  }, [monthItems]);

  const selectedKey = toDateInput(selectedDate);
  const selectedEvents = dayEvents.get(selectedKey) ?? [];

  const monthConnectionCount = monthItems.filter((item) => item.sourceType === "connection").length;
  const monthPersonalCount = monthItems.filter((item) => item.sourceType === "self").length;

  const upcomingConnections = useMemo(() => {
    return milestones
      .map((milestone) => {
        const next = buildNextOccurrence(milestone, now);
        return {
          id: milestone.id,
          title: milestone.source === "self" ? `Your ${milestone.label}` : `${milestone.person}'s ${milestone.label}`,
          date: next,
          source: milestone.source,
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 4);
  }, [milestones, now]);

  const selectedConnectionEvents = selectedEvents.filter((event) => event.sourceType === "connection");
  const selectedPersonalEvents = selectedEvents.filter((event) => event.sourceType === "self");

  const changeMonth = (dir: number) => {
    const nextVisible = new Date(year, month + dir, 1);
    setVisibleDate(nextVisible);
    setSelectedDate(new Date(nextVisible.getFullYear(), nextVisible.getMonth(), 1));
    setShowAddForm(false);
  };

  const handleAddEvent = async () => {
    if (!user || !newEventTitle.trim()) return;

    setSavingEvent(true);

    const payload = {
      user_id: user.id,
      title: newEventTitle.trim(),
      description: newEventDescription.trim() || null,
      date: selectedKey,
      event_type: newEventType,
      source_type: newEventConnectionId ? "connection" : "self",
      connection_user_id: newEventConnectionId || null,
      is_all_day: true,
    } as const;

    const { data, error } = await supabase
      .from("calendar_events")
      .insert(payload)
      .select("id, title, description, date, event_type, source_type, connection_user_id, created_at")
      .single();

    setSavingEvent(false);

    if (error || !data) {
      toast({
        title: "Could not save event",
        description: "Please try again. Your date selection is still here.",
      });
      return;
    }

    setPersistedEvents((prev) => [...prev, data as PersistedCalendarEvent]);
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventType("personal");
    setNewEventConnectionId("");
    setShowAddForm(false);

    toast({
      title: "Event saved",
      description: "Your calendar now keeps that date on the Home tab.",
    });
  };

  const handleDeleteEvent = async (eventId: string) => {
    const previous = persistedEvents;
    setPersistedEvents((events) => events.filter((event) => event.id !== eventId));

    const { error } = await supabase.from("calendar_events").delete().eq("id", eventId);

    if (error) {
      setPersistedEvents(previous);
      toast({
        title: "Could not delete event",
        description: "The event is still saved. Please try again.",
      });
      return;
    }

    toast({
      title: "Event removed",
      description: "That date has been removed from your calendar.",
    });
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
          background: "linear-gradient(180deg, rgba(var(--swatch-paper-rgb), 0.88) 0%, rgba(var(--swatch-paper-rgb), 0.72) 100%)",
        }}
      >
        <div className="absolute -right-16 -top-12 h-40 w-40 rounded-full" style={{ background: "rgba(var(--swatch-paper-rgb), 0.35)" }} />
        <div className="absolute -bottom-20 -left-14 h-40 w-40 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.18)" }} />

        <div className="relative grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_380px]">
          <div className="space-y-4">
            <div className="rounded-[28px] px-4 py-4 md:px-5" style={{ background: "rgba(var(--swatch-paper-rgb), 0.5)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.10)", boxShadow: "0 10px 28px rgba(30,74,82,0.08)" }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    Relationship calendar
                  </p>
                  <div>
                    <p className="text-[32px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                      {MONTH_NAMES[month]} {year}
                    </p>
                    <p className="mt-2 max-w-[40rem] text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                      Keep birthdays, anniversaries, and your own plans in one elegant view that feels built for people, not paperwork.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <button
                    onClick={() => {
                      setVisibleDate(new Date(currentYear, currentMonth, 1));
                      setSelectedDate(new Date(currentYear, currentMonth, now.getDate()));
                      setShowAddForm(false);
                    }}
                    className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(var(--swatch-paper-rgb), 0.75)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}
                  >
                    Today
                  </button>
                  <div className="flex items-center gap-1 rounded-full px-1.5 py-1" style={{ background: "rgba(var(--swatch-paper-rgb), 0.75)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}>
                    <button onClick={() => changeMonth(-1)} className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => changeMonth(1)} className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-[22px] px-4 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.78)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.08)" }}>
                  <p className="text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    Connection dates this month
                  </p>
                  <p className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)", fontWeight: 700 }}>
                    {monthConnectionCount}
                  </p>
                </div>
                <div className="rounded-[22px] px-4 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.78)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.08)" }}>
                  <p className="text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    Your saved plans this month
                  </p>
                  <p className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)", fontWeight: 700 }}>
                    {monthPersonalCount}
                  </p>
                </div>
                <div className="rounded-[22px] px-4 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.78)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.08)" }}>
                  <p className="text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    Calendar health
                  </p>
                  <p className="mt-2 text-[15px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)", fontWeight: 600 }}>
                    {loadingEvents ? "Loading your saved events..." : "Connected dates and personal plans are both active."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] px-3 py-3 md:px-4 md:py-4" style={{ background: "linear-gradient(180deg, rgba(var(--swatch-viridian-odyssey-rgb), 0.95) 0%, rgba(var(--swatch-teal-rgb), 0.92) 100%)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.18)", boxShadow: "0 22px 54px rgba(30,74,82,0.18)" }}>
              <div className="mb-3 grid grid-cols-7 gap-2">
                {DAY_NAMES.map((day) => (
                  <div key={day} className="pb-1 text-center text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.62)" }}>
                    {day}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {grid.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-2">
                    {week.map((day, dayIndex) => {
                      if (day === null) {
                        return <div key={`${weekIndex}-${dayIndex}`} className="min-h-[88px] rounded-[20px] opacity-30" />;
                      }

                      const key = dateKey(year, month, day);
                      const events = dayEvents.get(key) ?? [];
                      const isToday = key === todayKey;
                      const isSelected = key === selectedKey;
                      const connectionCount = events.filter((event) => event.sourceType === "connection").length;
                      const selfCount = events.filter((event) => event.sourceType === "self").length;

                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedDate(new Date(year, month, day));
                            setShowAddForm(false);
                          }}
                          className="flex min-h-[88px] flex-col rounded-[20px] px-2 py-2 text-left transition-transform duration-200 hover:-translate-y-0.5"
                          style={{
                            background: isSelected
                              ? "rgba(var(--swatch-paper-rgb), 0.22)"
                              : isToday
                                ? "rgba(var(--swatch-paper-rgb), 0.14)"
                                : "rgba(var(--swatch-paper-rgb), 0.06)",
                            border: isSelected
                              ? "1px solid rgba(var(--swatch-paper-rgb), 0.42)"
                              : isToday
                                ? "1px solid rgba(var(--swatch-cedar-grove-rgb), 0.38)"
                                : "1px solid rgba(var(--swatch-paper-rgb), 0.10)",
                            boxShadow: isSelected ? "0 12px 26px rgba(0,0,0,0.12)" : "none",
                          }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[14px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: isToday || isSelected ? 700 : 500, color: "var(--swatch-paper)" }}>
                              {day}
                            </span>
                            {events.length > 0 && (
                              <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-paper)", background: "rgba(var(--swatch-paper-rgb), 0.14)" }}>
                                {events.length}
                              </span>
                            )}
                          </div>

                          <div className="mt-auto space-y-1">
                            {events.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className="truncate rounded-full px-2 py-1 text-[9px]"
                                style={{
                                  fontFamily: "'Jost', sans-serif",
                                  background: "rgba(var(--swatch-paper-rgb), 0.12)",
                                  color: "var(--swatch-paper)",
                                  border: `1px solid ${event.color}55`,
                                }}
                              >
                                {event.title}
                              </div>
                            ))}
                            {events.length > 2 && (
                              <p className="text-[10px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-paper-rgb), 0.72)" }}>
                                +{events.length - 2} more
                              </p>
                            )}
                            {!events.length && (
                              <div className="flex gap-1.5 pt-2">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(var(--swatch-paper-rgb), 0.35)" }} />
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(var(--swatch-paper-rgb), 0.18)" }} />
                              </div>
                            )}
                            {!!events.length && (
                              <div className="flex gap-1.5 pt-1">
                                {!!connectionCount && <span className="h-1.5 w-5 rounded-full" style={{ background: TYPE_META.birthday.color }} />}
                                {!!selfCount && <span className="h-1.5 w-5 rounded-full" style={{ background: TYPE_META.personal.color }} />}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.aside
              key={selectedKey}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="h-full rounded-[30px] px-4 py-4 md:px-5"
              style={{
                background: "linear-gradient(180deg, rgba(var(--swatch-paper-rgb), 0.94) 0%, rgba(var(--swatch-paper-rgb), 0.82) 100%)",
                border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)",
                boxShadow: "0 18px 44px rgba(30,74,82,0.1)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    Details panel
                  </p>
                  <p className="mt-2 text-[30px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                    {selectedDate.getDate()}
                  </p>
                  <p className="mt-1 text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    {formatFriendlyDate(selectedDate)}
                  </p>
                </div>

                <button
                  onClick={() => setShowAddForm((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-paper)", background: "var(--swatch-teal)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add date
                </button>
              </div>

              <div className="mt-4 rounded-[22px] px-4 py-4" style={{ background: "rgba(var(--swatch-paper-rgb), 0.7)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.08)" }}>
                <div className="flex items-center gap-2">
                  <CalendarPlus className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
                  <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}>
                    Day summary
                  </p>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  {selectedEvents.length
                    ? `${selectedEvents.length} item${selectedEvents.length === 1 ? "" : "s"} live on this date. Connection dates stay visible, and your own plans are editable here.`
                    : "No dates live here yet. Use this panel to add a birthday, anniversary, reminder, or a custom plan without leaving the Home tab."}
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      My Connections dates
                    </p>
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                      {selectedConnectionEvents.length}
                    </span>
                  </div>

                  {selectedConnectionEvents.length ? (
                    <div className="space-y-2">
                      {selectedConnectionEvents.map((event) => {
                        const Icon = TYPE_META[event.type].icon;
                        return (
                          <div key={event.id} className="rounded-[20px] px-3 py-3" style={{ background: "rgba(var(--swatch-teal-rgb), 0.08)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.10)" }}>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-[14px]" style={{ background: "rgba(var(--swatch-paper-rgb), 0.92)", color: event.color }}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                                  {event.title}
                                </p>
                                <p className="mt-1 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-[20px] px-3 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.62)", border: "1px dashed rgba(var(--swatch-teal-rgb), 0.12)" }}>
                      <p className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        None of your connections have an important date landing here yet.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      Your plans
                    </p>
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                      {selectedPersonalEvents.length}
                    </span>
                  </div>

                  {selectedPersonalEvents.length ? (
                    <div className="space-y-2">
                      {selectedPersonalEvents.map((event) => {
                        const Icon = TYPE_META[event.type].icon;
                        return (
                          <div key={event.id} className="rounded-[20px] px-3 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.8)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.10)" }}>
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-[14px]" style={{ background: "rgba(var(--swatch-teal-rgb), 0.10)", color: event.color }}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                                  {event.title}
                                </p>
                                <p className="mt-1 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                                  {event.description || "Saved from your Home tab calendar."}
                                </p>
                              </div>
                              {!event.isReadOnly && (
                                <button
                                  onClick={() => void handleDeleteEvent(event.id)}
                                  className="flex h-9 w-9 items-center justify-center rounded-full"
                                  style={{ color: "var(--swatch-antique-coin)", background: "rgba(var(--swatch-paper-rgb), 0.78)" }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-[20px] px-3 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.62)", border: "1px dashed rgba(var(--swatch-teal-rgb), 0.12)" }}>
                      <p className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        Nothing personal is saved for this day yet.
                      </p>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showAddForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden rounded-[24px]"
                    >
                      <div className="space-y-3 rounded-[24px] px-4 py-4" style={{ background: "linear-gradient(180deg, rgba(var(--swatch-paper-rgb), 0.92) 0%, rgba(var(--swatch-paper-rgb), 0.80) 100%)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)" }}>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
                          <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}>
                            Add something meaningful
                          </p>
                        </div>

                        <input
                          value={newEventTitle}
                          onChange={(e) => setNewEventTitle(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && void handleAddEvent()}
                          placeholder="Dinner reservation, birthday reminder, send flowers..."
                          className="w-full rounded-[18px] px-3 py-2.5 text-[13px] outline-none"
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.95)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)", color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                        />

                        <textarea
                          value={newEventDescription}
                          onChange={(e) => setNewEventDescription(e.target.value)}
                          rows={3}
                          placeholder="Optional note"
                          className="w-full resize-none rounded-[18px] px-3 py-2.5 text-[13px] outline-none"
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.95)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)", color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                        />

                        <div className="flex flex-wrap gap-2">
                          {(["personal", "birthday", "anniversary", "reminder", "custom"] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => setNewEventType(type)}
                              className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]"
                              style={{
                                fontFamily: "'Jost', sans-serif",
                                color: newEventType === type ? "var(--swatch-paper)" : TYPE_META[type].color,
                                background: newEventType === type ? TYPE_META[type].color : "rgba(var(--swatch-paper-rgb), 0.72)",
                                border: `1px solid ${TYPE_META[type].color}`,
                              }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>

                        <select
                          value={newEventConnectionId}
                          onChange={(e) => setNewEventConnectionId(e.target.value)}
                          className="w-full rounded-[18px] px-3 py-2.5 text-[13px] outline-none"
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.95)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)", color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                        >
                          <option value="">Just for me</option>
                          {connections.map((connection) => (
                            <option key={connection.id} value={connection.id}>
                              Link to {connection.name}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => void handleAddEvent()}
                          disabled={savingEvent}
                          className="w-full rounded-[18px] py-3 text-[11px] uppercase tracking-[0.14em] disabled:opacity-60"
                          style={{ background: "var(--swatch-teal)", color: "var(--swatch-paper)", fontFamily: "'Jost', sans-serif", border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)" }}
                        >
                          {savingEvent ? "Saving..." : "Save to calendar"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="rounded-[22px] px-4 py-4" style={{ background: "rgba(var(--swatch-paper-rgb), 0.7)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.08)" }}>
                  <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    Coming up
                  </p>
                  <div className="mt-3 space-y-2">
                    {upcomingConnections.map((item) => (
                      <div key={`${item.id}-${item.date.toISOString()}`} className="flex items-center justify-between gap-3 rounded-[18px] px-3 py-2.5" style={{ background: "rgba(var(--swatch-paper-rgb), 0.8)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.08)" }}>
                        <div className="min-w-0">
                          <p className="truncate text-[12px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                            {item.title}
                          </p>
                          <p className="mt-1 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                            {item.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <span className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: item.source === "connection" ? "var(--swatch-paper)" : "var(--swatch-teal)", background: item.source === "connection" ? "var(--swatch-teal)" : "rgba(var(--swatch-teal-rgb), 0.10)" }}>
                          {item.source === "connection" ? "Connection" : "You"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
