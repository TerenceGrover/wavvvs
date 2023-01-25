import React from 'react';
import { getAllUsers } from '../apiService/api-service';
import UserIcon from './UserIcon.component';

//The goal of this component is to aggregate all top users and display them in a grid in the style of twitter spaces

export default function UserCollection() {

  const [FollowUsers, setFollowUsers] = React.useState([]);
  const [Likesusers, setLikesUsers] = React.useState([]);
  

  React.useEffect(() => {
    getAllUsers('followers').then((res) => {
      setFollowUsers(res);
      console.log('Follow', res);
    });

    getAllUsers('totalLikes').then((res) => {
      setLikesUsers(res);
      console.log('Likes' , res);
    });
  }, []);


  return (
    <div className="flex flex-col items-center">
      <span className='text-white mb-8'>By Follow</span>
      <div id="follow-container" className='flex flex-row gap-x-2'>
        {FollowUsers.map((user) => (
          <UserIcon key={'follow' + user} user={user} />
          ))}
      </div>
        <span className='text-white mt-8 mb-8'>By Likes</span>
        <div id="likes-container" className='flex flex-row gap-x-2'>
      {Likesusers.map((user) => (
        <UserIcon key={'likes' + user} user={user} />
      ))}
      </div>
    </div>
  );
}