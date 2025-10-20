"use client";

import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VolumeOff, Volume2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
interface VolumeControlProps {
  isMuted: boolean;
  handleMuteChange: (isMuted: boolean) => void;
  handleVolumeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const VolumeControl: React.FC<VolumeControlProps> = ({
  isMuted,
  handleMuteChange,
  handleVolumeChange,
}) => {
  const [volume, setVolume] = useState("1");
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-row justify-items-center items-center gap-x-3 group my-3">
            <div
              onClick={() => handleMuteChange(!isMuted)}
              className="cursor-pointer"
            >
              {isMuted ? <VolumeOff size={48} /> : <Volume2 size={48} />}
            </div>
            <div className="invisible group-hover:visible my-3">
              <Input
                type="range"
                step="0.05"
                min="0"
                max="1"
                value={volume}
                onChange={(e) => {
                  setVolume(e.target.value);
                  handleVolumeChange(e);
                }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Will play rain noises when working pomo is activated</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default VolumeControl;
