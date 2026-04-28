import StaffSidebar from "../../components/StaffSidebar";
import { User, Mail, Phone, MapPin, Briefcase, Star, Award } from "lucide-react";
import Logo from "../../components/Logo";

const profileData = {
  id: "ST-2001",
  name: "Liza Mendoza",
  role: "Senior Cleaner",
  email: "liza.mendoza@neat.com",
  phone: "0967-123-4567",
  location: "Mandaluyong, Metro Manila, Philippines",
  joinDate: "Jan 15, 2024",
  totalJobs: 124,
  rating: 4.9,
  attendance: "98%",
  onTimeRate: "96%",
};

const recentAchievements = [
  { title: "Top Performer", description: "Highest rating in Q1 2026", icon: Award, color: "#fcb316" },
  { title: "Perfect Attendance", description: "March 2026", icon: Star, color: "#fcb316" },
  { title: "100 Jobs Milestone", description: "Completed Feb 2026", icon: Briefcase, color: "#fcb316" },
];

export default function StaffProfile() {
  return (
    <div className="flex min-h-screen bg-[#191919]">
      <StaffSidebar />
      
      <div className="flex-1 md:ml-64 overflow-auto pb-20 md:pb-0">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-[#2a2a2a] bg-[#1e1e1e] sticky top-0 z-40">
          <Logo variant="light" size="md" />
        </div>

        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
              My Profile
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              View your information and performance
            </p>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Profile Card */}
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="w-24 h-24 bg-[#fcb316] rounded-full flex items-center justify-center">
                  <User className="text-[#191919]" size={48} />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                    {profileData.name}
                  </h2>
                  <p className="text-xl text-[#fcb316] mb-4" style={{ fontFamily: 'var(--font-subheading)' }}>
                    {profileData.role}
                  </p>
                  <p className="text-[#fffefe]/60 text-sm">
                    Employee ID: {profileData.id}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-[#fcb316]" size={20} />
                    <div>
                      <p className="text-[#fffefe]/50 text-sm">Email</p>
                      <p className="text-[#fffefe]">{profileData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-[#fcb316]" size={20} />
                    <div>
                      <p className="text-[#fffefe]/50 text-sm">Phone</p>
                      <p className="text-[#fffefe]">{profileData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-[#fcb316]" size={20} />
                    <div>
                      <p className="text-[#fffefe]/50 text-sm">Location</p>
                      <p className="text-[#fffefe]">{profileData.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#1e1e1e] p-4 rounded-lg">
                    <p className="text-[#fffefe]/50 text-sm mb-1">Member Since</p>
                    <p className="text-[#fffefe] text-lg">{profileData.joinDate}</p>
                  </div>
                  <div className="bg-[#1e1e1e] p-4 rounded-lg">
                    <p className="text-[#fffefe]/50 text-sm mb-1">Total Jobs</p>
                    <p className="text-[#fcb316] text-lg">{profileData.totalJobs}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-6 md:p-8">
              <h3 className="text-2xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-subheading)' }}>
                Service Analytics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#1e1e1e] p-4 rounded-lg text-center">
                  <Star className="text-[#fcb316] mx-auto mb-2" size={28} />
                  <p className="text-2xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>
                    {profileData.rating}
                  </p>
                  <p className="text-[#fffefe]/60 text-sm">Average Rating</p>
                </div>
                <div className="bg-[#1e1e1e] p-4 rounded-lg text-center">
                  <Briefcase className="text-[#fcb316] mx-auto mb-2" size={28} />
                  <p className="text-2xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>
                    {profileData.attendance}
                  </p>
                  <p className="text-[#fffefe]/60 text-sm">Attendance</p>
                </div>
                <div className="bg-[#1e1e1e] p-4 rounded-lg text-center col-span-2 md:col-span-1">
                  <Award className="text-[#fcb316] mx-auto mb-2" size={28} />
                  <p className="text-2xl text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-headline)' }}>
                    {profileData.onTimeRate}
                  </p>
                  <p className="text-[#fffefe]/60 text-sm">On-Time Rate</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-6 md:p-8">
              <h3 className="text-2xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-subheading)' }}>
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {recentAchievements.map((achievement, idx) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-[#1e1e1e] rounded-lg">
                      <div className="w-12 h-12 bg-[#fcb316]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="text-[#fcb316]" size={24} />
                      </div>
                      <div>
                        <h4 className="text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                          {achievement.title}
                        </h4>
                        <p className="text-[#fffefe]/60 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
