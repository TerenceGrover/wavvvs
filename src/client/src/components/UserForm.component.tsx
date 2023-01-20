import React from 'react';
const UserForm = () => {

  const [isLogged, setIsLogged] = React.useState(false);
  const [clicked, setClicked] = React.useState('');
  const [info, setInfo] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  //write test for this

  const handleBack = () => {
    setClicked('');
  };

  const handleSubmit = () => {
    if (clicked === 'login') {
    console.log('login', info)
    }
    if (clicked === 'register') {
    console.log('register', info)
    }
    setInfo({ username: '', email: '', password: '' });
  };

  return (
    // On click of the button, make the button disappear and two input fields appear
    <div className='mt-2 flex flex-col'>
      <form
        className={`${clicked === '' && 'hidden'} 
    flex items-center gap-2 flex-col transition ease-in duration-400 w-20 rounded py-2 px-1 mt-4 text-xs text-white
    [&>input]:bg-neutral-600 [&>input]:p-1 [&>input]:rounded [&>*:hover]:bg-neutral-500`}
        // onSubmit={(e) => handleSubmit(e)}
      >
        <input
          id="username"
          placeholder="username"
          className="w-40"
          type="text"
          autoComplete="username"
          onChange={(e) => {
            setInfo({ ...info, username: e.target.value });
          }}
          value={info.username}
        ></input>
        <input
          id="email"
          placeholder="email"
          className={`${clicked === 'register' ? 'show' : 'hidden'} w-40`}
          type="email"
          autoComplete="email"
          onChange={(e) => {
            setInfo({ ...info, email: e.target.value });
          }}
          value={info.email}
        ></input>
        <input
          id="password"
          placeholder="password"
          className="w-40"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            setInfo({ ...info, password: e.target.value });
          }}
          value={info.password}
        ></input>
      </form>
      <button
        id="login"
        className={`${
          clicked === 'register' && 'hidden'
        } transition ease-in duration-200 w-20 rounded bg-neutral-800 py-2 px-1 mt-2 text-xs text-white hover:bg-neutral-700`}
        onClick={() => {
          {
            clicked === 'login' 
            ? 
            handleSubmit() 
            : 
            setClicked('login');
          }
        }}
        type="button"
      >
        Login
      </button>
      <button
        id="register"
        className={`${
          clicked === 'login' && 'hidden'
        } transition ease-in duration-200 w-20 rounded bg-neutral-800 py-2 px-1 mt-2 text-xs text-white hover:bg-neutral-700`}
        onClick={() => {
          {
            clicked === 'register' 
            ? 
            handleSubmit() 
            : 
            setClicked('register');
          }
        }}
        type="button"
      >
        Register
      </button>
      <button
        className={`${
          clicked === '' && 'hidden'
        } mt-6 text-white underline underline-offset-2`}
        onClick={handleBack}
      >
        Go back
      </button>
    </div>
  );
};

export default UserForm;
