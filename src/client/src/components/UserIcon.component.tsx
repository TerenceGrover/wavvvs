import React from 'react';
import type { CurrentUser } from '../Interfaces';

export default function UserIcon(props: { user: CurrentUser }) {
  const { user } = props;
  const { username, profile_pic_path } = user;

  console.log(username)

  return (
    <div className="flex items-center">
      <img
        className="h-8 w-8 rounded-full"
        src={profile_pic_path}
        alt={username}
      />
      <p className="ml-2 text-sm font-medium text-white">{username}</p>
    </div>
  );
}