import AdminSidebar from "../../components/AdminSidebar";
import { DollarSign, TrendingUp, Download, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Nov", revenue: 185000, expenses: 95000 },
  { month: "Dec", revenue: 210000, expenses: 105000 },
  { month: "Jan", revenue: 235000, expenses: 110000 },
  { month: "Feb", revenue: 264000, expenses: 115000 },
  { month: "Mar", revenue: 284000, expenses: 120000 },
  { month: "Apr", revenue: 305000, expenses: 125000 },
];

const serviceBreakdown = [
  { name: "Deep Cleaning", value: 120000, color: "#fcb316" },
  { name: "Regular Maintenance", value: 95000, color: "#de950c" },
  { name: "Special Events", value: 65000, color: "#c48309" },
  { name: "Emergency Service", value: 25000, color: "#a86f07" },
];

const recentTransactions = [
  { id: "TXN-8834", client: "Luxury Estates Ltd", amount: "₱2,450", date: "Apr 16, 2026", status: "Completed" },
  { id: "TXN-8833", client: "Grand Hotel Group", amount: "₱3,890", date: "Apr 15, 2026", status: "Completed" },
  { id: "TXN-8832", client: "Premium Office Park", amount: "₱1,750", date: "Apr 15, 2026", status: "Pending" },
  { id: "TXN-8831", client: "Elite Residences", amount: "₱2,100", date: "Apr 14, 2026", status: "Completed" },
];

const formatPeso = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);

export default function AdminFinance() {
  return (
    <div className="flex min-h-screen bg-[#191919]">
      <AdminSidebar />
      
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                Financial Overview
              </h1>
              <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
                Track revenue, expenses, and profitability
              </p>
            </div>
            <Button className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]">
              <Download size={20} className="mr-2" />
              Export Report
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="text-[#fcb316]" size={24} />
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className="text-3xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>
                ₱305,000
              </h3>
              <p className="text-[#fffefe]/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Monthly Revenue
              </p>
              <p className="text-green-500 text-sm mt-2">+7.8% from last month</p>
            </div>

            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="text-[#fcb316]" size={24} />
                <Calendar className="text-[#fffefe]/50" size={20} />
              </div>
              <h3 className="text-3xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>
                ₱125,000
              </h3>
              <p className="text-[#fffefe]/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Operating Expenses
              </p>
              <p className="text-[#fffefe]/50 text-sm mt-2">40.98% of revenue</p>
            </div>

            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="text-[#fcb316]" size={24} />
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className="text-3xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>
                ₱180,000
              </h3>
              <p className="text-[#fffefe]/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Net Profit
              </p>
              <p className="text-green-500 text-sm mt-2">59.02% margin</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue vs Expenses Chart */}
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <h2 className="text-xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-subheading)' }}>
                Revenue vs Expenses
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" stroke="#fffefe80" />
                  <YAxis stroke="#fffefe80" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#111111',
                      border: '1px solid #3a3a3a',
                      borderRadius: '8px',
                      color: '#fffefe'
                    }}
                    labelStyle={{ color: '#fffefe', fontWeight: 600 }}
                    itemStyle={{ color: '#fffefe' }}
                    formatter={(value: number, name: string) => [formatPeso(value), name === 'revenue' ? 'Revenue' : 'Expenses']}
                  />
                  <Bar dataKey="revenue" fill="#fcb316" />
                  <Bar dataKey="expenses" fill="#de950c" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Service Breakdown */}
            <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
              <h2 className="text-xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-subheading)' }}>
                Revenue by Service Type
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#111111',
                      border: '1px solid #3a3a3a',
                      borderRadius: '8px',
                      color: '#fffefe'
                    }}
                    labelStyle={{ color: '#fffefe', fontWeight: 600 }}
                    itemStyle={{ color: '#fffefe' }}
                    formatter={(value: number, name: string) => [formatPeso(value), name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {serviceBreakdown.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                    <div>
                      <p className="text-[#fffefe] text-sm">{service.name}</p>
                      <p className="text-[#fffefe]/60 text-xs">₱{(service.value / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="p-6 border-b border-[#2a2a2a]">
              <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>
                Recent Transactions
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Transaction ID</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Client</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Amount</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Date</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((txn) => (
                    <tr key={txn.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                      <td className="px-6 py-4 text-[#fffefe]/70" style={{ fontFamily: 'var(--font-body)' }}>{txn.id}</td>
                      <td className="px-6 py-4 text-[#fffefe]" style={{ fontFamily: 'var(--font-body)' }}>{txn.client}</td>
                      <td className="px-6 py-4 text-[#fcb316]" style={{ fontFamily: 'var(--font-body)' }}>{txn.amount}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70" style={{ fontFamily: 'var(--font-body)' }}>{txn.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          txn.status === "Completed" 
                            ? "bg-green-500/20 text-green-500" 
                            : "bg-[#fcb316]/20 text-[#fcb316]"
                        }`}>
                          {txn.status}
                        </span>
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
  );
}
