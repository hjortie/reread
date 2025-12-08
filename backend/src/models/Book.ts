import { model, Schema, Types } from "mongoose";

export interface Book {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId; //User
  title: string;
  author: string;
  genre: string;
  condition: string;
  description: string;
  imageUrl?: string;
  status: "available" | "in-trade" | "unavailable";
}

const bookSchema = new Schema<Book>({
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  status: {
    type: String,
    enum: ["available", "in-trade", "unavailable"],
    required: true,
    default: "available",
  },
});

export const BookModel = model<Book>("Book", bookSchema);
