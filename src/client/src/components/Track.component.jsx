import { useState, useEffect, useRef } from 'react';
import { IoPlay, IoStop } from 'react-icons/io5';

import WaveSurfer from 'wavesurfer.js';

const staticTrackURL = 'http://localhost:3001/tracks/';

export default function Track({
  fileName,
  referenceToTracksAndPlayingStatus,
  setReferencesToTracksAndPlayingStatus,
}) {
  const waveformRef = useRef();

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        barHeight: 3,
        barWidth: 2,
        height: 18,
        normalize: true,
      });
      wavesurfer.on('ready', function () {
        console.log('Track ready!');
      });
      wavesurfer.load(staticTrackURL + fileName.filename);
      waveformRef.wavesurfer = wavesurfer;
      setReferencesToTracksAndPlayingStatus((refsAndStatus) => [
        ...refsAndStatus,
        { ref: {...waveformRef}, isPlaying: false },
      ]);
      console.log(referenceToTracksAndPlayingStatus);
      return () => wavesurfer.destroy();
    }
  }, [
    fileName.filename,
    setReferencesToTracksAndPlayingStatus,
    referenceToTracksAndPlayingStatus,
  ]);

  useEffect(() => {
    referenceToTracksAndPlayingStatus?.isPlaying
      ? waveformRef.wavesurfer.play()
      : waveformRef.wavesurfer.stop();
  }, [referenceToTracksAndPlayingStatus.isPlaying]);

  const handleClick = () => {
    setReferencesToTracksAndPlayingStatus(
      referenceToTracksAndPlayingStatus?.isPlaying ? true : false
    );
  };

  return (
    <div className="mb-9  h-12 ">
      <h4 className="text-white text-xs pl-9 mb-2">{fileName.originalname}</h4>
      <div className="flex align-center items-center overflow-hidden">
        <div className="mr-2">
          {referenceToTracksAndPlayingStatus?.isPlaying ? (
            <IoStop onClick={handleClick} className="text-white w-5 h-5" />
          ) : (
            <IoPlay onClick={handleClick} className="text-white w-5 h-5" />
          )}
        </div>
        <div className="w-full overflow-hidden ml-2" ref={waveformRef}></div>
      </div>
    </div>
  );
}
