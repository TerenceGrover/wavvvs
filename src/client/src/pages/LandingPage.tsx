import React from 'react';
import UserForm from '../components/UserForm.component';
import Logo from '../components/Logo.component';

export default function LandingPage(props : {setIsAuth : React.Dispatch<React.SetStateAction<boolean>> , setIsNewUser : React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <Logo />
      <UserForm setIsAuth = {props.setIsAuth} setIsNewUser = {props.setIsNewUser} />
    </main>
  );
}
