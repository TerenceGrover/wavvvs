import { useEffect, useRef, useState } from 'react';
import { TrackType, TrackListItemType } from '../Interfaces.js';
import WaveSurfer from 'wavesurfer.js';
import millisecondsToHours from 'date-fns/millisecondsToHours';
import { IoPlay, IoStop } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import DeleteWarningModal from './DeleteWarningModal.component';
import React from 'react';
import { Context } from '../Utils/Context';
import {BsFillSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { getIndividualUser, likeTrack } from '../apiService/api-service';

export default function Track(props: {
  trackMetaData: TrackType;
  track: TrackListItemType | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [soonDeleted, setSoonDeleted] = useState(false);
  const [liked, setLiked] = useState(false);

  const { currentUser, setTrackList, playOrPauseTrackByID, setSelectedUser } = React.useContext(Context);

  const waveformRef: any = useRef('waveform');

  const { path, title, date, uploaded_by } = props.trackMetaData;
  const hoursUntilDeletion = (-millisecondsToHours(Number(Date.now() - date)) + 24);

  useEffect(() => {
    const options = {
      container: waveformRef.current,
      barHeight: 3,
      barWidth: 2,
      height: 18,
      normalize: true,
      waveColor: `${soonDeleted ? '#9C9C9C' :'#383838'}`,
      progressColor: '#CCC',
      cursorColor: 'transparent',
    };
    
    const wavesurfer = WaveSurfer.create(options);

    //The load method handles the actual fetching of the audio
    wavesurfer.load(props.trackMetaData.path);

    waveformRef.id = path;
    waveformRef.wavesurfer = wavesurfer;

    // add on finish event listener
    wavesurfer.on('finish', () => {
      setTrackList((tracks: TrackListItemType[]) =>
        tracks.map((track) =>
          track.waveformRef.id === path ? { ...track, isFinished: true } : track
        )
      );
    });

    setTrackList((tracks: TrackListItemType[]) => [
      ...tracks,
      { waveformRef, isPlaying: false, isActive: false, isFinished: false },
    ]);

    
    return () => {
      // clean up function
      setTrackList((tracks: TrackListItemType[]) => {
        return tracks.filter((track) => track.waveformRef.id !== path);
      });
      // remove event listener
      wavesurfer.un('finish', () => {
        setTrackList((tracks: TrackListItemType[]) =>
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
  }, [path, setTrackList]);
  
  useEffect(() => {
    if (hoursUntilDeletion <= 1) {
      setSoonDeleted(true);
    }
  }, [hoursUntilDeletion]);

  
  if (props.track) {
    if (props.track.isPlaying) {
      props.track.waveformRef?.wavesurfer.play();
    } else {
      props.track.waveformRef?.wavesurfer.stop();
    }
  }

  const handleLiked = () => {
    likeTrack(props.trackMetaData._id);
    setLiked(!liked);
  };

  const handleClick = () => {
    playOrPauseTrackByID(path);
  };

  return (
    <div
      onMouseOver={() => {
        setIsHovering(true);
      }}
      onMouseOut={() => {
        setIsHovering(false);
      }}
      onClick={() => {
        //if i am in '/' only
        if (window.location.pathname === '/') {
        getIndividualUser(uploaded_by).then((res) => {
          setSelectedUser(res);
        })};
      }}
      className={"min-w-[40%] px-2 rounded-md h-16 mb-10" + (soonDeleted ? " bg-red-600 bg-opacity-50" : "")}
    >
      <DeleteWarningModal setOpen={setOpen} open={open} track={props.track!} />
      <div className=" relative flex justify-between w-full">
        {isHovering && currentUser._id === uploaded_by ? (
          <MdClose
            className="text-neutral-300 p-0 m-0 cursor-pointer hover:text-red-500 ease-in transition duration-100"
            onClick={() => {
              setOpen(true);
            }}
          />
        ) : (
          <div className="w-4"></div>
        )}
        <h4 className=" absolute left-4 text-neutral-300 text-xs mb-2 ml-5 mr-12">
          {title.slice(0,43) + '...'}
        </h4>
        <h4 className={`${soonDeleted ? 'text-neutral-300 ' : 'text-neutral-600' } text-xs pl-9 mb-2`}>
          {hoursUntilDeletion ? hoursUntilDeletion + 'h Left' : 'Out Soon'}
        </h4>
      </div>
      <div className="flex align-center items-center overflow-hidden mt-2">
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
        <div id='waveForm-container' className="w-[100%] overflow-hidden mx-3" ref={waveformRef}></div>
        <button
        onClick={handleLiked}
        >
          {liked 
          ?
          <BsFillSuitHeartFill 
          className='text-pink-800 text-lg hover:cursor-pointer'
          />
          :
          <BsSuitHeart 
          id='like-button' 
          className='text-white text-lg hover:cursor-pointer'
          />
        }
        </button>
      </div>
    </div>
  );
}
