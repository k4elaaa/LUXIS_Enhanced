import ManagerSidebar from "../../components/ManagerSidebar";
import { UserPlus, Search, ChevronLeft, Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from "react";

const PACKAGE_STAFF_REQUIREMENTS: Record<string, number> = {
  "Package 1": 2,
  "Package 2": 3,
};

const jobs = [
  { id: "JOB-2847", client: "Luxury Estates Ltd", location: "Makati City", time: "09:00 AM", duration: "3h", package: "Package 1", assignedStaff: ["Liza Mendoza", "Jose Villanueva"], status: "In Progress", progress: 65 },
  { id: "JOB-2848", client: "Premium Office Park", location: "Pasay City", time: "11:00 AM", duration: "2h", package: "Package 1", assignedStaff: ["Maricel Bautista"], status: "Scheduled" },
  { id: "JOB-2849", client: "Grand Hotel Group", location: "Quezon City", time: "02:00 PM", duration: "4h", package: "Package 1", assignedStaff: [], status: "Unassigned" },
  { id: "JOB-2850", client: "Elite Residences", location: "Quezon City", time: "04:00 PM", duration: "2.5h", package: "Package 2", assignedStaff: [], status: "Unassigned" },
];

const availableStaff = [
  { id: "ST-2003", name: "Maricel Bautista", role: "Specialist", rating: 5.0, status: "Available" },
  { id: "ST-2004", name: "Ramon Castillo", role: "Cleaner", rating: 4.7, status: "Available" },
  { id: "ST-2005", name: "Sofia Ramirez", role: "Senior Cleaner", rating: 4.9, status: "Available" },
  { id: "ST-2006", name: "Paolo Navarro", role: "Team Lead", rating: 4.8, status: "Available" },
];

export default function ManagerTeams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobList, setJobList] = useState(jobs);
  const [assigningJobId, setAssigningJobId] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [notifSent, setNotifSent] = useState(false);

  const assigningJob = jobList.find(j => j.id === assigningJobId);
  const requiredStaffCount = assigningJob ? PACKAGE_STAFF_REQUIREMENTS[assigningJob.package] ?? 2 : 2;

  const toggleStaff = (name: string) => {
    setSelectedStaff((prev) => {
      if (prev.includes(name)) return prev.filter((s) => s !== name);
      if (prev.length >= requiredStaffCount) return prev;
      return [...prev, name];
    });
  };

  const handleDeploy = () => {
    if (!assigningJobId || selectedStaff.length !== requiredStaffCount) return;
    setJobList(prev => prev.map(j => j.id === assigningJobId
      ? { ...j, assignedStaff: [...selectedStaff], status: "Scheduled" }
      : j
    ));
    setNotifSent(true);
    setTimeout(() => {
      setNotifSent(false);
      setAssigningJobId(null);
      setSelectedStaff([]);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ManagerSidebar />
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>Team Deployment</h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Assign staff to jobs and manage team schedules</p>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fffefe]/40" size={20} />
              <Input placeholder="Search jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-[#222222] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl text-[#fffefe] mb-4" style={{ fontFamily: 'var(--font-subheading)' }}>Today's Jobs</h2>
              {jobList.filter(j => !searchQuery || j.id.toLowerCase().includes(searchQuery.toLowerCase()) || j.client.toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (
                <div key={job.id} className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl text-[#fffefe] mb-1">{job.id}</h3>
                      <p className="text-[#fffefe]/70">{job.client}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${job.status === "In Progress" ? "bg-[#fcb316]/20 text-[#fcb316]" : job.status === "Scheduled" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div><p className="text-[#fffefe]/50 text-sm">Location</p><p className="text-[#fffefe]">{job.location}</p></div>
                    <div><p className="text-[#fffefe]/50 text-sm">Time</p><p className="text-[#fffefe]">{job.time}</p></div>
                    <div><p className="text-[#fffefe]/50 text-sm">Duration</p><p className="text-[#fffefe]">{job.duration}</p></div>
                  </div>

                  {job.status === "In Progress" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-[#fffefe]/60 mb-1">
                        <span>Progress</span><span className="text-[#fcb316]">{(job as any).progress}%</span>
                      </div>
                      <div className="w-full bg-[#1e1e1e] rounded-full h-2">
                        <div className="bg-[#fcb316] h-2 rounded-full" style={{ width: `${(job as any).progress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-[#fffefe]/50 text-sm mb-2">Assigned Staff</p>
                    {job.assignedStaff.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {job.assignedStaff.map((staff, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#fcb316]/20 text-[#fcb316] rounded-full text-sm">{staff}</span>
                        ))}
                      </div>
                    ) : <p className="text-[#fffefe]/50 italic">No staff assigned</p>}
                  </div>

                  {job.status === "Unassigned" && (
                    <Button className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919]" onClick={() => { setAssigningJobId(job.id); setSelectedStaff([]); }}>
                      <UserPlus size={16} className="mr-2" />Assign Staff
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Available Staff Panel */}
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-6 h-fit sticky top-8">
              <h2 className="text-2xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-subheading)' }}>Available Staff</h2>
              <div className="space-y-3">
                {availableStaff.map((staff) => (
                  <div key={staff.id} className="p-4 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#fffefe]">{staff.name}</p>
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs">{staff.status}</span>
                    </div>
                    <p className="text-[#fffefe]/60 text-sm mb-1">{staff.role}</p>
                    <p className="text-[#fffefe]/70 text-sm">⭐ {staff.rating}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Staff Modal */}
      {assigningJobId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={() => setAssigningJobId(null)}
                className="flex items-center gap-2 text-[#fffefe] bg-[#1e1e1e] border border-[#2a2a2a] px-3 py-2 rounded-full hover:border-[#fcb316] transition"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <span className="px-3 py-1 rounded-full text-xs bg-[#fcb316]/15 text-[#fcb316]">{assigningJob?.package}</span>
            </div>

            <h3 className="text-3xl leading-tight text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>
              Assign Staff - {assigningJobId}
            </h3>
            <p className="text-[#fffefe]/70 mb-1 text-lg">Client: <span className="text-[#fffefe] font-medium">{assigningJob?.client}</span></p>
            <p className="text-[#fcb316] mb-5 text-sm sm:text-base" style={{ fontFamily: 'var(--font-subheading)' }}>
              Choose {requiredStaffCount} staff employees to deploy ({selectedStaff.length}/{requiredStaffCount} selected)
            </p>

            {notifSent ? (
              <div className="text-center py-8">
                <Send className="text-[#fcb316] mx-auto mb-3" size={40} />
                <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Notification sent to assigned staff!</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {availableStaff.map((staff) => (
                    <label key={staff.id} className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${selectedStaff.includes(staff.name) ? "border-[#fcb316] bg-[#fcb316]/10" : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#fcb316]/50"}`}>
                      <input
                        type="checkbox"
                        checked={selectedStaff.includes(staff.name)}
                        onChange={() => toggleStaff(staff.name)}
                        disabled={!selectedStaff.includes(staff.name) && selectedStaff.length >= requiredStaffCount}
                        className="accent-[#fcb316] disabled:opacity-50"
                      />
                      <div className="flex-1">
                        <p className="text-[#fffefe] text-lg sm:text-xl leading-tight">{staff.name}</p>
                        <p className="text-[#fffefe]/60 text-sm sm:text-base">{staff.role} · ⭐ {staff.rating}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs">{staff.status}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#2a2a2a] text-[#fffefe] bg-[#222] hover:bg-[#333] font-semibold"
                    onClick={() => setAssigningJobId(null)}
                  >
                    Back
                  </Button>
                  <Button className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919]" disabled={selectedStaff.length !== requiredStaffCount} onClick={handleDeploy}>
                    <Send size={16} className="mr-2" />Deploy
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
