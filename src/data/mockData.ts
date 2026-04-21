/**
 * Mock Data for NEAT Cleaning Service Platform
 * Frontend-only data structure (no backend)
 */

export type BookingStatus = 
  | "pending_approval" 
  | "assigned" 
  | "on_the_way" 
  | "in_progress" 
  | "completed" 
  | "cancelled";

export type ServiceType = "residential" | "commercial" | "deep-clean" | "move-in" | "move-out";

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  memberSince: string;
  rating: number;
  totalBookings: number;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  skills: string[];
  availability: "available" | "busy" | "off";
  completedJobs: number;
  rating: number;
  joinedDate: string;
}

export interface TeamAssignment {
  teamId: string;
  teamName: string;
  members: StaffMember[];
  totalMembers: number;
  rating: number;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceType: ServiceType;
  propertyType: "apartment" | "house" | "office" | "retail";
  squareFootage: number;
  address: Address;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number; // in minutes
  estimatedCost: number;
  numberOfCleaners: number;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
  assignedTeam?: TeamAssignment;
  teamAssignmentTime?: string;
  startTime?: string;
  completionTime?: string;
  rating?: number;
  feedback?: string;
}

export interface Job extends Booking {
  jobId: string;
  assignedToTeam: TeamAssignment;
  currentStatus: BookingStatus;
  timeSpent: number; // in minutes
  beforePhotos?: string[];
  afterPhotos?: string[];
}

// Mock Clients
export const mockClients: Record<string, Client> = {
  "client-1": {
    id: "client-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+63 917 010 0101",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    memberSince: "2024-01-15",
    rating: 4.8,
    totalBookings: 12
  },
  "client-2": {
    id: "client-2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+63 917 010 0102",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    memberSince: "2024-02-20",
    rating: 5.0,
    totalBookings: 5
  },
  "client-3": {
    id: "client-3",
    name: "Emma Rodriguez",
    email: "emma.r@email.com",
    phone: "+63 917 010 0103",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    memberSince: "2023-11-10",
    rating: 4.6,
    totalBookings: 23
  }
};

// Mock Staff Members
export const mockStaff: Record<string, StaffMember> = {
  "staff-1": {
    id: "staff-1",
    name: "Lisa Wong",
    email: "lisa.wong@neat.com",
    phone: "+63 917 020 0201",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    skills: ["residential", "deep-clean", "window-cleaning"],
    availability: "available",
    completedJobs: 87,
    rating: 4.9,
    joinedDate: "2023-06-01"
  },
  "staff-2": {
    id: "staff-2",
    name: "James Anderson",
    email: "james.anderson@neat.com",
    phone: "+63 917 020 0202",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    skills: ["commercial", "carpet-cleaning", "floor-polishing"],
    availability: "available",
    completedJobs: 156,
    rating: 4.95,
    joinedDate: "2023-02-15"
  },
  "staff-3": {
    id: "staff-3",
    name: "Maria Garcia",
    email: "maria.garcia@neat.com",
    phone: "+63 917 020 0203",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    skills: ["residential", "move-in", "move-out"],
    availability: "busy",
    completedJobs: 124,
    rating: 4.85,
    joinedDate: "2023-04-10"
  },
  "staff-4": {
    id: "staff-4",
    name: "David Park",
    email: "david.park@neat.com",
    phone: "+63 917 020 0204",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    skills: ["commercial", "office-cleaning", "sanitization"],
    availability: "available",
    completedJobs: 203,
    rating: 4.92,
    joinedDate: "2023-01-05"
  },
  "staff-5": {
    id: "staff-5",
    name: "Sofia Martinez",
    email: "sofia.martinez@neat.com",
    phone: "+63 917 020 0205",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    skills: ["residential", "apartment", "detailed-cleaning"],
    availability: "available",
    completedJobs: 95,
    rating: 4.88,
    joinedDate: "2023-07-20"
  }
};

// Mock Teams
export const mockTeams: Record<string, TeamAssignment> = {
  "team-1": {
    teamId: "team-1",
    teamName: "Gold Team",
    members: [mockStaff["staff-1"], mockStaff["staff-4"]],
    totalMembers: 2,
    rating: 4.92
  },
  "team-2": {
    teamId: "team-2",
    teamName: "Silver Team",
    members: [mockStaff["staff-2"], mockStaff["staff-5"]],
    totalMembers: 2,
    rating: 4.90
  },
  "team-3": {
    teamId: "team-3",
    teamName: "Platinum Team",
    members: [mockStaff["staff-3"]],
    totalMembers: 1,
    rating: 4.85
  }
};

// Mock Bookings
export const mockBookings: Record<string, Booking> = {
  "booking-1": {
    id: "booking-1",
    clientId: "client-1",
    clientName: "Sarah Johnson",
    clientPhone: "+63 917 010 0101",
    clientEmail: "sarah.johnson@email.com",
    serviceType: "residential",
    propertyType: "apartment",
    squareFootage: 1200,
    address: {
      street: "123 Park Avenue",
      city: "Makati",
      state: "Metro Manila",
      zipCode: "1226",
      country: "Philippines"
    },
    scheduledDate: "2026-04-20",
    scheduledTime: "10:00 AM",
    estimatedDuration: 180,
    estimatedCost: 250,
    numberOfCleaners: 2,
    specialRequests: "Focus on kitchen and bathrooms",
    status: "pending_approval",
    createdAt: "2026-04-18T14:30:00Z"
  },
  "booking-2": {
    id: "booking-2",
    clientId: "client-2",
    clientName: "Michael Chen",
    clientPhone: "+63 917 010 0102",
    clientEmail: "michael.chen@email.com",
    serviceType: "commercial",
    propertyType: "office",
    squareFootage: 5000,
    address: {
      street: "456 Business Plaza",
      city: "Cebu City",
      state: "Cebu",
      zipCode: "6000",
      country: "Philippines"
    },
    scheduledDate: "2026-04-21",
    scheduledTime: "6:00 PM",
    estimatedDuration: 240,
    estimatedCost: 450,
    numberOfCleaners: 3,
    specialRequests: "After hours cleaning preferred",
    status: "assigned",
    createdAt: "2026-04-17T09:00:00Z",
    assignedTeam: mockTeams["team-1"],
    teamAssignmentTime: "2026-04-18T10:15:00Z"
  },
  "booking-3": {
    id: "booking-3",
    clientId: "client-3",
    clientName: "Emma Rodriguez",
    clientPhone: "+63 917 010 0103",
    clientEmail: "emma.r@email.com",
    serviceType: "deep-clean",
    propertyType: "house",
    squareFootage: 3500,
    address: {
      street: "789 Sunset Boulevard",
      city: "Davao City",
      state: "Davao del Sur",
      zipCode: "8000",
      country: "Philippines"
    },
    scheduledDate: "2026-04-22",
    scheduledTime: "2:00 PM",
    estimatedDuration: 300,
    estimatedCost: 650,
    numberOfCleaners: 3,
    status: "on_the_way",
    createdAt: "2026-04-18T08:00:00Z",
    assignedTeam: mockTeams["team-2"],
    teamAssignmentTime: "2026-04-18T08:45:00Z",
    startTime: "2026-04-22T13:45:00Z"
  },
  "booking-4": {
    id: "booking-4",
    clientId: "client-1",
    clientName: "Sarah Johnson",
    clientPhone: "+63 917 010 0101",
    clientEmail: "sarah.johnson@email.com",
    serviceType: "move-out",
    propertyType: "apartment",
    squareFootage: 1200,
    address: {
      street: "321 Main Street",
      city: "Baguio",
      state: "Benguet",
      zipCode: "2600",
      country: "Philippines"
    },
    scheduledDate: "2026-04-15",
    scheduledTime: "9:00 AM",
    estimatedDuration: 240,
    estimatedCost: 500,
    numberOfCleaners: 2,
    status: "completed",
    createdAt: "2026-04-10T11:00:00Z",
    assignedTeam: mockTeams["team-1"],
    teamAssignmentTime: "2026-04-11T09:30:00Z",
    startTime: "2026-04-15T09:00:00Z",
    completionTime: "2026-04-15T12:45:00Z",
    rating: 5,
    feedback: "Excellent work! The team was professional and thorough."
  }
};

export const serviceTypes: Array<{ value: ServiceType; label: string; basePrice: number }> = [
  { value: "residential", label: "Residential Cleaning", basePrice: 150 },
  { value: "commercial", label: "Commercial Cleaning", basePrice: 200 },
  { value: "deep-clean", label: "Deep Clean", basePrice: 300 },
  { value: "move-in", label: "Move-In Cleaning", basePrice: 400 },
  { value: "move-out", label: "Move-Out Cleaning", basePrice: 400 }
];

export const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail Space" }
];

export const bookingStatuses: Array<{ value: BookingStatus; label: string; color: string }> = [
  { value: "pending_approval", label: "Pending Approval", color: "bg-yellow-100 text-yellow-800" },
  { value: "assigned", label: "Assigned", color: "bg-blue-100 text-blue-800" },
  { value: "on_the_way", label: "On The Way", color: "bg-purple-100 text-purple-800" },
  { value: "in_progress", label: "In Progress", color: "bg-orange-100 text-orange-800" },
  { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" }
];

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

// Helper function to format time
export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Helper to calculate booking cost
export const calculateBookingCost = (
  serviceType: ServiceType,
  squareFootage: number,
  numberOfCleaners: number
): number => {
  const basePrice = serviceTypes.find(s => s.value === serviceType)?.basePrice || 150;
  const sqftMultiplier = Math.ceil(squareFootage / 1000);
  const cleanerMultiplier = numberOfCleaners;
  return basePrice * sqftMultiplier * cleanerMultiplier;
};
