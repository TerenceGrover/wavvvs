import React from 'react';
// import { Link } from 'react-router-dom';
const LoginButton = ({register = false}) => {

  const [isLogged, setIsLogged] = React.useState(false);
  const [appear, setAappear] = React.useState(false);

  return (
    // On click of the button, make the button disappear and two input fields appear
    <>
    <form className={`${appear ? 'show' : 'hidden'} flex align-center gap-2 flex-col transition ease-in duration-400 w-20 rounded py-2 px-1 mt-2 text-xs text-white`}>
      <input id='username' className='w-20'></input>
      <input id='password' className='w-20'></input>
    </form>
    <button 
    className="transition ease-in duration-200 w-20 rounded bg-neutral-800 py-2 px-1 mt-2 text-xs text-white hover:bg-neutral-700"
    onClick={() => {
      {setAappear(!appear)
      }
      }}>
      {register ? 'Register' : 'Log In'}
      {/* <Link to={'/mateopresa'}> Log In</Link> */}
    </button>
    </>
  );
};

export default LoginButton;
