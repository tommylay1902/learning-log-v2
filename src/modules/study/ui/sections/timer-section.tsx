"use client";
import { useEffect, useRef, useState } from "react";
import Timer from "../components/timer";
import ButtonModes from "../components/timer/button-modes";
import RainContainer from "../components/rain-animation";
import Audio from "../components/audio";

const TimerSection = () => {
  const [toggleMode, setToggleMode] = useState("work");
  const [timerActive, setTimerActive] = useState(false);
  const [initialTime, setInitialTime] = useState(3600);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    console.log(toggleMode, timerActive);
    if (audioRef.current && toggleMode === "work" && timerActive && !isMuted) {
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed:", e));
    } else audioRef.current?.pause();
  }, [isMuted, timerActive, toggleMode]);

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="bg-gray-900 shadow-xl min-w-[50vw] p-8 rounded-2xl">
        <div className="flex justify-center items-center justify-items-center rounded-full">
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
