import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import millisecondsToHours from 'date-fns/millisecondsToHours';
import { deleteTrack } from '../apiService/api-service.js';
import { IoPlay, IoStop } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

const staticTrackURL = 'http://localhost:3001/tracks/';

export default function Track({
  trackMetaData,
  track,
  setTrackList,
  playOrPauseTrackByID,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const waveformRef = useRef(null);

  const { path, title, date } = trackMetaData;

  const hoursSinceUploaded = millisecondsToHours(Number(Date.now() - date));
  if (hoursSinceUploaded >= 24) deleteTrack(path); // in this case the path is the id

  useEffect(() => {
    const options = {
      container: waveformRef.current,
      barHeight: 3,
      barWidth: 2,
      height: 18,
      normalize: true,
      waveColor: '#383838',
      progressColor: '#999',
    };

    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create(options);

      //The load method handles the actual fetching of the audio
      wavesurfer.load(staticTrackURL + path);
      waveformRef.id = path;
      waveformRef.wavesurfer = wavesurfer;

      setTrackList((tracks) => [
        ...tracks,
        { waveformRef, isPlaying: false, isActive: false },
      ]);

      return () => {
        setTrackList((tracks) => {
          return tracks.filter((track) => track.waveformRef.id !== path);
        });
        wavesurfer.destroy();
      };
    }
  }, [path, setTrackList]);

  if (track) {
    if (track.isPlaying) {
      track.waveformRef?.wavesurfer.play();
    } else {
      track.waveformRef?.wavesurfer.stop();
    }
  }

  const handleClick = () => {
    playOrPauseTrackByID(path);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleDelete = () => {
    deleteTrack(path);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="h-12 mb-10"
    >
      <div className="flex justify-between w-full">
        {isHovering ? (
          <MdClose
            className="text-neutral-300 p-0 m-0 cursor-pointer hover:text-neutral-600 ease-in transition duration-100"
            onClick={handleDelete}
          />
        ) : (
          <div className="w-4"></div>
        )}
        <h4 className=" text-neutral-300 text-xs mb-2">{title}</h4>
        <h4 className="text-neutral-600 text-xs pl-9 mb-2">
          {hoursSinceUploaded ? hoursSinceUploaded + 'h' : 'now'}
        </h4>
      </div>
      <div className="flex align-center items-center overflow-hidden">
        <div className="mr-2">
          {track?.isPlaying ? (
            <IoStop
              onClick={handleClick}
              className="cursor-pointer text-white w-5 h-5 hover:text-neutral-400 ease-in transition duration-100"
            />
          ) : (
            <IoPlay
              onClick={handleClick}
              className="cursor-pointer text-white w-5 h-5 hover:text-neutral-400 ease-in transition duration-100"
            />
          )}
        </div>
        <div className="w-full overflow-hidden ml-2" ref={waveformRef}></div>
      </div>
    </div>
  );
}
