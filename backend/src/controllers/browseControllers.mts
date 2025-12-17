import { Book, type BookType } from "../models/Book.js";

type bookQuery = {
  ownerId?: { $ne: string };
  status: string;
};

export const getBooks = async (
  query: bookQuery,
  q?: string
): Promise<BookType[] | undefined> => {
  let books = await Book.find(query).limit(50);
  if (q) {
    const filteredBooks = books.filter(
      (b) => b.title.toLowerCase().indexOf(q) >= 0
    );
    if (filteredBooks.length === 0) {
      return undefined;
    } else {
      books = filteredBooks;
    }
  }
  return books;
};
