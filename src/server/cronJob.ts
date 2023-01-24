import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Track } from './models/models';
import { ITrack } from './entities/allEntities';

const EVERY_30SECONDS = 30000;
const DAY_IN_MS = 86400000;

const removeExpiredTracksCronJob = () => {
  return setInterval(async () => {
    try {
      console.log(
        'CRON JOB: Removing all expired tracks from db and file system ⏱...'
      );
      await Track.deleteMany({ date: { $lt: Date.now() - DAY_IN_MS } }); // remove expired tracks
      const remainingTracksInDb: ITrack[] = await Track.find({}, 'path -_id'); // get only the path field, removing also the _id field
      const numberOfDeletedFiles = await removeExpiredTracksFromFileSystem(
        remainingTracksInDb
      );
      console.log(`${numberOfDeletedFiles} files deleted\n`);
    } catch (error) {
      console.log({ error });
    }
  }, EVERY_30SECONDS);
};

const removeExpiredTracksFromFileSystem = async (remainingTracksInDb: ITrack[]) => {
  // go inside folder, and check if there is some songs that are NOT in the remainingTracksInDb array passed.
  // if some is found, it is deleted.
  try {
    let numberOfDeleteFiles = 0;
    const tracksPublicDirectory = './public/tracks';
    const pathsInDbArr = remainingTracksInDb.map((obj: ITrack) => obj.path);
    const tracksInFs = await fs.readdir(tracksPublicDirectory);
    for (const track of tracksInFs) {
      if (!pathsInDbArr.includes(track)) {
        await fs.unlink(path.join(tracksPublicDirectory, track));
        numberOfDeleteFiles++;
        console.log(
          `Expired track removed from file system: file name: ${track}`
        );
      }
    }
    return numberOfDeleteFiles;
  } catch (error) {
    let msg = 'Unknow Error'
    if(error instanceof Error) msg = error.message
    throw new Error(msg);
  }
};

export default removeExpiredTracksCronJob;
