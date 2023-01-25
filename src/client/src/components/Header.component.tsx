import React from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from './Logo.component';
import Menu from './Menu.component';
import SearchBar from './SearchBar.component';
import { Context } from '../Utils/Context';

export default function Header() {
  const { currentUser, mobile } = React.useContext(Context);

  const [search, setSearch] = React.useState(false);
  const [menu, setMenu] = React.useState(false);

  const handleClick = (e : any) => {
    const target = e.target as HTMLElement;
    if (target.id === 'hamburger-menu' && !menu) {
      target.classList.add('transform');
      target.classList.add('rotate-90');
    } else {
      target.classList.remove('transform');
      target.classList.remove('rotate-90');
    }
    setMenu(!menu);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 max-w-92">
      <header id='header' className={`${mobile && 'px-4'} flex justify-center h-14 text-white bg-neutral-800`}>
      {
        menu
        &&
        <Menu />
      }
        <div className="w-96 py-3.5 flex justify-between lg:max-w-xl lg:w-full">
          <div className="flex w-26 h-full justify-between items-center content-center">
            {
              mobile
              &&
            <AiOutlineMenu
            id="hamburger-menu"
            className="text-neutral-200 h-6 w-6 mr-3 hover:text-neutral-400 ease-in transition duration-100 cursor-pointer"
            onClick={e => handleClick(e)}
            />
          }
            <div className="mb-1">
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </div>
          {search && (
            <SearchBar
            setSearch={setSearch}
            />
          )}
          <div className="flex w-26 justify-between items-center">
            {!search && (
              <AiOutlineSearch
                id="search"
                className="text-neutral-200 h-6 w-6 hover:text-neutral-400 ease-in transition duration-100 cursor-pointer"
                onClick={() => {
                  setSearch(true);
                }}
              />
            )}
            <Link to="/profile" id="link-to-profile">
              <img
                id="user-profile-pic"
                className="w-6 h-6 ml-3 rounded-full"
                src={
                  sessionStorage.getItem('compressedImage') ||
                  currentUser!.profile_pic_path
                }
                alt="User profile"
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
