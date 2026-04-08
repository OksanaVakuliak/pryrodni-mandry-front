export interface StoryCategory {
  _id: string;
  category: string;
}

export interface StoryOwner {
  _id: string;
  name: string;
  avatarUrl: string;
}

export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  category: StoryCategory;
  ownerId: StoryOwner;
  rate: number;
  date: string;
  isSaved: boolean;
}

export interface StoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  stories: Story[];
}

export interface SaveResponse {
  isSaved: boolean;
  savesCount: number;
  message: string;
}
