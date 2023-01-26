import Bio from './Bio.component';
import Track from './Track.component';
import UploadTrack from './UploadTrack.component';
import ProfilePic from './ProfilePic.component';
import { useEffect, useState } from 'react';
import React from 'react';
import Logo from './Logo.component';
import { Context } from '../Utils/Context';
import DeleteAccount from './DeleteAccount.component';
import Payment from './PaymentModal.component';
import { AiFillStar } from 'react-icons/ai';
import { getIndividualUser } from '../apiService/api-service';
import EmptyTrack from './EmptyTrack.component';

export default function Profile() {
  const { trackList, selectedUser, setSelectedUser } = React.useContext(Context);

  const [tracksto3, setTracksto3] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedUser !== undefined) {
      getIndividualUser(selectedUser!.id!)
        .then((res) => {
          setSelectedUser(res);
          setIsLoading(false);
        })
    }
    if (selectedUser.tracks && selectedUser.tracks.length > 0) {
      const buff: any[] = [...selectedUser.tracks];
      setTracksto3(buff.concat([1, 2, 3]).slice(0, 3));
    } else {
      setTracksto3([1, 2, 3]);
    }
  }, []);

  return (
    <div className="h-[105vh] w-screen">
      <DeleteAccount setOpen={setOpen} open={open} />
      {!isLoading ? (
        <div className="flex flex-col justify-start mt-14 items-center content-start p-6">
          <div className="">
            <section className="flex flex-col justify-center items-center mt-3">
              <ProfilePic path={selectedUser.profile_pic_path} />
              <h1 className="text-white text-2xl mt-7 mb-1 font-bold inline-flex items-center content-center text-center gap-x-2 pr-3">
                {selectedUser.isPremium && <AiFillStar className={`text-2xl text-amber-400`} />}
                {selectedUser.name} 
              </h1>
              <p
                id="username"
                className="text-neutral-400"
              >{`@${selectedUser.username}`} </p>
            </section>
            <hr className="w-96 border-neutral-800 my-6" />
            <Bio bio={selectedUser.bio} />
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
                  <EmptyTrack key={track} />
                );
              })}
            </section>
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
