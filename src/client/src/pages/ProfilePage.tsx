import React, { useEffect } from "react";
import Header from "../components/Header.component";
import Profile from "../components/Profile.component";
import type { CurrentUser } from "../Interfaces";
import Logo from "../components/Logo.component";

export default function ProfilePage (props : {currentUser: CurrentUser, setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>}) {
  
  // setup a loader to wait for the currentUser to be set
  
  return (
    <div id="profile-container">
      <Header currentUser={props.currentUser} />
        <Profile currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} />
    </div>
  )
}