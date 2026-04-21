import AdminSidebar from "../../components/AdminSidebar";
import { Users, Briefcase, DollarSign, FileText, TrendingUp, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const metrics = [
  { label: "Total Bookings", value: "2,847", change: "+12.5%", icon: FileText, color: "#fcb316" },
  { label: "Active Staff", value: "156", change: "+8.2%", icon: Briefcase, color: "#fcb316" },
  { label: "Monthly Revenue", value: "₱284.7K", change: "+18.4%", icon: DollarSign, color: "#fcb316" },
  { label: "New Reports", value: "43", change: "+5.1%", icon: Users, color: "#fcb316" },
];

const revenueData = [
  { month: "Jan", revenue: 185000 },
  { month: "Feb", revenue: 210000 },
  { month: "Mar", revenue: 235000 },
  { month: "Apr", revenue: 284700 },
];

const activityData = [
  { time: "2 min ago", user: "Sarah Johnson", action: "Completed job #2847", type: "success" },
  { time: "15 min ago", user: "Mike Chen", action: "Submitted cleaning report", type: "info" },
  { time: "1 hour ago", user: "Emily Davis", action: "New booking received", type: "success" },
  { time: "2 hours ago", user: "Admin", action: "Updated staff schedules", type: "info" },
  { time: "3 hours ago", user: "John Smith", action: "Uploaded certification documents", type: "info" },
];

const clients = [
  { id: "CL-1001", name: "Luxury Estates Ltd", lastService: "Apr 14, 2026", status: "Active", revenue: "₱12.5K" },
  { id: "CL-1002", name: "Premium Office Park", lastService: "Apr 15, 2026", status: "Active", revenue: "₱8.2K" },
  { id: "CL-1003", name: "Grand Hotel Group", lastService: "Apr 13, 2026", status: "Active", revenue: "₱15.8K" },
];

const staff = [
  { id: "ST-2001", name: "Sarah Johnson", role: "Senior Cleaner", status: "On Duty", rating: 4.9 },
  { id: "ST-2002", name: "Mike Chen", role: "Team Lead", status: "Available", rating: 4.8 },
  { id: "ST-2003", name: "Emily Davis", role: "Specialist", status: "On Duty", rating: 5.0 },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#191919]">
      <AdminSidebar />
      
      <div className="w-full md:ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
              Admin Dashboard
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              Welcome back, manage your entire operation from here
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="text-[#fcb316]" size={24} strokeWidth={1.5} />
                    <span className="text-green-500 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-3xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>
                    {metric.value}
                  </h3>
                  <p className="text-[#fffefe]/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <h2 className="text-xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-subheading)' }}>
                Revenue Trend
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" stroke="#fffefe80" />
                  <YAxis stroke="#fffefe80" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: '8px' }}
                    labelStyle={{ color: '#fffefe' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#fcb316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Feed */}
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <h2 className="text-xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-subheading)' }}>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {activityData.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-4 border-b border-[#2a2a2a] last:border-0">
                    <Clock className="text-[#fcb316] mt-1" size={16} />
                    <div className="flex-1">
                      <p className="text-[#fffefe] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        <span className="text-[#fcb316]">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-[#fffefe]/50 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="grid lg:grid-cols-2 gap-4 md:p-8 pt-16 md:pt-8">
            {/* Top Clients */}
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="p-6 border-b border-[#2a2a2a]">
                <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>
                  Top Clients
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1e1e1e]">
                    <tr>
                      <th className="px-6 py-3 text-left text-[#fffefe]/70 text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>Client</th>
                      <th className="px-6 py-3 text-left text-[#fffefe]/70 text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>Revenue</th>
                      <th className="px-6 py-3 text-left text-[#fffefe]/70 text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-body)' }}>{client.name}</p>
                            <p className="text-[#fffefe]/50 text-sm">{client.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#fcb316]" style={{ fontFamily: 'var(--font-body)' }}>{client.revenue}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                            {client.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Staff Overview */}
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="p-6 border-b border-[#2a2a2a]">
                <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>
                  Staff Overview
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1e1e1e]">
                    <tr>
                      <th className="px-6 py-3 text-left text-[#fffefe]/70 text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>Staff</th>
                      <th className="px-6 py-3 text-left text-[#fffefe]/70 text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>Status</th>
                      <th className="px-6 py-3 text-left text-[#fffefe]/70 text-sm" style={{ fontFamily: 'var(--font-subheading)' }}>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((member) => (
                      <tr key={member.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-body)' }}>{member.name}</p>
                            <p className="text-[#fffefe]/50 text-sm">{member.role}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            member.status === "On Duty" 
                              ? "bg-[#fcb316]/20 text-[#fcb316]" 
                              : "bg-green-500/20 text-green-500"
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#fffefe]" style={{ fontFamily: 'var(--font-body)' }}>
                          ⭐ {member.rating}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

