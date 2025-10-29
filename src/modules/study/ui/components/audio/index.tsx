import React, { ChangeEvent, forwardRef } from "react";
import AudioPlayer from "./audio-player";
import VolumeControl from "./volume-control";

interface AudioProps {
  isMuted: boolean;
  handleMuteChange: (isMuted: boolean) => void;
}

const Audio = forwardRef<HTMLAudioElement, AudioProps>(
  ({ isMuted, handleMuteChange }, ref) => {
    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!ref || !("current" in ref) || !ref.current || !event.target) return;
      ref.current.volume = +event.target.value;
    };
    return (
      <div className={`flex items-center gap-4 `}>
        <AudioPlayer ref={ref} isMuted={isMuted} />
        <VolumeControl
          isMuted={isMuted}
          handleMuteChange={handleMuteChange}
          handleVolumeChange={handleVolumeChange}
        />
      </div>
    );
  },
);

Audio.displayName = "audio";

export default Audio;
