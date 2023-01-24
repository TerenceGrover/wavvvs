import type { CurrentUser } from '../Interfaces';
import { useState } from 'react';
import { checkUser } from '../apiService/api-service';
import Header from '../components/Header.component';
import Logo from '../components/Logo.component';
import React from 'react';
import CentralHome from '../components/CentralHome.component';
import { Context } from '../Utils/Context';

function Home() {
  const { currentUser, setCurrentUser } = React.useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (currentUser.name) return setIsLoading(false);
    setTimeout(() => {
      checkUser().then((res: CurrentUser) => {
        if (res) {
          setCurrentUser(res);
          setIsLoading(false);
        }
      });
    }, 1000);
  }, [currentUser.name, setCurrentUser]);

  return (
    <div id="home-wrapper">
      <Header />
      {isLoading ? (
        <main className="w-screen h-screen flex flex-col justify-center items-center">
          <Logo />
        </main>
      ) : (
        <div className="h-screen w-screen bg-neutral-900 flex flex-col">
          {currentUser && <CentralHome />}
        </div>
      )}
    </div>
  );
}

export default Home;
