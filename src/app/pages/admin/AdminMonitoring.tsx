import AdminSidebar from "../../components/AdminSidebar";
import { Clock, CheckCircle, Loader, AlertCircle, Circle, CheckCircle2 } from "lucide-react";

const bookings = [
  {
    id: "BK-3401",
    client: "Maria Santos",
    service: "Luxe Package 2",
    date: "Apr 16, 2026",
    time: "09:00 AM",
    status: "In-Progress",
    progress: 65,
    checklist: [
      { task: "Prepare cleaning tools and supplies", done: true },
      { task: "Deep clean living room and hallway", done: true },
      { task: "Kitchen detail cleaning", done: false },
      { task: "Final quality walkthrough", done: false },
    ],
  },
  {
    id: "BK-3400",
    client: "Jose Reyes",
    service: "Condominiums and Houses",
    date: "Apr 16, 2026",
    time: "11:00 AM",
    status: "Approved",
    progress: 0,
    checklist: [
      { task: "Assign staff members", done: true },
      { task: "Prepare service materials", done: false },
      { task: "Confirm schedule with client", done: false },
    ],
  },
  {
    id: "BK-3399",
    client: "Ana Cruz",
    service: "Offices",
    date: "Apr 16, 2026",
    time: "02:00 PM",
    status: "Pending",
    progress: 0,
    checklist: [
      { task: "Manager approval", done: false },
      { task: "Assign staff members", done: false },
      { task: "Dispatch checklist packet", done: false },
    ],
  },
  {
    id: "BK-3398",
    client: "Carlos Mendoza",
    service: "Luxe Package 1",
    date: "Apr 15, 2026",
    time: "09:00 AM",
    status: "Done",
    progress: 100,
    checklist: [
      { task: "Set up cleaning materials", done: true },
      { task: "Service execution", done: true },
      { task: "Final quality check", done: true },
    ],
  },
  {
    id: "BK-3397",
    client: "Elena Torres",
    service: "Post-Construction",
    date: "Apr 15, 2026",
    time: "01:00 PM",
    status: "Done",
    progress: 100,
    checklist: [
      { task: "Dust and debris removal", done: true },
      { task: "Surface sanitization", done: true },
      { task: "Client handover", done: true },
    ],
  },
  {
    id: "BK-3396",
    client: "Marco Villanueva",
    service: "Car Interior Detailing",
    date: "Apr 16, 2026",
    time: "03:00 PM",
    status: "Pending",
    progress: 0,
    checklist: [
      { task: "Manager approval", done: false },
      { task: "Assign detailing crew", done: false },
      { task: "Prepare equipment", done: false },
    ],
  },
];

const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  Pending: { color: "text-yellow-400", bg: "bg-yellow-400/20", icon: Clock },
  Approved: { color: "text-blue-400", bg: "bg-blue-400/20", icon: AlertCircle },
  "In-Progress": { color: "text-[#fcb316]", bg: "bg-[#fcb316]/20", icon: Loader },
  Done: { color: "text-green-500", bg: "bg-green-500/20", icon: CheckCircle },
};

const statusGroups = ["Pending", "Approved", "In-Progress", "Done"];

export default function AdminMonitoring() {
  const grouped = statusGroups.map(status => ({
    status,
    items: bookings.filter(b => b.status === status),
    ...statusConfig[status],
  }));

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <AdminSidebar />
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
              Booking Monitoring
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              Track all booking statuses in real-time
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {grouped.map(({ status, color, bg, icon: Icon }) => (
              <div key={status} className="bg-[#222222] border border-[#2a2a2a] p-5 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[#fffefe]/60 text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>{status}</p>
                  <div className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center`}>
                    <Icon className={color} size={16} />
                  </div>
                </div>
                <p className={`text-3xl ${color}`} style={{ fontFamily: 'var(--font-headline)' }}>
                  {bookings.filter(b => b.status === status).length}
                </p>
              </div>
            ))}
          </div>

          {/* Booking Cards by Status */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {grouped.map(({ status, color, bg, icon: Icon, items }) => (
              <div key={status} className="bg-[#222222] border border-[#2a2a2a] rounded-lg overflow-hidden">
                <div className={`p-4 border-b border-[#2a2a2a] flex items-center gap-2`}>
                  <div className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center`}>
                    <Icon className={color} size={16} />
                  </div>
                  <h2 className="text-lg text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{status}</h2>
                  <span className={`ml-auto px-2 py-1 ${bg} ${color} text-xs rounded-full`}>{items.length}</span>
                </div>
                <div className="p-3 space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {items.length === 0 && (
                    <p className="text-[#fffefe]/40 text-sm text-center py-6">No bookings</p>
                  )}
                  {items.map((booking) => (
                    <div key={booking.id} className="bg-[#1e1e1e] p-4 rounded-lg border border-[#2a2a2a]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#fffefe] text-sm font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>{booking.id}</span>
                        <span className={`px-2 py-0.5 ${bg} ${color} text-xs rounded-full`}>{status}</span>
                      </div>
                      <p className="text-[#fffefe]/80 text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>{booking.client}</p>
                      <p className="text-[#fffefe]/50 text-xs mb-1">{booking.service}</p>
                      <p className="text-[#fffefe]/50 text-xs">{booking.date} · {booking.time}</p>

                      {(booking.status === "In-Progress" || booking.status === "Done") && (
                        <div className="mt-3 bg-[#191919] border border-[#2a2a2a] rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[11px] text-[#fffefe]/55 uppercase tracking-wide">Staff Checklist</p>
                            <p className="text-[11px] text-[#fffefe]/60">
                              {booking.checklist.filter(item => item.done).length}/{booking.checklist.length} checked
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            {booking.checklist.map((item, index) => (
                              <div key={`${booking.id}-check-${index}`} className="flex items-start gap-2">
                                {item.done ? (
                                  <CheckCircle2 size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <Circle size={13} className="text-[#fffefe]/35 mt-0.5 flex-shrink-0" />
                                )}
                                <p className={`text-xs leading-relaxed ${item.done ? "text-[#fffefe]/80" : "text-[#fffefe]/55"}`}>
                                  {item.task}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {booking.status === "In-Progress" && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-[#fffefe]/50 mb-1">
                            <span>Progress</span>
                            <span className="text-[#fcb316]">{booking.progress}%</span>
                          </div>
                          <div className="w-full bg-[#2a2a2a] rounded-full h-1.5">
                            <div className="bg-[#fcb316] h-1.5 rounded-full" style={{ width: `${booking.progress}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
