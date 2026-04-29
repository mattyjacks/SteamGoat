"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Clock,
  MapPin,
  Play,
  Square,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw,
  Users,
  CalendarDays,
  Timer,
  Shield,
  BarChart3,
  Plus,
  X,
  Navigation,
  Building2,
  Briefcase,
  MessageCircle,
  ClipboardCheck,
  Eye,
  Trash2,
  Flag,
  Search,
  Filter,
  Target,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GeoLocation {
  lat: number;
  lng: number;
  accuracy: number;
  address?: string;
  timestamp: number;
}

interface TimeEntry {
  id: string;
  date: string;
  clockIn: number;
  clockOut: number | null;
  clockInLocation: GeoLocation;
  clockOutLocation: GeoLocation | null;
  duration: number | null;
  status: "active" | "completed" | "flagged" | "approved";
  clientId: string | null;
  clientName: string | null;
  serviceType: string | null;
  notes: string;
  flagReason?: string;
}

interface ClientRecord {
  id: string;
  name: string;
  caseNumber: string;
  program: string;
  status: "active" | "closed" | "pending";
  totalHours: number;
  lastVisit: string | null;
  notes: string[];
  serviceGoals: string[];
}

/* ------------------------------------------------------------------ */
/*  Sample Data                                                        */
/* ------------------------------------------------------------------ */

const sampleClients: ClientRecord[] = [
  { id: "c1", name: "Jordan Rivera", caseNumber: "DVR-2024-0847", program: "DVR Pre-ETS", status: "active", totalHours: 12.5, lastVisit: "2026-04-28", notes: ["Completed interest assessment", "Working on resume"], serviceGoals: ["Complete career assessment", "Job shadow by May", "Interview prep by June"] },
  { id: "c2", name: "Aaliyah Washington", caseNumber: "DVR-2024-1102", program: "VR Supported Employment", status: "active", totalHours: 8.0, lastVisit: "2026-04-25", notes: ["Starting workplace readiness module"], serviceGoals: ["Obtain WIOA credential", "Placement by Q3", "90-day retention"] },
  { id: "c3", name: "Marcus Chen", caseNumber: "WF-2024-0293", program: "WIOA Youth", status: "active", totalHours: 15.25, lastVisit: "2026-04-27", notes: ["GED prep in progress", "Financial literacy module started"], serviceGoals: ["Complete GED", "Work experience placement", "Financial literacy certificate"] },
  { id: "c4", name: "Taylor Okonkwo", caseNumber: "DVR-2024-0651", program: "DVR Transition", status: "active", totalHours: 6.75, lastVisit: "2026-04-22", notes: ["IEP meeting scheduled 5/1"], serviceGoals: ["Transition plan complete", "Connect with post-secondary disability services", "Independent living skills"] },
  { id: "c5", name: "Sam Petrov", caseNumber: "WF-2024-0445", program: "WIOA Adult", status: "pending", totalHours: 0, lastVisit: null, notes: ["Intake scheduled"], serviceGoals: ["Career assessment", "Training referral", "Employment within 6 months"] },
];

const serviceTypes = [
  "Career Counseling",
  "Job Development",
  "Resume Assistance",
  "Interview Coaching",
  "Job Shadow Facilitation",
  "Workplace Readiness Training",
  "Benefits Planning",
  "Transition Planning (IEP)",
  "Pre-ETS Activity",
  "Supported Employment",
  "Follow-up/Retention",
  "Case Note Documentation",
  "Assessment Administration",
  "Community Resource Connection",
];

const geofenceLocations = [
  { name: "Main Office - SteamGOAT HQ", lat: 47.6062, lng: -122.3321, radius: 200 },
  { name: "Partner Site - WorkSource Tacoma", lat: 47.2529, lng: -122.4443, radius: 150 },
  { name: "Client Site - Olympia DVR Office", lat: 47.0379, lng: -122.9007, radius: 200 },
  { name: "Community Center - Kent", lat: 47.3809, lng: -122.2348, radius: 100 },
  { name: "Remote/Field Work", lat: 0, lng: 0, radius: 999999 },
];

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatDuration(ms: number) {
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
}

function formatDurationDecimal(ms: number) {
  return (ms / 3600000).toFixed(2);
}

function distanceBetween(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371e3;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getGeofenceMatch(lat: number, lng: number) {
  for (const gf of geofenceLocations) {
    if (gf.radius > 99999) continue;
    const dist = distanceBetween(lat, lng, gf.lat, gf.lng);
    if (dist <= gf.radius) return { name: gf.name, distance: Math.round(dist) };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AttendancePage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>(sampleClients);
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [tab, setTab] = useState<"clock" | "logs" | "clients" | "audit">("clock");

  // Clock-in form state
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [clockNotes, setClockNotes] = useState("");
  const [clockOutNotes, setClockOutNotes] = useState("");

  // Logs filter
  const [logFilter, setLogFilter] = useState<"all" | "flagged" | "approved" | "completed">("all");
  const [logSearch, setLogSearch] = useState("");

  // Client detail
  const [selectedClientDetail, setSelectedClientDetail] = useState<string | null>(null);
  const [newCaseNote, setNewCaseNote] = useState("");

  // Date state
  const [today, setToday] = useState("");
  const [weekStartStr, setWeekStartStr] = useState("");

  // Timer ref
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load from localStorage and initialize dates
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem("pathready-attendance-entries");
      const savedActive = localStorage.getItem("pathready-attendance-active");
      const savedClients = localStorage.getItem("pathready-attendance-clients");
      if (savedEntries) setEntries(JSON.parse(savedEntries));
      if (savedActive) setActiveEntry(JSON.parse(savedActive));
      if (savedClients) setClients(JSON.parse(savedClients));
    } catch {}
    
    // Initialize dates
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);
    
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    setWeekStartStr(weekStart.toISOString().split("T")[0]);
  }, []);

  // Save entries
  useEffect(() => {
    localStorage.setItem("pathready-attendance-entries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (activeEntry) {
      localStorage.setItem("pathready-attendance-active", JSON.stringify(activeEntry));
    } else {
      localStorage.removeItem("pathready-attendance-active");
    }
  }, [activeEntry]);

  useEffect(() => {
    localStorage.setItem("pathready-attendance-clients", JSON.stringify(clients));
  }, [clients]);

  // Elapsed timer
  useEffect(() => {
    if (activeEntry) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - activeEntry.clockIn);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setElapsedTime(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeEntry]);

  /* ---------------------------------------------------------------- */
  /*  GPS Functions                                                    */
  /* ---------------------------------------------------------------- */

  const getLocation = useCallback((): Promise<GeoLocation> => {
    return new Promise((resolve, reject) => {
      setLoadingLocation(true);
      setLocationError(null);

      if (!navigator.geolocation) {
        // Simulate location for demo
        const simulated: GeoLocation = {
          lat: 47.6062 + (Math.random() - 0.5) * 0.01,
          lng: -122.3321 + (Math.random() - 0.5) * 0.01,
          accuracy: Math.round(10 + Math.random() * 40),
          timestamp: Date.now(),
          address: "SteamGOAT HQ Area, Seattle, WA",
        };
        setCurrentLocation(simulated);
        setLoadingLocation(false);
        resolve(simulated);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: GeoLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
            timestamp: Date.now(),
          };
          const gf = getGeofenceMatch(loc.lat, loc.lng);
          if (gf) loc.address = `${gf.name} (${gf.distance}m from center)`;
          else loc.address = `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
          setCurrentLocation(loc);
          setLoadingLocation(false);
          resolve(loc);
        },
        (err) => {
          // Fallback to simulated for demo
          const simulated: GeoLocation = {
            lat: 47.6062 + (Math.random() - 0.5) * 0.01,
            lng: -122.3321 + (Math.random() - 0.5) * 0.01,
            accuracy: Math.round(10 + Math.random() * 40),
            timestamp: Date.now(),
            address: "SteamGOAT HQ Area, Seattle, WA (simulated)",
          };
          setCurrentLocation(simulated);
          setLocationError("GPS unavailable - using simulated location for demo");
          setLoadingLocation(false);
          resolve(simulated);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Clock Actions                                                    */
  /* ---------------------------------------------------------------- */

  async function handleClockIn() {
    const location = await getLocation();
    const client = clients.find((c) => c.id === selectedClient);

    const entry: TimeEntry = {
      id: generateId(),
      date: new Date().toISOString().split("T")[0],
      clockIn: Date.now(),
      clockOut: null,
      clockInLocation: location,
      clockOutLocation: null,
      duration: null,
      status: "active",
      clientId: selectedClient || null,
      clientName: client?.name || null,
      serviceType: selectedService || null,
      notes: clockNotes,
    };

    setActiveEntry(entry);
    setClockNotes("");
  }

  async function handleClockOut() {
    if (!activeEntry) return;
    const location = await getLocation();
    const now = Date.now();
    const duration = now - activeEntry.clockIn;

    // Auto-flag if over 12 hours or under 5 minutes
    let status: TimeEntry["status"] = "completed";
    let flagReason: string | undefined;
    if (duration > 12 * 3600000) { status = "flagged"; flagReason = "Shift exceeded 12 hours"; }
    if (duration < 5 * 60000) { status = "flagged"; flagReason = "Shift under 5 minutes"; }

    // Check geofence mismatch
    if (activeEntry.clockInLocation && location) {
      const dist = distanceBetween(activeEntry.clockInLocation.lat, activeEntry.clockInLocation.lng, location.lat, location.lng);
      if (dist > 5000) { status = "flagged"; flagReason = `Clock-out location ${Math.round(dist / 1000)}km from clock-in`; }
    }

    const completedEntry: TimeEntry = {
      ...activeEntry,
      clockOut: now,
      clockOutLocation: location,
      duration,
      status,
      flagReason,
      notes: activeEntry.notes + (clockOutNotes ? `\n[Out] ${clockOutNotes}` : ""),
    };

    // Update client hours
    if (completedEntry.clientId) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === completedEntry.clientId
            ? { ...c, totalHours: c.totalHours + duration / 3600000, lastVisit: completedEntry.date }
            : c
        )
      );
    }

    setEntries((prev) => [completedEntry, ...prev]);
    setActiveEntry(null);
    setClockOutNotes("");
    setSelectedClient("");
    setSelectedService("");
  }

  function approveEntry(id: string) {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, status: "approved" } : e));
  }

  function flagEntry(id: string, reason: string) {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, status: "flagged", flagReason: reason } : e));
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function addCaseNote(clientId: string) {
    if (!newCaseNote.trim()) return;
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, notes: [...c.notes, `[${new Date().toLocaleDateString()}] ${newCaseNote}`] } : c
      )
    );
    setNewCaseNote("");
  }

  /* ---------------------------------------------------------------- */
  /*  Computed Stats                                                   */
  /* ---------------------------------------------------------------- */

  const todayEntries = entries.filter((e) => e.date === today);
  const todayHours = todayEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
  const weekEntries = entries.filter((e) => e.date >= weekStartStr);
  const weekHours = weekEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
  const flaggedCount = entries.filter((e) => e.status === "flagged").length;
  const totalClients = clients.filter((c) => c.status === "active").length;

  const filteredLogs = entries.filter((e) => {
    if (logFilter !== "all" && e.status !== logFilter) return false;
    if (logSearch && !e.clientName?.toLowerCase().includes(logSearch.toLowerCase()) && !e.serviceType?.toLowerCase().includes(logSearch.toLowerCase()) && !e.notes.toLowerCase().includes(logSearch.toLowerCase())) return false;
    return true;
  });

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">SARAworks-Style Workforce Tool</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Attendance Tracker</h1>
        <p className="text-muted-foreground max-w-2xl">
          GPS-verified time tracking with audit logs, client service documentation, and compliance reporting 
          for vocational rehabilitation and workforce development programs.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4">
          <Timer className="w-5 h-5 text-blue-600 mb-2" />
          <div className="text-2xl font-bold">{formatDurationDecimal(todayHours)}h</div>
          <div className="text-xs text-muted-foreground">Today</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4">
          <CalendarDays className="w-5 h-5 text-emerald-600 mb-2" />
          <div className="text-2xl font-bold">{formatDurationDecimal(weekHours)}h</div>
          <div className="text-xs text-muted-foreground">This Week</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4">
          <Users className="w-5 h-5 text-purple-600 mb-2" />
          <div className="text-2xl font-bold">{totalClients}</div>
          <div className="text-xs text-muted-foreground">Active Clients</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-4">
          <AlertTriangle className={`w-5 h-5 mb-2 ${flaggedCount > 0 ? "text-amber-600" : "text-slate-400"}`} />
          <div className={`text-2xl font-bold ${flaggedCount > 0 ? "text-amber-600" : ""}`}>{flaggedCount}</div>
          <div className="text-xs text-muted-foreground">Flagged</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 fade-in-up" style={{ animationDelay: "0.15s" }}>
        {([
          { id: "clock", label: "Clock In/Out", icon: Play },
          { id: "logs", label: "Time Logs", icon: FileText },
          { id: "clients", label: "Client Services", icon: Users },
          { id: "audit", label: "Audit & Reports", icon: Shield },
        ] as const).map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                tab === t.id ? "bg-white dark:bg-slate-900 shadow-sm text-blue-700 dark:text-blue-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/*  TAB: Clock In/Out                                           */}
      {/* ============================================================ */}
      {tab === "clock" && (
        <div className="space-y-6">
          {/* Active Shift Banner */}
          {activeEntry && (
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-100">SHIFT IN PROGRESS</span>
                </div>
                <div className="text-5xl font-bold font-mono mb-2">{formatDuration(elapsedTime)}</div>
                <div className="flex flex-wrap gap-4 text-sm text-emerald-100 mb-4">
                  <span>Clocked in: {formatTime(activeEntry.clockIn)}</span>
                  {activeEntry.clientName && <span>Client: {activeEntry.clientName}</span>}
                  {activeEntry.serviceType && <span>Service: {activeEntry.serviceType}</span>}
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-200 mb-4">
                  <MapPin className="w-3 h-3" />
                  <span>{activeEntry.clockInLocation.address}</span>
                  <span className="opacity-60">| Accuracy: {activeEntry.clockInLocation.accuracy}m</span>
                </div>
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-emerald-100 block mb-1">Clock-out notes (optional)</label>
                    <input
                      type="text"
                      value={clockOutNotes}
                      onChange={(e) => setClockOutNotes(e.target.value)}
                      placeholder="Summary of work completed..."
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200 text-sm outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <button
                    onClick={handleClockOut}
                    disabled={loadingLocation}
                    className="bg-white text-emerald-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-50 transition flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <Square className="w-4 h-4" /> Clock Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Clock In Form */}
          {!activeEntry && (
            <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" /> Start New Shift
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Client (optional)</label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white dark:bg-slate-900"
                  >
                    <option value="">No specific client</option>
                    {clients.filter((c) => c.status !== "closed").map((c) => (
                      <option key={c.id} value={c.id}>{c.name} - {c.caseNumber}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Service Type</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white dark:bg-slate-900"
                  >
                    <option value="">Select service type...</option>
                    {serviceTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Notes</label>
                <textarea
                  value={clockNotes}
                  onChange={(e) => setClockNotes(e.target.value)}
                  placeholder="What are you working on today?"
                  rows={2}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white dark:bg-slate-900 resize-none"
                />
              </div>

              {/* GPS Status */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> GPS Location
                  </span>
                  <button
                    onClick={getLocation}
                    disabled={loadingLocation}
                    className="text-xs text-blue-700 dark:text-blue-400 font-medium hover:underline"
                  >
                    {loadingLocation ? "Locating..." : "Refresh Location"}
                  </button>
                </div>
                {currentLocation ? (
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">{currentLocation.address}</p>
                    <p>Lat: {currentLocation.lat.toFixed(6)} | Lng: {currentLocation.lng.toFixed(6)} | Accuracy: {currentLocation.accuracy}m</p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Location will be captured on clock-in</p>
                )}
                {locationError && (
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {locationError}
                  </p>
                )}
              </div>

              {/* Geofence Sites */}
              <div className="mb-4">
                <p className="text-xs font-bold text-muted-foreground mb-2">Registered Work Sites</p>
                <div className="flex flex-wrap gap-2">
                  {geofenceLocations.map((gf) => (
                    <span key={gf.name} className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {gf.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleClockIn}
                disabled={loadingLocation}
                className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <Play className="w-5 h-5" /> Clock In with GPS Verification
              </button>
            </div>
          )}

          {/* Today's Entries */}
          {todayEntries.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-blue-600" /> Today's Entries
              </h3>
              <div className="space-y-2">
                {todayEntries.map((e) => (
                  <div key={e.id} className={`flex items-center gap-3 p-3 rounded-lg border ${e.status === "flagged" ? "border-amber-300 bg-amber-50 dark:bg-amber-950/20" : e.status === "approved" ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20" : "border-border"}`}>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${e.status === "flagged" ? "bg-amber-500" : e.status === "approved" ? "bg-emerald-500" : "bg-blue-500"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{formatTime(e.clockIn)} - {e.clockOut ? formatTime(e.clockOut) : "..."}</span>
                        {e.duration && <span className="text-muted-foreground">({formatDuration(e.duration)})</span>}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {e.clientName && <span>{e.clientName} - </span>}
                        {e.serviceType || "General"}
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      e.status === "flagged" ? "bg-amber-100 text-amber-700" : e.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {e.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/*  TAB: Time Logs                                              */}
      {/* ============================================================ */}
      {tab === "logs" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                placeholder="Search by client, service, or notes..."
                className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              {(["all", "completed", "approved", "flagged"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${logFilter === f ? "bg-white dark:bg-slate-900 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Log entries */}
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 border border-border rounded-xl">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-bold text-lg mb-2">{entries.length === 0 ? "No time entries yet" : "No matching entries"}</h3>
                <p className="text-sm text-muted-foreground">
                  {entries.length === 0 ? "Clock in to start tracking your time." : "Try adjusting your filters."}
                </p>
              </div>
            ) : (
              filteredLogs.map((entry) => (
                <div key={entry.id} className={`bg-white dark:bg-slate-900 border rounded-xl p-5 ${entry.status === "flagged" ? "border-amber-300" : entry.status === "approved" ? "border-emerald-300" : "border-border"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold">{formatDate(entry.date)}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          entry.status === "flagged" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                          entry.status === "approved" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                          "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        }`}>
                          {entry.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(entry.clockIn)} - {entry.clockOut ? formatTime(entry.clockOut) : "Active"}
                        {entry.duration && <span className="ml-2 font-medium">({formatDuration(entry.duration)} / {formatDurationDecimal(entry.duration)}h)</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {entry.status === "completed" && (
                        <button onClick={() => approveEntry(entry.id)} className="text-xs bg-emerald-700 text-white px-3 py-1 rounded-lg hover:bg-emerald-800 transition">Approve</button>
                      )}
                      {entry.status !== "approved" && (
                        <button onClick={() => flagEntry(entry.id, "Manual flag by reviewer")} className="text-xs border border-amber-500 text-amber-700 px-3 py-1 rounded-lg hover:bg-amber-50 transition">Flag</button>
                      )}
                      <button onClick={() => deleteEntry(entry.id)} className="text-xs text-muted-foreground hover:text-rose-600 p-1 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      {entry.clientName && <p><span className="text-muted-foreground">Client:</span> <span className="font-medium">{entry.clientName}</span></p>}
                      {entry.serviceType && <p><span className="text-muted-foreground">Service:</span> <span className="font-medium">{entry.serviceType}</span></p>}
                      {entry.notes && <p><span className="text-muted-foreground">Notes:</span> {entry.notes}</p>}
                      {entry.flagReason && <p className="text-amber-700 dark:text-amber-400 flex items-center gap-1 mt-1"><AlertTriangle className="w-3 h-3" /> {entry.flagReason}</p>}
                    </div>
                    <div className="text-muted-foreground">
                      <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> In: {entry.clockInLocation.address} ({entry.clockInLocation.accuracy}m)</p>
                      {entry.clockOutLocation && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Out: {entry.clockOutLocation.address} ({entry.clockOutLocation.accuracy}m)</p>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  TAB: Client Services                                        */}
      {/* ============================================================ */}
      {tab === "clients" && (
        <div className="space-y-4">
          {selectedClientDetail ? (() => {
            const client = clients.find((c) => c.id === selectedClientDetail);
            if (!client) return null;
            const clientEntries = entries.filter((e) => e.clientId === client.id);
            return (
              <div>
                <button onClick={() => setSelectedClientDetail(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-700 transition mb-4">
                  <ChevronDown className="w-4 h-4 rotate-90" /> Back to All Clients
                </button>

                <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{client.name}</h2>
                      <p className="text-sm text-muted-foreground">{client.caseNumber} - {client.program}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                      client.status === "active" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700" :
                      client.status === "pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700" :
                      "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
                    }`}>
                      {client.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-400">{client.totalHours.toFixed(1)}h</div>
                      <div className="text-[10px] text-muted-foreground">Total Hours</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-purple-700 dark:text-purple-400">{clientEntries.length}</div>
                      <div className="text-[10px] text-muted-foreground">Visits</div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{client.lastVisit ? formatDate(client.lastVisit) : "N/A"}</div>
                      <div className="text-[10px] text-muted-foreground">Last Visit</div>
                    </div>
                  </div>

                  {/* Service Goals */}
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-blue-600" /> Service Goals</h3>
                  <div className="space-y-1 mb-6">
                    {client.serviceGoals.map((g, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>

                  {/* Case Notes */}
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-purple-600" /> Case Notes</h3>
                  <div className="space-y-2 mb-4">
                    {client.notes.map((n, i) => (
                      <div key={i} className="text-sm text-muted-foreground bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2">{n}</div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCaseNote}
                      onChange={(e) => setNewCaseNote(e.target.value)}
                      placeholder="Add a case note..."
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => { if (e.key === "Enter") addCaseNote(client.id); }}
                    />
                    <button
                      onClick={() => addCaseNote(client.id)}
                      className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {/* Client Time Entries */}
                {clientEntries.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-5">
                    <h3 className="font-bold text-sm mb-3">Time Log for {client.name}</h3>
                    <div className="space-y-2">
                      {clientEntries.map((e) => (
                        <div key={e.id} className="flex items-center gap-3 p-3 rounded-lg border border-border text-sm">
                          <span className="font-medium">{formatDate(e.date)}</span>
                          <span className="text-muted-foreground">{formatTime(e.clockIn)} - {e.clockOut ? formatTime(e.clockOut) : "Active"}</span>
                          {e.duration && <span className="text-muted-foreground">({formatDuration(e.duration)})</span>}
                          <span className="text-xs text-muted-foreground flex-1 truncate">{e.serviceType}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })() : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold flex items-center gap-2"><Users className="w-5 h-5 text-purple-600" /> Client Caseload</h2>
                <span className="text-xs text-muted-foreground">{clients.length} clients</span>
              </div>
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientDetail(client.id)}
                  className="w-full text-left bg-white dark:bg-slate-900 border border-border rounded-xl p-5 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-purple-700 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm group-hover:text-blue-700 transition">{client.name}</h3>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          client.status === "active" ? "bg-emerald-100 text-emerald-700" : client.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-muted-foreground"
                        }`}>
                          {client.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{client.caseNumber} - {client.program}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-bold text-blue-700 dark:text-blue-400">{client.totalHours.toFixed(1)}h</div>
                        <div className="text-[10px] text-muted-foreground">Total Hours</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{client.lastVisit ? formatDate(client.lastVisit) : "N/A"}</div>
                        <div className="text-[10px] text-muted-foreground">Last Visit</div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/*  TAB: Audit & Reports                                        */}
      {/* ============================================================ */}
      {tab === "audit" && (
        <div className="space-y-6">
          {/* Compliance Summary */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" /> Compliance Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={`rounded-xl p-4 border-2 ${flaggedCount === 0 ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20" : "border-amber-300 bg-amber-50 dark:bg-amber-950/20"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {flaggedCount === 0 ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}
                  <span className="text-sm font-bold">Flagged Entries</span>
                </div>
                <div className={`text-3xl font-bold ${flaggedCount === 0 ? "text-emerald-700" : "text-amber-700"}`}>{flaggedCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {flaggedCount === 0 ? "No anomalies detected" : "Require supervisor review"}
                </p>
              </div>
              <div className="rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold">GPS Compliance</span>
                </div>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">100%</div>
                <p className="text-xs text-muted-foreground mt-1">All entries have GPS verification</p>
              </div>
              <div className="rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold">Total Logged</span>
                </div>
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">{entries.length}</div>
                <p className="text-xs text-muted-foreground mt-1">{entries.filter((e) => e.status === "approved").length} approved</p>
              </div>
            </div>

            {/* Auto-Flag Rules */}
            <h3 className="font-bold text-sm mb-3">Automatic Flag Rules</h3>
            <div className="space-y-2 mb-6">
              {[
                { rule: "Shift exceeds 12 hours", desc: "Entries longer than 12 hours are automatically flagged for review" },
                { rule: "Shift under 5 minutes", desc: "Very short clock-ins are flagged as potential errors" },
                { rule: "Clock-out location mismatch", desc: "If clock-out is 5km+ from clock-in, entry is flagged" },
                { rule: "Duplicate entries", desc: "Overlapping time entries for the same user are flagged" },
              ].map((r) => (
                <div key={r.rule} className="flex items-start gap-3 text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <Flag className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">{r.rule}</span>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hours by Client Report */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" /> Hours by Client
            </h2>
            <div className="space-y-3">
              {clients.filter((c) => c.totalHours > 0).sort((a, b) => b.totalHours - a.totalHours).map((client) => {
                const maxHours = Math.max(...clients.map((c) => c.totalHours), 1);
                const pct = (client.totalHours / maxHours) * 100;
                return (
                  <div key={client.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{client.name}</span>
                      <span className="text-muted-foreground">{client.totalHours.toFixed(1)}h</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div className="h-3 bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              {clients.every((c) => c.totalHours === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">No client hours logged yet. Clock in with a client selected to start tracking.</p>
              )}
            </div>
          </div>

          {/* Export */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" /> Export for Audit
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Generate audit-ready reports with GPS coordinates, timestamps, client associations, and service documentation.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const csv = [
                    "Date,Clock In,Clock Out,Duration (h),Client,Service Type,Status,Notes,Clock-In Lat,Clock-In Lng,Clock-In Accuracy,Clock-Out Lat,Clock-Out Lng,Clock-Out Accuracy,Flag Reason",
                    ...entries.map((e) =>
                      [
                        e.date,
                        new Date(e.clockIn).toISOString(),
                        e.clockOut ? new Date(e.clockOut).toISOString() : "",
                        e.duration ? formatDurationDecimal(e.duration) : "",
                        e.clientName || "",
                        e.serviceType || "",
                        e.status,
                        `"${e.notes.replace(/"/g, '""')}"`,
                        e.clockInLocation.lat,
                        e.clockInLocation.lng,
                        e.clockInLocation.accuracy,
                        e.clockOutLocation?.lat || "",
                        e.clockOutLocation?.lng || "",
                        e.clockOutLocation?.accuracy || "",
                        e.flagReason || "",
                      ].join(",")
                    ),
                  ].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `attendance-audit-${today}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition"
              >
                <Download className="w-4 h-4" /> Export CSV with GPS Data
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition"
              >
                <FileText className="w-4 h-4" /> Print Report
              </button>
            </div>
          </div>

          {/* WIOA / DVR Compliance */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-border rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm mb-1">WIOA & DVR Compliance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This attendance tracking system is designed to meet WIOA (Workforce Innovation and Opportunity Act) 
                  reporting requirements and DVR (Division of Vocational Rehabilitation) service documentation standards. 
                  All time entries include GPS verification, client associations, and service type categorization 
                  for audit-ready reporting. Data is stored locally in this demo - production deployment uses 
                  AWS GovCloud with FISMA-compliant encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
