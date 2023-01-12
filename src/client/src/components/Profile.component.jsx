import { useState, useEffect } from 'react';

import Track from './Track.component.jsx';
import UploadTrack from './UploadTrack.component.jsx';

export default function Profile() {
  const [userTracksFilePaths, setUserTracksFilePaths] = useState(['audio.wav']);

  useEffect(() => {
    //todo: get the tracks from this user.
    // fetch all 3 filepaths from this user.
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full flex flex-col justify-center items-center p-6">
        <section className="flex flex-col justify-center items-center">
          <img
            className="w-56 h-56 rounded"
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
          {userTracksFilePaths[0] ? (
            <Track filePath={userTracksFilePaths[0]} />
          ) : (
            <UploadTrack setUserTracksFilePaths={setUserTracksFilePaths} />
          )}
          {userTracksFilePaths[1] ? (
            <Track filePath={userTracksFilePaths[1]} />
          ) : (
            <UploadTrack setUserTracksFilePaths={setUserTracksFilePaths} />
          )}
          {userTracksFilePaths[2] ? (
            <Track filePath={userTracksFilePaths[2]} />
          ) : (
            <UploadTrack setUserTracksFilePaths={setUserTracksFilePaths} />
          )}
        </section>
      </div>
    </div>
  );
}
