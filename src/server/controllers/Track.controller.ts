import * as fs from 'node:fs/promises';
import { Request, Response } from 'express';
import path from 'node:path';
import { Track } from '../models/models';
import { ITrack } from '../entities/allEntities';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const uploadTrack = async (req: Request, res: Response) => {
  try {
    if (req.headers && req.headers.authorization) {
      console.log(req.headers.authorization);
      let authorization = req.headers.authorization.split(' ')[1],
        decoded: any;
      try {
        decoded = jwt.verify(authorization, SECRET_KEY!);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      const newTrack: ITrack = {
        uploaded_by: decoded.id,
        path: req.file!.filename,
        title: req.file!.originalname,
        size: req.file!.size,
        date: Date.now(),
      };
      await Track.create(newTrack);
      res.status(200).send(newTrack);
    }
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const getAllTracks = async (req: Request, res: Response) => {
  try {
    const tracks: ITrack[] = await Track.find({});
    res.status(200).send(tracks);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const getUserTracks = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const tracks: ITrack[] | undefined = await Track.find({
      uploaded_by: username,
    });
    // if user has tracks, send them. If not, 404
    tracks ? res.status(200).send(tracks) : res.sendStatus(404);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

const tracksPublicDirectory = './public/tracks'; // path relative to the node process
const deleteTrack = async (req: Request, res: Response) => {
  try {
    // The name of the file is the id of the track, and the path to it, at the same time.
    const { id } = req.body; // refactored
    const { deletedCount } = await Track.deleteOne({ path: id });
    if (deletedCount) {
      await fs.unlink(path.join(tracksPublicDirectory, id));
    }
    res.status(200).send({ deletedCount });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};

export { uploadTrack, getAllTracks, deleteTrack, getUserTracks };
