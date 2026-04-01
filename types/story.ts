export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  category: string;
  ownerId: string;
  rate?: number;
  date?: string;
}

export interface SaveResponse {
  rate: number;
  savedArticles: string[];
}
