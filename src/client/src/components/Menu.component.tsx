import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Menu() {

  return (
    <div className="fixed left-0 top-14 h-screen w-[70vw] bg-neutral-800">
      <div id="menu-container" className='flex flex-col divide-y divide-neutral-600'>
        <Link to={'/'} className="button-container flex flex-row p-4">
          <AiFillHome style={{'filter' : 'drop-shadow(1px 1px 2px black)'}} className="text-3xl" />
          <span className='text-xl self-center pl-6'>Home</span>
        </Link>
      </div>
    </div>
  );
}