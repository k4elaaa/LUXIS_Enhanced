import ClientSidebar from "../../components/ClientSidebar";
import { Calendar, CheckCircle, Clock, Sparkles, ArrowRight, MapPin, ShieldCheck, BadgeCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function ClientDashboard() {
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [userAccount, setUserAccount] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

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
    { title: "Book a service", description: "Schedule a cleaning.", icon: Calendar, href: "/client/booking", cta: "Book now" },
    { title: "Track your cleaning", description: "View live status.", icon: Clock, href: "/client/tracking", cta: "Track status" },
    { title: "Check your history", description: "See past services.", icon: BadgeCheck, href: "/client/booking-details", cta: "View history" },
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
              <h1 className="mt-2 text-4xl md:text-5xl text-[#fffefe] font-bold leading-tight">Your cleaning services</h1>
              <p className="mt-3 text-[#fffefe]/65 text-base md:text-lg">See current and upcoming bookings.</p>
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
                    {currentBooking ? currentBooking.service : "No active bookings"}
                  </h2>
                  <p className="text-[#fffefe]/60 mt-2 max-w-xl">
                    {currentBooking ? "View status, date, and location quickly." : "Book your next cleaning."}
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
                  No current service. Use "Book a service" to schedule.
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/client/tracking" className="flex-1">
                  <Button className="w-full rounded-2xl bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold py-4">
                    Track service <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#2a2a2a] bg-[#1b1b1b] p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#fffefe]/55 text-sm uppercase tracking-[0.18em]">What to expect</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#fffefe]">Service flow</h2>
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
                        {index === 0 && "Choose a service."}
                        {index === 1 && "We confirm and prepare the team."}
                        {index === 2 && "Follow progress during the service."}
                        {index === 3 && "Review the result."}
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
                  {action.title === "Check your history" ? (
                    <div className="mt-4">
                      <Button onClick={() => setShowHistoryModal(true)} variant="ghost" className="px-0 text-[#fcb316] hover:text-[#ffcf61] hover:bg-transparent font-semibold">
                        {action.cta} <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <Link to={action.href}>
                      <Button variant="ghost" className="mt-4 px-0 text-[#fcb316] hover:text-[#ffcf61] hover:bg-transparent font-semibold">
                        {action.cta} <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  )}
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
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-[#fffefe]/60 text-sm">
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2a]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="text-[#fffefe]/90">
                      <td className="py-3 px-4">{b.service}</td>
                      <td className="py-3 px-4">{b.date}</td>
                      <td className="py-3 px-4">{b.time}</td>
                      <td className="py-3 px-4">{b.address}</td>
                      <td className="py-3 px-4"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fcb316]/10 text-[#fcb316]">{b.status}</span></td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button onClick={() => { setSelectedBooking(b); setShowBookingModal(true); }} className="px-3 py-2 text-sm rounded-lg bg-[#191919] border border-[#2a2a2a] text-[#fffefe]">View</Button>
                          <Button onClick={() => { setSelectedBooking(b); setShowReceiptModal(true); }} className="px-3 py-2 text-sm rounded-lg bg-[#fcb316] text-[#191919]">Receipt</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {showBookingModal && selectedBooking && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-[20px] p-6 w-full max-w-md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#fffefe]/60">Booking</p>
                    <h3 className="text-xl text-[#fffefe] font-bold mt-1">{selectedBooking.service}</h3>
                  </div>
                  <button onClick={() => setShowBookingModal(false)} className="text-[#fffefe]/60">Close</button>
                </div>
                <div className="space-y-2 text-[#fffefe]/90">
                  <p><strong>ID:</strong> {selectedBooking.id}</p>
                  <p><strong>Date:</strong> {selectedBooking.date}</p>
                  <p><strong>Time:</strong> {selectedBooking.time}</p>
                  <p><strong>Address:</strong> {selectedBooking.address}</p>
                  <p><strong>Status:</strong> {selectedBooking.status}</p>
                </div>
                <div className="mt-6">
                  <Button onClick={() => setShowBookingModal(false)} className="w-full bg-[#fcb316] text-[#191919]">Close</Button>
                </div>
              </div>
            </div>
          )}

          {showReceiptModal && selectedBooking && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#fffefe]/60">Receipt</p>
                    <h3 className="text-2xl text-[#fffefe] font-bold mt-1">NEAT Receipt</h3>
                    <p className="text-[#fffefe]/60 text-sm mt-1">Premium Field Service Management</p>
                  </div>
                  <button onClick={() => setShowReceiptModal(false)} className="text-[#fffefe]/60">Close</button>
                </div>

                <div className="max-w-2xl mx-auto bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-[#fcb316] p-6">
                    <h2 className="text-2xl text-[#191919]">NEAT Receipt</h2>
                    <p className="text-[#191919]/70 text-sm mt-1">Premium Field Service Management</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#fffefe]/50 text-sm mb-1">Receipt For</p>
                        <p className="text-[#fffefe] text-lg">{userAccount?.name || 'Client'}</p>
                      </div>
                      <div>
                        <p className="text-[#fffefe]/50 text-sm mb-1">Date</p>
                        <p className="text-[#fffefe]">{selectedBooking.date}</p>
                      </div>
                    </div>

                    <div className="border-t border-[#2a2a2a] pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[#fffefe]">{selectedBooking.service}</p>
                          <p className="text-[#fffefe]/50 text-sm mt-1">{selectedBooking.address}</p>
                        </div>
                        <p className="text-[#fcb316] text-xl">{selectedBooking.amount || 'PHP 0'}</p>
                      </div>
                      <div className="mt-4 border-t border-[#2a2a2a] pt-4 flex justify-between">
                        <p className="text-[#fffefe]">Transportation Fee</p>
                        <p className="text-[#fffefe]">PHP 600</p>
                      </div>
                      <div className="mt-4 border-t border-[#fcb316]/30 pt-4 flex justify-between">
                        <p className="text-xl text-[#fffefe]">Total</p>
                        <p className="text-2xl text-[#fcb316]">{selectedBooking.amount || 'PHP 0'}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919]">Download Receipt</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showHistoryModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-[20px] p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#fffefe]/60">History</p>
                    <h3 className="text-xl text-[#fffefe] font-bold mt-1">All past bookings</h3>
                    <p className="text-[#fffefe]/60 text-sm mt-2">All your past bookings will be saved here.</p>
                  </div>
                  <button onClick={() => setShowHistoryModal(false)} className="text-[#fffefe]/60">Close</button>
                </div>

                <div className="mt-4">
                  {bookings.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#2a2a2a] p-6 text-center text-[#fffefe]/70">There are no past bookings.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead>
                          <tr className="text-[#fffefe]/60 text-sm">
                            <th className="py-3 px-4">Service</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Time</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2a2a2a]">
                          {bookings.map((b) => (
                            <tr key={b.id} className="text-[#fffefe]/90">
                              <td className="py-3 px-4">{b.service}</td>
                              <td className="py-3 px-4">{b.date}</td>
                              <td className="py-3 px-4">{b.time}</td>
                              <td className="py-3 px-4">{b.address}</td>
                              <td className="py-3 px-4"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fcb316]/10 text-[#fcb316]">{b.status}</span></td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button onClick={() => { setSelectedBooking(b); setShowBookingModal(true); }} className="px-3 py-2 text-sm rounded-lg bg-[#191919] border border-[#2a2a2a] text-[#fffefe]">View</Button>
                                  <Button onClick={() => { setSelectedBooking(b); setShowReceiptModal(true); }} className="px-3 py-2 text-sm rounded-lg bg-[#fcb316] text-[#191919]">Receipt</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Button onClick={() => setShowHistoryModal(false)} className="w-full bg-[#fcb316] text-[#191919]">Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


