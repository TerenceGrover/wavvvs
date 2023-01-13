import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="w-20 rounded border border-transparent bg-neutral-800 py-1 px-1 text-xs text-white hover:bg-neutral-600"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
