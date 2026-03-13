import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Leaf, Users, ArrowRight, MapPin, Shield, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

const stats = [
  { label: "Rides Matched", value: "12,847", icon: Car },
  { label: "CO₂ Saved", value: "8.2 tons", icon: Leaf },
  { label: "Commuters", value: "4,312", icon: Users },
];

const features = [
  { title: "Smart Matching", desc: "Algorithm matches rides by 60%+ route overlap and ±15 min time windows.", icon: MapPin },
  { title: "Verified Drivers", desc: "Government ID checks, vehicle verification, and trust scores you can rely on.", icon: Shield },
  { title: "Fair Cost Split", desc: "Transparent fare splitting based on distance with only 5% platform fee.", icon: Star },
];

const Index = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-lg mx-auto px-6 pt-16 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-eco text-xs mb-4 inline-block">🌱 Eco-friendly commuting</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              Your commute,
              <br />
              <span className="text-accent">shared smarter</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-md font-body">
              Match with commuters on your route. Save money, cut emissions,
              and make your daily drive count.
            </p>
            <div className="flex gap-3">
              <Link to="/search" className="btn-accent flex items-center gap-2">
                Find a Ride <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/offer"
                className="px-6 py-3 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all"
              >
                Offer a Ride
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-lg mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="font-heading font-bold text-lg text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-lg mx-auto px-6 mt-12">
        <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">How it works</h2>
        <div className="space-y-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card-ride flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-lg mx-auto px-6 mt-12 mb-8">
        <div className="hero-section rounded-2xl p-8 text-center">
          <h2 className="font-heading text-2xl font-bold mb-3">Ready to ride together?</h2>
          <p className="text-primary-foreground/70 mb-6 text-sm">
            Join thousands of commuters saving money and the planet.
          </p>
          <Link to="/register" className="btn-accent inline-flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Navbar />
    </div>
  );
};

export default Index;
