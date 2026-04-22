import { useState } from "react";
import {
  Star,
  Send,
  AlertCircle,
  CheckCircle,
  Download,
  Image as ImageIcon,
  MapPin,
  CalendarDays,
  Package as PackageIcon,
  Ticket
} from "lucide-react";
import ClientSidebar from "../../components/ClientSidebar";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import feedbackBeforeImg from "../../components/assets/images/feedback-before.png";
import feedbackAfterImg from "../../components/assets/images/feedback-after.png";
import feedback2BeforeImg from "../../components/assets/images/feedback2-before.png";
import feedback2AfterImg from "../../components/assets/images/feedback2-after.png";
import feedback3BeforeImg from "../../components/assets/images/feedback3-before.png";
import feedback3AfterImg from "../../components/assets/images/feedback3-after.png";
import feedback4BeforeImg from "../../components/assets/images/feedback4-before.png";
import feedback4AfterImg from "../../components/assets/images/feedback4-after.png";

const neatPackages = {
  "Package 1": {
    duration: "2 hours cleaning",
    team: "2 cleaners",
    price: 2600,
    transportFee: 600,
    description: "2 hours cleaning + 2 cleaners"
  },
  "Package 2": {
    duration: "3 hours cleaning + Free 1 Hour",
    team: "2 cleaners",
    price: 3900,
    transportFee: 600,
    description: "3 hours cleaning + Free 1 Hour + 2 cleaners"
  }
};

const serviceHistory = [
  {
    id: "1",
    bookingId: "BK-5401",
    service: "Deep Cleaning - Living Room",
    date: "Apr 18, 2026",
    completionDate: "Apr 18, 2026",
    amount: 2600,
    transportFee: 600,
    totalAmount: 3200,
    package: "Package 1",
    status: "Completed",
    address: "123 Ayala Avenue, Makati City, Metro Manila",
    duration: "2 hours",
    team: "2 cleaners",
    staffName: "Maria Garcia",
    beforeImage: feedbackBeforeImg,
    afterImage: feedbackAfterImg
  },
  {
    id: "2",
    bookingId: "BK-5402",
    service: "Regular Maintenance - Office",
    date: "Apr 15, 2026",
    completionDate: "Apr 15, 2026",
    amount: 3900,
    transportFee: 600,
    totalAmount: 4500,
    package: "Package 2",
    status: "Completed",
    address: "456 Bonifacio Global City, Taguig City, Metro Manila",
    duration: "3 hours + 1 Free Hour",
    team: "2 cleaners",
    staffName: "John Smith",
    beforeImage: feedback2BeforeImg,
    afterImage: feedback2AfterImg
  },
  {
    id: "3",
    bookingId: "BK-5403",
    service: "Window Cleaning - Full House",
    date: "Apr 12, 2026",
    completionDate: "Apr 12, 2026",
    amount: 2600,
    transportFee: 600,
    totalAmount: 3200,
    package: "Package 1",
    status: "Completed",
    address: "789 Tomas Morato Avenue, Quezon City, Metro Manila",
    duration: "2 hours",
    team: "2 cleaners",
    staffName: "Sarah Johnson",
    beforeImage: feedback3BeforeImg,
    afterImage: feedback3AfterImg
  },
  {
    id: "4",
    bookingId: "BK-5404",
    service: "Carpet Cleaning - Bedrooms",
    date: "Apr 8, 2026",
    completionDate: "Apr 8, 2026",
    amount: 3900,
    transportFee: 600,
    totalAmount: 4500,
    package: "Package 2",
    status: "Completed",
    address: "321 Shaw Boulevard, Mandaluyong City, Metro Manila",
    duration: "3 hours + 1 Free Hour",
    team: "2 cleaners",
    staffName: "Michael Brown",
    beforeImage: feedback4BeforeImg,
    afterImage: feedback4AfterImg
  }
];

interface Service {
  id: string;
  bookingId: string;
  service: string;
  date: string;
  completionDate: string;
  amount: number;
  transportFee: number;
  totalAmount: number;
  package: string;
  status: string;
  address: string;
  duration: string;
  team: string;
  staffName: string;
  beforeImage: string;
  afterImage: string;
  feedback?: { rating: number; comment: string; submittedDate: string };
}

interface Message {
  type: "success" | "error";
  text: string;
}

export default function ClientFeedback() {
  const [services, setServices] = useState<Service[]>(serviceHistory);
  const [message, setMessage] = useState<Message | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSubmitFeedback = () => {
    if (!selectedService) { showMessage("error", "Please select a service"); return; }
    if (rating === 0) { showMessage("error", "Please select a rating"); return; }
    if (!comment.trim()) { showMessage("error", "Please share your feedback"); return; }

    const updatedServices = services.map((s) =>
      s.id === selectedService ? { ...s, feedback: { rating, comment, submittedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) } } : s
    );
    setServices(updatedServices);
    localStorage.setItem("serviceHistory", JSON.stringify(updatedServices));
    showMessage("success", "Thank you! Your feedback has been submitted.");
    setSelectedService(null);
    setRating(0);
    setComment("");
  };

  const downloadReceipt = (service: Service) => {
    const width = 600;
    const height = 1000;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      showMessage("error", "Failed to create receipt. Please try again.");
      return;
    }

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, "#191919");
    bgGradient.addColorStop(1, "#1e1e1e");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    let yPos = 0;

    // Header
    const headerGradient = ctx.createLinearGradient(0, 0, 0, 120);
    headerGradient.addColorStop(0, "#fcb316");
    headerGradient.addColorStop(1, "#de950c");
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, width, 120);

    ctx.font = "bold 40px 'Poppins', sans-serif";
    ctx.fillStyle = "#191919";
    ctx.textAlign = "center";
    ctx.fillText("NEAT", width / 2, 45);

    ctx.font = "bold 14px 'Poppins', sans-serif";
    ctx.fillText("PREMIUM CLEANING SERVICES", width / 2, 75);

    yPos = 140;

    // Helper function for sections
    const drawSection = (title: string, items: { label: string; value: string }[]) => {
      // Section title
      ctx.font = "bold 12px 'Poppins', sans-serif";
      ctx.fillStyle = "#fcb316";
      ctx.textAlign = "left";
      ctx.fillText(`- ${title}`, 30, yPos);
      yPos += 25;

      // Items
      ctx.font = "12px 'Poppins', sans-serif";
      items.forEach(({ label, value }) => {
        ctx.fillStyle = "#fffefe";
        ctx.globalAlpha = 0.6;
        ctx.fillText(label, 40, yPos);
        ctx.textAlign = "right";
        ctx.fillStyle = label === "STATUS" || label === "PACKAGE" ? "#fcb316" : "#fffefe";
        ctx.fillText(value, width - 40, yPos);
        ctx.textAlign = "left";
        yPos += 22;
      });

      yPos += 15;

      // Divider
      ctx.strokeStyle = "#fcb316";
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(30, yPos);
      ctx.lineTo(width - 30, yPos);
      ctx.stroke();
      ctx.globalAlpha = 1;
      yPos += 25;
    };

    // Booking Reference Section
    drawSection("BOOKING REFERENCE", [
      { label: service.bookingId, value: "" }
    ]);
    yPos -= 15;
    ctx.font = "bold 18px 'Poppins', sans-serif";
    ctx.fillStyle = "#fcb316";
    ctx.textAlign = "center";
    ctx.fillText(service.bookingId, width / 2, yPos);
    yPos += 40;

    // Service Details Section
    drawSection("SERVICE DETAILS", [
      { label: "SERVICE", value: service.service },
      { label: "LOCATION", value: service.address },
      { label: "COMPLETED", value: service.completionDate },
      { label: "STATUS", value: service.status }
    ]);

    // Service Package Section
    drawSection("SERVICE PACKAGE", [
      { label: "PACKAGE", value: service.package },
      { label: "DURATION", value: service.duration },
      { label: "TEAM SIZE", value: service.team },
      { label: "TEAM LEAD", value: service.staffName }
    ]);

    // Pricing Section
    ctx.font = "bold 12px 'Poppins', sans-serif";
    ctx.fillStyle = "#fcb316";
    ctx.textAlign = "left";
    ctx.fillText("- PRICING BREAKDOWN", 30, yPos);
    yPos += 25;

    // Price box background
    ctx.fillStyle = "rgba(252, 179, 22, 0.1)";
    ctx.fillRect(30, yPos - 5, width - 60, 110);
    ctx.strokeStyle = "#fcb316";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, yPos - 5, width - 60, 110);

    ctx.font = "12px 'Poppins', sans-serif";
    ctx.fillStyle = "#fffefe";
    ctx.textAlign = "left";

    ctx.fillText("Service Charge", 50, yPos + 15);
    ctx.textAlign = "right";
    ctx.fillText(`PHP ${service.amount.toLocaleString("en-PH")}`, width - 50, yPos + 15);

    ctx.textAlign = "left";
    ctx.fillText("Transport Fee", 50, yPos + 40);
    ctx.textAlign = "right";
    ctx.fillText(`PHP ${service.transportFee.toLocaleString("en-PH")}`, width - 50, yPos + 40);

    // Total
    ctx.font = "bold 16px 'Poppins', sans-serif";
    ctx.fillStyle = "#fcb316";
    ctx.textAlign = "left";
    ctx.fillText("TOTAL AMOUNT", 50, yPos + 70);
    ctx.textAlign = "right";
    ctx.font = "bold 24px 'Poppins', sans-serif";
    ctx.fillText(`PHP ${service.totalAmount.toLocaleString("en-PH")}`, width - 50, yPos + 70);

    yPos += 120;

    // Footer
    ctx.font = "11px 'Poppins', sans-serif";
    ctx.fillStyle = "#fffefe";
    ctx.globalAlpha = 0.5;
    ctx.textAlign = "center";
    const dateStr = new Date().toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    ctx.fillText(`Generated: ${dateStr} | www.neatclean.com`, width / 2, yPos);

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `NEAT-Receipt-${service.bookingId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showMessage("success", "Receipt downloaded successfully!");
      }
    });
  };

  const currentService = services.find((s) => s.id === selectedService);

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#fffefe] mb-2">Service Feedback</h1>
            <p className="text-[#fffefe]/60">Rate and review your completed services</p>
          </div>
          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border backdrop-blur-sm ${message.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
              {message.type === "success" ? <CheckCircle size={20} className="flex-shrink-0" /> : <AlertCircle size={20} className="flex-shrink-0" />}
              <span className="text-sm md:text-base">{message.text}</span>
            </div>
          )}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden sticky top-8">
                <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                  <h2 className="text-lg font-bold text-[#fffefe]">Quick Feedback</h2>
                </div>
                <div className="p-6 space-y-4">
                  {selectedService && currentService ? (
                    <>
                      <div className="bg-[#191919] p-4 rounded-lg border border-[#2a2a2a]">
                        <p className="text-[#fffefe]/60 text-xs mb-1">Selected Service</p>
                        <p className="text-[#fffefe] font-semibold text-sm">{currentService.service}</p>
                        <p className="text-[#fffefe]/50 text-xs mt-1">{currentService.bookingId}</p>
                      </div>
                      <div>
                        <Label className="text-[#fffefe] block mb-3 font-semibold">Your Rating</Label>
                        <div className="flex gap-2 justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="transition-transform hover:scale-110">
                              <Star size={32} className={star <= (hoverRating || rating) ? "fill-[#fcb316] text-[#fcb316]" : "text-[#2a2a2a]"} />
                            </button>
                          ))}
                        </div>
                        {rating > 0 && <p className="text-center text-[#fcb316] font-semibold mt-2">{rating} / 5</p>}
                      </div>
                      <div>
                        <Label htmlFor="comment" className="text-[#fffefe] block mb-2 font-semibold text-sm">Your Feedback</Label>
                        <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full min-h-24 text-sm" />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSubmitFeedback} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2"><Send size={16} className="mr-1" /> Submit</Button>
                        <Button onClick={() => { setSelectedService(null); setRating(0); setComment(""); }} className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold py-2">Cancel</Button>
                      </div>
                    </>
                  ) : <div className="text-center py-4"><p className="text-[#fffefe]/60 text-sm">Select a service from the list to leave feedback</p></div>}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-[#fffefe] mb-6">Your Services</h2>
              {services.map((service) => (
                <div key={service.id} className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#fcb316]/30">
                  <div onClick={() => setExpandedService(expandedService === service.id ? null : service.id)} className="p-6 cursor-pointer hover:bg-[#191919] border-b border-[#2a2a2a]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#fffefe]">{service.service}</h3>
                          <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full font-semibold">{service.status}</span>
                        </div>
                        <p className="text-[#fffefe]/60 text-sm mb-2 flex items-center gap-2"><MapPin size={14} className="text-[#fcb316]" />{service.address}</p>
                        <div className="flex flex-wrap gap-4 text-[#fffefe]/50 text-xs">
                          <span className="flex items-center gap-1"><Ticket size={13} className="text-[#fcb316]" />{service.bookingId}</span>
                          <span className="flex items-center gap-1"><PackageIcon size={13} className="text-[#fcb316]" />{service.package}</span>
                          <span className="flex items-center gap-1"><CalendarDays size={13} className="text-[#fcb316]" />{service.date}</span>
                        </div>
                      </div>
                      <button onClick={() => setSelectedService(service.id)} className="px-4 py-2 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] text-sm font-semibold rounded-lg">Leave Feedback</button>
                    </div>
                    {service.feedback && (<div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"><div className="flex items-center gap-2 mb-1"><div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} size={14} className={star <= (service.feedback?.rating || 0) ? "fill-[#fcb316] text-[#fcb316]" : "text-[#2a2a2a]"} />))}</div><span className="text-green-400 text-xs font-semibold">Feedback Submitted</span></div><p className="text-green-400/70 text-xs">{service.feedback?.submittedDate}</p></div>)}
                  </div>
                  {expandedService === service.id && (
                    <div className="p-6 space-y-6 bg-[#191919]/50 border-t border-[#2a2a2a]">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><p className="text-[#fffefe]/60 text-xs font-semibold mb-1">PACKAGE</p><p className="text-[#fffefe] font-semibold">{service.package}</p><p className="text-[#fffefe]/60 text-xs mt-1">{neatPackages[service.package as keyof typeof neatPackages].description}</p></div>
                        <div><p className="text-[#fffefe]/60 text-xs font-semibold mb-1">TEAM</p><p className="text-[#fffefe] font-semibold">{service.team}</p><p className="text-[#fffefe]/60 text-xs mt-1">Led by {service.staffName}</p></div>
                      </div>
                      <div><p className="text-[#fffefe] font-semibold mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-[#fcb316]" /> Before & After</p><div className="grid sm:grid-cols-2 gap-4"><div className="space-y-2"><p className="text-[#fffefe]/60 text-xs">Before</p><div className="relative aspect-video bg-gradient-to-br rounded-lg overflow-hidden border border-[#2a2a2a]"><img src={service.beforeImage} alt="Before" className="w-full h-full object-cover" /></div></div><div className="space-y-2"><p className="text-[#fffefe]/60 text-xs">After</p><div className="relative aspect-video bg-gradient-to-br rounded-lg overflow-hidden border border-[#2a2a2a]"><img src={service.afterImage} alt="After" className="w-full h-full object-cover" /></div></div></div></div>
                      <div className="p-4 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg"><div className="flex items-center justify-between mb-4"><p className="text-[#fffefe] font-bold">RECEIPT</p><Button onClick={() => downloadReceipt(service)} className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold py-2 px-3 text-sm"><Download size={16} className="mr-1" /> Download</Button></div><div className="text-sm space-y-2 text-[#fffefe]/70 font-mono"><div className="flex justify-between"><span>Booking ID:</span><span className="text-[#fffefe]">{service.bookingId}</span></div><div className="flex justify-between"><span>Package:</span><span className="text-[#fffefe]">{service.package}</span></div><div className="flex justify-between"><span>Service:</span><span className="text-[#fffefe]">{service.service}</span></div><div className="flex justify-between"><span>Date:</span><span className="text-[#fffefe]">{service.completionDate}</span></div><div className="border-t border-[#2a2a2a] pt-2 mt-2 space-y-2"><div className="flex justify-between"><span>Service Charge:</span><span className="text-[#fffefe]">P{service.amount.toLocaleString("en-PH")}</span></div><div className="flex justify-between"><span>Transport Fee:</span><span className="text-[#fffefe]">P{service.transportFee.toLocaleString("en-PH")}</span></div><div className="flex justify-between font-bold text-[#fcb316]"><span>TOTAL:</span><span>P{service.totalAmount.toLocaleString("en-PH")}</span></div></div></div></div>
                      {service.feedback && (<div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg"><div className="flex items-center gap-2 mb-3"><div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} size={16} className={star <= (service.feedback?.rating || 0) ? "fill-[#fcb316] text-[#fcb316]" : "text-[#2a2a2a]"} />))}</div><span className="text-green-400 text-sm font-semibold">{service.feedback?.rating}/5 - {service.feedback?.submittedDate}</span></div><p className="text-green-400/90 text-sm">{service.feedback?.comment}</p></div>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
