import React from 'react';
import { Context } from '../Utils/Context';
import Track from './Track.component';
import EmptyTrack from './EmptyTrack.component';

export default function TrackCollection(props : {sort:string, homeTracks: any[]}) {

  const [tracksto3, setTracksto3] = React.useState([1, 2, 3, 4, 5]);
  const { currentUser, trackList } = React.useContext(Context);

  React.useEffect(() => {
    if (props.homeTracks && props.homeTracks.length > 0) {
      const buff: any[] = [...props.homeTracks];
      setTracksto3(buff.concat([1, 2, 3, 4, 5]).slice(0, 5));
    } else {
      setTracksto3([1, 2, 3, 4, 5]);
    }
  }, [props.homeTracks, currentUser]);

  return (
    <div className="h-auto w-screen">
      <div className="flex flex-col justify-start mt-14 items-center content-start p-6">
        {tracksto3.map((track: any) => {
          return typeof track === 'object' ? (
            <Track
              trackMetaData={track}
              track={trackList.find(
                (trackListItem) => trackListItem.waveformRef.id === track.path
              )}
              key={track.path}
            />
          ) : (
            <EmptyTrack key={track} />
          );
        })}
      </div>
    </div>
  );
}
