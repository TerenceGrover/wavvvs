import { useState, useEffect } from 'react';

import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';

function App() {
  const [trackList, setTrackList] = useState([]);

  const [activeTrack, setActiveTrack] = useState({});

  useEffect(() => {
    const newActiveTrack = trackList.find((track) => track.isActive === true);
    setActiveTrack(newActiveTrack);
  }, [activeTrack, trackList]);

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      <Header />
      <Profile trackList={trackList} setTrackList={setTrackList} />
      <MediaController activeTrack={activeTrack} setTrackList={setTrackList} />
    </div>
  );
}

export default App;
