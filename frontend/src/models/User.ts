export type User = {
  username: string;
  email: string;
  location?: string;
  avatarUrl?: string;
  booksOwned: string[]; //_id:n från type Book
};
