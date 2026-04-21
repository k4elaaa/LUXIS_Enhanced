import AdminSidebar from "../../components/AdminSidebar";
import { Shield, Users, Bell, Lock, Activity, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { useState } from "react";

const activityLogs = [
  { time: "Apr 16, 2026 10:45 AM", user: "admin@neat.com", action: "Updated staff permissions", ip: "192.168.1.100" },
  { time: "Apr 16, 2026 09:30 AM", user: "admin@neat.com", action: "Modified client record CL-1001", ip: "192.168.1.100" },
  { time: "Apr 15, 2026 04:20 PM", user: "manager@neat.com", action: "Assigned staff to job #2847", ip: "192.168.1.105" },
  { time: "Apr 15, 2026 02:15 PM", user: "admin@neat.com", action: "Exported financial report", ip: "192.168.1.100" },
  { time: "Apr 15, 2026 11:00 AM", user: "admin@neat.com", action: "Created new staff account ST-2007", ip: "192.168.1.100" },
];

const roles = [
  { name: "Admin", desc: "Full system access", permissions: ["View Dashboard", "Manage Staff", "Manage Clients", "View Finance", "Manage Documents", "System Settings"], notifications: ["Email Summaries", "Client Updates", "Staff Alerts"] },
  { name: "Manager", desc: "Team and schedule management", permissions: ["View Dashboard", "Team Deployment", "Employee Records", "Client Records (View)", "Feedback"], notifications: ["Client Updates", "Staff Alerts", "Job Notifications"] },
  { name: "Staff", desc: "Job access and reporting", permissions: ["View Assigned Jobs", "Submit Reports", "Upload Photos", "View Profile"], notifications: ["Job Assignments", "Schedule Changes"] },
];

type Role = typeof roles[0];

export default function AdminSettings() {
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [rolePerms, setRolePerms] = useState<string[]>([]);
  const [roleNotifs, setRoleNotifs] = useState<string[]>([]);

  const openEdit = (role: Role) => {
    setEditingRole(role);
    setRolePerms([...role.permissions]);
    setRoleNotifs([...role.notifications]);
  };

  const togglePerm = (perm: string) => setRolePerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  const toggleNotif = (n: string) => setRoleNotifs(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <AdminSidebar />
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>Settings & Logs</h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Manage system settings and monitor activity</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              {/* Security */}
              <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="text-[#fcb316]" size={24} />
                  <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Security Settings</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Two-Factor Authentication", desc: "Require 2FA for all admin accounts", default: true },
                    { label: "Session Timeout", desc: "Auto-logout after 30 minutes", default: true },
                    { label: "IP Whitelist", desc: "Restrict access by IP address", default: false },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                      <div>
                        <Label className="text-[#fffefe]">{s.label}</Label>
                        <p className="text-[#fffefe]/60 text-sm">{s.desc}</p>
                      </div>
                      <Switch defaultChecked={s.default} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="text-[#fcb316]" size={24} />
                  <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Notifications</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Email Notifications", desc: "Daily summary reports", default: true },
                    { label: "Client Updates", desc: "New bookings and feedback", default: true },
                    { label: "Staff Alerts", desc: "Attendance and performance", default: true },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                      <div>
                        <Label className="text-[#fffefe]">{s.label}</Label>
                        <p className="text-[#fffefe]/60 text-sm">{s.desc}</p>
                      </div>
                      <Switch defaultChecked={s.default} />
                    </div>
                  ))}
                </div>
              </div>

              {/* User Roles */}
              <div className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="text-[#fcb316]" size={24} />
                  <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>User Roles</h2>
                </div>
                <div className="space-y-3">
                  {roles.map(role => (
                    <div key={role.name} className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg">
                      <div>
                        <p className="text-[#fffefe]">{role.name}</p>
                        <p className="text-[#fffefe]/60 text-sm">{role.desc}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-[#fcb316] text-[#fcb316] hover:bg-[#fcb316] hover:text-[#191919]" onClick={() => openEdit(role)}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg">
              <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="text-[#fcb316]" size={24} />
                  <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Activity Logs</h2>
                </div>
                <Button size="sm" className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]">Export</Button>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto">
                <div className="space-y-4">
                  {activityLogs.map((log, idx) => (
                    <div key={idx} className="pb-4 border-b border-[#2a2a2a] last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-[#fffefe]">{log.action}</p>
                        <Lock className="text-[#fcb316]" size={16} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#fffefe]/60">
                        <span>{log.time}</span><span>•</span><span>{log.user}</span>
                      </div>
                      <p className="text-xs text-[#fffefe]/40 mt-1">IP: {log.ip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Role Modal */}
      {editingRole && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Edit Role: {editingRole.name}</h3>
              <button onClick={() => setEditingRole(null)} className="text-[#fffefe]/40 hover:text-[#fffefe]"><X size={24} /></button>
            </div>

            <div className="mb-6">
              <h4 className="text-[#fcb316] text-sm mb-3" style={{ fontFamily: 'var(--font-subheading)' }}>PERMISSIONS</h4>
              <div className="space-y-2">
                {["View Dashboard", "Manage Staff", "Manage Clients", "View Finance", "Manage Documents", "System Settings", "Team Deployment", "Employee Records", "Client Records (View)", "Feedback", "View Assigned Jobs", "Submit Reports", "Upload Photos", "Job Assignments"].map(perm => (
                  <label key={perm} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-[#1e1e1e]">
                    <input type="checkbox" checked={rolePerms.includes(perm)} onChange={() => togglePerm(perm)} className="accent-[#fcb316]" />
                    <span className="text-[#fffefe] text-sm">{perm}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[#fcb316] text-sm mb-3" style={{ fontFamily: 'var(--font-subheading)' }}>NOTIFICATIONS</h4>
              <div className="space-y-2">
                {["Email Summaries", "Client Updates", "Staff Alerts", "Job Notifications", "Job Assignments", "Schedule Changes"].map(n => (
                  <label key={n} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-[#1e1e1e]">
                    <input type="checkbox" checked={roleNotifs.includes(n)} onChange={() => toggleNotif(n)} className="accent-[#fcb316]" />
                    <span className="text-[#fffefe] text-sm">{n}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-[#2a2a2a] text-[#fffefe] bg-[#222] hover:bg-[#333] font-semibold" onClick={() => setEditingRole(null)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919]" onClick={() => setEditingRole(null)}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
