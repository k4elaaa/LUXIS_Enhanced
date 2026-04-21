import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimeMeterProps {
  estimatedDuration: number; // in minutes
  isRunning?: boolean;
  currentFocus?: string;
}

export const TimeMeter: React.FC<TimeMeterProps> = ({
  estimatedDuration,
  isRunning = false,
  currentFocus = "Kitchen & Bathrooms"
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsed(prev => {
        const newElapsed = prev + 1;
        return newElapsed > estimatedDuration * 60 ? estimatedDuration * 60 : newElapsed;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, estimatedDuration]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const remainingSeconds = estimatedDuration * 60 - elapsed;
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const progress = ((elapsed / (estimatedDuration * 60)) * 100) || 0;

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-[#C8A96A]" size={20} />
        <h3 className="font-semibold text-gray-900">Cleaning Progress</h3>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#C8A96A] to-[#D4B776] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Time Display */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Time Elapsed</p>
          <p className="text-2xl font-bold text-gray-900">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>
        <div className="text-center border-l border-r border-gray-300">
          <p className="text-sm text-gray-600">Time Remaining</p>
          <p className="text-2xl font-bold text-[#C8A96A]">
            {String(remainingMinutes).padStart(2, "0")}:
            {String(remainingSeconds % 60).padStart(2, "0")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Estimated Total</p>
          <p className="text-2xl font-bold text-gray-900">
            {String(estimatedDuration).padStart(2, "0")}:00
          </p>
        </div>
      </div>

      {/* Current Focus */}
      <div className="bg-[#F8F8F8] rounded-lg p-3">
        <p className="text-xs text-gray-600 mb-1">Currently Focusing On</p>
        <p className="text-sm font-semibold text-gray-900">{currentFocus}</p>
      </div>
    </div>
  );
};

export default TimeMeter;
