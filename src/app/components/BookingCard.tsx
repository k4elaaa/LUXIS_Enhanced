import React from "react";
import { Booking, formatCurrency, formatDate } from "../../data/mockData";
import { MapPin, Calendar, Clock, Users, ChevronRight } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
  onClick?: () => void;
  showStatus?: boolean;
  showEstimatedCost?: boolean;
  showChevron?: boolean;
  actionLabel?: string;
  variant?: "light" | "dark";
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onClick,
  showStatus = true,
  showEstimatedCost = true,
  showChevron = true,
  variant = "light",
}) => {
  const statusColorsLight: Record<string, string> = {
    pending_approval: "bg-yellow-100 text-yellow-800",
    assigned: "bg-blue-100 text-blue-800",
    on_the_way: "bg-purple-100 text-purple-800",
    in_progress: "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

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
    cancelled: "Cancelled"
  };

  return (
    <div
      onClick={onClick}
      className={
        variant === "dark"
          ? "relative bg-[#222222] rounded-xl border border-[#2a2a2a] p-4 hover:shadow-lg transition-shadow cursor-pointer"
          : "relative bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
      }
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={variant === "dark" ? "font-semibold text-[#fffefe] text-sm" : "font-semibold text-gray-900 text-sm"}>
            {booking.clientName}
          </h3>
          <p
            className={
              variant === "dark"
                ? "text-xs text-[#fffefe]/60 mt-1 capitalize"
                : "text-xs text-gray-500 mt-1 capitalize"
            }
          >
            {booking.serviceType.replace("-", " ")}
          </p>
        </div>
        {showStatus && (
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              variant === "dark" ? statusColorsDark[booking.status] : statusColorsLight[booking.status]
            }`}
          >
            {statusLabels[booking.status]}
          </span>
        )}
      </div>

      <div className={variant === "dark" ? `space-y-2 ${showEstimatedCost ? "mb-3" : "mb-0"} text-xs text-[#fffefe]/70` : `space-y-2 ${showEstimatedCost ? "mb-3" : "mb-0"} text-xs text-gray-600`}>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[#C8A96A] flex-shrink-0" />
          <span className="truncate">{booking.address.street}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-[#C8A96A] flex-shrink-0" />
          <span>{formatDate(booking.scheduledDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-[#C8A96A] flex-shrink-0" />
          <span>{booking.scheduledTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} className="text-[#C8A96A] flex-shrink-0" />
          <span>{booking.numberOfCleaners} {booking.numberOfCleaners === 1 ? "cleaner" : "cleaners"}</span>
        </div>
      </div>

      {showEstimatedCost ? (
        <div className="flex justify-end items-center">
          <div className="mr-auto">
            <p className={variant === "dark" ? "text-xs text-[#fffefe]/50" : "text-xs text-gray-500"}>Estimated Cost</p>
            <p className="text-lg font-bold text-[#C8A96A]">{formatCurrency(booking.estimatedCost)}</p>
          </div>
          {showChevron && (
            <ChevronRight size={20} className={variant === "dark" ? "text-[#fffefe]/40" : "text-gray-400"} />
          )}
        </div>
      ) : (
        showChevron && (
          <ChevronRight
            size={20}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${variant === "dark" ? "text-[#fffefe]/40" : "text-gray-400"}`}
          />
        )
      )}
    </div>
  );
};

export default BookingCard;
