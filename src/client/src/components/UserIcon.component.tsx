import React from 'react';
import type { CurrentUser } from '../Interfaces';
import { Link } from 'react-router-dom';

export default function UserIcon(props: { user: CurrentUser }) {
  const { user } = props;
  const { username, profile_pic_path, name, isPremium } = user;

  return (
    <Link to={`/profile/${user.username}`}>
      <div
        className={`w-32 flex items-center p-4 py-6 ${
          isPremium ? 'bg-amber-500 bg-opacity-60' : 'bg-neutral-800'
        } drop-shadow-md shadow-black rounded-2xl flex-col gap-y-3`}
      >
        <img
          className="h-8 w-8 rounded-full"
          src={profile_pic_path}
          alt={username}
        />
        <p className="text-sm font-medium text-neutral-200">{'@' + username}</p>
        <p className="text-xs font-sm text-neutral-100">{name}</p>
      </div>
    </Link>
  );
}
