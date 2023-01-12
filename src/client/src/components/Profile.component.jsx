import { useState, useEffect } from 'react';

import Track from './Track.component.jsx';
import UploadTrack from './UploadTrack.component.jsx';

export default function Profile({isPlaying, setIsPlaying}) {
  const [userTracks, setUserTracks] = useState([]);

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
          {userTracks[0] ? (
            <Track track={userTracks[0]} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          ) : (
            <UploadTrack setUserTracks={setUserTracks} />
          )}
          {userTracks[1] ? (
            <Track track={userTracks[1]} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
          ) : (
            <UploadTrack setUserTracks={setUserTracks} />
          )}
          {userTracks[2] ? (
            <Track track={userTracks[2]} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
          ) : (
            <UploadTrack setUserTracks={setUserTracks} />
          )}
        </section>
      </div>
    </div>
  );
}
