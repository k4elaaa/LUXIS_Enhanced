import { useNavigate } from "react-router";
import Logo from "../../components/Logo";
import ManagerSidebar from "../../components/ManagerSidebar";
import { Button } from "../../components/ui/button";
import { BookingCard } from "../../components/BookingCard";
import { mockBookings, formatCurrency } from "../../../data/mockData";
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

  const metricCards = [
    {
      key: "pending",
      label: "Pending Approval",
      value: stats.pendingApproval,
      icon: AlertCircle,
      iconClassName: "text-yellow-400",
      iconBgClassName: "bg-yellow-500/20",
    },
    {
      key: "assigned",
      label: "Assigned",
      value: stats.assigned,
      icon: Users,
      iconClassName: "text-blue-400",
      iconBgClassName: "bg-blue-500/20",
    },
    {
      key: "progress",
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      iconClassName: "text-orange-400",
      iconBgClassName: "bg-orange-500/20",
    },
    {
      key: "completed",
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      iconClassName: "text-green-400",
      iconBgClassName: "bg-green-500/20",
    },
    {
      key: "revenue",
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: TrendingUp,
      iconClassName: "text-white",
      iconBgClassName: "bg-[#6e6e6e]",
      cardClassName: "bg-[#222222] border-[#2a2a2a]",
      labelClassName: "text-[#fffefe]/80",
      valueClassName: "text-[#fffefe]",
    },
  ];

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
          <div className="flex flex-wrap gap-3 mb-8">
            {metricCards.map(card => {
              const Icon = card.icon;

              return (
                <div
                  key={card.key}
                  className={`relative flex-1 basis-0 min-w-[120px] h-[126px] rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 p-[12px_48px_12px_14px] flex flex-col justify-end ${card.cardClassName ?? "bg-[#222222] border-[#2a2a2a]"}`}
                >
                  <div className="min-w-0 h-full pr-1 flex flex-col">
                    <p
                      className={`leading-tight min-w-0 break-words [overflow-wrap:break-word] whitespace-normal text-[clamp(11px,1.2vw,13px)] ${card.labelClassName ?? "text-[#fffefe]/60"}`}
                    >
                      {card.label}
                    </p>
                    <p
                      className={`font-bold leading-none tracking-tight min-w-0 mt-auto text-[clamp(20px,2.5vw,28px)] overflow-hidden text-ellipsis whitespace-nowrap ${card.valueClassName ?? "text-[#fffefe]"}`}
                    >
                        {card.value}
                    </p>
                  </div>
                  <div
                    className={`absolute top-[10px] right-[10px] w-[36px] h-[36px] rounded-lg flex items-center justify-center shrink-0 ${card.iconBgClassName}`}
                  >
                    <Icon className={card.iconClassName} size={20} />
                  </div>
                </div>
              );
            })}
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
                  showEstimatedCost={false}
                  showChevron={false}
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

