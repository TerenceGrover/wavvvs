import { useState, useEffect } from 'react';

import Track from './Track.component.jsx';
import UploadTrack from './UploadTrack.component.jsx';

export default function Profile({
  trackRefsAndPlayingStatus,
  setTrackRefsAndPlayingStatus,
}) {
  const [userTracksFileNames, setUserTracksFileNames] = useState([]);

  useEffect(() => {
    //todo: get the tracks from this user.
    // fetch all 3  from this user.
  }, []);

  return (
    <div className="flex-1 h-screen w-screen ">
      <div className="h-screen w-screen flex flex-col justify-center items-center p-6">
        <section className="flex flex-col justify-center items-center mt-28">
          <img
            className="w-72 h-72 rounded"
            src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2563.jpg?w=2000"
            alt="profile-pic"
          />
          <h1 className="text-white text-2xl mt-7 mb-1">Mateo Presa</h1>
          <p className="text-neutral-400">@mateo_presa</p>
        </section>
        <hr className="w-full border-neutral-800 my-6" />
        <section>
          <p className="text-xs text-neutral-400 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            id neque at nulla suscipit dapibus.
          </p>
        </section>
        <hr className="w-full border-neutral-800 my-6" />
        <section className="w-full">
          {userTracksFileNames[0] ? (
            <Track
              fileName={userTracksFileNames[0]}
              referenceToTracksAndPlayingStatus={
                trackRefsAndPlayingStatus?.['0']
              }
              setTrackRefsAndPlayingStatus={
                setTrackRefsAndPlayingStatus
              }
            />
          ) : (
            <UploadTrack setUserTracksFileNames={setUserTracksFileNames} />
          )}
          {userTracksFileNames[1] ? (
            <Track
              fileName={userTracksFileNames[1]}
              referenceToTracksAndPlayingStatus={
                trackRefsAndPlayingStatus?.['1']
              }
              setTrackRefsAndPlayingStatus={
                setTrackRefsAndPlayingStatus
              }
            />
          ) : (
            <UploadTrack setUserTracksFileNames={setUserTracksFileNames} />
          )}
          {userTracksFileNames[2] ? (
            <Track
              fileName={userTracksFileNames[2]}
              referenceToTracksAndPlayingStatus={
                trackRefsAndPlayingStatus?.['2']
              }
              setTrackRefsAndPlayingStatus={
                setTrackRefsAndPlayingStatus
              }
            />
          ) : (
            <UploadTrack setUserTracksFileNames={setUserTracksFileNames} />
          )}
        </section>
      </div>
    </div>
  );
}
