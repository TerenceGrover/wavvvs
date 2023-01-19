import React from 'react';
import LoginButton from './LoginButton.component';
import Logo from './Logo.component';

export default function LandingPage() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <Logo />
      <LoginButton />
    </main>
  );
}
