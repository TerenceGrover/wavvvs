import { IoPlay, IoStop } from 'react-icons/io5';
import { TbPlayerSkipBack, TbPlayerSkipForward } from 'react-icons/tb';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function MediaController({
  activeTrack,
  playOrPauseTrackByID,
  playNextTrack,
  playPrevTrack,
  isAudioMuted,
  setIsAudioMuted,
}) {
  activeTrack.waveformRef.wavesurfer.setMute(isAudioMuted);

  const handlePlayClick = () => {
    playOrPauseTrackByID(activeTrack.waveformRef.id);
  };

  const handleNextClick = () => {
    playNextTrack();
  };
  const handleMuteClick = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  const handlePrevClick = () => {
    playPrevTrack();
  };

  return (
    <div className="static">
      <footer className="h-12 fixed bottom-0 left-0 right-0 text-white bg-neutral-800 z-10">
        <div className="h-full flex justify-center items-center align-center">
          <div className=" flex w-96 h-full justify-between items-center lg:max-w-xl lg:w-full">
            <div className="flex w-28 justify-between items-center">
              <TbPlayerSkipBack
                onClick={handlePrevClick}
                className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400 ease-in transition duration-100"
              />
              {!activeTrack?.isPlaying ? (
                <IoPlay
                  onClick={handlePlayClick}
                  className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400 ease-in transition duration-100"
                />
              ) : (
                <IoStop
                  onClick={handlePlayClick}
                  className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400 ease-in transition duration-100"
                />
              )}
              <TbPlayerSkipForward
                onClick={handleNextClick}
                className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400 ease-in transition duration-100"
              />
            </div>
            <div className="flex w-14 justify-end items-center">
              {isAudioMuted ? (
                <FiVolumeX
                  onClick={handleMuteClick}
                  className="cursor-pointer text-neutral-200 h-5 w-7 hover:text-neutral-400 ease-in transition duration-100"
                />
              ) : (
                <FiVolume2
                  onClick={handleMuteClick}
                  className="cursor-pointer text-neutral-200 h-5 w-7 hover:text-neutral-400 ease-in transition duration-100"
                />
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
