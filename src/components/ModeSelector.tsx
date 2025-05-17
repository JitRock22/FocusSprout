
import React from "react";
import { Button } from "@/components/ui/button";

interface ModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex justify-center gap-2 mb-8">
      <Button
        onClick={() => onModeChange("pomodoro")}
        variant={currentMode === "pomodoro" ? "default" : "outline"}
        className={
          currentMode === "pomodoro"
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
        }
      >
        Pomodoro
      </Button>
      
      <Button
        onClick={() => onModeChange("shortBreak")}
        variant={currentMode === "shortBreak" ? "default" : "outline"}
        className={
          currentMode === "shortBreak"
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
        }
      >
        Short Break
      </Button>
      
      <Button
        onClick={() => onModeChange("longBreak")}
        variant={currentMode === "longBreak" ? "default" : "outline"}
        className={
          currentMode === "longBreak"
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
        }
      >
        Long Break
      </Button>
    </div>
  );
};

export default ModeSelector;
