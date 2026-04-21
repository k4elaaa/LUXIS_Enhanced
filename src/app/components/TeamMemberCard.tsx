import React from "react";
import { StaffMember } from "../../data/mockData";
import { Star, CheckCircle, AlertCircle } from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";

interface TeamMemberCardProps {
  member: StaffMember;
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  isSelected = false,
  onSelect
}) => {
  const availabilityColors = {
    available: "bg-green-100 text-green-800",
    busy: "bg-yellow-100 text-yellow-800",
    off: "bg-red-100 text-red-800"
  };

  const availabilityIcons = {
    available: <CheckCircle size={14} />,
    busy: <AlertCircle size={14} />,
    off: <AlertCircle size={14} />
  };

  return (
    <div
      onClick={() => onSelect?.(!isSelected)}
      className={`border rounded-xl p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-[#C8A96A] bg-[#F8F8F8] shadow-md"
          : "border-gray-200 bg-white hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          {onSelect && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(checked as boolean)}
              className="mt-1"
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <p className="text-xs text-gray-500">{member.email}</p>
          </div>
        </div>
        <div className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${availabilityColors[member.availability]}`}>
          {availabilityIcons[member.availability]}
          <span className="capitalize">{member.availability}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Completed Jobs</p>
          <p className="font-semibold text-gray-900">{member.completedJobs}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Rating</p>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[#C8A96A] text-[#C8A96A]" />
            <p className="font-semibold text-gray-900">{member.rating}</p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">Skills</p>
        <div className="flex flex-wrap gap-1">
          {member.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs bg-[#F8F8F8] text-gray-700 px-2 py-1 rounded-md"
            >
              {skill.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Joined: {new Date(member.joinedDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TeamMemberCard;
