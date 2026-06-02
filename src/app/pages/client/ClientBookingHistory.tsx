import { useEffect, useState } from "react";
import { Link } from "react-router";
import ClientSidebar from "../../components/ClientSidebar";
import { Button } from "../../components/ui/button";
import { ArrowRight, BadgeCheck, Download, MapPin } from "lucide-react";
import { formatBookingCode } from "../../../data/mockData";

const samplePastBookings = [
  {
    id: "BK-9801",
    service: "Deep Cleaning",
    date: "Apr 09, 2026",
    time: "09:00 AM",
    status: "Completed",
    address: "123 Main St",
    amount: "PHP 4,500",
    rating: "5.0",
    notes: "Kitchen, bathrooms, and windows were cleaned thoroughly."
  },
  {
    id: "BK-9802",
    service: "Regular Maintenance",
    date: "Mar 28, 2026",
    time: "01:00 PM",
    status: "Completed",
    address: "456 Oak Ave",
    amount: "PHP 2,200",
    rating: "4.8",
    notes: "Quick turnaround with strong attention to detail."
  },
  {
    id: "BK-9803",
    service: "Move-Out Cleaning",
    date: "Mar 14, 2026",
    time: "08:30 AM",
    status: "Completed",
    address: "789 Sunset Blvd",
    amount: "PHP 5,200",
    rating: "5.0",
    notes: "Deep move-out cleanup with final inspection passed."
  }
];

export default function ClientBookingHistory() {
  const [historyBookings, setHistoryBookings] = useState<any[]>([]);

  useEffect(() => {
    try {
      const userAccount = JSON.parse(localStorage.getItem("userAccount") || "null");
      if (userAccount && userAccount.email) {
        const key = `bookings_${userAccount.email.toLowerCase()}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Only show completed bookings in history
          setHistoryBookings(parsed.filter((b: any) => (b.status || "").toLowerCase().includes("completed")));
        } else {
          setHistoryBookings([]);
        }
      } else {
        setHistoryBookings([]);
      }
    } catch (err) {
      setHistoryBookings([]);
    }
  }, []);

  const statusClass = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("pending")) return "px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400";
    if (s.includes("confirmed") || s.includes("completed")) return "px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400";
    if (s.includes("scheduled")) return "px-3 py-1 rounded-full text-xs font-semibold bg-[#fcb316]/10 text-[#fcb316]";
    return "px-3 py-1 rounded-full text-xs font-semibold bg-[#2a2a2a] text-[#fffefe]/70";
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8 space-y-6">
          <div className="rounded-[28px] border border-[#2a2a2a] bg-gradient-to-br from-[#1f1f1f] via-[#1b1b1b] to-[#151515] p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[#fcb316] text-sm font-semibold uppercase tracking-[0.22em]">History</p>
                <h1 className="mt-2 text-3xl md:text-5xl text-[#fffefe] font-bold leading-tight">Past bookings</h1>
                <p className="mt-3 text-[#fffefe]/65 text-base md:text-lg">Review completed services, receipts, and booking details.</p>
              </div>
              <Link to="/client">
                <Button variant="ghost" className="px-0 text-[#fcb316] hover:text-[#ffcf61] hover:bg-transparent font-semibold">
                  Back to dashboard <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#2a2a2a] bg-[#1d1d1d] p-6 md:p-8 shadow-2xl">
            {historyBookings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#2a2a2a] p-8 text-center text-[#fffefe]/70">
                There are no past bookings.
              </div>
            ) : (
              <div className="space-y-4">
                {historyBookings.map((booking) => (
                  <div key={booking.id} className="rounded-2xl border border-[#2a2a2a] bg-[#191919] p-5 md:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[#fcb316]">
                          <BadgeCheck size={18} />
                          <span className="text-sm font-semibold uppercase tracking-[0.18em]">Completed</span>
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-[#fffefe]">{booking.service}</h2>
                        <p className="mt-2 text-[#fffefe]/60 flex items-center gap-2">
                          <MapPin size={16} className="text-[#fcb316]" />
                          {booking.address}
                        </p>
                      </div>
                      <span className={statusClass(booking.status)}>{booking.status}</span>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-4">
                      <div className="rounded-2xl border border-[#2a2a2a] bg-[#1e1e1e] p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-[#fffefe]/50">Booking ID</p>
                        <p className="mt-2 text-[#fffefe] font-semibold">{formatBookingCode(booking.id)}</p>
                      </div>
                      <div className="rounded-2xl border border-[#2a2a2a] bg-[#1e1e1e] p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-[#fffefe]/50">Date</p>
                        <p className="mt-2 text-[#fffefe] font-semibold">{booking.date}</p>
                      </div>
                      <div className="rounded-2xl border border-[#2a2a2a] bg-[#1e1e1e] p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-[#fffefe]/50">Time</p>
                        <p className="mt-2 text-[#fffefe] font-semibold">{booking.time}</p>
                      </div>
                      <div className="rounded-2xl border border-[#2a2a2a] bg-[#1e1e1e] p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-[#fffefe]/50">Amount</p>
                        <p className="mt-2 text-[#fcb316] font-semibold">{booking.amount}</p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                      <p className="text-[#fffefe]/65 text-sm leading-6">{booking.notes}</p>
                      <div className="flex gap-3">
                        <Button className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]">
                          <Download size={16} className="mr-2" /> Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}