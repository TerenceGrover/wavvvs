import React from 'react';
import { Context } from '../Utils/Context';
import FollowButton from './FollowButton.component';
import { AiFillStar } from 'react-icons/ai';

export default function ProfileCard() {
  const { selectedUser } = React.useContext(Context);

  return (
    <div className="place-self-start flex flex-col max-w-[275px] min-w-[175px] w-[80%] h-[60%] bg-neutral-800 shadow-sm shadow-black self-center justify-around items-center py-[10%] rounded-xl">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-2xl"
          src={selectedUser.profile_pic_path}
          alt="Profile"
        />
        <span className="text-neutral-200 text-xl">
          {'@' + selectedUser.username}
        </span>
        <h1 className="text-white text-2xl mt-7 mb-1 font-bold inline-flex items-center content-center text-center gap-x-2">
          {selectedUser.isPremium && (
            <AiFillStar className={`text-2xl text-amber-400`} />
          )}
          {selectedUser.name}
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-neutral-200 text-xl">
          {selectedUser.tracks.length}
        </span>
        <span className="text-neutral-200 text-xl">Songs</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-neutral-200 text-xl">
          {selectedUser.numberOfFollowers}
        </span>
        <span className="text-neutral-200 text-xl">Followers</span>
      </div>
      <FollowButton />
    </div>
  );
}
