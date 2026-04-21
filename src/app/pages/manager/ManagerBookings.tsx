import React, { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../../components/Logo";
import ManagerSidebar from "../../components/ManagerSidebar";
import { Button } from "../../components/ui/button";
import { BookingCard } from "../../components/BookingCard";
import { Input } from "../../components/ui/input";
import { mockBookings, Booking } from "../../../data/mockData";
import { ChevronLeft, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function ManagerBookings() {
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const bookingsList = Object.values(mockBookings).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
                    className={`cursor-pointer transition-all ${
                      selectedBooking?.id === booking.id
                        ? "ring-2 ring-[#C8A96A]"
                        : ""
                    }`}
                  >
                    <BookingCard
                      booking={booking}
                      showStatus={true}
                      actionLabel="Assign"
                      variant="dark"
                    />
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
                    <p className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium inline-block">
                      {selectedBooking.status === "pending_approval"
                        ? "Pending Approval"
                        : selectedBooking.status}
                    </p>
                  </div>
                </div>

                {selectedBooking.assignedTeam ? (
                  <div className="bg-green-500/10 rounded-lg p-4 mb-6 border border-green-500/20">
                    <p className="text-xs text-green-400 font-medium mb-2">ASSIGNED TO</p>
                    <p className="font-semibold text-[#fffefe]">
                      {selectedBooking.assignedTeam.teamName}
                    </p>
                    <p className="text-xs text-[#fffefe]/60 mt-1">
                      {selectedBooking.assignedTeam.members.length} members
                    </p>
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
    </div>
  );
}

