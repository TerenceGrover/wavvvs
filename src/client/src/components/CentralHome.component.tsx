// Create react component called centralHome
//
import React from 'react';
import TrackCollection from './TrackCollection';
import { HomeContext } from '../Utils/Context';
import UserCollection from './UserCollection.component';

export default function CentralHome() {

  const { centralHome } = React.useContext(HomeContext);

  return (
    <div className="flex flex-col justify-center items-center">
      {centralHome ==='Home'
      &&
      <TrackCollection />
      }
      {
      centralHome ==='Soon'
      &&
      <TrackCollection />
      }
      {
      centralHome ==='Stars'
      &&
      <UserCollection />
      }
      {
      centralHome ==='Top'
      &&
      <TrackCollection />
      }
    </div>
  );
}
