import React from 'react';
import { getAllUsers } from '../apiService/api-service';
import UserIcon from './UserIcon.component';
import { Context } from '../Utils/Context';
import { CurrentUser } from '../Interfaces';

//The goal of this component is to aggregate all top users and display them in a grid in the style of twitter spaces

export default function UserCollection() {
  const [FollowUsers, setFollowUsers] = React.useState<CurrentUser[]>();
  const [Likesusers, setLikesUsers] = React.useState<CurrentUser[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getAllUsers('followers').then((res: CurrentUser[]) => {
      setFollowUsers(res.slice(0, 5));
    });
    getAllUsers('totalLikes').then((res: CurrentUser[]) => {
      setLikesUsers(res.slice(0, 5));
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <>
          <span className="text-white mb-8">By Follow</span>
          <div id="follow-container" className="flex flex-row gap-x-2">
            {FollowUsers && FollowUsers.map((user) => (
              <UserIcon key={'follow' + user.username} user={user} />
            ))}
          </div>
          <span className="text-white mt-8 mb-8">By Likes</span>
          <div id="likes-container" className={`flex flex-row gap-x-2`}>
            {Likesusers && Likesusers.map((user) => (
              <UserIcon key={'likes' + user.username} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
