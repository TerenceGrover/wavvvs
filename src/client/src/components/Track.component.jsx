import { useState, useEffect, useRef } from 'react';
import { IoPlay, IoStop } from 'react-icons/io5';

import WaveSurfer from 'wavesurfer.js';

export default function Track() {
  const [isPlaying, setIsPlaying] = useState(false);
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
      wavesurfer.load('http://localhost:3001/tracks/audio.wav');
      waveformRef.wavesurfer = wavesurfer;
      return () => wavesurfer.destroy();
    }
  }, []);

  const handleClick = () => {
    if (!isPlaying) {
      waveformRef.wavesurfer.play();
    } else {
      waveformRef.wavesurfer.stop();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mb-9  h-12 ">
      <h4 className="text-white text-xs pl-6 mb-2">Audio test</h4>
      <div className="flex align-center items-center">
        <div className="mr-2">
          {isPlaying ? (
            <IoStop onClick={handleClick} className="text-white w-5 h-5" />
          ) : (
            <IoPlay onClick={handleClick} className="text-white w-5 h-5" />
          )}
        </div>
        <div
          className="w-full max-w-full overflow-hidden ml-2"
          ref={waveformRef}
        ></div>
      </div>
    </div>
  );
}
