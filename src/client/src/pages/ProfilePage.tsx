import React from "react";
import Header from "../components/Header.component";
import Profile from "../components/Profile.component";
import type { CurrentUser } from "../Interfaces";

export default function ProfilePage (props : {currentUser: CurrentUser, setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>}) {
  return (
    <div id="profile-container">
      <Header />
        <Profile currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} />
    </div>
  )
}