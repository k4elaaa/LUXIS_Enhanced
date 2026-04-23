import { useState } from "react";
import { useNavigate } from "react-router";
import ManagerSidebar from "../../components/ManagerSidebar";
import { BookingCard } from "../../components/BookingCard";
import { Input } from "../../components/ui/input";
import { mockBookings, Booking } from "../../../data/mockData";
import { ChevronLeft, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

export default function ManagerBookings() {
  const navigate = useNavigate();
  const [bookingRecords, setBookingRecords] = useState<Booking[]>(Object.values(mockBookings));
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const statusColorsDark: Record<string, string> = {
    pending_approval: "bg-yellow-500/20 text-yellow-400",
    assigned: "bg-blue-500/20 text-blue-400",
    on_the_way: "bg-purple-500/20 text-purple-400",
    in_progress: "bg-orange-500/20 text-orange-400",
    completed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  const statusLabels: Record<string, string> = {
    pending_approval: "Pending Approval",
    assigned: "Assigned",
    on_the_way: "On The Way",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const bookingsList = [...bookingRecords].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const updateBookingStatus = (bookingId: string, nextStatus: Booking["status"]) => {
    setBookingRecords((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status: nextStatus,
            }
          : booking,
      ),
    );

    setSelectedBooking((prev) =>
      prev && prev.id === bookingId
        ? {
            ...prev,
            status: nextStatus,
          }
        : prev,
    );

    setReviewBooking((prev) =>
      prev && prev.id === bookingId
        ? {
            ...prev,
            status: nextStatus,
          }
        : prev,
    );
  };

  const getReceiptRef = (booking: Booking) => {
    return `RCPT-${booking.id.replace("booking-", "BK-").toUpperCase()}`;
  };

  const filteredBookings = bookingsList.filter(booking => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.address.street.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ManagerSidebar />
      <div className="ml-64 flex-1">
        {/* Header */}
        <div className="bg-[#1e1e1e] border-b border-[#2a2a2a] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/manager")}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg transition"
              >
                <ChevronLeft size={24} className="text-[#fffefe]" />
              </button>
              <h1 className="text-2xl font-semibold text-[#fffefe]">Booking Requests</h1>
            </div>
            {/* Filters */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-3 text-[#fffefe]/50" />
                <Input
                  type="text"
                  placeholder="Search by client name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#222222] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#C8A96A]"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48 bg-[#222222] border-[#2a2a2a] text-[#fffefe]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="on_the_way">On The Way</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <div
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className={`cursor-pointer transition-all relative ${
                      selectedBooking?.id === booking.id
                        ? "ring-2 ring-[#C8A96A]"
                        : ""
                    }`}
                  >
                    <BookingCard
                      booking={booking}
                      showStatus={true}
                      showEstimatedCost={false}
                      showChevron={false}
                      variant="dark"
                    />
                    {booking.status === "pending_approval" && (
                      <div className="absolute right-4 bottom-4">
                        <Button
                          size="sm"
                          className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReviewBooking(booking);
                          }}
                        >
                          Review
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-[#222222] rounded-xl p-12 border border-[#2a2a2a] text-center">
                  <p className="text-[#fffefe]/60">No bookings found</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedBooking ? (
              <div className="bg-[#222222] rounded-xl border border-[#2a2a2a] p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-[#fffefe] mb-4">
                  Booking Details
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-[#fffefe]/50 mb-1">Client Name</p>
                    <p className="font-semibold text-[#fffefe]">{selectedBooking.clientName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#fffefe]/50 mb-1">Contact</p>
                    <p className="text-sm text-[#fffefe]">{selectedBooking.clientPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#fffefe]/50 mb-1">Service Type</p>
                    <p className="font-semibold text-[#fffefe] capitalize">
                      {selectedBooking.serviceType.replace("-", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#fffefe]/50 mb-1">Scheduled</p>
                    <p className="text-sm text-[#fffefe]">
                      {new Date(selectedBooking.scheduledDate).toLocaleDateString()} at{" "}
                      {selectedBooking.scheduledTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#fffefe]/50 mb-1">Status</p>
                    <p className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${statusColorsDark[selectedBooking.status]}`}>
                      {statusLabels[selectedBooking.status]}
                    </p>
                  </div>
                </div>

                {selectedBooking.assignedTeam ? (
                  <div className="bg-green-500/10 rounded-lg p-4 mb-6 border border-green-500/20">
                    <p className="text-xs text-green-400 font-medium mb-3">ASSIGNED STAFF</p>
                    <div className="space-y-2">
                      {selectedBooking.assignedTeam.members.map((member, index) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-2 text-sm text-[#fffefe]"
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-[11px] font-semibold text-green-300">
                            {index + 1}
                          </span>
                          <span className="font-medium leading-none">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedBooking.specialRequests && (
                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#2a2a2a]">
                    <p className="text-xs text-[#fffefe]/50 font-medium mb-1">Special Requests</p>
                    <p className="text-sm text-[#fffefe]">{selectedBooking.specialRequests}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#222222] rounded-xl border border-[#2a2a2a] p-8 text-center sticky top-24">
                <p className="text-[#fffefe]/60">Select a booking to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      </div>

      <Dialog open={Boolean(reviewBooking)} onOpenChange={(open) => !open && setReviewBooking(null)}>
        <DialogContent className="max-w-2xl bg-[#222222] border border-[#2a2a2a] text-[#fffefe]">
          {reviewBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#fffefe]">Booking Review</DialogTitle>
                <DialogDescription className="text-[#fffefe]/60">
                  Verify request details and receipt before approving or rejecting.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-4">
                    <p className="text-xs text-[#fffefe]/50 mb-1">Client</p>
                    <p className="font-semibold">{reviewBooking.clientName}</p>
                    <p className="text-sm text-[#fffefe]/70 mt-1">{reviewBooking.clientPhone}</p>
                    <p className="text-sm text-[#fffefe]/70">{reviewBooking.clientEmail}</p>
                  </div>
                  <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-4">
                    <p className="text-xs text-[#fffefe]/50 mb-1">Service</p>
                    <p className="font-semibold capitalize">{reviewBooking.serviceType.replace("-", " ")}</p>
                    <p className="text-sm text-[#fffefe]/70 mt-1">
                      {new Date(reviewBooking.scheduledDate).toLocaleDateString()} at {reviewBooking.scheduledTime}
                    </p>
                    <p className="text-sm text-[#fffefe]/70">{reviewBooking.numberOfCleaners} cleaners</p>
                  </div>
                </div>

                <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-4">
                  <p className="text-xs text-[#fffefe]/50 mb-1">Service Address</p>
                  <p className="text-sm text-[#fffefe]">
                    {reviewBooking.address.street}, {reviewBooking.address.city}, {reviewBooking.address.state}
                  </p>
                </div>

                {reviewBooking.specialRequests && (
                  <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-4">
                    <p className="text-xs text-[#fffefe]/50 mb-1">Special Requests</p>
                    <p className="text-sm text-[#fffefe]">{reviewBooking.specialRequests}</p>
                  </div>
                )}

                <div className="bg-[#1e1e1e] border border-[#fcb316]/30 rounded-lg p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-sm font-semibold text-[#fcb316]">Attached Receipt</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#fcb316]/15 text-[#fcb316]">
                      {getReceiptRef(reviewBooking)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1 text-sm text-[#fffefe]/75 mb-3">
                    <p>Service Charge</p>
                    <p className="text-right">PHP {reviewBooking.estimatedCost}</p>
                    <p>Created</p>
                    <p className="text-right">{new Date(reviewBooking.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xs text-[#fffefe]/50">
                    Receipt is attached for manager verification before decision.
                  </p>
                </div>

                {reviewBooking.status === "pending_approval" ? (
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="flex-1 bg-green-600 hover:bg-green-500 text-white">
                          Approve Booking
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#222222] border border-[#2a2a2a] text-[#fffefe]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
                          <AlertDialogDescription className="text-[#fffefe]/70">
                            This will approve and confirm the booking request for dispatch.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-[#2a2a2a] bg-[#1e1e1e] text-[#fffefe] hover:bg-[#2a2a2a]">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-green-600 hover:bg-green-500 text-white"
                            onClick={() => {
                              updateBookingStatus(reviewBooking.id, "assigned");
                              setReviewBooking(null);
                            }}
                          >
                            Yes, Approve
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="flex-1 bg-red-600/90 hover:bg-red-500 text-white">
                          Reject Booking
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#222222] border border-[#2a2a2a] text-[#fffefe]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Rejection</AlertDialogTitle>
                          <AlertDialogDescription className="text-[#fffefe]/70">
                            This will reject the request and mark it as cancelled.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-[#2a2a2a] bg-[#1e1e1e] text-[#fffefe] hover:bg-[#2a2a2a]">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600/90 hover:bg-red-500 text-white"
                            onClick={() => {
                              updateBookingStatus(reviewBooking.id, "cancelled");
                              setReviewBooking(null);
                            }}
                          >
                            Yes, Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

