"use client";
import { useEffect, useRef, useState } from "react";
import Timer from "../components/timer";
import ButtonModes from "../components/timer/button-modes";
import RainContainer from "../components/rain-animation";
import Audio from "../components/audio";
import { cn } from "@/lib/utils";

const TimerSection = () => {
  const [toggleMode, setToggleMode] = useState("work");
  const [timerActive, setTimerActive] = useState(false);
  const [initialTime, setInitialTime] = useState(3600);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [originalTitle, setOriginalTitle] = useState<string>("");

  const handleToggleChange = (mode: string) => {
    setToggleMode(mode);
    if (mode === "break") {
      setInitialTime(600);
      setTimerActive(false);
    } else setInitialTime(3600);
  };

  const handleMuteChange = (isMuted: boolean) => {
    setIsMuted(isMuted);
  };

  const handleTimerActiveChange = (isTimerActive: boolean | null) => {
    if (isTimerActive == null) setTimerActive((prev) => !prev);
    else setTimerActive(isTimerActive);
  };

  useEffect(() => {
    if (audioRef.current && toggleMode === "work" && timerActive && !isMuted) {
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed:", e));
    } else audioRef.current?.pause();
  }, [isMuted, timerActive, toggleMode]);

  useEffect(() => {
    setOriginalTitle(document.title);
  }, []);

  return (
    <div className="flex items-center justify-center mt-8 ">
      <div
        className={cn(
          "shadow-xl p-8 rounded-2xl min-w-[40dvw] lg:min-h-[40dvh]  transition duration-500 ease-in-out",
          toggleMode === "work" && timerActive ? "" : "bg-gray-900",
        )}
      >
        <div
          className={cn(
            "flex justify-center items-center justify-items-center rounded-full",
            toggleMode === "work" && timerActive ? "invisible hidden" : "",
          )}
        >
          <ButtonModes
            handleToggleChange={handleToggleChange}
            toggleMode={toggleMode}
            handleTimerActiveChange={handleTimerActiveChange}
          />
        </div>
        <div>
          <Timer
            initialTime={initialTime}
            toggle={toggleMode}
            handleToggleChange={handleToggleChange}
            handleTimerActiveChange={handleTimerActiveChange}
            title={originalTitle}
          />
        </div>
      </div>
      <RainContainer start={toggleMode === "work" && timerActive} />
      <div
        className={
          toggleMode === "work"
            ? "fixed bottom-20 left-14"
            : "invisible w-0 h-0"
        }
      >
        <Audio
          isMuted={isMuted}
          ref={audioRef}
          handleMuteChange={handleMuteChange}
        />
      </div>
    </div>
  );
};

export default TimerSection;
