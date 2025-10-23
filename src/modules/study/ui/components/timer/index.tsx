"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useCallback } from "react";

interface TimerProps {
  initialTime: number;
  toggle: string;
  handleToggleChange: (mode: string) => void;
  handleTimerActiveChange: (isTimerActive: boolean | null) => void;
  title: string;
}

const Timer: React.FC<TimerProps> = ({
  initialTime = 3600,
  toggle,
  handleToggleChange,
  handleTimerActiveChange,
  title,
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
    handleTimerActiveChange(null);
  }, [handleTimerActiveChange]);

  const toggleRunning = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const toggleTimerActive = useCallback(() => {
    handleTimerActiveChange(null);
  }, [handleTimerActiveChange]);

  useEffect(() => {
    setTime(initialTime);
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [initialTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      document.title = `${toggle.toLocaleUpperCase()} | ${Math.floor(time / 60).toFixed(0)}:${time % 60 <= 9 ? "0" + (time % 60) : time % 60}`;
    } else if (intervalRef.current) {
      document.title = title;
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time, handleTimerActiveChange, title, toggle]);

  useEffect(() => {
    if (time === 0) {
      const timer = setTimeout(() => {
        setTime(initialTime);
        alert("done!");
        handleToggleChange(toggle === "work" ? "break" : "work");
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [time, initialTime, handleToggleChange, toggle]);

  useEffect(() => {
    const handleKeyUpEvent = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setIsRunning((prev) => !prev);
        handleTimerActiveChange(null);
      }
    };

    window.addEventListener("keyup", handleKeyUpEvent);

    return () => {
      window.removeEventListener("keyup", handleKeyUpEvent);
    };
  }, [toggleRunning, toggleTimerActive, handleTimerActiveChange, toggleTimer]);

  return (
    <div className="text-center lg:text-8xl font-bold flex flex-col items-center justify-center justify-items-center md:text-6xl text-3xl">
      <div>{isRunning ? "Focus" : "Stopped"}</div>
      <div>
        {Math.floor(time / 60).toFixed(0)}:{" "}
        {time % 60 <= 9 ? "0" + (time % 60) : time % 60}
      </div>
      <div>
        <Button
          className="sm:h-9 md:h-12 rounded-md px-3 w-[20vw] font-bold cursor-pointer"
          onClick={toggleTimer}
          onMouseDown={(e) => e.preventDefault()}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default Timer;
