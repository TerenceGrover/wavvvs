import { Premium, Track, User } from './models/models';
import { deleteTrackFromCloudinaryAndDb } from './utils/general.util';
const DAY_IN_MS = 86400000;

export const deleteExpiredTracks = async () => {
  console.log('Deleting expired tracks...');
  // first, find everythig that is in the Track model 
  const tracks = await Track.find({})
  if (!tracks.length) return console.log('No tracks in the db')
  // then, for each track, check if it is expired (24h)
  for (const track of tracks) {
    // if it is expired, delete it from the cloudinary and from the db
    if (track.date < Date.now() - DAY_IN_MS) {
      deleteTrackFromCloudinaryAndDb(track._id, track.path)
      console.log(`Expired track removed from db and cloudinary: ${track.title}`);
    }
  }
}

export const checkPremiumSubscriptions = async () => {
  console.log('Checking premium subscriptions...');
  // get all the premium subscriptions
  const premiumUsers = await Premium.find({})
  if (!premiumUsers.length) return console.log('No premium users in the db')
  // for each premium subscription, check if it is expired (30 days)
  for (const premiumUser of premiumUsers) {
    // if it is expired, delete it from the db
    if (premiumUser.end_date < Date.now()) {
      // find that user in the User and set his isPremium to false
      const user = await User.findOne({ email: premiumUser.email })
      if (user) {
        user.isPremium = false
        await user.save()
        console.log(`Expired premium subscription removed from db: ${premiumUser.email}`);
      }
    }
  }
}
