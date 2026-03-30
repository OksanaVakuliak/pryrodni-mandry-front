import { Category } from './Category';
import { User } from './Users';

export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  category: Category;
  ownerId: User;
  rate: number;
  date: string;
  saveByUsers: string[];
  createdAt: string;
}

export interface StoriesResponse {
  page: number;
  perPage: number;
  category: Category;
}

export interface StoriesFilters {
  category?: string;
  sort: 'rate';
  page: number;
  perPage: number;
}
