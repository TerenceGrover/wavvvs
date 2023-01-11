import { useEffect, useRef } from 'react';

import WaveSurfer from 'wavesurfer.js';

export default function Track() {
  const waveformRef = useRef();

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        barHeight: 1.5,
        barWidth: 2,
        height: 32,
      });
      wavesurfer.on('ready', function () {
        console.log('Track ready!');
        // wavesurfer.play();
      });
      wavesurfer.load(
        'https://actions.google.com/sounds/v1/science_fiction/creature_distortion_white_noise.ogg'
      );
      return () => wavesurfer.destroy();
    }
  }, []);

  return (
    <div className='w-full'>
      <h4 className="text-white">Title</h4>
      <div className="w-64" ref={waveformRef}></div>
    </div>
  );
}
