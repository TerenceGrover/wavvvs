import type { CurrentUser, TrackListItemType } from '../Interfaces';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.component';
import Logo from '../components/Logo.component';
import ErrorPage from './ErrorPage';
import React from 'react';
import CentralHome from '../components/CentralHome.component';

function Home() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined >();
  const [isLoading, setIsLoading] = useState(true);
  const [thereIsAnError, seThereIsAnError] = useState(false);
  const { user } : any = useParams();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Logo />
      </div>
    );
  }

  if (thereIsAnError) return <ErrorPage />;

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      <Header />
      {currentUser && (
        <CentralHome />
      )} 
    </div>
  );
}

export default Home;
