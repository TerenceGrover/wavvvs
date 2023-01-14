import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="transition ease-in duration-200 w-20 rounded bg-neutral-800 py-2 px-1 text-xs text-white hover:bg-neutral-700"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
