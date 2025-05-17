import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import TimerDisplay from "@/components/TimerDisplay";
import ModeSelector from "@/components/ModeSelector";
import QuoteDisplay from "@/components/QuoteDisplay";
import BackgroundSelector from "@/components/BackgroundSelector";
import UserNameForm from "@/components/UserNameForm";
import SpotifyPlayer from "@/components/ui/spotify_player";

const Index = () => {
  // Timer settings
  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [userName, setUserName] = useState("");
  const [background, setBackground] = useState("mountains");

  // Timer duration settings
  const timerDurations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // Timer audio
  const playTimerEndSound = () => {
    const audio = new Audio("/timer-end.mp3");
    audio.play().catch((error) => console.error("Audio play failed:", error));
  };

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(timerDurations[mode]);
    setIsRunning(false);
  }, [mode]);

  // Timer countdown
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playTimerEndSound();
      setIsRunning(false);

      // Auto switch to the next mode
      if (mode === "pomodoro") {
        setMode("shortBreak");
        toast("Time to take a short break!");
      } else if (mode === "shortBreak") {
        setMode("pomodoro");
        toast("Break over! Time to focus.");
      } else if (mode === "longBreak") {
        setMode("pomodoro");
        toast("Long break over! Time to focus.");
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode]);

  // Handlers
  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(timerDurations[mode]);
  };

  const handleModeChange = (newMode) => setMode(newMode);
  const handleBackgroundChange = (newBg) => setBackground(newBg);
  const handleNameSubmit = (name) => setUserName(name);

  // Inline background style
  const backgroundUrl = `/backgrounds/${background}.jpg`;

  return (
    <>
      {/* Sonner Toaster for notifications */}
      <Toaster richColors />

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        <BackgroundSelector
          onBackgroundChange={handleBackgroundChange}
          currentBackground={background}
        />

        <div className="container max-w-6xl z-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="text-center mb-8">
                <UserNameForm
                  onNameSubmit={handleNameSubmit}
                  userName={userName}
                />

                <ModeSelector
                  currentMode={mode}
                  onModeChange={handleModeChange}
                />

                  <TimerDisplay
                  timeLeft={timeLeft}
                  isRunning={isRunning}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleReset}
                  onTimeChange={(newTime) => setTimeLeft(newTime)} // <-- add this
                  timerMode={mode}
                />
              </div>
            </div>

            <div className="md:col-span-1 gap-4 flex flex-col items-center">
              <SpotifyPlayer />
              <QuoteDisplay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
