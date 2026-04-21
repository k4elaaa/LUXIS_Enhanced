import React, { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../../components/Logo";
import ManagerSidebar from "../../components/ManagerSidebar";
import { Button } from "../../components/ui/button";
import { BookingCard } from "../../components/BookingCard";
import { mockBookings, Booking, formatCurrency } from "../../../data/mockData";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const bookingsList = Object.values(mockBookings);

  const stats = {
    pendingApproval: bookingsList.filter(b => b.status === "pending_approval").length,
    assigned: bookingsList.filter(b => b.status === "assigned").length,
    inProgress: bookingsList.filter(b => b.status === "in_progress").length,
    completed: bookingsList.filter(b => b.status === "completed").length,
    totalRevenue: bookingsList.reduce((sum, b) => sum + b.estimatedCost, 0),
  };

  const recentBookings = bookingsList
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ManagerSidebar />
      <div className="ml-64 flex-1">
        {/* Header */}
        <div className="bg-[#1e1e1e] border-b border-[#2a2a2a] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#fffefe]">Manager Dashboard</h1>
                <p className="text-sm text-[#fffefe]/60 mt-1">Manage bookings and dispatch teams</p>
              </div>
              <Logo showIcon size="sm" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#222222] rounded-xl p-6 border border-[#2a2a2a] hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fffefe]/60">Pending Approval</p>
                <p className="text-3xl font-bold text-[#fffefe] mt-2">{stats.pendingApproval}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#222222] rounded-xl p-6 border border-[#2a2a2a] hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fffefe]/60">Assigned</p>
                <p className="text-3xl font-bold text-[#fffefe] mt-2">{stats.assigned}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#222222] rounded-xl p-6 border border-[#2a2a2a] hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fffefe]/60">In Progress</p>
                <p className="text-3xl font-bold text-[#fffefe] mt-2">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#222222] rounded-xl p-6 border border-[#2a2a2a] hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fffefe]/60">Completed</p>
                <p className="text-3xl font-bold text-[#fffefe] mt-2">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#222222] rounded-xl p-6 text-white hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
          </div>

          {/* Recent Bookings */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#fffefe]">Recent Bookings</h2>
              <Button
                className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]"
                onClick={() => navigate("/manager/bookings")}
              >
                <BarChart3 size={16} className="mr-2" />
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onClick={() => navigate(`/manager/booking/${booking.id}`)}
                  actionLabel="Assign Team"
                  showStatus={true}
                  variant="dark"
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#222222] rounded-xl p-6 border border-[#2a2a2a]">
            <h3 className="font-semibold text-[#fffefe] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="border-[#2a2a2a] text-[#fffefe] bg-[#1e1e1e] hover:bg-[#2a2a2a] justify-start"
                onClick={() => navigate("/manager/bookings")}
              >
                <AlertCircle size={18} className="mr-2 text-yellow-400" />
                Review Pending Bookings
              </Button>
              <Button
                variant="outline"
                className="border-[#2a2a2a] text-[#fffefe] bg-[#1e1e1e] hover:bg-[#2a2a2a] justify-start"
                onClick={() => navigate("/manager/teams")}
              >
                <Users size={18} className="mr-2 text-[#C8A96A]" />
                Manage Teams
              </Button>
              <Button
                variant="outline"
                className="border-[#2a2a2a] text-[#fffefe] bg-[#1e1e1e] hover:bg-[#2a2a2a] justify-start"
                onClick={() => navigate("/manager/employees")}
              >
                <BarChart3 size={18} className="mr-2 text-blue-400" />
                View Staff Performance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

