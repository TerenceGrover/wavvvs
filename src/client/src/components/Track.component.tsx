import { useEffect, useRef, useState } from 'react';
import { TrackType, TrackListItemType } from '../Interfaces.js';
import WaveSurfer from 'wavesurfer.js';
import millisecondsToHours from 'date-fns/millisecondsToHours';
import { IoPlay, IoStop } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import DeleteWarningModal from './DeleteWarningModal.component';
import React from 'react';
import { getAllTracks } from '../apiService/api-service.js';

export default function Track(props : {
  trackMetaData : TrackType;
  track : TrackListItemType;
  setTrackList : React.Dispatch<React.SetStateAction<TrackListItemType[]>>;
  playOrPauseTrackByID : (id : string) => void;
  setCurrentUser : React.Dispatch<React.SetStateAction<any>>;
}) {
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const waveformRef : any = useRef("waveform");

  const { path, title, date, uploaded_by } = props.trackMetaData;
  const hoursSinceUploaded = millisecondsToHours(Number(Date.now() - date));

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

    const wavesurfer = WaveSurfer.create(options);

    //The load method handles the actual fetching of the audio
    wavesurfer.load(props.track + path);

    waveformRef.id = path;
    waveformRef.wavesurfer = wavesurfer;

    // add on finish event listener
    wavesurfer.on('finish', () => {
      props.setTrackList((tracks) =>
        tracks.map((track) =>
          track.waveformRef.id === path ? { ...track, isFinished: true } : track
        )
      );
    });

    props.setTrackList((tracks) => [
      ...tracks,
      { waveformRef, isPlaying: false, isActive: false, isFinished: false },
    ]);

    return () => {
      // clean up function
      props.setTrackList((tracks) => {
        return tracks.filter((track) => track.waveformRef.id !== path);
      });
      // remove event listener
      wavesurfer.un('finish', () => {
        props.setTrackList((tracks) =>
          tracks.map((track) =>
            track.waveformRef.id === path
              ? { ...track, isFinished: false }
              : track
          )
        );
      });
      // destroy the instance
      wavesurfer.destroy();
    };
  }, [path, props.setTrackList]);

  if (props.track) {
    if (props.track.isPlaying) {
      props.track.waveformRef?.wavesurfer.play();
    } else {
      props.track.waveformRef?.wavesurfer.stop();
    }
  }

  const handleClick = () => {
    props.playOrPauseTrackByID(path);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="h-12 mb-10"
    >
      <DeleteWarningModal
        setOpen={setOpen}
        open={open}
        trackPath={path}
        setCurrentUser={props.setCurrentUser}
      />
      <div className="relative flex justify-between w-full">
        {isHovering && uploaded_by === 'mateopresa' ? (
          <MdClose
            className="text-neutral-300 p-0 m-0 cursor-pointer hover:text-red-500 ease-in transition duration-100"
            onClick={handleDelete}
          />
        ) : (
          <div className="w-4"></div>
        )}
        <h4 className=" absolute left-4 text-neutral-300 text-xs mb-2 ml-5">
          {title}
        </h4>
        <h4 className="text-neutral-600 text-xs pl-9 mb-2">
          {hoursSinceUploaded ? hoursSinceUploaded + 'h' : 'now'}
        </h4>
      </div>
      <div className="flex align-center items-center overflow-hidden">
        <div className="mr-2">
          {props.track?.isPlaying ? (
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
