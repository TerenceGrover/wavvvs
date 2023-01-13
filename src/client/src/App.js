import { useState, useEffect } from 'react';

import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';

function App() {
  const [trackRefsAndPlayingStatus, setTrackRefsAndPlayingStatus] = useState(
    []
  );

  const [activeTrack, setActiveTrack] = useState({});

  useEffect(() => {
    console.log('Whole state', trackRefsAndPlayingStatus)
    let trackThatIsPlaying = trackRefsAndPlayingStatus.find(
      (track) => track?.isPlaying === true
    );

    if (trackThatIsPlaying) {
      setActiveTrack(trackThatIsPlaying)
    }
  }, [activeTrack, trackRefsAndPlayingStatus]);

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      <Header />
      <Profile
        trackRefsAndPlayingStatus={trackRefsAndPlayingStatus}
        setTrackRefsAndPlayingStatus={setTrackRefsAndPlayingStatus}
      />
      <MediaController
        activeTrack={activeTrack}
        setTrackRefsAndPlayingStatus={setTrackRefsAndPlayingStatus}
      />
    </div>
  );
}

export default App;
