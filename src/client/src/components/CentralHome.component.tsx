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
    getAllTracks().then((res) => {
      console.log(res)
      if (res !== homeTracks && res.length > 0){
        console.log('res', res)
        console.log('homeTracks', homeTracks)
        setHomeTracks(res);
      }
    }
    );
  }, []);


  return (
    <div className="flex flex-col justify-center items-center">
      {centralHome ==='Home'
      &&
      <TrackCollection homeTracks={homeTracks} />
      }
      {
      centralHome ==='Soon'
      &&
      <TrackCollection homeTracks={homeTracks} />
      }
      {
      centralHome ==='Stars'
      &&
      <UserCollection />
      }
      {
      centralHome ==='Top'
      &&
      <TrackCollection homeTracks={homeTracks} />
      }
    </div>
  );
}
