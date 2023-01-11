import { useState, useEffect, useRef } from 'react';

import WaveSurfer from 'wavesurfer.js';
import { IoPlay, IoStop } from 'react-icons/io5';

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
        // wavesurfer.play();
      });
      wavesurfer.load(
        'https://actions.google.com/sounds/v1/science_fiction/creature_distortion_white_noise.ogg'
      );
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
    <div className="mb-9">
      <h4 className="text-white text-xs pl-6 mb-2">Chopin - Nocturne op.2</h4>
      <div className="flex align-center items-center">
        {isPlaying ? (
          <IoStop onClick={handleClick} color="white" />
        ) : (
          <IoPlay onClick={handleClick} color="white" />
        )}
        <div className="w-96 max-w-full" ref={waveformRef}></div>
      </div>
    </div>
  );
}
