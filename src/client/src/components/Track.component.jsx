import { useEffect, useRef } from 'react';
import { IoPlay, IoStop } from 'react-icons/io5';

import WaveSurfer from 'wavesurfer.js';

const staticTrackURL = 'http://localhost:3001/tracks/';

export default function Track({
  fileName,
  trackRefsAndPlayingStatus,
  setTrackRefsAndPlayingStatus,
}) {
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
      wavesurfer.on('ready', function () {
        console.log('Track ready!');
      });

      wavesurfer.load(staticTrackURL + fileName.filename);
      waveformRef.id = fileName.filename;
      waveformRef.wavesurfer = wavesurfer;

      setTrackRefsAndPlayingStatus((refsAndStatus) => [
        ...refsAndStatus,
        { waveformRef, isPlaying: false, isActive: false },
      ]);

      return () => {
        setTrackRefsAndPlayingStatus((refsAndStatus) => {
          return refsAndStatus.filter(
            (ref) => ref.waveformRef.id !== fileName.filename
          );
        });
        wavesurfer.destroy();
      };
    }
  }, [fileName.filename, setTrackRefsAndPlayingStatus]);

  if (trackRefsAndPlayingStatus) {
    if (trackRefsAndPlayingStatus.isPlaying) {
      trackRefsAndPlayingStatus.waveformRef?.wavesurfer.play();
    } else {
      trackRefsAndPlayingStatus.waveformRef?.wavesurfer.stop();
    }
  }

  const handleClick = () => {
    setTrackRefsAndPlayingStatus((refsAndStatus) => {
      const stateWithToggledState = refsAndStatus.map((ref) => {
        if (ref.waveformRef.id === fileName.filename) {
          return {
            ...ref,
            isPlaying: !ref.isPlaying,
            isActive: ref.isPlaying || true,
          };
        }
        return ref;
      });

      return stateWithToggledState.map((ref) => {
        if (ref.isPlaying) {
          if (ref.waveformRef.id !== fileName.filename) {
            ref.isPlaying = !ref.isPlaying;
          }
        }
        if (ref.isActive) {
          if (ref.waveformRef.id !== fileName.filename) {
            ref.isActive = !ref.isActive;
          }
        }
        return ref;
      });
    });
  };

  return (
    <div className="mb-9  h-12 ">
      <h4 className="text-white text-xs pl-9 mb-2">{fileName.originalname}</h4>
      <div className="flex align-center items-center overflow-hidden">
        <div className="mr-2">
          {trackRefsAndPlayingStatus?.isPlaying ? (
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
