import { Schema, model } from 'mongoose';

export interface ITrack {
  uploaded_by: string;
  path: string;
  title: string;
  size: number;
  date: number;
}

export interface IUser {
  name: string;
  user: string;
  email: string;
  password?: string;
  bio: string;
  profile_pic_path: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  user: String,
  email: String,
  password: String,
  bio: String,
  profile_pic_path: String,
});

const trackSchema = new Schema<ITrack>({
  uploaded_by: String,
  path: String,
  title: String,
  size: Number,
  date: Number,
});

const User = model<IUser>('User', userSchema);
const Track = model<ITrack>('Track', trackSchema);

export { User, Track };
