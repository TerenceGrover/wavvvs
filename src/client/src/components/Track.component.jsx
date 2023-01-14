import { useEffect, useRef } from 'react';
import { IoPlay, IoStop } from 'react-icons/io5';
import WaveSurfer from 'wavesurfer.js';

const staticTrackURL = 'http://localhost:3001/tracks/';

export default function Track({
  fileName,
  track,
  setTrackList,
  playOrPauseTrackByID,
}) {
  const trackID = fileName.filename;
  const waveformRef = useRef(null);

  useEffect(() => {
    const options = {
      container: waveformRef.current,
      barHeight: 3,
      barWidth: 2,
      height: 18,
      normalize: true,
    };

    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create(options);
      wavesurfer.on('waveform-ready', function () {
        console.log('here');
      });

      //Fetch data with load method
      wavesurfer.load(staticTrackURL + trackID);
      waveformRef.id = trackID;
      waveformRef.wavesurfer = wavesurfer;

      setTrackList((tracks) => [
        ...tracks,
        { waveformRef, isPlaying: false, isActive: false },
      ]);

      return () => {
        setTrackList((tracks) => {
          return tracks.filter((track) => track.waveformRef.id !== trackID);
        });
        wavesurfer.destroy();
      };
    }
  }, [trackID, setTrackList]);

  if (track) {
    if (track.isPlaying) {
      track.waveformRef?.wavesurfer.play();
    } else {
      track.waveformRef?.wavesurfer.stop();
    }
  }

  const handleClick = () => {
    playOrPauseTrackByID(trackID);
  };

  return (
    <div className="mb-9  h-12 ">
      <>
        <h4 className="text-white text-xs pl-9 mb-2">
          {fileName.originalname}
        </h4>
        <div className="flex align-center items-center overflow-hidden">
          <div className="mr-2">
            {track?.isPlaying ? (
              <IoStop onClick={handleClick} className="cursor-pointer text-white w-5 h-5 hover:text-neutral-400 ease-in transition duration-100" />
            ) : (
              <IoPlay onClick={handleClick} className="cursor-pointer text-white w-5 h-5 hover:text-neutral-400 ease-in transition duration-100" />
            )}
          </div>
          <div className="w-full overflow-hidden ml-2" ref={waveformRef}></div>
        </div>
      </>
    </div>
  );
}
