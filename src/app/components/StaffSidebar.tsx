import { Link, useLocation } from "react-router";
import { Briefcase, FileText, Image, User, LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/staff", label: "Jobs", icon: Briefcase },
  { path: "/staff/reports", label: "Reports", icon: FileText },
  { path: "/staff/gallery", label: "Gallery", icon: Image },
  { path: "/staff/profile", label: "Profile", icon: User },
];

export default function StaffSidebar() {
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#fcb316] text-[#191919] rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen bg-[#1e1e1e] border-r border-[#2a2a2a] flex flex-col transition-all duration-300 ${
          isMobile ? (isOpen ? "w-64" : "w-0 -translate-x-full") : "w-64"
        } md:w-64 md:translate-x-0`}
      >
        <div className="p-6 border-b border-[#2a2a2a]">
          <Logo variant="light" showIcon size="md" />
          <p className="text-[#fffefe]/60 mt-2 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Staff Portal
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-[#fcb316] text-[#191919]"
                    : "text-[#fffefe]/70 hover:bg-[#222222] hover:text-[#fcb316]"
                }`}
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2a2a2a]">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-md text-[#fffefe]/70 hover:bg-[#222222] hover:text-red-400 transition-all duration-200"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            <LogOut size={20} strokeWidth={1.5} />
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
