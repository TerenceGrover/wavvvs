import React, { useEffect } from 'react';
import Header from '../components/Header.component';
import Profile from '../components/Profile.component';

export default function ProfilePage(props: {
  playOrPauseTrackByID: (id: string) => void;
}) {
  return (
    <div id="profile-container">
      <Header />
      <Profile playOrPauseTrackByID={props.playOrPauseTrackByID} />
    </div>
  );
}
