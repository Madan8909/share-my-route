import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Users, DollarSign, Repeat, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import RouteMap from "@/components/RouteMap";
import { CHENNAI_LOCATIONS } from "@/data/mockData";

const locationOptions = Object.entries(CHENNAI_LOCATIONS).map(([, loc]) => loc);
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const OfferRide = () => {
  const [step, setStep] = useState(0);
  const [startLoc, setStartLoc] = useState("Anna Nagar");
  const [endLoc, setEndLoc] = useState("T. Nagar");
  const [date, setDate] = useState("2026-03-14");
  const [time, setTime] = useState("08:30");
  const [seats, setSeats] = useState(3);
  const [price, setPrice] = useState(45);
  const [recurring, setRecurring] = useState(false);
  const [recurDays, setRecurDays] = useState<string[]>([]);
  const [detour, setDetour] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const start = locationOptions.find((l) => l.name === startLoc)!;
  const end = locationOptions.find((l) => l.name === endLoc)!;

  const toggleDay = (d: string) =>
    setRecurDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  if (submitted) {
    return (
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Ride Published!</h2>
          <p className="text-muted-foreground mb-8">Your ride from {startLoc} to {endLoc} is now live.</p>
          <button onClick={() => navigate("/dashboard")} className="btn-accent">Go to Dashboard</button>
        </motion.div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto px-6 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-2xl font-bold mb-2 text-foreground">Offer a Ride</h1>
        <p className="text-sm text-muted-foreground mb-6">Step {step + 1} of 3</p>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${i <= step ? "bg-accent" : "bg-border"}`} />
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-accent" /> Route
              </h2>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Start Location</label>
                <select value={startLoc} onChange={(e) => setStartLoc(e.target.value)} className="input-field">
                  {locationOptions.map((l) => <option key={l.name} value={l.name}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Destination</label>
                <select value={endLoc} onChange={(e) => setEndLoc(e.target.value)} className="input-field">
                  {locationOptions.map((l) => <option key={l.name} value={l.name}>{l.name}</option>)}
                </select>
              </div>

              {start && end && (
                <RouteMap
                  height="200px"
                  routes={[{ start, end }]}
                  markers={[
                    { ...start, label: "Start", color: "#00D4AA" },
                    { ...end, label: "End", color: "#EF4444" },
                  ]}
                />
              )}

              <button onClick={() => setStep(1)} className="btn-accent w-full">Continue</button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-accent" /> Schedule
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input-field pl-10" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between card-ride">
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">Recurring ride</span>
                </div>
                <button
                  onClick={() => setRecurring(!recurring)}
                  className={`w-12 h-6 rounded-full transition-colors ${recurring ? "bg-accent" : "bg-border"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${recurring ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>

              {recurring && (
                <div className="flex gap-2 flex-wrap">
                  {weekDays.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        recurDays.includes(d) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(0)} className="flex-1 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-all">Back</button>
                <button onClick={() => setStep(2)} className="flex-1 btn-accent">Continue</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-accent" /> Details
              </h2>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Seats Available</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setSeats(Math.max(1, seats - 1))} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-foreground">−</button>
                  <span className="font-heading text-2xl font-bold text-foreground">{seats}</span>
                  <button onClick={() => setSeats(Math.min(6, seats + 1))} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-foreground">+</button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Price per Seat (₹)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input-field pl-10" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Detour Tolerance: {detour} km</label>
                <input
                  type="range" min={0} max={5} value={detour}
                  onChange={(e) => setDetour(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>No detour</span><span>5 km</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(1)} className="flex-1 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-all">Back</button>
                <button onClick={() => setSubmitted(true)} className="flex-1 btn-accent">Publish Ride</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <Navbar />
    </div>
  );
};

export default OfferRide;
