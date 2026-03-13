import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Clock, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import RideCard from "@/components/RideCard";
import RouteMap from "@/components/RouteMap";
import { mockRideOffers, calculateMatchScore, CHENNAI_LOCATIONS, type RideMatch } from "@/data/mockData";

const locationOptions = Object.entries(CHENNAI_LOCATIONS).map(([, loc]) => loc);

const SearchRide = () => {
  const [pickup, setPickup] = useState("Anna Nagar");
  const [destination, setDestination] = useState("T. Nagar");
  const [time, setTime] = useState("08:30");
  const [searched, setSearched] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const matches = useMemo(() => {
    if (!searched) return [];

    const startLoc = locationOptions.find((l) => l.name === pickup);
    const endLoc = locationOptions.find((l) => l.name === destination);
    if (!startLoc || !endLoc) return [];

    const results: RideMatch[] = [];
    for (const ride of mockRideOffers.filter((r) => r.status === "active")) {
      const match = calculateMatchScore(startLoc, endLoc, time, ride);
      if (match) results.push(match);
    }
    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
  }, [searched, pickup, destination, time]);

  const startLoc = locationOptions.find((l) => l.name === pickup);
  const endLoc = locationOptions.find((l) => l.name === destination);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto px-6 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-2xl font-bold mb-6 text-foreground">Find a Ride</h1>

        {/* Search Form */}
        <div className="card-ride space-y-3 mb-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Pickup Area</label>
            <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="input-field">
              {locationOptions.map((l) => (
                <option key={l.name} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Destination</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="input-field">
              {locationOptions.map((l) => (
                <option key={l.name} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Preferred Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input-field pl-10" />
            </div>
          </div>
          <button
            onClick={() => setSearched(true)}
            className="btn-accent w-full flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Search Rides
          </button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {searched && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {matches.length} ride{matches.length !== 1 ? "s" : ""} found
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                      showMap ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {showMap ? "List" : "Map"}
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground">
                    <SlidersHorizontal className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {showMap && startLoc && endLoc && (
                <div className="mb-4">
                  <RouteMap
                    height="250px"
                    routes={matches.map((m) => ({
                      start: m.ride.startLocation,
                      end: m.ride.endLocation,
                      waypoints: m.ride.waypoints,
                    }))}
                    markers={[
                      { ...startLoc, label: "Pickup", color: "#00D4AA" },
                      { ...endLoc, label: "Drop-off", color: "#EF4444" },
                    ]}
                  />
                </div>
              )}

              <div className="space-y-3">
                {matches.map((match) => (
                  <RideCard
                    key={match.ride.id}
                    match={match}
                    onBook={() => navigate(`/ride/${match.ride.id}`)}
                  />
                ))}
                {matches.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No matching rides found. Try adjusting your time or route.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Navbar />
    </div>
  );
};

export default SearchRide;
