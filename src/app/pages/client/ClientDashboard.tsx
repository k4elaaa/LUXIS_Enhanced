import ClientSidebar from "../../components/ClientSidebar";
import { Calendar, CheckCircle, Clock, Sparkles, ArrowRight, MapPin, ShieldCheck, BadgeCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function ClientDashboard() {
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [userAccount, setUserAccount] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const booking = localStorage.getItem("currentBooking");
    if (booking) {
      setCurrentBooking(JSON.parse(booking));
      setTimeout(() => localStorage.removeItem("currentBooking"), 500);
    }

    const account = localStorage.getItem("userAccount");
    if (account) {
      setUserAccount(JSON.parse(account));
    }

    const savedBookings = localStorage.getItem("allBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings([
        { id: "BK-3401", service: "Deep Cleaning", date: "Apr 18, 2026", time: "10:00 AM", status: "Confirmed", address: "123 Main St" },
        { id: "BK-3402", service: "Regular Maintenance", date: "Apr 22, 2026", time: "02:00 PM", status: "Scheduled", address: "456 Oak Ave" },
      ]);
    }
  }, []);

  const quickActions = [
    {
      title: "Book a service",
      description: "Schedule a new cleaning whenever you need one.",
      icon: Calendar,
      href: "/client/booking",
      cta: "Book now",
    },
    {
      title: "Track your cleaning",
      description: "See the live status of your current service.",
      icon: Clock,
      href: "/client/tracking",
      cta: "Track status",
    },
    {
      title: "Check your history",
      description: "Review past services and completed bookings.",
      icon: BadgeCheck,
      href: "/client/booking-details",
      cta: "View history",
    },
  ];

  const serviceSteps = [
    "Send a booking request",
    "Wait for confirmation",
    "Track the cleaning progress",
    "Review the finished service",
  ];

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 space-y-8 pt-16 md:pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[#fcb316] text-sm font-semibold uppercase tracking-[0.22em]">Client Dashboard</p>
              <h1 className="mt-2 text-4xl md:text-5xl text-[#fffefe] font-bold leading-tight">Your cleaning services in one simple place</h1>
              <p className="mt-3 text-[#fffefe]/65 text-base md:text-lg">
                See what is happening now, what is coming next, and what you can do right away.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {userAccount && (
                <div className="px-5 py-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-lg">
                  <p className="text-[#fffefe]/55 text-xs uppercase tracking-[0.18em]">Account</p>
                  <p className="text-[#fcb316] font-semibold mt-1 flex items-center gap-2">
                    <Sparkles size={16} />
                    {userAccount.type === "old_client" ? "Preferred client" : "New client"}
                  </p>
                </div>
              )}
              <Link to="/client/booking">
                <Button className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-bold px-6 py-6 rounded-2xl shadow-lg">
                  <Calendar size={18} className="mr-2" /> Book a service
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-[28px] border border-[#2a2a2a] bg-gradient-to-br from-[#1f1f1f] via-[#1b1b1b] to-[#151515] p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[#fffefe]/55 text-sm uppercase tracking-[0.18em]">Now serving</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#fffefe] mt-2">
                    {currentBooking ? currentBooking.service : "No active booking right now"}
                  </h2>
                  <p className="text-[#fffefe]/60 mt-2 max-w-xl">
                    {currentBooking
                      ? "You can view the current status, date, and location without digging through technical details."
                      : "Book your next cleaning service and we will keep everything organized here for you."}
                  </p>
                </div>

                <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fcb316]/15 text-[#fcb316] border border-[#fcb316]/25">
                  <ShieldCheck size={28} />
                </div>
              </div>

              {currentBooking ? (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[#2a2a2a] bg-[#191919] p-4">
                    <p className="text-[#fffefe]/55 text-xs uppercase tracking-[0.16em]">Date</p>
                    <p className="mt-2 text-lg font-semibold text-[#fffefe]">{currentBooking.date}</p>
                    <p className="text-sm text-[#fcb316] mt-1">{currentBooking.time}</p>
                  </div>
                  <div className="rounded-2xl border border-[#2a2a2a] bg-[#191919] p-4">
                    <p className="text-[#fffefe]/55 text-xs uppercase tracking-[0.16em]">Status</p>
                    <p className="mt-2 text-lg font-semibold text-[#fffefe] flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-400" /> {currentBooking.status}
                    </p>
                    <p className="text-sm text-[#fffefe]/55 mt-1">We are keeping this service on track.</p>
                  </div>
                  <div className="rounded-2xl border border-[#2a2a2a] bg-[#191919] p-4">
                    <p className="text-[#fffefe]/55 text-xs uppercase tracking-[0.16em]">Location</p>
                    <p className="mt-2 text-lg font-semibold text-[#fffefe] flex items-start gap-2">
                      <MapPin size={18} className="mt-0.5 text-[#fcb316]" />
                      <span>{currentBooking.address}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-[#2a2a2a] bg-[#191919] p-5 text-[#fffefe]/70">
                  No current service. Use the booking button to schedule your next cleaning.
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/client/tracking" className="flex-1">
                  <Button className="w-full rounded-2xl bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold py-6">
                    Track current service <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/client/booking-details" className="flex-1">
                  <Button variant="outline" className="w-full rounded-2xl border-[#2a2a2a] bg-[#191919] text-[#fffefe] hover:bg-[#252525] py-6 font-semibold">
                    View booking history
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#2a2a2a] bg-[#1b1b1b] p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#fffefe]/55 text-sm uppercase tracking-[0.18em]">What to expect</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#fffefe]">Simple service flow</h2>
                </div>
                <Clock className="text-[#fcb316]" size={24} />
              </div>

              <div className="mt-6 space-y-4">
                {serviceSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4 rounded-2xl border border-[#2a2a2a] bg-[#191919] p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fcb316] text-[#191919] font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-[#fffefe] font-semibold">{step}</p>
                      <p className="text-[#fffefe]/55 text-sm mt-1">
                        {index === 0 && "Choose the service that fits your home or office."}
                        {index === 1 && "We confirm the details and prepare the team."}
                        {index === 2 && "Follow progress at a glance while the service happens."}
                        {index === 3 && "Check the result and keep it for your records."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <div key={action.title} className="rounded-[24px] border border-[#2a2a2a] bg-[#1e1e1e] p-6 shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcb316]/15 text-[#fcb316] border border-[#fcb316]/20">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#fffefe]">{action.title}</h3>
                  <p className="mt-2 text-[#fffefe]/60 text-sm leading-6">{action.description}</p>
                  <Link to={action.href}>
                    <Button variant="ghost" className="mt-4 px-0 text-[#fcb316] hover:text-[#ffcf61] hover:bg-transparent font-semibold">
                      {action.cta} <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-[#2a2a2a] bg-[#1d1d1d] p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-[#fffefe]/55 text-sm uppercase tracking-[0.18em]">Upcoming</p>
                <h2 className="mt-2 text-2xl font-bold text-[#fffefe]">Your next bookings</h2>
              </div>
              <Link to="/client/booking">
                <Button variant="outline" className="rounded-2xl border-[#2a2a2a] bg-[#191919] text-[#fffefe] hover:bg-[#252525]">
                  Add a booking
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {bookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="rounded-2xl border border-[#2a2a2a] bg-[#191919] p-5 hover:border-[#fcb316]/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[#fffefe] font-semibold">{booking.service}</p>
                      <p className="text-[#fffefe]/55 text-sm mt-1">{booking.address}</p>
                    </div>
                    <span className="rounded-full bg-[#fcb316]/15 px-3 py-1 text-xs font-semibold text-[#fcb316]">
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-[#fffefe]/70">
                    <p className="flex items-center gap-2"><Calendar size={14} className="text-[#fcb316]" /> {booking.date}</p>
                    <p className="flex items-center gap-2"><Clock size={14} className="text-[#fcb316]" /> {booking.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


