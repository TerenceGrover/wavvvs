import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';
import LandingPage from './components/LandingPage.component.jsx';

function App() {
  const [trackList, setTrackList] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const newActiveTrack = trackList.find(
      (track) => track.isLastActive === true
    );
    setActiveTrack(newActiveTrack);
  }, [activeTrack, trackList]);

  const playOrPauseTrackByID = (id) => {
    setTrackList((tracks) => {
      const modifiedTrackList = tracks.map((track) => {
        // Loop trough the tracks and find by id the one you want to play/pause.
        if (track.waveformRef.id === id) {
          return {
            ...track,
            isPlaying: !track.isPlaying,
            isLastActive: track.isPlaying || true, // track.isPlaying being false here means you are clicking play.
            // the last active track is the last track on which you clicked play.
          };
        }
        return track;
      });

      // make sure only one track is playing and the same time, and only one track is active.
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

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      {!isAuthenticated ? (
        <>
          <LandingPage />
        </>
      ) : (
        <>
          <Header />
          <Profile
            trackList={trackList}
            setTrackList={setTrackList}
            playOrPauseTrackByID={playOrPauseTrackByID}
          />
          {activeTrack && (
            <MediaController
              activeTrack={activeTrack}
              playOrPauseTrackByID={playOrPauseTrackByID}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
