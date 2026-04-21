import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ClientSignupPage from "./pages/ClientSignupPage";
import ClientBookingDetails from "./pages/ClientBookingDetails";

// Client Pages
import ClientBooking from "./pages/client/ClientBooking";
import ClientTracking from "./pages/client/ClientTracking";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientFeedback from "./pages/client/ClientFeedback";
import ClientProfile from "./pages/client/ClientProfile";

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerBookings from "./pages/manager/ManagerBookings";
import ManagerTeams from "./pages/manager/ManagerTeams";
import ManagerEmployees from "./pages/manager/ManagerEmployees";
import ManagerClients from "./pages/manager/ManagerClients";
import ManagerFeedback from "./pages/manager/ManagerFeedback";

// Staff Pages
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffReports from "./pages/staff/StaffReports";
import StaffGallery from "./pages/staff/StaffGallery";
import StaffProfile from "./pages/staff/StaffProfile";

// Admin Pages (legacy - can be kept as placeholders)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClients from "./pages/admin/AdminClients";
import AdminStaff from "./pages/admin/AdminStaff";
import AdminFinance from "./pages/admin/AdminFinance";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminMonitoring from "./pages/admin/AdminMonitoring";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/login", Component: LoginPage },
  { path: "/client-signup", Component: ClientSignupPage },
  { path: "/booking-details", Component: ClientBookingDetails },
  
  // Client Routes
  { path: "/client", Component: ClientDashboard },
  { path: "/client/booking", Component: ClientBooking },
  { path: "/client/booking-summary", Component: ClientDashboard },
  { path: "/client/tracking", Component: ClientTracking },
  { path: "/client/feedback", Component: ClientFeedback },
  { path: "/client/profile", Component: ClientProfile },
  
  // Manager Routes
  { path: "/manager", Component: ManagerDashboard },
  { path: "/manager/bookings", Component: ManagerBookings },
  { path: "/manager/booking/:id", Component: ManagerBookings },
  { path: "/manager/teams", Component: ManagerTeams },
  { path: "/manager/employees", Component: ManagerEmployees },
  { path: "/manager/clients", Component: ManagerClients },
  { path: "/manager/feedback", Component: ManagerFeedback },
  
  // Staff Routes
  { path: "/staff", Component: StaffDashboard },
  { path: "/staff/reports", Component: StaffReports },
  { path: "/staff/gallery", Component: StaffGallery },
  { path: "/staff/profile", Component: StaffProfile },
  
  // Admin Routes (legacy)
  { path: "/admin", Component: AdminDashboard },
  { path: "/admin/clients", Component: AdminClients },
  { path: "/admin/staff", Component: AdminStaff },
  { path: "/admin/finance", Component: AdminFinance },
  { path: "/admin/monitoring", Component: AdminMonitoring },
  { path: "/admin/documents", Component: AdminDocuments },
  { path: "/admin/settings", Component: AdminSettings },
]);
