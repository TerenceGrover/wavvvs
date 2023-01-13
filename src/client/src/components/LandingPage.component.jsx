import LoginButton from './LoginButton.component.jsx';
import Logo from './Logo.component.jsx';

export default function LandingPage() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <Logo />
      <LoginButton />
    </main>
  );
}
