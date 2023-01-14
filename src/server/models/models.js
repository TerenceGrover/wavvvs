import mongoose from '../db.js';

const userSchema = mongoose.Schema({
  name: String,
  user: String,
  email: String,
  password: String,
  bio: String,
  profile_pic_path: String,
  track0: String,
  track1: String,
  track2: String,
});

const User = mongoose.model('User', userSchema);

export { User };
