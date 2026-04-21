import { Search, Eye, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const clientsData = [
  { 
    id: "CL-1001", 
    name: "Luxury Estates Ltd", 
    contact: "john@luxuryestates.com",
    phone: "+63 917 123 4567",
    address: "123 Executive Blvd, Makati City",
    lastService: "Apr 14, 2026", 
    totalJobs: 45,
    revenue: "₱12.5K",
    status: "Active",
    rating: 4.9
  },
  { 
    id: "CL-1002", 
    name: "Premium Office Park", 
    contact: "admin@premiumoffice.com",
    phone: "+63 917 234 5678",
    address: "456 Business Ave, Cebu City",
    lastService: "Apr 15, 2026", 
    totalJobs: 32,
    revenue: "₱8.2K",
    status: "Active",
    rating: 4.7
  },
  { 
    id: "CL-1003", 
    name: "Grand Hotel Group", 
    contact: "facilities@grandhotel.com",
    phone: "+63 917 345 6789",
    address: "789 Hospitality Way, Davao City",
    lastService: "Apr 13, 2026", 
    totalJobs: 67,
    revenue: "₱15.8K",
    status: "Active",
    rating: 5.0
  },
  { 
    id: "CL-1004", 
    name: "Elite Residences", 
    contact: "manager@eliteresidences.com",
    phone: "+63 917 456 7890",
    address: "321 Prestige Lane, Quezon City",
    lastService: "Apr 12, 2026", 
    totalJobs: 28,
    revenue: "₱6.9K",
    status: "Active",
    rating: 4.8
  },
];

export default function AdminClients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof clientsData[0] | null>(null);
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#191919]">
      {/* Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <AdminSidebar />
      </div>
      {/* Main Content */}
      <main className="flex-1 flex flex-col px-2 md:px-8 py-8 md:ml-64 transition-all duration-300">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-semibold text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
              Client Records
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              Manage your client database and service history
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fffefe]/40" size={20} />
            <Input
              placeholder="Search clients by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#222222] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]"
            />
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1e1e1e]">
                <tr>
                  <th className="px-6 py-4 text-left text-[#fffefe]/70 text-base font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>Client</th>
                  <th className="px-6 py-4 text-left text-[#fffefe]/70 text-base font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>Contact</th>
                  <th className="px-6 py-4 text-left text-[#fffefe]/70 text-base font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>Total Jobs</th>
                  <th className="px-6 py-4 text-left text-[#fffefe]/70 text-base font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>Revenue</th>
                  <th className="px-6 py-4 text-left text-[#fffefe]/70 text-base font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>Status</th>
                  <th className="px-6 py-4 text-left text-[#fffefe]/70 text-base font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-[#fffefe] font-medium" style={{ fontFamily: 'var(--font-body)' }}>{client.name}</p>
                        <p className="text-[#fffefe]/50 text-sm">{client.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-[#fffefe]/70">{client.contact}</p>
                        <p className="text-[#fffefe]/50">{client.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#fffefe] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{client.totalJobs}</td>
                    <td className="px-6 py-4 text-[#fcb316] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{client.revenue}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        onClick={() => setSelectedClient(client)}
                        className="bg-[#1e1e1e] border border-[#2a2a2a] text-[#fffefe] hover:bg-[#2a2a2a] font-semibold"
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Detail Modal/Panel */}
        {selectedClient && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50" onClick={() => setSelectedClient(null)}>
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl p-8 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-3xl text-[#fffefe] mb-6 font-semibold" style={{ fontFamily: 'var(--font-headline)' }}>
                {selectedClient.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="text-[#fcb316]" size={20} />
                    <div>
                      <p className="text-[#fffefe]/50 text-sm">Email</p>
                      <p className="text-[#fffefe]">{selectedClient.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="text-[#fcb316]" size={20} />
                    <div>
                      <p className="text-[#fffefe]/50 text-sm">Phone</p>
                      <p className="text-[#fffefe]">{selectedClient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[#fcb316]" size={20} />
                    <div>
                      <p className="text-[#fffefe]/50 text-sm">Address</p>
                      <p className="text-[#fffefe]">{selectedClient.address}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#1e1e1e] p-4 rounded-lg">
                    <p className="text-[#fffefe]/50 text-sm mb-1">Total Jobs</p>
                    <p className="text-2xl text-[#fffefe] font-semibold">{selectedClient.totalJobs}</p>
                  </div>
                  <div className="bg-[#1e1e1e] p-4 rounded-lg">
                    <p className="text-[#fffefe]/50 text-sm mb-1">Total Revenue</p>
                    <p className="text-2xl text-[#fcb316] font-semibold">{selectedClient.revenue}</p>
                  </div>
                  <div className="bg-[#1e1e1e] p-4 rounded-lg">
                    <p className="text-[#fffefe]/50 text-sm mb-1">Rating</p>
                    <p className="text-2xl text-[#fffefe] font-semibold">⭐ {selectedClient.rating}</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setSelectedClient(null)}
                className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold mt-2"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}



