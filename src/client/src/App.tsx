import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import './index.css'
import CreateUser from './pages/CreateUser';
import Logo from './components/Logo.component';

export default function App() {

  const [valid, setValid] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  //parseJWT
  const parseJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  React.useEffect(() => {
    const loadInterval = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      clearTimeout(loadInterval)
    }
  }, [])

  React.useEffect(() => {
    if (localStorage.getItem('token') === null) {
      console.log('no token');
      return;
    }
    const token = localStorage.getItem('token');    
    if (token) {
      const decodedJwt = parseJWT(token);
      console.log(decodedJwt)
      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log('token expired');
        localStorage.removeItem('token');
      }
      else {
        console.log('token valid');
        setEmail(decodedJwt.name);
        setValid(true);
      }
    } else {
      console.log('no token');
    }
  }, [isAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          loading
          ?
          <main className="w-screen h-screen flex flex-col justify-center items-center">
            <Logo/>
          </main>
          :
          valid 
          ? 
          (isNewUser
          ?
          <CreateUser email={email}/>
          :
          <Home /> )
          : 
          <LandingPage setIsAuth = {setIsAuth} setIsNewUser={setIsNewUser}/>} />
        <Route element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
