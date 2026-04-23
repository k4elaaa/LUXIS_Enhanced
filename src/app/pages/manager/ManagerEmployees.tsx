import { Search, TrendingUp, Eye, X, Star } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import ManagerSidebar from "../../components/ManagerSidebar";
import { useState } from "react";

const employees = [
  {
    id: "ST-2001", name: "Liza Mendoza", role: "Senior Cleaner", attendance: "98%", performance: 4.9, jobs: 124, onTime: "96%",
    tasks: [
      { job: "JOB-2845", service: "Deep Cleaning", date: "Apr 15", rating: 5 },
      { job: "JOB-2840", service: "Post-Construction", date: "Apr 12", rating: 5 },
      { job: "JOB-2835", service: "Offices", date: "Apr 10", rating: 4 },
    ]
  },
  {
    id: "ST-2002", name: "Jose Villanueva", role: "Team Lead", attendance: "100%", performance: 4.8, jobs: 156, onTime: "98%",
    tasks: [
      { job: "JOB-2845", service: "Deep Cleaning", date: "Apr 15", rating: 5 },
      { job: "JOB-2838", service: "Regular Maintenance", date: "Apr 11", rating: 5 },
    ]
  },
  {
    id: "ST-2003", name: "Maricel Bautista", role: "Specialist", attendance: "97%", performance: 5.0, jobs: 98, onTime: "100%",
    tasks: [
      { job: "JOB-2843", service: "Luxury Condo", date: "Apr 14", rating: 5 },
      { job: "JOB-2837", service: "Move-in Cleaning", date: "Apr 09", rating: 5 },
    ]
  },
  {
    id: "ST-2004", name: "Ramon Castillo", role: "Cleaner", attendance: "95%", performance: 4.7, jobs: 87, onTime: "94%",
    tasks: [
      { job: "JOB-2840", service: "Office Cleaning", date: "Apr 13", rating: 3 },
      { job: "JOB-2833", service: "Regular Maintenance", date: "Apr 08", rating: 5 },
    ]
  },
  {
    id: "ST-2005", name: "Sofia Ramirez", role: "Senior Cleaner", attendance: "99%", performance: 4.9, jobs: 142, onTime: "97%",
    tasks: [
      { job: "JOB-2838", service: "Luxury Estates", date: "Apr 12", rating: 5 },
      { job: "JOB-2830", service: "Car Detailing", date: "Apr 07", rating: 5 },
    ]
  },
  {
    id: "ST-2006", name: "Paolo Navarro", role: "Team Lead", attendance: "100%", performance: 4.8, jobs: 167, onTime: "99%",
    tasks: [
      { job: "JOB-2838", service: "Grand Hotel", date: "Apr 12", rating: 5 },
      { job: "JOB-2825", service: "Post-Construction", date: "Apr 05", rating: 4 },
    ]
  },
];

type Employee = typeof employees[0];

export default function ManagerEmployees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ManagerSidebar />
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          <div className="mb-8">
            <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>Employee Records</h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Monitor attendance and performance metrics</p>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fffefe]/40" size={20} />
              <Input placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-[#222222] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]" />
            </div>
          </div>

          <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Employee</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Role</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Attendance</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>On-Time</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Jobs</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Performance</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp) => (
                    <tr key={emp.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-[#fffefe]">{emp.name}</p>
                        <p className="text-[#fffefe]/50 text-sm">{emp.id}</p>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{emp.role}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#fffefe]">{emp.attendance}</span>
                          {parseFloat(emp.attendance) >= 98 && <TrendingUp className="text-green-500" size={16} />}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]">{emp.onTime}</td>
                      <td className="px-6 py-4 text-[#fffefe]">{emp.jobs}</td>
                      <td className="px-6 py-4 text-[#fcb316]">⭐ {emp.performance}</td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#2a2a2a] text-[#fffefe] bg-[#1e1e1e] hover:bg-[#2a2a2a]"
                          onClick={() => setViewEmployee(emp)}
                        >
                          <Eye size={14} className="mr-1" />View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

      {/* Employee Detail Modal */}
      {viewEmployee && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{viewEmployee.name}</h3>
              <button onClick={() => setViewEmployee(null)} className="text-[#fffefe]/40 hover:text-[#fffefe]"><X size={24} /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Jobs", value: String(viewEmployee.jobs) },
                { label: "Attendance", value: viewEmployee.attendance },
                { label: "On-Time", value: viewEmployee.onTime },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1e1e1e] p-3 rounded-lg text-center">
                  <p className="text-[#fffefe]/50 text-xs mb-1">{label}</p>
                  <p className="text-[#fcb316] text-xl" style={{ fontFamily: 'var(--font-headline)' }}>{value}</p>
                </div>
              ))}
            </div>

            <h4 className="text-[#fcb316] text-sm mb-3" style={{ fontFamily: 'var(--font-subheading)' }}>ASSIGNED TASKS & RATINGS</h4>
            <div className="space-y-3">
              {viewEmployee.tasks.map((task, i) => (
                <div key={i} className="bg-[#1e1e1e] p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-[#fffefe] text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>{task.job}</p>
                    <p className="text-[#fffefe]/60 text-xs">{task.service} · {task.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} className={idx < task.rating ? "fill-[#fcb316] text-[#fcb316]" : "text-[#fffefe]/20"} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 border-[#2a2a2a] text-[#fffefe] font-semibold bg-[#222] hover:bg-[#333]" onClick={() => setViewEmployee(null)}>
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



