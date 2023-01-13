import mongoose from '../db.js';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  user_name: String,
  email: String,
  password: String,
  bio: String,
  profile_pic_path: String,
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
});

const trackSchema = mongoose.Schema({
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  name: String,
  size: Number,
});

const User = mongoose.model('User', userSchema);
const Track = mongoose.model('Track', trackSchema);

export { User, Track };
