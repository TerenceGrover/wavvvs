import React from 'react';
import { getAllUsers } from '../apiService/api-service';
import UserIcon from './UserIcon.component';

//The goal of this component is to aggregate all top users and display them in a grid in the style of twitter spaces

export default function UserCollection() {
  
  // const { users } = getAllUsers();

  return (
    <div className="flex items-center">
      {/* {users.map((user) => (
        <UserIcon user={user} />
      ))} */}
    </div>
  );
}