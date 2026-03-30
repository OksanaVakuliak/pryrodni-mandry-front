export interface StoryCategory {
  _id: string;
}

export interface StoryOwner {
  avatar: string;
  _id: string;
  name: string;
}

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: StoryCategory;
  rate: number;
  ownerId: StoryOwner;
  date: string;
  savedByUsers: string[];
}
