import { useState, useEffect } from 'react';
import Track from './Track.component.jsx';
import UploadTrack from './UploadTrack.component.jsx';
import { useAuth0 } from '@auth0/auth0-react';

const serverUrl = 'http://localhost:3001';

export default function Profile({
  trackList,
  setTrackList,
  playOrPauseTrackByID,
}) {
  const [userTracksFileNames, setUserTracksFileNames] = useState([]);
  const [userData, setUserData] = useState({});
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // This is just a test for now.
    (async () => {
      const incomingUserData = await fetch(`${serverUrl}/user`).then((res) =>
        res.json()
      );
      setUserData(incomingUserData);
    })();
  }, []);

  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col justify-start mt-14 items-center content-start p-6">
        <div className="">
          <section className="flex flex-col justify-center items-center mt-3">
            <img
              className="w-60 h-60 rounded"
              src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2563.jpg?w=2000"
              alt="profile-pic"
            />
            <h1 className="text-white text-2xl mt-7 mb-1">Mateo Presa</h1>
            <p className="text-neutral-400">@mateo_presa</p>
          </section>
          <hr className="w-96 border-neutral-800 my-6" />
          <section className="w-96">
            <p className="text-xs text-neutral-400 text-left w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse id neque at nulla suscipit dapibus. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Suspendisse id neque at
              nulla suscipit dapibus.
            </p>
          </section>
          <hr className="w-96 border-neutral-800 my-6" />
        </div>
        <div className="w-full flex justify-center items-center">
          <section className="w-96">
            {userTracksFileNames[0] && trackList[0] ? (
              <Track
                fileName={userTracksFileNames[0]}
                track={trackList[0]}
                setTrackList={setTrackList}
                playOrPauseTrackByID={playOrPauseTrackByID}
              />
            ) : (
              <UploadTrack setUserTracksFileNames={setUserTracksFileNames} />
            )}
            {userTracksFileNames[1] && trackList[1] ? (
              <Track
                fileName={userTracksFileNames[1]}
                track={trackList[1]}
                setTrackList={setTrackList}
                playOrPauseTrackByID={playOrPauseTrackByID}
              />
            ) : (
              <UploadTrack setUserTracksFileNames={setUserTracksFileNames} />
            )}
            {userTracksFileNames[2] && trackList[2] ? (
              <Track
                fileName={userTracksFileNames[2]}
                track={trackList[2]}
                setTrackList={setTrackList}
                playOrPauseTrackByID={playOrPauseTrackByID}
              />
            ) : (
              <UploadTrack setUserTracksFileNames={setUserTracksFileNames} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
