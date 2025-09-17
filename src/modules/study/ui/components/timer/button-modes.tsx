import { Button } from "@/components/ui/button";

interface ButtonModesProps {
    handleToggleChange: (mode: string) => void;
    toggleMode: string;
}
const ButtonModes = ({ handleToggleChange, toggleMode }: ButtonModesProps) => {
    return (
        <div className="bg-blue-100 rounded-full flex">
            <Button
                onClick={() => handleToggleChange("work")}
                className={`cursor-pointer px-6 py-2 m-2 rounded-full font-medium transform transition-all duration-300 ${
                    toggleMode === "work"
                        ? "bg-blue-500 text-white scale-110"
                        : "text-blue-500"
                }`}
            >
                Work
            </Button>
            <Button
                onClick={() => handleToggleChange("break")}
                className={`cursor-pointer px-6 py-2 m-2 rounded-full font-medium transform transition-all duration-300 ${
                    toggleMode === "break"
                        ? "bg-blue-500 text-white scale-110"
                        : "text-blue-500"
                }`}
            >
                Break
            </Button>
        </div>
    );
};

export default ButtonModes;
