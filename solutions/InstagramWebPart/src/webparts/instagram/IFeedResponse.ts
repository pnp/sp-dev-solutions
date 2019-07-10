export interface IPagination {
}

export interface IUser {
  id: string;
  full_name: string;
  profile_picture: string;
  username: string;
}

export interface IThumbnail {
  width: number;
  height: number;
  url: string;
}

export interface ILowResolution {
  width: number;
  height: number;
  url: string;
}

export interface IStandardResolution {
  width: number;
  height: number;
  url: string;
}

export interface IImages {
  thumbnail: IThumbnail;
  low_resolution: ILowResolution;
  standard_resolution: IStandardResolution;
}

export interface IFrom {
  id: string;
  full_name: string;
  profile_picture: string;
  username: string;
}

export interface ICaption {
  id: string;
  text: string;
  created_time: string;
  from: IFrom;
}

export interface ILikes {
  count: number;
}

export interface IComments {
  count: number;
}

export interface IDatum {
  id: string;
  user: IUser;
  images: IImages;
  created_time: string;
  caption: ICaption;
  user_has_liked: boolean;
  likes: ILikes;
  tags: any[];
  filter: string;
  comments: IComments;
  type: string;
  link: string;
  location?: any;
  attribution?: any;
  users_in_photo: any[];
}

export interface IMeta {
  code: number;
}

export interface IFeedResponse {
  pagination: IPagination;
  data: IDatum[];
  meta: IMeta;
}

