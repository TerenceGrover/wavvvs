// Create react component called centralHome
//
import React from 'react';
import TrackCollection from './TrackCollection';
import { HomeContext, Context } from '../Utils/Context';
import UserCollection from './UserCollection.component';
import { getAllTracks } from '../apiService/api-service';

export default function CentralHome() {

  const { centralHome } = React.useContext(HomeContext);
  const [homeTracks, setHomeTracks] = React.useState([]);

  React.useEffect(() => {
    const sort = centralHome === 'Home' ? '' : centralHome === 'Soon' ? 'date' : centralHome === 'Top' ? 'likes' : '';
    getAllTracks(sort).then((res) => {
      console.log(res)
      if (res !== homeTracks && res.length > 0){
        setHomeTracks(res);
      }
    }
    );
  }, [centralHome]);


  return (
    <div className="flex flex-col justify-center items-center">
      {centralHome ==='Home'
      &&
      <TrackCollection sort={'home'} homeTracks={homeTracks} />
      }
      {
      centralHome ==='Soon'
      &&
      <TrackCollection sort={'soon'} homeTracks={homeTracks} />
      }
      {
      centralHome ==='Stars'
      &&
      <UserCollection />
      }
      {
      centralHome ==='Top'
      &&
      <TrackCollection sort={'top'} homeTracks={homeTracks} />
      }
    </div>
  );
}
