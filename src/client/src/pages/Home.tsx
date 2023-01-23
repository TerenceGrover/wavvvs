import type { CurrentUser, TrackListItemType } from '../Interfaces';
import { useState } from 'react';
import { checkUser } from "../apiService/api-service";
import Header from '../components/Header.component';
import Logo from '../components/Logo.component';
import ErrorPage from './ErrorPage';
import React from 'react';
import CentralHome from '../components/CentralHome.component';

function Home(props : {currentUser: CurrentUser, setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>}) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [thereIsAnError, seThereIsAnError] = useState(false);
  
  React.useEffect(() => {
    if (props.currentUser.name) return setIsLoading(false);
    setTimeout(() => {  
      checkUser().then((res : CurrentUser) => {
        if (res) {
            props.setCurrentUser(res);
            setIsLoading(false);
        }
      })
    }, 1000)
  }, [props.currentUser.name])

  if (thereIsAnError) return <ErrorPage />;

  return (
    <div id='home-wrapper'>
      <Header currentUser={props.currentUser} />
      {isLoading 
      ?
      <main className="w-screen h-screen flex flex-col justify-center items-center">
        <Logo/>
      </main>
      :
      <div className="h-screen w-screen bg-neutral-900 flex flex-col">
        {props.currentUser && (
          <CentralHome />
        )} 
      </div>}
    </div>
  );
}

export default Home;
