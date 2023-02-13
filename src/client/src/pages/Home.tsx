import type { CurrentUser } from '../Interfaces';
import { useState } from 'react';
import { checkUser } from '../apiService/api-service';
import Header from '../components/Header.component';
import Logo from '../components/Logo.component';
import React from 'react';
import CentralHome from '../components/CentralHome.component';
import SideBar from '../components/SideBar.component';
import ProfileCard from '../components/ProfileCard.component';
import { Context } from '../Utils/Context';
import { HomeContext } from '../Utils/Context';

function Home() {
  const { currentUser, setCurrentUser, mobile , setSelectedUser} = React.useContext(Context);

  const [isLoading, setIsLoading] = useState(true);
  const [centralHome, setCentralHome] = useState('Home');

  React.useEffect(() => {
    setSelectedUser(currentUser)
  }, [])

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
        <HomeContext.Provider value={{ centralHome, setCentralHome }}>
          {mobile
            ?
            <CentralHome />
            :
            <div className="grid grid-cols-5 w-screen h-screen">
              <SideBar />
              <CentralHome />
              <ProfileCard />
            </div>
            }
          </HomeContext.Provider>
      )}
    </div>
  );
}

export default Home;
