
import React, { useState } from "react";
import { formatTime } from "@/utils/timerUtils";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw, Pencil, Save } from "lucide-react";

interface TimerDisplayProps {
  timeLeft: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onTimeChange: (newTime: number) => void; // <- Add this
  timerMode: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  isRunning,
  onStart,
  onPause,
  onReset,
  onTimeChange,
  timerMode
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(formatTime(timeLeft));

  const handleEditClick = () => {
    setEditValue(formatTime(timeLeft));
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const parts = editValue.split(":").map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const newTime = parts[0] * 60 + parts[1];
      onTimeChange(newTime);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-8xl font-bold tracking-tight mb-8 text-white drop-shadow-lg">
        {isEditing ? (
          <input
              className="text-6xl text-center font-bold tracking-wide text-white bg-white/10 backdrop-blur-md rounded-xl px-6 py-2 shadow-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition duration-200 w-[240px]"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="MM:SS"
          />
        ) : (
          formatTime(timeLeft)
        )}
      </div>

      <div className="flex gap-4 mb-4">
        {!isRunning ? (
          <Button 
            onClick={onStart} 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white px-8"
          >
            <Play className="mr-2 h-5 w-5" /> Start
          </Button>
        ) : (
          <Button 
            onClick={onPause} 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-white px-8"
          >
            <Pause className="mr-2 h-5 w-5" /> Pause
          </Button>
        )}

        <Button 
          onClick={onReset} 
          variant="outline" 
          size="lg" 
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
        >
          <RefreshCw className="mr-2 h-5 w-5" /> Reset
        </Button>

        {isEditing ? (
          <Button 
            onClick={handleSaveClick} 
            size="lg" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Save className="mr-2 h-5 w-5" /> Save
          </Button>
        ) : (
          <Button 
            onClick={handleEditClick} 
            size="lg" 
            className="bg-slate-500 hover:bg-slate-600 text-white"
          >
            <Pencil className="mr-2 h-5 w-5" /> Edit
          </Button>
        )}
      </div>

      <div className="text-white/80 font-medium text-lg">
        {timerMode === "pomodoro" ? "Focus Time" : 
          timerMode === "shortBreak" ? "Short Break" : "Long Break"}
      </div>
    </div>
  );
};

export default TimerDisplay;
