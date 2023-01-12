import { useState } from 'react';

import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';

function App() {
  const [
    referencesToTracksAndPlayingStatus,
    setReferencesToTracksAndPlayingStatus,
  ] = useState([{ ref: {}, isPlaying: false }]);

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      <Header />
      <Profile
        referencesToTracksAndPlayingStatus={referencesToTracksAndPlayingStatus}
        setReferencesToTracksAndPlayingStatus={
          setReferencesToTracksAndPlayingStatus
        }
      />
      <MediaController
        // activeTrack={referencesToTracksAndPlayingStatus.find((t) => t.isPlaying === true)}
        activeTrack={referencesToTracksAndPlayingStatus[0]}
        setReferencesToTracksAndPlayingStatus={
          setReferencesToTracksAndPlayingStatus
        }
      />
    </div>
  );
}

export default App;
