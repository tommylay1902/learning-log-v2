import { Button } from "@/components/ui/button";

interface ButtonModesProps {
    handleToggleChange: (mode: string) => void;
    handleTimerActiveChange: (isTimerActive: boolean | null) => void;
    toggleMode: string;
}
const ButtonModes = ({ handleToggleChange, toggleMode }: ButtonModesProps) => {
    return (
        <div className="bg-blue-100 rounded-full ">
            <Button
                onClick={() => {
                    handleToggleChange("work");
                }}
                className={`cursor-pointer rounded-full font-medium transform transition-all duration-300 min-w-[7dvw] ${
                    toggleMode === "work"
                        ? "bg-blue-500 text-white"
                        : "text-blue-500"
                }`}
            >
                Work
            </Button>
            <Button
                onClick={() => {
                    handleToggleChange("break");
                }}
                className={`cursor-pointer  rounded-full font-medium transform transition-all duration-300 min-w-[7dvw] ${
                    toggleMode === "break"
                        ? "bg-blue-500 text-white "
                        : "text-blue-500"
                }`}
            >
                Break
            </Button>
        </div>
    );
};

export default ButtonModes;
