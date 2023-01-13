import { useState, useEffect } from 'react';

import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';

function App() {
  const [trackList, setTrackList] = useState([]);

  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    const newActiveTrack = trackList.find((track) => track.isActive === true);
    setActiveTrack(newActiveTrack);
  }, [activeTrack, trackList]);

  const playOrPauseTrackByID = (id) => {
    setTrackList((tracks) => {
      const stateWithToggledState = tracks.map((track) => {
        if (track.waveformRef.id === id) {
          return {
            ...track,
            isPlaying: !track.isPlaying,
            isActive: track.isPlaying || true,
          };
        }
        return track;
      });

      return stateWithToggledState.map((track) => {
        if (track.isPlaying) {
          if (track.waveformRef.id !== id) {
            track.isPlaying = !track.isPlaying;
          }
        }
        if (track.isActive) {
          if (track.waveformRef.id !== id) {
            track.isActive = !track.isActive;
          }
        }
        return track;
      });
    });
  };

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
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
    </div>
  );
}

export default App;
