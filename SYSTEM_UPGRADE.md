# LUXIS (Luxurious Unified Xcelerated Integrated Systems)
## Premium Cleaning Service Platform - Frontend Foundation

### 🎉 System Upgrade Complete

The LUXIS platform has been upgraded to a **complete frontend-only foundation** for a premium cleaning service platform inspired by ride-hailing apps like Grab, but adapted for cleaning services.

---

## ✨ Key Features Implemented

### 📱 **Client Portal**
- **Book Services** (`/client/booking`): Multi-step booking form with:
  - Service type selection (Residential, Commercial, Deep Clean, Move-in/out)
  - Property type and size input
  - Date & time scheduling
  - Special requests
  - Real-time cost calculation
  
- **Track Status** (`/client/tracking`): Real-time service monitoring with:
  - Status timeline tracker (Pending → Assigned → On The Way → In Progress → Completed)
  - Time meter with elapsed/remaining time display
  - Team member information with ratings
  - Service location map placeholder
  
- **Dashboard** (`/client`): View all bookings and quick actions
-


### 🧑‍💼 **Manager Portal**
- **Dashboard** (`/manager`): Overview with:
  - KPIs: Pending approvals, assigned jobs, in-progress services, completed bookings
  - Total revenue tracking
  - Recent booking list with quick access
  
- **Booking Requests** (`/manager/bookings`): Manage incoming booking requests with:
  - Search and filter by status
  - Detailed booking information sidebar
  - **Team Assignment Modal**: Manually assign staff to bookings (not automatic)
  - Team member profiles with skills and ratings
  
- **Team Management** (`/manager/teams`): Manage cleaning teams
- **Employee Management** (`/manager/employees`): View staff performance
- **Client Management** (`/manager/clients`): Client relationship management

### 🧹 **Staff/Cleaner Portal**
- **Dashboard** (`/staff`): View assigned jobs with:
  - KPIs: Completed today, active now, scheduled jobs, earnings
  - Current job display with real-time status
  - Upcoming jobs list
  - Start/complete job actions
  
- **Job Details**: View client info, service details, location, and team coordination

---

## 🏗️ Architecture & Structure

### Technology Stack
- **Vite** - Ultra-fast build tool
- **React 18** - Component-based UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Radix UI** - Accessible components
- **Lucide React** - Icon library

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── StatusTracker.tsx      # Multi-step status visualization
│   │   ├── TimeMeter.tsx          # Real-time timer display
│   │   ├── BookingCard.tsx        # Reusable booking card component
│   │   ├── TeamMemberCard.tsx     # Staff member selection component
│   │   ├── Logo.tsx               # Brand logo
│   │   ├── figma/                 # Figma components
│   │   └── ui/                    # Radix UI wrapped components
│   ├── pages/
│   │   ├── client/
│   │   │   ├── ClientDashboard.tsx
│   │   │   ├── ClientBooking.tsx
│   │   │   ├── ClientTracking.tsx
│   │   │   └── ClientFeedback.tsx
│   │   ├── manager/
│   │   │   ├── ManagerDashboard.tsx
│   │   │   ├── ManagerBookings.tsx    # Team assignment happens here
│   │   │   ├── ManagerTeams.tsx
│   │   │   ├── ManagerEmployees.tsx
│   │   │   ├── ManagerClients.tsx
│   │   │   └── ManagerFeedback.tsx
│   │   ├── staff/
│   │   │   ├── StaffDashboard.tsx
│   │   │   ├── StaffReports.tsx
│   │   │   ├── StaffGallery.tsx
│   │   │   └── StaffProfile.tsx
│   │   ├── LandingPage.tsx
│   │   └── LoginPage.tsx
│   ├── App.tsx                    # Root component with Router
│   └── routes.tsx                 # Route configuration
├── data/
│   └── mockData.ts                # Comprehensive mock data
└── styles/
    ├── index.css
    ├── tailwind.css
    ├── theme.css
    └── fonts.css
```

---

## 📊 Mock Data Structure

### Mock Clients
- **Count**: 3 sample clients
- **Data includes**: Name, email, phone, avatar, member since, rating, total bookings

### Mock Staff Members
- **Count**: 5 experienced cleaners
- **Data includes**: Name, email, skills, availability status, completed jobs, rating, joined date

### Mock Teams
- **Structure**: Teams of 1-3 staff members
- **Data includes**: Team name, members, combined rating

### Mock Bookings
- **Count**: 4 sample bookings in various states
- **Status progression**: pending_approval → assigned → on_the_way → in_progress → completed
- **Data includes**: Client info, service details, cost, timing, special requests, team assignment

### Data Utilities
- `calculateBookingCost()` - Price calculation based on service, area, team size
- `formatCurrency()` - Currency formatting
- `formatDate()` / `formatTime()` - Date/time formatting

---

## 🎨 Design System

### Color Palette
- **Primary**: Deep Gold (`#C8A96A`) - Premium, luxurious fee
- **Secondary**: Dark Charcoal (`#1A1A1A`) - Professional, serious
- **Background**: White/Off-white (`#F8F8F8`) - Clean, minimal
- **Accent**: Soft Gray (`#E5E5E5`) - Subtle, refined
- **Alerts**: Yellow (pending), Blue (assigned), Orange (in progress), Green (completed), Red (cancelled)

### Typography
- **Headlines**: Bold, 1.2x-1.4x line height
- **Body**: Regular weight, 1.5x line height
- **Subheadings**: Medium weight, 1.3x line height

### Components & Styling
- Rounded corners (2xl ~ 16px)
- Soft shadows (1-3px depth)
- Smooth transitions (200-300ms)
- Responsive grid layouts
- Mobile-first design approach

---

## 🔄 Key Workflows

### **Client Booking Flow**
1. Client selects service type and property details
2. Specifies date, time, and location
3. Reviews cost estimate
4. Submits booking (status: `pending_approval`)
5. Manager reviews and assigns team (status: `assigned`)
6. Client receives team notification (status: `on_the_way`)
7. Service begins (status: `in_progress`)
8. Service completes (status: `completed`)
9. Client rates and provides feedback

### **Manager Workflow (MANUAL DISPATCH)**
1. Manager views incoming booking requests in dashboard
2. Selects a pending booking
3. Reviews full booking details and client information
4. Views available teams with skills, ratings, and availability
5. **Manually selects and assigns team** (not automatic)
6. Team receives assignment notification
7. Can view real-time progress of assigned jobs
8. Reviews completion and client feedback

### **Staff Workflow**
1. Staff views dashboard with today's job assignments
2. Sees scheduled upcoming jobs
3. Starts an assigned job (changes status to `in_progress`)
4. Can view client details and service requirements
5. Can message client or manager
6. Completes job when service is finished
7. Uploads before/after photos (UI placeholders)
8. Views earnings summary

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts dev server at `http://localhost:5173`

### Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Login Routes
- Landing: `/` (public homepage)
- Login: `/login` (role-based login)
  - Admin: `/admin`
  - Manager: `/manager`
  - Staff: `/staff`
  - Client: `/client`

---

## 📋 Notable Implementation Details

### Status Tracker Component
- Visual multi-step progress indicator
- Shows pending → assigned → on_the_way → in_progress → completed
- Color-coded states
- Completion time display when applicable

### Time Meter Component  
- Real-time elapsed/remaining time display
- Progress bar visualization
- Current focus area indicator
- Estimated total duration tracking

### Team Assignment
- ⭐ **CRITICAL**: Manager MANUALLY selects teams
- Not automatic matching algorithm
- Considers: Skills, availability, ratings, workload
- Multi-select checkbox UX for team member selection

### Responsive Design
- Mobile-first approach
- Optimized for small screens (cards, single column)
- Desktop layouts with multi-column grids
- Touch-friendly button sizes (44px minimum)
- Readable text sizes on all devices

---

## 🔐 Security & Data

### Frontend-Only (No Backend)
- All data stored in memory (session state)
- Mock data resets on page refresh
- No persistent storage
- Ready to connect to backend API

### Ready for Backend Integration
```typescript
// Example integration point in mockData.ts
// Replace mock data with API calls:
// const bookings = await fetch('/api/bookings')
// const staff = await fetch('/api/staff')
// const teams = await fetch('/api/teams')
```

---

## 🎯 Testing Paths

### Client Path
1. Navigate to `/login`, select "Client"
2. Go to `/client/booking` to create a booking
3. View `/client/tracking` to see booking status and real-time updates
4. Check `/client` for all your bookings

### Manager Path
1. Navigate to `/login`, select "Manager"
2. View `/manager` dashboard with KPIs
3. Go to `/manager/bookings` to see incoming requests
4. Select a booking and assign a team using the modal
5. View team assignments and track progress

### Staff Path
1. Navigate to `/login`, select "Staff"
2. View `/staff` dashboard showing assigned jobs
3. See today's active jobs and upcoming schedule
4. Start/complete jobs and track earnings

---

## ✅ Completed Features

- ✅ Comprehensive mock data structure
- ✅ Client booking UI with cost calculation
- ✅ Real-time status tracking with visual progress
- ✅ Manager dashboard with KPIs  
- ✅ Manual team assignment (not automatic)
- ✅ Staff job management dashboard
- ✅ Reusable UI components (StatusTracker, TimeMeter, BookingCard)
- ✅ Mobile-first responsive design
- ✅ Premium UI/UX with Tailwind CSS
- ✅ Multi-role routing and navigation
- ✅ TypeScript for type safety
- ✅ Production build configured

---

## 🚧 Optional Enhancements

Future additions to consider:
- Backend API integration
- Authentication system
- Database for persistent storage
- Payment processing
- Push notifications
- GPS tracking for teams
- Photo upload for before/after
- Real-time chat messaging
- Analytics dashboard
- Admin panel for system management

---

## 📞 Support

The system is built on:
- **Vite 6.3** - Latest build tool
- **React 18** - Latest React version
- **TypeScript 5** - Latest TypeScript
- **Tailwind CSS 3** - Latest Tailwind

All components follow React best practices and can be easily extended.

---

**Built with ❤️ for Premium Cleaning Services**

The LUXIS platform is now ready for styling refinement, backend integration, and real-world deployment!
