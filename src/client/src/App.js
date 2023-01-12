import { useState } from 'react';

import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';

function App() {
  const [trackRefsAndPlayingStatus, setTrackRefsAndPlayingStatus] = useState(
    []
  );

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      <Header />
      <Profile
        trackRefsAndPlayingStatus={trackRefsAndPlayingStatus}
        setTrackRefsAndPlayingStatus={setTrackRefsAndPlayingStatus}
      />
      <MediaController
        activeTrack={trackRefsAndPlayingStatus.find(
          (track) => track.isPlaying === true
        )}
        setTrackRefsAndPlayingStatus={setTrackRefsAndPlayingStatus}
      />
    </div>
  );
}

export default App;
