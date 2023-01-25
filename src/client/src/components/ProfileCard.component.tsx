import React from 'react';
import { BsFillPersonPlusFill, BsFillPersonCheckFill } from 'react-icons/bs';
import { Context } from '../Utils/Context';
import FollowButton from './FollowButton.component';

export default function ProfileCard() {

  const { selectedUser } = React.useContext(Context);


  console.log(selectedUser);
  

  return (
    <div className='flex flex-col max-w-[275px] min-w-[175px] w-[70%] h-[70%] bg-neutral-800 shadow-sm shadow-black self-center justify-around items-center py-[2.5%] rounded-xl'>
      <div className='flex flex-col items-center'>
        <img className='w-24 h-24 rounded-full' src={selectedUser.profile_pic_path} alt='Profile' />
        <span className='text-neutral-200 text-xl'>{'@' + selectedUser.username}</span>
        <span className='text-neutral-200 text-xl'>{selectedUser.name}</span>
      </div>
      <div className='flex flex-col items-center'>
      <span className='text-neutral-200 text-xl'>{selectedUser.tracks.length}</span>
        <span className='text-neutral-200 text-xl'>Songs</span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='text-neutral-200 text-xl'>{selectedUser.followers.length}</span>
        <span className='text-neutral-200 text-xl'>Followers</span>
      </div>
      <FollowButton />
    </div>
  );
}