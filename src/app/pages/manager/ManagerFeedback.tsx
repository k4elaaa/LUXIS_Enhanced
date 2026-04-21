import ManagerSidebar from "../../components/ManagerSidebar";
import ManagerMobileNav from "../../components/ManagerMobileNav";
import { Star, AlertTriangle, ThumbsUp, Download } from "lucide-react";
import { Button } from "../../components/ui/button";

const feedbackData = [
  { id: 1, client: "Maria Santos", job: "JOB-2845", rating: 5, comment: "Exceptional service! The team was professional and thorough.", date: "Apr 15, 2026", staff: "Sarah Johnson, Mike Chen", flagged: false },
  { id: 2, client: "Ana Cruz", job: "JOB-2843", rating: 5, comment: "Outstanding work as always. Highly recommend.", date: "Apr 14, 2026", staff: "Emily Davis", flagged: false },
  { id: 3, client: "Jose Reyes", job: "JOB-2840", rating: 3, comment: "Service was okay but arrived 20 minutes late.", date: "Apr 13, 2026", staff: "James Wilson", flagged: true },
  { id: 4, client: "Carlos Mendoza", job: "JOB-2838", rating: 5, comment: "Fantastic job! Everything is spotless.", date: "Apr 12, 2026", staff: "Lisa Martinez, David Brown", flagged: false },
  { id: 5, client: "Elena Torres", job: "JOB-2835", rating: 4, comment: "Good service, minor issues with some areas.", date: "Apr 11, 2026", staff: "Sarah Johnson", flagged: false },
];

export default function ManagerFeedback() {
  const handleExport = () => {
    const csv = [
      ["Date", "Client", "Job", "Staff", "Rating", "Comment", "Flagged"],
      ...feedbackData.map(f => [f.date, f.client, f.job, f.staff, String(f.rating), f.comment, f.flagged ? "Yes" : "No"])
    ].map(row => row.map(v => `"${v}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LUXIS_Feedback_April_2026.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ManagerSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8 pb-24 md:pb-0">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>Feedback & Ratings</h1>
              <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Monitor client feedback and address concerns</p>
            </div>
            <Button className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]" onClick={handleExport}>
              <Download size={16} className="mr-2" />Export Monthly Report
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Star className="text-[#fcb316]" size={24} />
                <h3 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Average Rating</h3>
              </div>
              <p className="text-4xl text-[#fcb316] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>4.6</p>
              <p className="text-[#fffefe]/60 text-sm">Last 30 days</p>
            </div>
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <ThumbsUp className="text-green-500" size={24} />
                <h3 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Positive Reviews</h3>
              </div>
              <p className="text-4xl text-green-500 mb-2" style={{ fontFamily: 'var(--font-headline)' }}>92%</p>
              <p className="text-[#fffefe]/60 text-sm">4+ stars</p>
            </div>
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-500" size={24} />
                <h3 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Flagged Issues</h3>
              </div>
              <p className="text-4xl text-red-500 mb-2" style={{ fontFamily: 'var(--font-headline)' }}>1</p>
              <p className="text-[#fffefe]/60 text-sm">Requires attention</p>
            </div>
          </div>

          {/* Feedback List */}
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="p-6 border-b border-[#2a2a2a]">
              <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Recent Feedback</h2>
            </div>
            <div className="divide-y divide-[#2a2a2a]">
              {feedbackData.map((feedback) => (
                <div key={feedback.id} className={`p-6 hover:bg-[#1e1e1e] transition-colors ${feedback.flagged ? "bg-red-500/5 border-l-4 border-l-red-500" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg text-[#fffefe]">{feedback.client}</h3>
                        {feedback.flagged && <AlertTriangle className="text-red-500" size={18} />}
                      </div>
                      <p className="text-[#fffefe]/60 text-sm">{feedback.job} • {feedback.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={18} className={idx < feedback.rating ? "fill-[#fcb316] text-[#fcb316]" : "text-[#fffefe]/30"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#fffefe] mb-3 italic">"{feedback.comment}"</p>
                  <p className="text-[#fffefe]/50 text-sm">Staff: {feedback.staff}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


