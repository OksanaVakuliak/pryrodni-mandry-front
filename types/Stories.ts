import { Category } from './Category';

export interface Author {
  _id: string;
  name: string;
  avatarUrl: string;
}

export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  category: Category;
  ownerId: Author;
  rate: number;
  date: string;
}

export interface StoriesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalStories: number;
  hasNextPage: boolean;
  stories: Story[];
}

export interface StoriesFilters {
  category?: string;
  sort: 'rate';
  page: number;
  perPage: number;
}
