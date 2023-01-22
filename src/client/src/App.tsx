import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import './index.css'
import CreateUser from './pages/CreateUser';
import MediaController from './components/MediaController.component';
import Logo from './components/Logo.component';
import { checkUser } from './apiService/api-service';
import type { CurrentUser, TrackListItemType } from './Interfaces';
import ProfilePage from './pages/ProfilePage';

export default function App() {

  const [valid, setValid] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>();

  const [trackList, setTrackList] = React.useState<TrackListItemType[]>([]);
  const [isAudioMuted, setIsAudioMuted] = React.useState(false);
  const [repeat, setRepeat] = React.useState(false);

  const activeTrack = trackList.find((track) => track.isLastActive) ?? null;

  const playOrPauseTrackByID = (id : string) => {
    setTrackList((tracks) => {
      // Loop trough the tracks and modify the status of th track you want to play/pause
      const modifiedTrackList = tracks.map((track) => {
        return track.waveformRef.id === id
          ? { 
              ...track,
              isLastActive: track.isPlaying || true, // track.isPlaying being false here means you are clicking play.
              // the last active track is the last track on which you clicked play.
              isPlaying: !track.isPlaying, // toggle isPlaying flag on or off
              isFinished: track.isPlaying && false,
            }
          : track;
      });

      // make sure only one track is playing, and only one track is active at the same time.
      return modifiedTrackList.map((track) => {
        if (track.isPlaying && track.waveformRef.id !== id) {
          track.isPlaying = !track.isPlaying;
        }
        if (track.isLastActive && track.waveformRef.id !== id) {
          track.isLastActive = !track.isLastActive;
        }
        return track;
      });
    });
  };

  const playNextTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive
    );

    lastActiveTrackIndex === trackList.length - 1
      ? (lastActiveTrackIndex = 0)
      : lastActiveTrackIndex++;

    const nextTrack = trackList.at(lastActiveTrackIndex);
    nextTrack &&
    playOrPauseTrackByID(nextTrack.waveformRef.id);
  };

  const playPrevTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive
    );

    lastActiveTrackIndex === 0
      ? (lastActiveTrackIndex = trackList.length - 1)
      : lastActiveTrackIndex--;

    const prevTrack = trackList.at(lastActiveTrackIndex);
    prevTrack && playOrPauseTrackByID(prevTrack.waveformRef.id);
  };

  const pauseAllTracks = () => {
    setTrackList((tracks) =>
      tracks.map((track) => ({
        ...track,
        isPlaying: false,
        isFinished: false,
      }))
    );
  };


  //parseJWT
  const parseJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  React.useEffect(() => {
    checkUser().then((res : CurrentUser) => {
      if (res) {
        console.log(res)
        console.log('AAAAAAAA JE SUIS UN TEST')
        setCurrentUser(res);
        if (res.isNew) {
          setIsNewUser(true);
        }
        setLoading(false)
      }
    })
  }, [valid])

  React.useEffect(() => {
    if (localStorage.getItem('token') === null) {
      console.log('no token');
      setLoading(false)
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
        setValid(true);
      }
    } else {
      console.log('no token');
    }
  }, [isAuth]);

  return (
    <div id='app-wrapper'>
      <Router>
        {!loading
          ?
        <Routes>

          <Route path="/" element={
            valid 
            ? 
            (isNewUser
            ?
            <CreateUser setIsNewUser = {setIsNewUser}/>
            :
            <Home currentUser={currentUser!} setCurrentUser={setCurrentUser}  /> )
            : 
            <LandingPage setIsAuth = {setIsAuth} setIsNewUser={setIsNewUser}/>
            } 
            />

          <Route path='/profile' 
            element={
              valid
              ?
              <ProfilePage currentUser={currentUser!} setCurrentUser={setCurrentUser}/>
              :
              <Navigate to='/' />
            }
            />

          <Route element={<ErrorPage />} />
        </Routes>
          :
          <main className="w-screen h-screen flex flex-col justify-center items-center">
            <Logo/>
          </main>
        }
      </Router>
      { (valid && !isNewUser) &&
      <MediaController
          activeTrack = {activeTrack}
          playOrPauseTrackByID = {playOrPauseTrackByID}
          playNextTrack = {playNextTrack}
          playPrevTrack = {playPrevTrack}
          isAudioMuted = {isAudioMuted}
          setIsAudioMuted = {setIsAudioMuted}
          pauseAllTracks = {pauseAllTracks}
          repeat = {repeat}
          setRepeat = {setRepeat}
      />}
    </div>
  );
}
