import { model, Schema, Types, type InferSchemaType } from "mongoose";

const bookSchema = new Schema({
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

export const Book = model("Book", bookSchema);
export type BookType = InferSchemaType<typeof bookSchema>;
