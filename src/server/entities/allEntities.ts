export interface ITrack {
  uploaded_by: string;
  path: string;
  title?: string;
  size?: number;
  date: number;
  liked_by: string[];
}

export interface IUser {
  isPrivate: boolean;
  isNewUser: boolean;
  name?: string;
  username?: string;
  email: string;
  password: string;
  bio?: string;
  profile_pic_path?: string;
  tracks?: ITrack[],
  followers: string[];
  isPremium: boolean;
}

export interface IPremium {
  email: string;
  start_date: number;
  end_date: number;
}

