import { Search, Eye, X, Download, ArrowLeft } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import ManagerSidebar from "../../components/ManagerSidebar";
import { useState } from "react";

const clients = [
  {
    id: "CL-1001", name: "Maria Santos", contact: "maria.santos@email.com", phone: "+63 917 123 4567", lastService: "Apr 14, 2026", totalJobs: 45, status: "Active", rating: 4.9,
    address: "Makati City, Metro Manila", memberSince: "Jan 2024",
    bookings: [
      { id: "BK-3401", service: "Luxe Package 2", date: "Apr 16, 2026", amount: "₱4,500", status: "In-Progress" },
      { id: "BK-3395", service: "Condominiums and Houses", date: "Apr 10, 2026", amount: "₱3,200", status: "Done" },
    ]
  },
  {
    id: "CL-1002", name: "Jose Reyes", contact: "jose.reyes@email.com", phone: "+63 918 234 5678", lastService: "Apr 15, 2026", totalJobs: 32, status: "Active", rating: 4.7,
    address: "BGC, Taguig City", memberSince: "Mar 2024",
    bookings: [
      { id: "BK-3400", service: "Offices", date: "Apr 16, 2026", amount: "₱3,200", status: "Approved" },
    ]
  },
  {
    id: "CL-1003", name: "Ana Cruz", contact: "ana.cruz@email.com", phone: "+63 919 345 6789", lastService: "Apr 13, 2026", totalJobs: 67, status: "Active", rating: 5.0,
    address: "Quezon City, Metro Manila", memberSince: "Oct 2023",
    bookings: [
      { id: "BK-3399", service: "Post-Construction", date: "Apr 18, 2026", amount: "₱7,800", status: "Pending" },
    ]
  },
  {
    id: "CL-1004", name: "Carlos Mendoza", contact: "carlos.m@email.com", phone: "+63 920 456 7890", lastService: "Apr 12, 2026", totalJobs: 28, status: "Active", rating: 4.8,
    address: "Ortigas, Pasig City", memberSince: "Jun 2024",
    bookings: [
      { id: "BK-3398", service: "Luxe Package 1", date: "Apr 15, 2026", amount: "₱3,200", status: "Done" },
    ]
  },
];

type Client = typeof clients[0];

export default function ManagerClients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewClient, setViewClient] = useState<Client | null>(null);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColor: Record<string, string> = {
    "In-Progress": "bg-[#fcb316]/20 text-[#fcb316]",
    Done: "bg-green-500/20 text-green-500",
    Approved: "bg-blue-400/20 text-blue-400",
    Pending: "bg-yellow-400/20 text-yellow-400",
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ManagerSidebar />
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>Client Records</h1>
              <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>View-only access to client information</p>
            </div>
            <div className="hidden md:block text-xs text-[#fcb316] uppercase tracking-[0.2em]">Manager</div>
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fffefe]/40" size={20} />
              <Input placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-[#222222] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]" />
            </div>
            <div className="text-sm text-[#fffefe]/50">{filtered.length} clients</div>
          </div>

          <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Client</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Contact</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Last Service</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Total Jobs</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Rating</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((client) => (
                    <tr key={client.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-[#fffefe]">{client.name}</p>
                        <p className="text-[#fffefe]/50 text-sm">{client.id}</p>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]/70 text-sm">{client.contact}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{client.lastService}</td>
                      <td className="px-6 py-4 text-[#fffefe]">{client.totalJobs}</td>
                      <td className="px-6 py-4 text-[#fcb316]">⭐ {client.rating}</td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#2a2a2a] text-[#fffefe] bg-[#1e1e1e] hover:bg-[#2a2a2a]"
                          onClick={() => setViewClient(client)}
                        >
                          <Eye size={16} className="mr-2" />View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

      {/* Client Detail Modal */}
      {viewClient && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setViewClient(null)}
                className="flex items-center gap-2 text-[#fffefe] bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-2 rounded-full hover:border-[#fcb316] transition"
                style={{ fontFamily: 'var(--font-subheading)' }}
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Client Details</h3>
                <button onClick={() => setViewClient(null)} className="text-[#fffefe]/50 hover:text-[#fffefe]"><X size={22} /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Full Name", value: viewClient.name },
                { label: "Client ID", value: viewClient.id },
                { label: "Email", value: viewClient.contact },
                { label: "Phone", value: viewClient.phone },
                { label: "Address", value: viewClient.address },
                { label: "Member Since", value: viewClient.memberSince },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1e1e1e] p-3 rounded-lg">
                  <p className="text-[#fffefe]/50 text-xs mb-1">{label}</p>
                  <p className="text-[#fffefe] text-sm">{value}</p>
                </div>
              ))}
            </div>

            <h4 className="text-[#fcb316] text-sm mb-3" style={{ fontFamily: 'var(--font-subheading)' }}>BOOKING HISTORY</h4>
            <div className="space-y-3 mb-6">
              {viewClient.bookings.map((bk) => (
                <div key={bk.id} className="bg-[#1e1e1e] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#fffefe] text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>{bk.id}</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${statusColor[bk.status] || "bg-gray-500/20 text-gray-400"}`}>{bk.status}</span>
                  </div>
                  <p className="text-[#fffefe]/70 text-sm">{bk.service}</p>
                  <div className="flex justify-between text-xs text-[#fffefe]/50 mt-1">
                    <span>{bk.date}</span>
                    <span className="text-[#fcb316]">{bk.amount}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sample Receipt */}
            <div className="bg-[#1e1e1e] border border-[#fcb316]/30 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#fffefe] text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>Latest Receipt</p>
                  <p className="text-[#fffefe]/50 text-xs mt-0.5">{viewClient.bookings[0]?.id} – {viewClient.bookings[0]?.amount}</p>
                </div>
                <Button size="sm" className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]">
                  <Download size={14} className="mr-1" />Download
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full border-[#2a2a2a] text-[#fffefe] font-semibold bg-[#222] hover:bg-[#333]" onClick={() => setViewClient(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}



