export type UserDto = {
  _id: string;
  username: string;
  email: string;
  location?: string;
  avatarUrl?: string;
  booksOwned: string[];
};
