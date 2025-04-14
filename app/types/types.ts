export type AnimeType = {
  annictId: number;
  title: string;
  seasonName?: string;
  seasonYear?: number;
  image: {
    facebookOgImageUrl?: string;
  };
};

export type RegisterType = {
  id: number;
  title: string;
  seasonYear?: number | null;
  seasonName?: string | null;
  imageUrl?: string | null;
};

export type StatusType =
  | "WANT_TO_WATCH"
  | "WATCHING"
  | "COMPLETED"
  | "ON_HOLD"
  | "DROPPED";

export type ReviewDataType = {
  id: number;
  title: string;
  imageUrl?: string | null;
  status: StatusType;
  rating: number;
  comment: string;
};

export type MyAnimeType = ReviewDataType & {
  userId: string;
  seasonYear?: number | null;
  seasonName?: string | null;
  registerId: string;
};

export type FormResult = {
  success: boolean;
  message: string;
  newData: {
    status: StatusType;
    rating: number;
    comment: string;
  };
};

