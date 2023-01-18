# Client

- React
- WaveSurfer.js
- Tailwind CSS
- Headless UI

## More info

The state about the audio tracks is stored in ``App.jsx``

``trackList`` is and array of objects, each one representing a track. Each of this objects holds a reference to the DOM node in which the ``WaveSurfer`` instance is contained, having access to its methods. This reference is stored in the property ``waveformRef`` of the object. Inside ``waveformRef`` you have access to the ``id`` of the track.  The ``id`` is also the path to the track in the backend server.

In each one of this objects of the ``trackList`` array, you also have access to the boolean flags ``isActive`` ``isPlaying`` and ``isFinished`` representing the state of each individual track.

When a new track gets uploaded, the ``Track.component.jsx`` gets rendered. There, a ``WaveSurfer`` instance gets created,
and appended to the DOM using the ``useRef`` hook inside the ``useEffect``:

```js
const  waveformRef  =  useRef(null);
useEffect(() => {
 const  options  = {
  container: waveformRef.current
 };
 const  wavesurfer  =  WaveSurfer.create(options);
...

...

```

```jsx
<div ref={waveformRef} className="w-full..." ></div>
```

Every track starts with all the flags set to ``false``:

```js
setTrackList((tracks) => [
 ...tracks,
 { waveformRef, isPlaying: false, isActive: false, isFinished: false },
]);
```

Each ``WaveSurfer``instance gets added an event listener when initialised, that sets to ``true`` the ``isFinished`` flag when the track finishes playing:

```js
// add on finish event listener
wavesurfer.on('finish', () => {
 setTrackList((tracks) =>
  tracks.map((track) =>
   track.waveformRef.id  ===  path
   ? { ...track, isFinished: true }
   :  track
  )
 );
});
```

When you click on play or pause, the ``playOrPauseTrackByID`` function inside ``App.jsx``gets triggered. This function holds the logic of how the boolean flags should get toggled:
This is when things get complicated for no reason. If someone want's to work in this project I would recommend trying change this to a more manageable solution. Looking into [State Machines](https://en.wikipedia.org/wiki/Finite-state_machine) as [Kostas](https://github.com/kostasx) suggested me later on, might help.

```js
const  playOrPauseTrackByID  = (id) => {
 setTrackList((tracks) => {
  // Loop trough the tracks and modify the status of th track you want to play/pause
  const  modifiedTrackList  = tracks.map((track) => {
   return track.waveformRef.id  ===  id
   ? { ...track,
    isLastActive: track.isPlaying  ||  true, // track.isPlaying being false here means you are        clicking play.
    // the last active track is the last track on which you clicked play.
    isPlaying: !track.isPlaying, // toggle isPlaying flag on or off
    isFinished: track.isPlaying  &&  false,
    }
   :  track;
   });

 // make sure only one track is playing, and only one track is active at the same time
  return modifiedTrackList.map((track) => {
   if (track.isPlaying  && track.waveformRef.id  !==  id) {
    track.isPlaying  =  !track.isPlaying;
   }
   if (track.isLastActive  && track.waveformRef.id  !==  id) {
    track.isLastActive  =  !track.isLastActive;
   }
   return  track;
  });
 });
};
```

All the state gets passed down from the ``App.jsx`` component to the ``MediaController.component.jsx`` so it can have access to the active track, as well as playing the next/previous track and dealing with the repeat of the track. All the helper functions use the ``playOrPauseTrackByID`` function, so a bug there breaks all the audio functionality. I have warned you! 🙃
