import ClientSidebar from "../../components/ClientSidebar";
import { MessageCircle, Map, Send, Phone, MapPin, Clock, Users, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

export default function ClientTracking() {
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const booking = localStorage.getItem("currentBooking");
    if (booking) {
      setActiveBooking(JSON.parse(booking));
    }

    const savedBookings = localStorage.getItem("allBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings([
        { id: "BK-3401", service: "Deep Cleaning", date: "Apr 18, 2026", time: "10:00 AM", status: "In Progress", address: "Quezon City", progress: 65 },
        { id: "BK-3402", service: "Regular Maintenance", date: "Apr 22, 2026", time: "02:00 PM", status: "Scheduled", address: "456 Oak Ave", progress: 0 },
      ]);
      setActiveBooking({ id: "BK-3401", service: "Deep Cleaning", date: "Apr 18, 2026", time: "10:00 AM", status: "In Progress", address: "Quezon City", progress: 65 });
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

  const teamMembers = [
    { name: "Liza Mendoza", role: "Lead Cleaner", phone: "+63 917 010 0101", status: "Active" },
    { name: "Jose Villanueva", role: "Team Member", phone: "+63 917 010 0102", status: "Active" },
    { name: "Maricel Bautista", role: "Inspector", phone: "+63 917 010 0103", status: "Standby" },
  ];

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-y-auto pr-1">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          {activeBooking && activeBooking.status === "In Progress" && (
            <div className="mb-8 p-6 bg-gradient-to-r from-[#fcb316]/20 to-[#fcb316]/5 border border-[#fcb316]/30 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl text-[#fffefe] font-bold mb-2">{activeBooking.service}</h1>
                  <p className="text-[#fffefe]/60">{activeBooking.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#fffefe]/60">Service ID</p>
                  <p className="text-lg md:text-xl font-semibold text-[#fcb316]">{activeBooking.id}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock size={18} className="text-[#fcb316]" />
                  <span className="text-[#fffefe]">{activeBooking.date} • {activeBooking.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-sm text-[#fffefe]/60">Progress</p>
                    <p className="text-xl font-bold text-[#fcb316]">{activeBooking.progress}%</p>
                  </div>
                  <div className="w-24 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#fcb316] to-[#de950c] transition-all duration-500" style={{ width: `${activeBooking.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mb-8 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
              <h3 className="text-lg text-[#fffefe] font-semibold">Quick Actions</h3>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-3">
              <button onClick={() => setShowMessageModal(true)} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] rounded-lg font-semibold transition-all transform hover:scale-105">
                <MessageCircle size={18} /> Send Message
              </button>
              <button onClick={() => setShowMapModal(true)} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#191919] hover:bg-[#2a2a2a] text-[#fffefe] border border-[#2a2a2a] rounded-lg font-semibold transition-all">
                <Map size={18} /> View Live Map
              </button>
            </div>
          </div>
          {activeBooking && activeBooking.status === "In Progress" && (
            <div className="mb-8 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                <h3 className="text-lg text-[#fffefe] font-semibold">Service Progress</h3>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="col-span-1 md:col-span-2">
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                  <h3 className="text-lg text-[#fffefe] font-semibold">Your Bookings</h3>
                </div>
                <div className="p-6 space-y-3">
                  {bookings.length > 0 ? bookings.map((booking) => (
                    <button key={booking.id} onClick={() => setActiveBooking(booking)} className={`w-full p-3 rounded-lg text-left transition-all border ${activeBooking?.id === booking.id ? "bg-[#fcb316]/20 border-[#fcb316] text-[#fffefe]" : "bg-[#191919] border-[#2a2a2a] text-[#fffefe]/60 hover:text-[#fffefe]"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{booking.service}</p>
                          <p className="text-xs">{booking.date}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-[#2a2a2a] rounded">{booking.status}</span>
                      </div>
                    </button>
                  )) : <p className="text-[#fffefe]/50 text-center py-4">No bookings available</p>}
                </div>
              </div>
            </div>
            {activeBooking && activeBooking.status === "In Progress" && (
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#fcb316]" />
                    <h3 className="text-lg text-[#fffefe] font-semibold">Team Members</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="p-4 bg-[#191919] border border-[#2a2a2a] rounded-lg hover:border-[#fcb316]/50 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-[#fffefe]">{member.name}</p>
                          <p className="text-xs text-[#fffefe]/60">{member.role}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${member.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{member.status}</span>
                      </div>
                      <a href={`tel:${member.phone}`} className="inline-flex items-center gap-2 px-3 py-2 bg-[#fcb316]/10 hover:bg-[#fcb316]/20 text-[#fcb316] rounded-lg text-sm transition-all">
                        <Phone size={14} /> {member.phone}
                      </a>
                    </div>
                  ))}
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
      {showMapModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-[#fffefe] font-bold">Live Service Map</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-[#191919] border border-[#2a2a2a] rounded-lg overflow-hidden h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-[#fcb316] mx-auto mb-2 opacity-50" />
                  <p className="text-[#fffefe]/50">Live map integration coming soon</p>
                </div>
              </div>
              <div className="p-4 bg-[#191919] border border-[#2a2a2a] rounded-lg">
                <p className="text-sm text-[#fffefe]/60 mb-1">Service Location</p>
                <p className="text-[#fffefe] font-semibold">{activeBooking?.address || "Quezon City"}</p>
                <p className="text-xs text-[#fffefe]/50 mt-2">ETA: 15 minutes</p>
              </div>
              <div>
                <p className="text-sm text-[#fffefe]/60 mb-3">Assigned Team</p>
                <div className="space-y-2">
                  {teamMembers.filter((m) => m.status === "Active").map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#191919] border border-[#2a2a2a] rounded-lg">
                      <div>
                        <p className="text-[#fffefe] font-semibold">{member.name}</p>
                        <p className="text-xs text-[#fffefe]/60">{member.role}</p>
                      </div>
                      <a href={`tel:${member.phone}`} className="px-3 py-2 bg-[#fcb316]/20 hover:bg-[#fcb316]/30 rounded-lg text-[#fcb316] transition-colors">
                        <Phone size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={() => setShowMapModal(false)} className="w-full mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold">Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}



