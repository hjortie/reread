import { Book } from "./Book";

export type Trade = {
  _id: string;
  requesterId: string; //User-id
  receiverId: string; //user-id
  offeredBooks: string[] | Book[]; //bok-id:n - populeras i vissa lägen i backend
  requestedBook: string | Book; //bok-id - populeras i vissa lägen i backend
  acceptedOfferedBook: string | null; //i backend defaultar värdet till null och ej undefined
  status: string;
};
