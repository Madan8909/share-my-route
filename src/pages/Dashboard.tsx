import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Car, TrendingUp, Star, Clock, MapPin, Check, X, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockUsers, mockRideOffers, preMatchedBookings } from "@/data/mockData";

const currentUser = mockUsers[0]; // Arjun (driver)

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "requests">("upcoming");
  const [bookingStatuses, setBookingStatuses] = useState<Record<string, string>>({});

  const upcomingRides = mockRideOffers.filter((r) => r.status === "active" && r.driver.id === currentUser.id);
  const pastRides = mockRideOffers.filter((r) => r.status === "completed");
  const pendingRequests = preMatchedBookings.filter((b) => b.status === "pending");

  const handleRequest = (bookingId: string, action: "accepted" | "rejected") => {
    setBookingStatuses((prev) => ({ ...prev, [bookingId]: action }));
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto px-6 pt-6">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-6">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-14 h-14 rounded-full ring-2 ring-accent" />
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">{currentUser.name}</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {currentUser.rating} · {currentUser.totalRides} rides
            </div>
          </div>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div className="stat-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Leaf className="w-6 h-6 text-success mx-auto mb-1" />
            <p className="font-heading text-xl font-bold text-foreground">{currentUser.co2Saved} kg</p>
            <p className="text-[10px] text-muted-foreground">CO₂ Saved</p>
          </motion.div>
          <motion.div className="stat-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-1" />
            <p className="font-heading text-xl font-bold text-foreground">₹3,240</p>
            <p className="text-[10px] text-muted-foreground">Earnings</p>
          </motion.div>
          <motion.div className="stat-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Car className="w-6 h-6 text-accent mx-auto mb-1" />
            <p className="font-heading text-xl font-bold text-foreground">{currentUser.totalRides}</p>
            <p className="text-[10px] text-muted-foreground">Total Rides</p>
          </motion.div>
        </div>

        {/* Eco badge */}
        <div className="card-ride bg-success/10 border-success/20 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">🌍 Great job, {currentUser.name.split(" ")[0]}!</p>
            <p className="text-xs text-muted-foreground">You saved {currentUser.co2Saved} kg of CO₂ this month — equivalent to planting {Math.round(currentUser.co2Saved / 22)} trees!</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-4">
          {(["upcoming", "past", "requests"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tab === "requests" ? `Requests (${pendingRequests.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "upcoming" && (
          <div className="space-y-3">
            {upcomingRides.map((ride) => (
              <Link key={ride.id} to={`/ride/${ride.id}`} className="card-ride flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{ride.startLocation.name} → {ride.endLocation.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ride.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ride.date}</span>
                    <span>{ride.seatsAvailable} seats</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
            {upcomingRides.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No upcoming rides</p>}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-3">
            {pastRides.map((ride) => (
              <div key={ride.id} className="card-ride">
                <p className="font-medium text-sm text-foreground">{ride.startLocation.name} → {ride.endLocation.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span>{ride.date}</span>
                  <span>₹{ride.pricePerSeat}</span>
                  <span className="badge-eco text-[10px] py-0.5 px-2">Completed</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-3">
            {pendingRequests.map((booking) => {
              const status = bookingStatuses[booking.id];
              return (
                <div key={booking.id} className="card-ride">
                  <div className="flex items-center gap-3">
                    <img src={booking.passenger.avatar} alt={booking.passenger.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{booking.passenger.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.pickupPoint.name} → {booking.dropoffPoint.name}
                      </p>
                    </div>
                    {!status ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRequest(booking.id, "accepted")}
                          className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <Check className="w-4 h-4 text-accent" />
                        </button>
                        <button
                          onClick={() => handleRequest(booking.id, "rejected")}
                          className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    ) : (
                      <span className={`text-xs font-medium ${status === "accepted" ? "text-accent" : "text-destructive"}`}>
                        {status === "accepted" ? "Accepted" : "Declined"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {pendingRequests.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No pending requests</p>}
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
