import StaffSidebar from "../../components/StaffSidebar";
import { Image as ImageIcon, Sparkles, ArrowRightLeft, Calendar, MapPin } from "lucide-react";
import Logo from "../../components/Logo";
import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import eliteBeforeImage from "../../components/assets/images/lilymess.jpg";
import eliteAfterImage from "../../components/assets/images/lilymessafter.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

type GalleryJob = {
  id: number;
  jobRef: string;
  client: string;
  location: string;
  date: string;
  service: string;
  beforeUrl: string;
  afterUrl: string;
  improvement: string;
};

const galleryJobs: GalleryJob[] = [
  {
    id: 1,
    jobRef: "JOB-2845",
    client: "Elite Residences",
    location: "Los Angeles, CA",
    date: "Apr 15, 2026",
    service: "Luxury Home Deep Cleaning",
    beforeUrl: eliteBeforeImage,
    afterUrl: eliteAfterImage,
    improvement: "Dust-heavy surfaces restored, polished finish across all living areas.",
  },
  {
    id: 2,
    jobRef: "JOB-2842",
    client: "Luxury Estates Ltd",
    location: "Manhattan, NY",
    date: "Apr 14, 2026",
    service: "Move-out Condo Turnover",
    beforeUrl: "https://images.pexels.com/photos/5591834/pexels-photo-5591834.jpeg?auto=compress&cs=tinysrgb&w=1200",
    afterUrl: "https://images.pexels.com/photos/4108782/pexels-photo-4108782.jpeg?auto=compress&cs=tinysrgb&w=1200",
    improvement: "Sanitized kitchen and bathroom zones, clear mirrors and glass finishes.",
  },
  {
    id: 3,
    jobRef: "JOB-2840",
    client: "Grand Hotel Group",
    location: "Miami, FL",
    date: "Apr 13, 2026",
    service: "Post-event Room Reset",
    beforeUrl: "https://images.pexels.com/photos/6197047/pexels-photo-6197047.jpeg?auto=compress&cs=tinysrgb&w=1200",
    afterUrl: "https://images.pexels.com/photos/4108713/pexels-photo-4108713.jpeg?auto=compress&cs=tinysrgb&w=1200",
    improvement: "Floor care and furniture reset completed with hotel-ready presentation.",
  },
];

export default function StaffGallery() {
  const [activeViewByJob, setActiveViewByJob] = useState<Record<number, "before" | "after">>(
    galleryJobs.reduce<Record<number, "before" | "after">>((acc, job) => {
      acc[job.id] = "before";
      return acc;
    }, {}),
  );
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [comparisonReveal, setComparisonReveal] = useState(50);

  const selectedJob = useMemo(() => {
    return galleryJobs.find((job) => job.id === selectedJobId) ?? null;
  }, [selectedJobId]);

  const getActiveImage = (job: GalleryJob) => {
    return activeViewByJob[job.id] === "after" ? job.afterUrl : job.beforeUrl;
  };

  const openComparison = (jobId: number) => {
    setSelectedJobId(jobId);
    setComparisonReveal(50);
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
              Job Gallery
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              Before and after highlights from completed services
            </p>
          </div>

          {/* Gallery Cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            {galleryJobs.map((job) => {
              const activeView = activeViewByJob[job.id];

              return (
                <div
                  key={job.id}
                  className="bg-[#222222] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#fcb316]/60 transition-all duration-300"
                >
                  <div className="p-4 md:p-5 border-b border-[#2a2a2a] bg-gradient-to-r from-[#222222] to-[#1e1e1e]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[#fcb316] text-xs uppercase tracking-wide">{job.jobRef}</p>
                        <h3 className="text-[#fffefe] text-xl" style={{ fontFamily: 'var(--font-subheading)' }}>{job.client}</h3>
                        <p className="text-[#fffefe]/60 text-sm mt-1">{job.service}</p>
                      </div>
                      <div className="text-right text-sm text-[#fffefe]/65">
                        <p className="inline-flex items-center gap-1"><Calendar size={14} /> {job.date}</p>
                        <p className="inline-flex items-center gap-1 mt-1"><MapPin size={14} /> {job.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setActiveViewByJob((prev) => ({ ...prev, [job.id]: "before" }))}
                        className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                          activeView === "before"
                            ? "bg-[#fcb316] text-[#191919] border-[#fcb316]"
                            : "bg-[#1e1e1e] text-[#fffefe]/70 border-[#2a2a2a] hover:border-[#fcb316]/50"
                        }`}
                      >
                        Before
                      </button>
                      <button
                        onClick={() => setActiveViewByJob((prev) => ({ ...prev, [job.id]: "after" }))}
                        className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                          activeView === "after"
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-[#1e1e1e] text-[#fffefe]/70 border-[#2a2a2a] hover:border-green-500/50"
                        }`}
                      >
                        After
                      </button>
                    </div>

                    <div className="relative rounded-lg overflow-hidden border border-[#2a2a2a]">
                      <img
                        src={getActiveImage(job)}
                        alt={`${job.jobRef} ${activeView} photo`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full ${
                            activeView === "after"
                              ? "bg-green-500/90 text-white"
                              : "bg-[#fcb316]/90 text-[#191919]"
                          }`}
                        >
                          {activeView === "after" ? "After Service" : "Before Service"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => setActiveViewByJob((prev) => ({ ...prev, [job.id]: "before" }))}
                        className="rounded-md overflow-hidden border border-[#2a2a2a] hover:border-[#fcb316]/60 transition-colors"
                      >
                        <img src={job.beforeUrl} alt={`${job.jobRef} before thumbnail`} className="h-20 w-full object-cover" />
                      </button>
                      <button
                        onClick={() => setActiveViewByJob((prev) => ({ ...prev, [job.id]: "after" }))}
                        className="rounded-md overflow-hidden border border-[#2a2a2a] hover:border-green-500/60 transition-colors"
                      >
                        <img src={job.afterUrl} alt={`${job.jobRef} after thumbnail`} className="h-20 w-full object-cover" />
                      </button>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-[#1e1e1e] border border-[#2a2a2a]">
                      <p className="text-xs text-[#fcb316] uppercase tracking-wide mb-1 inline-flex items-center gap-1">
                        <Sparkles size={14} /> Improvement Summary
                      </p>
                      <p className="text-sm text-[#fffefe]/80">{job.improvement}</p>
                    </div>

                    <Button
                      onClick={() => openComparison(job.id)}
                      className="mt-4 w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919]"
                    >
                      <ArrowRightLeft size={16} /> Interactive Compare
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State (shown when no images) */}
          {galleryJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ImageIcon className="text-[#fffefe]/20 mb-4" size={64} />
              <h3 className="text-xl text-[#fffefe]/70 mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>
                No Images Yet
              </h3>
              <p className="text-[#fffefe]/50" style={{ fontFamily: 'var(--font-body)' }}>
                Upload photos when you complete jobs
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={selectedJob !== null} onOpenChange={(open) => !open && setSelectedJobId(null)}>
        <DialogContent className="bg-[#1e1e1e] border border-[#2a2a2a] text-[#fffefe] max-w-4xl">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'var(--font-subheading)' }}>
              {selectedJob?.jobRef} Before/After Comparison
            </DialogTitle>
            <DialogDescription className="text-[#fffefe]/60">
              Drag the slider to compare before and after results side by side
            </DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-4">
              <div className="relative h-[340px] rounded-lg overflow-hidden border border-[#2a2a2a]">
                <img
                  src={selectedJob.beforeUrl}
                  alt={`${selectedJob.jobRef} before`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <img
                  src={selectedJob.afterUrl}
                  alt={`${selectedJob.jobRef} after`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: `inset(0 ${100 - comparisonReveal}% 0 0)` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#fcb316]"
                  style={{ left: `${comparisonReveal}%` }}
                />
                <span className="absolute top-3 left-3 bg-[#fcb316]/90 text-[#191919] text-xs px-2 py-1 rounded-full">
                  BEFORE
                </span>
                <span className="absolute top-3 right-3 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full">
                  AFTER
                </span>
              </div>

              <div>
                <p className="text-sm text-[#fffefe]/70 mb-2">Comparison Slider</p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={comparisonReveal}
                  onChange={(e) => setComparisonReveal(Number(e.target.value))}
                  className="w-full accent-[#fcb316]"
                />
              </div>

              <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-3">
                <p className="text-xs text-[#fcb316] uppercase tracking-wide mb-1">Service Result</p>
                <p className="text-sm text-[#fffefe]/80">{selectedJob.improvement}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
