import React from "react";
import { BookingStatus } from "../../data/mockData";
import { CheckCircle, Clock, Truck, Wrench, AlertCircle } from "lucide-react";

interface StatusTrackerProps {
  status: BookingStatus;
  startTime?: string;
  completionTime?: string;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({
  status,
  startTime,
  completionTime
}) => {
  const steps: Array<{
    key: BookingStatus;
    label: string;
    icon: React.ReactNode;
  }> = [
    { key: "pending_approval", label: "Submitted", icon: <AlertCircle size={20} /> },
    { key: "assigned", label: "Assigned", icon: <CheckCircle size={20} /> },
    { key: "on_the_way", label: "On The Way", icon: <Truck size={20} /> },
    { key: "in_progress", label: "Cleaning", icon: <Wrench size={20} /> },
    { key: "completed", label: "Completed", icon: <CheckCircle size={20} /> }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === status);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  index <= currentStepIndex
                    ? "bg-[#C8A96A] text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-xs mt-2 text-center font-medium ${
                  index <= currentStepIndex
                    ? "text-[#C8A96A]"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all ${
                  index < currentStepIndex
                    ? "bg-[#C8A96A]"
                    : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {status === "completed" && completionTime && (
        <p className="text-xs text-green-600 mt-4">
          Completed on {new Date(completionTime).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default StatusTracker;
