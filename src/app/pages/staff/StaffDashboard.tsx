import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import StaffSidebar from "../../components/StaffSidebar";
import { Clock, MapPin, CheckCircle, FileText } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import Logo from "../../components/Logo";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

type UpcomingJob = {
  id: string;
  client: string;
  location: string;
  time: string;
  duration: string;
  date: string;
  serviceType: string;
  assignedTeam: string;
  contactPerson: string;
  notes: string;
};

type InProgressJob = {
  id: string;
  client: string;
  location: string;
  startTime: string;
  duration: string;
  serviceType: string;
  assignedTeam: string;
  contactPerson: string;
  notes: string;
  checklist: string[];
};

type CompletedJob = {
  id: string;
  client: string;
  location: string;
  completedAt: string;
  rating: number;
  serviceType: string;
  assignedTeam: string;
  contactPerson: string;
  notes: string;
};

const upcomingJobs: UpcomingJob[] = [
  {
    id: "JOB-2848",
    client: "Premium Office Park",
    location: "Pasay City, Metro Manila, Philippines",
    time: "11:00 AM",
    duration: "2h",
    date: "Apr 16, 2026",
    serviceType: "Office Deep Cleaning",
    assignedTeam: "Sarah Johnson, Mike Chen",
    contactPerson: "Diane Holmes - Facilities Manager",
    notes: "Focus on lobby glass panels and executive conference rooms.",
  },
  {
    id: "JOB-2849",
    client: "Grand Hotel Group",
    location: "Alabang, Muntinlupa, Philippines",
    time: "02:00 PM",
    duration: "4h",
    date: "Apr 17, 2026",
    serviceType: "Post-Event Turnover Cleaning",
    assignedTeam: "Sarah Johnson, Alex Ramos",
    contactPerson: "Marco Ruiz - Operations Lead",
    notes: "Prioritize ballroom floor polishing before 6:00 PM guest check-in.",
  },
];

const initialInProgressJobs: InProgressJob[] = [
  {
    id: "JOB-2847",
    client: "Luxury Estates Ltd",
    location: "Parañaque City, Metro Manila, Philippines",
    startTime: "09:00 AM",
    duration: "3h",
    serviceType: "Condo Turnover Deep Cleaning",
    assignedTeam: "Sarah Johnson, Mike Chen",
    contactPerson: "Elaine Foster - Property Admin",
    notes: "Unit 18B; include balcony glass and kitchen exhaust filters.",
    checklist: [
      "Set up safety signage and prep cleaning tools",
      "Deep vacuum all rooms and hallway",
      "Kitchen degreasing and appliance wipe-down",
      "Bathroom sanitization and tile detailing",
      "Final quality check and before/after photos",
    ],
  },
];

const initialCompletedJobs: CompletedJob[] = [
  {
    id: "JOB-2845",
    client: "Elite Residences",
    location: "Makati City, Metro Manila, Philippines",
    completedAt: "Apr 15, 2026 03:30 PM",
    rating: 5,
    serviceType: "Luxury Home Detailing",
    assignedTeam: "Sarah Johnson, Alex Ramos",
    contactPerson: "Rachel Kim - Homeowner",
    notes: "Client requested fragrance-free products only.",
  },
  {
    id: "JOB-2842",
    client: "Luxury Estates Ltd",
    location: "Quezon City, Metro Manila, Philippines",
    completedAt: "Apr 14, 2026 12:15 PM",
    rating: 5,
    serviceType: "Move-out Deep Cleaning",
    assignedTeam: "Sarah Johnson, Mike Chen",
    contactPerson: "Ethan Wells - Leasing Coordinator",
    notes: "Turnover completed ahead of schedule for same-day viewing.",
  },
];

type Job = UpcomingJob | InProgressJob | CompletedJob;

function createInitialChecklistState() {
  return initialInProgressJobs.reduce<Record<string, Record<number, boolean>>>((acc, job) => {
    acc[job.id] = job.checklist.reduce<Record<number, boolean>>((taskAcc, _task, index) => {
      taskAcc[index] = false;
      return taskAcc;
    }, {});
    return acc;
  }, {});
}

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [checklistJobId, setChecklistJobId] = useState<string | null>(null);
  const [inProgressJobs, setInProgressJobs] = useState<InProgressJob[]>(initialInProgressJobs);
  const [completedJobs, setCompletedJobs] = useState<CompletedJob[]>(initialCompletedJobs);
  const [startedJobs, setStartedJobs] = useState<Record<string, boolean>>({});
  const [jobChecklistState, setJobChecklistState] = useState<Record<string, Record<number, boolean>>>(
    createInitialChecklistState,
  );

  const allJobs = useMemo<Job[]>(() => {
    return [...upcomingJobs, ...inProgressJobs, ...completedJobs];
  }, [inProgressJobs, completedJobs]);

  const selectedJob = useMemo(() => {
    return allJobs.find((job) => job.id === selectedJobId) ?? null;
  }, [allJobs, selectedJobId]);

  const activeChecklistJob = useMemo(() => {
    return inProgressJobs.find((job) => job.id === checklistJobId) ?? null;
  }, [inProgressJobs, checklistJobId]);

  const getCompletedTaskCount = (jobId: string) => {
    const taskState = jobChecklistState[jobId] ?? {};
    return Object.values(taskState).filter(Boolean).length;
  };

  const getProgressPercent = (job: InProgressJob) => {
    const completedCount = getCompletedTaskCount(job.id);
    return Math.round((completedCount / job.checklist.length) * 100);
  };

  const openDetails = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsDetailsOpen(true);
  };

  const openChecklist = (jobId: string, startJob = false) => {
    if (startJob) {
      setStartedJobs((prev) => ({ ...prev, [jobId]: true }));
    }
    setChecklistJobId(jobId);
    setIsChecklistOpen(true);
  };

  const toggleTask = (jobId: string, taskIndex: number, checked: boolean) => {
    setJobChecklistState((prev) => ({
      ...prev,
      [jobId]: {
        ...(prev[jobId] ?? {}),
        [taskIndex]: checked,
      },
    }));
  };

  const buildCompletedAt = () => {
    return new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const markJobDone = (jobId: string) => {
    setInProgressJobs((prevJobs) => {
      const job = prevJobs.find((item) => item.id === jobId);
      if (!job) {
        return prevJobs;
      }

      const completedJob: CompletedJob = {
        id: job.id,
        client: job.client,
        location: job.location,
        completedAt: buildCompletedAt(),
        rating: 5,
        serviceType: job.serviceType,
        assignedTeam: job.assignedTeam,
        contactPerson: job.contactPerson,
        notes: job.notes,
      };

      setCompletedJobs((prevCompleted) => [completedJob, ...prevCompleted]);
      setStartedJobs((prevStarted) => {
        const next = { ...prevStarted };
        delete next[jobId];
        return next;
      });
      setJobChecklistState((prevChecklist) => {
        const next = { ...prevChecklist };
        delete next[jobId];
        return next;
      });

      if (checklistJobId === jobId) {
        setIsChecklistOpen(false);
        setChecklistJobId(null);
      }

      return prevJobs.filter((item) => item.id !== jobId);
    });
  };

  const renderRatingStars = (rating: number) => {
    const filled = "★".repeat(Math.max(0, Math.min(5, Math.round(rating))));
    const empty = "☆".repeat(Math.max(0, 5 - Math.round(rating)));
    return `${filled}${empty}`;
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <StaffSidebar />
      
      <div className="flex-1 md:ml-64 overflow-auto pb-20 md:pb-0">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-[#2a2a2a] bg-[#1e1e1e] sticky top-0 z-40">
          <Logo variant="light" size="md" />
        </div>

        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
              My Jobs
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              Welcome back, Sarah Johnson
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#1e1e1e] border border-[#2a2a2a] mb-6">
              <TabsTrigger 
                value="upcoming"
                className="data-[state=active]:bg-[#fcb316] data-[state=active]:text-[#191919] text-[#fffefe]/70"
                style={{ fontFamily: 'var(--font-subheading)' }}
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="inprogress"
                className="data-[state=active]:bg-[#fcb316] data-[state=active]:text-[#191919] text-[#fffefe]/70"
                style={{ fontFamily: 'var(--font-subheading)' }}
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="done"
                className="data-[state=active]:bg-[#fcb316] data-[state=active]:text-[#191919] text-[#fffefe]/70"
                style={{ fontFamily: 'var(--font-subheading)' }}
              >
                Done
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Jobs */}
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="bg-[#222222] border border-[#2a2a2a] p-4 md:p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {job.id}
                      </h3>
                      <p className="text-[#fffefe]/70">{job.client}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                      Scheduled
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#fffefe]/70">
                      <MapPin size={16} className="text-[#fcb316]" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#fffefe]/70">
                      <Clock size={16} className="text-[#fcb316]" />
                      <span className="text-sm">{job.date} at {job.time} • {job.duration}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => openDetails(job.id)}
                    className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919]"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </TabsContent>

            {/* In Progress Jobs */}
            <TabsContent value="inprogress" className="space-y-4">
              {inProgressJobs.map((job) => (
                <div key={job.id} className="bg-[#222222] border border-[#2a2a2a] p-4 md:p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {job.id}
                      </h3>
                      <p className="text-[#fffefe]/70">{job.client}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        startedJobs[job.id]
                          ? "bg-[#fcb316]/20 text-[#fcb316]"
                          : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {startedJobs[job.id] ? "In Progress" : "Ready to Start"}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#fffefe]/70">
                      <MapPin size={16} className="text-[#fcb316]" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#fffefe]/70">
                      <Clock size={16} className="text-[#fcb316]" />
                      <span className="text-sm">
                        {startedJobs[job.id] ? `Started at ${job.startTime}` : `Scheduled for ${job.startTime}`}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#fffefe]/70 text-sm">Progress</span>
                      <span className="text-[#fcb316]">{getProgressPercent(job)}%</span>
                    </div>
                    <div className="w-full bg-[#1e1e1e] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#fcb316] to-[#de950c] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercent(job)}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#fffefe]/60 mt-2">
                      {getCompletedTaskCount(job.id)} of {job.checklist.length} checklist items completed
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      onClick={() => openChecklist(job.id, !startedJobs[job.id])}
                      className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919]"
                    >
                      {startedJobs[job.id] ? "Open Checklist" : "Start Job"}
                    </Button>
                    <Button
                      onClick={() => openDetails(job.id)}
                      className="w-full border border-[#2a2a2a] bg-[#1e1e1e] hover:bg-[#2a2a2a] text-[#fffefe]"
                    >
                      View Details
                    </Button>
                  </div>

                  {startedJobs[job.id] && getProgressPercent(job) === 100 && (
                    <Button
                      onClick={() => markJobDone(job.id)}
                      className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      Mark as Done
                    </Button>
                  )}
                </div>
              ))}

              {inProgressJobs.length === 0 && (
                <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg text-center">
                  <p className="text-[#fffefe]/70">No active in-progress jobs at the moment.</p>
                </div>
              )}
            </TabsContent>

            {/* Completed Jobs */}
            <TabsContent value="done" className="space-y-4">
              {completedJobs.map((job) => (
                <div key={job.id} className="bg-[#222222] border border-[#2a2a2a] p-4 md:p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {job.id}
                      </h3>
                      <p className="text-[#fffefe]/70">{job.client}</p>
                    </div>
                    <CheckCircle className="text-green-500" size={24} />
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#fffefe]/70">
                      <MapPin size={16} className="text-[#fcb316]" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#fffefe]/70">
                      <Clock size={16} className="text-[#fcb316]" />
                      <span className="text-sm">Completed: {job.completedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#fffefe]/70 text-sm">Client Rating:</span>
                      <span className="text-[#fcb316]">{renderRatingStars(job.rating)} {job.rating}/5</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      onClick={() => openDetails(job.id)}
                      className="w-full border border-[#2a2a2a] bg-[#1e1e1e] hover:bg-[#2a2a2a] text-[#fffefe]"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => navigate(`/staff/reports?jobRef=${encodeURIComponent(job.id)}`)}
                      className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919]"
                    >
                      <FileText size={16} /> Generate Report
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-[#1e1e1e] border border-[#2a2a2a] text-[#fffefe] max-w-2xl">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-subheading)" }}>
              Job Details - {selectedJob?.id}
            </DialogTitle>
            <DialogDescription className="text-[#fffefe]/60">
              Full information for this assigned service job
            </DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-[#fffefe]/50 mb-1">Client</p>
                  <p>{selectedJob.client}</p>
                </div>
                <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-[#fffefe]/50 mb-1">Location</p>
                  <p>{selectedJob.location}</p>
                </div>
                <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-[#fffefe]/50 mb-1">Service Type</p>
                  <p>{selectedJob.serviceType}</p>
                </div>
                <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-[#fffefe]/50 mb-1">Assigned Team</p>
                  <p>{selectedJob.assignedTeam}</p>
                </div>
                <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3 sm:col-span-2">
                  <p className="text-xs text-[#fffefe]/50 mb-1">On-Site Contact</p>
                  <p>{selectedJob.contactPerson}</p>
                </div>
              </div>

              {"date" in selectedJob && "time" in selectedJob && (
                <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-[#fffefe]/50 mb-1">Schedule</p>
                  <p>
                    {selectedJob.date} at {selectedJob.time} - {selectedJob.duration}
                  </p>
                </div>
              )}

              {"startTime" in selectedJob && (
                <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                  <p className="text-xs text-[#fffefe]/50 mb-1">Start Window</p>
                  <p>
                    {selectedJob.startTime} - {selectedJob.duration}
                  </p>
                </div>
              )}

              {"completedAt" in selectedJob && (
                <>
                  <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                    <p className="text-xs text-[#fffefe]/50 mb-1">Completed At</p>
                    <p>{selectedJob.completedAt}</p>
                  </div>
                  <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                    <p className="text-xs text-[#fffefe]/50 mb-1">Client Rating</p>
                    <p className="text-[#fcb316]">
                      {renderRatingStars(selectedJob.rating)} {selectedJob.rating}/5
                    </p>
                  </div>
                </>
              )}

              <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                <p className="text-xs text-[#fffefe]/50 mb-1">Special Notes</p>
                <p className="text-[#fffefe]/85">{selectedJob.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isChecklistOpen} onOpenChange={setIsChecklistOpen}>
        <DialogContent className="bg-[#1e1e1e] border border-[#2a2a2a] text-[#fffefe] max-w-2xl">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-subheading)" }}>
              {activeChecklistJob?.id} Checklist
            </DialogTitle>
            <DialogDescription className="text-[#fffefe]/60">
              Complete each task to update job progress automatically
            </DialogDescription>
          </DialogHeader>

          {activeChecklistJob && (
            <div className="space-y-4">
              <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#fffefe]/70">Current Progress</p>
                  <p className="text-[#fcb316] font-semibold">{getProgressPercent(activeChecklistJob)}%</p>
                </div>
                <div className="w-full bg-[#1e1e1e] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#fcb316] to-[#de950c] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercent(activeChecklistJob)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[320px] overflow-auto pr-1">
                {activeChecklistJob.checklist.map((task, index) => {
                  const checked = jobChecklistState[activeChecklistJob.id]?.[index] ?? false;

                  return (
                    <label
                      key={task}
                      className="flex items-start gap-3 bg-[#222222] border border-[#2a2a2a] rounded-lg p-4 cursor-pointer hover:border-[#fcb316]/50 transition-colors"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => toggleTask(activeChecklistJob.id, index, value === true)}
                        className="mt-0.5 border-[#fcb316]/50 data-[state=checked]:bg-[#fcb316] data-[state=checked]:text-[#191919]"
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${checked ? "text-[#fffefe]" : "text-[#fffefe]/80"}`}>{task}</p>
                        <p className="text-xs text-[#fffefe]/45 mt-1">Task {index + 1} of {activeChecklistJob.checklist.length}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {getProgressPercent(activeChecklistJob) === 100 && (
                <>
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-300">
                    <CheckCircle size={18} />
                    <p className="text-sm">All tasks are complete. You can now mark this job as done.</p>
                  </div>
                  <Button
                    onClick={() => markJobDone(activeChecklistJob.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Mark as Done
                  </Button>
                </>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setIsChecklistOpen(false)}
                  className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
