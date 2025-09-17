"use client";
import { useState } from "react";
import Timer from "../components/timer";
import ButtonModes from "../components/timer/button-modes";
import RainContainer from "../components/rain-animation";

const TimerSection = () => {
    const [toggleMode, setToggleMode] = useState("work");
    const [timerActive, setTimerActive] = useState(false);
    const [initialTime, setInitialTime] = useState(10);

    const handleToggleChange = (mode: string) => {
        setToggleMode(mode);
        if (mode === "break") {
            setInitialTime(600);
            setTimerActive(false);
        } else setInitialTime(3600);
    };

    const handleTimerActiveChange = (isTimerActive: boolean | null) => {
        if (isTimerActive == null) setTimerActive((prev) => !prev);
        else setTimerActive(isTimerActive);
    };

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
        </div>
    );
};

export default TimerSection;
