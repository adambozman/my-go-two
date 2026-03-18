import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, CalendarDays, Gift, Heart, Bell, Sparkles, Trash2, X, Star } from "lucide-react";
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
  user_id: string;
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
  personal: { color: "var(--swatch-teal)", icon: CalendarDays },
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

function isPriorityEvent(item: Pick<CalendarItem, "type">) {
  return item.type === "birthday" || item.type === "anniversary" || item.type === "reminder";
}

function getPriorityStarColor(events: CalendarItem[]) {
  const hasSelfPriority = events.some((event) => event.sourceType === "self" && isPriorityEvent(event));
  if (hasSelfPriority) return "#f2c94c";

  const hasConnectionPriority = events.some((event) => event.sourceType === "connection" && isPriorityEvent(event));
  if (hasConnectionPriority) return "var(--swatch-cedar-grove)";

  return null;
}

function getSourceAccent(event: Pick<CalendarItem, "sourceType">) {
  return event.sourceType === "connection" ? "var(--swatch-cedar-grove)" : "var(--swatch-teal)";
}

export function EventCalendar({ milestones, connections }: EventCalendarProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const todayKey = toDateInput(now);

  const [visibleDate, setVisibleDate] = useState(() => new Date(currentYear, currentMonth, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

    const relatedUserIds = Array.from(new Set([user.id, ...connections.map((connection) => connection.id)]));

    supabase
      .from("calendar_events")
      .select("id, title, description, date, event_type, source_type, connection_user_id, created_at, user_id")
      .in("user_id", relatedUserIds)
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
  }, [connections, toast, user]);

  useEffect(() => {
    if (
      selectedDate &&
      (selectedDate.getFullYear() !== year || selectedDate.getMonth() !== month)
    ) {
      setSelectedDate(null);
      setShowAddForm(false);
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
      const ownerConnectionName = connections.find((connection) => connection.id === event.user_id)?.name;
      const linkedConnectionName = connections.find((connection) => connection.id === event.connection_user_id)?.name;
      const isOwnedByCurrentUser = event.user_id === user?.id;
      const sourceType = isOwnedByCurrentUser ? event.source_type : "connection";
      const personName = !isOwnedByCurrentUser
        ? ownerConnectionName ?? "Connection"
        : event.source_type === "connection"
          ? linkedConnectionName ?? "Connection"
          : "You";

      return {
        id: event.id,
        title: event.title,
        description: event.description,
        type: event.event_type,
        sourceType,
        personName,
        date: eventDate,
        dateKey: event.date,
        color: TYPE_META[event.event_type].color,
        isReadOnly: !isOwnedByCurrentUser,
        connectionUserId: event.connection_user_id,
      } satisfies CalendarItem;
    });
  }, [connections, persistedEvents, user?.id]);

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

  const selectedKey = selectedDate ? toDateInput(selectedDate) : null;
  const selectedEvents = dayEvents.get(selectedKey) ?? [];

  const selectedConnectionEvents = selectedEvents.filter((event) => event.sourceType === "connection");
  const selectedPersonalEvents = selectedEvents.filter((event) => event.sourceType === "self");
  const totalSelectedEvents = selectedEvents.length;

  const changeMonth = (dir: number) => {
    const nextVisible = new Date(year, month + dir, 1);
    setVisibleDate(nextVisible);
    setSelectedDate(null);
    setShowAddForm(false);
  };

  const handleAddEvent = async () => {
    if (!user || !selectedKey || !newEventTitle.trim()) return;

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
      .select("id, title, description, date, event_type, source_type, connection_user_id, created_at, user_id")
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

  const selectedDateModal = selectedDate ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[180] flex items-center justify-center bg-[rgba(14,30,33,0.62)] p-3 md:p-8"
        onClick={() => {
          setSelectedDate(null);
          setShowAddForm(false);
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="max-h-[84vh] w-full max-w-[640px] overflow-y-auto rounded-[34px] p-[1px]"
          style={{
            background: "linear-gradient(180deg, rgba(var(--swatch-teal-rgb), 0.35) 0%, rgba(var(--swatch-teal-rgb), 0.72) 100%)",
            boxShadow: "0 36px 110px rgba(10,20,24,0.34)",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="relative overflow-hidden rounded-[33px] px-4 py-4 md:px-5 md:py-5"
            style={{
              background: "rgb(var(--swatch-paper-rgb))",
            }}
          >
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    Date details
                  </p>
                  <p className="mt-2 text-[34px] leading-none md:text-[40px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
                    {selectedDate.getDate()}
                  </p>
                  <p className="mt-1 text-[13px] md:text-[14px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    {formatFriendlyDate(selectedDate)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddForm((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cream-light)", background: "var(--swatch-teal)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.16)", textShadow: "0 1px 0 rgba(0,0,0,0.12)" }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add date
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDate(null);
                      setShowAddForm(false);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ color: "var(--swatch-teal)", background: "rgba(var(--swatch-paper-rgb), 0.9)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)" }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "#f7f1e7", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}>
                  <span className="h-1.5 w-5 rounded-full" style={{ background: "var(--swatch-teal)" }} />
                  {selectedPersonalEvents.length} my events
                </span>
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "#f7f1e7", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}>
                  <span className="h-1.5 w-5 rounded-full" style={{ background: "var(--swatch-cedar-grove)" }} />
                  {selectedConnectionEvents.length} connection events
                </span>
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "#f7f1e7", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}>
                  <Star className="h-3.5 w-3.5 fill-current" style={{ color: getPriorityStarColor(selectedEvents) ?? "rgba(var(--swatch-antique-coin-rgb), 0.7)" }} />
                  {totalSelectedEvents ? "Day in focus" : "Open day"}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-[26px] px-4 py-4" style={{ background: "#fcf8f1", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)" }}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      What lands here
                    </p>
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                      {totalSelectedEvents}
                    </span>
                  </div>

                  {totalSelectedEvents ? (
                    <div className="space-y-2.5">
                      {selectedEvents.map((event) => {
                        const Icon = TYPE_META[event.type].icon;
                        const isPriority = isPriorityEvent(event);

                        return (
                          <div
                            key={event.id}
                            className="rounded-[22px] px-3.5 py-3"
                            style={{
                              background: event.sourceType === "connection" ? "#f7ece8" : "#edf7f5",
                              border: `1px solid ${event.sourceType === "connection" ? "rgba(var(--swatch-cedar-grove-rgb), 0.18)" : "rgba(var(--swatch-teal-rgb), 0.18)"}`,
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-[16px]" style={{ background: "rgba(var(--swatch-paper-rgb), 0.92)", color: event.color }}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="truncate text-[14px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, color: "var(--swatch-teal)" }}>
                                    {event.title}
                                  </p>
                                  <span className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: getSourceAccent(event), background: "rgba(255,255,255,0.88)" }}>
                                    {event.personName}
                                  </span>
                                  {isPriority && (
                                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: event.sourceType === "connection" ? "var(--swatch-cedar-grove)" : "#d4a62a", background: "rgba(255,255,255,0.88)" }}>
                                      <Star className="h-3 w-3 fill-current" />
                                      Priority
                                    </span>
                                  )}
                                </div>
                                <p className="mt-1.5 text-[12px] leading-[1.55]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                                  {event.description || (event.sourceType === "connection" ? "Shared into your calendar view." : "Saved from your Home calendar.")}
                                </p>
                              </div>
                              {!event.isReadOnly && (
                                <button
                                  onClick={() => void handleDeleteEvent(event.id)}
                                  className="flex h-9 w-9 items-center justify-center rounded-full"
                                  style={{ color: "var(--swatch-antique-coin)", background: "rgba(var(--swatch-paper-rgb), 0.84)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.08)" }}
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
                    <div className="rounded-[22px] px-4 py-4" style={{ background: "#faf6ee", border: "1px dashed rgba(var(--swatch-teal-rgb), 0.14)" }}>
                      <p className="text-[13px] leading-[1.6]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        Nothing is saved on this day yet. You can keep it open and add something meaningful when you are ready.
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
                      className="overflow-hidden rounded-[26px]"
                    >
                      <div className="space-y-3 rounded-[26px] px-4 py-4" style={{ background: "#f8f3eb", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
                          <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                            Add something meaningful
                          </p>
                        </div>

                        <input
                          value={newEventTitle}
                          onChange={(e) => setNewEventTitle(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && void handleAddEvent()}
                          placeholder="Dinner reservation, birthday reminder, send flowers..."
                          className="w-full rounded-[18px] px-3 py-2.5 text-[13px] outline-none"
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.96)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)", color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
                        />

                        <textarea
                          value={newEventDescription}
                          onChange={(e) => setNewEventDescription(e.target.value)}
                          rows={3}
                          placeholder="Optional note"
                          className="w-full resize-none rounded-[18px] px-3 py-2.5 text-[13px] outline-none"
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.96)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)", color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
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
                                background: newEventType === type ? TYPE_META[type].color : "rgba(var(--swatch-paper-rgb), 0.75)",
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
                          style={{ background: "rgba(var(--swatch-paper-rgb), 0.96)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)", color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
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
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-visible rounded-[30px] p-[1px]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(var(--swatch-paper-rgb), 0.88) 100%)",
          boxShadow: "0 18px 36px rgba(255,255,255,0.20), 0 14px 30px rgba(74,96,104,0.08)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[29px] px-3 py-3 md:px-3.5 md:py-3.5"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(var(--swatch-paper-rgb), 0.96) 100%)",
          }}
        >
        <div className="absolute -right-14 -top-10 h-28 w-28 rounded-full" style={{ background: "rgba(var(--swatch-paper-rgb), 0.28)" }} />
        <div className="absolute -bottom-14 -left-10 h-28 w-28 rounded-full" style={{ background: "rgba(var(--swatch-cedar-grove-rgb), 0.08)" }} />

        <div className="relative space-y-3">
          <div className="flex items-start justify-between gap-3 rounded-[22px] px-4 py-3" style={{ background: "rgba(var(--swatch-paper-rgb), 0.5)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.10)", boxShadow: "0 8px 18px rgba(30,74,82,0.07)" }}>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                Connection Calendar
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <p className="text-[24px] leading-none md:text-[26px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
                  {MONTH_NAMES[month]} {year}
                </p>
                <div className="flex items-center gap-0.5 rounded-full px-1 py-0.5" style={{ background: "rgba(var(--swatch-paper-rgb), 0.75)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)" }}>
                  <button onClick={() => changeMonth(-1)} className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-teal)" }}>
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => changeMonth(1)} className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105" style={{ color: "var(--swatch-teal)" }}>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 rounded-[18px] px-3 py-2 md:block" style={{ background: "rgba(var(--swatch-paper-rgb), 0.72)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.10)" }}>
              <p className="text-[9px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                Legend
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-6 rounded-full" style={{ background: "var(--swatch-cedar-grove)" }} />
                  Connection
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-6 rounded-full" style={{ background: "var(--swatch-teal)" }} />
                  My event
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-current" style={{ color: "#f2c94c" }} />
                  My priority
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-current" style={{ color: "var(--swatch-cedar-grove)" }} />
                  Connection priority
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] px-2.5 py-2.5" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(var(--swatch-paper-rgb), 0.98) 100%)", border: "1px solid rgba(255,255,255,0.82)", boxShadow: "0 12px 28px rgba(255,255,255,0.22), 0 10px 22px rgba(74,96,104,0.06)" }}>
            <div className="mb-2 grid grid-cols-7 gap-1">
              {DAY_NAMES.map((day) => (
                <div key={day} className="pb-1 text-center text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(var(--swatch-antique-coin-rgb), 0.62)" }}>
                  {day}
                </div>
              ))}
            </div>

            <div className="space-y-1">
              {grid.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-1">
                  {week.map((day, dayIndex) => {
                    if (day === null) {
                      return <div key={`${weekIndex}-${dayIndex}`} className="min-h-[52px] rounded-[14px] opacity-30" />;
                    }

                    const key = dateKey(year, month, day);
                    const events = dayEvents.get(key) ?? [];
                    const isToday = key === todayKey;
                    const isSelected = key === selectedKey;
                    const connectionCount = events.filter((event) => event.sourceType === "connection").length;
                    const selfCount = events.filter((event) => event.sourceType === "self").length;
                    const priorityStarColor = getPriorityStarColor(events);

                      return (
                        <button
                          key={key}
                        onClick={() => {
                          setSelectedDate(new Date(year, month, day));
                          setShowAddForm(false);
                        }}
                          className="flex min-h-[52px] flex-col rounded-[14px] px-1.5 py-1.5 text-left transition-transform duration-200 hover:-translate-y-0.5"
                          style={{
                            background: isSelected
                              ? "rgba(255,255,255,0.92)"
                            : isToday
                              ? "rgba(var(--swatch-cedar-grove-rgb), 0.08)"
                              : "rgba(255,255,255,0.56)",
                          border: isSelected
                            ? "1px solid rgba(var(--swatch-teal-rgb), 0.18)"
                            : isToday
                              ? "1px solid rgba(var(--swatch-cedar-grove-rgb), 0.38)"
                              : "1px solid rgba(255,255,255,0.42)",
                          boxShadow: isSelected ? "0 10px 24px rgba(74,96,104,0.10)" : "none",
                          }}
                        >
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: isToday || isSelected ? 700 : 500, color: "var(--swatch-teal)" }}>
                            {day}
                          </span>
                          {priorityStarColor && (
                            <span
                              className="inline-flex h-4 w-4 items-center justify-center rounded-full"
                              style={{
                                background: priorityStarColor === "#f2c94c" ? "rgba(242, 201, 76, 0.16)" : "rgba(var(--swatch-cedar-grove-rgb), 0.16)",
                                color: priorityStarColor,
                              }}
                            >
                              <Star className="h-2.5 w-2.5 fill-current" />
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex min-h-[22px] items-center justify-center">
                          {!events.length && (
                            <div className="flex gap-1 pt-1.5">
                              <span className="h-1 w-1 rounded-full" style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.18)" }} />
                              <span className="h-1 w-1 rounded-full" style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.10)" }} />
                            </div>
                          )}
                          {!!events.length && (
                            <div className="flex w-full flex-col items-center justify-center gap-1 pt-1">
                              {!!connectionCount && <span className="h-1.5 w-7 rounded-full" style={{ background: "var(--swatch-cedar-grove)" }} />}
                              {!!selfCount && <span className="h-1.5 w-7 rounded-full" style={{ background: "var(--swatch-teal)" }} />}
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
        </div>
      </motion.section>
      {typeof document !== "undefined" ? createPortal(selectedDateModal, document.body) : null}
    </>
  );
}
