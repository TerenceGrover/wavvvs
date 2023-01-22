import Bio from './Bio.component';
import type { CurrentUser, TrackType, TrackListItemType } from '../Interfaces';
import Track from './Track.component';
import UploadTrack from './UploadTrack.component';
import ProfilePic from './ProfilePic.component';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Profile(props: {
  currentUser: CurrentUser;
  // trackList : TrackListItemType[];
  // setTrackList : React.Dispatch<React.SetStateAction<any[]>>;
  // playOrPauseTrackByID : (id : string) => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>;
}) {

  const [tracksto3, setTracksto3] = useState([1, 2, 3]);
  const [isLoaoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.currentUser) {
      setIsLoading(false);
    }
  }, [props.currentUser]);

  // useEffect(() => {
  //   if(props.currentUser.tracks.length > 0){
  //     const buff : any[] = [...props.currentUser.tracks]
  //     setTracksto3((buff.concat([1,2,3])).slice(0,3))
  //     } else {
  //       setTracksto3([1,2,3])
  //     }
  // }, [props.currentUser.tracks])

  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col justify-start mt-14 items-center content-start p-6">
        <div className="">
          <section className="flex flex-col justify-center items-center mt-3">
            <ProfilePic path={props.currentUser.profile_pic_path} />
            <h1 className="text-white text-2xl mt-7 mb-1">
              {props.currentUser.name}
            </h1>
            <p id='username' className="text-neutral-400">{`@${props.currentUser.username}`}</p>
          </section>
          <hr className="w-96 border-neutral-800 my-6" />
          <Bio bio={props.currentUser.bio} />
          <hr className="w-96 border-neutral-800 my-6" />
        </div>
        <div className="w-full flex justify-center items-center">
          <section className="w-96">
            {/* {tracksto3.map((track:any) =>
              {return (
                typeof track === 'object'
                ?
                <Track
                trackMetaData={track}
                track={props.trackList[0]}
                setTrackList={props.setTrackList}
                playOrPauseTrackByID={props.playOrPauseTrackByID}
                setCurrentUser={props.setCurrentUser}
                key={track.path}
                />
                :
                <UploadTrack setCurrentUser={props.setCurrentUser} key={track} />)
            })} */}
          </section>
        </div>
      </div>
    </div>
  );
}
