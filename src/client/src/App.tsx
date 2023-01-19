import type { CurrentUser, TrackType, TrackListItemType } from './Interfaces';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getUserTracks } from './apiService/api-service';
import MoonLoader from 'react-spinners/MoonLoader.js';
import Profile from './components/Profile.component';
import Header from './components/Header.component';
import MediaController from './components/MediaController.component';
import ErrorPage from './pages/ErrorPage';
import React from 'react';

function App() {
  const [trackList, setTrackList] = useState<TrackListItemType[]>([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined >();
  const [isLoading, setIsLoading] = useState(true);
  const [thereIsAnError, seThereIsAnError] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const { user } : any = useParams();

  useEffect(() => {
    (async () => {
      try {
        // const currentUserData = await getUser(user);
        // if (currentUserData instanceof Error) {
        //   throw new Error(`${{ cause: currentUserData }}`);
        // }

        await getUserTracks(user, setCurrentUser);
        // if (tracksFromBackend instanceof Error) {
        //   throw new Error(`${{ cause: currentUserData }}`);
        // }

        // setCurrentUser((currentUser) => ({
        //   ...currentUser,
        //   ...currentUserData,
        //   tracks: [...tracksFromBackend],
        // }));
      } catch (error) {
        console.log({ error });
        seThereIsAnError(true); 
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

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

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <MoonLoader color="#666666" size={45} />
      </div>
    );
  }

  if (thereIsAnError) return <ErrorPage />;

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      <Header />
      {currentUser && (
        <Profile
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          trackList={trackList}
          setTrackList={setTrackList}
          playOrPauseTrackByID={playOrPauseTrackByID}
        />
      )} 
      {activeTrack && (
        <MediaController
          activeTrack={activeTrack}
          playOrPauseTrackByID={playOrPauseTrackByID}
          playNextTrack={playNextTrack}
          playPrevTrack={playPrevTrack}
          isAudioMuted={isAudioMuted}
          setIsAudioMuted={setIsAudioMuted}
          pauseAllTracks={pauseAllTracks}
          repeat={repeat}
          setRepeat={setRepeat}
        />
      )}
    </div>
  );
}

export default App;
