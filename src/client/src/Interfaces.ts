export interface ErrorType {
  cause : string;
  message : string;
}

export interface CurrentUser {
  id?: string;
  username: string;
  _v: number;
  _id : string;
  bio: string;
  email: string;
  name: string;
  profile_pic_path: string;
  tracks: Array<any>;
  isNewUser: boolean;
  isPremium: boolean;
  isPrivate: boolean;
  followers: Array<string>;
  numberOfFollowers: number;
}

export interface TrackType {
  uploaded_by: string;
  path: string;
  title: string;
  size: number;
  date: number;
  likes: number;
  _id: string;
  liked_by: Array<string>;
}

export interface TrackListItemType {
  [x: string]: any;
  waveformRef:  any;
  isPlaying?: boolean;
  isLastActive?: boolean;
  isActive?: boolean;
  isFinished?: boolean;
  _id ?: string;
}

export interface InfoObject {
  username?: string;
  password: string;
  email?: string;
}

export interface AdditionalInfoObject {
  name?: string;
  bio?: string;
  email?: string;
  profile_pic_path?: string;
  tracks?: Array<any>;
}