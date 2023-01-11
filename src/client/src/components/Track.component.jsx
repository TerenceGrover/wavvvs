import { useEffect, useRef } from 'react';

import WaveSurfer from 'wavesurfer.js';

export default function Track() {
  const waveformRef = useRef();

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
      });
      wavesurfer.on('ready', function () {
        // wavesurfer.play();
      });
      wavesurfer.load(
        'https://actions.google.com/sounds/v1/science_fiction/creature_distortion_white_noise.ogg'
      );
      return () => wavesurfer.destroy();
    }
  }, []);

  return (
    <div>
      <div className="w-64" ref={waveformRef}></div>
    </div>
  );
}
