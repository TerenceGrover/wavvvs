import _ from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { IoPlay, IoStop } from 'react-icons/io5';

import WaveSurfer from 'wavesurfer.js';

const staticTrackURL = 'http://localhost:3001/tracks/';

export default function Track({
  fileName,
  referenceToTracksAndPlayingStatus,
  setReferencesToTracksAndPlayingStatus,
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

      setReferencesToTracksAndPlayingStatus((refsAndStatus) => [
        ...refsAndStatus,
        { waveformRef, isPlaying: false },
      ]);

      return () => {
        setReferencesToTracksAndPlayingStatus((refsAndStatus) => {
          return refsAndStatus.filter(
            (ref) => ref.waveformRef.id !== fileName.filename
          );
        });
        wavesurfer.destroy();
      };
    }
  }, [fileName.filename, setReferencesToTracksAndPlayingStatus]);

  useEffect(() => {
    if (referenceToTracksAndPlayingStatus) {
      if (referenceToTracksAndPlayingStatus.isPlaying) {
        referenceToTracksAndPlayingStatus.waveformRef?.wavesurfer.play();
      } else {
        referenceToTracksAndPlayingStatus.waveformRef?.wavesurfer.stop();
      }
    }
  }, [
    referenceToTracksAndPlayingStatus?.isPlaying,
    referenceToTracksAndPlayingStatus,
  ]);

  const handleClick = () => {
    setReferencesToTracksAndPlayingStatus((refsAndStatus) => {
      const stateWithToggledState = refsAndStatus.map((refAndStatus) => {
        if (refAndStatus.waveformRef.id === fileName.filename) {
          return { ...refAndStatus, isPlaying: !refAndStatus.isPlaying };
        }
        return refAndStatus;
      });
      return stateWithToggledState.map((refAndStatus) => {
        if (refAndStatus.isPlaying) {
          if (refAndStatus.waveformRef.id !== fileName.filename) {
            refAndStatus.isPlaying = !refAndStatus.isPlaying;
          }
        }
        return refAndStatus;
      });
    });
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
