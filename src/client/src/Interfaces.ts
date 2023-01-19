export interface ErrorType {
  cause : string;
  message : string;
}

export interface CurrentUser {
  _v: number;
  _id : string;
  bio: string;
  email: string;
  name: string;
  password: string;
  profile_pic_path: string;
  tracks: Array<TrackType>;
  user: string;
}

export interface TrackType {
  uploaded_by: string;
  path: string;
  title: string;
  size: number;
  date: number;
}

export interface TrackListItemType {
  waveformRef:  any;
  isPlaying: boolean;
  isLastActive?: boolean;
  isActive?: boolean;
  isFinished: boolean;
}