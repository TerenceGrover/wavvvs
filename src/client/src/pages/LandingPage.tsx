import React from 'react';
import UserForm from '../components/UserForm.component';
import type { CurrentUser } from '../Interfaces';
import Logo from '../components/Logo.component';

export default function LandingPage(props : { currentUser : CurrentUser | undefined, setCurrentUser : React.Dispatch<React.SetStateAction<CurrentUser | undefined>> , setIsAuth : React.Dispatch<React.SetStateAction<boolean>> , setIsNewUser : React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <Logo />
      <UserForm currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} setIsAuth = {props.setIsAuth} setIsNewUser = {props.setIsNewUser} />
    </main>
  );
}
