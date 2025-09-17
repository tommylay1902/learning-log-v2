"use client";
import { useState } from "react";
import Timer from "../components/timer";
import ButtonModes from "../components/timer/button-modes";

const TimerSection = () => {
    const [toggleMode, setToggleMode] = useState("work");
    const [initialTime, setInitialTime] = useState(3600);

    const handleToggleChange = (mode: string) => {
        setToggleMode(mode);
        if (mode === "break") setInitialTime(600);
        else setInitialTime(3600);
    };

    return (
        <div className="flex items-center justify-center mt-8">
            <div className="bg-gray-900 shadow-xl min-w-[50vw] p-8 rounded-2xl">
                <div className="flex justify-center items-center justify-items-center rounded-full">
                    <ButtonModes
                        handleToggleChange={handleToggleChange}
                        toggleMode={toggleMode}
                    />
                </div>
                <div>
                    <Timer initialTime={initialTime} toggle={toggleMode} />
                </div>
            </div>
        </div>
    );
};

export default TimerSection;
