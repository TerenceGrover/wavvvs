import Track from './Track.component.jsx';
import UploadTrack from './UploadTrack.component.jsx';

const serverUrl = 'http://localhost:3001';

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
            <img
              className="w-60 h-60 rounded"
              src={`${serverUrl}/pics/${currentUser.profile_pic_path}`}
              alt="profile-pic"
            />
            <h1 className="text-white text-2xl mt-7 mb-1">
              {currentUser.name}
            </h1>
            <p className="text-neutral-400">{`@${currentUser.user}`}</p>
          </section>
          <hr className="w-96 border-neutral-800 my-6" />
          <section className="w-96">
            <p className="text-xs text-neutral-400 text-left w-full">
              {currentUser.bio}
            </p>
          </section>
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
