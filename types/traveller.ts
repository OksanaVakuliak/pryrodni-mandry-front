export interface Traveller {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  storiesCount?: number;
  savedArticles: string[];
}

export interface TravellersResponse {
  data: {
    users: Traveller[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
