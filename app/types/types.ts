export type AnimeType = {
  annictId: number;
  title: string;
  seasonName?: string;
  seasonYear?: number;
  image: {
    facebookOgImageUrl?: string;
  };
};

export type SearchWorksSuccess = {
  status: "success";
  works: AnimeType[];
  endCursor: string;
  hasNextPage: boolean;
};

export type SearchWorksError = {
  status: "error";
  message: string;
};

export type SearchWorksResponse = SearchWorksSuccess | SearchWorksError;

export type SearchWorksQueryResponse = {
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  edges: {
    node: AnimeType;
  }[];
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

export type MyAnimeType = {
  id: number;
  title: string;
  defaultImage?: string | null;
  status: StatusType;
  rating: number;
  comment: string;
  userId: string;
  customImage?: string | null;
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
    imageUrl?: string | undefined | null;
  };
};

export type ProfileResult = {
  success: boolean;
  message: string;
  newData: {
    newIcon?: string | null;
    newName: string;
  };
};

export type MyAnimeFromPrisma = RegisterType & {
  userAnime: { id: string; imageUrl?: string | null }[];
  statuses: { state: StatusType }[];
  reviews: { rating: number | null; comment: string | null }[];
};
