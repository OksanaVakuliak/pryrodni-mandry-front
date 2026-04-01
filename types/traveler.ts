export interface Traveler {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  storiesCount?: number;
  savedArticles: string[];
}

export interface TravelersResponse {
  data: {
    users: Traveler[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
