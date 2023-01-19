import React from 'react';
import { Link } from 'react-router-dom';
const LoginButton = () => {
  return (
    <button className="transition ease-in duration-200 w-20 rounded bg-neutral-800 py-2 px-1 mt-2 text-xs text-white hover:bg-neutral-700">
      <Link to={'/mateopresa'}> Log In</Link>
    </button>
  );
};

export default LoginButton;
