import { useState, useEffect } from 'react';
import { IoPlay, IoStop } from 'react-icons/io5';
import { TbPlayerSkipBack, TbPlayerSkipForward } from 'react-icons/tb';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function MediaController({ activeTrack, setTrackList }) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    console.log({ activeTrack });
  }, [activeTrack]);

  const handlePlayClick = () => {
    setTrackList((tracks) => {
      const stateWithToggledState = tracks.map((track) => {
        if (track.waveformRef.id === activeTrack.waveformRef.id) {
          return {
            ...track,
            isPlaying: !track.isPlaying,
            isActive: track.isPlaying || true,
          };
        }
        return track;
      });

      return stateWithToggledState.map((track) => {
        if (track.isPlaying) {
          if (track.waveformRef.id !== activeTrack.waveformRef.id) {
            track.isPlaying = !track.isPlaying;
          }
        }
        if (track.isActive) {
          if (track.waveformRef.id !== activeTrack.waveformRef.id) {
            track.isActive = !track.isActive;
          }
        }
        return track;
      });
    });
  };

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="static">
      <header className="h-20 fixed bottom-0 left-0 right-0 text-white bg-neutral-800 z-10">
        <div className=" flex h-full justify-between items-center">
          <div className="flex w-28 justify-between items-center ml-14">
            <TbPlayerSkipBack className="text-neutral-200 h-10 w-10 mr-3" />
            {!activeTrack?.isPlaying ? (
              <IoPlay
                onClick={handlePlayClick}
                className="text-neutral-200 h-12 w-12 mr-3"
              />
            ) : (
              <IoStop
                onClick={handlePlayClick}
                className="text-neutral-200 h-12 w-12 mr-3"
              />
            )}
            <TbPlayerSkipForward className="text-neutral-200 h-10 w-10 mr-3" />
          </div>
          <div className="flex w-14 justify-between items-center">
            {isMuted ? (
              <FiVolumeX
                onClick={handleMuteClick}
                className="text-neutral-200 h-7 w-7 mr-3"
              />
            ) : (
              <FiVolume2
                onClick={handleMuteClick}
                className="text-neutral-200 h-7 w-7 mr-3"
              />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
