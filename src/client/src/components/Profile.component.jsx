import Bio from './Bio.component.jsx';
import Track from './Track.component.jsx';
import UploadTrack from './UploadTrack.component.jsx';
import ProfilePic from './ProfilePic.component.jsx';

export default function Profile({
  currentUser,
  trackList,
  setTrackList,
  playOrPauseTrackByID,
  setCurrentUser,
}) {
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
            {currentUser.tracks[0] ? (
              <Track
                trackMetaData={currentUser.tracks[0]}
                track={trackList[0]}
                setTrackList={setTrackList}
                playOrPauseTrackByID={playOrPauseTrackByID}
                setCurrentUser={setCurrentUser}
                key={currentUser.tracks[0].path}
              />
            ) : (
              <>
                {currentUser.user === 'mateopresa' && (
                  <UploadTrack setCurrentUser={setCurrentUser} />
                )}
              </>
            )}
            {currentUser.tracks[1] ? (
              <Track
                trackMetaData={currentUser.tracks[1]}
                track={trackList[1]}
                setTrackList={setTrackList}
                playOrPauseTrackByID={playOrPauseTrackByID}
                setCurrentUser={setCurrentUser}
                key={currentUser.tracks[1].path}
              />
            ) : (
              <>
                {currentUser.user === 'mateopresa' && (
                  <UploadTrack setCurrentUser={setCurrentUser} />
                )}
              </>
            )}
            {currentUser.tracks[2] ? (
              <Track
                trackMetaData={currentUser.tracks[2]}
                track={trackList[2]}
                setTrackList={setTrackList}
                playOrPauseTrackByID={playOrPauseTrackByID}
                setCurrentUser={setCurrentUser}
                key={currentUser.tracks[2].path}
              />
            ) : (
              <>
                {currentUser.user === 'mateopresa' && (
                  <UploadTrack setCurrentUser={setCurrentUser} />
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
