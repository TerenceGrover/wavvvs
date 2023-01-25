import Bio from './Bio.component';
import Track from './Track.component';
import UploadTrack from './UploadTrack.component';
import ProfilePic from './ProfilePic.component';
import { useEffect, useState } from 'react';
import React from 'react';
import Logo from './Logo.component';
import { Context } from '../Utils/Context';
import DeleteAccount from './DeleteAccount.component';
import { AiFillStar } from 'react-icons/ai';

export default function Profile() {
  const { currentUser, trackList } = React.useContext(Context);

  const [tracksto3, setTracksto3] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.tracks && currentUser.tracks.length > 0) {
      const buff: any[] = [...currentUser.tracks];
      setTracksto3(buff.concat([1, 2, 3]).slice(0, 3));
    } else {
      setTracksto3([1, 2, 3]);
    }
  }, [currentUser]);

  return (
    <div className="h-[120vh] w-screen">
      <DeleteAccount setOpen={setOpen} open={open} />
      {!isLoading ? (
        <div className="flex flex-col justify-start mt-14 items-center content-start p-6">
          <div className="">
            <section className="flex flex-col justify-center items-center mt-3">
              <ProfilePic path={currentUser.profile_pic_path} />
              <h1 className="text-white text-2xl mt-7 mb-1 font-bold inline-flex items-center content-center text-center gap-x-2 pr-3">
                {currentUser.isPremium && <AiFillStar className={`text-2xl text-amber-400`} />}
                {currentUser.name} 
              </h1>
              <p
                id="username"
                className="text-neutral-400"
              >{`@${currentUser.username}`} </p>
            </section>
            <hr className="w-96 border-neutral-800 my-6" />
            <Bio bio={currentUser.bio} />
            <hr className="w-96 border-neutral-800 my-6" />
          </div>
          <div className="w-full flex justify-center items-center">
            <section className="w-96">
              {tracksto3.map((track: any) => {
                return typeof track === 'object' ? (
                  <Track
                    trackMetaData={track}
                    track={trackList.find(
                      (trackListItem) =>
                        trackListItem.waveformRef.id === track.path
                    )}
                    key={track.path}
                  />
                ) : (
                  <UploadTrack key={track} />
                );
              })}
            </section>
          </div>
          <div id="button-container" className="flex flex-col">
            <button
              id="premium"
              className=" bg-yellow-500 rounded-xl px-4 py-2 mt-4"
            >
              <span className=" text-white font-bold text-lg inline-flex items-center content-center text-center gap-x-2 pr-3">
              <AiFillStar className='text-2xl' /> Get Premium
              </span>
            </button>
            <div id="dangerous-button-containers" className="flex gap-6">
              <button
                id="logout-button"
                className="bg-neutral-800 text-red-500 rounded-xl px-4 py-2 mt-4"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}
              >
                Logout
              </button>
              <button
                id="delete-account-button"
                className="bg-red-500 text-white rounded-xl px-4 py-2 mt-4"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <main className="flex flex-col justify-start mt-14 items-center content-start p-6">
          <Logo />
        </main>
      )}
    </div>
  );
}
