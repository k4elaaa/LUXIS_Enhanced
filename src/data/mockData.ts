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
    name: "Maria Santos",
    email: "sarah.johnson@email.com",
    phone: "+63 917 010 0101",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    memberSince: "2024-01-15",
    rating: 4.8,
    totalBookings: 12
  },
  "client-2": {
    id: "client-2",
    name: "Juan Dela Cruz",
    email: "michael.chen@email.com",
    phone: "+63 917 010 0102",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    memberSince: "2024-02-20",
    rating: 5.0,
    totalBookings: 5
  },
  "client-3": {
    id: "client-3",
    name: "Ana Reyes",
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
    name: "Liza Mendoza",
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
    name: "Jose Villanueva",
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
    name: "Maricel Bautista",
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
    name: "Ramon Castillo",
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
    name: "Sofia Ramirez",
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
    clientName: "Maria Santos",
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
    clientName: "Juan Dela Cruz",
    clientPhone: "+63 917 010 0102",
    clientEmail: "michael.chen@email.com",
    serviceType: "commercial",
    propertyType: "office",
    squareFootage: 5000,
    address: {
      street: "456 Bonifacio High Street",
      city: "Taguig City",
      state: "Metro Manila",
      zipCode: "1634",
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
    clientName: "Ana Reyes",
    clientPhone: "+63 917 010 0103",
    clientEmail: "emma.r@email.com",
    serviceType: "deep-clean",
    propertyType: "house",
    squareFootage: 3500,
    address: {
      street: "789 Tomas Morato Avenue",
      city: "Quezon City",
      state: "Metro Manila",
      zipCode: "1103",
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
    clientName: "Maria Santos",
    clientPhone: "+63 917 010 0101",
    clientEmail: "sarah.johnson@email.com",
    serviceType: "move-out",
    propertyType: "apartment",
    squareFootage: 1200,
    address: {
      street: "321 Taft Avenue",
      city: "Manila",
      state: "Metro Manila",
      zipCode: "1000",
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
  },
  "booking-5": {
    id: "booking-5",
    clientId: "client-2",
    clientName: "Juan Dela Cruz",
    clientPhone: "+63 917 010 0102",
    clientEmail: "michael.chen@email.com",
    serviceType: "residential",
    propertyType: "house",
    squareFootage: 900,
    address: {
      street: "22 Sampaloc Street",
      city: "Makati",
      state: "Metro Manila",
      zipCode: "1226",
      country: "Philippines"
    },
    scheduledDate: "2026-04-23",
    scheduledTime: "08:00 AM",
    estimatedDuration: 120,
    estimatedCost: 180,
    numberOfCleaners: 2,
    status: "pending_approval",
    createdAt: "2026-04-20T09:00:00Z"
  },
  "booking-6": {
    id: "booking-6",
    clientId: "client-3",
    clientName: "Ana Reyes",
    clientPhone: "+63 917 010 0103",
    clientEmail: "emma.r@email.com",
    serviceType: "move-in",
    propertyType: "apartment",
    squareFootage: 600,
    address: {
      street: "48 Mabini Street",
      city: "Quezon City",
      state: "Metro Manila",
      zipCode: "1103",
      country: "Philippines"
    },
    scheduledDate: "2026-04-24",
    scheduledTime: "10:00 AM",
    estimatedDuration: 240,
    estimatedCost: 400,
    numberOfCleaners: 3,
    status: "pending_approval",
    createdAt: "2026-04-21T08:30:00Z"
  },
  "booking-7": {
    id: "booking-7",
    clientId: "client-1",
    clientName: "Maria Santos",
    clientPhone: "+63 917 010 0101",
    clientEmail: "sarah.johnson@email.com",
    serviceType: "commercial",
    propertyType: "office",
    squareFootage: 3200,
    address: {
      street: "12 Commerce Ave",
      city: "Taguig City",
      state: "Metro Manila",
      zipCode: "1634",
      country: "Philippines"
    },
    scheduledDate: "2026-04-22",
    scheduledTime: "07:00 PM",
    estimatedDuration: 240,
    estimatedCost: 520,
    numberOfCleaners: 4,
    status: "assigned",
    createdAt: "2026-04-18T10:00:00Z",
    assignedTeam: mockTeams["team-2"],
    teamAssignmentTime: "2026-04-19T09:00:00Z"
  },
  "booking-8": {
    id: "booking-8",
    clientId: "client-3",
    clientName: "Ana Reyes",
    clientPhone: "+63 917 010 0103",
    clientEmail: "emma.r@email.com",
    serviceType: "deep-clean",
    propertyType: "house",
    squareFootage: 2800,
    address: {
      street: "90 Roxas Boulevard",
      city: "Manila",
      state: "Metro Manila",
      zipCode: "1000",
      country: "Philippines"
    },
    scheduledDate: "2026-04-20",
    scheduledTime: "01:00 PM",
    estimatedDuration: 300,
    estimatedCost: 700,
    numberOfCleaners: 3,
    status: "in_progress",
    createdAt: "2026-04-18T07:30:00Z",
    assignedTeam: mockTeams["team-1"],
    teamAssignmentTime: "2026-04-19T08:15:00Z",
    startTime: "2026-04-20T12:40:00Z"
  },
  "booking-9": {
    id: "booking-9",
    clientId: "client-2",
    clientName: "Juan Dela Cruz",
    clientPhone: "+63 917 010 0102",
    clientEmail: "michael.chen@email.com",
    serviceType: "residential",
    propertyType: "apartment",
    squareFootage: 1100,
    address: {
      street: "7 Rizal Lane",
      city: "Makati",
      state: "Metro Manila",
      zipCode: "1226",
      country: "Philippines"
    },
    scheduledDate: "2026-04-19",
    scheduledTime: "03:00 PM",
    estimatedDuration: 180,
    estimatedCost: 300,
    numberOfCleaners: 2,
    status: "in_progress",
    createdAt: "2026-04-17T14:20:00Z",
    assignedTeam: mockTeams["team-2"],
    teamAssignmentTime: "2026-04-18T09:45:00Z",
    startTime: "2026-04-19T14:30:00Z"
  },
  "booking-10": {
    id: "booking-10",
    clientId: "client-1",
    clientName: "Maria Santos",
    clientPhone: "+63 917 010 0101",
    clientEmail: "sarah.johnson@email.com",
    serviceType: "move-out",
    propertyType: "apartment",
    squareFootage: 1300,
    address: {
      street: "55 Alabang St",
      city: "Muntinlupa",
      state: "Metro Manila",
      zipCode: "1770",
      country: "Philippines"
    },
    scheduledDate: "2026-04-14",
    scheduledTime: "08:00 AM",
    estimatedDuration: 240,
    estimatedCost: 480,
    numberOfCleaners: 3,
    status: "completed",
    createdAt: "2026-04-10T10:00:00Z",
    assignedTeam: mockTeams["team-3"],
    teamAssignmentTime: "2026-04-11T08:00:00Z",
    startTime: "2026-04-14T08:00:00Z",
    completionTime: "2026-04-14T12:30:00Z"
  },
  "booking-11": {
    id: "booking-11",
    clientId: "client-2",
    clientName: "Juan Dela Cruz",
    clientPhone: "+63 917 010 0102",
    clientEmail: "michael.chen@email.com",
    serviceType: "commercial",
    propertyType: "office",
    squareFootage: 4000,
    address: {
      street: "88 Corporate Ave",
      city: "Pasig",
      state: "Metro Manila",
      zipCode: "1600",
      country: "Philippines"
    },
    scheduledDate: "2026-04-13",
    scheduledTime: "07:00 AM",
    estimatedDuration: 300,
    estimatedCost: 950,
    numberOfCleaners: 5,
    status: "completed",
    createdAt: "2026-04-09T09:00:00Z",
    assignedTeam: mockTeams["team-1"],
    teamAssignmentTime: "2026-04-10T07:30:00Z",
    startTime: "2026-04-13T07:00:00Z",
    completionTime: "2026-04-13T12:00:00Z"
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

// Helper to format booking identifiers into display code BK-####
export const formatBookingCode = (bookingId: string): string => {
  if (!bookingId) return "BK-0000";

  const normalized = bookingId.trim().toUpperCase();
  if (normalized.startsWith("BK-")) return normalized;

  const digitGroups = normalized.match(/\d+/g);
  if (!digitGroups || digitGroups.length === 0) return normalized;

  const serial = digitGroups[digitGroups.length - 1].padStart(4, "0");
  return `BK-${serial}`;
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
