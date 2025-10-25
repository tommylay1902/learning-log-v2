import { Button } from "@/components/ui/button";

interface ButtonModesProps {
  handleToggleChange: (mode: string) => void;
  handleTimerActiveChange: (isTimerActive: boolean | null) => void;
  toggleMode: string;
}
const ButtonModes = ({
  handleToggleChange,
  handleTimerActiveChange,
  toggleMode,
}: ButtonModesProps) => {
  return (
    <div className="bg-blue-100 rounded-full ">
      <Button
        onClick={() => {
          if (toggleMode !== "work") {
            handleToggleChange("work");
            handleTimerActiveChange(false);
          }
        }}
        className={`cursor-pointer rounded-full font-medium transform transition-all duration-300 min-w-[7dvw] ${
          toggleMode === "work"
            ? "bg-blue-500 text-white hover:bg-blue-500"
            : "text-blue-500"
        }`}
      >
        Work
      </Button>
      <Button
        onClick={() => {
          if (toggleMode !== "break") {
            handleToggleChange("break");
            handleTimerActiveChange(false);
          }
        }}
        className={`cursor-pointer  rounded-full font-medium transform transition-all duration-300 min-w-[7dvw] ${
          toggleMode === "break"
            ? "bg-blue-500 text-white hover:bg-blue-500"
            : "text-blue-500"
        }`}
      >
        Break
      </Button>
    </div>
  );
};

export default ButtonModes;
