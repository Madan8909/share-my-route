import { Star, Shield, Clock, MapPin } from "lucide-react";
import type { RideMatch } from "@/data/mockData";

interface RideCardProps {
  match: RideMatch;
  onBook?: () => void;
}

const RideCard = ({ match, onBook }: RideCardProps) => {
  const { ride, matchScore, routeOverlap } = match;

  return (
    <div className="card-ride">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={ride.driver.avatar}
            alt={ride.driver.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold font-heading text-foreground">{ride.driver.name}</span>
              {ride.driver.verified && (
                <Shield className="w-4 h-4 text-accent" />
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-sm text-muted-foreground">
                {ride.driver.rating} · {ride.driver.totalRides} rides
              </span>
            </div>
          </div>
        </div>
        <span className="badge-match text-sm">{matchScore}%</span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-foreground">{ride.startLocation.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-foreground">{ride.endLocation.name}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {ride.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {routeOverlap}% overlap
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-foreground">₹{ride.pricePerSeat}</span>
          <span className="text-xs text-muted-foreground">{ride.seatsAvailable} seats</span>
        </div>
      </div>

      {onBook && (
        <button onClick={onBook} className="btn-accent w-full mt-3 text-sm">
          Book Ride
        </button>
      )}
    </div>
  );
};

export default RideCard;
