import Bio from './Bio.component.jsx';
import Track from './Track.component.jsx';
import UploadTrack from './UploadTrack.component.jsx';
import ProfilePic from './ProfilePic.component.jsx';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Profile({
  currentUser,
  trackList,
  setTrackList,
  playOrPauseTrackByID,
  setCurrentUser,
}) {

  const [tracksto3, setTracksto3] = useState([1,2,3])

  useEffect(() => {
    if(currentUser.tracks.length > 0){
      setTracksto3((currentUser.tracks.concat([1,2,3])).slice(0,3))
      }
  }, [currentUser.tracks])

  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col justify-start mt-14 items-center content-start p-6">
        <div className="">
          <section className="flex flex-col justify-center items-center mt-3">
            <ProfilePic path={currentUser.profile_pic_path} />
            <h1 className="text-white text-2xl mt-7 mb-1">
              {currentUser.name}
            </h1>
            <p className="text-neutral-400">{`@${currentUser.user}`}</p>
          </section>
          <hr className="w-96 border-neutral-800 my-6" />
          <Bio bio={currentUser.bio} />
          <hr className="w-96 border-neutral-800 my-6" />
        </div>
        <div className="w-full flex justify-center items-center">
          <section className="w-96">
            {tracksto3.map((track) =>
              {return (
                typeof track === 'object'
                ?
                <Track
                trackMetaData={track}
                track={trackList[0]}
                setTrackList={setTrackList}
                playOrPauseTrackByID={playOrPauseTrackByID}
                setCurrentUser={setCurrentUser}
                key={track.path}
                />
                :
                <UploadTrack setCurrentUser={setCurrentUser} key={track} />)
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
