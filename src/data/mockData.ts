export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalRides: number;
  phone: string;
  email: string;
  verified: boolean;
  vehicleInfo?: {
    make: string;
    model: string;
    color: string;
    plate: string;
  };
  co2Saved: number;
  joinedDate: string;
}

export interface RideOffer {
  id: string;
  driver: User;
  startLocation: { name: string; lat: number; lng: number };
  endLocation: { name: string; lat: number; lng: number };
  waypoints: { lat: number; lng: number }[];
  date: string;
  time: string;
  seatsAvailable: number;
  pricePerSeat: number;
  recurring: boolean;
  recurringDays?: string[];
  detourTolerance: number;
  status: "active" | "completed" | "cancelled";
}

export interface RideMatch {
  ride: RideOffer;
  matchScore: number;
  routeOverlap: number;
  timeMatch: number;
  pickupPoint: { name: string; lat: number; lng: number };
  dropoffPoint: { name: string; lat: number; lng: number };
  estimatedCost: number;
}

export interface RideBooking {
  id: string;
  ride: RideOffer;
  passenger: User;
  status: "pending" | "accepted" | "rejected" | "completed";
  pickupPoint: { name: string; lat: number; lng: number };
  dropoffPoint: { name: string; lat: number; lng: number };
  cost: number;
  fuelCost: number;
  platformFee: number;
  passengerShare: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

// ====== MOCK USERS ======
export const mockUsers: User[] = [
  { id: "u1", name: "Arjun Krishnan", avatar: "https://i.pravatar.cc/150?img=11", rating: 4.8, totalRides: 142, phone: "+91 98765 43210", email: "arjun@email.com", verified: true, vehicleInfo: { make: "Hyundai", model: "Creta", color: "White", plate: "TN 09 AB 1234" }, co2Saved: 128, joinedDate: "2024-06-15" },
  { id: "u2", name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=5", rating: 4.9, totalRides: 98, phone: "+91 98765 43211", email: "priya@email.com", verified: true, vehicleInfo: { make: "Maruti", model: "Swift", color: "Red", plate: "TN 10 CD 5678" }, co2Saved: 89, joinedDate: "2024-07-20" },
  { id: "u3", name: "Rahul Menon", avatar: "https://i.pravatar.cc/150?img=12", rating: 4.6, totalRides: 67, phone: "+91 98765 43212", email: "rahul@email.com", verified: true, co2Saved: 54, joinedDate: "2024-08-10" },
  { id: "u4", name: "Sneha Iyer", avatar: "https://i.pravatar.cc/150?img=9", rating: 4.7, totalRides: 156, phone: "+91 98765 43213", email: "sneha@email.com", verified: true, vehicleInfo: { make: "Honda", model: "City", color: "Silver", plate: "TN 07 EF 9012" }, co2Saved: 143, joinedDate: "2024-05-01" },
  { id: "u5", name: "Vikram Reddy", avatar: "https://i.pravatar.cc/150?img=13", rating: 4.5, totalRides: 45, phone: "+91 98765 43214", email: "vikram@email.com", verified: false, vehicleInfo: { make: "Tata", model: "Nexon", color: "Blue", plate: "TN 11 GH 3456" }, co2Saved: 38, joinedDate: "2024-09-01" },
  { id: "u6", name: "Deepa Nair", avatar: "https://i.pravatar.cc/150?img=16", rating: 4.9, totalRides: 203, phone: "+91 98765 43215", email: "deepa@email.com", verified: true, vehicleInfo: { make: "Kia", model: "Seltos", color: "Black", plate: "TN 09 IJ 7890" }, co2Saved: 187, joinedDate: "2024-03-15" },
  { id: "u7", name: "Karthik Subramanian", avatar: "https://i.pravatar.cc/150?img=14", rating: 4.3, totalRides: 34, phone: "+91 98765 43216", email: "karthik@email.com", verified: true, co2Saved: 28, joinedDate: "2024-10-01" },
  { id: "u8", name: "Ananya Gupta", avatar: "https://i.pravatar.cc/150?img=20", rating: 4.7, totalRides: 89, phone: "+91 98765 43217", email: "ananya@email.com", verified: true, vehicleInfo: { make: "Toyota", model: "Innova", color: "Grey", plate: "TN 12 KL 1234" }, co2Saved: 76, joinedDate: "2024-07-01" },
  { id: "u9", name: "Suresh Kumar", avatar: "https://i.pravatar.cc/150?img=15", rating: 4.4, totalRides: 52, phone: "+91 98765 43218", email: "suresh@email.com", verified: true, vehicleInfo: { make: "Mahindra", model: "XUV300", color: "Orange", plate: "TN 08 MN 5678" }, co2Saved: 45, joinedDate: "2024-08-15" },
  { id: "u10", name: "Lakshmi Venkatesh", avatar: "https://i.pravatar.cc/150?img=23", rating: 4.8, totalRides: 178, phone: "+91 98765 43219", email: "lakshmi@email.com", verified: true, vehicleInfo: { make: "Hyundai", model: "i20", color: "Green", plate: "TN 10 OP 9012" }, co2Saved: 162, joinedDate: "2024-04-20" },
];

// Chennai coordinates
const CHENNAI_LOCATIONS = {
  annaNagar: { name: "Anna Nagar", lat: 13.0850, lng: 80.2101 },
  tNagar: { name: "T. Nagar", lat: 13.0418, lng: 80.2341 },
  adyar: { name: "Adyar", lat: 13.0063, lng: 80.2574 },
  velachery: { name: "Velachery", lat: 12.9815, lng: 80.2180 },
  sholinganallur: { name: "Sholinganallur", lat: 12.9010, lng: 80.2279 },
  guindy: { name: "Guindy", lat: 13.0067, lng: 80.2206 },
  mylapore: { name: "Mylapore", lat: 13.0368, lng: 80.2676 },
  egmore: { name: "Egmore", lat: 13.0732, lng: 80.2609 },
  porur: { name: "Porur", lat: 13.0382, lng: 80.1565 },
  tambaram: { name: "Tambaram", lat: 12.9249, lng: 80.1000 },
  omr: { name: "OMR (IT Corridor)", lat: 12.9516, lng: 80.2425 },
  chromepet: { name: "Chromepet", lat: 12.9516, lng: 80.1462 },
  nungambakkam: { name: "Nungambakkam", lat: 13.0569, lng: 80.2425 },
  kodambakkam: { name: "Kodambakkam", lat: 13.0520, lng: 80.2245 },
  ashokNagar: { name: "Ashok Nagar", lat: 13.0359, lng: 80.2107 },
};

export const mockRideOffers: RideOffer[] = [
  {
    id: "r1", driver: mockUsers[0],
    startLocation: CHENNAI_LOCATIONS.annaNagar, endLocation: CHENNAI_LOCATIONS.tNagar,
    waypoints: [{ lat: 13.0732, lng: 80.2350 }, { lat: 13.0569, lng: 80.2425 }],
    date: "2026-03-14", time: "08:30", seatsAvailable: 3, pricePerSeat: 45,
    recurring: true, recurringDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    detourTolerance: 2, status: "active",
  },
  {
    id: "r2", driver: mockUsers[1],
    startLocation: CHENNAI_LOCATIONS.annaNagar, endLocation: CHENNAI_LOCATIONS.guindy,
    waypoints: [{ lat: 13.0569, lng: 80.2245 }, { lat: 13.0359, lng: 80.2107 }],
    date: "2026-03-14", time: "08:15", seatsAvailable: 2, pricePerSeat: 55,
    recurring: true, recurringDays: ["Mon", "Wed", "Fri"],
    detourTolerance: 3, status: "active",
  },
  {
    id: "r3", driver: mockUsers[3],
    startLocation: CHENNAI_LOCATIONS.egmore, endLocation: CHENNAI_LOCATIONS.tNagar,
    waypoints: [{ lat: 13.0569, lng: 80.2500 }, { lat: 13.0500, lng: 80.2425 }],
    date: "2026-03-14", time: "08:45", seatsAvailable: 1, pricePerSeat: 35,
    recurring: false, detourTolerance: 1, status: "active",
  },
  {
    id: "r4", driver: mockUsers[5],
    startLocation: CHENNAI_LOCATIONS.porur, endLocation: CHENNAI_LOCATIONS.sholinganallur,
    waypoints: [{ lat: 13.0200, lng: 80.1800 }, { lat: 13.0067, lng: 80.2206 }, { lat: 12.9700, lng: 80.2300 }],
    date: "2026-03-14", time: "07:45", seatsAvailable: 4, pricePerSeat: 75,
    recurring: true, recurringDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    detourTolerance: 3, status: "active",
  },
  {
    id: "r5", driver: mockUsers[7],
    startLocation: CHENNAI_LOCATIONS.adyar, endLocation: CHENNAI_LOCATIONS.omr,
    waypoints: [{ lat: 12.9900, lng: 80.2500 }, { lat: 12.9700, lng: 80.2450 }],
    date: "2026-03-14", time: "09:00", seatsAvailable: 3, pricePerSeat: 40,
    recurring: true, recurringDays: ["Mon", "Tue", "Thu"],
    detourTolerance: 2, status: "active",
  },
  {
    id: "r6", driver: mockUsers[8],
    startLocation: CHENNAI_LOCATIONS.tambaram, endLocation: CHENNAI_LOCATIONS.guindy,
    waypoints: [{ lat: 12.9400, lng: 80.1200 }, { lat: 12.9516, lng: 80.1462 }],
    date: "2026-03-14", time: "08:00", seatsAvailable: 2, pricePerSeat: 60,
    recurring: false, detourTolerance: 4, status: "active",
  },
  {
    id: "r7", driver: mockUsers[9],
    startLocation: CHENNAI_LOCATIONS.velachery, endLocation: CHENNAI_LOCATIONS.nungambakkam,
    waypoints: [{ lat: 13.0067, lng: 80.2206 }, { lat: 13.0359, lng: 80.2107 }],
    date: "2026-03-14", time: "08:30", seatsAvailable: 2, pricePerSeat: 50,
    recurring: true, recurringDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    detourTolerance: 2, status: "active",
  },
  {
    id: "r8", driver: mockUsers[4],
    startLocation: CHENNAI_LOCATIONS.chromepet, endLocation: CHENNAI_LOCATIONS.omr,
    waypoints: [{ lat: 12.9516, lng: 80.1700 }, { lat: 12.9600, lng: 80.2000 }],
    date: "2026-03-14", time: "07:30", seatsAvailable: 3, pricePerSeat: 65,
    recurring: false, detourTolerance: 3, status: "active",
  },
  {
    id: "r9", driver: mockUsers[2],
    startLocation: CHENNAI_LOCATIONS.mylapore, endLocation: CHENNAI_LOCATIONS.ashokNagar,
    waypoints: [{ lat: 13.0400, lng: 80.2600 }, { lat: 13.0418, lng: 80.2341 }],
    date: "2026-03-14", time: "09:15", seatsAvailable: 1, pricePerSeat: 30,
    recurring: false, detourTolerance: 1, status: "active",
  },
  {
    id: "r10", driver: mockUsers[6],
    startLocation: CHENNAI_LOCATIONS.nungambakkam, endLocation: CHENNAI_LOCATIONS.velachery,
    waypoints: [{ lat: 13.0500, lng: 80.2350 }, { lat: 13.0359, lng: 80.2200 }],
    date: "2026-03-14", time: "18:30", seatsAvailable: 3, pricePerSeat: 45,
    recurring: true, recurringDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    detourTolerance: 2, status: "active",
  },
  // Some completed rides for dashboard
  {
    id: "r11", driver: mockUsers[0],
    startLocation: CHENNAI_LOCATIONS.annaNagar, endLocation: CHENNAI_LOCATIONS.tNagar,
    waypoints: [],
    date: "2026-03-10", time: "08:30", seatsAvailable: 0, pricePerSeat: 45,
    recurring: false, detourTolerance: 2, status: "completed",
  },
  {
    id: "r12", driver: mockUsers[1],
    startLocation: CHENNAI_LOCATIONS.egmore, endLocation: CHENNAI_LOCATIONS.guindy,
    waypoints: [],
    date: "2026-03-08", time: "08:15", seatsAvailable: 0, pricePerSeat: 55,
    recurring: false, detourTolerance: 3, status: "completed",
  },
];

// Pre-matched ride pairs
export const preMatchedBookings: RideBooking[] = [
  {
    id: "b1", ride: mockRideOffers[0], passenger: mockUsers[2], status: "accepted",
    pickupPoint: CHENNAI_LOCATIONS.nungambakkam, dropoffPoint: CHENNAI_LOCATIONS.tNagar,
    cost: 45, fuelCost: 38, platformFee: 2.25, passengerShare: 45,
  },
  {
    id: "b2", ride: mockRideOffers[3], passenger: mockUsers[6], status: "pending",
    pickupPoint: CHENNAI_LOCATIONS.guindy, dropoffPoint: CHENNAI_LOCATIONS.sholinganallur,
    cost: 75, fuelCost: 64, platformFee: 3.75, passengerShare: 75,
  },
  {
    id: "b3", ride: mockRideOffers[4], passenger: mockUsers[3], status: "completed",
    pickupPoint: CHENNAI_LOCATIONS.adyar, dropoffPoint: CHENNAI_LOCATIONS.omr,
    cost: 40, fuelCost: 34, platformFee: 2.00, passengerShare: 40,
  },
];

export const mockChatMessages: ChatMessage[] = [
  { id: "c1", senderId: "u1", text: "Hi! I'll be at the Anna Nagar bus stop. Look for a white Creta.", timestamp: "2026-03-14T08:15:00" },
  { id: "c2", senderId: "u3", text: "Got it! I'll be there in 5 minutes. Wearing a blue jacket.", timestamp: "2026-03-14T08:16:00" },
  { id: "c3", senderId: "u1", text: "Perfect, see you soon! 🚗", timestamp: "2026-03-14T08:17:00" },
];

export const CHENNAI_CENTER = { lat: 13.0827, lng: 80.2707 };
export { CHENNAI_LOCATIONS };

// Matching algorithm
export function calculateMatchScore(
  userStart: { lat: number; lng: number },
  userEnd: { lat: number; lng: number },
  userTime: string,
  ride: RideOffer
): RideMatch | null {
  // Route overlap via bounding box intersection
  const userMinLat = Math.min(userStart.lat, userEnd.lat);
  const userMaxLat = Math.max(userStart.lat, userEnd.lat);
  const userMinLng = Math.min(userStart.lng, userEnd.lng);
  const userMaxLng = Math.max(userStart.lng, userEnd.lng);

  const rideMinLat = Math.min(ride.startLocation.lat, ride.endLocation.lat, ...ride.waypoints.map(w => w.lat));
  const rideMaxLat = Math.max(ride.startLocation.lat, ride.endLocation.lat, ...ride.waypoints.map(w => w.lat));
  const rideMinLng = Math.min(ride.startLocation.lng, ride.endLocation.lng, ...ride.waypoints.map(w => w.lng));
  const rideMaxLng = Math.max(ride.startLocation.lng, ride.endLocation.lng, ...ride.waypoints.map(w => w.lng));

  const overlapLat = Math.max(0, Math.min(userMaxLat, rideMaxLat) - Math.max(userMinLat, rideMinLat));
  const overlapLng = Math.max(0, Math.min(userMaxLng, rideMaxLng) - Math.max(userMinLng, rideMinLng));
  const overlapArea = overlapLat * overlapLng;

  const userArea = (userMaxLat - userMinLat) * (userMaxLng - userMinLng) || 0.001;
  const routeOverlap = Math.min(100, Math.round((overlapArea / userArea) * 100));

  if (routeOverlap < 30) return null;

  // Time match
  const [userH, userM] = userTime.split(":").map(Number);
  const [rideH, rideM] = ride.time.split(":").map(Number);
  const userMinutes = userH * 60 + userM;
  const rideMinutes = rideH * 60 + rideM;
  const timeDiff = Math.abs(userMinutes - rideMinutes);

  if (timeDiff > 30) return null;

  const timeMatchScore = Math.max(0, 100 - (timeDiff / 15) * 50);
  const matchScore = Math.round(routeOverlap * 0.6 + timeMatchScore * 0.4);

  // Find nearest waypoint as pickup
  const allPoints = [ride.startLocation, ...ride.waypoints.map((w, i) => ({ name: `Waypoint ${i + 1}`, ...w })), ride.endLocation];
  let nearestToStart = allPoints[0];
  let minDistStart = Infinity;
  let nearestToEnd = allPoints[allPoints.length - 1];
  let minDistEnd = Infinity;

  for (const p of allPoints) {
    const dStart = Math.sqrt((p.lat - userStart.lat) ** 2 + (p.lng - userStart.lng) ** 2);
    const dEnd = Math.sqrt((p.lat - userEnd.lat) ** 2 + (p.lng - userEnd.lng) ** 2);
    if (dStart < minDistStart) { minDistStart = dStart; nearestToStart = p; }
    if (dEnd < minDistEnd) { minDistEnd = dEnd; nearestToEnd = p; }
  }

  return {
    ride,
    matchScore,
    routeOverlap,
    timeMatch: Math.round(timeMatchScore),
    pickupPoint: { name: nearestToStart.name, lat: nearestToStart.lat, lng: nearestToStart.lng },
    dropoffPoint: { name: nearestToEnd.name, lat: nearestToEnd.lat, lng: nearestToEnd.lng },
    estimatedCost: ride.pricePerSeat,
  };
}
