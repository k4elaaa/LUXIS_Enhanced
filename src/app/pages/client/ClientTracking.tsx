import ClientSidebar from "../../components/ClientSidebar";
import { Send, Clock, Users, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { formatBookingCode } from "../../../data/mockData";

export default function ClientTracking() {
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const isTrackingBooking = (booking: any) => {
    const status = (booking?.status || "").toLowerCase();
    return status.includes("confirmed") || status.includes("in progress") || status.includes("active");
  };

  const getAssignedCleaners = (booking: any) => {
    const members = booking?.assignedTeam?.members;
    if (Array.isArray(members) && members.length > 0) {
      return members.map((member: any) => member?.name).filter(Boolean);
    }
    return [];
  };

  useEffect(() => {
    const booking = localStorage.getItem("currentBooking");
    if (booking) {
      setActiveBooking(JSON.parse(booking));
    }

    // Load only bookings tied to the logged-in user
    try {
      const userAccount = JSON.parse(localStorage.getItem("userAccount") || "null");
      if (userAccount && userAccount.email) {
        const key = `bookings_${userAccount.email.toLowerCase()}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          setBookings(parsed);
          // If there's a confirmed or in-progress booking, prefer that as activeBooking
          const trackingBooking = parsed.find((b: any) => isTrackingBooking(b));
          if (trackingBooking) setActiveBooking(trackingBooking);
        } else {
          setBookings([]);
        }
      } else {
        setBookings([]);
      }
    } catch (err) {
      setBookings([]);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageSubject.trim() || !messageContent.trim()) return;

    const messages = JSON.parse(localStorage.getItem("clientMessages") || "[]");
    messages.push({
      id: Date.now(),
      subject: messageSubject,
      content: messageContent,
      timestamp: new Date().toLocaleString(),
      bookingId: activeBooking?.id,
    });
    localStorage.setItem("clientMessages", JSON.stringify(messages));

    setMessageSubject("");
    setMessageContent("");
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setShowMessageModal(false);
    }, 2000);
  };

  const workStages = [
    { name: "Assessment", completed: true },
    { name: "Preparation", completed: true },
    { name: "Main Cleaning", completed: false },
    { name: "Inspection", completed: false },
    { name: "Completion", completed: false },
  ];

  const statusClass = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("pending")) return "text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400";
    if (s.includes("confirmed") || s.includes("completed") || s.includes("active")) return "text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400";
    if (s.includes("scheduled")) return "text-xs px-2 py-1 rounded-full bg-[#fcb316]/10 text-[#fcb316]";
    return "text-xs px-2 py-1 rounded-full bg-[#2a2a2a] text-[#fffefe]/70";
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-y-auto pr-1">
        <div className="p-4 md:p-8 pt-16 md:pt-8 space-y-6">
          {activeBooking && isTrackingBooking(activeBooking) && (
            <div className="rounded-[28px] border border-[#2a2a2a] bg-gradient-to-br from-[#2a2210] via-[#1d1b17] to-[#191919] p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[#fcb316] text-sm font-semibold uppercase tracking-[0.2em]">Active service</p>
                  <h1 className="mt-2 text-3xl md:text-4xl text-[#fffefe] font-bold">{activeBooking.serviceLabel || activeBooking.service}</h1>
                  <p className="mt-2 text-[#fffefe]/65">{activeBooking.address}</p>
                </div>

                <div className="rounded-2xl border border-[#fcb316]/20 bg-[#191919]/50 px-5 py-4 text-left lg:text-right">
                  <p className="text-sm text-[#fffefe]/60">Service ID</p>
                  <p className="text-lg md:text-xl font-semibold text-[#fcb316]">{formatBookingCode(activeBooking.id)}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[#2a2a2a] bg-[#191919] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#fffefe]/50">Schedule</p>
                  <p className="mt-2 text-[#fffefe] font-semibold flex items-center gap-2">
                    <Clock size={18} className="text-[#fcb316]" />
                    {activeBooking.date} • {activeBooking.time}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#2a2a2a] bg-[#191919] p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#fffefe]/60">Progress</p>
                    <p className="text-xl font-bold text-[#fcb316]">{activeBooking.progress}%</p>
                  </div>
                  <div className="w-28 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#fcb316] to-[#de950c] transition-all duration-500" style={{ width: `${activeBooking.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#2a2a2a] bg-[#191919] p-4 md:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={18} className="text-[#fcb316]" />
                  <h3 className="text-lg font-semibold text-[#fffefe]">Assigned cleaners</h3>
                </div>
                {getAssignedCleaners(activeBooking).length > 0 ? (
                  <div className="space-y-3">
                    {getAssignedCleaners(activeBooking).map((cleanerName: string, index: number) => (
                      <div key={`${cleanerName}-${index}`} className="flex items-center justify-between rounded-xl border border-[#2a2a2a] bg-[#1e1e1e] px-4 py-3">
                        <div>
                          <p className="font-semibold text-[#fffefe]">{cleanerName}</p>
                          <p className="text-xs text-[#fffefe]/55">Cleaner {index + 1}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">On duty</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#fffefe]/55">Cleaners will appear here once the booking is confirmed and assigned.</p>
                )}
              </div>
            </div>
          )}
          {/* Quick actions removed for a cleaner layout */}
          {activeBooking && activeBooking.status === "In Progress" && (
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-[24px] overflow-hidden shadow-xl">
              <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                <h3 className="text-lg text-[#fffefe] font-semibold">Service progress</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {workStages.map((stage, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${stage.completed ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-[#2a2a2a] text-[#fffefe] border border-[#2a2a2a]"}`}>
                        {stage.completed ? <CheckCircle2 size={20} /> : idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${stage.completed ? "text-green-400" : "text-[#fffefe]"}`}>{stage.name}</p>
                      </div>
                      {stage.completed && <CheckCircle2 size={16} className="text-green-400" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.95fr] gap-4">
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-[24px] overflow-hidden shadow-xl">
              <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                <h3 className="text-lg text-[#fffefe] font-semibold">Your bookings</h3>
              </div>
              <div className="p-6 space-y-3">
                {bookings.length > 0 ? bookings.map((booking) => (
                  <button key={booking.id} onClick={() => setActiveBooking(booking)} className={`w-full p-4 rounded-2xl text-left transition-all border ${activeBooking?.id === booking.id ? "bg-[#fcb316]/15 border-[#fcb316]/60 text-[#fffefe]" : "bg-[#191919] border-[#2a2a2a] text-[#fffefe]/70 hover:text-[#fffefe] hover:border-[#fcb316]/30"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-base">{booking.service}</p>
                        <p className="text-sm text-[#fffefe]/55 mt-1">{booking.date} • {booking.time}</p>
                      </div>
                      <span className={statusClass(booking.status)}>{booking.status}</span>
                    </div>
                  </button>
                )) : <p className="text-[#fffefe]/50 text-center py-4">No bookings available</p>}
              </div>
            </div>

            {activeBooking && isTrackingBooking(activeBooking) && (
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-[24px] overflow-hidden shadow-xl">
                <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#fcb316]" />
                    <h3 className="text-lg text-[#fffefe] font-semibold">Team members</h3>
                  </div>
                  <p className="text-[#fffefe]/55 text-sm mt-2">Your assigned team for this booking.</p>
                </div>
                <div className="p-6 grid gap-4 md:grid-cols-1">
                  {getAssignedCleaners(activeBooking).length > 0 ? (
                    getAssignedCleaners(activeBooking).map((cleanerName: string, idx: number) => (
                      <div key={idx} className="p-4 bg-[#191919] border border-[#2a2a2a] rounded-2xl hover:border-[#fcb316]/50 transition-all flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#fffefe]">{cleanerName}</p>
                          <p className="text-xs text-[#fffefe]/60 mt-1">Assigned cleaner</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#fffefe]/55">No cleaners assigned yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-8 w-full max-w-md">
            <h2 className="text-2xl text-[#fffefe] font-bold mb-6">Send Message</h2>
            {messageSent ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-green-400 mx-auto mb-4" />
                <p className="text-[#fffefe] font-semibold">Message sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <Label htmlFor="subject" className="text-[#fffefe]">Subject</Label>
                  <Input id="subject" value={messageSubject} onChange={(e) => setMessageSubject(e.target.value)} placeholder="Enter subject" className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-[#fffefe]">Message</Label>
                  <Textarea id="message" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} placeholder="Enter your message" className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 min-h-32" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold"><Send size={16} className="mr-2" /> Send</Button>
                  <Button type="button" onClick={() => setShowMessageModal(false)} className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold">Cancel</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}



