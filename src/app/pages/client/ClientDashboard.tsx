import ClientSidebar from "../../components/ClientSidebar";
import { Calendar, CheckCircle, Clock, Star, AlertCircle, ChevronLeft, ChevronRight, Sparkles, TrendingUp, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import eliteBeforeImage from "../../components/assets/images/lilymess.jpg";
import eliteAfterImage from "../../components/assets/images/lilymessafter.jpg";
import luxuryBeforeImage from "../../components/assets/images/MessyRoom.png";
import luxuryAfterImage from "../../components/assets/images/CleanRoom.png";
import grandHotelBeforeImage from "../../components/assets/images/HotelBefore.png";
import grandHotelAfterImage from "../../components/assets/images/HotelAfter.png";

export default function ClientDashboard() {
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [userAccount, setUserAccount] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [galleryView, setGalleryView] = useState<"before" | "after">("before");

  const completedBookingPhotos = [
    {
      id: 1,
      title: "Business Center - Deep Cleaning",
      date: "Apr 15, 2026",
      beforeImage: eliteBeforeImage,
      afterImage: eliteAfterImage,
    },
    {
      id: 2,
      title: "Condo Turnover - Bedroom and Bath",
      date: "Apr 14, 2026",
      beforeImage: luxuryBeforeImage,
      afterImage: luxuryAfterImage,
    },
    {
      id: 3,
      title: "Residential Deep Clean - Hotel Ready",
      date: "Apr 13, 2026",
      beforeImage: grandHotelBeforeImage,
      afterImage: grandHotelAfterImage,
    },
  ];

  const ongoingProgress = {
    stage: "Main Cleaning",
    progress: 65,
    completed: ["Assessment", "Preparation"],
    remaining: ["Main Cleaning", "Inspection", "Completion"],
  };

  useEffect(() => {
    const booking = localStorage.getItem("currentBooking");
    if (booking) {
      setCurrentBooking(JSON.parse(booking));
      setTimeout(() => localStorage.removeItem("currentBooking"), 500);
    }

    const account = localStorage.getItem("userAccount");
    if (account) {
      setUserAccount(JSON.parse(account));
    }

    const savedBookings = localStorage.getItem("allBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings([
        { id: "BK-3401", service: "Deep Cleaning", date: "Apr 18, 2026", time: "10:00 AM", status: "Confirmed", address: "123 Main St" },
        { id: "BK-3402", service: "Regular Maintenance", date: "Apr 22, 2026", time: "02:00 PM", status: "Scheduled", address: "456 Oak Ave" },
      ]);
    }
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPhotoViewerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % completedBookingPhotos.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + completedBookingPhotos.length) % completedBookingPhotos.length);

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 space-y-8 pt-16 md:pt-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl text-[#fffefe] font-bold">Welcome Back</h1>
              <p className="text-[#fffefe]/60 mt-2">Manage your cleaning services with ease</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center">
              {userAccount && (
                <div className="px-6 py-3 bg-gradient-to-r from-[#fcb316]/20 to-[#fcb316]/5 border border-[#fcb316]/30 rounded-xl">
                  <p className="text-[#fcb316] font-semibold flex items-center gap-2 whitespace-nowrap">
                    <Sparkles size={18} />
                    {userAccount.type === "old_client" ? "Premium Member" : "New Member"}
                  </p>
                </div>
              )}
              <Link to="/client/booking">
                <Button className="bg-gradient-to-r from-[#fcb316] to-[#de950c] hover:from-[#de950c] hover:to-[#b87507] text-[#191919] font-bold px-8 py-3 w-full sm:w-auto whitespace-nowrap shadow-lg hover:shadow-xl transition-all">
                  <Calendar size={18} className="mr-2" /> Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Current Progress Overview */}
          {currentBooking && (
            <div className="bg-gradient-to-br from-[#1e1e1e] to-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 md:p-8 pt-16 md:pt-8">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-[#fffefe]/60 text-sm font-semibold uppercase tracking-wider">Current Service</p>
                    <h2 className="text-3xl text-[#fffefe] font-bold mt-2">{currentBooking.service}</h2>
                    <p className="text-[#fffefe]/50 text-sm mt-1">{currentBooking.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#fffefe]/60 text-xs font-semibold uppercase">Booking ID</p>
                    <p className="text-2xl text-[#fcb316] font-bold">{currentBooking.id}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-[#191919] rounded-lg border border-[#2a2a2a]">
                    <p className="text-[#fffefe]/60 text-sm">Scheduled Date</p>
                    <p className="text-lg text-[#fffefe] font-semibold mt-2">{currentBooking.date}</p>
                    <p className="text-sm text-[#fcb316] mt-1">{currentBooking.time}</p>
                  </div>
                  <div className="p-4 bg-[#191919] rounded-lg border border-[#2a2a2a]">
                    <p className="text-[#fffefe]/60 text-sm">Status</p>
                    <p className="text-lg text-[#fcb316] font-semibold mt-2 flex items-center gap-2">
                      <CheckCircle size={18} /> {currentBooking.status}
                    </p>
                  </div>
                  <div className="p-4 bg-[#191919] rounded-lg border border-[#2a2a2a]">
                    <p className="text-[#fffefe]/60 text-sm">Progress</p>
                    <p className="text-3xl text-[#fcb316] font-bold mt-2">{ongoingProgress.progress}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-[#fffefe]/60 text-sm font-semibold mb-4">Service Stage: <span className="text-[#fcb316]">{ongoingProgress.stage}</span></p>
                  <div className="relative h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-[#fcb316] to-[#de950c] rounded-full transition-all duration-500"
                      style={{ width: `${ongoingProgress.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="space-y-2">
                      <p className="text-xs text-[#fffefe]/60 font-semibold uppercase">Completed Steps</p>
                      {ongoingProgress.completed.map((step) => (
                        <p key={step} className="text-sm text-green-400 flex items-center gap-2">
                          <CheckCircle size={14} /> {step}
                        </p>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-[#fffefe]/60 font-semibold uppercase">Upcoming Steps</p>
                      {ongoingProgress.remaining.map((step) => (
                        <p key={step} className="text-sm text-[#fffefe]/50">
                          ? {step}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <Link to="/client/tracking" className="mt-8 w-full">
                  <Button className="w-full bg-gradient-to-r from-[#fcb316] to-[#de950c] hover:from-[#de950c] hover:to-[#c8840a] text-[#191919] font-bold py-6 text-base">
                    View Real-time Tracking
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Photo Gallery - Completed Bookings */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 md:p-8 pt-16 md:pt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[#fffefe]/60 text-sm font-semibold uppercase tracking-wider">Gallery</p>
                  <h2 className="text-2xl text-[#fffefe] font-bold mt-1">Before & After Gallery</h2>
                </div>
                <p className="text-[#fffefe]/60 text-sm">{slideIndex + 1} of {completedBookingPhotos.length}</p>
              </div>

              <div className="relative">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsPhotoViewerOpen(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setIsPhotoViewerOpen(true);
                    }
                  }}
                  className="relative h-80 w-full rounded-xl overflow-hidden border border-[#2a2a2a] flex items-center justify-center text-left group"
                >
                  <img
                    src={galleryView === "before" ? completedBookingPhotos[slideIndex].beforeImage : completedBookingPhotos[slideIndex].afterImage}
                    alt={`${completedBookingPhotos[slideIndex].title} ${galleryView}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#191919]/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fcb316]/15 to-transparent" />
                  <div className="text-center z-10">
                    <div className="inline-block p-4 bg-[#fcb316]/20 rounded-full mb-4">
                      <Sparkles className="text-[#fcb316]" size={40} />
                    </div>
                    <h3 className="text-xl text-[#fffefe] font-bold">{completedBookingPhotos[slideIndex].title}</h3>
                    <p className="text-[#fffefe]/60 text-sm mt-2">{completedBookingPhotos[slideIndex].date}</p>
                    <p className="text-xs mt-2">
                      <span className={`${galleryView === "before" ? "bg-[#fcb316] text-[#191919]" : "bg-green-500 text-white"} px-2 py-1 rounded-full`}>
                        {galleryView === "before" ? "Before" : "After"}
                      </span>
                    </p>
                    <p className="text-[#fffefe] text-xs mt-4 opacity-90">Click image to enlarge</p>
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-[#fcb316]/20 hover:bg-[#fcb316]/40 text-[#fcb316] rounded-full transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-[#fcb316]/20 hover:bg-[#fcb316]/40 text-[#fcb316] rounded-full transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setGalleryView("before")}
                    className={`rounded-md overflow-hidden border transition-colors ${galleryView === "before" ? "border-[#fcb316]" : "border-[#2a2a2a] hover:border-[#fcb316]/60"}`}
                  >
                    <img src={completedBookingPhotos[slideIndex].beforeImage} alt="Before preview" className="h-20 w-full object-cover" />
                    <p className="text-xs py-1 bg-[#1e1e1e] text-[#fffefe]/80">Before</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryView("after")}
                    className={`rounded-md overflow-hidden border transition-colors ${galleryView === "after" ? "border-green-500" : "border-[#2a2a2a] hover:border-green-500/60"}`}
                  >
                    <img src={completedBookingPhotos[slideIndex].afterImage} alt="After preview" className="h-20 w-full object-cover" />
                    <p className="text-xs py-1 bg-[#1e1e1e] text-[#fffefe]/80">After</p>
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {completedBookingPhotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === slideIndex ? "w-8 bg-[#fcb316]" : "w-2 bg-[#2a2a2a]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isPhotoViewerOpen && (
            <div
              className="fixed inset-0 z-[100] bg-black/85 p-4 md:p-10 flex items-center justify-center"
              onClick={() => setIsPhotoViewerOpen(false)}
            >
              <div className="relative w-full max-w-6xl max-h-[90vh]" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setIsPhotoViewerOpen(false)}
                  className="absolute -top-10 right-0 text-white/80 hover:text-white p-2"
                  aria-label="Close photo viewer"
                >
                  <X size={24} />
                </button>
                <img
                  src={galleryView === "before" ? completedBookingPhotos[slideIndex].beforeImage : completedBookingPhotos[slideIndex].afterImage}
                  alt={completedBookingPhotos[slideIndex].title}
                  className="hidden"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-[#fcb316]/50 overflow-hidden">
                    <img
                      src={completedBookingPhotos[slideIndex].beforeImage}
                      alt={`${completedBookingPhotos[slideIndex].title} before`}
                      className="w-full max-h-[70vh] object-contain bg-black/30"
                    />
                    <p className="text-center text-xs text-[#191919] bg-[#fcb316] py-1 font-semibold">BEFORE</p>
                  </div>
                  <div className="rounded-lg border border-green-500/50 overflow-hidden">
                    <img
                      src={completedBookingPhotos[slideIndex].afterImage}
                      alt={`${completedBookingPhotos[slideIndex].title} after`}
                      className="w-full max-h-[70vh] object-contain bg-black/30"
                    />
                    <p className="text-center text-xs text-white bg-green-500 py-1 font-semibold">AFTER</p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-white font-semibold">{completedBookingPhotos[slideIndex].title}</p>
                  <p className="text-white/70 text-sm">{completedBookingPhotos[slideIndex].date}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats & Bookings Grid */}
          <div className="grid lg:grid-cols-3 gap-4 md:p-8 pt-16 md:pt-8">
            {/* Quick Stats */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1e1e1e] to-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl p-4 md:p-8 pt-16 md:pt-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl text-[#fffefe] font-bold">Performance Metrics</h3>
                <TrendingUp className="text-[#fcb316]" size={24} />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                  <CheckCircle className="text-green-400 mb-3" size={28} />
                  <p className="text-[#fffefe]/60 text-sm">Completed Services</p>
                  <p className="text-4xl text-green-400 font-bold mt-2">12</p>
                  <p className="text-xs text-[#fffefe]/50 mt-2">+2 this month</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-[#fcb316]/10 to-[#fcb316]/5 rounded-xl border border-[#fcb316]/20">
                  <Star className="text-[#fcb316] mb-3" size={28} />
                  <p className="text-[#fffefe]/60 text-sm">Average Rating</p>
                  <p className="text-4xl text-[#fcb316] font-bold mt-2">4.8</p>
                  <p className="text-xs text-[#fffefe]/50 mt-2">Out of 5.0</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20">
                  <AlertCircle className="text-blue-400 mb-3" size={28} />
                  <p className="text-[#fffefe]/60 text-sm">Total Spent</p>
                  <p className="text-4xl text-blue-400 font-bold mt-2">₱3,240</p>
                  <p className="text-xs text-[#fffefe]/50 mt-2">On 12 services</p>
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-gradient-to-br from-[#1e1e1e] to-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl p-4 md:p-8 pt-16 md:pt-8">
              <h3 className="text-2xl text-[#fffefe] font-bold mb-6">Upcoming</h3>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 bg-[#191919] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#fcb316]/50 rounded-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm text-[#fffefe] font-semibold group-hover:text-[#fcb316] transition-colors">{booking.service}</h4>
                      <span className="text-xs px-2 py-1 bg-[#fcb316]/20 text-[#fcb316] rounded-full">{booking.status}</span>
                    </div>
                    <p className="text-xs text-[#fffefe]/60 flex items-center gap-1">
                      <Calendar size={12} /> {booking.date}
                    </p>
                    <p className="text-xs text-[#fffefe]/60 flex items-center gap-1 mt-1">
                      <Clock size={12} /> {booking.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


