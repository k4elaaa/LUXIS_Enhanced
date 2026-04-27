import { Link, useLocation } from "react-router";
import { LayoutDashboard, Users, Calendar, MessageSquare, LogOut, ClipboardList, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/manager", label: "Dashboard", icon: LayoutDashboard },
  { path: "/manager/bookings", label: "Bookings", icon: ClipboardList },
  { path: "/manager/teams", label: "Team Deployment", icon: Users },
  { path: "/manager/employees", label: "Employee Records", icon: Calendar },
  { path: "/manager/clients", label: "Client Records", icon: Users },
  { path: "/manager/feedback", label: "Feedback & Ratings", icon: MessageSquare },
];

export default function ManagerSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl border border-[var(--neat-gold-dark)] bg-[var(--neat-gold)] text-[var(--neat-base)] shadow-[0_8px_24px_rgba(252,179,22,0.28)] transition-all duration-200 hover:scale-[1.03]"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen border-r border-[#2f2f2f] bg-[linear-gradient(180deg,var(--neat-darker-card)_0%,#151515_100%)] flex flex-col shadow-[6px_0_28px_rgba(0,0,0,0.32)] transition-all duration-300 ${
          isMobile ? (isOpen ? "w-64" : "w-0 -translate-x-full") : "w-64"
        } md:w-64 md:translate-x-0`}
      >
        <div className="relative p-6 border-b border-[#2a2a2a]">
          <div className="absolute left-0 top-0 h-full w-1 bg-[linear-gradient(180deg,var(--neat-gold)_0%,var(--neat-gold-dark)_100%)]" />
          <Logo variant="light" showIcon size="md" />
          <div className="mt-3 flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full border border-[rgba(252,179,22,0.35)] bg-[rgba(252,179,22,0.12)] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--neat-gold)]"
              style={{ fontFamily: "var(--font-subheading)" }}
            >
              Manager
            </span>
            <p className="text-[#fffefe]/60 text-xs" style={{ fontFamily: "var(--font-body)" }}>
              Operations Portal
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p
            className="px-3 pb-1 text-[10px] uppercase tracking-[0.18em] text-[#fffefe]/45"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "border-[var(--neat-gold)] bg-[var(--neat-gold)] text-[var(--neat-base)] shadow-[0_12px_22px_rgba(252,179,22,0.2)]"
                    : "border-transparent text-[#fffefe]/75 hover:border-[#333333] hover:bg-[#252525] hover:text-[var(--neat-gold)]"
                }`}
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-[rgba(25,25,25,0.14)]"
                      : "bg-[#2a2a2a] text-[#fffefe]/80 group-hover:bg-[rgba(252,179,22,0.18)] group-hover:text-[var(--neat-gold)]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2a2a2a]">
          <Link
            to="/login"
            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-[#fffefe]/70 transition-all duration-200 hover:border-[#472525] hover:bg-[#2a1e1e] hover:text-[#ff8d8d]"
            style={{ fontFamily: "var(--font-subheading)" }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2a2a2a] transition-colors duration-200 group-hover:bg-[#4b2323]">
              <LogOut size={18} strokeWidth={1.8} />
            </span>
            <span className="truncate">Logout</span>
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
