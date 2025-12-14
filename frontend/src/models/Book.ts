export type Book = {
  _id: string;
  ownerId: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  description: string;
  imageUrl?: string;
  status: string;
};
