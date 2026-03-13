import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Shield, Clock, MapPin, Send, CheckCircle, X, Banknote } from "lucide-react";
import Navbar from "@/components/Navbar";
import RouteMap from "@/components/RouteMap";
import { mockRideOffers, mockUsers, mockChatMessages, type ChatMessage } from "@/data/mockData";

const RideDetails = () => {
  const { id } = useParams();
  const ride = mockRideOffers.find((r) => r.id === id) || mockRideOffers[0];
  const [booked, setBooked] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMsg, setNewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const currentUser = mockUsers[2]; // Simulate as Rahul

  const fuelCost = Math.round(ride.pricePerSeat * 0.85);
  const platformFee = Math.round(ride.pricePerSeat * 0.05 * 100) / 100;
  const passengerShare = ride.pricePerSeat;

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, { id: `c${messages.length + 1}`, senderId: currentUser.id, text: newMsg, timestamp: new Date().toISOString() }]);
    setNewMsg("");
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto px-6 pt-6">
        <Link to="/search" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>

        {/* Map */}
        <RouteMap
          height="220px"
          routes={[{ start: ride.startLocation, end: ride.endLocation, waypoints: ride.waypoints }]}
          markers={[
            { ...ride.startLocation, label: ride.startLocation.name, color: "#00D4AA" },
            { ...ride.endLocation, label: ride.endLocation.name, color: "#EF4444" },
          ]}
        />

        {/* Driver Info */}
        <div className="card-ride mt-4">
          <div className="flex items-center gap-3">
            <img src={ride.driver.avatar} alt={ride.driver.name} className="w-14 h-14 rounded-full ring-2 ring-border" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-foreground">{ride.driver.name}</span>
                {ride.driver.verified && <Shield className="w-4 h-4 text-accent" />}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-sm text-muted-foreground">{ride.driver.rating} · {ride.driver.totalRides} rides</span>
              </div>
            </div>
            {ride.driver.vehicleInfo && (
              <div className="text-right text-xs text-muted-foreground">
                <p className="font-medium text-foreground">{ride.driver.vehicleInfo.make} {ride.driver.vehicleInfo.model}</p>
                <p>{ride.driver.vehicleInfo.color} · {ride.driver.vehicleInfo.plate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Route & Time */}
        <div className="card-ride mt-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <div className="w-0.5 h-8 bg-border" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="font-medium text-foreground">{ride.startLocation.name}</p>
                <p className="text-xs text-muted-foreground">Pickup point</p>
              </div>
              <div>
                <p className="font-medium text-foreground">{ride.endLocation.name}</p>
                <p className="text-xs text-muted-foreground">Drop-off</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2 border-t border-border text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {ride.time}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ride.date}</span>
            <span>{ride.seatsAvailable} seat{ride.seatsAvailable !== 1 ? "s" : ""} left</span>
          </div>
        </div>

        {/* Cost Split */}
        <div className="card-ride mt-3">
          <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <Banknote className="w-5 h-5 text-accent" /> Cost Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Fuel cost estimate</span><span className="text-foreground">₹{fuelCost}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Platform fee (5%)</span><span className="text-foreground">₹{platformFee}</span></div>
            <div className="flex justify-between pt-2 border-t border-border font-semibold">
              <span className="text-foreground">Your share</span><span className="text-accent font-heading text-lg">₹{passengerShare}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {["UPI", "Wallet", "Cash"].map((m) => (
              <button key={m} className="flex-1 py-2 rounded-lg bg-muted text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        {!booked ? (
          <motion.button
            onClick={() => setBooked(true)}
            className="btn-accent w-full mt-4"
            whileTap={{ scale: 0.98 }}
          >
            Request Ride · ₹{passengerShare}
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
            <div className="card-ride bg-accent/10 border-accent/30 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-accent" />
              <div>
                <p className="font-semibold text-foreground">Ride Requested!</p>
                <p className="text-xs text-muted-foreground">Waiting for {ride.driver.name} to accept...</p>
              </div>
            </div>

            <button onClick={() => setChatOpen(!chatOpen)} className="btn-accent w-full text-sm">
              {chatOpen ? "Hide Chat" : "Chat with Driver"}
            </button>

            {chatOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="card-ride">
                <div className="space-y-3 max-h-60 overflow-y-auto mb-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        msg.senderId === currentUser.id
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-foreground"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="input-field flex-1 py-2 text-sm"
                  />
                  <button onClick={sendMessage} className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Send className="w-4 h-4 text-accent-foreground" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Rate driver (post-ride) */}
            <div className="card-ride">
              <p className="text-sm font-medium text-foreground mb-2">Rate your ride</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)}>
                    <Star className={`w-7 h-7 ${s <= rating ? "text-amber-500 fill-amber-500" : "text-border"}`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default RideDetails;
