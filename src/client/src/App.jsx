import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader.js';
import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';
import { getUser, getTracksFromBackend } from './apiService/api-service.js';

function App() {
  const [trackList, setTrackList] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useParams();

  useEffect(() => {
    (async () => {
      const tracksFromBackend = await getTracksFromBackend();
      const currentUserData = await getUser(user);

      if (currentUserData && tracksFromBackend) {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          ...currentUserData,
          tracks: tracksFromBackend.filter(
            (track) => track.uploaded_by === currentUser?.user
          ),
        }));
      }
    })();

    const newActiveTrack = trackList.find(
      (track) => track.isLastActive === true
    );

    setActiveTrack(newActiveTrack);
  }, [activeTrack, trackList, user]);

  const playOrPauseTrackByID = (id) => {
    setTrackList((tracks) => {
      const modifiedTrackList = tracks.map((track) => {
        // Loop trough the tracks and find by id the one you want to play/pause.
        if (track.waveformRef.id === id) {
          return {
            ...track,
            isLastActive: track.isPlaying || true, // track.isPlaying being false here means you are clicking play.
            // the last active track is the last track on which you clicked play.
            isPlaying: !track.isPlaying, // toggle isPlaying flag on or off
          };
        }
        return track;
      });

      // make sure only one track is playing, and only one track is active at the same time.
      return modifiedTrackList.map((track) => {
        if (track.isPlaying) {
          if (track.waveformRef.id !== id) {
            track.isPlaying = !track.isPlaying;
          }
        }
        if (track.isLastActive) {
          if (track.waveformRef.id !== id) {
            track.isLastActive = !track.isLastActive;
          }
        }
        return track;
      });
    });
  };

  const playNextTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive === true
    );

    lastActiveTrackIndex === trackList.length - 1
      ? (lastActiveTrackIndex = 0)
      : lastActiveTrackIndex++;

    const nextTrack = trackList.at(lastActiveTrackIndex);
    playOrPauseTrackByID(nextTrack.waveformRef.id);
  };

  const playPrevTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive === true
    );

    lastActiveTrackIndex === 0
      ? (lastActiveTrackIndex = trackList.length - 1)
      : lastActiveTrackIndex--;

    const prevTrack = trackList.at(lastActiveTrackIndex);
    playOrPauseTrackByID(prevTrack.waveformRef.id);
  };

  if (!currentUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <MoonLoader color="#666666" size={45}/>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      <>
        <Header />
        <Profile
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          trackList={trackList}
          setTrackList={setTrackList}
          playOrPauseTrackByID={playOrPauseTrackByID}
        />
        {activeTrack && (
          <MediaController
            activeTrack={activeTrack}
            playOrPauseTrackByID={playOrPauseTrackByID}
            playNextTrack={playNextTrack}
            playPrevTrack={playPrevTrack}
            setTrackList={setTrackList}
            isAudioMuted={isAudioMuted}
            setIsAudioMuted={setIsAudioMuted}
          />
        )}
      </>
    </div>
  );
}

export default App;
