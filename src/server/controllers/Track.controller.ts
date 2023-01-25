import { Request, Response } from 'express';
import { Track } from '../models/models';
import { ITrack } from '../entities/allEntities';
import {
  getIdOfUserFromJWT,
  deleteTrackFromCloudinaryAndDb,
} from '../utils/general.util';

const getAllTracks = async (req: Request, res: Response) => {
  try {
    let { limit } = req.body;
    if (!limit) limit = 20;
    let { sort } = req.body;
    // if sort is not passed in the body, i dont want to sort

    const tracks = await Track.find({});

    let arrOfTracks: any = [];
    tracks.forEach((track) => {
      arrOfTracks.push({
        _id: track._id.toString(),
        path: track.path,
        title: track.title,
        size: track.size,
        date: track.date,
        likes: track.liked_by.length,
        uploaded_by: track.uploaded_by,
      });
    });
    if (sort) {
      const now = Date.now();
      switch (sort) {
        case 'date':
          arrOfTracks.sort((a: any, b: any) => (now - b.date) - (now - a.date));
          break;
        case 'likes':
          arrOfTracks.sort((a: any, b: any) => b.likes - a.likes);
          break;
        default:
          arrOfTracks.sort((a: any, b: any) => b.likes - a.likes);
          break;
      }
    }
    let toSend = arrOfTracks.slice(0, limit)
    res.status(200).send(toSend);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const deleteTrack = async (req: Request, res: Response) => {
  try {
    // get the id of the track to delete
    const { id } = req.body;
    // take the url of the track to delete from the database
    const track: ITrack | null = await Track.findOne({ _id: id });
    // if the track doesn't exist, send 404
    if (!track) {
      return res.sendStatus(404);
    }
    // store the url of the track to delete
    const { path } = track;
    const del = await deleteTrackFromCloudinaryAndDb(id, path);
    if (del) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    // TODO : notify user of the error (means send back the error)
    // TODO : notify the developer of the error (maybe email the error)
    console.log({ error });
    res.status(500).send({ error });
  }
};

const saveTrackUrl = async (req: Request, res: Response) => {
  try {
    const decoded = getIdOfUserFromJWT(req);
    if (decoded) {
      const id = decoded.id;
      const { url } = req.body;
      const { title } = req.body;
      const track: ITrack = {
        liked_by: [],
        uploaded_by: id,
        path: url,
        date: Date.now(),
        title: title,
      };
      await Track.create(track);
      res.sendStatus(204);
    } else {
      // getIdOfUserFromJWT returns null if the token is invalid so we send 401
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    // TODO : notify user of the error (means send back the error)
    // TODO : notify the developer of the error (maybe email the error)
    console.log({ error });
    res.status(500).send({ error });
  }
};

const likeTrack = async (req: Request, res: Response) => {
  try {
    const decoded = getIdOfUserFromJWT(req);
    if (decoded) {
      const id = decoded.id;
      const { trackId } = req.body;
      const track: ITrack | null = await Track.findOne({ _id: trackId });
      if (track) {
        // if the user already liked the track, we remove the like
        if (track.liked_by.includes(id)) {
          await Track.updateOne({ _id: trackId }, { $pull: { liked_by: id } });
          console.log('removed like, likes of the track is now: ' + track.liked_by.length);
          return res.sendStatus(204);
        } else {
          // if the user didn't like the track, we add the like
          await Track.updateOne({ _id: trackId }, { $push: { liked_by: id } });
          console.log('added like, likes of the track is now: ' + track.liked_by.length);
          return res.sendStatus(204);
        }
      } else {
        return res.sendStatus(404);
      }
    } else {
      // getIdOfUserFromJWT returns null if the token is invalid so we send 401
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    // TODO : notify user of the error (means send back the error)
    // TODO : notify the developer of the error (maybe email the error)
    console.log({ error });
    return res.status(500).send({ error });
  }
};

const TESTsaveTrackUrl = async (req: Request, res: Response) => {
  // THIS FUNCTIONS IS BEING USED FOR TESTING PURPOSES ONLY.
  try {
    const decoded = getIdOfUserFromJWT(req);
    if (decoded) {
      const id = decoded.id;
      const { url } = req.body;
      const { title } = req.body;
      const twoDaysAgo = new Date(Date.now());
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const newTimestamp = twoDaysAgo.getTime();
      const track: ITrack = {
        liked_by: [],
        uploaded_by: id,
        path: url,
        date: newTimestamp,
        title: title,
      };
      await Track.create(track);
      res.sendStatus(204);
    } else {
      // getIdOfUserFromJWT returns null if the token is invalid so we send 401
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    // TODO : notify user of the error (means send back the error)
    // TODO : notify the developer of the error (maybe email the error)
    console.log({ error });
    res.status(500).send({ error });
  }
}

export { getAllTracks, deleteTrack, saveTrackUrl, likeTrack, TESTsaveTrackUrl };
