import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Track } from './models/models.js';

const EVERY_30SECONDS = 30000;
const DAY_IN_MS = 86400000;

const removeExpiredTracksCronJob = () => {
  return setInterval(async () => {
    try {
      console.log(
        'CRON JOB: Removing all expired tracks from db and file system ⏱...'
      );
      await Track.deleteMany({ date: { $lt: Date.now() - DAY_IN_MS } }); // remove expired tracks
      const remainingTracksInDb = await Track.find({}, 'path -_id'); // get only the path field, removing also the _id field
      const numberOfDeletedFiles = await removeExpiredTracksFromFileSystem(
        remainingTracksInDb
      );
      console.log(`${numberOfDeletedFiles} files deleted\n`);
    } catch (error) {
      console.log({ error });
    }
  }, EVERY_30SECONDS);
};

const removeExpiredTracksFromFileSystem = async (remainingTracksInDb) => {
  try {
    let numberOfDeleteFiles = 0;
    const tracksPublicDirectory = './public/tracks';
    const pathsInDbArr = remainingTracksInDb.map((obj) => obj.path);
    const filesInFs = await fs.readdir(tracksPublicDirectory);
    for (const file of filesInFs) {
      if (pathsInDbArr.includes(file) === false) {
        await fs.unlink(path.join(tracksPublicDirectory, file));
        numberOfDeleteFiles++;
        console.log(
          `Expired track removed from file system: file name: ${file}`
        );
      }
    }
    return numberOfDeleteFiles;
  } catch (error) {
    throw new Error({ cause: error });
  }
};

export default removeExpiredTracksCronJob;
