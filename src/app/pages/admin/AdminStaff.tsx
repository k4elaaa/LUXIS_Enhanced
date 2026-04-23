import AdminSidebar from "../../components/AdminSidebar";
import { Search, UserPlus, X, Star } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useState } from "react";

const staffData = [
  { id: "ST-2001", name: "Liza Mendoza", role: "Senior Cleaner", status: "On Duty", rating: 4.9, jobs: 124, phone: "+63 917 111 2222", email: "sarah.j@neat.com", address: "Makati City, Metro Manila", joined: "Jan 15, 2024", availability: "Mon-Fri, 8AM-6PM" },
  { id: "ST-2002", name: "Jose Villanueva", role: "Team Lead", status: "Available", rating: 4.8, jobs: 156, phone: "+63 917 222 3333", email: "mike.c@neat.com", address: "BGC, Taguig City", joined: "Mar 10, 2023", availability: "Mon-Sat, 7AM-7PM" },
  { id: "ST-2003", name: "Maricel Bautista", role: "Specialist", status: "On Duty", rating: 5.0, jobs: 98, phone: "+63 917 333 4444", email: "emily.d@neat.com", address: "Quezon City, Metro Manila", joined: "Jun 01, 2024", availability: "Tue-Sun, 9AM-5PM" },
  { id: "ST-2004", name: "Ramon Castillo", role: "Cleaner", status: "Off Duty", rating: 4.7, jobs: 87, phone: "+63 917 444 5555", email: "james.w@neat.com", address: "Pasig City, Metro Manila", joined: "Sep 20, 2023", availability: "Mon-Fri, 8AM-5PM" },
  { id: "ST-2005", name: "Sofia Ramirez", role: "Senior Cleaner", status: "On Duty", rating: 4.9, jobs: 142, phone: "+63 917 555 6666", email: "lisa.m@neat.com", address: "Mandaluyong City", joined: "Feb 14, 2023", availability: "Mon-Sat, 8AM-6PM" },
  { id: "ST-2006", name: "Paolo Navarro", role: "Team Lead", status: "Available", rating: 4.8, jobs: 167, phone: "+63 917 666 7777", email: "david.b@neat.com", address: "Ortigas, Pasig City", joined: "Dec 01, 2022", availability: "Mon-Sun, 7AM-8PM" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type StaffMember = typeof staffData[0];

export default function AdminStaff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", phone: "", email: "", address: "", availability: [] as string[] });

  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDay = (day: string) => {
    setNewStaff(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <AdminSidebar />
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>Staff Management</h1>
              <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Manage your team and track performance</p>
            </div>
            <Button className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]" onClick={() => setShowAddModal(true)}>
              <UserPlus size={20} className="mr-2" />Add Staff
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fffefe]/40" size={20} />
              <Input
                placeholder="Search staff by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#222222] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]"
              />
            </div>
          </div>

          <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Staff Member</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Role</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Status</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Jobs</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Rating</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors cursor-pointer" onClick={() => setSelectedStaff(staff)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#fcb316]/20 flex items-center justify-center text-[#fcb316] text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>
                            {staff.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-body)' }}>{staff.name}</p>
                            <p className="text-[#fffefe]/50 text-sm">{staff.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{staff.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${staff.status === "On Duty" ? "bg-[#fcb316]/20 text-[#fcb316]" : staff.status === "Available" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}`}>{staff.status}</span>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]">{staff.jobs}</td>
                      <td className="px-6 py-4 text-[#fffefe]">⭐ {staff.rating}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70 text-sm">{staff.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Staff Profile</h3>
              <button onClick={() => setSelectedStaff(null)} className="text-[#fffefe]/40 hover:text-[#fffefe]"><X size={24} /></button>
            </div>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#2a2a2a]">
              <div className="w-16 h-16 rounded-full bg-[#fcb316] flex items-center justify-center text-[#191919] text-2xl" style={{ fontFamily: 'var(--font-headline)' }}>
                {selectedStaff.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-2xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{selectedStaff.name}</p>
                <p className="text-[#fffefe]/60">{selectedStaff.role} · {selectedStaff.id}</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${selectedStaff.status === "On Duty" ? "bg-[#fcb316]/20 text-[#fcb316]" : selectedStaff.status === "Available" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}`}>{selectedStaff.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Phone", value: selectedStaff.phone },
                { label: "Email", value: selectedStaff.email },
                { label: "Address", value: selectedStaff.address },
                { label: "Joined", value: selectedStaff.joined },
                { label: "Total Jobs", value: String(selectedStaff.jobs) },
                { label: "Rating", value: `⭐ ${selectedStaff.rating}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[#fffefe]/50 text-xs mb-1">{label}</p>
                  <p className="text-[#fffefe] text-sm">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-lg mt-2">
              <p className="text-[#fffefe]/50 text-xs mb-2">Availability</p>
              <p className="text-[#fffefe] text-sm">{selectedStaff.availability}</p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 border-[#2a2a2a] text-[#fffefe] font-semibold bg-[#222] hover:bg-[#333]" onClick={() => setSelectedStaff(null)}>
                Close
              </Button>
              <Button className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold">Edit Profile</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Add New Staff</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#fffefe]/40 hover:text-[#fffefe]"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#fffefe] mb-2 block">Full Name</Label>
                  <Input placeholder="Full name" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316]" />
                </div>
                <div>
                  <Label className="text-[#fffefe] mb-2 block">Role</Label>
                  <select value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} className="w-full px-3 py-2 bg-[#1e1e1e] border border-[#2a2a2a] text-[#fffefe] rounded-md focus:outline-none focus:border-[#fcb316]">
                    <option value="">Select role</option>
                    <option>Cleaner</option>
                    <option>Senior Cleaner</option>
                    <option>Specialist</option>
                    <option>Team Lead</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-[#fffefe] mb-2 block">Phone</Label>
                <Input type="number" placeholder="+63 9XX XXX XXXX" value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} className="bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316]" />
              </div>
              <div>
                <Label className="text-[#fffefe] mb-2 block">Email</Label>
                <Input type="email" placeholder="email@neat.com" value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} className="bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316]" />
              </div>
              <div>
                <Label className="text-[#fffefe] mb-2 block">Address</Label>
                <Input placeholder="City / Area" value={newStaff.address} onChange={e => setNewStaff({...newStaff, address: e.target.value})} className="bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316]" />
              </div>
              <div>
                <Label className="text-[#fffefe] mb-2 block">Availability Schedule</Label>
                <div className="flex flex-wrap gap-2">
                  {days.map(day => (
                    <button key={day} type="button" onClick={() => toggleDay(day)} className={`px-3 py-1 rounded-full text-sm transition-colors ${newStaff.availability.includes(day) ? "bg-[#fcb316] text-[#191919]" : "bg-[#1e1e1e] text-[#fffefe]/60 border border-[#2a2a2a] hover:border-[#fcb316]"}`}>
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 border-[#2a2a2a] text-[#fffefe] bg-[#222] hover:bg-[#333] font-semibold" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919]" onClick={() => setShowAddModal(false)}>Add Staff</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
