import mongoose from '../db.js';

const userSchema = mongoose.Schema({
  name: String,
  user: String,
  email: String,
  password: String,
  bio: String,
  profile_pic_path: String,
});

const trackSchema = mongoose.Schema({
  uploaded_by: String,
  path: String,
  title: String,
  size: Number,
});

const User = mongoose.model('User', userSchema);
const Track = mongoose.model('Track', trackSchema);

export { User, Track };
